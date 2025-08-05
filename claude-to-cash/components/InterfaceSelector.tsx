'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Interface {
  id: string;
  name: string;
  category: string;
  preview: string;
  tags: string[];
  style: 'modern' | 'minimal' | 'corporate' | 'creative';
}

/**
 * 🎨 THE GAME CHANGER: Your 3000+ Interface Selector
 * This is what turns your mysaasinterface.com collection into MONEY
 */
export function InterfaceSelector({ 
  onInterfaceSelect,
  prompt 
}: { 
  onInterfaceSelect: (selectedInterface: Interface) => void;
  prompt: string;
}) {
  const [interfaces, setInterfaces] = useState<Interface[]>([]);
  const [selectedInterface, setSelectedInterface] = useState<Interface | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMatchingInterfaces(prompt);
  }, [prompt]);

  const loadMatchingInterfaces = async (userPrompt: string) => {
    setLoading(true);
    
    try {
      // 🚀 AI-POWERED INTERFACE MATCHING
      const response = await fetch('/api/interfaces/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: userPrompt,
          source: 'mysaasinterface.com' 
        })
      });
      
      const matchedInterfaces = await response.json();
      setInterfaces(matchedInterfaces.slice(0, 12)); // Show top 12 matches
    } catch (error) {
      console.error('Failed to load interfaces:', error);
      // Fallback to demo interfaces
      setInterfaces(getDemoInterfaces());
    } finally {
      setLoading(false);
    }
  };

  const handleInterfaceSelect = (selectedInterface: Interface) => {
    setSelectedInterface(selectedInterface);
    onInterfaceSelect(selectedInterface);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl h-64 border border-white/20"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* AI Match Results Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">
          🎯 Perfect Interface Matches
        </h3>
        <p className="text-white/70">
          AI selected {interfaces.length} gorgeous interfaces from your 3000+ collection
        </p>
      </div>

      {/* Interface Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interfaces.map((iface) => (
          <InterfaceCard
            key={iface.id}
            interface={iface}
            isSelected={selectedInterface?.id === iface.id}
            onSelect={() => handleInterfaceSelect(iface)}
          />
        ))}
      </div>

      {/* Selected Interface Preview */}
      {selectedInterface && (
        <SelectedInterfacePreview 
          interface={selectedInterface}
          onConfirm={() => console.log('Deploying with interface:', selectedInterface.id)}
        />
      )}
    </div>
  );
}

function InterfaceCard({ 
  interface: iface, 
  isSelected, 
  onSelect 
}: {
  interface: Interface;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <div 
      className={`
        relative group cursor-pointer transition-all duration-300
        ${isSelected 
          ? 'ring-2 ring-blue-400 scale-105' 
          : 'hover:scale-105 hover:ring-1 hover:ring-white/30'
        }
      `}
      onClick={onSelect}
    >
      {/* Glassmorphism Card */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
        {/* Interface Preview */}
        <div className="relative h-48 bg-gradient-to-br from-purple-400/20 to-blue-400/20">
          <Image
            src={iface.preview}
            alt={iface.name}
            fill
            className="object-cover"
            onError={(e) => {
              // Fallback to gradient if image fails
              e.currentTarget.style.display = 'none';
            }}
          />
          
          {/* Style Badge */}
          <div className="absolute top-3 right-3">
            <span className={`
              px-2 py-1 rounded-full text-xs font-medium
              ${getStyleBadgeColor(iface.style)}
            `}>
              {iface.style}
            </span>
          </div>
          
          {/* Selection Overlay */}
          {isSelected && (
            <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
              <div className="bg-blue-500 text-white p-2 rounded-full">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Interface Info */}
        <div className="p-4">
          <h4 className="text-white font-semibold mb-2">{iface.name}</h4>
          <p className="text-white/60 text-sm mb-3">{iface.category}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {iface.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag}
                className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectedInterfacePreview({ 
  interface: iface, 
  onConfirm 
}: {
  interface: Interface;
  onConfirm: () => void;
}) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        
        <div>
          <h4 className="text-xl font-bold text-white">Perfect Match Selected!</h4>
          <p className="text-white/70">{iface.name} - {iface.category}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Preview */}
        <div className="relative h-64 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-xl overflow-hidden">
          <Image
            src={iface.preview}
            alt={iface.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div>
            <h5 className="text-white font-semibold mb-2">What You Get:</h5>
            <ul className="text-white/80 space-y-1">
              <li>✅ Pixel-perfect React components</li>
              <li>✅ Responsive design (mobile-first)</li>
              <li>✅ Tailwind CSS styling</li>
              <li>✅ TypeScript support</li>
              <li>✅ Accessibility compliant</li>
              <li>✅ Production-ready code</li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-2">Features:</h5>
            <div className="flex flex-wrap gap-1">
              {iface.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={onConfirm}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            🚀 Deploy This Interface
          </button>
        </div>
      </div>
    </div>
  );
}

// Utility Functions
function getStyleBadgeColor(style: string) {
  const colors: Record<string, string> = {
    modern: 'bg-blue-500/80 text-white',
    minimal: 'bg-gray-500/80 text-white',
    corporate: 'bg-purple-500/80 text-white',
    creative: 'bg-pink-500/80 text-white'
  };
  return colors[style] || colors.modern;
}

function getDemoInterfaces(): Interface[] {
  return [
    {
      id: '1',
      name: 'Modern SaaS Dashboard',
      category: 'Dashboard',
      preview: '/api/placeholder/400/300',
      tags: ['dashboard', 'analytics', 'modern'],
      style: 'modern'
    },
    {
      id: '2',
      name: 'E-commerce Storefront',
      category: 'E-commerce',
      preview: '/api/placeholder/400/300',
      tags: ['shop', 'products', 'cart'],
      style: 'minimal'
    },
    {
      id: '3',
      name: 'Corporate CRM',
      category: 'CRM',
      preview: '/api/placeholder/400/300',
      tags: ['crm', 'contacts', 'pipeline'],
      style: 'corporate'
    },
    {
      id: '4',
      name: 'Creative Portfolio',
      category: 'Portfolio',
      preview: '/api/placeholder/400/300',
      tags: ['portfolio', 'gallery', 'creative'],
      style: 'creative'
    },
    {
      id: '5',
      name: 'Healthcare Portal',
      category: 'Healthcare',
      preview: '/api/placeholder/400/300',
      tags: ['medical', 'patients', 'appointments'],
      style: 'modern'
    },
    {
      id: '6',
      name: 'Finance Dashboard',
      category: 'Finance',
      preview: '/api/placeholder/400/300',
      tags: ['finance', 'banking', 'charts'],
      style: 'corporate'
    }
  ];
}
