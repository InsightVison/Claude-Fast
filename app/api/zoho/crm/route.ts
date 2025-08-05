// app/api/zoho/crm/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Simulate Zoho CRM data
    const mockDeals = [
      {
        id: 'deal_001',
        Deal_Name: 'Enterprise Software License',
        Amount: 150000,
        Stage: 'Proposal/Price Quote',
        Account_Name: 'TechCorp Solutions',
        Owner: 'Sarah Johnson',
        Closing_Date: '2025-02-15',
        Created_Time: '2025-01-10T10:30:00Z',
        Modified_Time: new Date().toISOString(),
        probability: 75,
        description: 'Large enterprise deal with potential for expansion'
      },
      {
        id: 'deal_002', 
        Deal_Name: 'Cloud Migration Project',
        Amount: 89000,
        Stage: 'Negotiation/Review',
        Account_Name: 'GlobalTech Inc',
        Owner: 'Mike Chen',
        Closing_Date: '2025-01-30',
        Created_Time: '2025-01-05T14:20:00Z',
        Modified_Time: new Date().toISOString(),
        probability: 60,
        description: 'Multi-phase cloud infrastructure migration'
      },
      {
        id: 'deal_003',
        Deal_Name: 'AI Integration Services', 
        Amount: 235000,
        Stage: 'Closed Won',
        Account_Name: 'Innovation Labs',
        Owner: 'Lisa Rodriguez',
        Closing_Date: '2025-01-20',
        Created_Time: '2024-12-15T09:45:00Z',
        Modified_Time: new Date().toISOString(),
        probability: 100,
        description: 'Complete AI transformation project'
      }
    ];

    // Simulate API response delay
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));

    return NextResponse.json({
      success: true,
      data: mockDeals,
      total_records: mockDeals.length,
      timestamp: new Date().toISOString(),
      api_version: 'v2.1'
    });

  } catch (error) {
    console.error('Zoho CRM API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch Zoho CRM data',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const dealData = await req.json();
    
    // Simulate creating a new deal in Zoho CRM
    const newDeal = {
      id: `deal_${Date.now()}`,
      ...dealData,
      Created_Time: new Date().toISOString(),
      Modified_Time: new Date().toISOString(),
      Owner: dealData.Owner || 'System User'
    };

    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));

    return NextResponse.json({
      success: true,
      data: newDeal,
      message: 'Deal created successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Zoho CRM create error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create deal in Zoho CRM',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}
