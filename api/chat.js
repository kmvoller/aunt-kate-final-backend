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

  // Debug: Check if API key exists
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({
      error: 'OpenAI API key not configured',
      response: "I'm having configuration issues. Please contact support."
    });
  }

  try {
    console.log('Making OpenAI API call...');
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // Cheaper model for testing
        messages: [
          {
            role: 'system',
            content: `You are Aunt Kate, a warm healthcare advocate. Respond conversationally without numbered lists.`
          },
          {
            role: 'user', 
            content: message
          }
        ],
        max_tokens: 200,
        temperature: 0.7
      })
    });

    console.log('OpenAI response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.text();
      console.log('OpenAI error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return res.status(200).json({
      response: aiResponse,
      status: 'success',
      aiGenerated: true,
      remaining: isProUser ? null : 4
    });

  } catch (error) {
    console.error('Detailed error:', error);
    return res.status(500).json({
      error: 'AI service error: ' + error.message,
      response: "I'm having trouble connecting to my AI brain right now. Please try again in a moment!"
    });
  }
}
