let $e = process.env;

const plist = {

    live: {

        client: 'proxyflow.io - BR rotating - profile: live)',
                
        server: [
            '213.156.143.163:1490'
        ]
    },

    test: {

        client: 'proxyflow.io - BR rotating - profile: test)',
        
        server: [
            '213.156.143.163:1490'
        ]

    }
}

if ($e.DEP_MODE === 'live') {
    module.exports = { core: plist, ...plist.live }
}

if ($e.DEP_MODE === 'test') {
    module.exports = { core: plist, ...plist.test }
}