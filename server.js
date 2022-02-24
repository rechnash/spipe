require("dotenv").config()
require('./util.js').setup()
require('./setting/index.js').setup()
require('./helpers.js').setup()
require('./api/index.js').setup()

const logger = require('morgan')
const cors = require("cors")
const express = require("express")
const cookieParser = require('cookie-parser')
const basicAuth = require('express-basic-auth')
const router = require('./router.js')

// def app
let app,
    $e = process.env,
    $g = global,
    $c = $g.confs,
    $u = $g.util,
    $emap = $g.emap,
    $plist = $g.plist;

// inits
setapp()

// initializator function
async function setapp () {

    console.log('\n   * Starting S-PIPE \n')

    console.log('   - $e.NODE_ENV', `"${$e.NODE_ENV}"`)
    console.log('   - $e.DEP_MODE', `"${$e.DEP_MODE}"`)
    console.log('   - $c.delays.name', `"${$c.delays.name}"`, '\n')

    console.log('   - $plist.client', $plist.client)
    console.log('\n   - $plist.server', 
        $plist.server, '\n', 
        `       ...expects reffered '${$e.NODE_ENV}' proxy ip.`, '\n')
    
    
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
            basicAuth($c.auth),
            serviceDelayMiddle, 
                router)

    // Stripe Native API proxy with ip rotation
    app.use('/proxy', 
                basicAuth($c.auth), 
                    $g.proxyNativeControl)

    app.get('/', (req, res) => {
        res.status(200)
                .send('OK')
                    .end()
    })

    async function serviceDelayMiddle (req, res, next) {
        
        let $dsc = $c.delays.greq;
        
        console.log('   ...running serviceDelayMiddle()')
        console.log(`   ...awaiting $c.delays.greq`, $dsc)
        
        await new Promise(resolve => setTimeout(resolve, $dsc))
        
        next();
    }

    //Start the server by listening on a port
    app.listen($c.port, port => {

        console.log('   ...app was succesfully setup!\n')

        if ($e.NODE_ENV === 'deployment') {
            if ($e.DEP_LOG === 'false') {
                console.log = (...args) => {}
            }
        }

        $u.logPort($c.port)(port)
    })
}