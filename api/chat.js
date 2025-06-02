// api/chat.js - Final Working Healthcare Advocacy API
// This version should definitely work!

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

    // Generate healthcare advocacy response
    const response = generateHealthcareResponse(message);

    return res.status(200).json({
      response: response,
      status: 'success',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Something went wrong processing your request'
    });
  }
}

function generateHealthcareResponse(userMessage) {
  const msg = userMessage.toLowerCase();
  
  // Check if multiple questions (numbered lists or multiple question marks)
  const hasMultipleQuestions = (msg.match(/\?/g) || []).length > 1 || 
                               /\d+\.\s/.test(msg) || 
                               (msg.includes('\n') && msg.length > 200);
  
  if (hasMultipleQuestions) {
    return handleMultipleQuestions(userMessage);
  }
  
  // Specific scenario handling
  if (msg.includes('missed') && msg.includes('deadline')) {
    return `🚨 Missing appeal deadlines is stressful, but you still have options:

**Late Appeal Options:**
1. **Good Cause Exception** - Contact your insurer immediately explaining why you missed the deadline
2. **State Insurance Commissioner** - File a complaint if you weren't properly notified
3. **External Review** - Some states allow late external appeals for good cause
4. **Legal Aid** - Contact local legal aid for assistance with late appeals

**Valid Reasons for Late Appeals:**
• Never received the denial letter
• Serious illness preventing timely response
• Death in family or emergency
• Postal service delays
• Insurer provided wrong deadline information

**Action Steps:**
1. Call your insurance immediately to request a late appeal
2. Document why you missed the deadline
3. File with your state insurance commissioner simultaneously
4. Gather all medical documentation quickly

⏰ Time is critical - act within the next few days if possible. Many late appeals are accepted with valid explanations!`;
  }

  if (msg.includes('prior authorization') || msg.includes('prior auth')) {
    return `Prior authorization is insurance's way of pre-approving expensive treatments - here's what you need to know:

**What is Prior Authorization?**
• Insurance approval required BEFORE receiving certain treatments
• Designed to control costs and ensure medical necessity
• Required for expensive procedures, medications, specialist visits

**Why You Didn't Know:**
• Many doctors' offices handle this automatically
• Sometimes insurance changes requirements without notice
• Emergency situations may bypass prior auth requirements

**How to Handle This:**
1. **Ask your doctor's office** - They usually handle prior auth requests
2. **Call insurance** - Get the specific requirements and forms needed
3. **Submit medical justification** - Doctor must explain why treatment is necessary
4. **Follow up regularly** - Prior auth can take 3-15 business days

**If Denied:**
• Appeal immediately with stronger medical justification
• Get peer-to-peer review (doctor talks to insurance doctor)
• Request expedited review for urgent situations

**Emergency Exception:**
If you need immediate treatment, get it and appeal later - emergency care often overrides prior auth requirements.`;
  }

  if (msg.includes('experimental') || msg.includes('investigational')) {
    return `"Experimental" or "investigational" denials are common but often challengeable:

**What This Means:**
• Insurance claims the treatment isn't proven effective
• Often used to deny newer, expensive treatments
• Sometimes used incorrectly for established treatments

**How to Fight This:**
1. **Get peer-reviewed studies** - Ask your doctor for research supporting the treatment
2. **Check FDA approval** - If FDA-approved, it's not truly experimental
3. **Find coverage policies** - Some insurers cover "experimental" treatments in certain cases
4. **Appeal with evidence** - Submit medical literature supporting effectiveness

**Strong Appeal Arguments:**
• Treatment is FDA-approved for your condition
• Major medical organizations recommend it
• Peer-reviewed studies show effectiveness
• Standard treatments have failed for you
• Treatment is widely accepted in medical community

**Special Cases:**
• **Clinical trials** - May be covered if standard treatments failed
• **Off-label use** - FDA-approved drugs used for different conditions
• **Rare diseases** - Often get special consideration

**Next Steps:**
1. Request your insurance's medical coverage policy for this treatment
2. Get detailed letter from doctor explaining medical necessity
3. Gather supporting research and FDA information
4. Consider external review if internal appeal fails

Your child deserves access to effective treatments - don't give up after the first denial!`;
  }

  if (msg.includes('out-of-network') && msg.includes('emergency')) {
    return `Out-of-network emergency billing is a common but often illegal practice:

**Your Rights in Emergencies:**
• Emergency services MUST be covered at in-network rates
• You cannot be "balance billed" for emergency care
• This applies even if the hospital is out-of-network
• Protections under the No Surprises Act (federal law)

**What to Do:**
1. **Don't pay the bill yet** - You likely don't owe these charges
2. **Contact your insurance** - Demand they cover at in-network rates
3. **File a complaint** - With your state insurance commissioner
4. **Document everything** - Keep all records of the emergency

**Common Situations:**
• Emergency room physician is out-of-network (not allowed to balance bill)
• Ambulance took you to out-of-network hospital
• Emergency procedure by out-of-network specialist
• Anesthesiologist during emergency surgery

**How to Fight This:**
1. Call the billing department and explain it was an emergency
2. Request all charges be adjusted to in-network rates
3. File appeals with both insurance and the hospital
4. Reference the No Surprises Act in all communications

**Get Help:**
• State insurance commissioner
• Hospital financial assistance office
• Patient advocate organizations
• Legal aid if needed

You should NOT have to pay out-of-network rates for emergency care - this is protected by federal law!`;
  }

  if (msg.includes('medically necessary')) {
    return `"Not medically necessary" is insurance-speak for "we don't want to pay" - here's how to fight it:

**What This Really Means:**
• Insurance thinks there are cheaper alternatives
• They believe the treatment is optional or cosmetic
• Internal guidelines don't support coverage
• Often a cost-saving denial, not medical judgment

**How to Prove Medical Necessity:**
1. **Get detailed doctor's letter** explaining why this specific treatment is needed
2. **Document failed alternatives** - Show you tried cheaper options first
3. **Provide medical records** - Demonstrate your condition's severity
4. **Get specialist support** - Referrals from specialists carry more weight

**Strong Medical Necessity Arguments:**
• Treatment is the gold standard for your condition
• Less expensive treatments have failed or aren't appropriate
• Delaying treatment could worsen your condition
• Treatment prevents more expensive complications
• Your specific medical history requires this approach

**Appeal Strategy:**
1. **Use medical terminology** - Not emotional language
2. **Reference clinical guidelines** - Show treatment is standard of care
3. **Include supporting research** - Peer-reviewed studies
4. **Get peer-to-peer review** - Doctor talks directly to insurance medical director

**If Denied Again:**
• Request external independent review
• File complaint with state insurance commissioner
• Consider legal assistance for expensive treatments

Remember: Insurance companies often deny first and approve on appeal - don't give up after the first "not medically necessary" denial!`;
  }

  // Prescription-specific denials
  if (msg.includes('prescription') && (msg.includes('denied') || msg.includes('rejected'))) {
    return `Prescription denials are frustrating but often overturnable:

**Common Reasons for Prescription Denials:**
• Not on insurance formulary (approved drug list)
• Requires prior authorization
• Quantity limits exceeded
• Step therapy required (try cheaper drugs first)
• Generic available (must try generic first)

**Immediate Actions:**
1. **Ask pharmacist** - They often know quick solutions
2. **Check formulary alternatives** - Similar drugs that are covered
3. **Contact doctor's office** - They may handle appeals automatically
4. **Request prior authorization** - Doctor submits medical justification

**Doctor's Appeal Letter Should Include:**
• Why this specific medication is necessary
• What other medications you've tried and failed
• Side effects from alternative medications
• Your specific medical condition requiring this drug
• Consequences of not getting this medication

**Cost-Saving Alternatives While Appealing:**
• Manufacturer patient assistance programs
• GoodRx or similar discount programs
• 30-day supply instead of 90-day while appealing
• Samples from doctor's office
• Pharmacy discount programs

**Appeal Timeline:**
• Standard appeal: 30 days
• Expedited appeal: 72 hours (if urgent)
• External review if internal appeal fails

Your doctor prescribed this medication for a reason - insurance companies often approve on appeal what they initially deny!`;
  }

  // General insurance denials
  if (msg.includes('denied') || msg.includes('rejection') || msg.includes('rejected')) {
    return `I understand how frustrating insurance denials can be. Here's your action plan:

**Immediate Steps:**
1. **Request the full denial letter** - Get the specific reason code
2. **Review your policy** - Confirm the service should be covered  
3. **Gather documentation** - Medical records, doctor's notes, policy documents
4. **File an appeal within deadlines** - Usually 60-180 days

**Appeal Success Tips:**
• 60% of properly documented appeals succeed
• Use medical terminology, not emotional language
• Get your doctor to write a strong support letter
• Reference specific policy language
• Keep copies and send via certified mail

**Next Steps:**
- Internal appeal first (required)
- External review if internal fails (often binding in your favor)

**Documents You Need for Appeals:**
• Original denial letter with reason codes
• Complete medical records related to treatment
• Doctor's letter of medical necessity
• Your insurance policy or benefits summary
• Any supporting medical research or guidelines
• Records of previous treatments tried

**Appeal Letter Should Include:**
• Patient information and claim number
• Specific reason you're appealing
• Medical justification for treatment
• Reference to policy coverage language
• Request for specific action (approve treatment/payment)

Would you like help writing your appeal letter or understanding specific denial codes?`;
  }

  // Medical billing
  if (msg.includes('bill') || msg.includes('billing') || msg.includes('charge')) {
    return `Medical billing errors are incredibly common - let me help you spot and fight them!

**Bill Review Checklist:**
• Compare with your medical records
• Look for duplicate charges
• Check for services not received
• Verify correct procedure codes
• Watch for "upcoding" (charging for more expensive services)

**Common Billing Errors:**
• Room charges for unnecessary time
• Medication markups (300%+ markup is common)
• Facility fees vs. provider fees confusion
• Out-of-network surprise billing

**Your Rights:**
• Request itemized, detailed bills
• Negotiate payment plans
• Apply for financial assistance (hospitals must offer this)
• Dispute incorrect charges
• Request charity care if eligible

**Action Steps:**
1. Get itemized bill with procedure codes
2. Cross-reference with visit notes
3. Question anything unclear
4. Contact billing department for errors

Share your specific billing concerns and I'll help you review them!`;
  }

  // Doctor/appointment prep
  if (msg.includes('doctor') || msg.includes('appointment') || msg.includes('physician')) {
    return `Great! Let me help you advocate for yourself with healthcare providers:

**Before Your Appointment:**
• Write down all questions in advance
• List current medications and dosages
• Gather relevant medical history
• Know your insurance requirements
• Bring an advocate if needed

**During Your Visit:**
• Take notes or record (if allowed)
• Ask for clarification on anything unclear
• Request copies of test results
• Discuss all treatment options and costs
• Don't feel rushed - you deserve thorough care

**Red Flags to Watch For:**
• Dismissing your concerns quickly
• Refusing to explain treatments
• Pushing expensive procedures without alternatives
• Not providing cost estimates

**Your Patient Rights:**
• Informed consent for all procedures
• Access to your complete medical records
• Second opinions
• Respectful, culturally competent care
• Clear communication about costs

What specific situation with your healthcare provider can I help you prepare for?`;
  }

  // Prescription/medication help
  if (msg.includes('prescription') || msg.includes('medication') || msg.includes('drug')) {
    return `Prescription costs and access are major challenges - here's how to fight back:

**Cost-Saving Strategies:**
• Ask for generic alternatives (can save 80-90%)
• Compare pharmacy prices (vary 300%+ for same drug)
• Look for manufacturer patient assistance programs
• Try GoodRx or similar discount programs
• Consider 90-day supplies (often cheaper per dose)

**Insurance Issues:**
• Appeal prior authorization denials
• Request step therapy exceptions
• Fight formulary restrictions
• Document medical necessity clearly

**Access Solutions:**
• Pharmacy patient assistance programs
• Samples from your doctor
• Patient advocacy organizations
• State prescription assistance programs

**Your Rights:**
• Know why specific medications are prescribed
• Understand all side effects and alternatives
• Appeal insurance coverage decisions
• Access affordable medications

What specific medication challenge are you facing? High costs? Denied coverage? Side effects? I'll provide targeted help.`;
  }

  // Default comprehensive response
  return `Hello! I'm Aunt Kate, your personal healthcare advocate. I'm here to help you navigate our complex healthcare system and fight for the care you deserve.

**I specialize in helping with:**
🏥 **Insurance Issues** - Denials, appeals, prior authorizations, claim disputes
💰 **Medical Billing** - Error spotting, payment plans, financial assistance
👩‍⚕️ **Provider Communication** - Appointment prep, understanding treatments  
⚖️ **Patient Rights** - What you're entitled to, filing complaints
💊 **Prescription Access** - Cost savings, coverage appeals, alternatives

**For Best Results:**
Please ask me **one specific question at a time** so I can give you detailed, targeted advice for your exact situation.

**Common Questions I Help With:**
• "My insurance denied my surgery - what should I do?"
• "I missed my appeal deadline - is there anything I can do?"
• "They say my treatment isn't medically necessary - how do I fight this?"
• "I got an out-of-network bill for emergency care - is that legal?"
• "My prescription was denied - why does this happen?"

I'm available 24/7 to help you become your own best healthcare advocate. What specific challenge are you facing today?`;
}

function handleMultipleQuestions(userMessage) {
  // Extract key topics from the multiple questions
  const msg = userMessage.toLowerCase();
  const topics = [];
  
  if (msg.includes('surgery') && msg.includes('denied')) topics.push('surgery denial');
  if (msg.includes('physical therapy')) topics.push('physical therapy denial');
  if (msg.includes('medically necessary')) topics.push('medical necessity');
  if (msg.includes('deadline')) topics.push('missed deadline');
  if (msg.includes('prescription')) topics.push('prescription denial');
  if (msg.includes('prior authorization')) topics.push('prior authorization');
  if (msg.includes('experimental')) topics.push('experimental treatment');
  if (msg.includes('codes') || msg.includes('jargon')) topics.push('understanding denials');
  if (msg.includes('out-of-network') && msg.includes('emergency')) topics.push('emergency billing');
  if (msg.includes('documents')) topics.push('appeal documentation');
  
  return `I see you have multiple insurance questions! Each situation requires specific guidance. Here's a quick overview:

**Multiple Topics Detected:**
${topics.map(topic => `• ${topic.charAt(0).toUpperCase() + topic.slice(1)}`).join('\n')}

**For Best Help:**
Please ask me **one question at a time** so I can give you detailed, specific guidance for each situation. Each type of denial has different strategies and timelines.

**Start With Your Most Urgent Issue:**
Which situation needs immediate attention? I'll provide detailed step-by-step guidance for that specific scenario first.

**Quick Priority Guide:**
1. **Missed deadlines** - Handle immediately (days matter)
2. **Needed surgery/treatment denials** - Start appeals quickly
3. **Billing disputes** - Can usually wait a few weeks
4. **Understanding denial codes** - Important for appeals strategy

Pick your most pressing issue and ask me about it specifically - I'll give you a detailed action plan!`;
}
