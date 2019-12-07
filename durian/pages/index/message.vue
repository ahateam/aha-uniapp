<template>
	<view >
		<view v-if="toUserInfo">
			<view class="nav-box">
				<titleItem :name="toUserInfo.name"></titleItem>
			</view>
			<view class="message-list">
				<list></list>
			</view>
		</view>
	</view>
	
</template>
<script>
	import titleItem from './tim/titleItem'
	import list from './tim/list'
	export default{
		name:'msssage',
		data(){
			return {
				toUserInfo:'',
			}
		},
		components:{
			titleItem,
			list
		},
		mounted() {
			let toUserId = uni.getStorageSync('toUserId')
			let toUserInfo = this.$commen.getUserInfo(toUserId)
			uni.setStorageSync('toUserInfo',JSON.stringify(toUserInfo))
			this.toUserInfo = toUserInfo
			console.log('----toUserInfo--')
			console.log(this.toUserInfo)
		
	
		}
	}
</script>
<style scoped lang="scss">
	.nav-box{
		position: fixed;
		top: 40rpx;
		width: 100%;
		height: 88rpx;
		z-index: 100;
		background: #fff;
	}
	.message-list{
		padding-top: 88rpx;
	}
</style>