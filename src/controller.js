export class Controller {
    #ready
    #view
    #worker

    constructor({ view, worker }) {
        this.#view = view
        this.#worker = worker
        this.#ready = false
    }

  static async initialize(deps) {
    const controller = new Controller(deps)
    await controller.#configureWorker()
    return controller
  }

    #configureWorker() {
        return new Promise((resolve) => {
            const onMessage = (msg) => {
                if (msg.data === 'READY') {
                    this.#ready = true
                    this.#worker.removeEventListener('message', onMessage)
                    resolve(msg.data)
                }
            }

            this.#worker.addEventListener('message', onMessage)
        })
    }

    async #handleMessage(text) {
        if (!this.#ready) {
            throw new Error('Worker is not abilited')
        }

        return new Promise((resolve) => {
        const worker = this.#worker

        const onMessage = (event) => {
            worker.removeEventListener('message', onMessage)

            const dadosEv = event.data
            resolve(dadosEv)
        }

        worker.addEventListener('message', onMessage)
        worker.postMessage({ text })
        })
    }

    async sendMessage(text){
        this.#view.appendMessage('You', text, 'user');
        const { answer } = await this.#handleMessage(text);
        console.log('answer', answer)
        this.#view.appendMessage('Bot', answer, 'bot');
    }
}
