const assignKey = (query) => {
    
    let obj = {}
    
    obj[config.apiKeyName] = config.apiKeyValue
    
    return Object.assign(query, obj)
}

const logPort = (port) => {
    return () => {
        return console.log(`[\x1b[34mSERVER\x1b[37m] Listening on port: \x1b[36m${port} 🤖 \x1b[37m`)
    }
}

const config = {
    apiUrl: process.env.API_URL,
    apiKeyName: process.env.API_KEY_NAME,
    apiKeyValue: process.env.API_KEY_VALUE ,
    accessKey: process.env.ACCESS_KEY,
    stripeMode: process.env.STRIPE_MODE,
    stripeTestSK: process.env.STRIPE_TEST_SK,
    stripeLiveSK: process.env.STRIPE_LIVE_SK,
    port: process.env.PORT || 3000,
    assignKey: assignKey
}

module.exports = {
    config,
    assignKey,
    logPort
}
