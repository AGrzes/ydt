CLI Package for [@agrzes/ydt](https://www.npmjs.com/package/@agrzes/ydt) templating package.

# Usage

The `ydt` command accepts data form stdin and config file as an argument.

```bash
ydt [config-file]
```

It generates files defined by the config file using data from stdin.
The data are parsed as YAML but JSON as subset of YAML is also supported.

See [tutorial](https://github.com/AGrzes/ydt/blob/develop/doc/tutorial.md) for more information.

## Flags
- `-H, --helpers <helpers...>` - file or directory with custom handlebars helpers. All exports from the file will be registered as helpers. If directory is provided all `.js` files in the directory will be loaded. This option can be used multiple times.
- `-h, --help` - display help for command