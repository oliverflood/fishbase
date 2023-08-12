function deleteFish(id) {
    let link = '/delete-fish-form';
    let data = {
        id: id
    };

    $.ajax({
        url: link,
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            deleteRow(id);
        }
    });
}

function deleteRow(fishID){
    // let table = document.getElementById("Fishes");
    // for (let i = 0, row; row = table.rows[i]; i++) {
    //     if (table.rows[i].getAttribute("data-value") == fishID) {
    //         table.deleteRow(i);
    //         break;
    //     }
    // }
}