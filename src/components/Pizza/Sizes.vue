<template>
  <ul>
	  <li 
	  @click = handleActiveItem(index)
	  :class="{ active: activeItem === index }" 
	  v-for="(item, index) in sizeItems" 
	  :key="item">{{ item }} см.</li>
  </ul>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
	setup() {
		const sizeItems = ref([26,30,40])
		const activeItem = ref(0)

		const handleActiveItem = (index) => {
			activeItem.value = index
		}
		return { sizeItems, activeItem, handleActiveItem }
	}

}
</script>

<style>

</style>