<template>
	<view>
		<view class="nav-box">
			<view @click="navActive =0" :class="navActive=='0'?'nav-item-box nav-item-active':'nav-item-box'" style="margin-left:0">聊天记录</view>
			<view class="nav-item-box" @click="navActive =1" :class="navActive=='1'?'nav-item-box nav-item-active':'nav-item-box'">通讯录</view>
			<!-- <view class="nav-item-box" @click="navActive =2" :class="navActive=='2'?'nav-item-box nav-item-active':'nav-item-box'">其他</view> -->
			<view class="clear-both"></view>
		</view>
		<view class="content-box">
			<view class="list-box">
				<view class="msg">
					<view class="msg-box">
						<view class="msg-text">重要通知第一时间知晓,开启消息通知~</view>
						<view class="msg-btn">去开启</view>
						<img src="../../static/tim/img/icon_close.png" class="msg-close-btn" alt />
						<view class="clear-both"></view>
					</view>
				</view>
				<view class="list-item-box" v-if="conversationList.length>0">
					<uni-swipe-action>
						<uni-swipe-action-item :options="options" v-for="(item,index) in conversationList" :key="index" @click="delItem(index)">
							<view class="list-item" @click.stop="checkConversation(item)">
								<view class="list-item-img">
									<img :src="item.userProfile.avatar" alt />
								</view>
								<view class="list-item-info">
									<view class="list-item-title">
										<view class="list-item-name">{{item.userProfile.nick}}</view>
										<view class="list-item-time">{{timeFilter(item.lastMessage.lastTime)}}</view>
										<view class="clear-both"></view>
									</view>
									<view class="list-item-text">
										<view class="item-text-active" v-if="item.unreadCount ==0">
											<rich-text :nodes="item.lastMessage.messageForShow"></rich-text>
										</view>
										<view class="item-text" v-else>
											<rich-text :nodes="item.lastMessage.messageForShow"></rich-text>
										</view>
										<view class="item-msg-num" v-if="item.unreadCount>0 && item.unreadCount <100">
											{{item.unreadCount}}</view>
										<view class="item-msg-num" v-if="item.unreadCount>=100">...</view>
									</view>
								</view>
							</view>
						</uni-swipe-action-item>
					</uni-swipe-action>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import userList from '../../commen/tim/user.js'
	import {
		mapGetters,
		mapState
	} from "vuex";
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'

	export default {
		name: "conversation",
		components: {
			uniSwipeAction,
			uniSwipeActionItem
		},
		data() {
			return {
				userInfo: "",
				toUserInfo: "",
				navActive: 0,
				

				options: [{
					text: '删除',
					style: {
						backgroundColor: '#EE455A',
						fontSize: '26rpx'
					}
				}]
			};
		},
		watch: {
			conversationList(newList) {
				console.log(newList)

			},
			currentConversation(val) {
				console.log(val)
			},
			currentMessageList(val) {
				console.log(val)
			},
			isPageActive(val) {
				this.resetConversation(val)
			}

		},
		computed: {
			...mapState({
				conversationList: state => state.conversation.conversationList,
				currentConversation: state => state.conversation.currentConversation,
				currentMessageList: state => state.conversation.currentMessageList,
				isCompleted: state => state.conversation.isCompleted,
				isLogin: state => state.user.isLogin
			}),
			...mapGetters(['toAccount']),
		},
		methods: {
			delItem(index) {
				uni.showToast({
					title: '点击刪除',
					icon: 'none'
				})
			},

			/** 聊天详情返回*/
			resetConversation() {
				if (this.isActive == 1) {
					uni.removeStorageSync('toUserInfo');
					this.getConversationList()
				}
			},
			/**拉取历史会话列表 */
			getConversationList() {
				let promise = this.tim.getConversationList();
				promise
					.then(res => {
						console.log('----conversation------')
						console.log(res.data.conversationList)
						this.$store.commit(
							"updateConversationList",
							res.data.conversationList
						);

					})
					.catch(() => {
						this.getConversationList();
					});
			},
			/**过滤时间 */
			timeFilter(timeData) {
				let timer = new Date(timeData * 1000)
				return this.$commen.dateTimeFliter(timer, 1)
			},
			/**获取用户详细信息 */
			getUserInfo(userId) {
				let obj = null
				userList.forEach(item => {
					if (item.userId == userId) {
						obj = item
					}
				})
				return obj
			},
			/** 创建且更换聊天室 */
			checkConversation(item) {
				console.log(item)
				let toUserId = item.userProfile.userID
				let id = 'C2C' + toUserId
				uni.setStorageSync('toUserId', toUserId)
				this.$store.dispatch('checkoutConversation', id)
				uni.navigateTo({
					url: './message'
				})
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
				this.tim
					.login({
						userID: String(this.userInfo.userId),
						userSig: this.userInfo.userSig
					})
					.then(res => {
						this.$store.commit("toggleIsLogin", true);
						this.$store.commit("startComputeCurrent");
						this.getUserProfile()
						this.getConversationList();
					})
					.catch(error => {
						setTimeout(() => {
							if (!this.$store.state.user.isLogin) {
								this.loginTim()
							}
						}, 500)
					});
			},
		},
		onLoad() {
			uni.removeStorageSync('toUserInfo');
			uni.removeStorageSync('toUserId');
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			let timeOut = Number(this.userInfo.userSigCreateTime) + 604800000
			let timeNow = new Date();
			timeNow = timeNow.getTime()
			console.log(timeNow)
			if (this.userInfo.userSig && (timeNow < timeOut)) {
				if (!this.$store.state.user.isLogin) {
					this.loginTim();
				} else {
					this.getConversationList();
				}
			} else {
				uni.showToast({
					icon: 'none',
					title: '用户身份失效，请重新登录'
				})
				uni.reLaunch({
					url: '../login/mobilePassword'
				});
			}
		}
	};
</script>
<style lang="scss" scoped>
	.nav-box {
		position: fixed;
		top: 40rpx;
		padding: 88rpx 0 30rpx 30rpx;
		height: 100rpx;
		width: 100%;
		background: #fff;
		z-index: 100;
	}

	.content-box {
		top: 228rpx;
		width: auto;
		padding: 30rpx 0 30rpx 30rpx;
		background: #fff;
		position: relative;
		overflow: hidden;
	}

	.nav-item-box {
		float: left;
		margin-left: 50rpx;
		width: auto;
		height: 70rpx;
		line-height: 70rpx;
		font-size: 40rpx;
		color: #ccc;
	}

	.nav-item-active {
		color: #333;
		font-size: 50rpx;
	}

	.list-box {
		padding-bottom: 160rpx;
		width: 100%;
	}

	.msg {
		padding-right: 30rpx;
	}

	.msg-box {
		width: auto;
		height: 100rpx;
		background-image: url("../../static/tim/img/bg_tz.png");
		background-position: center;
		background-size: cover;
	}

	.msg-text {
		float: left;
		margin-left: 30rpx;
		line-height: 100rpx;
		font-size: 26rpx;
		color: #946934;
	}

	.msg-btn {
		float: left;
		margin-left: 20rpx;
		margin-top: 25rpx;
		width: 120rpx;
		height: 50rpx;
		font-size: 26rpx;
		text-align: center;
		line-height: 50rpx;
		color: #946934;
		border-radius: 10rpx;
		background: #ffd78d;
	}

	.msg-close-btn {
		float: left;
		margin-left: 20rpx;
		margin-top: 41rpx;
		width: 18rpx;
		height: 18rpx;
	}

	.msg-close-btn img {
		width: 18rpx;
		height: 18rpx;
	}

	.list-item-box {
		margin-top: 26rpx;
	}

	.list-item {
		width: auto;
		height: 162rpx;
		margin-top: 24rpx;
	}

	.list-item-img {
		float: left;
		width: 132rpx;
		height: 132rpx;
		background-image: url("../../static/tim/img/bg_student.png");
		background-position: center;
		background-size: cover;
	}

	.list-item-img img {
		margin-top: 6rpx;
		margin-left: 6rpx;
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}

	.list-item-info {
		margin-left: 156rpx;
		width: auto;
		height: 162rpx;
		border-bottom: 1rpx solid #eff0f4;
	}

	.list-item-title {
		padding-right: 30rpx;
		width: auto;
		height: 76rpx;
		line-height: 76rpx;
	}

	.list-item-name {
		float: left;
		width: 350rpx;
		height: 76rpx;
		color: #333;
		line-height: 76rpx;
		font-size: 30rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.list-item-time {
		float: right;
		height: 76rpx;
		line-height: 76rpx;
		font-size: 22rpx;
		color: #999999;
	}

	.list-item-text {
		width: auto;
		height: 40rpx;
		padding-right: 30rpx;
		line-height: 40rpx;
	}

	.item-text {
		float: left;
		width: 480rpx;
		height: 40rpx;
		font-size: 26rpx;
		line-height: 40rpx;
		color: #999999;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.item-text-active {
		float: left;
		width: 430rpx;
		height: 40rpx;
		font-size: 26rpx;
		line-height: 40rpx;
		color: #999999;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.item-msg-num {
		float: right;
		margin-top: 2rpx;
		width: 36rpx;
		height: 36rpx;
		border-radius: 50%;
		text-align: center;
		line-height: 36rpx;
		background: #ee455a;
		color: #ffffff;
		font-size: 20rpx;
	}
</style>
