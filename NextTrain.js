//$(document).ready(getStationList() {
//    console.log("ready");
//})

function getNextTrain() {
    let next_train_destination = $('#next_train_destination');
    let next_train_time = $('#next_train_time');
    let stationCode = document.getElementById("station_dropdown").value;
    console.log("stationCode " + stationCode);
    var query = {
        "async": true,
        "crossDomain": true,
        "dataType": "json",
        "url": "https://api.wmata.com/StationPrediction.svc/json/GetPrediction/" + stationCode + "?api_key=e13626d03d8e4c03ac07f95541b3091b",
        "method": "GET"
    }

    $.ajax(query)

    .done(function (response) {
        console.log(response);

        next_train_destination.text(response.Trains[0].Destination);
        next_train_time.text(response.Trains[0].Min);
    });
}

function getStationList() {
    let stations_dropdown = $('#station_dropdown');
    stations_dropdown.empty();
    stations_dropdown.append('<option selected="true" disabled>Choose Station</option>');
    stations_dropdown.prop('selectedIndex',0);

    var stationListQuery = {
        "async": true,
        "crossDomain": true,
        "dataType": "json",
        "url":"https://api.wmata.com/Rail.svc/json/jStations?RD?&api_key=e13626d03d8e4c03ac07f95541b3091b",
        "method": "GET"
    }

    $.ajax(stationListQuery)

    .done(function (response) {
        console.log(response);
        for (index in response.Stations) {
            stations_dropdown.append($('<option></option>').attr('value', response.Stations[index].Code).text(response.Stations[index].Name));
        }
    });
}
