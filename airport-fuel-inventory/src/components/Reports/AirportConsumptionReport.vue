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
							<th>Fuel Available</th>
						</tr>
					</thead>
					<tbody>
	<tr
						v-if="!airportConsumptionReport || airportConsumptionReport?.length === 0"
						class="text-muted"
					>
						<span v-if="!airportConsumptionReport">
							<i class="fas fa-spinner fa-spin mr-1"></i>
							Loading...
						</span>
						<span v-if="airportConsumptionReport?.length === 0">
							{{ errorMessage }}
						</span>
					</tr>
						<tr
							v-for="item in airportConsumptionReport"
							v-bind:key="item.airportId"
						>
							<td>{{ item.airport }}</td>
							<td>{{ item.fuelAvailable }}</td>
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
import axios from '../../helpers/axios'

export default {
	name: 'AirportConsumptionReport',
	components: {
		Navbar
	},
	data() {
		return {
			airportConsumptionReport: [],
			errorMessage: null
		};
	},
	mounted() {
		this.airportConsumptionReport = null;
		setTimeout(() => {
					this.fetchAirportConsumptionReport();
		}, 500);
	},
	methods: {
		async fetchAirportConsumptionReport() {
			await axios
				.get('/airport')
				.then((res) => {
					this.airportConsumptionReport = res.data;
				})
								.catch((err) => {
					if (err.response.status == 404) {
						this.airportConsumptionReport = [];
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
				pdf.save('airport_consumption_report.pdf');
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
