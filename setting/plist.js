let $e = process.env;

const plist = {

    live: {

        client: 'proxyflow.io (BR rotating)',
                
        server: [
            '107.158.232.252:60099',
            '107.158.232.253:60099',
            '107.158.232.254:60099'
        ]
    },

    test: {
        
        server: [
            '213.156.143.163:1490'
        ],

        client: [
            '104.148.115.77:60099',
            '104.148.115.81:60099',
            '104.148.115.102:60099',
            '104.148.115.107:60099',
            '104.148.115.108:60099',
            '104.148.115.110:60099'
        ]
    }
}

if ($e.DEP_MODE === 'live') {
    module.exports = { core: plist, ...plist.live }
}

if ($e.DEP_MODE === 'test') {
    module.exports = { core: plist, ...plist.test }
}