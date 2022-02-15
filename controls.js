const request = require('request-promise')
const { config, logPort } = require("./config.js")

let $g = global,
    $h = $g.$h;

module.exports = {
    
    '/fastCheckout': {
        
        method: 'post',

        async handler (req, res) {

            console.log('   ...runing /fastCheckout', '\n')

            let $info = req.body;
                $info._cus = $g.genBicoData();

            const $skeys    = $g.pickOneSkey('both'),
                  $uaClient = $g.pickOneUA('front'),
                  $uaServer = $g.pickOneUA('server'),
                  $pxUsual  = $g.pickOneProxy('usual'),
                  $pxServer = $g.pickOneProxy('server');

            console.log(
                    '\n     => $sk',    $skeys.sk, 
                    '\n     => $pk',    $skeys.pk,     
                    '\n     => $uaClient', $uaClient,
                    '\n     => $uaServer', $uaServer,
                    '\n     => $pxUsual',  $pxUsual, 
                    '\n     => $pxServer', $pxServer, '\n')

            console.log('   $info._id:', $info._id)
            console.log('   $info._cus.name:', $info._cus.name, '\n')

            // main piece
            let $tk = await resolveToken();

            // if a error
            if ($tk.error) { 
                
                console.log('$tk.error', $tk.error)
                
                res.status(200)
                    .send({ 
                        ...$info, 
                        ...parseCheckError($tk.error)
                    }).end(); return;
            }

            // else if res data & !error
            // continue to resolveChange()
            if ($tk.res) {
            
                let $ch = await resolveCharge($tk.res);

                // if a error
                if ($ch.error) { 
                    
                    console.log('$ch.error', $ch.error)

                    res.status(200)
                       .send({ 
                            ...$info, 
                            ...parseCheckError($ch.error)
                        }).end(); return;
                }

                // else if res data & !error
                // continue end response 200
                if ($ch.res) {
                    res.status(200)
                       .send({
                            ...$info,
                            ...$ch.res }).end();
                }
            }

            // down methods declared
            async function resolveToken () {
                
                try {

                    console.log('   ...issuing Token.')

                    await $h.delayRandom('  ...delay a bit before create Token...', {
                        min: 3000, 
                        max: 600
                    })

                    let token = await issueToken({
                        'card[number]': $info.number,
                        'card[exp_month]': $info.month,
                        'card[exp_year]': $info.year,
                        'card[cvc]': $info.cvv,
                        'card[name]': $info._cus.holdername,
                        'card[address_line1]': $info._cus.address,
                        'card[address_state]': $info._cus.state,
                        'card[address_zip]': $info._cus.cep,
                        'card[address_country]': $info._cus.country
                    })

                    console.log('   ...Token issued:', token.id)
                    console.log('   ...typeof Token:', typeof token, '\n')

                    return {
                        error: null, 
                        res: token
                    }

                } catch (err) {
                    
                    return {
                        res: null,
                        error: {
                            ...err.error.error || null,
                            numCode: err.statusCode || 500
                        }
                    }
                }
            }
            
            async function resolveCharge (tk) {

                try {

                    console.log('   ...issuing Charge.')

                    await $h.delayRandom('  ...delay a bit before create Charge...', {
                        min: 3000, 
                        max: 600
                    })

                    let charge = await issueCharge({
                        source: tk.id,
                        currency: 'brl',
                        amount: $h.getRandomAmount({min: 59, max: 119}),
                        description: $h.getRandomDescription(),
                        receipt_email: $info._cus.email,
                        metadata: {
                            email: $info._cus.email,
                            holdername: $info._cus.holdername
                        },
                        shipping: {
                            name: $info._cus.name,
                            address: {
                                city: $info._cus.city,
                                line1: $info._cus.address,
                                state: $info._cus.state,
                                postal_code: $info._cus.cep,
                                country: $info._cus.country
                            }
                        }
                    })

                    console.log('   ...Charge issued:', charge.id, '\n')

                    return {
                        error: null, 
                        res: { 
                            ...$info,
                            _live: 'Sim',
                            _cashout: charge.amount,
                            _chargeid: charge.id,
                            _errorLive: null
                        }
                    }

                } catch (err) {

                    return {
                        res: null,
                        error: {
                            ...err.error.error || null,
                            numCode: err.statusCode || 500
                        }
                    }
                }
            }

            // MyClient > Stripe setup request
            async function issueToken (tokenData) {
                return await request({
                    url: config.apiUrl + '/tokens',
                    method: 'post',
                    json: true,
                    rejectUnauthorized: false,
                    qs: tokenData,
                    proxy: $pxUsual,
                    headers: {
                        'Keep-Alive': 'true',
                        'User-Agent': $uaClient,
                        'Authorization': 'Bearer ' + $skeys.pk
                    }
                })
            }

            // Server -> Stripe setup request
            async function issueCharge (chargeData) {
                return await request({
                    url: config.apiUrl + '/charges',
                    method: 'post',
                    json: true,
                    rejectUnauthorized: false,
                    qs: chargeData,
                    data: chargeData,
                    proxy: $pxServer,
                    headers: {
                        'Keep-Alive': 'true',
                        'User-Agent': $uaServer,
                        'Authorization': 'Bearer ' + $skeys.sk
                    }
                })
            }
        }
    }
}