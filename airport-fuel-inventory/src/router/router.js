import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/Login.vue';
import Airport from '../components/Airport.vue';
import Aircraft from '../components/Aircraft.vue';
import Transaction from '../components/Transaction.vue';
import AirportConsumptionReport from '../components/Reports/AirportConsumptionReport.vue';
import FuelConsumptionReport from '../components/Reports/FuelConsumptionReport.vue';

Vue.use(VueRouter);

const routes = [
	{ path: '/', component: Login },
	{ path: '/airport', component: Airport },
	{ path: '/aircraft', component: Aircraft },
	{ path: '/transaction', component: Transaction },
	{ path: '/airportConsumptionReport', component: AirportConsumptionReport },
	{ path: '/fuelConsumptionReport', component: FuelConsumptionReport }
];

export default new VueRouter({
	routes,
	mode: 'history'
});
