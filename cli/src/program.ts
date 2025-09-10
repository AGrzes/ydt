import { Flow } from '@agrzes/ydt/src/model.js'
import { Command } from 'commander'
import yaml from 'yaml'

export function createProgram(generate: Flow) {
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
