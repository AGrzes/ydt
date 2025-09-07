import { readFile, writeFile } from 'fs/promises'
import Handlebars from 'handlebars'
import yaml from 'yaml'
import { FileGenerationConfig } from './model.js'
import { createWriteOutput } from './write-output.js'

const handlebars = Handlebars.create()
const writeOutput = createWriteOutput(writeFile)

async function generate(configPath: string, context: Record<string, any> = {}): Promise<void> {
  const configText = handlebars.compile(await readFile(configPath, 'utf-8'))(context)
  const config: FileGenerationConfig[] = yaml.parse(configText) || []
  await Promise.all(
    config.map(async (fileConfig: FileGenerationConfig) => {
      const template =
        'content' in fileConfig.template
          ? fileConfig.template.content
          : await readFile(fileConfig.template.path, 'utf-8')
      const compiled = handlebars.compile(template)
      const output = compiled({ ...context, ...fileConfig.context })
      await writeOutput(fileConfig.path, output, fileConfig.mergeMode)
    })
  )
}

const input = Buffer.concat(await process.stdin.toArray()).toString('utf-8')

await generate(process.argv[2], yaml.parse(input))
