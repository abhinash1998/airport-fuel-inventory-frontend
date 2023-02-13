<template>
	<div>
		<Navbar />
		<div class="m-auto table-container py-3 d-flex flex-column">
			<button
				type="button"
				class="btn btn-outline-primary btn-sm mr-auto button-width mb-4"
				v-on:click="exportAsPDF()"
			>
				<i class="fas fa-file-download mr-2"></i>
				<span class="mr-2">Export PDF</span>
			</button>
			<div ref="content">
			<table class="w-100 table table-bordered">
				<thead class="bg-light">
					<tr>
						<th>Airport</th>
						<th>Date/time</th>
						<th>Transaction Type</th>
						<th>Fuel Available</th>
						<th>Aircraft</th>
					</tr>
				</thead>
				<tbody>
<tr
						v-if="!fuelConsumptionReport || fuelConsumptionReport?.length === 0"
						class="text-muted"
					>
						<span v-if="!fuelConsumptionReport">
							<i class="fas fa-spinner fa-spin mr-1"></i>
							Loading...
						</span>
						<span v-if="fuelConsumptionReport?.length === 0">
							{{ errorMessage }}
						</span>
					</tr>
					<tr
						v-for="item in fuelConsumptionReport"
						v-bind:key="item.transactionId"
					>
						<td>{{ item.airport }}</td>
						<td>{{ item.transactionDate }}</td>
						<td>{{ item.transactionType }}</td>
						<td>{{ item.fuelAvailable }}</td>
						<td>{{ item.aircraft }}</td>
					</tr>
				</tbody>
			</table>
			</div>
		</div>
	</div>
</template>

<script>
import Navbar from '../Navbar.vue';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {baseUrl} from '../../baseUrl/baseUrl'
export default {
	name: 'FuelConsumptionReport',
	components: {
		Navbar
	},
	data() {
		return {
			errorMessage: null,
			fuelConsumptionReport: [],
            airportList: [],
            aircraftList: []
		};
	},
	mounted() {
		this.fuelConsumptionReport = null;
		setTimeout(() => {
		this.fetchFuelConsumptionReport();	
		}, 500);
		
	},
	methods: {
		fetchFuelConsumptionReport() {
			this.axios
				.get(`${baseUrl}/transaction`)
				.then((res) => {
					this.fuelConsumptionReport = res.data;
				})
												.catch((err) => {
					if (err.response.status == 404) {
						this.fuelConsumptionReport = [];
						this.errorMessage = err.response.data;
					}
				});
		},
		exportAsPDF() {
			html2canvas(this.$refs.content, { scale: 3 }).then((canvas) => {
				const imageGeneratedFromTemplate =
					canvas.toDataURL('image/jpeg');
				const fileWidth = 100;
				const generatedImageHeight =
					(canvas.height * fileWidth) / canvas.width;
				let pdf = new jsPDF('l', 'ex', 'a4');
				pdf.addImage(
					imageGeneratedFromTemplate,
					'JPEG',
					0,
					5,
					fileWidth,
					generatedImageHeight
				);
				pdf.save('fuel_consumption_report.pdf');
			});
		}

	}
};
</script>

<style scoped>
.table-container {
	width: 70%;
}

</style>
