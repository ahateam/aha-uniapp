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
			this.initListener()
			console.log('--userInfo--')
			if(uni.getStorageSync('userInfo')){		
				this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
				this.loginTim();
			}else{
				uni.reLaunch({
				    url: '../login/mobilePassword'
				});
			}
			
	
		},
		methods: {
			//监听tim事件
			initListener() {
				// 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
				this.tim.on(this.TIM.EVENT.SDK_READY, this.onReadyStateUpdate, this);
				// SDK NOT READT
				this.tim.on(this.TIM.EVENT.SDK_NOT_READY, this.onReadyStateUpdate, this);
				// 被踢出
				this.tim.on(this.TIM.EVENT.KICKED_OUT, () => {
					this.$store.commit("showMessage", {
						message: "被踢出，请重新登录。",
						type: "error"
					});
					this.$store.commit("toggleIsLogin", false);
					this.$store.commit("reset");
				});
				// SDK内部出错
				// this.tim.on(this.TIM.EVENT.ERROR, this.onError);
				// 收到新消息
				this.tim.on(this.TIM.EVENT.MESSAGE_RECEIVED, this.onReceiveMessage);
				// 会话列表更新
				this.tim.on(this.TIM.EVENT.CONVERSATION_LIST_UPDATED, event => {
					this.$store.commit("updateConversationList", event.data);
				});
				// 群组列表更新
				this.tim.on(this.TIM.EVENT.GROUP_LIST_UPDATED, event => {
					this.$store.commit("updateGroupList", event.data);
				});
				// 收到新的群系统通知
				this.tim.on(this.TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED, event => {
					const isKickedout = event.data.type === 4;
					const isCurrentConversation =
						`GROUP${event.data.message.payload.groupProfile.groupID}` ===
						this.currentConversation.conversationID;
					// 在当前会话被踢，需reset当前会话
					if (isKickedout && isCurrentConversation) {
						this.$store.commit("resetCurrentConversation");
					}
					// Notification({
					//   title: '新系统通知',
					//   message: translateGroupSystemNotice(event.data.message),
					//   duration: 3000,
					//   onClick: () => {
					//     const SystemConversationID = '@TIM#SYSTEM'
					//     this.$store.dispatch('checkoutConversation', SystemConversationID)
					//   }
					// })
				});
			},
			onReceiveMessage({
				data: messageList
			}) {
				this.handleAt(messageList);
				this.$store.commit("pushCurrentMessageList", messageList);
			},
			onError({
				data
			}) {
				if (data.message !== "Network Error") {
					this.$store.commit("showMessage", {
						message: data.message,
						type: "error"
					});
				}
			},
			onReadyStateUpdate({
				name
			}) {
				const isSDKReady = name === this.TIM.EVENT.SDK_READY ? true : false;
				this.$store.commit("toggleIsSDKReady", isSDKReady);

				if (isSDKReady) {
					this.tim.getMyProfile().then(({
						data
					}) => {
						this.$store.commit("updateCurrentUserProfile", data);
					});
					this.$store.dispatch("getBlacklist");
				}
			},
			
			//获取默认的会话列表
			/**拉取历史会话列表 */
			getConversationList() {
				console.log('11111')
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
