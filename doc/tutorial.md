# Basic example

The simplest example of using YDT is single file configuration.
With config.yaml:

```yaml
- path: sample.txt
  template:
    content: |
      This is a sample file.
      Hello {{name}}
```

Calling `ydt` and providing data as yaml on standard input:

```bash
echo "name: World" | ydt config.yaml
cat sample.txt
```

will get:

```
This is a sample file.
Hello World
```

# Templating configuration

Handlebars can be used in places other than file content. For example file path can be templated.

With config.yaml:

```yaml
- path: 'sample-{{name}}.txt'
  template:
    content: |
      This is a sample file.
      Hello {{name}}
```

ruining

```bash
echo "name: World" | ydt config.yaml
cat sample-World.txt
```

will get:

```
This is a sample file.
Hello World
```

But other constructs of handlebars can be used as well. For example iterating over a list.

With config.yaml:

```yaml
{{#each names as |name|}}
- path: "sample-{{@index}}.txt"
  template:
    content: |
      This is a sample file.
      Hello {{name}}
{{/each}}
```

runing

```bash
echo "names: [World, YDT]" | ydt config.yaml
cat sample-*.txt
```

will get the following output:

```
This is a sample file.
Hello World
This is a sample file.
Hello YDT
```

# Using external template files

Instead of providing template content inline in the configuration file, it can be read from an external file.

With config.yaml:

```yaml
- path: sample.txt
  template:
    path: sample.txt.handlebars
```

and sample.txt.handlebars:

```handlebars
This is a sample file. 
Hello {{name}}
```

runing

```bash
echo "name: World" | ydt config.yaml
cat sample.txt
```

will get:

```
This is a sample file.
Hello World
```

The catch is that the external template will get the same context as the configuration file not "current context" as one might expect.

# Providing context for templates

Sometimes it is useful to provide additional context for templates.
This can be done using `context` field in the configuration.

With config.yaml:

```yaml
- path: sample.txt
  context:
    greeting: Hello
  template:
    content: |
      This is a sample file.
      {{greeting}} {{name}}
```

running

```bash
echo "name: World" | ydt config.yaml
cat sample.txt
```

will get:

```
This is a sample file.
Hello World
```

But it can be also used to pass specific parts of the input data to specific templates. It is especially useful when iterating over a list.

With config.yaml:

```yaml
{{#each names as |name|}}
- path: "sample-{{@index}}.txt"
  context:
    name: "{{name}}"
  template:
    path: sample.txt.handlebars
{{/each}}
```

and sample.txt.handlebars:

```handlebars
This is a sample file. Hello {{name}}
```

runing

```bash
echo "names: [World, YDT]" | ydt config.yaml
cat sample-*.txt
```

will get:

```
This is a sample file.
Hello World
This is a sample file.
Hello YDT
```
