/** Populate lines dropdown with available lines when page loads */
$( document ).ready(function() {
    getLineList();
    createNextTrainTable();
});

// refresh train data every periodically
setInterval(getNextTrainList, 25000);

/** Populates table with next trains arriving at the specified station. */
function getNextTrainList() {
    let stationCode = document.getElementById("station_dropdown").value;
    eraseNextTrainTable();
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
        insertNextTrainTable(response.Trains[train].Line,
          response.Trains[train].DestinationName,
          response.Trains[train].Min)
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
      //sort stations by Code.  First by high A's then by low B's.
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

/** Initializes the next train table */
function createNextTrainTable() {
  // Create next train table and initialize the header
  nextTrainTbl = document.getElementById('trainTable');
  header = nextTrainTbl.createTHead();
  headerRow = nextTrainTbl.insertRow(0);
  headerRow.insertCell(0).innerHTML = "<b>Line</b>";
  headerRow.insertCell(1).innerHTML = "<b>Destination</b>";
  headerRow.insertCell(2).innerHTML = "<b>Departs In (Min)</b>";
  headerRow.style.backgroundColor = "#D3D3D3";   // light grey
}

/** Erases all of the next trains so that table can repopulate with new destinations/times */
function eraseNextTrainTable() {
  // Erase next train table (except for header (row 1))
  nextTrainTbl = document.getElementById('trainTable');
  while(nextTrainTbl.rows.length > 1) {
    nextTrainTbl.deleteRow(1);
  }
}

/** Adds train destination and time details to next train table
*
* @param {string} line The 2-letter line color code
* @param {string} dest The desination of the trains
* @param {string} time The time until train arrives at station
*/
function insertNextTrainTable(line, dest, time) {
  // Insert next train destination (dest) and departs in (time) into next train table
  nextTrainTbl = document.getElementById('trainTable');
  row = nextTrainTbl.insertRow();
  row.style.backgroundColor = "#F8F8F8";  // slight off-white

  line_cell = row.insertCell(0);
  line_cell.innerHTML = line;

  dest_cell = row.insertCell(1);
  dest_cell.innerHTML = dest;

  time_cell = row.insertCell(2);
  time_cell.innerHTML = time;

  // train boarding
  if(time == "BRD") {
    row.style.color = "red";
  }
  // train arriving
  else if(time == "ARR") {
    row.style.color = "orange";
  }
  // train still enroute
  else {
    row.style.color = "black";
  }
}
