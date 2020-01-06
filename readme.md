# Outlook PST to JSON

Command line tool that converts an Outlook PST file to JSON

# Releases

Click on the releases tab to download an EXE for Windows.

# Usage

```
pst_to_json -s /path/to/file.pst -d /path/to/output.json -v
```

## Required Parameters

* `-s` or `--source <path>` - path to PST file
* `-d` or `--destination <path>` - path to JSON output file

## Optional Parameters

* `-v` or `--verbose` - detailed output
* `-p` or `--pretty` - pretty formats the output (two spaces)
* `-h` or `--help`

# Build Your Own

Using `pkg`:

```
pkg index.js --output _dist/pst_to_json.exe
```

# Dependencies

* https://github.com/epfromer/pst-extractor by Ed Pfromer
* https://github.com/tj/commander.js by TJ Holowaychuk
* https://github.com/jprichardson/node-fs-extra by JP Richardson

# License

MIT
