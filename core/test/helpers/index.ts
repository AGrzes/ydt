import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinonChai from 'sinon-chai'
import { BUILTIN_HELPERS } from '../../src/helpers/index.js'
const { expect } = chai.use(sinonChai).use(chaiAsPromised)

describe('ytd', () => {
  describe('helpers', () => {
    it('should expose json helper', () => {
      expect(BUILTIN_HELPERS).to.have.property('json')
    })
    it('should expose yaml helper', () => {
      expect(BUILTIN_HELPERS).to.have.property('yaml')
    })
  })
})
