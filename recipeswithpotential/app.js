const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const recipeRoutes = require('./routes/recipeRouter')
const app = express();

const dburi = '<myprivatedburi>'; 
mongoose.connect(dburi, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>app.listen(3000))
.catch((err)=>console.log(err));

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));


app.get('/', (req, res) => {
   res.redirect('/recipes')});
app.get('/about', (req, res) => {
    res.render('about', {title:'About this Site'})});
app.use('/recipes', recipeRoutes);
app.use((req, res) => {
    res.status(404).render('404', {title:'404 Not Found'})});