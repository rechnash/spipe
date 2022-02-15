require("dotenv").config()
require('./util.js').setup()
require('./config.js').setup()
require('./helpers.js').setup()
require('./api/index.js').setup()

const logger = require('morgan')
const cors = require("cors")
const express = require("express")
const cookieParser = require('cookie-parser')
const basicAuth = require('express-basic-auth')
const router = require('./router.js')
const { config, logPort } = require('./config.js')

// def app
let app,
    $e = process.env,
    $g = global,
    $c = config;

// inits
setapp()

// initializator function
async function setapp () {

    console.log('\n   * Starting S-PIPE',
            '"' + $e.NODE_ENV + '"', '\n')

    await $g.setupProxyList()
    
    console.log('   - global.proxyList', $g.proxyList)
    console.log('   - global.proxyListSV', $g.proxyListSV, '\n')

    $g.setupAccountsMap()
    
    console.log('   - global.accountsMap', $g.accountsMap, '\n')
    
    // init app instance
    app = express();

    // declare some setttings
    app.set('trust proxy', true)

    // global cors middleare
    app.use(cors())

    // other stanard middles
    app.use(logger('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cookieParser())

    // service access token auth middleware
    // auth btw server > server...
    // Stripe spipe wrapper Rest API with ip rotation
    app.use('/service', 
            basicAuth($c.authData), 
                    router)

    // Stripe Native API proxy with ip rotation
    app.use('/proxy', 
                basicAuth($c.authData), 
                    $g.proxyNativeControl)

    app.get('/', (req, res) => {
        res.status(200)
                .send('OK')
                    .end()
    })

    //Start the server by listening on a port
    app.listen(config.port, port => {

        console.log('   ...app was succesfully setup!\n')

        if ($e.NODE_ENV === 'deployment') {
            if ($e.DEP_LOG === 'false') {
                console.log = (...args) => {}
            }
        }

        logPort(config.port)(port)
    })
}
