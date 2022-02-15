let $e = process.env;

const passDeclineCodes = [
    'transaction_not_allowed',
    'do_not_honor',
    'incorrect_zip',
    'insufficient_funds',
    'card_velocity_exceeded',
    'account_country_invalid_address',
    'amount_too_small',
    'invalid_amount',
    'balance_insufficient',
    'email_invalid',
    'incorrect_address',
    'postal_code_invalid'
]

const maybeDeclineCodes = [
    'currency_not_supported',
    'offline_pin_required',
    'online_or_offline_pin_required',
    'security_violation',
    'revocation_of_authorization',
    'approve_with_id',
    'authentication_required',
    'amount_too_small',
    'withdrawal_count_limit_exceeded',
    'amount_too_large',
    'generic_decline'
]

const escapeErrorCodes = [
    'invalid_request_error',
    'invalid_charge_amount',
    'country_unsupported',
    'country_code_invalid',
    'duplicate_transaction',
    'try_again_later',
    'api_key_expired',
    'charge_already_captured',
    'charge_exceeds_source_limit',
    'idempotency_key_in_use',
    'invalid_source_usage',
    'livemode_mismatch',
    'order_creation_failed',
    'parameter_invalid_empty',
    'parameter_invalid_integer',
    'parameter_invalid_string_blank',
    'parameter_missing',
    'parameter_unknown',
    'parameters_exclusive',
    'platform_api_key_expired',
    'processing_error',
    'rate_limit',
    'resource_missing',
    'sensitive_data_access_expired',
    'testmode_charges_only',
    'tls_version_unsupported',
    'token_already_used',
    'token_in_use',
    'url_invalid',
    'lock_timeout'
]

const delaySetups = {

    slowest: {
        minCharge: 4900,
        maxCharge: 7900,
        minRefund: (1000 * 60) * 5.9, // 3min
        maxRefund: (1000 * 60) * 13.3 // 9min
    },

    slower: {
        minCharge: 3500,
        maxCharge: 6500,
        minRefund: (1000 * 60) * 4.5, // 3min
        maxRefund: (1000 * 60) * 11.5 // 9min
    },
    
    slow: {
        minCharge: 2500,
        maxCharge: 5000,
        minRefund: (1000 * 60) * 3, // 3min
        maxRefund: (1000 * 60) * 9 // 9min
    },

    medium: {
        minCharge: 1000,
        maxCharge: 1500,
        minRefund: (1000 * 60) * 2, // 1min
        maxRefund: (1000 * 60) * 5 // 2min
    },

    fast: {
        minCharge: 500,
        maxCharge: 1000,
        minRefund: (1000 * 60) * 1, // 1min
        maxRefund: (1000 * 60) * 2 // 2min
    }
}

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

const authData = { 
    users: { 'ACCESS_KEY': $e.ACCESS_KEY }
}

const config = {
    apiUrl:          $e.API_URL,
    accessKey:       $e.ACCESS_KEY,
    stripeMode:      $e.STRIPE_MODE,
    stripeTestSK:    $e.STRIPE_TEST_SK,
    stripeLiveSK:    $e.STRIPE_LIVE_SK,
    minCashout:      Number($e.MIN_CASHOUT),
    maxCashout:      Number($e.MAX_CASHOUT),
    delaySetTest:    delaySetups[$e.DELAY_SET_TEST],
    delaySetLive:    delaySetups[$e.DELAY_SET_LIVE],
    refundChance:    $e.REFUND_CHANCE,
    addspChance:     $e.ADDR_SP_CHANCE,
    checkFlowChance: $e.CHECK_FLV_CHANCE,
    port:            $e.PORT || 3000,
    assignKey:       assignKey,
    authData
}

module.exports = {
    
    setup () {

        global.$emap = {};

        Object.assign(global.$emap, {
            // token or charge
            // error dont includes of those
            // its full die
            // -> neutral = try again
            // faz nada...
            passDeclineCodes,
            maybeDeclineCodes,
            escapeErrorCodes
        })
    },
    
    config,
    assignKey,
    logPort
}