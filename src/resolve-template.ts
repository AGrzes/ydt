import { join } from 'path'
import { TemplateConfig } from './model.js'

export function createResolveTemplate(lookupFile: (path: string) => Promise<string>) {
  return async function resolveTemplate(config: TemplateConfig, options?: { basePath?: string }): Promise<string> {
    if ('content' in config) {
      return config.content
    } else {
      const path = options?.basePath ? join(options.basePath, config.path) : config.path
      return lookupFile(path)
    }
  }
}
