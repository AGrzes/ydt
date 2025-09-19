/* v8 ignore start */
import {
  BUILTIN_HELPERS,
  createFlow,
  createResolveTemplate,
  createTemplatingEngine,
  createWriteOutput,
} from '@agrzes/ydt'
import fs, { readFile } from 'fs/promises'
import { createProgram } from './program.js'

const writeOutput = createWriteOutput(fs)
const resolveTemplate = createResolveTemplate((path) => readFile(path, 'utf-8'))
const templateEngine = createTemplatingEngine(BUILTIN_HELPERS)
const generate = createFlow(templateEngine, resolveTemplate, writeOutput)

const program = createProgram(generate)

await program.parseAsync(process.argv)
