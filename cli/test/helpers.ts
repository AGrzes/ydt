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
    it('should initialize with additional helpers from js file', async () => {
      const helpers = await initHelpers(['test/helpers/sample.js'])
      expect(helpers).to.have.property('yaml')
      expect(helpers).to.have.property('json')
      expect(helpers).to.have.property('sampleJs')
    })
    it('should initialize with additional helpers from ts file', async () => {
      const helpers = await initHelpers(['test/helpers/sample.ts'])
      expect(helpers).to.have.property('yaml')
      expect(helpers).to.have.property('json')
      expect(helpers).to.have.property('sampleTs')
    })
    it('should initialize with additional helpers from directory', async () => {
      const helpers = await initHelpers(['test/helpers'])
      expect(helpers).to.have.property('yaml')
      expect(helpers).to.have.property('json')
      expect(helpers).to.have.property('sampleJs')
      expect(helpers).to.have.property('sampleTs')
    })
  })
})
