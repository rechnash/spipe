const fs = require('fs');

const $e = process.env,
      $g = global,
      $u = $g.util;
      
let emap   = {}, 
    plist  = {};

let emapFiles = [
    `maybeDeclineCodes`, 
    `passDeclineCodes`, 
    `escapeErrorCodes`
]

let plistFiles = [
    `liveClients`, 
    `liveServers`, 
    `testClients`, 
    `testServers`,
    'devServers'
]

emapFiles.forEach(fln => {
    emap[fln] = fs.readFileSync(
                    __dirname 
                    + `/emap/${fln}.txt`,
                    { encoding: 'utf8' })
                                .split('\n')
})

plistFiles.forEach(fln => {
    plist[fln] = fs.readFileSync(
                        __dirname 
                        + `/plist/${fln}.txt`,
                        { encoding: 'utf8' })
                                    .split('\n')
})

let $module = {
    emap,
    plist: {}
}

if ($e.DEP_MODE === 'test') {
    $module.plist = { 
            client: plist.testClients, 
            server: plist.testServers }
}

if ($e.DEP_MODE === 'live') {
    $module.plist = { 
            client: plist.liveClients, 
            server: plist.liveServers }
}

if ($e.NODE_ENV === 'development') {
    $module.plist.server = plist.devServers
}

$u.shuffleArray($module.plist.client)
$u.shuffleArray($module.plist.server)

module.exports = $module;