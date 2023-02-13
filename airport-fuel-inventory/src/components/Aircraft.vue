<template>
	<div>
		<div class="modal" id="addAircraft">
			<div
				class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-width"
			>
				<div class="modal-content">
					<div class="modal-header">
						<span class="modal-title">Add Aircraft</span>
						<button
							type="button"
							class="close"
							data-dismiss="modal"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<form v-on:submit="addAircraft()">
							<div class="form-group text-left">
								<label class="font-size">Aircraft:</label>
								<input
									type="text"
									class="form-control"
									v-model="aircraftForm.aircraft"
								/>
							</div>
							<div class="form-group text-left">
								<label class="font-size">Airline:</label>
								<input
									type="text"
									class="form-control"
									v-model="aircraftForm.airline"
								/>
							</div>
							<div class="form-group text-left">
								<label class="font-size">Source:</label>
								<input
									type="text"
									class="form-control"
									v-model="aircraftForm.source"
								/>
							</div>
							<div class="form-group text-left">
								<label class="font-size">Destination:</label>
								<input
									type="text"
									class="form-control"
									v-model="aircraftForm.destination"
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
				data-target="#addAircraft"
			>
				<i class="fas fa-plus-circle mr-2"></i>
				<span class="mr-2">Add Aircraft</span>
			</button>
			<table class="w-100 table table-bordered">
				<thead class="bg-light">
					<tr>
						<th>Aircraft</th>
						<th>Airline</th>
						<th>Source</th>
						<th>Destination</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-if="!aircraftList || aircraftList?.length === 0"
						class="text-muted"
					>
						<span v-if="!aircraftList">
							<i class="fas fa-spinner fa-spin mr-1"></i>
							Loading...
						</span>
						<span v-if="aircraftList?.length === 0">
							{{ errorMessage }}
						</span>
					</tr>
					<tr
						v-for="item in aircraftList"
						v-bind:key="item.aircraftId"
					>
						<td>{{ item.aircraft }}</td>
						<td>{{ item.airline }}</td>
						<td>{{ item.source }}</td>
						<td>{{ item.destination }}</td>
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
	name: 'Aircraft',
	components: {
		Navbar
	},
	data() {
		return {
			aircraftList: [],
			errorMessage: null,
			submitting: false,
			aircraftForm: {
				aircraft: null,
				airline: null,
				source: null,
				destination: null
			}
		};
	},
	mounted() {
		this.aircraftList = null;
		setTimeout(() => {
			this.fetchAircraftList();			
		}, 500);
	},
	methods: {
		fetchAircraftList() {
			this.axios.get(`${baseUrl}/aircraft`).then((res) => {
				this.aircraftList = res.data;
			})
			.catch((err) => {
					if (err.response.status == 404) {
						this.aircraftList = [];
						this.errorMessage = err.response.data;
					}
				});
		},
		addAircraft() {
			this.submitting = true;
			this.axios
				.post(`${baseUrl}/aircraft`, this.aircraftForm)
				.then((res) => {
					console.log(res);
				})
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
