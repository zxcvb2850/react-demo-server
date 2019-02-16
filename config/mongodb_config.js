/**
 * mongodb config
 * */

const IP = '127.0.0.1'
const PROT = 27017
const DB_NAME = 'imooc'
const DB_URL = `mongodb://${IP}:${PROT}/${DB_NAME}`

module.exports = DB_URL
