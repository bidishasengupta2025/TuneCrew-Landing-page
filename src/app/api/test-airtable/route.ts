import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test reading from Airtable
    const response = await fetch(
      `https://api.airtable.com/v0/appDJekIPcY0WUhXI/Users?maxRecords=3`,
      {
        headers: {
          'Authorization': `Bearer patfWUBwFU5w966d0.25ca6a4d6e83655fd8f864b12211740e91a80310116cc89009b5ffc821d9bece`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json(
        { 
          error: 'Failed to connect to Airtable',
          status: response.status,
          details: errorData
        },
        { status: 500 }
      );
    }

    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      message: 'Airtable connection successful',
      recordCount: data.records?.length || 0,
      records: data.records || []
    });

  } catch (error) {
    console.error('Airtable test error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to test Airtable connection',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 