const vscode = require('vscode');
const ignoreItExtension = require('./src');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('activeTextEditor', vscode.window.activeTextEditor.document.fileName)

	let disposable = vscode.commands.registerCommand('extension.ignore_it', function () {
    ignoreItExtension();
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
