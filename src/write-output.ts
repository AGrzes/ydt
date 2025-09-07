import fs from 'fs/promises'
import { MergeMode } from './model.js'

export function createWriteOutput(writeFile: typeof fs.writeFile) {
  return async function writeOutput(path: string, content: string, mergeMode: MergeMode): Promise<void> {
    switch (mergeMode) {
      case 'skip':
        try {
          await writeFile(path, content, { flag: 'wx' })
        } catch (e: any) {
          if (e.code !== 'EEXIST') throw e
        }
        break
      case 'overwrite':
      default:
        await writeFile(path, content)
        break
    }
  }
}
