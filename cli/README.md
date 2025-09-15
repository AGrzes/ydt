CLI Package for [@agrze/ydt]() templating package.

# Usage

The `ydt` command accepts data form stdin and config file as an argument.

```bash
ydt [config-file]
```

It generates files defined by the config file using data from stdin.
The data are parsed as YAML but JSON as subset of YAML is also supported.
