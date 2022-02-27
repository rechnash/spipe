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
            let proxyflow = await getProxyFlow()
            return proxyflow.url;
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

    console.log('\n', '   ...running getProxyFlow()')
    
    try {

        let url;

        if ($e.PXYFLW_QUERY !== 'null') {
            url = `https://api.proxyflow.io/v1/proxy/random${$e.PXYFLW_QUERY}`
        } else {
            let rttParam = $e.PXYFLW_RTT === 'null' ? '' : `&maxRtt=${$e.PXYFLW_RTT}`;
            url = `https://api.proxyflow.io/v1/proxy/random?protocol=http&country=BR${rttParam}`
        }

        console.log('   - proxyflow URL:', url, '\n')

        let res = await request({
            url,
            json: true,
            rejectUnauthorized: false,
            headers: { 'Authorization': `Bearer ${$e.PXYFLW_KEY}`}
        })

        return res;

    } catch (err) {
        
        console.log('   ...fail at pickProxy() > getProxyFlow()');
        console.error('     * Error:', err)

        return null;
    }
}

module.exports = pickProxy;