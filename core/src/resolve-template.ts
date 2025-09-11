import { join } from 'path'
import { LookupFile, ResolveTemplate, TemplateConfig } from './model.js'

export function createResolveTemplate(lookupFile: LookupFile): ResolveTemplate {
  return async function resolveTemplate(config: TemplateConfig, options?: { basePath?: string }): Promise<string> {
    if ('content' in config) {
      return config.content
    } else {
      const path = options?.basePath ? join(options.basePath, config.path) : config.path
      return lookupFile(path)
    }
  }
}
