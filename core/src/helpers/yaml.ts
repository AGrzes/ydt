import YAML from 'yaml'
export function yaml(obj: any): string {
  return YAML.stringify(obj)
}
