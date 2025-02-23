import Chatbot from './chatbot.js';

class AppMain {
    constructor() {
        this.content = '';
        this.chatbot = new Chatbot();
    }

    setContent(content) {
        this.content = content;
        this.render(); // Re-render when content is set
        this.updateChatbotContainer(); // Update chatbot container's inner HTML
    }

    render() {
        return `
            <main id="main">
                ${this.content}
                <div id="chatbot-container">
                    ${this.chatbot.render()}
                </div>
            </main>
        `;
    }

    afterRender() {
        this.chatbot.attachEventListeners();
    }

    updateChatbotContainer() {
        const chatbotContainer = document.getElementById('chatbot-container');
        if (chatbotContainer) {
            chatbotContainer.innerHTML = this.chatbot.render();
            this.chatbot.attachEventListeners();
        }
    }
}

export default AppMain;