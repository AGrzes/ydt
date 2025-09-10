export type TemplateConfig = { path: string } | { content: string }

export type MergeMode = 'skip' | 'overwrite'

export interface FileGenerationConfig {
  path: string
  template: TemplateConfig
  context?: Record<string, any>
  mergeMode?: MergeMode
}

export type TemplatingEngine = (template: string, context: Record<string, any>) => string

export type WriteOutput = (path: string, content: string, mergeMode: MergeMode) => Promise<void>

export type ResolveTemplate = (config: TemplateConfig, options?: { basePath?: string }) => Promise<string>

export type Flow = (configPath: string, context?: Record<string, any>) => Promise<void>