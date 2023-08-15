// App.js

// Database
var db = require('./database/db-connector')

/*
    SETUP
*/
const Handlebars = require('handlebars');
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


app.get('/', function(req, res)
{
    res.render('index');
});

app.get('/index', function(req, res)
{
    res.render('index');
});





// app.js - ROUTES section

app.post('/add-fish-form', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(data)

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

// Players
app.post('/add-players-form', function(req, res)
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(data)

    // Create the query and run it on the database
    query1 = `INSERT INTO Players (player_id ,username, total_catches, join_date) VALUES ('${data['input-player_id']}','${data['input-username']}', '${data['input-total_catches']}', '${data['input-join_date']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/players');
        }
    })
});

app.post('/delete-players-form', function(req, res, next){
    let data = req.body;
    let id = parseInt(data.id);
    let query1= `DELETE FROM Players WHERE player_id = ?`;
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
                    res.redirect('/players');
                    // res.send(rows);

                }

            })

        }
    })});

app.post('/put-players-form', function(req,res,next){

    // Collect and unpack data, transfer to array
    let data = req.body;
    let { player_id, username, total_catches, join_date } = data;
    let values = [username, total_catches, join_date, player_id]

    let query = `UPDATE Players SET 
        username = ?,
        total_catches = ?,
        join_date = ?
        WHERE player_id = ?`

    let select = `SELECT * FROM Players WHERE player_id = ?`

    // Run update query
    db.pool.query(query, values, (error, rows, fields) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error updating catches');
        }

        else
        {
            // Run the second query
            db.pool.query(select, player_id, function(error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.status(400).send('Error retrieving catches');
                } else {
                    res.redirect('/players')
                }
            })
        }
    });
});

// Rods
app.post('/add-rods-form', function(req, res)
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(data)

    // Create the query and run it on the database
    query1 = `INSERT INTO Rods (name, tooltip, price, catch_rate, line_length, reel_speed, money_multiplier) VALUES ('${data['input-name']}','${data['input-tooltip']}','${data['input-price']}', '${data['input-catch_rate']}', '${data['input-line_length']}', '${data['input-reel_speed']}', '${data['input-money_multiplier']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/rods');
        }
    })
});

app.post('/delete-rods-form', function(req, res, next){
    let data = req.body;
    let id = parseInt(data.id);
    let query1= `DELETE FROM Rods WHERE rod_id = ?`;
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
                    res.redirect('/rods');
                    // res.send(rows);

                }

            })

        }
    })
});

app.post('/put-rods-form', function(req,res,next){

    // Collect and unpack data, transfer to array
    let data = req.body;
    let { rod_id, name, tooltip, price, catch_rate, line_length, reel_speed, money_multiplier } = data;
    let values = [name, tooltip, price, catch_rate, line_length, reel_speed, money_multiplier, rod_id]

    let query = `UPDATE Rods SET 
        name = ?,
        tooltip = ?,
        price = ?,
        catch_rate = ?,
        line_length = ?,
        reel_speed = ?,
        money_multiplier = ?
        WHERE rod_id = ?`

    let select = `SELECT * FROM Rods WHERE rod_id = ?`

    // Run update query
    db.pool.query(query, values, (error, rows, fields) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error updating catches');
        }

        else
        {
            // Run the second query
            db.pool.query(select, rod_id, function(error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.status(400).send('Error retrieving catches');
                } else {
                    res.redirect('/rods')
                }
            })
        }
    });
});

// Rarities
app.post('/add-rarities-form', function(req, res)
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(data)

    // Create the query and run it on the database
    query1 = `INSERT INTO Rarities (rarity_name, description) VALUES ('${data['input-rarity_name']}','${data['input-description']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/rarities');
        }
    })
});

app.post('/delete-rarities-form', function(req, res, next){
    let data = req.body;
    let id = parseInt(data.id);
    let query1= `DELETE FROM Rarities WHERE rarity_id = ?`;
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
                    res.redirect('/rarities');
                    // res.send(rows);

                }

            })

        }
    })});

app.post('/put-rarities-form', function(req,res,next){

    // Collect and unpack data, transfer to array
    let data = req.body;
    let { rarity_id, rarity_name, description} = data;
    let values = [rarity_name, description, rarity_id]

    let query = `UPDATE Rarities SET 
        rarity_name = ?,
        description = ?
        WHERE rarity_id = ?`

    let select = `SELECT * FROM Rarities WHERE rarity_id = ?`

    // Run update query
    db.pool.query(query, values, (error, rows, fields) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error updating catches');
        }

        else
        {
            // Run the second query
            db.pool.query(select, rarity_id, function(error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.status(400).send('Error retrieving catches');
                } else {
                    res.redirect('/rarities')
                }
            })
        }
    });
});


app.post('/add-player-rods-form', function(req, res) {
    let data = req.body;
    //console.log('Received data:', data);
    //let query = `INSERT INTO PlayerRods (player_id, rod_id) VALUES (?, ?);`;

    let query = `INSERT INTO PlayerRods (player_id, rod_id) VALUES ('${data['input-player_id']}','${data['input-rod_id']}')`;
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.redirect('/player_rods');
        }
    });
});

app.post('/delete-player-rods-form', function(req, res) {
    let data = req.body;
    let player_id = parseInt(data.player_id);
    let rod_id = parseInt(data.rod_id);
    let query = `DELETE FROM PlayerRods WHERE player_id = ? AND rod_id = ?;`;

    db.pool.query(query, [player_id, rod_id], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.redirect('/player_rods');
        }
    });
});


app.post('/put-player-rods-form', function(req, res) {
    let data = req.body;
    let { player_id, rod_id, update_player_id, update_rod_id } = data;
    let query = `UPDATE PlayerRods SET player_id = ?, rod_id = ? WHERE player_id = ? AND rod_id = ?;`;

    db.pool.query(query, [update_player_id, update_rod_id, player_id, rod_id], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            res.redirect('/player_rods');
        }
    });
});



app.get('/fishes', function(req, res) {
    let query1 = "SELECT * FROM Fishes;";
    let query2 = "SELECT * FROM Rarities;";

    db.pool.query(query1, function(error, fishes, fields) {
        db.pool.query(query2, function(error, rarities, fields) {
            res.render('fishes', { data: fishes, rarities: rarities });
        });
    });
});


app.get('/catches', function(req, res) {
    let queryPlayers = "SELECT * FROM Players;";
    let queryFishes = "SELECT * FROM Fishes;";
    let queryCatches = "SELECT * FROM Catches;";

    db.pool.query(queryPlayers, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        let players = rows;

        db.pool.query(queryFishes, function(error, rows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            let fishes = rows;

            db.pool.query(queryCatches, function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                    return;
                }

                res.render('catches', { players: players, fishes: fishes, data: rows });
            });
        });
    });
});


app.get('/players', function(req, res)
{
    let query1 = "SELECT * FROM Players;";

    db.pool.query(query1, function(error, rows, fields){

        res.render('players', {data: rows});
    })
});

app.get('/rods', function(req, res)
{
    let query1 = "SELECT * FROM Rods;";

    db.pool.query(query1, function(error, rows, fields){

        res.render('rods', {data: rows});
    })
});

app.get('/rarities', function(req, res)
{
    let query1 = "SELECT * FROM Rarities;";

    db.pool.query(query1, function(error, rows, fields){

        res.render('rarities', {data: rows});
    })
});

app.get('/player_rods', function(req, res) {
    let queryPlayers = "SELECT * FROM Players;";
    let queryRods = "SELECT * FROM Rods;";
    let queryPlayerRods = "SELECT * FROM PlayerRods;";

    db.pool.query(queryPlayers, function(error, players, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }

        db.pool.query(queryRods, function(error, rods, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }

            db.pool.query(queryPlayerRods, function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                    return;
                }

                res.render('player_rods', { players: players, rods: rods, data: rows });
            });
        });
    });
});


// Needed for player_rods
Handlebars.registerHelper('ifCond', function(v1, operator, v2, options) {
    switch (operator) {
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});



/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});