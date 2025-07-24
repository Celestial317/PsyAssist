// Global variables
let sessionId = null;
let currentTone = "friendly";

// --- IMPORTANT ---
// This is the full URL of your backend on Hugging Face Spaces.
const BACKEND_URL = "https://celestialssd-psyassist.hf.space";

document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-message');
    const sendButton = document.getElementById('send-btn');
    const crisisResources = document.getElementById('crisis-resources');
    
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
    
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && !sidebar.contains(e.target) && !menuToggle.contains(e.target) && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });
    
    function addMessage(message, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = isUser ? 'message user-message' : 'message bot-message';
        
        const messagePara = document.createElement('p');
        messagePara.textContent = message;
        messageDiv.appendChild(messagePara);
        
        if (!isUser) {
            const disclaimer = document.createElement('small');
            disclaimer.textContent = 'Remember: I\'m an AI assistant, not a replacement for professional mental health care.';
            messageDiv.appendChild(disclaimer);
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    async function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        
        addMessage(message, true);
        userInput.value = '';
        
        try {
            // Use the full backend URL and the correct /api/chat endpoint
            const response = await fetch(`${BACKEND_URL}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    message: message,
                    session_id: sessionId,
                    tone: currentTone
                }),
            });
            
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.session_id) {
                sessionId = data.session_id;
            }
            
            addMessage(data.response, false);
            
            if (data.crisis) {
                crisisResources.style.display = 'block';
            }
        } catch (error) {
            console.error('Error:', error);
            addMessage("I'm having trouble connecting. Please try again later.", false);
        }
    }
    
    sendButton.addEventListener('click', sendMessage);
    
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    document.querySelector('.btn').addEventListener('click', function() {
        while (chatMessages.children.length > 1) {
            chatMessages.removeChild(chatMessages.lastChild);
        }
        if (crisisResources) {
            crisisResources.style.display = 'none';
        }
        startNewSession(sessionId);
    });
    
    const toneLinks = document.querySelectorAll('.dropdown-content a');
    toneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const parentButton = link.closest('.dropdown')?.querySelector('.dropbtn');
            if (!parentButton || !parentButton.textContent.includes('Tone')) {
                return;
            }
            
            const tone = this.textContent.toLowerCase();
            currentTone = tone;
            
            parentButton.innerHTML = `<i class="fas fa-sliders-h"></i> Tone: ${this.textContent}`;
            
            addMessage(`I'll adjust my tone to be more ${tone} now.`, false);
            console.log("Tone set to:", currentTone);
        });
    });
    
    loadChatHistory();
    
    window.addEventListener('beforeunload', function() {
        if (sessionId) {
            const payload = JSON.stringify({
                message: "_session_end_",
                session_id: sessionId,
                end_chat: true
            });
            // Use sendBeacon for reliability when the page is closing
            navigator.sendBeacon(`${BACKEND_URL}/api/chat`, payload);
        }
    });
    
    startNewSession();
});

async function startNewSession(oldSessionId = null) {
    try {
        // Use the full backend URL and the correct /api/new-chat endpoint
        const response = await fetch(`${BACKEND_URL}/api/new-chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                session_id: oldSessionId
            }),
        });
        const data = await response.json();
        sessionId = data.session_id;
        console.log("New session started:", sessionId);
    } catch (error) {
        console.error("Error starting new session:", error);
    }
}

async function loadChatHistory() {
    try {
        // Use the full backend URL and the correct /api/chat-history endpoint
        const response = await fetch(`${BACKEND_URL}/api/chat-history`);
        const data = await response.json();
        
        const historyDropdown = document.querySelector('.sidebar .dropdown:nth-child(2) .dropdown-content');
        
        if (!historyDropdown) return;
        
        // Clear existing history items
        const existingLinks = historyDropdown.querySelectorAll('a:not(:last-child)');
        existingLinks.forEach(link => link.remove());
        
        data.history.forEach(session => {
            const date = new Date(session.timestamp.replace(/(\d{8})_(\d{6})/, '$1T$2')).toLocaleString();
            const historyItem = document.createElement('a');
            historyItem.href = '#';
            historyItem.textContent = `${session.summary} (${date})`;
            
            historyDropdown.insertBefore(historyItem, historyDropdown.lastElementChild);
        });
    } catch (error) {
        console.error("Error loading chat history:", error);
    }
}
