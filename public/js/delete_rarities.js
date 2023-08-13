function deleteRarities(id) {
    let link = '/delete-rarities-form';
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