import { version } from '../../package.json';
import { Router } from 'express';
import * as _ from 'lodash';
const q = require('q');
var Promise = q.Promise;
var googleMaps = require('@google/maps').createClient({
	Promise: Promise,
  key:process.env.GOOGLE_PLACE_API_KEY
});

export default ({ config, db }) => {
	let api = Router();

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		console.log(process.env.GOOGLE_PLACE_API_KEY);
		const restaurantPromise = googleMaps.places({
      location: [39.0976763,-77.03652979999998],
      radius: 5000,
      type: 'restaurant'
    })
    .asPromise()
		const barPromise = googleMaps.places({
			location: [39.0976763,-77.03652979999998],
			radius: 5000,
			type: 'bar'
		})
		.asPromise()
		const activityPromise = googleMaps.places({
			location: [39.0976763,-77.03652979999998],
			radius: 5000,
			type: 'museum'
		})
		.asPromise()
		q.all([
			restaurantPromise,
			barPromise,
			activityPromise
		]).spread(function(restaurants,bars,activities){
			const restaurant = _.sample(restaurants.json.results);
			const bar = _.sample(bars.json.results);
			const activity = _.sample(activities.json.results);
			res.json({ restaurant, bar, activity });
		})
		.catch( e => {
			console.log(e)
		})
	});

	return api;
}
