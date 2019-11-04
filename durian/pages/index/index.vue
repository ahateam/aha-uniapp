<template>
	<view class="content">
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			if(!uni.getStorageSync('userId')){
				uni.reLaunch({
				    url: '../login/mobile'
				});
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	
</style>
