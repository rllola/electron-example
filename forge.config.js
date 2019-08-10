module.exports = {
  "make_targets": {
    "win32": [
      "squirrel"
    ],
    "darwin": [
      "dmg",
      "zip"
    ],
    "linux": [
      "deb"
    ]
  },
  "electronPackagerConfig": {
    "asar": true,
    "osxSign": true,
    "osxNotarize": {
      "appleId": process.env['APPLE_ID'],
      "appleIdPassword": process.env['APPLE_ID_PASSWORD']
    }
  },
  "electronWinstallerConfig": {
    "name": "electron_example",
    "certificateFile": "./example-electron.pfx",
    "certificatePassword": process.env['CERTIFICATE_PASSWORD']
  },
  "electronInstallerDMG": {},
  "electronInstallerDebian": {},
  "electronInstallerRedhat": {},
  "github_repository": {
    "owner": "rllola",
    "name": "electron-example"
  },
  "windowsStoreConfig": {
    "packageName": "",
    "name": "electronexample"
  }
}
