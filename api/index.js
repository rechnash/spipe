const Chance = require('chance')
const UserAgent = require('user-agents')

let $e = process.env,
    $g = global,
    $c = $g.confs,
    $u = $g.util,
    $h = $g.helpers,
    $plist = $g.plist;

$g.clientPlistRotator = new $h.ListRotator($plist.client)

function pickHttpProxy (svOrClt) {
    
    const chance = new Chance();

    let proxy;

    // exceptional condition...
    // it's temp provision
    if ($e.DEP_MODE === 'live' &&
            svOrClt === 'client') {
        console.log('   ...picking rotating proxy from gate2.')
        let prot = $e.PXY_GATE_PROT, port;
        if (prot === 'socks5') port = '3000';
        if (prot === 'http' || 'https') port = '2000';
        else throw new Error('   * Invalid $e.PXY_GATE_PROT')
        return `${prot}://${$e.PXY_GATE_USER}:${$e.PXY_GATE_PASS}@gate2.proxyfuel.com:${port}`
    }

    // else...
    if (svOrClt === 'client') {
        console.log('   $g.clientPlistRotator.counter:', 
                        $g.clientPlistRotator.counter)
        proxy = $g.clientPlistRotator.roll();
    }

    if (svOrClt === 'server') {
        proxy = chance.pickone($plist.server)
    }

    return `http://${$c.userProxies.user}:${$c.userProxies.pass}@${proxy}`
}

function pickUserAgent (svOrClt) {

    if ($e.DEP_MODE === 'test') {
        if (svOrClt === 'client') return $e.UA_CLIENT_TEST
        if (svOrClt === 'server') return $e.UA_SERVER_TEST
    } 

    if ($e.DEP_MODE === 'live') {
        if (svOrClt === 'client') return new UserAgent().data.userAgent
        if (svOrClt === 'server') return $e.UA_SERVER_LIVE
    }
}

module.exports = {

    setup () {

        Object.assign(global, {
            pickHttpProxy,
            pickUserAgent,
            genBicoData: require('./genBicoData.js'),
            parseCheckError: require('./parseCheckError.js'),
            proxyNativeControl: require('./proxyNativeControl.js')
        })
    }
}