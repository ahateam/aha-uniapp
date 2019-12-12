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
					url: '/pages/task/taskInfo/taskInfo',
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
				let leftPos = Math.ceil((plus.screen.resolutionWidth - 60) / 2);
				let view = new plus.nativeObj.View('icon', {
					bottom: '5px',
					left: leftPos + 'px',
					width: '60px',
					height: '53.33px'
				});
				view.drawBitmap(bitmap, {
					tag: 'font',
					id: 'icon',
					src: '/static/tabIcon/tab-add-task.png',
					position: {
						top: '0px',
						left: '5px',
						width: '50px',
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
						let list = this.$util.tryParseJson(res.data.c)
						this.tryParseData(list)
					} else {
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
			});

			let obj = {
				name: '全部',
				key: -1
			}
			array.splice(0, 0, obj)
			this.tagList = array

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
