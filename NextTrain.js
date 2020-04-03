function getNextTrain() {
    let last_train = $('#trainTable tr:last');
    let stationCode = document.getElementById("station_dropdown").value;
    var query = {
        "async": true,
        "crossDomain": true,
        "dataType": "json",
        "url": "https://api.wmata.com/StationPrediction.svc/json/GetPrediction/" + stationCode + "?api_key=5b45d3ada42b4e9eba0f40533ca20a6d",
        "method": "GET"
    }

    $.ajax(query)

    .done(function (response) {
        for (train in response.Trains)
	{
		//Add train info to page
		last_train.after('<tr><td>',response.Trains[train].Destination,'</td><td>',response.Trains[train].Min,'</td></tr>');
	}
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
        "url":"https://api.wmata.com/Rail.svc/json/jStations?RD?&api_key=5b45d3ada42b4e9eba0f40533ca20a6d",
        "method": "GET"
    }

    $.ajax(stationListQuery)

    .done(function (response) {
        for (index in response.Stations) {
            stations_dropdown.append($('<option></option>').attr('value', response.Stations[index].Code).text(response.Stations[index].Name));
        }
    });
}
