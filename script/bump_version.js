const fs = require('fs')


const packageJSONPath = 'package.json'

const packageJSON = JSON.parse(fs.readFileSync(packageJSONPath, {encoding:'utf8'}))

let newVersion = packageJSON.version.split('.')
let patchVersion = parseInt(newVersion[2]) + 1
newVersion = `${newVersion[0]}.${newVersion[1]}.${patchVersion.toString()}`

console.log(`Bump version ${packageJSON.version} to ${newVersion}`)

packageJSON.version = newVersion

fs.writeFileSync(packageJSONPath, JSON.stringify(packageJSON, null, 2), {encoding:'utf8'})