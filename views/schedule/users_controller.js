// =======================================
//              
//          USERS CONTROLLER
//
// =======================================

// =========================
//       DEPENDENCIES
// =========================
const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const Users = require('../virtual-stand-up-open-mic/stars/models/users.js')


// =========================
//      ROUTES
// =========================


/* ===========
GET ROUTE
============= */
//NEW USER
users.get('/new', (req, res) => {
    res.render('users/users_new.ejs', {
        currentUser: req.session.currentUser
    })
})

/* ===========
POST ROUTE
============= */
//CREATE USER
users.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    Users.create(req.body, (err, createdUser) => {
        console.log('user is created', createdUser)
        res.redirect('/lineup')
    })
})

/* ===========
GET ROUTE
============= */
//EDIT USER
users.get('/:id/edit', (req, res) => {
    Users.findById(req.params.id, (error, foundUser) => {
        res.render('users/users_new.ejs', {
            users: foundUser,
            currentUser: req.session.currentUser
        })
    })
})


/* ===========
PUT ROUTE
============= */
//UPDATE USER
users.put('/:id', (req, res) => {
    Users.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedUser) => {
        console.log(updatedUser);
        res.redirect('/')
    }
    )
})

module.exports = users;