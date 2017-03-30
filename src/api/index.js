import { version } from '../../package.json';
import { Router } from 'express';
import * as googleMaps from '@google/maps';

export default ({ config, db }) => {
	let api = Router();

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		console.log(process.env.GOOGLE_PLACE_API_KEY);
		googleMaps.createClient({
			key:process.env.GOOGLE_PLACE_API_KEY
		})
		googleMaps.places({
      query: 'fast food',
      language: 'en',
      location: [-33.865, 151.038],
      radius: 5000,
      minprice: 1,
      maxprice: 4,
      opennow: true,
      type: 'restaurant'
    })
    .asPromise()
    .then(function(response) {
			console.log(response);
    })
		res.json({ version });
	});

	return api;
}
