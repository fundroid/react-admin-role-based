var crypto = require("crypto")

export function getJwtKey(){
    return "jwtprivatekeyhere"
}

export function encrypt(text) {
    var cipher = crypto.createCipher('aes-256-cbc', 'd6F3Efeq')
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

export function decrypt(text) {
    // console.log("============ " + text)
    try{
        var decipher = crypto.createDecipher('aes-256-cbc', 'd6F3Efeq')
        var dec = decipher.update(text, 'hex', 'utf8')
        dec += decipher.final('utf8');
        // console.log("============ " + dec)
        return dec;
    } catch (err){
        return "";
    }
}