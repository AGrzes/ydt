import { BUILTIN_HELPERS } from '@agrzes/ydt'
import fs from 'fs/promises'

export async function initHelpers(helpers: string[] = []) {
  const result = {
    ...BUILTIN_HELPERS,
  }
  for (const helperPath of helpers) {
    const stat = await fs.lstat(helperPath)
    if (stat.isFile()) {
      const helperModule = await import(helperPath)
      Object.assign(result, helperModule)
    } else if (stat.isDirectory()) {
      const files = await fs.readdir(helperPath)
      for (const file of files) {
        if (file.endsWith('.js') || file.endsWith('.ts')) {
          const helperModule = await import(`${helperPath}/${file}`)
          Object.assign(result, helperModule)
        }
      }
    }
  }
  return result
}
