import { readFile, writeFile } from 'fs/promises'
import yaml from 'yaml'
import { createFlow } from './flow.js'
import { createResolveTemplate } from './resolve-template.js'
import { createTemplatingEngine } from './templating-engine.js'
import { createWriteOutput } from './write-output.js'

const writeOutput = createWriteOutput(writeFile)
const resolveTemplate = createResolveTemplate((path) => readFile(path, 'utf-8'))
const templateEngine = createTemplatingEngine()
const generate = createFlow(templateEngine, resolveTemplate, writeOutput)

const input = Buffer.concat(await process.stdin.toArray()).toString('utf-8')

await generate(process.argv[2], yaml.parse(input))
