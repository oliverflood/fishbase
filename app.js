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

app.get('/catches', function(req, res)
{
    res.render('catches');
});



// app.js - ROUTES section

app.post('/add-fish-form', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values


    //let rarity_id = 1;

    // let age = parseInt(data.age);
    // if (isNaN(age))
    // {
    //     age = 'NULL'
    // }

    // Create the query and run it on the database
    query1 = `INSERT INTO Fishes (name, color, description, favorite_movie) VALUES ('${data.name}', '${data.color}', '${data.description}', '${data.favorite_movie}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // // If there was no error, perform a SELECT * on bsg_people
            // query2 = `SELECT * FROM Fishes;`;
            // db.pool.query(query2, function(error, rows, fields){

            //     // If there was an error on the second query, send a 400
            //     if (error) {
                    
            //         // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            //         console.log(error);
            //         res.sendStatus(400);
            //     }
            //     // If all went well, send the results of the query back.
            //     else
            //     {
            //         res.send(rows);
            //     }
            // })
            res.redirect('/');
        }
    })
});




// app.js

app.get('/fishes', function(req, res)
{  
    let query1 = "SELECT * FROM Fishes;";

    db.pool.query(query1, function(error, rows, fields){

        res.render('fishes', {data: rows});
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