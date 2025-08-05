// app/api/zoho/activities/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Simulate Zoho CRM activities/tasks
    const mockActivities = [
      {
        id: 'activity_001',
        Subject: 'Follow up on Enterprise proposal',
        Activity_Type: 'Call',
        Status: 'Completed',
        Priority: 'High',
        Due_Date: '2025-01-15',
        Created_Time: '2025-01-10T10:30:00Z',
        Modified_Time: new Date().toISOString(),
        Owner: 'Sarah Johnson',
        Related_To: 'deal_001',
        Description: 'Discussed pricing and implementation timeline'
      },
      {
        id: 'activity_002',
        Subject: 'Send technical specifications',
        Activity_Type: 'Email',
        Status: 'In Progress', 
        Priority: 'Medium',
        Due_Date: '2025-01-18',
        Created_Time: '2025-01-12T14:20:00Z',
        Modified_Time: new Date().toISOString(),
        Owner: 'Mike Chen',
        Related_To: 'deal_002',
        Description: 'Prepare detailed technical documentation for review'
      },
      {
        id: 'activity_003',
        Subject: 'Project kickoff meeting',
        Activity_Type: 'Meeting',
        Status: 'Scheduled',
        Priority: 'High',
        Due_Date: '2025-01-25',
        Created_Time: '2025-01-20T09:45:00Z', 
        Modified_Time: new Date().toISOString(),
        Owner: 'Lisa Rodriguez',
        Related_To: 'deal_003',
        Description: 'Initial project planning and team introductions'
      }
    ];

    // Simulate API response delay
    await new Promise(resolve => setTimeout(resolve, 150 + Math.random() * 250));

    return NextResponse.json({
      success: true,
      data: mockActivities,
      total_records: mockActivities.length,
      timestamp: new Date().toISOString(),
      api_version: 'v2.1'
    });

  } catch (error) {
    console.error('Zoho Activities API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch Zoho activities',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const activityData = await req.json();
    
    // Simulate creating a new activity in Zoho CRM
    const newActivity = {
      id: `activity_${Date.now()}`,
      ...activityData,
      Created_Time: new Date().toISOString(),
      Modified_Time: new Date().toISOString(),
      Owner: activityData.Owner || 'System User',
      Status: activityData.Status || 'Not Started'
    };

    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 400));

    return NextResponse.json({
      success: true,
      data: newActivity,
      message: 'Activity created successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Zoho Activity create error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create activity in Zoho CRM',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}
