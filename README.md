# ignoreit

VSCODE Extension that helps you to automatically ignore files and folders in your project workspace.

## Features
By default, the following files would be ignored with the help of ignoreit. You can add more files to it as you wish.

```json
"ignoreit.array": [".env", "node_modules", "coverage"]
```

https://user-images.githubusercontent.com/25563661/146476324-a4bb9e45-8533-4ad4-acec-bc85ad866fcb.mp4

* Install and navigate to vscode `settings.json` and ensure you have `"ignoreit.array": [".env", "node_modules", "coverage"]` as one of the key-value pairs. The array is a list of files and folders you wish to always ignore. Feel free to modify it.
* If any of the files or folders specified in the array exists in your project directory, `ignoreit` extension will add it to the `.gitignore` file.
* If `.gitignore` file does not exist in your project directory, `ignoreit` extension will create a `.gitignore` file and fill in the files you're to ignore.
* The `.gitignore` content will be the files in your project directory that corresponds to the `ignoreit.array`
* You can manually add other files to the `.gitignore` file. New files are always appended to the existing ones.
* If `.env` file is part of the files in your directory, `ignoreit` extension will create a `.env.example` file and fill it with the the contents of your .env file. Only variables are filled in, values are left behind. The `.env` and `.env.example` files will always be in sync.

## Requirements

This extension works when you're working in a git repository on VSCODE.

## Extension Settings

This extension requires that `ignoreit.array` key be added to your VSCODE `settings.json` file and value should be an array of files you wish to automatically add to `.gitignore` file in all your project (if the files or folders exist in your project). See example below
```json
"ignoreit.array": [".env", "node_modules", "coverage"]
```

## Known Issues

No known issues

### Contact

* [LinkedIn](https://www.linkedin.com/in/marcdomain)
* [GitHub](https://www.github.com/marcdomain)
* [Website](https://www.marcdomain.dev)

**Enjoy👍🏽** [https://marketplace.visualstudio.com/items?itemName=marcdomain.ignoreit](https://marketplace.visualstudio.com/items?itemName=marcdomain.ignoreit)
