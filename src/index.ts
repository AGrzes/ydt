import { readFile, writeFile } from 'fs/promises'
import Handlebars from 'handlebars'
import { dirname } from 'path'
import yaml from 'yaml'
import { FileGenerationConfig } from './model.js'
import { createResolveTemplate } from './resolve-template.js'
import { createTemplatingEngine } from './templating-engine.js'
import { createWriteOutput } from './write-output.js'

const handlebars = Handlebars.create()
const writeOutput = createWriteOutput(writeFile)
const resolveTemplate = createResolveTemplate((path) => readFile(path, 'utf-8'))
const templateEngine = createTemplatingEngine()
async function generate(configPath: string, context: Record<string, any> = {}): Promise<void> {
  const configText = templateEngine(await readFile(configPath, 'utf-8'), context)
  const config: FileGenerationConfig[] = yaml.parse(configText) || []
  const resolveConfig = {
    basePath: dirname(configPath),
  }
  await Promise.all(
    config.map(async (fileConfig: FileGenerationConfig) => {
      const template = await resolveTemplate(fileConfig.template, resolveConfig)
      const output = templateEngine(template, { ...context, ...fileConfig.context })
      await writeOutput(fileConfig.path, output, fileConfig.mergeMode)
    })
  )
}

const input = Buffer.concat(await process.stdin.toArray()).toString('utf-8')

await generate(process.argv[2], yaml.parse(input))
