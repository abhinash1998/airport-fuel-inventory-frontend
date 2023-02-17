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
	if (!token) {
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
	{
		path: '/airport-consumption-report',
		component: AirportConsumptionReport
	},
	{ path: '/fuel-consumption-report', component: FuelConsumptionReport }
	// { path: '**', component: Login }
];

export default new VueRouter({
	routes,
	mode: 'history'
});
