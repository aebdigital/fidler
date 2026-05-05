import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const apiKey = process.env.SMTP2GO_API_KEY;
    const recipient = process.env.CONTACT_FORM_RECIPIENT;
    const sender = process.env.SMTP2GO_SENDER;

    if (!apiKey || !recipient || !sender) {
      console.error('Missing SMTP2GO configuration');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const response = await fetch('https://api.smtp2go.com/v3/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: apiKey,
        to: [recipient],
        sender: sender,
        subject: `Nová správa od: ${name}`,
        text_body: `Meno: ${name}\nE-mail: ${email}\nSpráva:\n${message}`,
        html_body: `
          <h2>Nová správa z kontaktného formulára</h2>
          <p><strong>Meno:</strong> ${name}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Správa:</strong><br/>${message.replace(/\\n/g, '<br/>')}</p>
        `
      })
    });

    if (response.ok) {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      const errorData = await response.json();
      console.error('SMTP2GO Error:', errorData);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
  } catch (error) {
    console.error('Contact Form Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
