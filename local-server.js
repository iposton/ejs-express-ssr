'use strict';

import app from './express/server.js';
const port = 3000

app.listen(port, function(err) {
	if(err) throw err
	console.log('Server running on port '+port)
})