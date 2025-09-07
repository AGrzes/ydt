import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { createWriteOutput } from '../src/write-output.js'
const { expect } = chai.use(sinonChai).use(chaiAsPromised)

describe('ytd', () => {
  describe('write-output', () => {
    it('should write new file with skip mode', async () => {
      const writeFile = sinon.stub().resolves()
      await createWriteOutput(writeFile)('path/to/file.txt', 'file content', 'skip')
      expect(writeFile).to.have.been.calledOnceWithExactly('path/to/file.txt', 'file content', { flag: 'wx' })
    })
  })
})
