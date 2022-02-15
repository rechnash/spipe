let $g = global,
    $emap = $g.$emap;

function parseCheckError (error, ops) {

    console.log('   ...running parseCheckError() \n')

    // * ------ start - main scope ------------- //

    let $errTxt = JSON.stringify(error),
        $errObj = JSON.parse($errTxt),
        $chk    = checkErrorObject($errObj);

    console.log('$errObj:', $errObj)

    if (ops && ops.force) {
        return parseInfoData(ops.force, $errObj)
    } else {
        return parseInfoData($chk, $errObj)
    }

    // * ------ end - main scope --------------- //
    // * ------ method deffs ------------------- //

    function parseInfoData (check, eobj) {
        
        const results = {
            
            'pass': {
                _live: 'Sim',
                _cashout: 0,
                _chargeid: null,
                _errorLive: eobj.decline_code || eobj.code
            },

            'maybe': {
                _live: 'Talvez',
                _cashout: 'Não',
                _chargeid: null,
                _errorLive: eobj.decline_code || eobj.code
            },

            'dead': {
                _live: 'Não',
                _cashout: 'Não',
                _chargeid: null,
                _errorLive: eobj.decline_code || eobj.code
            },

            'escape': {
                _live: 'Check',
                _cashout: 'Não',
                _chargeid: null,
                _errorLive: null,
                _errorEscape: eobj.decline_code || eobj.code
            }
        }

        return results[check]
    }

    function checkErrorObject (errObj) {

        const errvals = [
            errObj.decline_code || 'undefined',
            errObj.code || 'undefined'
        ]

        // are live altough no cashout
        if ($g.util.containsEachotherAny(
                errvals, $emap.passDeclineCodes)) {
            return 'pass'
        }

        // sets to live talvez
        if ($g.util.containsEachotherAny(
                errvals, $emap.maybeDeclineCodes)) {
            return 'maybe'
        }

        // retry
        if ($g.util.containsEachotherAny(
                errvals, $emap.escapeErrorCodes)) {
            return 'escape'
        }

        // else full die
        return 'dead'
    }
}

module.exports = parseCheckError;