/* v8 ignore start */
import { createFlow, createResolveTemplate, createTemplatingEngine, createWriteOutput } from '@agrzes/ydt'
import { createProgram } from './program.js'

const program = createProgram(createWriteOutput, createResolveTemplate, createTemplatingEngine, createFlow)

await program.parseAsync(process.argv)
