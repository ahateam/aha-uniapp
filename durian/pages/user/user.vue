<template>
	<view class="body">
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
