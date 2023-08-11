// Get the objects we need to modify
let addFishForm = document.getElementById('addThing');

// Modify the objects we need
addFishForm.addEventListener("submit", function (e) {

    //console.log("in submit portion")
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    // let input_rarity_id = document.getElementById("input-rarity_id");
    let input_name = document.getElementById("input-name");
    let input_color = document.getElementById("input-color");
    let input_description = document.getElementById("input-description");
    let input_favorite_movie = document.getElementById("input-favorite-movie");

    // Get the values from the form fields
    //let rarity_id_value = input_rarity_id.value;
    let name_value = input_name.value;
    let color_value = input_color.value;
    let description_value = input_description.value;
    let favorite_movie_value = input_favorite_movie.value

    // Put our data we want to send in a javascript object
    let data = {
        // rarity_id: rarity_id_value,
        name: name_value,
        color: color_value,
        description: description_value,
        favorite_movie: favorite_movie_value
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-fish", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            // input_rarity_id.value = '';
            input_name.value = '';
            input_color.value = '';
            input_description.value = '';
            input_favorite_movie.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("Fishes-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let blank_row = document.createElement("TD");
    let fish_id_cell = document.createElement("TD");
    // let rarity_id_cell = document.createElement("TD");
    let name_cell = document.createElement("TD");
    let color_cell = document.createElement("TD");
    let description_cell = document.createElement("TD");
    let favorite_movie_cell = document.createElement("TD");

    // Fill the cells with correct data
    fish_id_cell.innerText = newRow.fish_id;
    // rarity_id_cell.innerText = newRow.rarity_id;
    name_cell.innerText = newRow.name;
    color_cell.innerText = newRow.color;
    description_cell.innerText = newRow.description;
    favorite_movie_cell.innerText = newRow.favorite_movie;

    // Add the cells to the row 
    row.appendChild(blank_row);
    row.appendChild(blank_row);
    row.appendChild(fish_id_cell);
    // row.appendChild(rarity_id_cell);
    row.appendChild(name_cell);
    row.appendChild(color_cell);
    row.appendChild(description_cell);
    row.appendChild(favorite_movie_cell);

    // Add the row to the table
    currentTable.appendChild(row);
}