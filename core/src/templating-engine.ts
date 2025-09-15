import Handlebars from 'handlebars'
import { TemplatingEngine } from './model.js'

export function createTemplatingEngine(helpers?: Record<string, Handlebars.HelperDelegate>): TemplatingEngine {
  const handlebars = Handlebars.create()
  Object.entries(helpers || {}).forEach(([name, fn]) => {
    handlebars.registerHelper(name, fn)
  })
  return (template: string, context: Record<string, any>) => {
    const compiled = handlebars.compile(template)
    return compiled(context)
  }
}
