# Core API

## createFlow

Creates a main templating flow for file generation.

- **Params:**
  - **templateEngine:** `TemplatingEngine` - The templating engine function.
  - **resolveTemplate:** `ResolveTemplate` - The template resolver function.
  - **writeOutput:** `WriteOutput` - The output writer function.
- **Returns:** `Flow` - The flow function.

## createTemplatingEngine

Creates a templating engine.

- **Params:**
  - **helpers:** `Record<string, Handlebars.HelperDelegate>` (optional) - Custom helpers for Handlebars.
- **Returns:** `TemplatingEngine` - The templating engine function.

## BUILTIN_HELPERS

Built-in helpers for templates. Is default of `createTemplatingEngine` or it can be ...spread into custom helpers and passed together.

- **Helpers:**
  - **json:** - Serializes an object to JSON.
  - **yaml:** - Serializes an object to YAML.

## createResolveTemplate

Creates a template resolver.

- **Params:**
  - **lookupFile:** `LookupFile` - The file lookup function.
- **Returns:** `ResolveTemplate` - The template resolver function.

## createWriteOutput

Creates an output writer.

- **Params:**
  - **fs:** - File system interface - should be passed `fs/promises`.
- **Returns:** `WriteOutput` - The output writer function.

## Types from model.ts

### TemplateConfig

Represents a template source.

- **Params:**
  - **path:** `string` (optional) - Path to the template file.
  - **content:** `string` (optional) - Inline template content.

### MergeMode

Specifies file merge behavior.

- **Values:**
  - `'skip'` - Skip writing if file exists.
  - `'overwrite'` - Overwrite existing file.

### FileGenerationConfig

Configuration for generating a file.

- **Fields:**
  - **path:** `string` - Output file path.
  - **template:** `TemplateConfig` - Template source.
  - **context:** `Object` - Context for template rendering.
  - **mergeMode:** `MergeMode` (optional) - Merge behavior.

### TemplatingEngine

Function for rendering templates.

- **Params:**
  - **template:** `string` - Template string.
  - **context:** `Object` - Rendering context.
- **Returns:** `string` - Rendered output.

### WriteOutput

Function for writing output files.

- **Params:**
  - **path:** `string` - Output file path.
  - **content:** `string` - File content.
  - **mergeMode:** `MergeMode` - Merge behavior.
- **Returns:** `Promise` - async completion

### ResolveTemplate

Function for resolving a template.

- **Params:**
  - **config:** `TemplateConfig` - Template source.
  - **options:** optional options
    - **basePath:** `string` (optional) - Base path for resolution.
- **Returns:** `string` - async template body

### Flow

Main flow function for file generation.

- **Params:**
  - **configPath:** `string` - Path to config file.
  - **context:** `Object` (optional) - Context for rendering.
- **Returns:** `Promise` - async completion

### LookupFile

Function for looking up a file's content.

- **Params:**
  - **path:** `string` - File path.
- **Returns:** `string` - async file content

### StoreFile

Function for storing file content.

- **Params:**
  - **path:** `string` - File path.
  - **content:** `string` - File content.
- **Returns:** `Promise` - async completion
