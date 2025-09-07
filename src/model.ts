export type TemplateConfig = { path: string } | { content: string }

export interface FileGenerationConfig {
  path: string
  template: TemplateConfig
  context?: Record<string, any>
  mergeMode?: 'skip' | 'overwrite'
}
