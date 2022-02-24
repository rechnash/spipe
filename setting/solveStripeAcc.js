let $e = process.env;

const stripeAcc = {

    name: 'doncart',
    domain: 'doncart.herokuapp.com',

    test: {
        sk: 'sk_test_51KUlU2A9qbwBh2e205hQiwJEwQPcPbZnPBnn1rHggAdigkFJhJSNzjhNWn840ykbtHz6y8h8qVPwQxqMujvbBYou00UDBq7k5s',
        pk: 'pk_test_51KUlU2A9qbwBh2e2O4SKlsr5xtqrhmWBu24n3EdMLtFj1JCU4mAWuzzAzrhOgfgsYLBn3zs6BIJxvXvVRqKNya3e00OA68b0Jn'
    },

    live: {
        sk: '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',
        pk: 'pk_live_51KUlU2A9qbwBh2e2FvCrXQ7eMmwOkS3Pi1QAILSTziulPsaJhCJIme163w93kjC1bqipv98zUK2U8ACn7hTw0RQB00gyBGJmFj'
    }
}

function solveStripeAcc () {
    if ($e.DEP_MODE === 'test') {
        return {
            name: stripeAcc.name,
            domain: stripeAcc.domain,
            ...stripeAcc.test
        }
    }

    if ($e.DEP_MODE === 'live') {
        return  {
            name: stripeAcc.name,
            domain: stripeAcc.domain,
            ...stripeAcc.live
        }
    }    
}

module.exports = solveStripeAcc;

