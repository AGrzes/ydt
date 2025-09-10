/* v8 ignore start */
import { readFile, writeFile } from 'fs/promises'
import { createProgram } from './command.js'
import { createFlow } from './flow.js'
import { createResolveTemplate } from './resolve-template.js'
import { createTemplatingEngine } from './templating-engine.js'
import { createWriteOutput } from './write-output.js'

const writeOutput = createWriteOutput(writeFile)
const resolveTemplate = createResolveTemplate((path) => readFile(path, 'utf-8'))
const templateEngine = createTemplatingEngine()
const generate = createFlow(templateEngine, resolveTemplate, writeOutput)

const program = createProgram(generate)

await program.parseAsync(process.argv)
