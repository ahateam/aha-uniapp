<template>
	<view>
		{{data}}
		<input v-model="data" />
		<button type="primary" @click="showData">点击</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:'',
			}
		},
		methods: {
			showData(){
				console.log(this.data)
			}
		}
	}
</script>

<style>

</style>
