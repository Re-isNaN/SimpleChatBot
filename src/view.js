export class View {
    #controller
    #input = document.getElementById('userInput');
    #chat = document.getElementById('chat');

    setController(controller){
        this.#controller = controller;
        document.getElementById('sendBtn').addEventListener('click', () => this.#sendUserMessage());
    }

    async #sendUserMessage(){
        const message = this.#input.value.trim();
        if (!message) return;
        await this.#controller.sendMessage(message);
        this.#input.value = '';
    }

    appendMessage(sender, text, className) {
        const div = document.createElement('div');
        div.className = `message ${className}`;
        div.textContent = `${sender}: ${text}`;
        this.#chat.appendChild(div);
        this.#chat.scrollTop = this.#chat.scrollHeight;
      }
}
