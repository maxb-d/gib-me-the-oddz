/**
 * 
 * @param {*} routes 
 * @returns 
 * @desc Construct adjacency matrix for the graph
 */
function buildAdjencyMatrix(routes) {
	let planets = new Set();
	routes.forEach((trip) => {
		planets.add(trip.origin);
		planets.add(trip.destination);
	});

	let planetsList = [];
	planets.forEach((planet) => {
		let planet_routes = [];
        planet_routes.push({
            name: planet,
            travelTime: 1 
        })
		routes.forEach((trip) => {
			if (trip.origin === planet || trip.destination === planet) {
			    planet_routes.push({
					name: `${trip.origin === planet ? trip.destination : trip.destination === planet ? trip.origin : ''}`,
					travelTime: trip.travel_time
				});
			} 
		});

	planetsList.push({ name: planet, routes: planet_routes });
	});

	return planetsList;
}

module.exports = buildAdjencyMatrix