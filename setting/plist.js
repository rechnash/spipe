let $e = process.env;

const plist = {

    live: {

        client: 'gate2@proxyfuel.com:2000',
        
        server: [ 
            '157.52.155.35:60099',
                '157.52.155.44:60099',
                    '157.52.155.5:60099' ]
    },

    test: {

        client: [ 
            '172.85.98.46:60099',
                '172.85.98.51:60099',
                    '172.85.98.76:60099' ],

        server: [ '213.156.143.163:1490' ]
    }
}

if ($e.DEP_MODE === 'live') {
    module.exports = { core: plist, ...plist.live }
}

if ($e.DEP_MODE === 'test') {
    module.exports = { core: plist, ...plist.test }
}