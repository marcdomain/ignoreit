# ignoreit

VSCODE Extension that helps you to automatically ignore files and folders in your project workspace.

## Install

[https://marketplace.visualstudio.com/items?itemName=marcdomain.ignoreit](https://marketplace.visualstudio.com/items?itemName=marcdomain.ignoreit)

## Requirements

This extension works when you're working in a `git repository` on VSCODE.

## Features

By default, the following files would be ignored with the help of ignoreit. You can add more files to it as you wish.

```json
"ignoreit.array": [".env", "*.pem"]
```

https://user-images.githubusercontent.com/25563661/210540446-48010e02-e50b-4109-bc2f-b92021474824.mp4

* Install and navigate to vscode `settings` or `settings.json` page.
* Set `"ignoreit.array": [".env", "*.pem"]` to include the files and folders you'd always want to ignore. Feel free to modify it anytime.
* If any of the files or folders specified in the array exists in your project directory, `ignoreit` extension will add it to the `.gitignore` file.
* If `.gitignore` file does not exist in your project directory, `ignoreit` extension will create a `.gitignore` file and fill in the files you're to ignore.
* The `.gitignore` content will be the files in your project directory that corresponds to the `ignoreit.array`
* You can manually add other files to the `.gitignore` file. New files are always appended to the existing ones.
* If `.env` file is part of the files in your directory, `ignoreit` extension will create a `.env.example` file and fill it with the the contents of your .env file. Only variables are filled in, values are left behind. The `.env` and `.env.example` files will always be in sync.
* You can use wildcards to specify files ending in certain patterns (example: `"*.pem"`)

## Extension Settings

`ignoreit.array` should exist as one of the keys in your VSCODE `settings.json` file, and the value should be an array of the files you wish to automatically add to `.gitignore` file in all your project (if the files or folders exist in your project). See example below

```json
"ignoreit.array": [".env", "*.pem", "node_modules", "coverage"]
```

## Known Issues

No known issues

### Contact

* [LinkedIn](https://www.linkedin.com/in/marcdomain)
* [GitHub](https://www.github.com/marcdomain)
* [Website](https://www.marcdomain.dev)

### If you would like to buy me coffee ☕️ 😍

https://www.buymeacoffee.com/marcdomain
