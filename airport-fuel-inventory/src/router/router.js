import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/Login.vue';
import Airport from '../components/Airport.vue';
import Aircraft from '../components/Aircraft.vue';
import Transaction from '../components/Transaction.vue';
import AirportConsumptionReport from '../components/Reports/AirportConsumptionReport.vue';
import FuelConsumptionReport from '../components/Reports/FuelConsumptionReport.vue';

Vue.use(VueRouter);

const isAuthenticated = (to, from, next) => {
	const token = localStorage.getItem('token');
	// console.log(token);
	if (!token && to.name != 'Login') {
		console.log(token);
		next({
			name: 'Login',
			path: '/'
			// query: { redirect: to.fullPath }
		});
	} else next();
};

const routes = [
	{ path: '/', component: Login },
	{ path: '/airport', component: Airport, beforeEnter: isAuthenticated },
	{ path: '/aircraft', component: Aircraft },
	{ path: '/transaction', component: Transaction },
	{ path: '/airportConsumptionReport', component: AirportConsumptionReport },
	{ path: '/fuelConsumptionReport', component: FuelConsumptionReport }
	// { path: '**', component: Login }
];

export default new VueRouter({
	routes,
	mode: 'history'
});
