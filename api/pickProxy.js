const Chance = require('chance')
const request = require('request-promise')

let $e = process.env,
    $g = global,
    $plist = $g.plist;

function pickProxy (svOrClt) {

    const chance = new Chance();
    
    if (svOrClt === 'client') {
        return `http://${chance.pickone($plist.client)}`
    }

    if (svOrClt === 'server') {
        return `http://${chance.pickone($plist.server)}`
    }
}

module.exports = pickProxy;