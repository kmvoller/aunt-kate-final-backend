<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ask Aunt Kate - Healthcare Advocate Chat</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --ocean-blue: #0EA5E9;
            --dark-blue: #1E40AF;
            --beige: #F5F5DC;
            --dark: #1F2937;
            --gray: #6B7280;
            --light: #FAF9F7;
            --white: #FFFFFF;
            --error: #EF4444;
            --success: #10B981;
            --premium: #F59E0B;
        }

        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #F0F8FF 0%, var(--beige) 100%);
            color: var(--dark);
            line-height: 1.6;
            height: 100vh;
            overflow: hidden;
        }

        /* Header */
        .header {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            padding: 1rem 2rem;
            border-bottom: 1px solid rgba(14, 165, 233, 0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            font-size: 1.5rem;
            font-weight: 800;
            background: linear-gradient(135deg, var(--dark-blue), var(--ocean-blue));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .header-actions {
            display: flex;
            gap: 1rem;
            align-items: center;
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.875rem;
        }

        .pro-badge {
            background: var(--premium);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 1rem;
            font-size: 0.75rem;
            font-weight: 600;
        }

        .free-badge {
            background: var(--gray);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 1rem;
            font-size: 0.75rem;
            font-weight: 600;
        }

        .ai-badge {
            background: linear-gradient(135deg, var(--dark-blue), var(--ocean-blue));
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 1rem;
            font-size: 0.75rem;
            font-weight: 600;
            margin-left: 0.5rem;
        }

        .btn {
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s;
            border: none;
            cursor: pointer;
            font-size: 0.875rem;
        }

        .btn-primary {
            background: linear-gradient(135deg, var(--dark-blue), var(--ocean-blue));
            color: white;
        }

        .btn-premium {
            background: var(--premium);
            color: white;
        }

        .btn-secondary {
            background: white;
            color: var(--dark-blue);
            border: 1px solid var(--ocean-blue);
        }

        .btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(14, 165, 233, 0.2);
        }

        /* Authentication Modal */
        .auth-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }

        .auth-content {
            background: white;
            padding: 2rem;
            border-radius: 1rem;
            max-width: 400px;
            width: 90%;
        }

        .auth-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--dark-blue);
            margin-bottom: 1rem;
            text-align: center;
        }

        .auth-tabs {
            display: flex;
            margin-bottom: 1.5rem;
            border-bottom: 1px solid #E5E7EB;
        }

        .auth-tab {
            flex: 1;
            padding: 0.75rem;
            text-align: center;
            cursor: pointer;
            border-bottom: 2px solid transparent;
            transition: all 0.3s;
        }

        .auth-tab.active {
            border-bottom-color: var(--ocean-blue);
            color: var(--ocean-blue);
            font-weight: 600;
        }

        .auth-form {
            display: none;
        }

        .auth-form.active {
            display: block;
        }

        .auth-input {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 2px solid #E5E7EB;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            font-size: 1rem;
            outline: none;
        }

        .auth-input:focus {
            border-color: var(--ocean-blue);
        }

        .auth-actions {
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
            margin-top: 1rem;
        }

        /* Upgrade Modal */
        .upgrade-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }

        .upgrade-content {
            background: white;
            padding: 2rem;
            border-radius: 1rem;
            max-width: 500px;
            width: 90%;
            text-align: center;
        }

        .upgrade-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--dark-blue);
            margin-bottom: 1rem;
        }

        .upgrade-price {
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--premium);
            margin: 1rem 0;
        }

        .upgrade-features {
            list-style: none;
            margin: 1.5rem 0;
            text-align: left;
        }

        .upgrade-features li {
            padding: 0.5rem 0;
            color: var(--gray);
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .upgrade-features li::before {
            content: '✓';
            color: var(--success);
            font-weight: bold;
        }

        /* Chat Container */
        .chat-container {
            display: flex;
            height: calc(100vh - 80px);
            max-width: 1400px;
            margin: 0 auto;
        }

        /* Sidebar */
        .sidebar {
            width: 300px;
            background: white;
            border-right: 1px solid rgba(14, 165, 233, 0.1);
            padding: 2rem;
            overflow-y: auto;
        }

        .welcome-section {
            margin-bottom: 2rem;
        }

        .welcome-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--dark-blue);
            margin-bottom: 0.5rem;
        }

        .welcome-text {
            color: var(--gray);
            font-size: 0.875rem;
            line-height: 1.5;
        }

        .ai-indicator {
            background: linear-gradient(135deg, var(--dark-blue), var(--ocean-blue));
            color: white;
            padding: 0.75rem;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            text-align: center;
            font-size: 0.875rem;
            font-weight: 600;
        }

        .usage-info {
            background: var(--light);
            padding: 1rem;
            border-radius: 0.5rem;
            margin-bottom: 2rem;
        }

        .usage-title {
            font-size: 1rem;
            font-weight: 600;
            color: var(--dark);
            margin-bottom: 0.5rem;
        }

        .usage-display {
            font-size: 0.875rem;
            color: var(--gray);
        }

        .progress-bar {
            background: #E5E7EB;
            height: 8px;
            border-radius: 4px;
            overflow: hidden;
            margin: 0.5rem 0;
        }

        .progress-fill {
            background: var(--ocean-blue);
            height: 100%;
            transition: width 0.3s;
        }

        .upgrade-prompt {
            background: linear-gradient(135deg, #FEF3C7, #FDE68A);
            border: 1px solid var(--premium);
            padding: 1rem;
            border-radius: 0.5rem;
            margin-bottom: 2rem;
            text-align: center;
        }

        .quick-actions {
            margin-bottom: 2rem;
        }

        .quick-actions h3 {
            font-size: 1rem;
            font-weight: 600;
            color: var(--dark);
            margin-bottom: 1rem;
        }

        .action-btn {
            display: block;
            width: 100%;
            text-align: left;
            background: var(--light);
            border: 1px solid #E5E7EB;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            margin-bottom: 0.5rem;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 0.875rem;
        }

        .action-btn:hover {
            background: #F0F8FF;
            border-color: var(--ocean-blue);
        }

        .action-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        /* Main Chat Area */
        .chat-main {
            flex: 1;
            display: flex;
            flex-direction: column;
            background: white;
        }

        .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 2rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .message {
            max-width: 80%;
            padding: 1rem 1.5rem;
            border-radius: 1rem;
            font-size: 0.95rem;
            line-height: 1.5;
            white-space: pre-wrap;
        }

        .message.user {
            align-self: flex-end;
            background: linear-gradient(135deg, var(--dark-blue), var(--ocean-blue));
            color: white;
            border-bottom-right-radius: 0.25rem;
        }

        .message.assistant {
            align-self: flex-start;
            background: var(--light);
            color: var(--dark);
            border-bottom-left-radius: 0.25rem;
            border-left: 3px solid var(--ocean-blue);
            position: relative;
        }

        .message.assistant.ai-generated::after {
            content: "🤖 AI Generated";
            position: absolute;
            top: -8px;
            right: 8px;
            background: var(--ocean-blue);
            color: white;
            font-size: 0.7rem;
            padding: 0.2rem 0.5rem;
            border-radius: 0.25rem;
            font-weight: 600;
        }

        .message.error {
            align-self: center;
            background: #FEF2F2;
            color: var(--error);
            border: 1px solid #FECACA;
            text-align: center;
        }

        .message.limit-warning {
            align-self: center;
            background: #FEF3C7;
            color: #D97706;
            border: 1px solid #FDE68A;
            text-align: center;
        }

        .typing-indicator {
            align-self: flex-start;
            background: var(--light);
            padding: 1rem 1.5rem;
            border-radius: 1rem;
            border-bottom-left-radius: 0.25rem;
            border-left: 3px solid var(--ocean-blue);
            display: none;
        }

        .typing-dots {
            display: flex;
            gap: 0.25rem;
            align-items: center;
        }

        .typing-dots span {
            width: 8px;
            height: 8px;
            background: var(--ocean-blue);
            border-radius: 50%;
            animation: typing 1.4s infinite ease-in-out;
        }

        .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
        .typing-dots span:nth-child(2) { animation-delay: -0.16s; }

        @keyframes typing {
            0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
            40% { transform: scale(1); opacity: 1; }
        }

        /* Chat Input */
        .chat-input-container {
            border-top: 1px solid #E5E7EB;
            padding: 1.5rem 2rem;
            background: var(--light);
        }

        .chat-input-wrapper {
            display: flex;
            gap: 1rem;
            max-width: 100%;
            position: relative;
        }

        .chat-input {
            flex: 1;
            padding: 1rem 1.5rem;
            border: 2px solid #E5E7EB;
            border-radius: 1rem;
            font-size: 1rem;
            resize: none;
            min-height: 50px;
            max-height: 120px;
            outline: none;
            transition: border-color 0.3s;
            font-family: inherit;
        }

        .chat-input:focus {
            border-color: var(--ocean-blue);
        }

        .chat-input:disabled {
            background: #F3F4F6;
            cursor: not-allowed;
        }

        .send-btn {
            background: linear-gradient(135deg, var(--dark-blue), var(--ocean-blue));
            color: white;
            border: none;
            padding: 1rem 1.5rem;
            border-radius: 1rem;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s;
            min-width: 100px;
        }

        .send-btn:hover:not(:disabled) {
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(14, 165, 233, 0.3);
        }

        .send-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        /* Empty State */
        .empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            text-align: center;
            padding: 2rem;
        }

        .empty-state-icon {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin: 0 auto 1rem;
            background: linear-gradient(135deg, var(--dark-blue), var(--ocean-blue));
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }

        .empty-state-icon img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
        }

        .empty-state-icon-fallback {
            font-size: 2.5rem;
            color: white;
        }

        .empty-state-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--dark-blue);
            margin-bottom: 0.5rem;
        }

        .empty-state-text {
            color: var(--gray);
            margin-bottom: 2rem;
            max-width: 400px;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .chat-container {
                flex-direction: column;
            }

            .sidebar {
                width: 100%;
                height: auto;
                max-height: 200px;
                border-right: none;
                border-bottom: 1px solid rgba(14, 165, 233, 0.1);
            }

            .chat-messages {
                padding: 1rem;
            }

            .message {
                max-width: 90%;
            }

            .chat-input-wrapper {
                flex-direction: column;
            }

            .send-btn {
                min-width: auto;
            }
        }

        .hidden {
            display: none !important;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="logo">Ask Aunt Kate<span class="ai-badge">Powered by AI</span></div>
        <div class="header-actions">
            <div class="user-info" id="userInfo">
                <span id="userStatus">Free Plan</span>
                <span class="free-badge" id="planBadge">FREE</span>
            </div>
            <button class="btn btn-secondary" onclick="clearChat()">New Chat</button>
            <button class="btn btn-secondary" id="authBtn" onclick="showAuthModal()">Login</button>
            <a href="https://www.askauntkate.org" class="btn btn-primary">← Back to Home</a>
        </div>
    </header>

    <div class="chat-container">
        <!-- Sidebar -->
        <aside class="sidebar">
            <div class="welcome-section">
                <h2 class="welcome-title">Welcome to Aunt Kate!</h2>
                <p class="welcome-text">Your AI-powered healthcare advocate with 15+ years of experience. I provide personalized, empathetic guidance for insurance, billing, and patient rights.</p>
            </div>

            <div class="ai-indicator">
                🤖 Powered by Advanced AI
                <br><small>Dynamic, personalized responses every time</small>
            </div>

            <div class="usage-info" id="usageInfo">
                <h3 class="usage-title">Daily Usage</h3>
                <div class="usage-display" id="usageDisplay">
                    Loading...
                </div>
            </div>

            <div class="upgrade-prompt hidden" id="upgradePrompt">
                <h4 style="color: var(--premium); font-weight: 600; margin-bottom: 0.5rem;">Upgrade to Pro</h4>
                <p style="font-size: 0.875rem; margin-bottom: 1rem;">Get unlimited AI conversations for just $19/month!</p>
                <button class="btn btn-premium" onclick="showUpgradeModal()">Upgrade Now</button>
            </div>

            <div class="quick-actions">
                <h3>Quick Actions</h3>
                <button class="action-btn" onclick="useExample(`I received a denial letter from my insurance company and I'm really scared and confused about what to do next. Can you help me understand this and guide me through the appeal process?`)">
                    📋 Insurance Denial Help
                </button>
                <button class="action-btn" onclick="useExample(`I got this medical bill that seems way too high and I think there might be errors. I'm overwhelmed and don't know where to start reviewing it.`)">
                    💰 Bill Review & Disputes
                </button>
                <button class="action-btn" onclick="useExample(`I have an important doctor appointment next week and I want to make sure I ask the right questions and advocate for myself effectively.`)">
                    🏥 Doctor Appointment Prep
                </button>
                <button class="action-btn" onclick="useExample(`Can you explain my rights as a patient? I feel like I'm not getting the respect and care I deserve from my healthcare providers.`)">
                    ⚖️ Know Your Patient Rights
                </button>
            </div>
        </aside>

        <!-- Main Chat Area -->
        <main class="chat-main">
            <div class="chat-messages" id="chatMessages">
                <div class="empty-state">
                    <div class="empty-state-icon">
                        <img src="./aunt-kate-avatar.jpg" alt="Aunt Kate" onerror="this.style.display='none'; this.parentNode.innerHTML='<div class=&quot;empty-state-icon-fallback&quot;>🤝</div>'">
                    </div>
                    <h3 class="empty-state-title">Hi! I'm Aunt Kate</h3>
                    <p class="empty-state-text">
                        I'm your AI-powered healthcare advocate with 15+ years of experience. I provide personalized, empathetic guidance tailored to your specific situation. Ask me anything about insurance, medical bills, patient rights, or healthcare navigation.
                    </p>
                    <button class="btn btn-primary" onclick="useExample(`I need help understanding my healthcare situation`)">
                        Start Conversation
                    </button>
                </div>
            </div>

            <div class="typing-indicator" id="typingIndicator">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                Aunt Kate is thinking with AI...
            </div>

            <div class="chat-input-container">
                <div class="chat-input-wrapper">
                    <textarea 
                        id="chatInput" 
                        class="chat-input" 
                        placeholder="Ask Aunt Kate about any healthcare challenge - insurance, billing, patient rights, or provider communication..."
                        rows="1"
                    ></textarea>
                    <button class="send-btn" id="sendBtn" onclick="sendMessage()">Send</button>
                </div>
            </div>
        </main>
    </div>

    <!-- Authentication Modal -->
    <div class="auth-modal hidden" id="authModal">
        <div class="auth-content">
            <h3 class="auth-title">Access Your Account</h3>
            <div class="auth-tabs">
                <div class="auth-tab active" onclick="switchAuthTab('login')">Login</div>
                <div class="auth-tab" onclick="switchAuthTab('register')">Sign Up</div>
            </div>
            
            <form class="auth-form active" id="loginForm">
                <input type="email" class="auth-input" placeholder="Email" id="loginEmail" required>
                <input type="password" class="auth-input" placeholder="Password" id="loginPassword" required>
                <div class="auth-actions">
                    <button type="button" class="btn btn-secondary" onclick="hideAuthModal()">Cancel</button>
                    <button type="submit" class="btn btn-primary">Login</button>
                </div>
            </form>

            <form class="auth-form" id="registerForm">
                <input type="email" class="auth-input" placeholder="Email" id="registerEmail" required>
                <input type="password" class="auth-input" placeholder="Password" id="registerPassword" required>
                <input type="password" class="auth-input" placeholder="Confirm Password" id="confirmPassword" required>
                <div class="auth-actions">
                    <button type="button" class="btn btn-secondary" onclick="hideAuthModal()">Cancel</button>
                    <button type="submit" class="btn btn-primary">Sign Up</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Upgrade Modal -->
    <div class="upgrade-modal hidden" id="upgradeModal">
        <div class="upgrade-content">
            <h3 class="upgrade-title">Upgrade to Pro AI</h3>
            <div class="upgrade-price">$19<span style="font-size: 1rem; color: var(--gray);">/month</span></div>
            <ul class="upgrade-features">
                <li>Unlimited AI conversations with Aunt Kate</li>
                <li>Advanced conversation context & memory</li>
                <li>Priority AI response speed</li>
                <li>Conversation history and notes</li>
                <li>Advanced healthcare document analysis</li>
                <li>Early access to new AI features</li>
            </ul>
            <div class="auth-actions">
                <button class="btn btn-secondary" onclick="hideUpgradeModal()">Maybe Later</button>
                <button class="btn btn-premium" onclick="redirectToLemonSqueezy()">Subscribe Now</button>
            </div>
        </div>
    </div>

    <script>
        // Global variables
        const chatMessages = document.getElementById('chatMessages');
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendBtn');
        const typingIndicator = document.getElementById('typingIndicator');
        const authModal = document.getElementById('authModal');
        const upgradeModal = document.getElementById('upgradeModal');

        // 🚀 Updated to use your sophisticated AI backend
        const API_BASE_URL = 'https://aunt-kate-final-backend-hjgf-git-main-katies-projects-08367442.vercel.app';

        // User state
        let currentUser = JSON.parse(localStorage.getItem('current_user') || 'null');
        let isProUser = currentUser?.subscription === 'pro';
        let conversationHistory = []; // Track conversation for AI context

        const FREE_DAILY_LIMIT = 5;

        // Generate simple user token for rate limiting
        function getUserToken() {
            let token = localStorage.getItem('user_token');
            if (!token) {
                token = 'user_' + Math.random().toString(36).substr(2, 9);
                localStorage.setItem('user_token', token);
            }
            
            // Add pro status if user is logged in as pro
            if (isProUser) {
                return token + '_pro';
            }
            
            return token;
        }

        // Authentication
        function updateUserInterface() {
            const userStatus = document.getElementById('userStatus');
            const planBadge = document.getElementById('planBadge');
            const authBtn = document.getElementById('authBtn');
            const upgradePrompt = document.getElementById('upgradePrompt');

            if (currentUser) {
                if (isProUser) {
                    userStatus.textContent = currentUser.email;
                    planBadge.textContent = 'PRO AI';
                    planBadge.className = 'pro-badge';
                    authBtn.textContent = 'Logout';
                    authBtn.onclick = logout;
                    upgradePrompt.classList.add('hidden');
                } else {
                    userStatus.textContent = currentUser.email;
                    planBadge.textContent = 'FREE';
                    planBadge.className = 'free-badge';
                    authBtn.textContent = 'Logout';
                    authBtn.onclick = logout;
                    upgradePrompt.classList.remove('hidden');
                }
            } else {
                userStatus.textContent = 'Free Plan';
                planBadge.textContent = 'FREE';
                planBadge.className = 'free-badge';
                authBtn.textContent = 'Login';
                authBtn.onclick = showAuthModal;
                upgradePrompt.classList.remove('hidden');
            }

            updateInputState();
        }

        function updateInputState() {
            // For free users, check if they've hit their limit
            if (!isProUser) {
                const usageDisplay = document.getElementById('usageDisplay');
                const usageText = usageDisplay.textContent;
                
                if (usageText.includes('0 messages remaining')) {
                    chatInput.disabled = true;
                    chatInput.placeholder = 'Daily limit reached. Upgrade to Pro for unlimited AI conversations.';
                    sendBtn.disabled = true;
                    
                    // Disable action buttons
                    document.querySelectorAll('.action-btn').forEach(btn => {
                        btn.disabled = true;
                    });
                    return;
                }
            }
            
            // Normal state
            chatInput.disabled = false;
            chatInput.placeholder = 'Ask Aunt Kate about any healthcare challenge - insurance, billing, patient rights, or provider communication...';
            sendBtn.disabled = false;
            
            // Enable action buttons
            document.querySelectorAll('.action-btn').forEach(btn => {
                btn.disabled = false;
            });
        }

        function updateUsageDisplay() {
            if (isProUser) {
                const usageDisplay = document.getElementById('usageDisplay');
                usageDisplay.innerHTML = `
                    <div style="color: var(--premium); font-weight: 600;">
                        🤖 Unlimited AI conversations
                    </div>
                    <div style="font-size: 0.75rem; margin-top: 0.25rem;">
                        Pro AI subscriber
                    </div>
                `;
            } else {
                // For free users, the backend will provide the actual count
                const usageDisplay = document.getElementById('usageDisplay');
                usageDisplay.innerHTML = `
                    <div style="margin-bottom: 0.5rem;">
                        AI messages today: 0/${FREE_DAILY_LIMIT}
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 0%;"></div>
                    </div>
                    <div style="font-size: 0.75rem; margin-top: 0.25rem;">
                        ${FREE_DAILY_LIMIT} AI messages remaining
                    </div>
                `;
            }
        }

        function updateUsageFromBackend(remaining) {
            if (isProUser) {
                return; // Pro users have unlimited, no need to update
            }
            
            const usageDisplay = document.getElementById('usageDisplay');
            const used = FREE_DAILY_LIMIT - remaining;
            const percentage = Math.round((used / FREE_DAILY_LIMIT) * 100);
            
            usageDisplay.innerHTML = `
                <div style="margin-bottom: 0.5rem;">
                    AI messages today: ${used}/${FREE_DAILY_LIMIT}
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%;"></div>
                </div>
                <div style="font-size: 0.75rem; margin-top: 0.25rem; color: ${remaining <= 1 ? 'var(--error)' : 'var(--gray)'};">
                    ${remaining} AI messages remaining
                </div>
            `;
            
            // Update input state if no messages remaining
            if (remaining <= 0) {
                updateInputState();
            }
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            updateUserInterface();
            updateUsageDisplay();

            // Auto-resize textarea
            chatInput.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = this.scrollHeight + 'px';
            });

            // Enter key to send
            chatInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });

            // Auth form handlers
            document.getElementById('loginForm').addEventListener('submit', handleLogin);
            document.getElementById('registerForm').addEventListener('submit', handleRegister);
        });

        function showAuthModal() {
            authModal.classList.remove('hidden');
        }

        function hideAuthModal() {
            authModal.classList.add('hidden');
        }

        function switchAuthTab(tab) {
            document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
            
            if (tab === 'login') {
                document.querySelector('.auth-tab:first-child').classList.add('active');
                document.getElementById('loginForm').classList.add('active');
            } else {
                document.querySelector('.auth-tab:last-child').classList.add('active');
                document.getElementById('registerForm').classList.add('active');
            }
        }

        async function handleLogin(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            // TODO: Replace with actual backend authentication
            // For now, simulate login
            if (email && password) {
                currentUser = {
                    email: email,
                    subscription: email.includes('pro') ? 'pro' : 'free' // Demo logic
                };
                isProUser = currentUser.subscription === 'pro';
                localStorage.setItem('current_user', JSON.stringify(currentUser));
                
                hideAuthModal();
                updateUserInterface();
                updateUsageDisplay();
                
                addMessage(`Welcome back, ${email}! ${isProUser ? 'Your Pro AI subscription is active.' : 'Consider upgrading to Pro for unlimited AI conversations.'}`, false);
            }
        }

        async function handleRegister(e) {
            e.preventDefault();
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            // TODO: Replace with actual backend registration
            // For now, simulate registration
            if (email && password) {
                currentUser = {
                    email: email,
                    subscription: 'free'
                };
                isProUser = false;
                localStorage.setItem('current_user', JSON.stringify(currentUser));
                
                hideAuthModal();
                updateUserInterface();
                updateUsageDisplay();
                
                addMessage(`Welcome to Ask Aunt Kate, ${email}! You have ${FREE_DAILY_LIMIT} free AI messages per day. Upgrade to Pro for unlimited access.`, false);
            }
        }

        function logout() {
            currentUser = null;
            isProUser = false;
            localStorage.removeItem('current_user');
            updateUserInterface();
            updateUsageDisplay();
            clearChat();
        }

        // Upgrade Modal
        function showUpgradeModal() {
            upgradeModal.classList.remove('hidden');
        }

        function hideUpgradeModal() {
            upgradeModal.classList.add('hidden');
        }

        function redirectToLemonSqueezy() {
            // TODO: Replace with your actual LemonSqueezy checkout URL
            const checkoutUrl = 'https://your-store.lemonsqueezy.com/checkout/buy/your-product-id';
            
            if (currentUser) {
                // Pass user email to pre-fill checkout
                window.open(`${checkoutUrl}?checkout[email]=${encodeURIComponent(currentUser.email)}`, '_blank');
            } else {
                // Redirect to signup first
                hideUpgradeModal();
                showAuthModal();
                switchAuthTab('register');
            }
        }

        // Chat Functions
        function useExample(text) {
            if (!isProUser) {
                // Check if they might be at limit - the backend will enforce this
                const usageDisplay = document.getElementById('usageDisplay');
                if (usageDisplay.textContent.includes('0 messages remaining')) {
                    showUpgradeModal();
                    return;
                }
            }
            
            chatInput.value = text;
            chatInput.style.height = 'auto';
            chatInput.style.height = chatInput.scrollHeight + 'px';
            chatInput.focus();
        }

        function addMessage(content, isUser = false, isError = false, aiGenerated = false) {
            const messageDiv = document.createElement('div');
            let className = `message ${isUser ? 'user' : 'assistant'}`;
            
            if (isError) {
                className = 'message error';
            } else if (!isUser && aiGenerated) {
                className += ' ai-generated';
            }
            
            messageDiv.className = className;
            messageDiv.textContent = content;
            
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Hide empty state
            const emptyState = chatMessages.querySelector('.empty-state');
            if (emptyState) {
                emptyState.style.display = 'none';
            }

            // Add to conversation history for AI context
            if (isUser) {
                conversationHistory.push({ user: content });
            } else if (!isError) {
                if (conversationHistory.length > 0) {
                    conversationHistory[conversationHistory.length - 1].assistant = content;
                } else {
                    conversationHistory.push({ assistant: content });
                }
            }

            // Keep only last 10 exchanges to manage memory
            if (conversationHistory.length > 10) {
                conversationHistory = conversationHistory.slice(-10);
            }
        }

        function showTyping() {
            typingIndicator.style.display = 'block';
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function hideTyping() {
            typingIndicator.style.display = 'none';
        }

        async function sendMessage() {
            const message = chatInput.value.trim();
            if (!message) return;

            // Add user message
            addMessage(message, true);
            
            // Clear input and disable send button
            chatInput.value = '';
            chatInput.style.height = 'auto';
            sendBtn.disabled = true;
            sendBtn.textContent = 'AI Thinking...';

            // Show typing indicator
            showTyping();

            try {
                console.log('Sending message to sophisticated AI backend:', `${API_BASE_URL}/api/chat`);
                
                const response = await fetch(`${API_BASE_URL}/api/chat`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: message,
                        userToken: getUserToken(),
                        conversationHistory: conversationHistory // Send conversation context for AI
                    })
                });

                console.log('AI Response status:', response.status);
                
                const data = await response.json();
                console.log('AI Response data:', data);
                
                // Hide typing indicator
                hideTyping();

                if (response.ok) {
                    // Add assistant response with AI indicator
                    addMessage(data.response, false, false, data.aiGenerated);
                    
                    // Update usage display if we got remaining count
                    if (data.remaining !== undefined) {
                        updateUsageFromBackend(data.remaining);
                    }
                } else {
                    // Handle errors
                    if (response.status === 429) {
                        addMessage(data.error || 'Daily limit exceeded. Upgrade to Pro for unlimited AI conversations!', false, true);
                        if (data.upgradeRequired) {
                            setTimeout(showUpgradeModal, 1000);
                        }
                    } else {
                        addMessage(data.error || 'Sorry, I encountered an error. Please try again.', false, true);
                    }
                }

            } catch (error) {
                console.error('AI Connection error:', error);
                hideTyping();
                
                // More specific error messages
                if (error.name === 'TypeError' && error.message.includes('fetch')) {
                    addMessage('❌ Connection failed: Unable to reach Aunt Kate\'s AI backend. Please check your internet connection.', false, true);
                } else if (error.message.includes('CORS')) {
                    addMessage('❌ Connection blocked: Please make sure the backend allows requests from this domain.', false, true);
                } else {
                    addMessage(`❌ Network error: ${error.message}. Please try again.`, false, true);
                }
            } finally {
                // Re-enable send button
                sendBtn.disabled = false;
                sendBtn.textContent = 'Send';
                chatInput.focus();
            }
        }

        function clearChat() {
            conversationHistory = []; // Clear AI conversation context
            chatMessages.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">
                        <img src="./aunt-kate-avatar.jpg" alt="Aunt Kate" onerror="this.style.display='none'; this.parentNode.innerHTML='<div class=&quot;empty-state-icon-fallback&quot;>🤝</div>'">
                    </div>
                    <h3 class="empty-state-title">Hi! I'm Aunt Kate</h3>
                    <p class="empty-state-text">
                        I'm your AI-powered healthcare advocate with 15+ years of experience. I provide personalized, empathetic guidance tailored to your specific situation. Ask me anything about insurance, medical bills, patient rights, or healthcare navigation.
                    </p>
                    <button class="btn btn-primary" onclick="useExample(\`I need help understanding my healthcare situation\`)">
                        Start Conversation
                    </button>
                </div>
            `;
        }
    </script>
</body>
</html>
