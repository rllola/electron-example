const fs = require('fs')

module.exports = {
  hooks: {
    packageAfterPrune: async (forgeConfig, buildPath, electronVersion, platform, arch) => {

      console.log(`platform : ${platform}`)
      console.log(`Build path ${buildPath}`)
      if (platform = 'darwin') {
        console.log("We are on macOS !")
        //fs.unlinkSync(path)
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
