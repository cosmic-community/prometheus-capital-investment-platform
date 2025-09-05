const fs = require('fs');
const path = require('path');
const glob = require('glob');

const scriptTag = '<script src="/dashboard-console-capture.js"></script>';

function injectScript(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes('dashboard-console-capture.js')) {
      return;
    }
    
    const headCloseIndex = content.indexOf('</head>');
    if (headCloseIndex !== -1) {
      const before = content.substring(0, headCloseIndex);
      const after = content.substring(headCloseIndex);
      content = before + '  ' + scriptTag + '\n' + after;
      
      fs.writeFileSync(filePath, content);
      console.log(`Injected console capture script into: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

const htmlFiles = glob.sync('.next/**/*.html', { absolute: true });

if (htmlFiles.length === 0) {
  console.log('No HTML files found in .next directory');
} else {
  console.log(`Processing ${htmlFiles.length} HTML files...`);
  htmlFiles.forEach(injectScript);
  console.log('Console capture script injection complete');
}