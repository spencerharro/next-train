function getNextTrain() {
    var query = {
        "async": true,
        "crossDomain": true,
        "dataType": "json",
        "url": "https://api.wmata.com/StationPrediction.svc/json/GetPrediction/A01?=\"A01\"&api_key=e13626d03d8e4c03ac07f95541b3091b",
        "method": "GET"
    }

    $.ajax(query)

    .done(function (response) {
        console.log(response);

        $("#next_train_destination").text(response.Trains[0].Destination);
        $("#next_train_time").text(response.Trains[0].Min);
    });
}

function getStationList() {
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
        let stationsList = [];
        let stationCodes = [];
        for (index in response.Stations) {
            stationsList[index] = response.Stations[index].Name;
            stationCodes[index] = response.Stations[index].Code;
            console.log("Station: " + stationsList[index][0] + " (" + stationsList[index][1] + ")" );
        }
    });
}
