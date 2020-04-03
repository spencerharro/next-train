// Populate lines dropdown with available lines when page loads
$( document ).ready(function() {
    getLineList();
});

/** Populates table with next trains arriving at the specified station. */
function getNextTrainList() {
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
      for (train in response.Trains) {
    		// Add list of next trains and ETA's to page (based on selected line/station)
    		last_train.after('<tr><td>',response.Trains[train].Destination,'</td><td>',response.Trains[train].Min,'</td></tr>');
    	}
    });
}

/** Gets list of stations on the specified line and uses to populate station dropdown */
function getStationList() {
    let stations_dropdown = $('#station_dropdown');
    let lineCode = document.getElementById("line_dropdown").value;
    stations_dropdown.empty();
    stations_dropdown.append('<option selected="true" disabled>Choose Station</option>');
    stations_dropdown.prop('selectedIndex',0);

    var stationListQuery = {
        "async": true,
        "crossDomain": true,
        "dataType": "json",
        "url":"https://api.wmata.com/Rail.svc/json/jStations?LineCode=" + lineCode + "&api_key=5b45d3ada42b4e9eba0f40533ca20a6d",
        "method": "GET"
    }

    $.ajax(stationListQuery)

    .done(function (response) {
        for (index in response.Stations) {
          // add stations on the selected line to the stations dropdown
          stations_dropdown.append($('<option></option>').attr('value', response.Stations[index].Code).text(response.Stations[index].Name));
        }
    });
}

/** Gets available WMTA lines and uses to populate lines dropdown */
function getLineList() {
  let lines_dropdown = $('#line_dropdown');
  lines_dropdown.empty();
  lines_dropdown.append('<option selected="true" disabled>Choose Line</option>');
  lines_dropdown.prop('selectedIndex',0);
  var lineListQuery = {
    "async": true,
    "crossDomain": true,
    "dataType":"json",
    "url":"https://api.wmata.com/Rail.svc/json/jLines?api_key=5b45d3ada42b4e9eba0f40533ca20a6d",
    "method":"GET"
  }
  $.ajax(lineListQuery)

  .done(function (response) {
    for (index in response.Lines) {
      //add line to line dropdown
      lines_dropdown.append($('<option></option>').attr('value', response.Lines[index].LineCode).text(response.Lines[index].DisplayName));
    }
  })
}
