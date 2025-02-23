class Chatbot {
    constructor() {
        this.messages = [];
        this.conversationHistory = [];
        this.maxHistoryLength = 6;
    }

    sendMessage(message) {
        this.messages.push({ text: message, sender: 'user' });
        this.conversationHistory.push({ role: "user", content: message });

        if (this.conversationHistory.length > this.maxHistoryLength) {
            this.summarizeOldMessages();
        } else {
            this.sendToGPT(message);
        }
    }

    summarizeOldMessages() {
        const messagesToSummarize = this.conversationHistory.slice(0, this.conversationHistory.length - this.maxHistoryLength + 1);
        const remainingMessages = this.conversationHistory.slice(this.conversationHistory.length - this.maxHistoryLength + 1);
        const conversationString = JSON.stringify(messagesToSummarize);

        fetch(`/api/summarize?conversation=${conversationString}`)
            .then(response => response.json())
            .then(data => {
                const summary = data.summary;
                this.conversationHistory = [{ role: "system", content: summary }, ...remainingMessages];
                this.sendToGPT(this.conversationHistory[this.conversationHistory.length - 1].content);
            })
            .catch(error => {
                console.error('Error summarizing conversation:', error);
                this.sendToGPT("Error summarizing previous messages.");
            });
    }

    sendToGPT(message) {
        const conversationString = JSON.stringify(this.conversationHistory);

        fetch(`/api/gpt?question=${message}&history=${conversationString}`)
            .then(response => response.json())
            .then(data => {
                const gptResponse = data.response;
                this.messages.push({ text: gptResponse, sender: 'bot' });
                this.conversationHistory.push({ role: "assistant", content: gptResponse });
                const chatbotContainer = document.getElementById('chatbot-container');
                chatbotContainer.innerHTML = this.render();
                this.attachEventListeners();
                const messageInput = document.getElementById('message-input');
                messageInput.value = '';
            })
            .catch(error => {
                console.error('Error:', error);
                this.messages.push({ text: 'Error: Could not get response from the bot.', sender: 'bot' });
                const chatbotContainer = document.getElementById('chatbot-container');
                chatbotContainer.innerHTML = this.render();
                this.attachEventListeners();
                const messageInput = document.getElementById('message-input');
                messageInput.value = '';
            });
    }

    render() {
        console.log(this.messages)
        const chatMessages = this.messages.map(msg => `
            <div class="message-container ${msg.sender}">
                <div class="speaker ${msg.sender === 'user' ? 'speaker-user' : 'speaker-assistant'}">${msg.sender === 'user' ? 'User' : 'Assistant'}</div>
                <div class="message ${msg.sender}">
                    ${msg.text}
                </div>
            </div>
        `).join('');

        return `
            <div class="chatbot">
                <div class="chat-messages">
                    ${chatMessages}
                </div>
                <div class="chat-input">
                    <input type="text" id="message-input" placeholder="Type your message...">
                    <button id="send-button">Send</button>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        const sendButton = document.getElementById('send-button');
        const messageInput = document.getElementById('message-input');

        if (sendButton && messageInput) {
            sendButton.addEventListener('click', () => {
                console.log('sendButton clicked');
                const message = messageInput.value;
                if (message) {
                    this.sendMessage(message);
                    const chatbotContainer = document.getElementById('chatbot-container');
                    chatbotContainer.innerHTML = this.render();
                    this.attachEventListeners();
                    messageInput.value = '';
                }
            });

            messageInput.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault(); // Prevent form submission
                    sendButton.click();
                }
            });
        }
    }
}

export default Chatbot;
