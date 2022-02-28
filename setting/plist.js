let $e = process.env;

const plist = {

    live: {

        client: [`${$e.PXYFUEL_USR}:${$e.PXYFUEL_PSW}@gate2.proxyfuel.com:2000`],
        
        server: [ 
            `${$e.RSOCKS_USR}:${$e.RSOCKS_PSW}@157.52.155.35:60099`,
                `${$e.RSOCKS_USR}:${$e.RSOCKS_PSW}@157.52.155.44:60099`,
                    `${$e.RSOCKS_USR}:${$e.RSOCKS_PSW}@157.52.155.5:60099` ]
    },


    test: {

        client: [ 
            `${$e.RSOCKS_USR}:${$e.RSOCKS_PSW}@172.85.98.46:60099`,
                `${$e.RSOCKS_USR}:${$e.RSOCKS_PSW}@172.85.98.51:60099`,
                    `${$e.RSOCKS_USR}:${$e.RSOCKS_PSW}@172.85.98.76:60099` ],

        server: [ `${$e.RSOCKS_USR}:${$e.RSOCKS_PSW}@213.156.143.163:1490` ]
    }
}

if ($e.DEP_MODE === 'live') {
    module.exports = { core: plist, ...plist.live }
}

if ($e.DEP_MODE === 'test') {
    module.exports = { core: plist, ...plist.test }
}