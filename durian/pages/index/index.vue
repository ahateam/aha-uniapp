<template>
	<view class="content">
		首页
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
			console.log(uni.getStorageSync('userId'))
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
