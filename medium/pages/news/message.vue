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
		methods:{
			getUserInfo(id){
				let cnt = {
					userId:id
				}
				this.$api.getUserInfo(cnt,(res)=>{
					if(res.data.rc == this.$util.RC.SUCCESS){
						this.toUserInfo = this.$util.tryParseJson(res.data.c)
						uni.setStorageSync('toUserInfo',res.data.c)
					}else{
						uni.showToast({
							icon:'该用户不在线，请重新选择...'
						})
						uni.navigateBack()
					}
				})
				
			}
		},
		mounted() {
			let toUserId = uni.getStorageSync('toUserId')
			
			this.getUserInfo(toUserId)
		
	
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