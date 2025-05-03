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