import fs from 'fs/promises'
import { dirname } from 'path'
import { MergeMode, WriteOutput } from './model.js'

export function createWriteOutput(_fs: Pick<typeof fs, 'mkdir' | 'writeFile'>): WriteOutput {
  return async function writeOutput(path: string, content: string, mergeMode: MergeMode): Promise<void> {
    await _fs.mkdir(dirname(path), { recursive: true })
    switch (mergeMode) {
      case 'skip':
        try {
          await _fs.writeFile(path, content, { flag: 'wx' })
        } catch (e: any) {
          if (e.code !== 'EEXIST') throw e
        }
        break
      case 'overwrite':
      default:
        await _fs.writeFile(path, content)
        break
    }
  }
}
