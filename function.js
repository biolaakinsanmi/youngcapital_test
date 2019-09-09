const stations = require('./stations.json');

/**
 * function to calculate cost of fare between two stations
 * @param {string} stationA - name of a station on the route
 * @param {string} stationB - name of a station on the route
 */
getRideCost = (stationA, stationB)=>{
  let fromIndex = getStationPosition(stationA); //Get index of starting station
  let toIndex = getStationPosition(stationB); //Get index of stopping station

  //If start or stop station name not found in route station list...
  if(fromIndex === null || toIndex === null){
    //Display the message below.
    console.log(
      `
      ${'*************'}
      Oops! Train station not in this route: 
      ------------
      ${(!fromIndex)? '*' + stationA.toUpperCase() + '*' :''}  ${(!toIndex)? '*' + stationB.toUpperCase() + '*' :''} 
      ${'*************'}
      `
    );
    return;
  }
  
  //else, init needed vairables
  let stopsCount = Math.abs(fromIndex - toIndex); //count of station stops
  let direction = fromIndex > toIndex? 'UP': 'DOWN'; //direction of trip
  let totalFare = 0;  //keep track of total fare
  let tripDetails = ''; //Details about the trip stored here

  if(stopsCount === 0){  //if no station stops...
    //log message that he start station is same as stop station
    console.log(
      `
      ${'*************'}
      Hey! Train is still on the same spot. No fare charged. 
      ------------
      You are still at the station: ${stationA.toUpperCase()}.

      Total Fare is €0.00.
      ${'*************'}
      `
    );
    return;
  }


  /**
   * Loop routes to calculate fares based on stops
   * fare at starting station is not calculated
   * (loop direction is based on pre calculated direction) 
   */
  for(
    let i = direction === 'DOWN'? fromIndex+1: fromIndex-1; 
    direction === 'DOWN'? i <= toIndex : i >= toIndex ;
    direction === 'DOWN'? i++ : i-- ){
      //concatenate trip details 
      tripDetails += `   ||
         \\/
      * ${stations[i].name} ... €${stations[i].passFare}.00
      ${i === toIndex? '<<END' : ''}`

      //update trip fare cost for every station passed
      totalFare += stations[i].passFare;
  }
  

  //Log final trip fare and details
  console.log(
    `
    ${'*************'}
    Your trip from ${stationA.toUpperCase()} TO ${stationB.toUpperCase()} is complete.
    ------------
    Direction: ${direction}
    Stations on trip: ${stopsCount} Stations

      START>>
      * ${stationA}
      ${tripDetails}
    Total Fare is €${totalFare}.00.
    THANK YOU.
    ${'*************'}
    `
  );
  return;
}


/**
 * Get index position of station on Route
 * @param {string} name - name of a station
 */
getStationPosition = (name)=>{
  let index = null;
  stations.some(
    (s, i)=>{
      if(s.name.toLowerCase() == name.toLowerCase()){
        index = i;
        return true;
      }
      else{
        return false;
      }
    }
  )
  return index;
}


/**
 * ///////////////////////////////////////////
 * Main Call for function to calculate cost of fare between two stations. 
 * Pass two strings of two stations on the route to calculate the cost of
 * fare between them.
 * @param {string} start - starting station
 * @param {string} stop - stopping station
 */
getRideCost('Europaplein', 'Central Station')