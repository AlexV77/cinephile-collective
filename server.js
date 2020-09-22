//___________________
//DEPENDENCIES
//___________________
const express = require('express');
const session = require('express-session')
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection;
const Schedules = require('./models/schedules.js');
const Ratings = require('./models/comment.js');
const Users = require('./models/users.js')

// ========== MIDDLEWARE =====================
require('dotenv').config()
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
)
// =======================================
//              DATABASE
// =======================================
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const db = mongoose.connection
const dbName = process.env.DBNAME


// // Connect to Mongo &
// // Fix Depreciation Warnings from Mongoose
// // May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
    console.log('the connection with mongod is established')
});
db.once('open', () => {
    console.log('mongo is connected: ', dbName);
});
// // Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));
// =======================================
//           APP   CONTROLLERS
// =======================================
const commentController = require('./controllers/comment_controller.js')
app.use('/comment', commentController)

const scheduleController = require('./controllers/schedule_controller.js')
app.use('/schedule', scheduleController)

const userController = require('./controllers/comics_controller.js')
app.use('/users', userController)
const sessionsController = require('./controllers/sessions_controller.js')
app.use('/sessions', sessionsController)

// =======================================
//           ROUTES
// =======================================
app.get('/lineup', async (req, res) => {
    const comments = await Comments.find({})
    const schedules = await Schedules.find({})

    res.render('lineup/lineupschedule.ejs', {
        comments: comments,
        schedules: schedules,
        currentUser: req.session.currentUser
    })

})
// //localhost:3000
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// //___________________
// //Listener
// //___________________
app.listen(PORT, () => {
    console.log('Listening on port:', PORT)
});
