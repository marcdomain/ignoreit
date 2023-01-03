const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const projectWorkspace = vscode.workspace.workspaceFolders[0].uri.toString().split(':')[1]
  .replace(/%20/g, '\ ')
  .replace(/\/.*\/Users/, '///Users');

const workbenchConfig = vscode.workspace.getConfiguration('ignoreit');
const ignoreItArray = workbenchConfig.get('array').map(v => v.replace(/^(\*?)+\/|\/(\*?)+|\.\//g, ''));

exports.extension = async () => {
  try {
    const workspace = fs.readdirSync(projectWorkspace);

    if (workspace.find(f => f === '.git')) {
      const filesToIgnore = workspace.filter(f => ignoreItArray.indexOf(f) !== -1);

      if(filesToIgnore.length) {
        if (filesToIgnore.find(f => f === '.env')) {
          const envContent = fs.readFileSync(`${projectWorkspace}/.env`, 'utf8');
          const envContentString = (envContent.toString()).replace(/[=].*/g, '=');

          if (workspace.find(f => f === '.env.example')) {
            const envContentArray = envContentString.split('\n').filter(Boolean);
            const envExample = fs.readFileSync(`${projectWorkspace}/.env.example`, 'utf8').split('\n').filter(Boolean);

            if (envContentArray.filter(v => envExample.indexOf(v) === -1).length) {
              fs.writeFileSync(`${projectWorkspace}/.env.example`, envContentString);
            }
          }
          else fs.writeFileSync(`${projectWorkspace}/.env.example`, envContentString);
        }
        if (workspace.find(f => f === '.gitignore')) {
          const gitignoreContent = fs.readFileSync(`${projectWorkspace}/.gitignore`, 'utf8');
          const gitIgnoreArray = gitignoreContent
            .toString()
            .split('\n')
            .filter(Boolean)
            .map(v => v.replace(/^(\*?)+\/|\/(\*?)+$/g, ''));

          filesToIgnore.filter(v => gitIgnoreArray.indexOf(v) === -1)
            .forEach(file => {
              fs.appendFileSync(`${projectWorkspace}/.gitignore`, '\n' + file);
              vscode.window.showInformationMessage(`${file} added to .gitignore`);
            });
        }
        if (workspace.indexOf('.gitignore') === -1) {
          fs.writeFileSync(path.join(projectWorkspace, '.gitignore'), filesToIgnore.join('\n'));
          vscode.window.showInformationMessage(`${filesToIgnore.join(', ')} added to .gitignore`);
        }
      }
    }
  } catch (error) {
    return vscode.window.showErrorMessage(`Error occurred: ${error}`);
  }
}
