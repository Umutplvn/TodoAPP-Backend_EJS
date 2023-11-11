"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
// TEMPLATE:
// $ npm i ejs
// https://ejs.co/
// https://www.npmjs.com/package/ejs
// https://github.com/mde/ejs/wiki/Using-EJS-with-Express

app.set('view engine', 'ejs')   // EJS Engine tanimlama
// Default folder: './views'
app.set('views', './public')    // EJS icin konum tanimlama

/* ------------------------------------------------------- */
// Accept json data & convert to object:
app.use(express.json())

// Accept form data & convert to object:
app.use(express.urlencoded({ extended: true })) // Allow array-form-elements - Template sayesinde browser uzerinden yolladigimiz veriyi kabul etmeye yarar / forma yazdigimiz verileri urlye saklayarak yollar 

// Router:
app.all('/', (req, res) => {

    // call ejs file in ./views/
    // res.render('index.ejs')
    res.render('index')

})

app.use('/view', require('./app/routes/todoTemplate')) // asagidaki linkte sadece backend islemleri yer alirken bu linkle template islemlerimize ulasabilicez. Bunun icin route ve controller Todo.js dosyalarini kopyalayip todoTemplate.js olarak kopyalayarak ayri bir path olusturduk 
app.use('/api', require('./app/routes/todo'))

// DatabaseConnection:
const { dbConnection } = require('./app/dbConnection')
dbConnection() // sequelize.sync() must run after model defines.

// errorHandler (Catch Errors):
app.use(require('./app/errorHandler'))

/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));