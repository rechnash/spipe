const axios = require('axios')

let $e = process.env,
    $g = global;

async function setupProxyList () {

    return new Promise((resolve, reject) => {

        console.log('   ...fetching plist.')
        
        axios({

            method: 'get',
            url: $e.RSOCK_PLIST_URL,
        
        }).then(res => {
            
            console.log('   - plist fetched.')

            let toarr = res.data.split('\n')

            let proxylist = $g.proxyList = toarr.filter(ps => {
                return !ps.includes($e.PROXY_SERVER_GROUP)
            })

            let proxylistsv = toarr.filter(ps => {
                return ps.includes($e.PROXY_SERVER_GROUP)
            })

            $g.util.shuffleArray(proxylist)
            $g.util.shuffleArray(proxylistsv)

            $g.proxyList = proxylist;
            $g.proxyListSV = proxylistsv;

            resolve(true)

        }).catch(err => {
            
            console.log('   - plist rejected.')
            console.error(err)

            throw reject(err)
        })
    })
}

module.exports = setupProxyList;