import {
  BUILTIN_HELPERS,
  createFlow,
  createResolveTemplate,
  createTemplatingEngine,
  createWriteOutput,
} from '@agrzes/ydt'
import { Flow } from '@agrzes/ydt/src/model.js'
import fs, { readFile } from 'fs/promises'

import { Command } from 'commander'
import yaml from 'yaml'

export function createProgram(
  cwo: typeof createWriteOutput,
  crt: typeof createResolveTemplate,
  cte: typeof createTemplatingEngine,
  cf: typeof createFlow
): Command {
  const writeOutput = cwo(fs)
  const resolveTemplate = crt((path) => readFile(path, 'utf-8'))
  const templateEngine = cte(BUILTIN_HELPERS)
  const generate: Flow = cf(templateEngine, resolveTemplate, writeOutput)
  const program = new Command()
  program
    .name('ydt')
    .description('Multi file templating tool')
    .argument('<configPath>', 'Path to configuration file')
    .action(async (config) => {
      const input = Buffer.concat(await process.stdin.toArray()).toString('utf-8')
      await generate(config, yaml.parse(input))
    })
  return program
}
