import { createFlow, createResolveTemplate, createTemplatingEngine, createWriteOutput } from '@agrzes/ydt'
import { Flow } from '@agrzes/ydt/src/model.js'
import { Command } from 'commander'
import fs, { readFile } from 'fs/promises'
import yaml from 'yaml'
import { initHelpers } from './helpers.js'

export function createProgram(
  cwo: typeof createWriteOutput,
  crt: typeof createResolveTemplate,
  cte: typeof createTemplatingEngine,
  cf: typeof createFlow
): Command {
  const program = new Command()
  program
    .name('ydt')
    .description('Multi file templating tool')
    .argument('<configPath>', 'Path to configuration file')
    .option('-H, --helpers <helpers...>', 'Additional helpers modules')
    .action(async (config, options) => {
      const input = Buffer.concat(await process.stdin.toArray()).toString('utf-8')
      const writeOutput = cwo(fs)
      const resolveTemplate = crt((path) => readFile(path, 'utf-8'))
      const templateEngine = cte(await initHelpers(options.helpers))
      const generate: Flow = cf(templateEngine, resolveTemplate, writeOutput)
      await generate(config, yaml.parse(input))
    })
  return program
}
