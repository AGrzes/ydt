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
      const mkdir = sinon.stub().resolves()
      await createWriteOutput({ writeFile, mkdir })('path/to/file.txt', 'file content', 'skip')
      expect(writeFile).to.have.been.calledOnceWithExactly('path/to/file.txt', 'file content', { flag: 'wx' })
    })
    it('should not overwrite existing file with skip mode', async () => {
      const writeFile = sinon.stub().rejects({ code: 'EEXIST' })
      const mkdir = sinon.stub().resolves()
      await expect(createWriteOutput({ writeFile, mkdir })('path/to/file.txt', 'file content', 'skip')).to.be.fulfilled
      expect(writeFile).to.have.been.calledOnceWithExactly('path/to/file.txt', 'file content', { flag: 'wx' })
    })
    it('should propagate other errors with skip mode', async () => {
      const writeFile = sinon.stub().rejects(new Error('Some error'))
      const mkdir = sinon.stub().resolves()
      await expect(
        createWriteOutput({ writeFile, mkdir })('path/to/file.txt', 'file content', 'skip')
      ).to.be.rejectedWith('Some error')
      expect(writeFile).to.have.been.calledOnceWithExactly('path/to/file.txt', 'file content', { flag: 'wx' })
    })
    it('should overwrite existing file with overwrite mode', async () => {
      const writeFile = sinon.stub().resolves()
      const mkdir = sinon.stub().resolves()
      await createWriteOutput({ writeFile, mkdir })('path/to/file.txt', 'file content', 'overwrite')
      expect(writeFile).to.have.been.calledOnceWithExactly('path/to/file.txt', 'file content')
    })
    it('should overwrite existing file with default mode', async () => {
      const writeFile = sinon.stub().resolves()
      const mkdir = sinon.stub().resolves()
      await createWriteOutput({ writeFile, mkdir })('path/to/file.txt', 'file content', 'unknown' as any)
      expect(writeFile).to.have.been.calledOnceWithExactly('path/to/file.txt', 'file content')
    })
  })
})
