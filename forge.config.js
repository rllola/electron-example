const fs = require('fs')
const path = require('path')

module.exports = {
  hooks: {
    packageAfterPrune: async (forgeConfig, buildPath, electronVersion, platform, arch) => {
      if (platform === 'darwin') {
        console.log("We need to remove the problematic link file on macOS")
        console.log(`Build path ${buildPath}`)
        // maybe we can remove this ?
        fs.unlinkSync(path.join(buildPath, 'node_modules/macos-alias/build/node_gyp_bins/python3'))
      }
    }
  },
  makers: [
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          maintainer: 'Lola Rigaut-Luczak <lola@update.rocks>',
          homepage: 'https://update.rocks'
      }
    }
  },
  {
    name: '@electron-forge/maker-dmg'
  },
  {
    name: '@electron-forge/maker-zip',
    platforms: [
      'darwin'
    ]
  },
  {
    name: '@electron-forge/maker-squirrel',
    config: {
      name: 'electron_example',
      certificateFile: './example-electron.pfx',
      'certificatePassword': 'Amsterdam'
    }
  }],
  packagerConfig: {
    asar: true,
    osxSign: true,
    osxNotarize: {
      appleId: process.env['APPLE_ID'],
      appleIdPassword: process.env['APPLE_ID_PASSWORD'],
      ascProvider: process.env['APPLE_TEAM_ID']
    }
  },
  publishers : [{
    name: '@electron-forge/publisher-github',
    config: {
      repository: {
        owner: 'rllola',
        name: 'electron-example'
      }
    }
  }]
}
