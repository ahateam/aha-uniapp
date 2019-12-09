<script>
	export default {
		onLaunch: function() {
			
			console.log('App Launch')
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
			uni.onTabBarMidButtonTap((res) => {
				let data = getCurrentPages()
				if (data[0].route != 'pages/index/index') {
					uni.navigateTo({
						url: '/pages/index/index'
					})
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
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
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	.auto-placeholder {
		color: $group-color-befor;
	}

	input {
		caret-color: #00C8BE;
	}
</style>
