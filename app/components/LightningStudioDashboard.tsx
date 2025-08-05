import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Enhanced Lightning Studio Dashboard with real-time features
export default function LightningStudioDashboard() {
  const crmChartRef = useRef<HTMLCanvasElement>(null);
  const analyticsChartRef = useRef<HTMLCanvasElement>(null);
  const [crmData, setCrmData] = useState<any>({ leads: 0, contacts: 0, deals: 0, pipeline: [] });
  const [revenueData, setRevenueData] = useState([120000, 180000, 240000, 320000, 400000]);
  const [activities, setActivities] = useState<any[]>([]);
  const [chartLoaded, setChartLoaded] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');

  // Load Chart.js dynamically for enterprise charts
  useEffect(() => {
    if (!(window as any).Chart) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      script.onload = () => setChartLoaded(true);
      document.body.appendChild(script);
    } else {
      setChartLoaded(true);
    }
  }, []);

  // Fetch enhanced CRM data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setConnectionStatus('connecting');
        const [crmResponse, activitiesResponse] = await Promise.all([
          fetch('/api/zoho/crm'),
          fetch('/api/zoho/activities')
        ]);
        
        const crmResult = await crmResponse.json();
        const activitiesResult = await activitiesResponse.json();
        
        setCrmData(crmResult);
        setActivities(activitiesResult);
        setConnectionStatus('connected');
        
        // Simulate real-time revenue growth
        const currentRevenue = crmResult.revenue || 2847293;
        setRevenueData([
          currentRevenue * 0.6,
          currentRevenue * 0.75,
          currentRevenue * 0.9,
          currentRevenue,
          currentRevenue * 1.15
        ]);
        
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setConnectionStatus('error');
      }
    };
    
    fetchData();
  }, []);

  // Real-time data updates
  useEffect(() => {
    if (isLiveMode) {
      const interval = setInterval(() => {
        // Simulate real-time updates
        setCrmData((prev: any) => ({
          ...prev,
          leads: prev.leads + Math.floor(Math.random() * 3),
          deals: prev.deals + Math.floor(Math.random() * 2),
          revenue: prev.revenue + Math.floor(Math.random() * 15000) + 5000
        }));
      }, 10000);
      
      return () => clearInterval(interval);
    }
  }, [isLiveMode]);

  // Render CRM Chart
  useEffect(() => {
    if (chartLoaded && crmChartRef.current && (window as any).Chart) {
      new (window as any).Chart(crmChartRef.current, {
        type: 'bar',
        data: {
          labels: ['Leads', 'Contacts', 'Deals'],
          datasets: [{
            label: 'CRM Records',
            data: [crmData.leads, crmData.contacts, crmData.deals],
            backgroundColor: [
              'rgba(34, 211, 238, 0.7)',
              'rgba(139, 92, 246, 0.7)',
              'rgba(236, 72, 153, 0.7)'
            ],
            borderColor: [
              'rgba(34, 211, 238, 1)',
              'rgba(139, 92, 246, 1)',
              'rgba(236, 72, 153, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: true, text: 'Zoho CRM Data Distribution' }
          }
        }
      });
    }
  }, [chartLoaded, crmData]);

  // Render Analytics Chart
  useEffect(() => {
    if (chartLoaded && analyticsChartRef.current && (window as any).Chart) {
      new (window as any).Chart(analyticsChartRef.current, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [{
            label: 'Revenue',
            data: revenueData,
            fill: true,
            backgroundColor: 'rgba(34,211,238,0.1)',
            borderColor: 'rgba(34,211,238,1)',
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: true, text: 'Zoho Analytics Revenue' }
          }
        }
      });
    }
  }, [chartLoaded, revenueData]);

  return (
    <section className="section">
      <div className="container">
        <h2 className="text-center mb-8 text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Zoho Enterprise Dashboard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="glass-panel data-visualization relative">
            <span className="zoho-badge">ZOHO CRM LIVE</span>
            <h3 className="mb-6 text-xl font-bold">Customer Pipeline</h3>
            <canvas ref={crmChartRef} height={300}></canvas>
          </div>
          <div className="glass-panel data-visualization relative">
            <span className="zoho-badge">ZOHO ANALYTICS</span>
            <h3 className="mb-6 text-xl font-bold">Revenue Analytics</h3>
            <canvas ref={analyticsChartRef} height={300}></canvas>
          </div>
        </div>
        <div className="glass-panel p-8">
          <h3 className="mb-6 text-xl font-bold">Recent Zoho CRM Activities</h3>
          <div id="zoho-activities" style={{ maxHeight: 400, overflowY: 'auto' }}>
            {activities.length === 0 ? (
              <div className="text-white/60">No recent activities.</div>
            ) : (
              activities.map((a, i) => (
                <div key={i} className="activity-item py-4 border-b border-white/10">
                  <div className="flex justify-between mb-2">
                    <strong>{a.type}</strong>
                    <span className="text-xs text-slate-400">{new Date(a.time).toLocaleString()}</span>
                  </div>
                  <p className="opacity-90 m-0">{a.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
