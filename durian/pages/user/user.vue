<template>
	<view class="body">
		<button type="primary" @click="navToUser">ssss</button>
		<button @click="backLogin">·µ»ØµÇÂ¼</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods:{
			navToUser(){
				uni.navigateTo({
					url:'/pages/user/userData/userData'
				})
			},
			backLogin(){
				uni.clearStorageSync('userId')
				uni.reLaunch({
					url:'/pages/login/mobile'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.body{
		min-height: 100vh;
	}
</style>
