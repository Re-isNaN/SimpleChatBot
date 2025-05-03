import { Repository } from './repository.js'
import { Service } from './services.js'

// no processo principal é window
// no worker é self
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
