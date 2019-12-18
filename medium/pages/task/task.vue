<template>
	<view class="page">
		<nav-bar class="nav-top-box" type="transparent" :back="false" :style="{height: getStatusHeight()}">
			<view class="view-title">所有任务</view>
		</nav-bar>
		<view :style="{'padding-top': getStatusHeight()}"></view>
		<!-- 顶部选项卡 -->

		<view class="nav-box">
			<scroll-view class="top-option" scroll-x="true" scroll-left="0" scroll-with-animation :scroll-into-view="'nav' + currIndex">
				<view class="top-options" :id="'nav' + index" :class="currIndex== index?'active':''" :style="index == 0?'margin-left:0;':''"
				 v-for="(item,index) in tagList" :key="index" @click="currTag(index,item)">
					<view>{{item.name}}</view>
				</view>
			</scroll-view>
			<view class="nav-shadow"></view>
		</view>

		<!-- 顶部选项卡 end -->
		<task-list :tasks="tasks" @getItem="navToInfo"></task-list>
		<!-- 任务栏  task==任务栏-->
	</view>
</template>

<script>
	import TaskList from '@/components/task/TaskList.vue'
	import navBar from '@/components/zhouWei-navBar/index.vue'

	let bitmap = null
	import {
		mapState
	} from 'vuex'

	export default {
		components: {
			TaskList,
			navBar
		},
		watch: {
			isSDKReady(val) {
				if (val) {
					this.getUserProfile()
				}
			}
		},
		computed: {
			...mapState({
				isLogin: state => state.user.isLogin,
				isSDKReady: state => state.user.isSDKReady,
			}),
		},
		data() {
			return {
				count: 10,
				offset: 0,
				page: 1,
				pageOver: false,
				pageStatus: 'loading',


				userInfo: '',
				clickTab: true,
				currIndex: 0,
				tagList: [],
				// 我的任务信息列表

				tasks: [],
			}
		},

		methods: {
			getStatusHeight() {
				let height = uni.getSystemInfoSync()['statusBarHeight']
				return 44 + height + 'px'
			},

			navToInfo(item) {
				uni.navigateTo({
					url: `/pages/task/taskInfo/taskInfo?id=${item.taskId}`,
					success: () => {
						setTimeout(() => {
							this.$commen.hiddenTabIcon()
						}, 100);
					}
				})
			},

			currTag(index, item) {
				if (!(this.pageStatus == 'loading')) {
					this.currIndex = index
					if (this.tagList[index].child) {
						this.tasks = this.tagList[index].child
						this.pageOver = this.tagList[index].pageOver
						this.pageStatus = this.tagList[index].pageStatus
					} else {
						this.tasks = []
						let cnt = {
							// taskStatus: taskStatus, // Byte <选填> 任务状态
							// status: status, // Byte <选填> 状态（是否删除）
							taskType: item.key, // Byte <选填> 任务类型
							count: this.count, // Integer 
							offset: this.offset, // Integer 
						}
						this.getTaskList(cnt)
					}
				}
			},

			createtab() {
				// 设置水平居中位置
				console.log('1111')
				let leftPos = Math.ceil((plus.screen.resolutionWidth - 58) / 2);
				let view = new plus.nativeObj.View('icon', {
					bottom: '1.6px',
					left: leftPos + 'px',
					width: '58px',
					height: '66.99px'
				});
				view.drawBitmap(bitmap, {
					tag: 'font',
					id: 'icon',
					src: '/static/tabIcon/tab-add-task.png',
					position: {
						top: '0px',
						left: '5px',
						width: '100%',
						height: '100%'
					}
				});
				view.addEventListener("click", function(e) {
					uni.switchTab({
						url: '/pages/index/index'
					})
				}, false);
				view.show();
			},

			/*登录tim-->等待sdk状态为true后执行跳转*/
			timLogin() {
				let timeOut = Number(this.userInfo.userSigCreateTime) + 604800000
				let timeNow = new Date();
				let timeNow1 = timeNow.getTime()

				if (this.userInfo.userSig && timeNow1 < timeOut) {
					this.loginTim();
				} else {
					uni.showToast({
						icon: 'none',
						title: '用户身份失效，请重新登录'
					})
					setTimeout(() => {
						uni.reLaunch({
							url: '../login/mobilePassword'
						})
						this.$commen.hiddenTabIcon()
					}, 300)
				}
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
						if (this.$store.state.user.isSDKReady) {
							this.getUserProfile()
							this.getUserProfile()
						}
						// #ifdef APP-PLUS
						if (!plus.nativeObj.Bitmap('bmp1')) {
							bitmap = new plus.nativeObj.Bitmap('bmp1');
							console.log('123')
							bitmap.loadBase64Data(
								'data:image/png;base64,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',
								function() {},
								function(e) {});
							this.createtab();
						}
						// #endif
					})
					.catch(error => {
						setTimeout(() => {
							this.loginTim()
						}, 200)
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

			tryParseData(list) {
				if (list.length < this.count) {
					this.pageOver = true
					this.pageStatus = 'nomore'
				} else {
					this.pageOver = false
					this.pageStatus = 'more'
				}
				this.tagList[this.currIndex].pageStatus = this.pageStatus
				this.tagList[this.currIndex].pageOver = this.pageOver

				this.tasks = this.tasks.concat(list)
				this.tagList[this.currIndex].child = this.tasks
			},

			getTaskList(cnt) {
				this.$api.getTaskList(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						console.log('-----------------list-------------------')
						console.log(this.$util.tryParseJson(res.data.c))
						uni.stopPullDownRefresh()
						let list = this.$util.tryParseJson(res.data.c)
						this.tryParseData(list)
					} else {
						uni.stopPullDownRefresh()
						this.pageStatus = 'error'
					}
				})
			},
		},
		onShow() {
			this.$commen.showTabIcon()
		},
		onLoad() {
			let list = [...this.$constData.taskType]
			let array = []
			list.map((item, index) => {
				array.push(
					Object.assign({}, item, {
						pageStatus: 'loading',
						pageOver: false,
						page: 1
					})
				)
			})

			let obj = {
				name: '全部',
				key: -1
			}
			array.splice(0, 0, obj)
			this.tagList = array

			if (uni.getStorageSync('userInfo')) {
				let cnt = {
					// taskStatus: taskStatus, // Byte <选填> 任务状态
					// status: status, // Byte <选填> 状态（是否删除）
					count: this.count, // Integer 
					offset: this.offset, // Integer 
				}
				this.getTaskList(cnt)
				// tim登录
				this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
				if (this.$store.state.user.isLogin && this.$store.state.user.isSDKReady) {
					this.getUserProfile()
					this.getConversationList()
					// #ifdef APP-PLUS
					if (!plus.nativeObj.Bitmap('bmp1')) {
						bitmap = new plus.nativeObj.Bitmap('bmp1');
						console.log('123')
						bitmap.loadBase64Data(
							'data:image/png;base64,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',
							function() {},
							function(e) {});
						this.createtab();
					}
					// #endif
				} else {
					this.timLogin()
				}
			} else {
				uni.showToast({
					icon: 'none',
					title: '用户身份失效，请重新登录!'
				})
				setTimeout(() => {
					uni.reLaunch({
						url: '../login/mobilePassword'
					})
					this.$commen.hiddenTabIcon()
				}, 300)
			}
		},
		onPullDownRefresh() {
			this.tasks = []
			this.pageStatus = 'loading'
			this.pageOver = false
			this.page = 1
			this.tagList[this.currIndex].page = 1

			let cnt = {
				// taskStatus: taskStatus, // Byte <选填> 任务状态
				// status: status, // Byte <选填> 状态（是否删除）
				count: this.count, // Integer 
				offset: this.offset, // Integer 
			}
			if (this.currIndex != 0) {
				cnt.taskType = this.tagList[this.currIndex].key // Byte <选填> 任务类型
			}
			this.getTaskList(cnt)
		},
		onReachBottom() {
			if (!this.pageOver) {
				this.page += 1
				this.tagList[this.currIndex].page += 1

				let cnt = {
					// taskStatus: taskStatus, // Byte <选填> 任务状态
					// status: status, // Byte <选填> 状态（是否删除）
					count: this.count, // Integer 
					offset: this.offset, // Integer 
				}
				if (this.currIndex != 0) {
					cnt.taskType = this.tagList[this.currIndex].key // Byte <选填> 任务类型
				}
				this.getTaskList(cnt)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		background-color: #F2F5F7;
		padding-bottom: 1rpx;
		min-height: calc(100vh - 1rpx);
	}

	.nav-top-box {
		position: fixed;
		width: 100vw;
		background-color: $group-color-w;
		z-index: 1;
	}

	.view-title {
		color: $group-color-article;
		font-size: 36rpx;
		line-height: 50rpx;
		font-weight: $group-title-weight;
	}

	.nav-box {
		position: relative;
		background-color: #FFFFFF;
		padding-left: 29rpx;
	}

	.top-option {
		white-space: nowrap;
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 4rpx;
		color: rgba($color: #000000, $alpha: 1.0);
	}

	.nav-shadow {
		position: absolute;
		z-index: 5;
		right: 0;
		top: 50%;
		margin-top: -40rpx;
		width: 68rpx;
		height: 80rpx;
		background: linear-gradient(90deg, rgba($color: #FFFFFF, $alpha: 0), #FFFFFF);
		pointer-events: none;
	}

	.top-options {
		display: inline-block;
		line-height: 66rpx;
		background-color: #FFFFFF;
		color: #587685;
		font-size: 26rpx;
		border-radius: 4rpx;
		border: 1rpx solid #587685;
		margin: 41rpx 10rpx 30rpx 29rpx;

		view {
			box-sizing: border-box;
			padding: 0 30rpx;
		}
	}

	.active {
		display: inline-block;
		line-height: 66rpx;
		color: #FFFFFF;
		background-color: #182F45;
		font-size: 26rpx;
		margin: 41rpx 10rpx 30rpx 29rpx;
	}
</style>
