function avp(start_date, end_date, id_room, disponible){
    prepare_obj = {}
    // prepare_obj.room_id = 907738602
    prepare_obj.room_id = id_room
    prepare_obj.field_name = "rooms_to_sell"
    prepare_obj.field_value = disponible
    prepare_obj.from_date = start_date
    prepare_obj.until_date = end_date
    data = {}
    data.update = []
    data.update.push(prepare_obj)
    data.status_reason = "1"
    // JSON.stringify(data)
    
    final_obj = {}
    final_obj.request = JSON.stringify(data)
    console.log(JSON.stringify(final_obj))
    
    // let ses = "03b3840e94bab6edad6aa5f7b493efef";
    let ses = document.location.href.split('ses=')[1].split('&')[0];
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", `https://admin.booking.com/fresa/extranet/inventory/update?lang=es&ses=${ses}&hotel_id=9077386&hotel_account_id=15017980`, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
            // var json = JSON.parse(xhr.responseText);
            // console.log(json.netlify);
        }
    };
    xhr.send(JSON.stringify(final_obj));
}

function chrome_ranges(data){
    for (let i = 0; i < data.length; i++) {
        const el = data[i];
        avp(el.d, el.d, el.r, el.a);
    }
}

