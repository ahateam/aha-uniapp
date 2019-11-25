<template>
	<view>
		<view v-if="url">
			  <web-view :src="url"></web-view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'index',
		data(){
			return{
				isActive:0,
				userId:'',
				url:''
			}
		},
		comments:{
			
		},
		methods:{
			
		},
		onLoad(){
			this.userId =JSON.parse( uni.getStorageSync('userInfo')).userId
			this.isActive = 1
			this.url = '/hybrid/html/index.html#/?userId='+this.userId+'&isActive='+this.isActive
		}
	}
</script>

<style lang="scss" scoped>

</style>
