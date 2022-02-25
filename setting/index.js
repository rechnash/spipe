const solveTextLists = require('./solveTextLists.js')
const solveStripeAcc = require('./solveStripeAcc.js')
const solveDelays = require('./solveDelays.js')

const $e = process.env,
      $g = global,
      $u = $g.util;

// -> inner Server > Server auth
const users = { 
    'ACCESS_KEY': '90K34K3049J309J4F390JF4390JF3094F00JF3JF309FJ' 
}

const userProxies = {
    user: 'EaiGalerinha',
    pass: 'cursoir3442'
}

const rateLimit = {
    max: Number($e.RATE_LIMIT_MAX),
    windowMs:  Number($e.RATE_LIMIT_MS) * 60 * 1000,
    message: 'Too many requests from this IP. Retry after ' + $e.RATE_LIMIT_MS + ' mins.',
    standardHeaders: true
}

let emap  = solveTextLists.emap,
    plist = solveTextLists.plist;

module.exports = {

    setup () {

        Object.assign(global, {
            // stripe error codes 
            // for handling on controls.js
            emap, 
            // proxy list settings
            plist, 
            // main settings
            confs: { 
                apiUrl:          'https://api.stripe.com/v1',
                auth:            { users },
                stripeAcc:       solveStripeAcc(),
                delays:          solveDelays(),
                port:            $e.PORT || 3000,
                accessKey:       $e.ACCESS_KEY,
                depMode:         $e.DEP_MODE,
                depLogs:         $e.DEP_LOG,
                minCashout:      Number($e.MIN_CASHOUT),
                maxCashout:      Number($e.MAX_CASHOUT),
                addspChance:     Number($e.ADDR_SP_CHANCE),
                checkFlvChance:  Number($e.CHECK_FLV_CHANCE),
                userProxies,
                rateLimit
            }
        })
    }
}