const Chance = require('chance')
const config = require('./config.js')

function shuffleArray (array) {
    for (let i = array.length - 1; i > 0; i--) {
         let rand = Math.floor(Math.random() * (i + 1));
         [array[i], array[rand]] = [array[rand], array[i]]
    }
}

function maybe (_chance, ops) {

    let $chance = new Chance()

    if (!_chance) {
        _chance = 50;
    }
    
    let $do = $chance.bool({ 
        likelihood: _chance 
    })

    if ($do) {
        ops.do()
    } else {
        ops.dont()
    }
}

function isBadBank (bank) {
    
    let isbadBank = config.blacklistBanks.some(_bank => { 
        return bank.includes(_bank)
    })

    return isbadBank
}

async function delayRandom (delay = {}, _logTxt = '') {

    const min = delay.min,
          max = delay.max

    let _rms = Math.floor(Math.random() * (max - min + 1)) + min;

    if (_logTxt && _logTxt.length !== 0) {
        console.log(_logTxt, _rms)
    }

    return new Promise(resolve => setTimeout(resolve, _rms))
}

function containsEachotherAny (firstarr, targetarr) {
    return firstarr.find(v => { 
        return targetarr.includes(v)
    })
}

module.exports = {
    
    setup () {

        global.util = {
            containsEachotherAny,
            shuffleArray,
            delayRandom,
            isBadBank,
            maybe
        }
    }
}