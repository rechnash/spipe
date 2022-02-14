const axios = require('axios')
const Chance = require('chance')
const UserAgent = require('user-agents')
const socksProxyAgent = require('socks-proxy-agent')
const httpProxyAgent = require('http-proxy-agent')
const httpsProxyAgent = require('https-proxy-agent')

async function setupProxyList () {

    return new Promise((resolve, reject) => {

        console.log('   ...fetching plist.')

        let pes = process.env;
        
        axios({
        
            url: pes.RSOCK_PLIST_URL,
            mathod: 'get'
        
        }).then(res => {
            
            console.log('   - plist fetched.')

            let toarr = res.data.split('\n')

            const proxylist = global.proxyList = toarr.filter(ps => {
                return !ps.includes(pes.PROXY_SERVER_GROUP)
            })

            const proxylistsv = toarr.filter(ps => {
                return ps.includes(pes.PROXY_SERVER_GROUP)
            })

            global.proxyList = proxylist;
            global.proxyListSV = proxylistsv;

            resolve()

        }).catch(err => {
            
            console.log('   - plist rejected.')
            console.error(err)

            resolve()
        })
    })
}

function setupAccountsMap () {

    console.log('   ...setting global.accountsMap.')
    
    let pes = process.env;

    let accKeys = Object.keys(pes).filter($k => {
        return $k.includes('STRIPE_LIVE_SK_')
    })

    let accs = accKeys.map(($k, index) => {
        return {
            sk: pes[$k],
            pk: pes['STRIPE_LIVE_PK_' + index]
        }
    })

    global.accountsMap = accs;
}

function pickOneProxy (reqURL) {
    
    let chance = new Chance(),
        pes = process.env;

    if (reqURL.includes('/charge')) {
        
        let $pxurl,
            $plist = global.proxyListSV;
       
        if (pes.DEP_MODE === 'test') {
            $pxurl = $plist[pes.PROXY_TEST_SV_INDEX];
            return `http://${pes.RSOCK_USER}:${pes.RSOCK_PASS}@${$pxurl}`
        } else {
            $pxurl = chance.pickone($plist);
            return `http://${pes.RSOCK_USER}:${pes.RSOCK_PASS}@${$pxurl}`
        }

    } else {

        let $pxurl,
            $plist = global.proxyList;

        if (pes.DEP_MODE === 'test') {
            $pxurl = $plist[pes.PROXY_TEST_INDEX];
            return `http://${pes.RSOCK_USER}:${pes.RSOCK_PASS}@${$pxurl}`
        } else {
            $pxurl = chance.pickone($plist);
            return `http://${pes.RSOCK_USER}:${pes.RSOCK_PASS}@${$pxurl}`
        }
    }
}

function pickOneSkey (reqURL) {
    
    let pes = process.env,
        chance = new Chance();

    let sacc = chance.pickone(global.accountsMap);

    if (reqURL.includes('/tokens')) {

        if (pes.DEP_MODE === 'test') {
            return pes.STRIPE_TEST_PK
        } else {
            return sacc.pk
        }
    
    } else {

        if (pes.DEP_MODE === 'test') {
            return pes.STRIPE_TEST_SK
        } else {
            return sacc.sk
        }

    }
}

function pickOneUA (reqURL) {

    let pes = process.env;

    if (reqURL.includes('/charges')) {

        if (pes.DEP_MODE === 'test') {
            return pes.UA_SERVER_TEST
        } else {
            return pes.UA_SERVER_LIVE
        }

    } else {

        if (pes.DEP_MODE === 'test') {
            return pes.UA_FRONT_TEST
        } else {
            return new UserAgent();
        }
    }
}

global.setupProxyList = setupProxyList;
global.setupAccountsMap = setupAccountsMap;
global.pickOneProxy = pickOneProxy;
global.pickOneSkey = pickOneSkey;
global.pickOneUA = pickOneUA;