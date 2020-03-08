const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('activeTextEditor', vscode.window.activeTextEditor.document.fileName)

	let disposable = vscode.commands.registerCommand('extension.ignore_it', function () {
		const projectWorkspace = vscode.workspace.workspaceFolders[0].uri.toString().split(':')[1];
		const workbenchConfig = vscode.workspace.getConfiguration('ignore_it')
		const ignoreItArray = workbenchConfig.get('array')
    const gitIgnoreContent = ignoreItArray

    fs.readdir(projectWorkspace, (err, files) => {
      if(err) {
        return console.log(`Unable to scan workspace: ${err}`);
      }

			const filesToIgnore = files.filter(file => gitIgnoreContent.indexOf(file) !== -1)

      if(filesToIgnore.length) {
        if(files.find(file => file === '.gitignore')) {
          try {
            const filesAlreadyIgnored = fs.readFileSync(`${projectWorkspace}/.gitignore`, 'utf8');
            const filesInitiallyIgnored = filesAlreadyIgnored.toString().split('\n').filter(Boolean);

						console.log('filesToIgnore', filesToIgnore)
						console.log('filesInitiallyIgnored', filesInitiallyIgnored)
            filesToIgnore.forEach((file) => {
							if (filesInitiallyIgnored.indexOf(file) === -1) {
								fs.appendFile(`${projectWorkspace}/.gitignore`, '\n' + file, err => {
									if(err) {
										return vscode.window.showErrorMessage(`Error occurred: ${err}`);
									}
								})
							}
						})
          } catch(e) {
              console.log('Error:', e.stack);
          }
        } else {
          fs.writeFile(path.join(projectWorkspace, '.gitignore'), filesToIgnore.join('\n'), err => {
            //handling error
            if(err) {
              return vscode.window.showErrorMessage('Failed to create .gitinore file');
            }
            // Display a success message box to the user
            vscode.window.showInformationMessage(`${filesToIgnore.join(', ')} have been added to .gitignore`);
          });
        }
      } else {
        console.log('ignore_it extension has nothing to ignore')
      }
    })
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
