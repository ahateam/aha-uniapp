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

			},
			currentUserProfile(val){
				console.log('----currentUserProfile--------')
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
			
			console.log('--userInfo--')
			if(uni.getStorageSync('userInfo')){		
				this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
				if(!this.isLogin){
					this.loginTim();
				}else{
					this.getConversationList();
				}
			}else{
				uni.reLaunch({
				    url: '../login/mobilePassword'
				});
			}
			
	
		},
		methods: {
			
			//获取默认的会话列表
			/**拉取历史会话列表 */
			getConversationList() {
				let promise = this.tim.getConversationList();
				promise
					.then(res => {
						this.$store.commit(
							"updateConversationList",
							res.data.conversationList
						);
						console.log(res.data.conversationList.length)
						if(res.data.conversationList.length){
							
							uni.reLaunch({
							    url: './conversation'
							});
							
						}else{
							uni.reLaunch({
							    url: './choose'
							});
						}
					})
					.catch(() => {
						this.getConversationList();
					});
			},
			
			//获取tim个人信息--并初次更新用户信息
			getUserProfile(){
				let promise = this.tim.getMyProfile();
				promise.then((res)=> {
					if(res.data.nick == ''){
						let promise = this.tim.updateMyProfile({
						  nick: this.userInfo.userName,
						  avatar: this.userInfo.userHead,
						  gender: this.TIM.TYPES.GENDER_MALE,
						  selfSignature: '这个人很懒...',
						  allowType: this.TIM.TYPES.ALLOW_TYPE_ALLOW_ANY,
						  role:this.userInfo.userType
						});
						promise.then((res1)=> {
							this.$store.commit("updateCurrentUserProfile", res1.data);
						}).catch((err1)=> {
						  console.warn('updateMyProfile error:', err1); // 更新资料失败的相关信息
						});
					}else{
						this.$store.commit("updateCurrentUserProfile", res.data);
					}
				}).catch((err)=> {
				  console.warn('getMyProfile error:', err); // 获取个人资料失败的相关信息
				});
			},
			
			//登录tim
			loginTim() {
					console.log(this.userInfo)
				if (this.userInfo) {
					this.tim
						.login({
							userID: String(this.userInfo.userId),
							userSig: this.userInfo.userSig
						})
						.then(res => {
							this.loading = false;
							this.$store.commit("toggleIsLogin", true);
							this.$store.commit("startComputeCurrent");
							uni.setStorageSync('userInfo', JSON.stringify(this.userInfo))
							this.getUserProfile()
							this.getConversationList();
						})
						.catch(error => {
							console.error(error)
							uni.showToast({
								icon:'none',
								title:'用户身份失效，请重新登录'
							})
							setTimeout(()=>{
								uni.reLaunch({
								    url: '../login/mobilePassword'
								});
							},1000)
						});
				}
			},
		
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
