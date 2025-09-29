import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinonChai from 'sinon-chai'
import { initHelpers } from '../src/helpers.js'

const { expect } = chai.use(sinonChai).use(chaiAsPromised)

describe('ytd', () => {
  describe('helpers', () => {
    it('should initialize with built-in helpers only', async () => {
      const helpers = await initHelpers()
      expect(helpers).to.have.property('yaml')
      expect(helpers).to.have.property('json')
    })
  })
})
