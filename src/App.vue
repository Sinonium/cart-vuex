<template>
	<div class="wrapper">
		<Header />
		<router-view />
	</div>
</template>

<script>
import Header from "@/components/Header";
export default {
	components: { Header },
};
</script>

<style lang="scss">
#app {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
