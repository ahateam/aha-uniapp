<template>
	<view>
			正在获取数据....
	</view>
</template>

<script>
	//tim 
	import {
		mapState
	} from 'vuex'

	export default {
		data() {
			return {
				loading: true,
				userInfo: '',
			}
		},
		watch: {
			isSDKReady(val){
				console.log(val)
			},
			conversationList(val){
								console.log('-----conversationList--------')
				console.log(val)

			}
		},
		computed: {
			...mapState({
				conversationList: state => state.conversation.conversationList,
				currentUserProfile: state => state.user.currentUserProfile,
				currentConversation: state => state.conversation.currentConversation,
				isLogin: state => state.user.isLogin,
				isSDKReady: state => state.user.isSDKReady,
			}),
			// 是否显示 Loading 状态
			showLoading() {
				return !this.isSDKReady
			},
			isPageActive() {
				return this.$store.state.isPageActive
			}
		},
		
		onLoad() {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			console.log('*************')
			console.log(this.currentUserProfile)
			console.log(this.userInfo)
			if(!this.isLogin){
				uni.showToast({
					icon:'none',
					title:'用户身份失效，请重新登录'
				})
				setTimeout(()=>{
					uni.reLaunch({
						url: '../login/mobilePassword'
					});
				},200)
			}
			uni.navigateTo({
				url:'./conversation'
			})
			
		},
		methods: {
		
			

		}
	}
</script>

<style lang="scss">
	heml,
	body {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	* {
		margin: 0;
		padding: 0;
	}

	.clear-both {
		clear: both;
	}
	.login-out-box{
		width: 90%;
		margin: 0 auto;
		margin-top:30rpx ;
		line-height: 40rpx;
		font-size: 28rpx;
		color: #666;
	}
</style>
