<template>
	<div class="content">
		<div class="container">
      <div class="content__top">
        <Categories />
        <Sort />
      </div>
			<PizzaList />
		</div>
	</div>
</template>

<script>
import PizzaList from "@/components/Pizza/List";
import Categories from "@/components/Categories";
import Sort from "@/components/Sort";
export default {
	components: { PizzaList, Categories, Sort },
};
</script>

<style>
</style>