const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const micromatch = require('micromatch');

const projectWorkspace = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
const workbenchConfig = vscode.workspace.getConfiguration('ignoreit');
const ignoreItArray = workbenchConfig.get('array') || []
const updateEnvExample = workbenchConfig.get('updateEnvExample');

exports.extension = async () => {
  try {
    if (!projectWorkspace) {
      vscode.window.showErrorMessage('No workspace folder found');
      return;
    }

    const workspace = fs.readdirSync(projectWorkspace); // top-level files & folders
    if (!workspace.includes('.git')) return;

    // ✅ Update .env.example if needed
    if (
      ignoreItArray.includes('.env') &&
      workspace.includes('.env') &&
      updateEnvExample
    ) {
      const envPath = path.join(projectWorkspace, '.env');
      const envExamplePath = path.join(projectWorkspace, '.env.example');

      const envContent = fs.readFileSync(envPath, 'utf8');
      const envContentString = envContent.replace(/[=].*/g, '=');

      if (fs.existsSync(envExamplePath)) {
        const envExample = fs.readFileSync(envExamplePath, 'utf8').split('\n').filter(Boolean);
        const envContentArray = envContentString.split('\n').filter(Boolean);

        const isDifferent = envContentArray.some(line => !envExample.includes(line));
        if (isDifferent) {
          fs.writeFileSync(envExamplePath, envContentString);
        }
      } else {
        fs.writeFileSync(envExamplePath, envContentString);
      }
    }

    // ✅ Find which patterns match at least one file
    const matchedPatterns = ignoreItArray.filter(pattern =>
      workspace.some(file => micromatch.isMatch(file, pattern))
    );

    if (!matchedPatterns.length) return;

    const gitignorePath = path.join(projectWorkspace, '.gitignore');
    const gitignoreExists = workspace.includes('.gitignore');
    let existingGitignorePatterns = [];

    if (gitignoreExists) {
      const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
      existingGitignorePatterns = gitignoreContent
        .split('\n')
        .map(line => line.trim())
        .filter(line => line && !line.startsWith('#'))
        .map(line => line.split('#')[0].trim());
    }

    // ✅ Filter patterns that are not already in .gitignore
    const newPatternsToAdd = matchedPatterns.filter(
      pattern => !micromatch.any(pattern, existingGitignorePatterns)
    );


    if (!newPatternsToAdd.length) return;

    if (!gitignoreExists) {
      fs.writeFileSync(gitignorePath, newPatternsToAdd.join('\n'));
      vscode.window.showInformationMessage(`${newPatternsToAdd.join(', ')} added to .gitignore`);
    } else {
      const appendContent = '\n' + newPatternsToAdd.join('\n');
      fs.appendFileSync(gitignorePath, appendContent);
      vscode.window.showInformationMessage(`${newPatternsToAdd.join(', ')} added to .gitignore`);
    }

  } catch (error) {
    return vscode.window.showErrorMessage(`Error occurred: ${error.message}`);
  }
}
