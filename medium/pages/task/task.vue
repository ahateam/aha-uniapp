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
		<uni-load-more :status="pageStatus"></uni-load-more>
	</view>
</template>

<script>
	import TaskList from '@/components/task/TaskList.vue'
	import navBar from '@/components/zhouWei-navBar/index.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'

	let bitmap = null
	import {
		mapState
	} from 'vuex'

	export default {
		components: {
			TaskList,
			navBar,
			uniLoadMore
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
							status: this.$constData.taskWall[0].key, // Byte <选填> 状态（是否删除）
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
					bottom: '2px',
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
					status: this.$constData.taskWall[0].key, // Byte <选填> 状态（是否删除）
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
				status: this.$constData.taskWall[0].key, // Byte <选填> 状态（是否删除）
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
					status: this.$constData.taskWall[0].key, // Byte <选填> 状态（是否删除）
					count: this.count, // Integer 
					offset: (this.page - 1) * this.count // Integer 
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
