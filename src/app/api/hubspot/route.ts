import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    
    const HUBSPOT_PORTAL_ID = '144844059'
    const HUBSPOT_FORM_ID = '38ed46a6-353b-414a-a0d7-51fa3bd8a73e'
    
    const hubspotData = {
      fields: [
        { name: 'firstname', value: data.firstName },
        { name: 'lastname', value: data.lastName },
        { name: 'email', value: data.businessEmail },
        { name: 'phone', value: data.phoneNumber },
        { name: 'company', value: data.companyName },
        { name: 'jobtitle', value: data.jobTitle },
        { name: 'number_of_employees', value: data.numberOfEmployees },
        { name: 'areas_of_interest', value: data.areasOfInterest },
        { name: 'message', value: data.additionalInfo || '' }
      ],
      context: {
        pageUri: 'https://coursinity.com/contact-form',
        pageName: 'Contact Form'
      }
    }

    
    const hubspotResponse = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(hubspotData)
      }
    )

    const hubspotResult = await hubspotResponse.json()
   

    if (hubspotResponse.ok) {
      return NextResponse.json({
        success: true,
        message: 'Contact submitted to HubSpot successfully',
        hubspotData: hubspotResult
      })
    } else {
     
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to submit to HubSpot',
          details: hubspotResult
        },
        { status: 500 }
      )
    }

  } catch (error) {
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    )
  }
}
