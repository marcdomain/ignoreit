# ignore_it

This extension enables you to automatically ignore files and folders in your project workspace.

## Features

Go to your VSCODE settings.json file and add the key-value pair you wish to track in your `.gitignore` file. For example
```json
"ignore_it.array": [".env", "node_modules", "coverage"]
```
The key should be `ignore_it.array`, while the value should be an array of files or folders you wish to ignore.

\!\[feature X\]\(images/feature-x.png\)

## Requirements

This extension works when you're working in a git repository on VSCODE.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Initial release

### 1.0.0

## Working with Markdown

**Note:** You can author your README using Visual Studio Code.  Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
* Toggle preview (`Shift+CMD+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
* Press `Ctrl+Space` (Windows, Linux) or `Cmd+Space` (macOS) to see a list of Markdown snippets

### For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
