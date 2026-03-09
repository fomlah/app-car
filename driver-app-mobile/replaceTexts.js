const fs = require('fs');
const path = require('path');

const projectRoot = 'c:\\Users\\king_\\OneDrive\\Desktop\\app-car\\driver-app-mobile\\src';

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir(projectRoot, (filePath) => {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let hasChanges = false;

        // Ignore the custom components themselves
        if (filePath.includes('CustomText.tsx') || filePath.includes('CustomTextInput.tsx')) return;

        // Check if Text or TextInput are imported from react-native
        const rnImportRegex = /import\s+{([^}]*)}\s+from\s+['"]react-native['"];/g;

        content = content.replace(rnImportRegex, (match, importsStr) => {
            let imports = importsStr.split(',').map(i => i.trim());

            const hasText = imports.includes('Text');
            const hasTextInput = imports.includes('TextInput');

            if (!hasText && !hasTextInput) return match;
            hasChanges = true;

            // Remove Text and TextInput from react-native imports
            const newImports = imports.filter(i => i !== 'Text' && i !== 'TextInput');

            let res = '';
            if (newImports.length > 0) {
                res += `import { ${newImports.join(', ')} } from 'react-native';\n`;
            }

            // Calculate relative path to components folder
            const dirPath = path.dirname(filePath);
            const componentsDir = path.join(projectRoot, 'components');
            let relPath = path.relative(dirPath, componentsDir).replace(/\\/g, '/');
            if (!relPath.startsWith('.')) relPath = './' + relPath;

            if (hasText) {
                res += `import Text from '${relPath}/CustomText';\n`;
            }
            if (hasTextInput) {
                res += `import TextInput from '${relPath}/CustomTextInput';\n`;
            }

            return res;
        });

        if (hasChanges) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Updated:', filePath);
        }
    }
});
