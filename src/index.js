const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

const projectWorkspace = vscode.workspace.workspaceFolders[0].uri.toString().split(':')[1];
const workbenchConfig = vscode.workspace.getConfiguration('ignoreit')
const ignoreItArray = workbenchConfig.get('array');
const gitIgnoreContent = ignoreItArray;

const extension = () => {
  fs.readdir(projectWorkspace, (err, files) => {
    if(err) {
      return console.log(`Unable to scan workspace: ${err}`);
    }

    if (files.find(file => file === '.git')) {
      const filesToIgnore = files.filter(file => gitIgnoreContent.indexOf(file) !== -1)

      if(filesToIgnore.length) {
        if (filesToIgnore.find(file => file === '.env')) {
          const envContent = fs.readFileSync(`${projectWorkspace}/.env`, 'utf8');
          const envContentArray = (envContent.toString() + '\n').replace(/[^=]*\s/g, '\n');

          try{
            fs.writeFileSync(`${projectWorkspace}/.env.example`, envContentArray);
          } catch (e){
            console.log("Cannot write .env.example file: ", e);
          }
        }
        if(files.find(file => file === '.gitignore')) {
          try {
            const filesAlreadyIgnored = fs.readFileSync(`${projectWorkspace}/.gitignore`, 'utf8');
            const filesInitiallyIgnored = filesAlreadyIgnored.toString().split('\n').filter(Boolean);

            filesToIgnore.forEach((file) => {
              if (filesInitiallyIgnored.indexOf(file) === -1) {
                fs.appendFile(`${projectWorkspace}/.gitignore`, '\n' + file, err => {
                  if(err) {
                    return vscode.window.showErrorMessage(`Error occurred: ${err}`);
                  }
                  vscode.window.showInformationMessage(`${file} added to .gitignore`);
                })
              }
            })
          } catch(e) {
              console.log('Error:', e.stack);
          }
        } else {
          fs.writeFile(path.join(projectWorkspace, '.gitignore'), filesToIgnore.join('\n'), err => {
            if(err) {
              return vscode.window.showErrorMessage('Failed to create .gitinore file');
            }
            vscode.window.showInformationMessage(`${filesToIgnore.join(', ')} added to .gitignore`);
          });
        }
      } else {
        return true;
      }
    } else {
      // vscode.window.showInformationMessage('This workspace is not a git repo');
      return true;
    }
  })
}

module.exports = extension;
