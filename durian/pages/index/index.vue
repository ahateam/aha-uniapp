<template>
	<view>
		<view>
			<view class="nav-box">
				<view @click="navActive =0" class="nav-item-box nav-item-active" style="margin-left:0">咨询</view>
			</view>
			<view class="content-box">
				<view v-for="(item,index) in typeList" :key="index" @click="chooseBtn(item)">
					<view :class="activeItme==item.id?'list-item list-item-active':'list-item'">{{item.title}}</view>
				</view>
			</view>
		</view>
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
				userInfo: '',
				typeList: this.$constData.consultType,
				activeItme: 1
			}
		},
		watch: {
			isSDKReady(newVal) {
				if (newVal) {
					this.getUserProfile()
					this.getConversationList();
				}
			},
			conversationList(val) {
				console.log('-----conversationList--------')
				console.log(val)

			},
			currentUserProfile(val) {
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
			},

		},

		onLoad() {
			if (uni.getStorageSync('userInfo')) {
				this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
				if (!this.isLogin) {
					this.loginTim();
				} else {
					this.getConversationList();
				}
			} else {
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
						if (res.data.conversationList.length) {

							uni.reLaunch({
								url: './conversation'
							});

						} else {
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
			getUserProfile() {
				let promise = this.tim.getMyProfile();
				promise.then((res) => {
					if (res.data.nick == '') {
						let promise = this.tim.updateMyProfile({
							nick: this.userInfo.userName,
							avatar: this.userInfo.userHead,
							gender: this.TIM.TYPES.GENDER_MALE,
							selfSignature: '这个人很懒...',
							allowType: this.TIM.TYPES.ALLOW_TYPE_ALLOW_ANY,
							role: this.userInfo.userType
						});
						promise.then((res1) => {
							this.$store.commit("updateCurrentUserProfile", res1.data);
						}).catch((err1) => {
							console.warn('updateMyProfile error:', err1); // 更新资料失败的相关信息
						});
					} else {
						this.$store.commit("updateCurrentUserProfile", res.data);
					}
				}).catch((err) => {
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
							
						})
						.catch(error => {
							console.error(error)
							uni.showToast({
								icon: 'none',
								title: '用户身份失效，请重新登录'
							})
							setTimeout(() => {
								uni.reLaunch({
									url: '../login/mobilePassword'
								});
							}, 1000)
						});
				}
			},
			chooseBtn(item) {
				this.activeItme = item.id
				let cnt = {}
				this.$api.getUserInter(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						console.log('---------toUser----------')
						console.log((res.data.c))
						let toUser = this.$util.tryParseJson(res.data.c)
						if (toUser.userId) {
							uni.setStorageSync('toUserId', String(toUser.userId))
							uni.setStorageSync('toUserInfo', res.data.c)
							uni.navigateTo({
								url: './message'
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '暂无中介在线...'
							})
						}
					} else {
						uni.showToast({
							icon: 'none',
							title: '暂无中介在线...'
						})
					}
				})
			}
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

	.login-out-box {
		width: 90%;
		margin: 0 auto;
		margin-top: 30rpx;
		line-height: 40rpx;
		font-size: 28rpx;
		color: #666;
	}
</style>
