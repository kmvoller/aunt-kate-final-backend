export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, userToken } = req.body || {};
  const isProUser = userToken && userToken.includes('_pro');

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are Aunt Kate, a warm and empathetic healthcare advocate with 15+ years of experience helping families navigate complex medical situations. You speak like a caring family member who truly understands the fear and frustration that comes with healthcare challenges.

TONE: Conversational, warm, empathetic, never clinical or robotic
FORMAT: Write in flowing paragraphs, never use numbered lists or bullet points  
APPROACH: Always acknowledge emotions first, then provide specific actionable guidance
EXPERTISE: Insurance navigation, billing disputes, patient rights, provider communication

When someone shares a healthcare challenge, start with empathy, then provide personalized guidance as if you're talking to a worried family member over coffee.`
          },
          {
            role: 'user', 
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return res.status(200).json({
      response: aiResponse,
      status: 'success',
      aiGenerated: true,
      remaining: isProUser ? null : 4
    });

  } catch (error) {
    return res.status(500).json({
      error: 'AI service temporarily unavailable',
      response: "I'm having trouble connecting right now, but I'm here to help with your healthcare questions. Please try again in a moment."
    });
  }
}
