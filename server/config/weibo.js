const config = require('./config')
const DEBUG_MODE = config.DEBUG_MODE
const client_key = DEBUG_MODE?'3549067552':'fd595c760780dca1977d'
const client_secret = DEBUG_MODE?'4a20fa84008cf0566f7f4de9fe6575b7':'c2ce58f6904854e48f23c932eb49886b2acc22c4'
module.exports = {
    client_id: client_key,
    client_secret: client_secret
}