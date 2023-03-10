import Vue from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import router from './router/router';

new Vue({
	el: '#app',
	router,
	render: (h) => h(App)
});
