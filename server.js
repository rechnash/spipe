require("dotenv").config()
require('./apiDefine.js')

const cors = require("cors")
const express = require("express")
const request = require("request")
const exsProxy = require('express-http-proxy')
const basicAuth = require('express-basic-auth')

const { config, 
          assignKey, 
            logPort } = require("./config.js")

setapp()

async function setapp () {

    console.log('\n   * Starting S-PIPE', 
            '"' + process.env.NODE_ENV + '"', '\n')
    
    const app = express()

    await global.setupProxyList()
    
    console.log('   - global.proxyList', global.proxyList)
    console.log('   - global.proxyListSV', global.proxyListSV, '\n')

    global.setupAccountsMap()
    console.log('   - global.accountsMap', global.accountsMap, '\n')


    app.use(cors(),
            basicAuth({
                users: { 'ACCESS_KEY': config.accessKey }
                    })).use("/", async (req, res) => {
      
      // Pipe is through request, this will just redirect
      // everything from the api to your own server at localhost.
      // It will also pipe your queries in the url

      let $px = global.pickOneProxy(req.url),
          $ssk = global.pickOneSkey(req.url),
          $ua = global.pickOneUA(req.url);

      console.log('\n', '$px', $px)
      console.log('$ssk', $ssk)
      console.log('$ua', $ua, '\n')

      req.pipe(request({
          uri: config.apiUrl + req.url,
          proxy: $px,
          headers: {
            'Keep-Alive': 'true',
            'User-Agent': $ua,
            'Authorization': 'Bearer ' + $ssk
          }
      })).pipe(res, { end: true })

    })

    //Start the server by listening on a port
    app.listen(config.port, logPort(config.port))
}
