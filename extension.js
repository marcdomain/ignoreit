const vscode = require('vscode');
const {extension} = require('./src');

/**
 * @param {vscode.ExtensionContext} context
 */
const activate = (context) => {
	const disposable = vscode.commands.registerCommand('extension.ignoreit', () => extension());
	const watcher = vscode.workspace.createFileSystemWatcher("**/*");

	watcher.onDidChange(uri => {
		const fileChanged = uri.toString().split('/').pop();

		if (!['.env.example', '.gitignore'].includes(fileChanged)) extension();
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(watcher);
}

const deactivate = () => {}

module.exports = {
	activate,
	deactivate
}
