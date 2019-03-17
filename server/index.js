// sqlite
var sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./var/math.db');

// http
const server = require('http').createServer(handleRequest)
const Httpdispatcher = require('httpdispatcher')
var dispatcher = new Httpdispatcher()
const PORT = 3334
function handleRequest(request, response) {
    try {
        dispatcher.dispatch(request, response)
    } catch (err) {
        console.log(err)
    }
}

// jwt
const jwt = require('jsonwebtoken')
const SECRET = "SECRET_KEY"


/* allow(Admin, 'manage', User); */

dispatcher.onPost('/login', (req, res) => {
    const { username, password } = req.params
    db.all(`SELECT user_id FROM users WHERE username = ? AND password = ?`, [username, password], function (err, results) {
        if (err || results.length === 0) {
            res.end('err')
        }
        const token = jwt.sign({ user_id: results[0].user_id }, SECRET, {
            expiresIn: 86400
        })
        res.end(token)
    })
})

dispatcher.beforeFilter(/\/(?!login)/, function (req, res, chain) {
    try {
        var decoded = jwt.verify(req.headers.authentication, SECRET)
        if (decoded) {
            chain.next(req, res, chain)
        } else {
            res.writeHeader(401)
            return res.end()
        }
    } catch (e) {
        res.writeHeader(401)
        return res.end()
    }
})

dispatcher.onGet('/user', (req, res) => {
    if (req.headers.authentication) {
        var decoded = jwt.verify(req.headers.authentication, SECRET)
        if (decoded) {
            db.all(`SELECT username FROM users WHERE user_id = ?`, [decoded.user_id], function (err, results) {
                if (err || results.length === 0) {
                    res.end('err')
                }
                res.end(results[0].username)
            })
        }
    }
})

/* function manageUser() {
    // request database to get the user role  --> Admin
    const role = db.add('select role from users where user_id = ?')
    if (can(role, 'manage', User)) {

    }
}

dispatcher.onPost('/user', manage) */


server.listen(PORT)