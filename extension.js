const vscode = require('vscode');
const ignoreItExtension = require('./src');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const disposable = vscode.commands.registerCommand('extension.ignoreit', function () {
    ignoreItExtension()
	});

	const watcher = vscode.workspace.createFileSystemWatcher("**/*.{*}");

	watcher.onDidChange((uri) => {
		const uriArray = uri.toString().split('/');
		const fileChanged = uriArray[uriArray.length - 1];

		if (fileChanged === '.env.example') {
			return false;
		} else {
			ignoreItExtension()
		}
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(watcher);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
