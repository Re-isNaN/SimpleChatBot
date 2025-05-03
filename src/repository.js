import { databaseSimulated } from './databaseSimulated.js'

export class Repository {
  api

  constructor() {
    this.api = null
  }

  async loadDataBase() {
    try {
      //   await this.api.get('')
      return databaseSimulated
    } catch (err) {
      console.error(err)
      return databaseSimulated
    }
  }
}
