import { NextRequest, NextResponse } from 'next/server';

interface WaitlistData {
  email: string;
  firstName: string;
  lastName: string;
  userType: string;
  platformFocus: string[];
  monthlyBudget: string;
  currentTools: string;
  biggestChallenge: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: WaitlistData = await request.json();
    
    console.log('Received waitlist submission:', body);
    
    // Validate required fields
    if (!body.email || !body.firstName || !body.lastName || !body.userType || body.platformFocus.length === 0) {
      console.log('Validation failed - missing fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Prepare data for Airtable
    const airtableData = {
      records: [
        {
          fields: {
            'Email': body.email,
            'First Name': body.firstName,
            'Last Name': body.lastName,
            'User Type': body.userType,
            'Platform Focus': body.platformFocus.join(', '),
            'Monthly Budget': body.monthlyBudget || '',
            'Current Tools': body.currentTools || '',
            'Biggest Challenge': body.biggestChallenge || '',
            'Submission Date': new Date().toISOString(),
            'Status': 'Waitlist'
          }
        }
      ]
    };

    // Submit to Airtable
    console.log('Submitting to Airtable:', airtableData);
    
    const response = await fetch(
      `https://api.airtable.com/v0/appDJekIPcY0WUhXI/Users`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer patfWUBwFU5w966d0.25ca6a4d6e83655fd8f864b12211740e91a80310116cc89009b5ffc821d9bece`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(airtableData),
      }
    );

    console.log('Airtable response status:', response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Airtable error:', errorData);
      throw new Error(`Airtable API error: ${response.status}`);
    }

    const result = await response.json();
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully joined the waitlist!',
        recordId: result.records?.[0]?.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to submit waitlist form. Please try again.' 
      },
      { status: 500 }
    );
  }
} 