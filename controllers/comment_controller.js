// =======================================
//              
//          CLASS CONTROLLER
//
// =======================================


// =========================
//       DEPENDENCIES
// =========================
const express = require('express')
const Schedules = require('../views/stars/models/schedules.js');
const Ratings = require('../views/stars/models/comment.js');
const comments = express.Router()
const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        return next()
    } else {
        res.redirect('/sessions/new')
    }
}


// =========================
//      ROUTES
// =========================

/* ===========
GET ROUTE
============= */
//NEW CLASS
comments.get('/new', (req, res) => {
    res.render('class/new_class.ejs', {
        currentUser: req.session.currentUser
    })
})


/* ===========
POST ROUTE
============= */
//CREATE CLASS
comments.post('/', (req, res) => {
    Ratings.create(req.body, (error, createdComments) => {
        console.log('comment is created' + createdComment);
        res.redirect('impression/comment')
    })
})


/* ===========
GET ROUTE
============= */
//INDEX CLASS
comments.get('/', (req, res) => {
    Ratings.find({}, (error, allComments) => {
        res.render('comments/index_comment.ejs', {
            comments: allComments,
            currentUser: req.session.currentUser
        })
    })

})

/* ===========
GET ROUTE
============= */
//SHOW CLASS
comments.get('/:id', (req, res) => {
    Ratings.findById(req.params.id, (error, foundComment) => {
        res.render('comment/show_comment.ejs', {
            comments: foundComment,
            currentUser: req.session.currentUser
        })
    })
})


/* ===========
PUT ROUTE
============= */
//UPDATE CLASS
comments.put('/:id', (req, res) => {
    Ratings.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedComment) => {
        res.redirect('/comment/' + req.params.id)
    }
    )
})


/* ===========
GET ROUTE
============= */
//EDIT CLASS
comments.get('/:id/edit', (req, res) => {
    Ratings.findById(req.params.id, (error, foundComment) => {
        res.render('comment/edit_comment.ejs', {
            comments: foundComment,
            currentUser: req.session.currentUser
        })
    })
})


/* ===========
DELETE ROUTE
============= */
//DELETE CLASS
comments.delete('/:id', (req, res) => {
    Ratings.findByIdAndRemove(req.params.id, (err, deletedComment) => {
        res.redirect('/comment')
    })
})

module.exports = comments