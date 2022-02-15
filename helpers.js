const { customAlphabet } = require('nanoid')
const config = require('./config.js')

// helper functions
function delayRandom (_logTxt, delay) {

    const min = delay.min,
          max = delay.max

    let _rms = Math.floor(Math.random() * (max - min + 1)) + min;

    console.log(_logTxt, _rms)

    return new Promise(resolve => setTimeout(resolve, _rms))
}

function getRandomAmount (scale) {
    
    const min = scale.min,
          max = scale.max;

    let _randomBtw5e9 = Math.floor(
            Math.random() * (max - min + 1)) + min

    // to multiple of 10
    return Math.round(_randomBtw5e9 / 10) * 10
}

function getRandomDescription () {

    let _companys = {
        0: {
            id: 'oijeiwj90fj3j03',
            type: 'purchase',
            transMockId: getNanoid('abcsde-123456', 15, 'SUID')
        },
        1: {
            id: '439j0fj03j234444',
            type: 'other',
            transMockId: getNanoid('ZALSOMKYX12345689', 15, '001')
        },
        2: {
            id: '123448shdf8a9h8e',
            type: 'subscription',
            transMockId: getNanoid('ABCDEF2345689', 15, 'SBN')
        },
        3: {
            id: 'bc643679c043mbc',
            type: 'other',
            transMockId: getNanoid('afdbe123456789', 15)
        },
        4: {
            id: '8f43h8pif30902f',
            type: 'other',
            transMockId: getNanoid('cd41294a-afb0-11df-bc9b-00241dd75637', 15)
        },
        5: {
            id: '98d903jd9404442',
            type: 'other',
            transMockId: getNanoid('afdbe123456789', 15, '_')
        },
        6: {
            id: '93f938j4f93f093',
            type: 'other',
            transMockId: getNanoid('cd41294a-afb0-11df-bc9b-00241dd75637', 15)
        },
        7: {
            id: '9j4093j4f3jfa04',
            type: 'other',
            transMockId: getNanoid('afdbe123456789', 15)
        },
        8: {
            id: 'k9d209jf2fuh9ea',
            type: 'other',
            transMockId: getNanoid('afdbe-123456789', 15, '009')
        },
        9: {
            id: 'qqw302d23d3d23f',
            type: 'subscription',
            transMockId: getNanoid('afdbe123456789', 15, 'SID:')
        },
        10: {
            id: 'dd4f4fffjj2092j',
            type: 'purchase',
            transMockId: getNanoid('afdbe123456789', 15, '', '|CT')
        },
        11: {
            id: 'j23443f42r23jf9',
            type: 'other',
            transMockId: getNanoid('cd41294a-afb0-11df-bc9b-00241dd75637', 36)
        },
        12: {
            id: '34343f43ff3f32h',
            type: 'other',
            transMockId: getNanoid('abcsde-123456', 15, 'SUID')
        },
        13: {
            id: 'd892j3938hh84fh',
            type: 'purchase',
            transMockId: getNanoid('afdbe123456789', 15)
        },
        14: {
            id: '9828h3d928hd893',
            type: 'other',
            transMockId: getNanoid('afdbe123456789', 24)
        },
        15: {
            id: '98hp9apd9h8f398h',
            type: 'other',
            transMockId: getNanoid('cd41294a-afb0-11df-bc9b-00241dd75637', 36)
        }
    };

    let _comIndex = Math.floor(
            Math.random() * Object.keys(_companys).length)

    let _com = _companys[_comIndex]

    return `T$${_com.transMockId} C$${_com.id} $TY${_com.type}`
}

function getNanoid (str, leng, pre = '', suf = '') {
    const nanoid = customAlphabet(str, leng)
    return `${pre}${nanoid()}${suf}`
}

module.exports = {

    setup () {

        global.$h = {};

        Object.assign(global.$h, {
            getNanoid,
            delayRandom,
            getRandomAmount,
            getRandomDescription
        })
    }
}