const Chance = require('chance')
const request = require('request-promise')

let $e = process.env,
    $g = global,
    $plist = $g.plist.core;

async function pickProxy (svOrClt) {

    const chance = new Chance();
    
    if ($e.DEP_MODE == 'live') {
         
        if (svOrClt === 'client') {
            let proxyflow = await getProxyFlow()
            return proxyflow.url;
        }

        if (svOrClt === 'server') {
            return parseRsocks(chance
                        .pickone($plist.live.server))
        }
    }

    if ($e.DEP_MODE == 'test') {

        if (svOrClt === 'client') {
            return parseRsocks(chance
                        .pickone($plist.test.client))
        }

        if (svOrClt === 'server') {
            return parseRsocks(chance
                        .pickone($plist.test.server))
        }
    }


    function parseRsocks (proxy) {
        return `http://${$e.RSOCKS_USR}:${$e.RSOCKS_PSW}@${proxy}`
    }
}

async function getProxyFlow () {
    
    try {

        let res = await request({
            json: true,
            url: `https://api.proxyflow.io/v1/proxy/random?token=${$e.PXYFLW_KEY}&ssl=true&protocol=http&country=BR`,
            headers: { 'Keep-Alive' : 'true'}
        })

        return res;

    } catch (err) {
        
        console.log('   ...fail at pickProxy() > getProxyFlow()');
        console.error('     * Error:', err)

        return null;
    }
}

module.exports = pickProxy;