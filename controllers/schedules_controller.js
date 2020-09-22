// =======================================
//              
//          TASK CONTROLLER
//
// =======================================


// =========================
//       DEPENDENCIES
// =========================
const express = require('express')
const Schedules = require('../views/stars/models/schedules.js');
const Ratings = require('../views/stars/models/comment.js');
const schedules = express.Router()
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
//NEW TASKS
schedules.get('/new', (req, res) => {
    res.render('task/new_schedule.ejs', {
        currentUser: req.session.currentUser
    })
})


/* ===========
POST ROUTE
============= */
//CREATE TASKS
schedules.post('/', (req, res) => {
    Schedules.create(req.body, (error, createdSchedule) => {
        console.log('schedule is created' + createdSchedule);
        res.redirect('/schedule')
    })
})

/* ===========
GET ROUTE
============= */
//INDEX TASKS
schedules.get('/', (req, res) => {
    Schedules.find({}, (error, allSchedules) => {
        res.render('schedule/index_schedule.ejs', {
            Schedules: allSchedules,
            currentUser: req.session.currentUser
        })
    })

})

/* ===========
GET ROUTE
============= */
//SHOW TASKS
schedules.get('/:id', (req, res) => {
    Schedules.findById(req.params.id, (error, foundSchedule) => {
        res.render('schedule/show_schedule.ejs', {
            Schedules: foundSchedule,
            currentUser: req.session.currentUser
        })
    })
})

/* ===========
PUT ROUTE
============= */
//UPDATE TASKS
schedules.put('/:id', (req, res) => {
    Schedules.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedSchedule) => {
        res.redirect('/schedule/' + req.params.id)
    }
    )
})

/* ===========
GET ROUTE
============= */
//EDIT TASKS
schedules.get('/:id/edit', (req, res) => {
    Schedules.findById(req.params.id, (error, foundSchedule) => {
        res.render('schedule/edit_task.ejs', {
            schedules: foundSchedule,
            currentUser: req.session.currentUser
        })
    })
})


/* ===========
DELETE ROUTE
============= */
//DELETE TASK
schedules.delete('/:id', (req, res) => {
    Schedules.findByIdAndRemove(req.params.id, (err, deletedSchedule) => {
        res.redirect('/schedule')
    })
})


module.exports = schedules;