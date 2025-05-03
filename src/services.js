import { cosineSimilarity } from "./utils.js"

export class Service {
    #repository
    #extractor

    #defaultAnswer = "Sorry, I didn't understand."
    #similarity = 0.75

    constructor({ repository, extractor }){
        this.#repository = repository
        this.#extractor = extractor
    }

    async handleEmbedding(text) {
        const output = await this.#extractor(text, { pooling: 'mean', normalize: true })
        return output.data
    }

    async handleVectors() {
        const data = await this.#repository.loadDataBase()

        const vectors = []

        for (const item of data) {
          for (const variant of item.variants) {
            const embedding = await this.handleEmbedding(variant);
            vectors.push({
              variant,
              answer: item.answer,
              embedding
            });
          }
        }

        return vectors;
    }

    async findAnswer(embedding, vectors) {
      let objAnswer = { sim: this.#similarity, answer: this.#defaultAnswer }
      let sugestion = {
        sim: this.#similarity - 0.15,
        answer: this.#defaultAnswer,
      }
  
      for (const item of vectors) {
        const sim = cosineSimilarity(embedding, Object.values(item.embedding))
  
        if (sim > objAnswer.sim) {
          objAnswer = { sim, answer: item.answer }
          continue
        }
  
        if (sim > sugestion.sim) {
          sugestion = {
            sim,
            answer:
              this.#defaultAnswer + ` Did you mean "${item.variant}"?`,
          }
          continue
        }
      }
  
      return objAnswer.answer !== this.#defaultAnswer
        ? objAnswer.answer
        : sugestion.answer
    }
}