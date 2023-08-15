function deletePlayerRods(player_rod_id, player_id, rod_id) {
    let link = '/delete-player-rods-form';
    let data = {
        player_id: player_id,
        rod_id: rod_id
    };

    $.ajax({
        url: link,
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            deleteRow(player_rod_id);
        }
    });
}
