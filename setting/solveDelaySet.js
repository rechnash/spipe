let $e = process.env;

const delaySets = {

    slowest: {
        name: 'slowest',
        min: 4900, 
        max: 7900
    },

    slower: {
        name: 'slower',
        min: 3500, 
        max: 6500
    },
    
    slow: {
        name: 'slow',
        min: 2100, 
        max: 2700
    },

    medium: {
        name: 'medium',
        min: 1000, 
        max: 1500
    },

    fast: {
        name: 'fast',
        min: 500, 
        max: 1000
    }
}

function solveDelaySets () {
    
    if ($e.DEP_MODE === 'test') {
        return delaySets[$e.DELAY_SET_TEST]
    }

    if ($e.DEP_MODE === 'live') {
        return delaySets[$e.DELAY_SET_LIVE]
    }
}

module.exports = solveDelaySets;