// Real-time WebSocket client for agent orchestration
import { useEffect, useRef, useState } from 'react';

export class AgentOrchestrationClient {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 2000;
  private callbacks: Record<string, ((data: any) => void)[]> = {};

  constructor(private url: string = 'ws://localhost:8081') {}

  connect() {
    try {
      this.ws = new WebSocket(this.url);
      
      this.ws.onopen = () => {
        console.log('🔌 Connected to Agent Orchestration Server');
        this.reconnectAttempts = 0;
        this.emit('connected', { timestamp: Date.now() });
      };
      
      this.ws.onmessage = (event) => {
        try {
          const { type, data } = JSON.parse(event.data);
          this.emit(type, data);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };
      
      this.ws.onclose = () => {
        console.log('🔌 Disconnected from Agent Orchestration Server');
        this.emit('disconnected', { timestamp: Date.now() });
        this.attemptReconnect();
      };
      
      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.emit('error', { error, timestamp: Date.now() });
      };
      
    } catch (error) {
      console.error('Failed to connect to WebSocket:', error);
      this.attemptReconnect();
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`🔄 Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      
      setTimeout(() => {
        this.connect();
      }, this.reconnectDelay * this.reconnectAttempts);
    } else {
      console.error('❌ Max reconnect attempts reached');
      this.emit('connection_failed', { attempts: this.reconnectAttempts });
    }
  }

  send(action: string, payload: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ action, payload }));
    } else {
      console.warn('WebSocket not connected, cannot send message');
    }
  }

  on(event: string, callback: (data: any) => void) {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }
    this.callbacks[event].push(callback);
  }

  off(event: string, callback: (data: any) => void) {
    if (this.callbacks[event]) {
      this.callbacks[event] = this.callbacks[event].filter(cb => cb !== callback);
    }
  }

  private emit(event: string, data: any) {
    if (this.callbacks[event]) {
      this.callbacks[event].forEach(callback => callback(data));
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  // Convenience methods for agent orchestration
  startOrchestration(prompt: string, complexity: string, zohoIntegration: boolean = false) {
    const buildId = `build_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.send('start_orchestration', {
      buildId,
      prompt,
      complexity,
      zohoIntegration,
      timestamp: Date.now()
    });
    return buildId;
  }

  connectToZoho(credentials: any) {
    this.send('connect_zoho', {
      credentials,
      timestamp: Date.now()
    });
  }

  getBuildStatus(buildId: string) {
    this.send('get_build_status', { buildId });
  }
}

// React hook for using the orchestration client
export function useAgentOrchestration() {
  const clientRef = useRef<AgentOrchestrationClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [currentBuild, setCurrentBuild] = useState<any>(null);
  const [buildHistory, setBuildHistory] = useState<any[]>([]);

  useEffect(() => {
    // Initialize client
    clientRef.current = new AgentOrchestrationClient();
    
    // Set up event listeners
    clientRef.current.on('connected', () => setIsConnected(true));
    clientRef.current.on('disconnected', () => setIsConnected(false));
    clientRef.current.on('connection_failed', () => setIsConnected(false));
    
    clientRef.current.on('build_started', (build) => {
      setCurrentBuild(build);
    });
    
    clientRef.current.on('agent_started', ({ buildId, agent, progress }) => {
      setCurrentBuild((prev: any) => prev?.id === buildId ? {
        ...prev,
        currentAgent: agent.id,
        progress,
        agents: prev.agents.map((a: any) => a.id === agent.id ? { ...a, status: 'active' } : a)
      } : prev);
    });
    
    clientRef.current.on('agent_progress', ({ buildId, agentId, progress, currentTask }) => {
      setCurrentBuild((prev: any) => prev?.id === buildId ? {
        ...prev,
        agents: prev.agents.map((a: any) => 
          a.id === agentId ? { ...a, progress, currentTask } : a
        )
      } : prev);
    });
    
    clientRef.current.on('agent_completed', ({ buildId, agent }) => {
      setCurrentBuild((prev: any) => prev?.id === buildId ? {
        ...prev,
        agents: prev.agents.map((a: any) => 
          a.id === agent.id ? { ...a, status: 'completed', progress: 100 } : a
        )
      } : prev);
    });
    
    clientRef.current.on('build_completed', (build) => {
      setCurrentBuild(build);
      setBuildHistory(prev => [build, ...prev.slice(0, 9)]); // Keep last 10 builds
    });
    
    clientRef.current.on('build_failed', ({ buildId, error }) => {
      setCurrentBuild((prev: any) => prev?.id === buildId ? {
        ...prev,
        status: 'failed',
        error
      } : prev);
    });
    
    // Connect
    clientRef.current.connect();
    
    // Cleanup
    return () => {
      if (clientRef.current) {
        clientRef.current.disconnect();
      }
    };
  }, []);

  const startBuild = (prompt: string, complexity: string, zohoIntegration: boolean = false) => {
    if (clientRef.current) {
      return clientRef.current.startOrchestration(prompt, complexity, zohoIntegration);
    }
    return null;
  };

  const connectZoho = (credentials: any) => {
    if (clientRef.current) {
      clientRef.current.connectToZoho(credentials);
    }
  };

  return {
    isConnected,
    currentBuild,
    buildHistory,
    startBuild,
    connectZoho,
    client: clientRef.current
  };
}
