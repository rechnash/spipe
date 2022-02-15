const Chance = require('chance')
const UserAgent = require('user-agents')

let $e = process.env,
    $g = global;

function pickOneProxy (svOrUsual) {
    
    let chance = new Chance();

    if (svOrUsual === 'server') {
        return returnServerProxy()
    } 

    if (svOrUsual === 'usual') {
        return returnUsualProxy()
    }

    function returnServerProxy () {
        
        let $pxurl,
            $plist = $g.proxyListSV;
       
        if ($e.DEP_MODE === 'test') {
            $pxurl = $plist[$e.PROXY_TEST_SV_INDEX];
            return `http://${$e.RSOCK_USER}:${$e.RSOCK_PASS}@${$pxurl}`
        } else {
            $pxurl = chance.pickone($plist);
            return `http://${$e.RSOCK_USER}:${$e.RSOCK_PASS}@${$pxurl}`
        }
    }

    function returnUsualProxy () {
        
        let $pxurl,
            $plist = $g.proxyList;

        if ($e.DEP_MODE === 'test') {
            $pxurl = $plist[$e.PROXY_TEST_INDEX];
            return `http://${$e.RSOCK_USER}:${$e.RSOCK_PASS}@${$pxurl}`
        } else {
            $pxurl = chance.pickone($plist);
            return `http://${$e.RSOCK_USER}:${$e.RSOCK_PASS}@${$pxurl}`
        }
    }
}

function pickOneSkey (skOrPk) {
    
    let chance = new Chance(),
        sacc = chance.pickone($g.accountsMap);

    if (skOrPk === 'both') {
        return {
            sk: returnSk(),
            pk: returnPk()
        }
    }

    if (skOrPk === 'sk') {
        return returnSk()
    }

    if (skOrPk === 'pk') {
        return returnPk()
    }

    function returnSk() {
        if ($e.DEP_MODE === 'test') {
            return $e.STRIPE_TEST_SK
        } else {
            return sacc.sk
        }
    }

    function returnPk () {
        if ($e.DEP_MODE === 'test') {
            return $e.STRIPE_TEST_PK
        } else {
            return sacc.pk
        }
    }
}

function pickOneUA (svOrClt) {

    if (svOrClt === 'server') {
        return returnServerUA()
    }

    if (svOrClt === 'front') {
        return returnFrontUA()
    }

    function returnFrontUA () {
        if ($e.DEP_MODE === 'test') {
            return $e.UA_FRONT_TEST
        } else {
            return new UserAgent();
        }
    }

    function returnServerUA () {
        if ($e.DEP_MODE === 'test') {
            return $e.UA_SERVER_TEST
        } else {
            return $e.UA_SERVER_LIVE
        }
    }
}

const api = {

    // initializing methods
    setupProxyList: require('./setupProxyList.js'),
    setupAccountsMap: require('./setupAccountsMap.js'),

    // on demmand methods
    pickOneProxy,
    pickOneSkey,
    pickOneUA,
    genBicoData: require('./genBicoData.js'),
    parseCheckError: require('./parseCheckError.js'),
    
    // controls & functions
    proxyNativeControl: require('./proxyNativeControl.js')
}

module.exports = {
    setup () {
        Object.assign(global, api)
    }
}