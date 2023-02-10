/**
 * 
 * @param {*} routes 
 * @returns the graph (planetList)
 * @desc Construct adjacency matrix for the graph
 */
function buildAdjencyMatrix(routes) {
	let planets = new Set();
	routes.forEach((trip) => {
		planets.add(trip.origin);
		planets.add(trip.destination);
	});

	let planets_list = [];
	planets.forEach((planet) => {
		let planet_routes = [];
        planet_routes.push({
            name: planet,
            travel_time: 1 
        })
		routes.forEach((trip) => {
			if (trip.origin === planet || trip.destination === planet) {
			    planet_routes.push({
					name: `${trip.origin === planet ? trip.destination : trip.destination === planet ? trip.origin : ''}`,
					travel_time: trip.travel_time
				});
			} 
		});

	planets_list.push({ name: planet, routes: planet_routes });
	});

	return planets_list;
}

module.exports = buildAdjencyMatrix