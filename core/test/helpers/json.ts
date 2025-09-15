import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinonChai from 'sinon-chai'
import { json } from '../../src/helpers/json.js'
const { expect } = chai.use(sinonChai).use(chaiAsPromised)

describe('ytd', () => {
  describe('helpers', () => {
    describe('json', () => {
      it('should convert object to JSON string', () => {
        const obj = { a: 1, b: { c: 2 } }
        const result = json(obj)
        expect(JSON.parse(result)).to.deep.equal(obj)
      })
    })
  })
})
