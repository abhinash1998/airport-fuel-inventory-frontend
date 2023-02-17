<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-color">
		<div class="container-fluid">
			<span class="navbar-brand">Airport Fuel Inventory</span>
			<div class="collapse navbar-collapse">
				<ul class="navbar-nav mr-auto mb-2 mb-lg-0 navbar-margin">
					<div
						v-for="item in navbarMenuItems"
						v-bind:key="item.menuOption"
					>
						<NavbarMenuItem
							v-bind:menuOption="item.menuOption"
							v-bind:menuLink="item.menuLink"
						/>
					</div>
				</ul>

				<span class="navbar-brand cursor-pointer" v-on:click="logOut()">
					Logout
				</span>
			</div>
		</div>
	</nav>
</template>

<script>
import NavbarMenuItem from './NavbarMenuItem.vue';
import {navbarMenuItems} from '../NavbarMenu/navbar-menu'

export default {
	name: 'Navbar',
	components: {
		NavbarMenuItem
	},
	methods: {
		logOut() {
			localStorage.setItem('token', null);
			this.$router.push('/');
		}
	},
	data() {
		return {
			navbarMenuItems: []
		};
	},
	mounted() {
		this.navbarMenuItems = navbarMenuItems;
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
