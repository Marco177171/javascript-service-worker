console.log('In main function');

if (navigator.serviceWorker) {
	console.log('Service workers supported');
	window.addEventListener('load', () => {
		navigator.serviceWorker
		.register('/javascript/service-worker.js') // register the js file of the worker
		.then(reg => console.log('Service worker registered'))
		.catch(err => console.error('ERROR: ', err))
	})
}