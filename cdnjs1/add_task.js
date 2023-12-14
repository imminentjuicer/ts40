
async function calcularHash(text) {
  const buffer = new TextEncoder().encode(text);

  // Devuelve el hash SHA-256 del buffer
  const hash = await crypto.subtle.digest('SHA-256', buffer);

  // Convierte el hash en un array de bytes y luego a una cadena hex
  const hashArray = Array.from(new Uint8Array(hash));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return hashHex;
}


async function procesarReservaciones(reservas) {
  const ids = [];
  for (const reserva of reservas) {
      hash = await procesarReserva(reserva);
      ids.push({id: reserva.id, reservationStatus: reserva.reservationStatus, sign: hash});
  }
  
  // Todas los async han sido procesados
  // console.log(ids);
  document.getElementById("date_from").setAttribute("data-from", btoa(JSON.stringify(ids)));

}

async function procesarReserva(element) {
  const rooms = [];
  element.rooms.forEach(room => {
  rooms.push({name: room.name, quantity: room.quantity});
  });
  rooms.sort((a, b) => a.name.localeCompare(b.name));
  sign = {id: element.id,reservationStatus: element.reservationStatus, guestName: element.guestName, checkin: element.checkin, checkout:element.checkout, price: element.price.amount, rooms: rooms};
  const hash = await calcularHash(JSON.stringify(sign));
  return hash;
}

function retrieve_list(){
  date_ranges = retrieveRangeDates();


  let ses = document.location.href.split('ses=')[1].split('&')[0].split('#')[0];

  prepare_obj = {}
  prepare_obj.perpage = 100;
  prepare_obj.page = 1;
  prepare_obj.hotel_id = document.getElementById('hotel_id').value;
  prepare_obj.lang = "es";
  prepare_obj.date_type = date_ranges.type; // arrival
  prepare_obj.date_from = date_ranges.from; // "2023-02-28"
  prepare_obj.date_to = date_ranges.to;
  prepare_obj.ses = ses;
  prepare_obj.token = document.querySelector('input[name="token"]').value;
  prepare_obj.genius_rates = false;
  prepare_obj.user_triggered_search = 1;

  const params = objectToUrlParams(prepare_obj);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", `https://admin.booking.com/fresa/extranet/reservations/retrieve_list_v2?${params}`, true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

  xhr.setRequestHeader("x-booking-client-info", 'function(){return Je.a.tracked&&Je.a.tracked()}');
  xhr.setRequestHeader("x-booking-csrf", document.querySelector('input[name="token"]').value);
  xhr.setRequestHeader("x-booking-info", 'function(){return document&&document.getElementById("req_info")?document.getElementById("req_info").innerHTML:""}');
  xhr.setRequestHeader("x-booking-language-code", "es");
  xhr.setRequestHeader("x-booking-pageview-id", $u.js_data.PAGEVIEW_ID);
  xhr.setRequestHeader("x-booking-sitetype-id", 31);

  // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          // console.log(xhr.responseText);
          var json = JSON.parse(xhr.responseText);
          procesarReservaciones(json.data.reservations);
      }
  };
  // xhr.send(JSON.stringify(prepare_obj));
  xhr.send();
}

function retrieveRangeDates(){
  options = [
    {type: "arrival", start: 1, end: 30},
    {type: "booking", start: 2, end: 2},
    {type: "arrival", start: 1, end: 30},
  ]
  selected = options[Math.floor(Math.random() * 3)]
  // selected = options[1]
  var today = new Date();
  today.setDate(today.getDate() - selected.start);
  var endDate = new Date();
  endDate.setDate(today.getDate() + selected.end);
  var startDateStr = today.toISOString().slice(0, 10);
  var endDateStr = endDate.toISOString().slice(0, 10);
  return {from: startDateStr, to: endDateStr, type: selected.type}
}

function objectToUrlParams(obj) {
  const params = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  }
  return params.join('&');
}

retrieve_list();



// // Checkin
// // Obtener la fecha actual
// var today = new Date();
// today.setDate(today.getDate() - 1);

// // Obtener la fecha en 10 días
// var endDate = new Date();
// endDate.setDate(today.getDate() + 10);

// // Formatear las fechas en formato YYYY-MM-DD
// var startDateStr = today.toISOString().slice(0, 10);
// var endDateStr = endDate.toISOString().slice(0, 10);

// // Imprimir las fechas
// console.log("Fecha inicial: " + startDateStr);
// console.log("Fecha final: " + endDateStr);

