<template>
  <ul>
	  <li 
	  @click = handleActiveItem(index)
	  :class="{ active: activeItem === index }" 
	  v-for="(item, index) in typeItems" 
	  :key="item">{{ item }}</li>
  </ul>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
	setup() {
		const typeItems = ref(['Тонкое', 'Традиционное'])
		const activeItem = ref(0)

		const handleActiveItem = (index) => {
			activeItem.value = index
		}
		return { typeItems, activeItem, handleActiveItem }
	}

}
</script>

<style>

</style>