const stations = require("./stations.json");

/**
 * function to calculate cost of fare between two stations
 * @param {string} stationA - name of a station on the route
 * @param {string} stationB - name of a station on the route
 */
getRideCost = (stationA, stationB) => {
  let totalFare = null, // total fare
    direction = null, // travel direction
    stationStops = null; // number of stations passed

  let fromIndex = getStationPosition(stationA); //Get index of starting station
  let toIndex = getStationPosition(stationB); //Get index of stopping station

  //If start or stop station name not found in route station list...
  if (fromIndex === null || toIndex === null) {
    totalFare = 0;
    direction = null;
    stationStops = 0;
  } 
  else {
    //else, init needed vairables
    stationStops = Math.abs(fromIndex - toIndex); //count of station stops
    direction = fromIndex > toIndex ? "UP" : "DOWN"; //direction of trip

    //if no stops passed i.e. train did not move
    if (stationStops === 0) {
      totalFare = 0;
      direction = null;
    } 
    else {
      //Loop routes to calculate fares based on stops; fare at starting station is not calculated
      for (
        let i = direction === "DOWN" ? fromIndex + 1 : fromIndex - 1; //start from next station, based on direction
        direction === "DOWN" ? i <= toIndex : i >= toIndex; 
        direction === "DOWN" ? i++ : i-- //incremebt or decrement based on direction
      ) {
        //update trip fare cost for every station passed
        totalFare += stations[i].passFare;
      }
    }
  }

  return {
    totalFare: totalFare,
    direction: direction,
    stationStops: stationStops
  };
};

/**
 * Get index position of station on Route
 * @param {string} name - name of a station
 */
getStationPosition = name => {
  let index = null;

  stations.some ((s, i) => {
    if (s.name.toLowerCase() == name.toLowerCase()) {
      index = i;
      return true;
    } else {
      return false;
    }
  });
  
  return index;
};

module.exports = getRideCost;
