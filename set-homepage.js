const fs = require('fs');
const mode = process.argv[2]; // 'dev' or 'prod'
const packageJsonPath = './package.json';
let packageJson = JSON.parse(fs.readFileSync(packageJsonPath));

if (mode === 'dev') {
  packageJson.homepage = ".";
} else if (mode === 'prod') {
  packageJson.homepage = "https://ubaidillahfakhrul.github.io/my-portfolio"; 
}

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log(`Set homepage to: ${packageJson.homepage}`);