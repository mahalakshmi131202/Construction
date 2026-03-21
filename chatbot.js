document.addEventListener("DOMContentLoaded", () => {
    // Inject CSS if not already there or assume it's in head. We'll ensure index.html has it linked.

    // 1. Create HTML Structure
    const chatbotHTML = `
        <div class="chatbot-widget">
            <div class="chatbot-toggler" id="chatbotToggler">
                <i class="fas fa-comment-dots" id="chatIcon"></i>
            </div>
            
            <div class="chatbot-container" id="chatbotContainer">
                <div class="chatbot-header">
                    <div class="chatbot-header-title">
                        <i class="fas fa-robot"></i>
                        <h4>Apex Assistant</h4>
                    </div>
                    <div class="chatbot-close" id="chatbotClose">
                        <i class="fas fa-times"></i>
                    </div>
                </div>
                
                <div class="chatbot-messages" id="chatbotMessages">
                    <div class="chat-message bot">
                        Hello! Welcome to Apex Builders & Remodeling. How can I assist you today?
                    </div>
                </div>
                
                <div class="chat-typing-indicator" id="chatTyping">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
                
                <div class="chatbot-input-area">
                    <input type="text" id="chatInput" placeholder="Type your message..." autocomplete="off">
                    <button class="chatbot-send-btn" id="chatSendBtn"><i class="fas fa-paper-plane"></i></button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    const chatbotToggler = document.getElementById('chatbotToggler');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');
    const chatMessages = document.getElementById('chatbotMessages');
    const chatTyping = document.getElementById('chatTyping');
    const chatIcon = document.getElementById('chatIcon');

    let chatOpen = false;

    // Lead Flow State Mode
    let leadState = 0; 
    // 0 = Initial (Waiting for user to say how we can help)
    // 1 = Asked type of remodeling
    // 2 = Asked location
    // 3 = Asked timeline
    // 4 = Directed to form

    function toggleChat() {
        chatOpen = !chatOpen;
        if (chatOpen) {
            chatbotContainer.classList.add('active');
            chatIcon.classList.remove('fa-comment-dots');
            chatIcon.classList.add('fa-times');
        } else {
            chatbotContainer.classList.remove('active');
            chatIcon.classList.remove('fa-times');
            chatIcon.classList.add('fa-comment-dots');
        }
    }

    chatbotToggler.addEventListener('click', toggleChat);
    chatbotClose.addEventListener('click', () => { if(chatOpen) toggleChat()});

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${sender}`;
        msgDiv.innerHTML = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTyping() {
        chatMessages.appendChild(chatTyping);
        chatTyping.style.display = 'flex';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function hideTyping() {
        chatTyping.style.display = 'none';
        document.body.appendChild(chatTyping); // move it out so it doesn't mess with flex layout when hidden
    }

    function handleUserInput() {
        const text = chatInput.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        chatInput.value = '';
        
        showTyping();

        setTimeout(() => {
            hideTyping();
            generateBotResponse(text);
        }, 1000 + Math.random() * 1000); // 1-2 sec delay to simulate thinking
    }

    chatSendBtn.addEventListener('click', handleUserInput);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserInput();
    });

    function generateBotResponse(userInput) {
        const lowerInput = userInput.toLowerCase();
        
        // 1. Check for specific business rules (Overrides flow)
        if (lowerInput.includes('new construction') || lowerInput.includes('build a new house') || lowerInput.includes('new home') || lowerInput.includes('build from scratch')) {
            addMessage("Currently, we specialize only in remodeling services like kitchen, bathroom, outdoor, and basement remodeling. We do not offer new construction at the moment.<br><br>Would you like help with any remodeling project?", "bot");
            return;
        }
        
        if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('how much') || lowerInput.includes('pricing') || lowerInput.includes('estimate') || lowerInput.includes('quote')) {
            addMessage("Pricing depends on your specific requirements like size, materials, and design.<br><br>I recommend filling out our 'Get a Quote' form so our team can provide an accurate estimate. Shall I direct you to the form?", "bot");
            return;
        }

        if (lowerInput.includes('hours') || lowerInput.includes('time') || lowerInput.includes('open') || lowerInput.includes('close') || lowerInput.includes('office')) {
            addMessage("Our office timings are Monday to Saturday, 9:00 AM to 6:00 PM.<br><br>How can I help you with your remodeling needs today?", "bot");
            return;
        }

        // 2. Lead Conversion Flow
        if (leadState === 0) {
            leadState = 1;
            addMessage("That sounds great! What type of remodeling are you looking for?<br><br>We offer kitchen, bathroom, basement, and outdoor remodeling.", "bot");
            return;
        }
        
        if (leadState === 1) {
            leadState = 2;
            addMessage("Perfect. Knowing your location helps us best assist you.<br><br>What city or area are you located in?", "bot");
            return;
        }
        
        if (leadState === 2) {
            leadState = 3;
            addMessage("Got it, we serve that area. Timeline is also important for planning.<br><br>How soon are you hoping to start this remodeling project?", "bot");
            return;
        }

        if (leadState === 3 || leadState === 4) {
            leadState = 4;
            addMessage("Thank you for sharing those details! Our team would love to help you bring this to life.<br><br>Would you like to get a free quote now?<br><a href='#contactForm' class='chat-action-link' onclick='document.getElementById(\"chatbotContainer\").classList.remove(\"active\"); document.getElementById(\"chatIcon\").classList.add(\"fa-comment-dots\"); document.getElementById(\"chatIcon\").classList.remove(\"fa-times\");'>Fill out Quote Form</a>", "bot");
            return;
        }
        
        // Fallback (Rare given the flow)
        addMessage("I can definitely help you with that. I recommend filling out our 'Get a Quote' form so our team can provide an accurate estimate.<br><br>Shall I direct you to the form?", "bot");
    }
});
