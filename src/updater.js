const { autoUpdater, dialog } = require('electron')
const axios = require('axios').default
const APP_VERSION = require('../package.json').version
const log = require('log-to-file')
const https = require('https')
const fs = require('fs')
const os = require('os')
const path = require('path')

const AUTO_UPDATE_URL = 'https://api.update.rocks/update/github.com/rllola/electron-example/stable/' + process.platform + '/' + APP_VERSION

function init () {
  if (process.platform === 'linux') {
    log('Auto updates not available on linux just notify', 'electron-example.log')
    initLinux()
  } else {
    initDarwinWin32()
  }
}

function initDarwinWin32 () {
  autoUpdater.on(
    'error',
    (err) => log(`Update error: ${err.message}`, 'electron-example.log'))

  autoUpdater.on(
    'checking-for-update',
    () => log('Checking for update', 'electron-example.log'))

  autoUpdater.on(
    'update-available',
    () => log('Update available', 'electron-example.log'))

  autoUpdater.on(
    'update-not-available',
    () => log('No update available', 'electron-example.log'))

  // Ask the user if update is available
  autoUpdater.on(
    'update-downloaded',
    (event, releaseNotes, releaseName) => {
      log('Update downloaded', 'electron-example.log')
      dialog.showMessageBox({
        type: 'question',
        buttons: ['Update', 'Cancel'],
        defaultId: 0,
        message: `Version ${releaseName} is available, do you want to install it now?`,
        title: 'Update available'
      }, response => {
        if (response === 0) {
          autoUpdater.quitAndInstall()
        }
      })
    }
  )

  autoUpdater.setFeedURL(AUTO_UPDATE_URL)
  autoUpdater.checkForUpdates()
}

async function initLinux() {
  const response = await axios.get(AUTO_UPDATE_URL)
  log(JSON.stringify(response.data), 'electron-example.log')
  if (response.data.version && response.data.version == APP_VERSION) {
    log('Application up to date', 'electron-example.log')
    return
  }

  const releaseName = response.data.name

  const result = await dialog.showMessageBox({
    type: 'question',
    buttons: ['Update', 'Cancel'],
    defaultId: 0,
    message: `Version ${releaseName} is available, do you want to install it now?`,
    title: 'Update available'
  })

  if (result.response === 0) {
    console.log('Download update')
    const file = fs.createWriteStream(path.join(os.homedir(), "Application", "UpdateRocks", "electron-example_amd64.deb"))
    https.get(response.data.url, function (response) {
      console.log("writting to file")
      response.pipe(file)
      file.on("finish", () => {
        dialog.showMessageBoxSync({
          message: `The updated has been downloaded and is ready to be installed`,
          title: 'Update downloaded'
        })
      })
    })
  }

}

module.exports = {
  init
}
