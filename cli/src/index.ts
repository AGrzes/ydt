/* v8 ignore start */
import { createFlow, createResolveTemplate, createTemplatingEngine, createWriteOutput } from '@agrzes/ydt'
import { readFile, writeFile } from 'fs/promises'
import { createProgram } from './program.js'

const writeOutput = createWriteOutput(writeFile)
const resolveTemplate = createResolveTemplate((path) => readFile(path, 'utf-8'))
const templateEngine = createTemplatingEngine()
const generate = createFlow(templateEngine, resolveTemplate, writeOutput)

const program = createProgram(generate)

await program.parseAsync(process.argv)
