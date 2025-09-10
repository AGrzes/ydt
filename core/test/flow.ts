import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { createFlow } from '../src/flow.js'

const { expect } = chai.use(sinonChai).use(chaiAsPromised)

describe('ytd', () => {
  describe('flow', () => {
    it('should generate config based on template and context', async () => {
      const templateEngine = sinon.stub().returns('[]')
      const resolveTemplate = sinon.stub().resolves('template content')
      const writeOutput = sinon.stub().resolves()
      const flow = createFlow(templateEngine, resolveTemplate, writeOutput)
      await flow('path/to/config.yaml', { name: 'World' })
      expect(resolveTemplate).to.have.been.calledOnceWithExactly({ path: 'path/to/config.yaml' })
      expect(templateEngine).to.have.been.calledOnceWithExactly('template content', { name: 'World' })
      expect(writeOutput).to.not.have.been.called
    })
    it('should generate files based on config', async () => {
      const templateEngine = sinon.stub()
      templateEngine.onFirstCall().returns(`
        - path: output1.txt
          template:
            content: "Hello {{name}}"
      `)
      templateEngine.onSecondCall().returns('Hello World')
      const resolveTemplate = sinon.stub()
      resolveTemplate.onFirstCall().resolves('config template')
      resolveTemplate.onSecondCall().resolves('file template')
      const writeOutput = sinon.stub().resolves()
      const flow = createFlow(templateEngine, resolveTemplate, writeOutput)
      await flow('path/to/config.yaml', { name: 'World' })
      expect(resolveTemplate.getCall(0)).to.have.been.calledWithExactly({ path: 'path/to/config.yaml' })
      expect(templateEngine.getCall(0)).to.have.been.calledWithExactly('config template', { name: 'World' })
      expect(resolveTemplate.getCall(1)).to.have.been.calledWithExactly(
        { content: 'Hello {{name}}' },
        { basePath: 'path/to' }
      )
      expect(templateEngine.getCall(1)).to.have.been.calledWithExactly('file template', { name: 'World' })
      expect(writeOutput).to.have.been.calledOnceWithExactly('output1.txt', 'Hello World', undefined)
    })
    it('should overwrite global context with file context', async () => {
      const templateEngine = sinon.stub()
      templateEngine.onFirstCall().returns(`
        - path: output1.txt
          template:
            content: "Hello {{name}}"
          context:
            name: "File"
      `)
      templateEngine.onSecondCall().returns('Hello File')
      const resolveTemplate = sinon.stub()
      resolveTemplate.onFirstCall().resolves('config template')
      resolveTemplate.onSecondCall().resolves('file template')
      const writeOutput = sinon.stub().resolves()
      const flow = createFlow(templateEngine, resolveTemplate, writeOutput)
      await flow('path/to/config.yaml', { name: 'World' })
      expect(resolveTemplate.getCall(0)).to.have.been.calledWithExactly({ path: 'path/to/config.yaml' })
      expect(templateEngine.getCall(0)).to.have.been.calledWithExactly('config template', { name: 'World' })
      expect(resolveTemplate.getCall(1)).to.have.been.calledWithExactly(
        { content: 'Hello {{name}}' },
        { basePath: 'path/to' }
      )
      expect(templateEngine.getCall(1)).to.have.been.calledWithExactly('file template', { name: 'File' })
      expect(writeOutput).to.have.been.calledOnceWithExactly('output1.txt', 'Hello File', undefined)
    })
    it('should pass MergeMode to writeOutput', async () => {
      const templateEngine = sinon.stub()
      templateEngine.onFirstCall().returns(`
        - path: output1.txt
          template:
            content: "Hello {{name}}"
          mergeMode: "skip"
      `)
      templateEngine.onSecondCall().returns('Hello World')
      const resolveTemplate = sinon.stub()
      resolveTemplate.onFirstCall().resolves('config template')
      resolveTemplate.onSecondCall().resolves('file template')
      const writeOutput = sinon.stub().resolves()
      const flow = createFlow(templateEngine, resolveTemplate, writeOutput)
      await flow('path/to/config.yaml', { name: 'World' })
      expect(resolveTemplate.getCall(0)).to.have.been.calledWithExactly({ path: 'path/to/config.yaml' })
      expect(templateEngine.getCall(0)).to.have.been.calledWithExactly('config template', { name: 'World' })
      expect(resolveTemplate.getCall(1)).to.have.been.calledWithExactly(
        { content: 'Hello {{name}}' },
        { basePath: 'path/to' }
      )
      expect(templateEngine.getCall(1)).to.have.been.calledWithExactly('file template', { name: 'World' })
      expect(writeOutput).to.have.been.calledOnceWithExactly('output1.txt', 'Hello World', 'skip')
    })
    it('should cascade resolveTemplate error', async () => {
      const templateEngine = sinon.stub()
      const resolveTemplate = sinon.stub().rejects(new Error('Some error'))
      const writeOutput = sinon.stub().resolves()
      const flow = createFlow(templateEngine, resolveTemplate, writeOutput)
      await expect(flow('path/to/config.yaml', { name: 'World' })).to.be.rejectedWith('Some error')
      expect(resolveTemplate).to.have.been.calledOnceWithExactly({ path: 'path/to/config.yaml' })
      expect(templateEngine).to.not.have.been.called
      expect(writeOutput).to.not.have.been.called
    })
    it('should cascade templateEngine config error', async () => {
      const templateEngine = sinon.stub().throws(new Error('Some error'))
      const resolveTemplate = sinon.stub().resolves('config template')
      const writeOutput = sinon.stub().resolves()
      const flow = createFlow(templateEngine, resolveTemplate, writeOutput)
      await expect(flow('path/to/config.yaml', { name: 'World' })).to.be.rejectedWith('Some error')
      expect(resolveTemplate).to.have.been.calledOnceWithExactly({ path: 'path/to/config.yaml' })
      expect(templateEngine).to.have.been.calledOnceWithExactly('config template', { name: 'World' })
      expect(writeOutput).to.not.have.been.called
    })
    it('should cascade templateEngine file error', async () => {
      const templateEngine = sinon.stub()
      templateEngine.onFirstCall().returns(`
        - path: output1.txt
          template:
            content: "Hello {{name}}"
      `)
      templateEngine.onSecondCall().throws(new Error('Some error'))
      const resolveTemplate = sinon.stub()
      resolveTemplate.onFirstCall().resolves('config template')
      resolveTemplate.onSecondCall().resolves('file template')
      const writeOutput = sinon.stub().resolves()
      const flow = createFlow(templateEngine, resolveTemplate, writeOutput)
      await expect(flow('path/to/config.yaml', { name: 'World' })).to.be.rejectedWith('Some error')
      expect(resolveTemplate.getCall(0)).to.have.been.calledWithExactly({ path: 'path/to/config.yaml' })
      expect(templateEngine.getCall(0)).to.have.been.calledWithExactly('config template', { name: 'World' })
      expect(resolveTemplate.getCall(1)).to.have.been.calledWithExactly(
        { content: 'Hello {{name}}' },
        { basePath: 'path/to' }
      )
      expect(templateEngine.getCall(1)).to.have.been.calledWithExactly('file template', { name: 'World' })
      expect(writeOutput).to.not.have.been.called
    })
    it('should cascade writeOutput error', async () => {
      const templateEngine = sinon.stub()
      templateEngine.onFirstCall().returns(`
        - path: output1.txt
          template:
            content: "Hello {{name}}"
      `)
      templateEngine.onSecondCall().returns('Hello World')
      const resolveTemplate = sinon.stub()
      resolveTemplate.onFirstCall().resolves('config template')
      resolveTemplate.onSecondCall().resolves('file template')
      const writeOutput = sinon.stub().rejects(new Error('Some error'))
      const flow = createFlow(templateEngine, resolveTemplate, writeOutput)
      await expect(flow('path/to/config.yaml', { name: 'World' })).to.be.rejectedWith('Some error')
      expect(resolveTemplate.getCall(0)).to.have.been.calledWithExactly({ path: 'path/to/config.yaml' })
      expect(templateEngine.getCall(0)).to.have.been.calledWithExactly('config template', { name: 'World' })
      expect(resolveTemplate.getCall(1)).to.have.been.calledWithExactly(
        { content: 'Hello {{name}}' },
        { basePath: 'path/to' }
      )
      expect(templateEngine.getCall(1)).to.have.been.calledWithExactly('file template', { name: 'World' })
      expect(writeOutput).to.have.been.calledOnceWithExactly('output1.txt', 'Hello World', undefined)
    })
    it('should cascade YAML parse error', async () => {
      const templateEngine = sinon.stub()
      templateEngine.onFirstCall().returns(`invalid: yaml: :`)
      const resolveTemplate = sinon.stub()
      resolveTemplate.onFirstCall().resolves('config template')
      const writeOutput = sinon.stub().resolves()
      const flow = createFlow(templateEngine, resolveTemplate, writeOutput)
      await expect(flow('path/to/config.yaml', { name: 'World' })).to.be.rejected
      expect(resolveTemplate).to.have.been.calledOnceWithExactly({ path: 'path/to/config.yaml' })
      expect(templateEngine).to.have.been.calledOnceWithExactly('config template', { name: 'World' })
      expect(writeOutput).to.not.have.been.called
    })
  })
})
