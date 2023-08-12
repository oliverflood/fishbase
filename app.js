// App.js

// Database
var db = require('./database/db-connector')

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT        = 56711;                 // Set a port number at the top so it's easy to change in the future

// app.js

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/

// app.get('/', function(req, res)
//     {
//         // Define our queries
//         query1 = 'DROP TABLE IF EXISTS diagnostic;';
//         query2 = 'CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);';
//         query3 = 'INSERT INTO diagnostic (text) VALUES ("MySQL is working!")';
//         query4 = 'SELECT * FROM diagnostic;';

//         // Execute every query in an asynchronous manner, we want each query to finish before the next one starts

//         // DROP TABLE...
//         db.pool.query(query1, function (err, results, fields){

//             // CREATE TABLE...
//             db.pool.query(query2, function(err, results, fields){

//                 // INSERT INTO...
//                 db.pool.query(query3, function(err, results, fields){

//                     // SELECT *...
//                     db.pool.query(query4, function(err, results, fields){

//                         // Send the results to the browser
//                         res.send(JSON.stringify(results));
//                     });
//                 });
//             });
//         });
//     });

app.get('/', function(req, res)
{
    res.render('index');
});

app.get('/index', function(req, res)
{
    res.render('index');
});

app.get('/players', function(req, res)
{
    res.render('players');
});

app.get('/rods', function(req, res)
{
    res.render('rods');
});

app.get('/rarities', function(req, res)
{
    res.render('rarities');
});

app.get('/player_rods', function(req, res)
{
    res.render('player_rods');
});



// app.js - ROUTES section

app.post('/add-fish-form', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(data)

    // Capture NULL values


    //let rarity_id = 1;

    // let age = parseInt(data.age);
    // if (isNaN(age))
    // {
    //     age = 'NULL'
    // }

    // Create the query and run it on the database
    query1 = `INSERT INTO Fishes (rarity_id ,name, color, description, favorite_movie) VALUES ('${data['input-rarity_id']}','${data['input-name']}', '${data['input-color']}', '${data['input-description']}', '${data['input-favorite_movie']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/fishes');
        }
    })
});

app.post('/delete-fish-form', function(req, res, next){
    let data = req.body;
    let personID = parseInt(data.id);
    let query1= `DELETE FROM Fishes WHERE fish_id = ?`;
    // let query2 = `-- DELETE FROM __ WHERE pid = ?`;

    // Run the 1st query
    db.pool.query(query1, [personID], function(error, rows, fields){
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else
        {
            // Run the second query
            db.pool.query(query1, [personID], function(error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    // res.sendStatus(204); // TODO still gives error and doesn't reload the page. redirect doesn't work either
                    res.redirect('/fishes');
                    // res.send(rows);

                }

            })

        }
    })});

app.post('/put-fish-form', function(req,res,next){

    // Collect and unpack data, transfer to array
    let data = req.body;
    let { fish_id, rarity, name, color, description, favorite_movie } = data;
    let values = [rarity, name, color, description, favorite_movie, fish_id]

    let query = `UPDATE Fishes SET 
        rarity_id = ?,
        name = ?,
        color = ?,
        description = ?,
        favorite_movie = ? 
        WHERE fish_id = ?`

    let select = `SELECT * FROM Fishes WHERE fish_id = ?`

    // Run update query
    db.pool.query(query, values, (error, rows, fields) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error updating fish');
        }

        else
        {
            // Run the second query
            db.pool.query(select, fish_id, function(error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.status(400).send('Error retrieving fish');
                } else {
                    res.redirect('/fishes')
                }
            })
        }
    });
});


// Catches
app.post('/add-catches-form', function(req, res)
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(data)

    // Capture NULL values


    //let rarity_id = 1;

    // let age = parseInt(data.age);
    // if (isNaN(age))
    // {
    //     age = 'NULL'
    // }

    // Create the query and run it on the database
    query1 = `INSERT INTO Catches (player_id ,fish_id, money_earned, catch_date) VALUES ('${data['input-player_id']}','${data['input-fish_id']}', '${data['input-money_earned']}', '${data['input-catch_date']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/catches');
        }
    })
});

app.post('/delete-catches-form', function(req, res, next){
    let data = req.body;
    let id = parseInt(data.id);
    let query1= `DELETE FROM Catches WHERE catch_id = ?`;
    // let query2 = `-- DELETE FROM __ WHERE pid = ?`;

    // Run the 1st query
    db.pool.query(query1, [id], function(error, rows, fields){
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else
        {
            // Run the second query
            db.pool.query(query1, [id], function(error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    // res.sendStatus(204); // TODO still gives error and doesn't reload the page. redirect doesn't work either
                    res.redirect('/catches');
                    // res.send(rows);

                }

            })

        }
    })});

app.post('/put-catches-form', function(req,res,next){

    // Collect and unpack data, transfer to array
    let data = req.body;
    let { catch_id, player_id, fish_id, money_earned, catch_date } = data;
    let values = [player_id, fish_id, money_earned, catch_date, catch_id]

    let query = `UPDATE Catches SET 
        player_id = ?,
        fish_id = ?,
        money_earned = ?,
        catch_date = ?
        WHERE catch_id = ?`

    let select = `SELECT * FROM Catches WHERE catch_id = ?`

    // Run update query
    db.pool.query(query, values, (error, rows, fields) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error updating catches');
        }

        else
        {
            // Run the second query
            db.pool.query(select, catch_id, function(error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.status(400).send('Error retrieving catches');
                } else {
                    res.redirect('/catches')
                }
            })
        }
    });
});


// app.js

app.get('/fishes', function(req, res)
{  
    let query1 = "SELECT * FROM Fishes;";

    db.pool.query(query1, function(error, rows, fields){

        res.render('fishes', {data: rows});
    })
});

app.get('/catches', function(req, res)
{
    let query1 = "SELECT * FROM Catches;";

    db.pool.query(query1, function(error, rows, fields){

        res.render('catches', {data: rows});
    })
});

// app.get('/fishes', function(req, res)
// {
//     res.render('fishes');
// });


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});