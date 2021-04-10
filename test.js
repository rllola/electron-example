const test = require('ava');
const axios = require('axios').default;
const APP_VERSION = require('./package.json').version
const FAKE_APP_VERSION = "0.0.1"
const AUTO_UPDATE_URL = 'https://api.update.rocks/update/github.com/rllola/electron-example/stable/'

test('test debian release', async t => {
    const response = await axios.get(AUTO_UPDATE_URL + 'linux/' + FAKE_APP_VERSION)
    console.log(response.data)
    t.is(response.data.name, `v${APP_VERSION}`)
    t.not(response.data.url, '', 'No release found')
});

test('test macOS release', async t => {
    const response = await axios.get(AUTO_UPDATE_URL + 'darwin/' + FAKE_APP_VERSION)
    console.log(response.data)
    t.is(response.data.name, `v${APP_VERSION}`)
    t.not(response.data.url, '', 'No release found')
});

test('test window release', async t => {
    const response = await axios.get(AUTO_UPDATE_URL + 'win32/' + FAKE_APP_VERSION)
    console.log(response.data)
    t.is(response.data.name, `v${APP_VERSION}`)
    t.not(response.data.url, '', 'No release found')
});