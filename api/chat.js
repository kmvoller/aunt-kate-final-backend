export default function handler(req, res) {
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
  const msg = (message || '').toLowerCase();
  const isProUser = userToken && userToken.includes('_pro');

  // Simple usage tracking for free users
  if (!isProUser) {
    // You could add usage tracking here
  }

  let response = "Hello! I'm Aunt Kate, your healthcare advocate.";

  if (msg.includes('denial') || msg.includes('denied')) {
    response = `I understand how frustrating insurance denials can be! Here's what to do:

1. **Get the full denial letter** with specific reason codes
2. **Review your policy** to confirm coverage
3. **Gather documentation** - medical records, doctor notes
4. **File an appeal** within 60-180 days
5. **Get your doctor's support** with a medical necessity letter

60% of properly documented appeals succeed! Don't give up after the first denial.`;
  } else if (msg.includes('bill') || msg.includes('billing')) {
    response = `Medical bills often contain errors! Here's how to review yours:

1. **Request itemized bill** with procedure codes
2. **Compare with medical records** from your visit
3. **Look for duplicate charges** or services not received
4. **Question unclear charges** with billing department
5. **Apply for financial assistance** if needed

80% of medical bills contain mistakes. You have the right to dispute incorrect charges!`;
  }

  return res.status(200).json({
    response: response,
    status: 'success',
    timestamp: new Date().toISOString(),
    remaining: isProUser ? null : 4 // Simple demo remaining count
  });
}
