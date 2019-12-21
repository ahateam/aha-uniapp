<template>
	<view>
		<view class="nav-box">
			<view @click="navActive =0" :class="navActive=='0'?'nav-item-box nav-item-active':'nav-item-box'" style="margin-left:0">聊天记录</view>
			<view class="nav-item-box" @click="navActive =1" :class="navActive=='1'?'nav-item-box nav-item-active':'nav-item-box'">通讯录</view>
			<view class="nav-item-box" @click="navActive =2" :class="navActive=='2'?'nav-item-box nav-item-active':'nav-item-box'">其他</view>
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
					<view class="list-item" v-for="(item,index) in conversationList" :key="index" @click="checkConversation(item)">
						<view class="list-item-img">
							<img :src="constData.oss + item.userProfile.avatar" alt />
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
				</view>
			</view>
		</view>

		<view class="footer-box">
			<view class="footer-btn-box">+ 发起新的咨询</view>
		</view>

	</view>
</template>

<script>
	import userList from '../../commen/tim/user.js'
	import {
		mapGetters,
		mapState
	} from "vuex";
	export default {
		name: "conversation",
		data() {
			return {
				userInfo: "",
				toUserInfo: "",
				navActive: 0,
				sationList: [],

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
				isCompleted: state => state.conversation.isCompleted
			}),
			...mapGetters(['toAccount']),
			isPageActive() {
				return this.$store.state.isPageActive
			}
		},
		methods: {
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
				console.log('-------item----------')
				console.log(item)
				
				let toUserId = item.userProfile.userID
				console.log(toUserId)
				
				let id = 'C2C' + toUserId
				uni.setStorageSync('toUserId', toUserId)
				this.$store.dispatch('checkoutConversation', id)
				uni.navigateTo({
					url:'./message'
				})
			}
		},
		mounted() {
			console.log('1111')
			uni.removeStorageSync('toUserInfo');
			console.log('aaaa')
			console.log(uni.getStorageSync('userInfo'))
			this.getConversationList();
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

	.footer-box {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		padding: 30rpx;
		background: #fff;
		z-index: 100;
	}

	.footer-btn-box {
		width: 690rpx;
		height: 100rpx;
		line-height: 100rpx;
		background: #00c8be;
		color: #ffffff;
		font-size: 30rpx;
		text-align: center;
		border-radius: 6rpx;
	}
</style>
