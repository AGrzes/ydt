import { dirname } from 'path'
import yaml from 'yaml'
import { FileGenerationConfig, Flow, ResolveTemplate, TemplatingEngine, WriteOutput } from './model.js'
export function createFlow(
  templateEngine: TemplatingEngine,
  resolveTemplate: ResolveTemplate,
  writeOutput: WriteOutput
): Flow {
  return async function generate(configPath: string, context: Record<string, any> = {}): Promise<void> {
    const configText = templateEngine(await resolveTemplate({ path: configPath }), context)
    const config: FileGenerationConfig[] = yaml.parse(configText)
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
}
