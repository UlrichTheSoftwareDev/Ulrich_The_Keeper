const low = require('lowdb')
const FileSync = require('../../../../node_modules/lowdb/adapters/FileSync.js')
const lodashId = require('lodash-id')

const adapter = new FileSync('../databases/electron_db.json')
const db = low(adapter)

db._.mixin(lodashId)

const collection = db
  .defaults({ users: [], passwords:[] })
  .get('users')

// Insert a new post...
var var_sacha = "sacha4"
const newPost = collection
  .insert({ username: var_sacha, user_password:'sacha_pwd', date:'01-01-2020' })
  .write()


//SHOW RESULT THE FIRST ONE RESULT
console.log(db.get('users').find({'username':'sacha4'}).value())

var toto = db.get('users').find({'username':'sacha5'}).value()

console.log(toto)

if (toto ) {

console.log("true")
}
else
{
console.log("false")
}

//get all value
console.log(db.get('users').map('username').value())

//get all value where = 'sacha4'
console.log(db.get('users').filter({'username': 'sacha4'}).map('username').value())
