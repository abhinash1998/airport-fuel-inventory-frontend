<template>
	<div>
		<div class="modal" id="addTransaction">
			<div
				class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-width"
			>
				<div class="modal-content">
					<div class="modal-header">
						<span class="modal-title">Add Transaction</span>
						<button
							type="button"
							class="close"
							data-dismiss="modal"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<form v-on:submit="addTransaction()">
							<div class="form-group text-left">
								<label class="font-size">
									Transaction Type:
								</label>
								<select
									class="form-control"
									v-model="transactionForm.transactionType"
								>
									<option
										selected
										disabled
										class="text-muted"
									>
										Select
									</option>
									<option value="In">In</option>
									<option value="Out">Out</option>
								</select>
							</div>
							<div class="form-group text-left">
								<label class="font-size">Airport:</label>
								<select
									class="form-control"
									v-model="transactionForm.airport"
								>
									<option
										selected
										disabled
										class="text-muted"
									>
										Select Airport
									</option>

									<option
										v-for="item in airportList"
										:value="item.airport"
										v-bind:key="item.airportId"
									>
										{{ item.airport }}
									</option>
								</select>
							</div>
							<div class="form-group text-left">
								<label class="font-size">Aircraft:</label>
								<select
									class="form-control"
									v-model="transactionForm.aircraft"
								>
									<option
										selected
										disabled
										class="text-muted"
									>
										Select Aircraft
									</option>

									<option
										v-for="item in aircraftList"
										:value="item.aircraft"
										v-bind:key="item.aircraftId"
									>
										{{ item.aircraft }}
									</option>
								</select>
							</div>
							<div class="form-group text-left">
								<label class="font-size">Quantity:</label>
								<input
									type="number"
									class="form-control"
									v-model="transactionForm.quantity"
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
				data-target="#addTransaction"
			>
				<i class="fas fa-plus-circle mr-2"></i>
				<span class="mr-2">Add Transaction</span>
			</button>
			<table class="w-100 table table-bordered">
				<thead class="bg-light">
					<tr>
						<th>Transaction Date</th>
						<th>Transaction Type</th>
						<th>Aircraft</th>
						<th>Airport</th>
						<th>Quantity</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-if="!transactionList || transactionList?.length === 0"
						class="text-muted"
					>
						<span v-if="!transactionList">
							<i class="fas fa-spinner fa-spin mr-1"></i>
							Loading...
						</span>
						<span v-if="transactionList?.length === 0">
							{{ errorMessage }}
						</span>
					</tr>
					<tr
						v-for="item in transactionList"
						v-bind:key="item.transactionId"
					>
						<td>{{ item.transactionDate }}</td>
						<td>{{ item.transactionType }}</td>
						<td>{{ item.aircraft }}</td>
						<td>{{ item.airport }}</td>
						<td>{{ item.quantity }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import Navbar from './Navbar.vue';
import axios from '../helpers/axios';

export default {
	name: 'Transaction',
	components: {
		Navbar
	},
	data() {
		return {
			transactionList: [],
			errorMessage: null,
			airportList: [],
			aircraftList: [],
			submitting: false,
			transactionForm: {
				transactionType: null,
				airport: null,
				aircraft: null,
				quantity: null
			}
		};
	},
	mounted() {
		this.transactionList = null;
		setTimeout(() => {
			this.fetchTransactionList();
		}, 500);
		this.fetchAirportList();
		this.fetchAircraftList();
	},
	methods: {
		async fetchTransactionList() {
			await axios
				.get('/transaction')
				.then((res) => {
					this.transactionList = res.data;
				})
				.catch((err) => {
					if (err.response.status == 404) {
						this.transactionList = [];
						this.errorMessage = err.response.data;
					}
				});
		},
		async fetchAirportList() {
			await axios.get('/airport').then((res) => {
				this.airportList = res.data;
				console.log(res.data);
			});
		},
		async fetchAircraftList() {
			await axios.get('/aircraft').then((res) => {
				this.aircraftList = res.data;
				console.log(res.data);
			});
		},
		async addTransaction() {
			this.submitting = true;
			await axios
				.post('/transaction', this.transactionForm)
				.then((res) => {
					console.log(res);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}
};
</script>

<style scoped>
.table-container {
	width: 70%;
}

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
