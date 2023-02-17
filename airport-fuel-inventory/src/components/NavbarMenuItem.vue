<template>
	<li>
		<router-link class="nav-link" v-bind:to="menuLink">
			{{ menuOption }}
		</router-link>
	</li>
</template>

<script>
export default {
	name: 'NavbarMenuItem',
	props: {
		menuOption: String,
		menuLink: String
	}
};
</script>

<style scoped></style>
