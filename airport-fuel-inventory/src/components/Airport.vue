<template>
	<div>
		<div class="modal" id="addAirport">
			<div
				class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-width"
			>
				<div class="modal-content">
					<div class="modal-header">
						<span class="modal-title">Add Airport</span>
						<button
							type="button"
							class="close"
							data-dismiss="modal"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<form v-on:submit="addAirport()">
							<div class="form-group text-left">
								<label class="font-size">Airport:</label>
								<input
									type="text"
									class="form-control"
									v-model="airportForm.airport"
								/>
							</div>
							<div class="form-group text-left">
								<label class="font-size">Fuel Available:</label>
								<input
									type="number"
									class="form-control"
									v-model="airportForm.fuelAvailable"
								/>
							</div>
							<div class="form-group text-left">
								<label class="font-size">Fuel Capacity:</label>
								<input
									type="number"
									class="form-control"
									v-model="airportForm.fuelCapacity"
								/>
							</div>
							<div
								class="d-flex justify-content-center pt-4 pb-3"
							>
								<button
									class="login-button text-white"
									v-bind:class="[
										submitting ? 'button-disable' : ''
									]"
								>
									Add
									<i
										class="fas fa-spinner fa-spin ml-1"
										v-if="submitting"
									></i>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>

		<Navbar />
		<div class="m-auto table-container py-3 d-flex flex-column">
			<button
				type="button"
				class="btn btn-outline-primary btn-sm mr-auto button-width mb-4"
				data-toggle="modal"
				data-target="#addAirport"
			>
				<i class="fas fa-plus-circle mr-2"></i>
				<span class="mr-2">Add Airport</span>
			</button>
			<table class="w-100 table table-bordered">
				<thead class="bg-light">
					<tr>
						<th>Airport</th>
						<th>Fuel Capacity</th>
						<th>Fuel Available</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-if="!airportList || airportList?.length === 0"
						class="text-muted"
					>
						<span v-if="!airportList">
							<i class="fas fa-spinner fa-spin mr-1"></i>
							Loading...
						</span>
						<span v-if="airportList?.length === 0">
							{{ errorMessage }}
						</span>
					</tr>
					<tr v-for="item in airportList" v-bind:key="item.airportId">
						<td>{{ item.airport }}</td>
						<td>{{ item.fuelCapacity }}</td>
						<td>{{ item.fuelAvailable }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import Navbar from './Navbar.vue';
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { baseUrl } from '../baseUrl/baseUrl';
Vue.use(VueAxios, axios);

export default {
	name: 'Airport',
	components: {
		Navbar
	},
	data() {
		return {
			airportList: [],
			submitting: false,
			errorMessage: null,
			airportForm: {
				airport: null,
				fuelCapacity: null,
				fuelAvailable: null
			}
		};
	},
	mounted() {
		this.airportList = null;
		setTimeout(() => {
			this.fetchAirportList();
		}, 500);
	},
	methods: {
		fetchAirportList() {
			this.axios
				.get(`${baseUrl}/airport`)
				.then((res) => {
					this.airportList = res.data;
				})
				.catch((err) => {
					if (err.response.status == 404) {
						this.airportList = [];
						this.errorMessage = err.response.data;
					}
				});
		},
		addAirport() {
			this.submitting = true;
			this.axios
				.post(`${baseUrl}/airport`, this.airportForm)
				.then((res) => {
					console.log(res);
				});
		}
	}
};
</script>

<style scoped>
.table-container {
	width: 70%;
}

.button-width {
	width: 150px;
}

.modal-width {
	width: 400px;
}

.modal-header {
	background-color: #f3f5f7;
	border-bottom: 1px solid #cce0e4;
	height: 48px;
}

.modal-body {
	padding: 2rem;
}

.font-size {
	font-size: 0.9rem;
}

.login-button {
	background-color: #367;
	width: 140px;
	border: 1px solid #367;
	padding: 2px;
}

.button-disable {
	background-color: #6c757d;
	border: 1px solid #6c757d;
}
</style>
