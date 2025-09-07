import Handlebars from 'handlebars'
import { TemplatingEngine } from './model.js'

export function createTemplatingEngine(): TemplatingEngine {
  const handlebars = Handlebars.create()
  return (template: string, context: Record<string, any>) => {
    const compiled = handlebars.compile(template)
    return compiled(context)
  }
}
