# Simple ChatBot

## Introdução / Introduction
### 🇧🇷 Português
Este projeto consiste na criação de um **chatbot simples**, desenvolvido para operar diretamente no navegador, **sem necessidade de servidor**. Ele foi pensado para um contexto de **sistema de vendas**, onde o assistente virtual é capaz de responder a três comandos principais:

1. **Entrar no sistema**  
2. **Cadastrar uma venda**  
3. **Sair do sistema**

Apesar do número limitado de respostas, o principal desafio está na forma como o chatbot **interpreta as perguntas dos usuários**. Em vez de depender de comandos fixos e exatos, o sistema utiliza **modelos de *embedding*** para compreender **variações linguísticas** e **semânticas** das perguntas. Dessa forma, é possível realizar o mapeamento de diversas formas de expressar a mesma intenção para uma das três ações disponíveis.

### 🌐 English
This project involves creating a **simple chatbot**, developed to operate directly in the browser, **without the need for a server**. It was designed for a **sales system** context, where the virtual assistant is capable of responding to three main commands:

1. **Log into the system**
2. **Register a sale**
3. **Log out of the system**

Despite the limited number of responses, the main challenge lies in how the chatbot **interprets the users' questions**. Instead of relying on fixed and exact commands, the system uses **embedding models** to understand **linguistic** and **semantic** variations of the questions. This way, it is possible to map various ways of expressing the same intent for one of the three available actions.

---

## 🧠 Tecnologias e Abordagem
- **[@xenova/transformers](https://www.npmjs.com/package/@xenova/transformers)**: biblioteca usada para carregar e executar modelos de *embedding* diretamente no navegador, sem backend.
- **Web Workers**: responsáveis por realizar o processamento em segundo plano, como a execução dos modelos de IA, sem bloquear a interface do usuário. Eles interagem com a lógica do projeto e garantem que o processamento seja feito localmente no navegador.
- **Padrão de Projeto Factory**: utilizado para isolar a criação e gestão dos modelos de IA, promovendo uma arquitetura limpa e reutilizável.
- **Machine Learning**: aplicado para aproximação de sentenças com base em similaridade vetorial (*sentence similarity*), permitindo que o bot entenda perguntas formuladas de maneiras diferentes.
- **JavaScript/TypeScript**: para a estrutura geral do projeto.

## 🧠 Technologies and Approach
- **[@xenova/transformers](https://www.npmjs.com/package/@xenova/transformers)**: Library used to load and run embedding models directly in the browser, without a backend.
- **Web Workers**: Responsible for performing background processing, such as running AI models, without blocking the user interface. They interact with the project's logic and ensure that processing is done locally in the browser.
- **Factory Design Pattern**: Used to isolate the creation and management of AI models, promoting a clean and reusable architecture.
- **Machine Learning**: Applied for sentence approximation based on vector similarity (*sentence similarity*), enabling the bot to understand questions phrased in different ways.
- **JavaScript/TypeScript**: For the overall structure of the project.

---

## 🚀 Diferenciais do Projeto
- ✅ Executado 100% no navegador, **sem backend** ou instalações externas.
- ✅ Carregamento de modelos de IA via **CDN**, sem build ou dependências instaladas.
- ✅ Utiliza **modelos pré-treinados de linguagem natural** diretamente no navegador.
- ✅ Foco em **interpretação semântica** e **flexibilidade na entrada de comandos**.
- ✅ Estrutura de código baseada em boas práticas de engenharia de software, com foco em **manutenibilidade** e **escalabilidade**.

## 🚀 Project Differentiators
- ✅ Executed 100% in the browser, **without a backend** or external installations.
- ✅ Loading AI models via **CDN**, without build or installed dependencies.
- ✅ Uses **pre-trained natural language models** directly in the browser.
- ✅ Focus on **semantic interpretation** and **flexibility in command input**.
- ✅ Code structure based on best software engineering practices, with a focus on **maintainability** and **scalability**.

---

## 📁 Estrutura Sugerida (Opcional) / Suggested Structure (Optional)

```bash
├── index.html
├── styles.css
├── main.js
├── src/
│   ├── factory.js
│   ├── workers.js
│   ├── controller.js
│   ├── service.js
│   ├── view.js
│   ├── repository.js
│   ├── databaseSimulated.js
│   └── utils.js
└── README.md
```

--- 

## 🏗️ Arquitetura: Padrão de Projeto Factory
A arquitetura deste projeto adota o **padrão de projeto Factory** para centralizar e orquestrar a criação e inicialização das partes independentes do sistema, como o **Web Worker**, o **Controller** e a **View**. O Factory é responsável por garantir que essas partes sejam inicializadas corretamente, facilitando a manutenção e o escalonamento do sistema.

### 🏭 Como o padrão Factory é aplicado
- O Factory é responsável por importar e inicializar as partes independentes do projeto, incluindo:
  - **Web Worker**: Utilizado para executar tarefas em segundo plano.
  - **Controller**: Coordena a lógica do chatbot, interage com o Web Worker para processar as entradas do usuário e gera as respostas.
  - **View**: Gerencia a interface de usuário, apresentando as respostas do chatbot e lidando com a interação com o usuário.

- Em vez de instanciar essas partes diretamente em outras áreas do código, o **Factory** centraliza a criação desses componentes e assegura que eles sejam configurados corretamente.

## 🏗️ Architecture: Factory Design Pattern
The architecture of this project adopts the **Factory Design Pattern** to centralize and orchestrate the creation and initialization of independent parts of the system, such as the **Web Worker**, the **Controller**, and the **View**. The Factory is responsible for ensuring these parts are properly initialized, making the system easier to maintain and scale.

### 🏭 How the Factory Pattern is Applied
- The Factory is responsible for importing and initializing the independent parts of the project, including:
  - **Web Worker**: Used to execute background tasks.
  - **Controller**: Coordinates the logic of the chatbot, interacts with the Web Worker to process user input, and generates responses.
  - **View**: Manages the user interface, presenting chatbot responses and handling user interaction.

- Instead of directly instantiating these parts in other areas of the code, the **Factory** centralizes the creation of these components and ensures they are correctly configured.



### 🧱 Exemplo de implementação / 🧱 Implementation example

```js
// factory.js
import { Controller } from './controller.js'
import { View } from './view.js'

const worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' })

export class Factory {
  static async initialize(){
    const view = new View()
    const controller = await Controller.initialize({ view, worker })
    view.setController(controller)

    return { view, controller }
  }
}
```

---

## 🌐 **Web Workers: Por que usar para processamento pesado?**

**Web Workers** permitem a execução de código em uma thread separada da thread principal, garantindo que o processamento pesado, como inferência de IA, não afete a interface do usuário. Isso é essencial para manter a aplicação **rápida** e **responsiva**.

### **Vantagens de usar Web Workers:**

1. **Desempenho aprimorado**: Processamento em segundo plano sem bloquear a UI.
2. **Melhor experiência do usuário**: A interface continua interativa enquanto o processamento ocorre no Worker.
3. **Execução paralela**: Aproveita os múltiplos núcleos do dispositivo, melhorando a eficiência.
4. **Arquitetura sem servidor**: Processamento local no navegador sem depender de backend, reduzindo latência.
5. **Isolamento de tarefas**: O Worker lida com tarefas específicas, como a execução do modelo de IA, sem interferir no restante da aplicação.

### 🧱 **Exemplo prático no projeto:**

No chatbot, o Web Worker carrega e executa o modelo de *embedding* e realiza o processamento sem afetar a interação do usuário. Quando uma pergunta é feita, o Worker processa a similaridade semântica e envia a resposta de volta para a interface, garantindo uma experiência ágil e sem interrupções.

Usar Web Workers permite que o processamento de modelos de IA seja feito diretamente no navegador, mantendo a aplicação rápida e sem sobrecarregar o backend. A interação do usuário não é interrompida, e o desempenho do sistema é mantido, mesmo com tarefas computacionalmente intensivas.

## 🌐 **Web Workers: Why Use Them for Heavy Processing?**

**Web Workers** allow code to run on a separate thread from the main thread, ensuring that heavy processing, like AI inference, does not impact the user interface. This is essential for keeping the application **fast** and **responsive**.

### **Advantages of Using Web Workers:**

1. **Enhanced Performance**: Background processing without blocking the UI.
2. **Better User Experience**: The interface remains interactive while processing occurs in the Worker.
3. **Parallel Execution**: Leverages multiple cores of the device, improving efficiency.
4. **Serverless Architecture**: Local processing in the browser without relying on a backend, reducing latency.
5. **Task Isolation**: The Worker handles specific tasks, like running the AI model, without interfering with the rest of the application.

### 🧱 **Practical Example in the Project:**

In the chatbot, the Web Worker loads and runs the embedding model and performs the processing without affecting user interaction. When a question is asked, the Worker processes the semantic similarity and sends the response back to the interface, ensuring a smooth and uninterrupted experience.

Using Web Workers allows AI model processing to be done directly in the browser, keeping the application fast and reducing the load on the backend. The user interaction is not interrupted, and system performance is maintained, even with computationally intensive tasks.


```js
// worker.js
import { Repository } from './repository.js'
import { Service } from './services.js'

// principal process -> window
// worker -> self
const { env, pipeline } = await import(
  'https://unpkg.com/@xenova/transformers@2.17.2/dist/transformers.min.js'
)
env.useBrowserCache = false
env.allowLocalModels = false
env.allowRemoteModels = true


const repository = new Repository()

const extractor = await pipeline(
  'feature-extraction',
  'Xenova/all-MiniLM-L6-v2',
)

const service = new Service({ repository, extractor })
postMessage('READY')

onmessage = async (event) => {
    const { text } = event.data

    const vectors = await service.handleVectors()
    const embedding = await service.handleEmbedding(text)
    if (!(vectors || embedding)) return

    const answer = await service.findAnswer(embedding, vectors)

    postMessage({ answer })
}

onerror = (err) => {
  console.log(err)
}
```

---

## 🚀 Inicializar
### Passo 1: Instalar o Visual Studio Code
- Baixe e instale o [Visual Studio Code](https://code.visualstudio.com/).

### Passo 2: Instalar a Extensão Live Server
- Abra o VS Code e vá para a aba **Extensões** (`Ctrl+Shift+X`).
- Procure por **Live Server** e instale a extensão de **Ritwick Dey**.

### Passo 3: Abrir o Projeto
- Abra a pasta do projeto no VS Code (`File > Open Folder...`).

### Passo 4: Iniciar o Live Server
- Clique com o botão direito no arquivo `index.html` (ou arquivo de entrada) e selecione **Open with Live Server**.

### Passo 5: Parar o Live Server
- Para parar o servidor, clique no ícone de **parada** no canto inferior direito do VS Code.

Pronto! O projeto estará rodando no seu navegador com atualizações automáticas.

Open with Live Server

## 🚀 Initialize

### Step 1: Install Visual Studio Code
- Download and install [Visual Studio Code](https://code.visualstudio.com/).

### Step 2: Install the Live Server Extension
- Open VS Code and go to the **Extensions** tab (`Ctrl+Shift+X`).
- Search for **Live Server** and install the extension by **Ritwick Dey**.

### Step 3: Open the Project
- Open the project folder in VS Code (`File > Open Folder...`).

### Step 4: Start the Live Server
- Right-click on the `index.html` file (or entry file) and select **Open with Live Server**.

### Step 5: Stop the Live Server
- To stop the server, click the **stop** icon in the bottom-right corner of VS Code.

Done! The project will be running in your browser with automatic updates.

---

## 🙏 **Agradecimentos**
- Este projeto foi inspirado no projeto de machine learning de [Erick Wendel](https://www.erickwendel.com/), agradeço pela inspiração e pelos ensinamentos que contribuíram para a realização deste projeto.
- Agradecimentos à **Xenova** por fornecer a biblioteca [@xenova/transformers](https://www.npmjs.com/package/@xenova/transformers), que possibilita a execução de modelos de machine learning diretamente no navegador.

## 🙏 **Acknowledgements**
- This project was inspired by the machine learning project from [Erick Wendel](https://www.erickwendel.com/). I thank him for the inspiration and teachings that contributed to the development of this project.
- Special thanks to **Xenova** for providing the [@xenova/transformers](https://www.npmjs.com/package/@xenova/transformers) library, which enables running machine learning models directly in the browser.

---

## 🔗 **Links Úteis**
- [Machine Learning Erick Wendel - Projeto](https://github.com/ErickWendel/semana-javascript-expert07).
- [Documentação da Xenova](https://xenova.ai/transformers).

## 🔗 **Useful Links**
- [Machine Learning Erick Wendel - Project](https://github.com/ErickWendel/semana-javascript-expert07)
- [Xenova Documentation](https://xenova.ai/transformers)

