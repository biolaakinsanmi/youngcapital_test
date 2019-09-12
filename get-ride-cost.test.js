const getRideCost = require ('./get-ride-cost');
let fareResults;

//Test cost when travelling up route between stations
test('cost from Europaplein to Central Station to be equal to 60', () => {
  let fareResults = getRideCost('Europaplein', 'Central Station');
  expect(fareResults.totalFare).toBe(60);
});

//Test cost when travelling down route between stations
test('cost from Noord to Vijzelgracht to be equal to 50', () => {
  fareResults = getRideCost('Noord', 'Vijzelgracht')
  expect(fareResults.totalFare).toBe(50);
});

//Test cost when travelling from a station not existing on the route, to a station on the route
test('cost from an invalid station to a valid station to be null', () => {
  fareResults = getRideCost('Zuid', 'Rokin')
  expect(fareResults.totalFare).toBe(0);
});

//Test cost when travelling between stations not existing on the route
test('cost from an invalid station to another invalid station to be null', () => {
  fareResults = getRideCost('Zuid', 'Lelylaan')
  expect(fareResults.totalFare).toBe(0);
});

//Test cost when start station and end station are both the same
test('cost from a station to the same station to be 0', () => {
  fareResults = getRideCost('Noord', 'Noord')
  expect(fareResults.totalFare).toBe(0);
});

//Test if travel direction UP is correct
test('travel direction from Europaplein to Central Station to be equal to UP', () => {
  let fareResults = getRideCost('Europaplein', 'Central Station');
  expect(fareResults.direction).toBe('UP');
});

//Test if travel direction DOWN is correct
test('travel direction from Vijzelgracht to De Pijp to be equal to DOWN', () => {
  let fareResults = getRideCost('Vijzelgracht', 'De Pijp');
  expect(fareResults.direction).toBe('DOWN');
});

//Test count of stations on trp is correct
test('number of station stops from Europaplein to Central Station to be equal to 4', () => {
  let fareResults = getRideCost('Europaplein', 'Central Station');
  expect(fareResults.stationStops).toBe(4);
});