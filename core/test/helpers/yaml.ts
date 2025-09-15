import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinonChai from 'sinon-chai'
import YAML from 'yaml'
import { yaml } from '../../src/helpers/yaml.js'
const { expect } = chai.use(sinonChai).use(chaiAsPromised)

describe('ytd', () => {
  describe('helpers', () => {
    describe('yaml', () => {
      it('should convert object to yaml string', () => {
        const obj = { a: 1, b: { c: 2 } }
        const result = yaml(obj)
        expect(YAML.parse(result)).to.deep.equal(obj)
      })
    })
  })
})
