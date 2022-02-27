let $e = process.env;

const plist = {

    live: {

        client: 'proxyflow.io - BR rotating)',
                
        server: [
            '104.129.245.134:1490',
            '104.129.245.133:1490',
            '104.129.245.132:1490'
        ]
    },

    test: {
        
        server: [
            '213.156.143.163:1490'
        ],

        client: [
            '196.242.89.131:1490',
            '104.129.245.131:1490',
            '104.129.245.160:1490'
        ]
    }
}

if ($e.DEP_MODE === 'live') {
    module.exports = { core: plist, ...plist.live }
}

if ($e.DEP_MODE === 'test') {
    module.exports = { core: plist, ...plist.test }
}