import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { createProgram } from '../src/program.js'

const { expect } = chai.use(sinonChai).use(chaiAsPromised)

describe('ytd', () => {
  describe('program', () => {
    it('should run program with given config and context', async () => {
      const generate = sinon.stub().resolves()
      const cwo = sinon.stub()
      const crt = sinon.stub()
      const cte = sinon.stub()
      const cf = sinon.stub().returns(generate)
      const program = createProgram(cwo, crt, cte, cf)
      program.exitOverride(() => {
        throw new Error('process.exit called')
      })
      const configPath = 'path/to/config.yaml'
      const context = { name: 'World' }
      const input = JSON.stringify(context)
      const stdin = sinon.stub(process.stdin, 'toArray').resolves([Buffer.from(input)])
      await program.parseAsync([configPath], { from: 'user' })
      expect(generate).to.have.been.calledOnceWithExactly(configPath, context)
      stdin.restore()
    })
    it('should throw error when no config path is provided', async () => {
      const generate = sinon.stub().resolves()
      const cwo = sinon.stub()
      const crt = sinon.stub()
      const cte = sinon.stub()
      const cf = sinon.stub().returns(generate)
      const program = createProgram(cwo, crt, cte, cf)
      program.exitOverride(() => {
        throw new Error('process.exit called')
      })
      const stdin = sinon.stub(process.stdin, 'toArray').resolves([Buffer.from('{}')])
      await expect(program.parseAsync([], { from: 'user' })).to.eventually.be.rejectedWith('process.exit called')
      expect(generate).to.not.have.been.called
      stdin.restore()
    })
  })
})
