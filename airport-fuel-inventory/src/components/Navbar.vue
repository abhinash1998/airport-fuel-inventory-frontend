<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-color">
		<div class="container-fluid">
			<a class="navbar-brand" href="#">Airport Fuel Inventory</a>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarText"
				aria-controls="navbarText"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarText">
				<ul class="navbar-nav mr-auto mb-2 mb-lg-0 navbar-margin">
					<li>
						<router-link class="nav-link" to="airport">
							Airport
						</router-link>
					</li>
					<li>
						<router-link class="nav-link" to="aircraft">
							Aircraft
						</router-link>
					</li>
					<li>
						<router-link class="nav-link" to="transaction">
							Transaction
						</router-link>
					</li>
					<li>
						<router-link
							class="nav-link"
							to="airportConsumptionReport"
						>
							Airport Consumption Report
						</router-link>
					</li>
					<li>
						<router-link
							class="nav-link"
							to="fuelConsumptionReport"
						>
							Fuel Consumption Report
						</router-link>
					</li>
				</ul>

				<span class="navbar-text cursor-pointer" v-on:click="logOut()">Logout</span>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	name: 'Navbar',
	methods: {
		isLoggedIn: function () {
			if (this.$cognitoAuth.getCurrentUser() === null) {
				return false;
			} else {
				return true;
			}
		},
		logOut() {
			localStorage.setItem('token',null);
			this.$router.push('/');
		}
	}
};
</script>

<style>
.cursor-pointer {
	cursor: pointer;
}

.bg-color {
	background-color: #367;
}

.navbar-margin {
	margin-left: 11rem;
}
</style>
