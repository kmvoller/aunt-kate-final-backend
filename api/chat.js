// api/chat.js - Real AI Healthcare Advocacy Chatbot with Claude
// This version should definitely work! Claude API key added.

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'This endpoint only accepts POST requests' 
    });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: 'Missing message',
        message: 'Please provide a message in your request'
      });
    }

    // Call Claude AI for healthcare advocacy response
    const response = await getClaudeResponse(message);

    return res.status(200).json({
      response: response,
      status: 'success',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    
    // Fallback response if Claude API fails
    const fallbackResponse = getFallbackResponse(error);
    
    return res.status(200).json({
      response: fallbackResponse,
      status: 'success',
      timestamp: new Date().toISOString()
    });
  }
}

async function getClaudeResponse(userMessage) {
  const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
  
  if (!CLAUDE_API_KEY) {
    throw new Error('Claude API key not configured');
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': CLAUDE_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-haiku-20240307', // Fast and affordable model
      max_tokens: 1000,
      system: `You are Aunt Kate, a knowledgeable and empathetic healthcare advocate who helps people navigate the complex healthcare system. Your expertise includes:

- Insurance denials, appeals, and prior authorizations
- Medical billing errors and disputes
- Patient rights and advocacy
- Prescription access and cost-saving strategies
- Preparing for medical appointments
- Understanding healthcare terminology and processes

Guidelines for your responses:
- Provide specific, actionable advice
- Include step-by-step instructions when appropriate
- Mention relevant deadlines and timeframes
- Reference patient rights and legal protections
- Suggest resources and next steps
- Use encouraging but realistic language
- Keep responses focused and practical
- If asked about multiple issues, ask them to focus on one at a time for detailed help

Always remember: You're helping people advocate for themselves in a system that can be overwhelming and intimidating. Be their knowledgeable ally.`,
      messages: [
        {
          role: 'user',
          content: userMessage
        }
      ]
    })
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Claude API error: ${response.status} - ${errorData}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

function getFallbackResponse(error) {
  // Provide helpful fallback if Claude API is unavailable
  return `I'm Aunt Kate, your healthcare advocate. I'm experiencing some technical difficulties right now, but I'm here to help you navigate healthcare challenges.

**Common areas I help with:**
• **Insurance denials and appeals** - Don't give up after the first denial!
• **Medical billing errors** - 80% of bills contain mistakes
• **Patient rights** - Know what you're entitled to
• **Prescription access** - Cost-saving strategies and appeals
• **Appointment preparation** - Make the most of your time with providers

**Immediate steps for any healthcare challenge:**
1. **Document everything** - Keep detailed records
2. **Know your rights** - You have more power than you think
3. **Ask questions** - Don't accept unclear explanations
4. **Get things in writing** - Verbal promises aren't enough
5. **Don't pay disputed bills** until resolved

Please try asking your question again in a moment, or contact your insurance company directly if it's urgent. I'll be back to full capacity shortly!

**Emergency resources:**
- Your state insurance commissioner for complaints
- Hospital financial assistance programs
- Patient advocacy organizations in your area`;
}
