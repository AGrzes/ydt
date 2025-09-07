import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { createResolveTemplate } from '../src/resolve-template.js'
const { expect } = chai.use(sinonChai).use(chaiAsPromised)

describe('ytd', () => {
  describe('write-output', () => {
    it('should resolve inline template', async () => {
      const lookupFile = sinon.stub()
      const resolveTemplate = createResolveTemplate(lookupFile)
      const content = await resolveTemplate({ content: 'inline template' })
      expect(content).to.equal('inline template')
      expect(lookupFile).not.to.have.been.called
    })
    it('should resolve file template without basePath', async () => {
      const lookupFile = sinon.stub().resolves('file template content')
      const resolveTemplate = createResolveTemplate(lookupFile)
      const content = await resolveTemplate({ path: 'template.txt' })
      expect(content).to.equal('file template content')
      expect(lookupFile).to.have.been.calledOnceWithExactly('template.txt')
    })
    it('should resolve file template with basePath', async () => {
      const lookupFile = sinon.stub().resolves('file template content with basePath')
      const resolveTemplate = createResolveTemplate(lookupFile)
      const content = await resolveTemplate({ path: 'template.txt' }, { basePath: '/base/dir' })
      expect(content).to.equal('file template content with basePath')
      expect(lookupFile).to.have.been.calledOnceWithExactly('/base/dir/template.txt')
    })
  })
})
