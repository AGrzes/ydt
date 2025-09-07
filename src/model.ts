export type TemplateConfig = { path: string } | { content: string }

export type MergeMode = 'skip' | 'overwrite'

export interface FileGenerationConfig {
  path: string
  template: TemplateConfig
  context?: Record<string, any>
  mergeMode?: MergeMode
}

export type TemplatingEngine = (template: string, context: Record<string, any>) => string