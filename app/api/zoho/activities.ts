// Enhanced Zoho activities with real-time updates
export async function GET() {
  const now = Date.now();
  const activities = [
    { 
      type: 'Deal Won 🎉', 
      message: 'Closed enterprise deal: $125,000 with Acme Corp - Q4 target exceeded!', 
      time: now - 1000 * 60 * 2,
      priority: 'high',
      value: 125000
    },
    { 
      type: 'Lead Qualified', 
      message: 'New qualified lead: Beta Industries (500+ employees) - Enterprise SaaS interest', 
      time: now - 1000 * 60 * 8,
      priority: 'medium',
      value: 87500
    },
    { 
      type: 'Meeting Scheduled', 
      message: 'Demo scheduled with Gamma LLC CTO - Next Tuesday 2PM EST', 
      time: now - 1000 * 60 * 15,
      priority: 'medium',
      value: 156000
    },
    { 
      type: 'Proposal Sent', 
      message: 'Custom integration proposal sent to Delta Corp - 48h response expected', 
      time: now - 1000 * 60 * 32,
      priority: 'high',
      value: 203000
    },
    { 
      type: 'Contact Updated', 
      message: 'Updated Epsilon Inc contact - Added decision maker: Sarah Johnson (VP Engineering)', 
      time: now - 1000 * 60 * 45,
      priority: 'low',
      value: 0
    },
    { 
      type: 'Opportunity Created', 
      message: 'New opportunity: Zeta Corp multi-cloud deployment - $340K potential', 
      time: now - 1000 * 60 * 67,
      priority: 'high',
      value: 340000
    },
    { 
      type: 'Task Completed', 
      message: 'Completed technical assessment for Eta Solutions - Moving to proposal stage', 
      time: now - 1000 * 60 * 89,
      priority: 'medium',
      value: 95000
    },
    { 
      type: 'Follow-up Scheduled', 
      message: 'Follow-up call scheduled with Theta Inc - Friday 10AM PST', 
      time: now - 1000 * 60 * 120,
      priority: 'low',
      value: 0
    }
  ];
  
  return Response.json(activities);
}

export async function POST(request: Request) {
  try {
    const { type, message, priority = 'medium', value = 0 } = await request.json();
    
    const newActivity = {
      type,
      message,
      time: Date.now(),
      priority,
      value,
      id: Date.now()
    };
    
    // In a real app, this would save to database and broadcast via WebSocket
    return Response.json({
      success: true,
      activity: newActivity,
      message: 'Activity added successfully'
    });
    
  } catch (error: any) {
    return Response.json({
      success: false,
      error: error.message
    }, { status: 400 });
  }
}
