import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinonChai from 'sinon-chai'
import { createTemplatingEngine } from '../src/templating-engine.js'
const { expect } = chai.use(sinonChai).use(chaiAsPromised)

describe('ytd', () => {
  describe('write-output', () => {
    it('should render template with context', () => {
      const templateEngine = createTemplatingEngine()
      const result = templateEngine('Hello {{name}}', { name: 'World' })
      expect(result).to.equal('Hello World')
    })
    it('should register helpers', () => {
      const templateEngine = createTemplatingEngine({
        shout: (text: string) => text.toUpperCase(),
      })
      const result = templateEngine('Hello {{shout name}}', { name: 'World' })
      expect(result).to.equal('Hello WORLD')
    })
  })
})
