function deleteRods(id) {
    let link = '/delete-rods-form';
    let data = {
        id: id
    };

    $.ajax({
        url: link,
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            // deleteRow(id);
        }
    });
}