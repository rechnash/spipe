let $e = process.env,
    $g = global;
    
function setupAccountsMap () {

    console.log('   ...setting global.accountsMap.')

    let accKeys = Object.keys($e).filter($k => {
        return $k.includes('STRIPE_LIVE_SK_')
    })

    let accs = accKeys.map(($k, index) => {
        return {
            sk: $e[$k],
            pk: $e['STRIPE_LIVE_PK_' + index]
        }
    })

    global.accountsMap = accs;
}

module.exports = setupAccountsMap;