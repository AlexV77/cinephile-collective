// =======================================
//              
//          SESSIONS CONTROLLER
//
// =======================================

// =========================
//       DEPENDENCIES
// =========================
const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const Users = require('../views/stars/models/users.js')


// =========================
//      ROUTES
// =========================

sessions.get('/new', (req, res) => {
    res.render('sessions/new_session.ejs', {
        currentUser: req.session.currentUser
    })
})


sessions.post('/', (req, res) => {
    Users.findOne({ username: req.body.username }, (err, foundUser) => {
        if (err) {
            console.log(err)
            res.send('the database is running into an error')
        } else if (!foundUser) {
            res.send('<a  href="/lineup">Sorry, no user found </a>')
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser
                console.log(`${foundUser.username} is now logged on`);
                res.redirect('/lineup')
            } else {
                res.send('<a href="/lineup"> password does not match </a>')
            }
        }
    })
})

sessions.delete('/', (req, res) => {
    req.session.destroy(() => {
        console.log('session is over');
        res.redirect('/lineup')
    })
})

module.exports = sessions