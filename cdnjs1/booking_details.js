json = JSON.parse(window.__GOLEM__);

total = 0;
for (let i = 0; i < json.initialState.roomReservations.length; i++) {
    json.initialState.roomReservations[i].status.cancellationByGuest.happened == 0 ? total +=1 : null;
}

headers = {
    // isGenius: 1,
    isGenius: json.initialState.guestDetails.isGenius,
    guestDetails: json.initialState.guestDetails,
    bookingNumber: json.initialState.bookingNumber,
    property: json.initialState.context.hotel_id,
    bookDate: json.initialState.bookDate,
    arrivalTime: json.initialState.arrivalTime.time,
    // importantInfo: json.initialState.importantInfo,
    price: json.initialState.price,
    // total: json.initialState.roomReservations.length,
    total: total,
    reservationStatus: json.initialState.reservationStatus,
    initialMsg: json.initialState.importantInfo.length != 0 ? json.initialState.importantInfo[0].value : '',
    arrivalMsg: json.initialState.arrivalTime.time != undefined ? json.initialState.arrivalTime.time.isNextDay ? `Arribaré al Hotel al día siguiente, aprox. a las ${json.initialState.arrivalTime.time.from}` : `Arribaré al Hotel aprox. a las ${json.initialState.arrivalTime.time.from}` : '',
    nsign: window.nsign,
};

for (let i = 0; i < json.initialState.roomReservations.length; i++) {
    json.initialState.roomReservations[i].header = headers;
    // json.initialState.roomReservations[i].guest = "hola";
    (json.initialState.roomReservations[i].guest.name.length == 0) ? json.initialState.roomReservations[i].guest.name = json.initialState.guestDetails.name : null

}

// window.data_chrome_loads = json.initialState.roomReservations;
// location.href = "https://conocelasbanderas.com/dfdf";
// console.log(json.initialState.roomReservations);

eBookingEngine = document.createElement('span');
// eBookingEngine.innerText = btoa(JSON.stringify(json.initialState.roomReservations));
eBookingEngine.innerText = JSON.stringify(json.initialState.roomReservations);
eBookingEngine.outerHTML;

