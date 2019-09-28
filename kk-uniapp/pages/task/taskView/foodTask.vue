<template>
	<view>
		<view class="autoBox">
			<view class="contentBox">
				{{title}}
			</view>
		</view>

		<view class="autoBox">
			<view class="contentBox">
				<text v-for="(item,index) in objList" :key="index">
					{{item.name}}
				</text>
			</view>
		</view>

		<view class="autoBox">
			<view class="contentBox">
				<text v-for="(item,index) in purposeList" :key="index">
					{{item.name}}
				</text>
			</view>
		</view>

		<view class="autoBox">
			<view class="autoBox">
				<text class="leftTitle">年龄</text> <text>{{age}}</text>
			</view>
			<view class="autoBox">
				<text class="leftTitle">地点</text> <text>{{address}}</text>
			</view>
			<view class="autoBox">
				<text class="leftTitle">租金</text> <text>{{money}}元/小时</text>
			</view>
		</view>

		<view class="autoBox">
			<text class="infoText">
				友情提示：预交定金99%是骗子，请当面交易。
			</text>
		</view>

		<view class="container">
			<!-- 接单列表 -->
			<view class="s-header">
				<text class="tit">领取任务的人</text>
			</view>
			<view class="evalution">
				<view class="noEva" v-if="comment.length == 0">
					还没有人领任务哦~
				</view>
				<view v-for="(item, index) in comment" :key="index" class="eva-item" @click="openBox(item)">
					<image :src="item.user.ext.userHead" mode="aspectFill"></image>
					<view class="eva-right">
						<text v-if="item.user">{{item.user.name}} </text>
						<text>{{item.time}}</text>
						<view class="zan-box">
							<text v-if="item.status == constData.taskStatus[1].key">进行中</text>
							<text v-if="item.status == constData.taskStatus[2].key">已上传，待审核</text>
							<text v-if="item.status == constData.taskStatus[3].key">已完成</text>
							<text v-if="item.status == constData.taskStatus[4].key">未通过，重新提交</text>
							<text v-if="item.status == constData.taskStatus[7].key">指派中</text>
						</view>
						<text class="content">电话: {{item.data.tel}}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 关闭任务按钮 -->
		<view class="bottomBtnBox" v-if="taskStatus <constData.taskWallStatus[3].key && userId == upUserId">
			<button class="rightBtn" type="primary" @click="closeTask">取消任务</button>
		</view>

		<!-- 选择乙方盒子 -->
		<view class="choiceB" v-if="upChangeBox">
			<view class="choiceTitle">
				任务将指派给{{choiceName}}
			</view>
			<view class="choiceBtnBox">
				<button class="leftBtn" type="primary" @click="upChangeBox = false">取消</button>
				<button class="rightBtn" type="primary" @click="choiceUser">确定</button>
			</view>
		</view>

		<!-- 领取任务按钮 -->
		<view class="bottomBtn" v-if="taskStatus < constData.taskWallStatus[3].key&&userId!=upUserId&&userStatus">
			<button type="primary" class="receiveBtn" @click="receiveBtn" v-if="userId != upUserId">领取</button>
		</view>

		<!-- 填写资料盒子 -->
		<view class="hiddenBox" v-if="hidden">
			<view class="colseBox" @click="colseBox">X</view>
			<input type="number" v-model="telPhone" placeholder="请输入电话号码" />
			<button type="primary" @click="submission">提交</button>
		</view>

		<view class="hiddenBox" v-if="upUserBox">
			<view class="colseBox" @click="upUserBox =! upUserBox">X</view>
			给对方评分<uni-rate class="rateBox" @change="setRate"></uni-rate>
			<input type="text" v-model="upText" placeholder="请输入评价" />
			<button type="primary" @click="upRate">提交</button>
		</view>
		<view class="bottomBtnBox" v-if="taskStatus == constData.taskWallStatus[4].key&&userId != upUserId">
			<button class="rightBtn" type="primary" @click="taskComplite">已完成</button>
		</view>
		<!-- 评价按钮 -->
		<view class="bottomBtnBox" v-if="taskStatus == constData.taskWallStatus[5].key&&userId == upUserId">
			<button class="rightBtn" type="primary" @click="upUserBox = true">评价</button>
		</view>

		<!-- 二次确定 -->
		<view class="bottomBtnBox" v-if="taskStatus == constData.taskWallStatus[9].key&&userId != upUserId">
			<button class="rightBtn" type="primary" @click="againBtn">确认领取任务</button>
		</view>

	</view>
</template>

<script>
	import uniRate from "@/components/uni-rate/uni-rate.vue"

	export default {
		components: {
			uniRate
		},
		data() {
			return {

				constData: this.$constData,
				userId: uni.getStorageSync('userId'), //登录用户id
				id: '', //模板id
				upUserId: '', //上传者ID
				title: '',
				hidden: false, //隐藏box

				userStatus: true, //用户是否可以领取

				//任务信息
				taskStatus: 999, //任务状态
				comment: [], //接单列表
				telPhone: '', //电话
				accepterId: '', //接单id
				objList: [],
				purposeList: [],
				age: '18-20',
				address: '遵义',
				money: '50',

				//选择陪吃人盒子
				upChangeBox: false,
				choiceName: 'name',

				//评分盒子
				upUserBox: false,
				rate: '',

			}
		},

		onLoad(res) {
			this.id = res.id
			this.getTask()
			this.getTaskApplys()

		},

		methods: {
			//用户二次确定领取
			againBtn() {
				let cnt = {
					taskId: this.id, // Long 任务编号
					status: status, // Byte <选填> 状态
					userId: this.userId, // Long <选填> 接单者编号
					// works: works, // Boolean <选填> 是否查询作品
					count: 1, // int 
					offset: 0, // int 
				}
				this.$api.getTaskApplys(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let arr = this.$util.tryParseJson(res.data.c)
						let id = ''
						if (arr.length > 0) {
							id = arr[0].id
						}
						this.againNext(id)
					}
				})
			},
			againNext(id) {
				let cnt = {
					id: id,
					taskId: this.id, // Long 任务id
				}
				this.$api.TaskApplyConfirm(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.switchTab({
							url:'/pages/task/task'
						})
						uni.showToast({
							title: '领取成功,快去完成任务吧',
							icon:'none'
						})
					} else {
						uni.showToast({
							title: '服务器错误,请稍后再试',
							icon: 'none'
						})
					}
				})
			},

			//取消任务
			closeTask() {
				let cnt = {
					id: this.id, // Long 任务id
				}
				this.$api.editTaskApplyStatusClose(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.showToast({
							title: '关闭成功'
						})
						uni.switchTab({
							url: '/pages/task/task'
						})
					} else {
						uni.showToast({
							title: '服务器错误,请稍后再试',
							icon: 'none'
						})
					}
				})
			},

			//任务完成按钮
			taskComplite() {
				let cnt = {
					taskId: this.id, // Long <选填> 任务编号
					// status: status, // Byte <选填> 状态
					userId: this.userId, // Long <选填> 接单者编号
					count: 10, // int 
					offset: 0, // int 
				}
				this.$api.getTaskApplys(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let arr = this.$util.tryParseJson(res.data.c)
						let cnt1 = {
							id: arr[0].id, // Long 任务订单id
							taskDate: 'food', // String 上传作品数据
						}
						this.$api.editApplyTaskData(cnt1, (res) => {
							if (res.data.rc == this.$util.RC.SUCCESS) {
								uni.switchTab({
									url: '/pages/task/task'
								})
								uni.showToast({
									title: '提交成功'
								})
							} else {
								uni.showToast({
									title: '提交失败',
									icon: 'none'
								})
							}
						})
					}
				})
			},

			//上传任务者评价对方
			upRate() {
				let cnt = {
					taskId: this.id, // Long 任务编号
					// status: this.$constData.taskStatus[1].key, // Byte <选填> 状态
					// userId: userId, // Long <选填> 接单者编号
					works: true, // Boolean <选填> 是否查询作品
					count: 1, // int 
					offset: 0, // int 
				}
				this.$api.getTaskApplys(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						console.log(this.$util.tryParseJson(res.data.c))
						let id = this.$util.tryParseJson(res.data.c)[0].id
						let cnt1 = {
							id: id,
							res: true
						}
						this.upRateWork(cnt1)
					} else {
						uni.showToast({
							title: '服务器错误',
							icon: 'none'
						})
					}
				})
			},

			upRateWork(cnt) {
				this.$api.editApplyWorks(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.switchTab({
							url: '/pages/task/task'
						})
						uni.showToast({
							title: '评价成功'
						})
					} else {
						uni.showToast({
							title: '服务器错误',
							icon: 'none'
						})
					}
				})
			},

			//设置评分分数
			setRate(Rate) {
				// console.log(Rate)
				this.rate = Rate.value
				console.log(this.rate)
			},

			//选择对象弹窗
			openBox(item) {
				if (this.taskStatus != 2 || this.userId != this.upUserId) {
					return
				}
				this.accepterId = item.id
				this.upChangeBox = true
				if (item.user) {
					this.choiceName = item.user.name
				} else {
					this.choiceName = ''
				}

			},

			//隐藏盒子
			colseBox() {
				this.hidden = false
			},

			//选择完成任务对象
			choiceUser() {
				let cnt = {
					id: this.accepterId, // Long 订单id
				}
				this.$api.editTaskApplyStatusAssigned(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.upChangeBox = false
						uni.showToast({
							title: '指派成功,等待对方确认',
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: '好像有点问题嗷',
							icon: 'none'
						})
					}
				})


			},

			//领取任务
			receiveBtn() {
				this.hidden = true
			},

			//提交信息
			submission() {
				if (this.telPhone == '') {
					uni.showToast({
						title: '请填写电话',
						icon: 'none'
					})
					return
				}

				let data = {
					tel: this.telPhone
				}

				let cnt = {
					taskId: this.id, // Long 任务id
					userId: this.userId, // Long 接单用户编号
					taskTitle: this.title, // String 任务标题
					data: data, // String <选填> 推荐信息
				}
				this.$api.createTaskApply(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.switchTab({
							url: '/pages/task/task'
						})
						uni.showToast({
							title: '领取成功'
						})
					} else {
						uni.showToast({
							title: '我觉得不行',
							icon: 'none'
						})
					}
				})

				this.hidden = false
			},

			getTask() {
				console.log('1111')
				let cnt = {
					id: this.id
				}
				this.$api.getTask(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let arr = this.$util.tryParseJson(res.data.c)
						console.log(arr)
						arr.detail = this.$util.tryParseJson(arr.detail)

						this.title = arr.title
						this.objList = arr.detail.obj
						this.purposeList = arr.detail.purpose

						this.age = arr.detail.age
						this.address = arr.detail.address
						// this.telPhone = arr.detail.tel

						this.upUserId = arr.upUserId
						this.taskStatus = arr.status
						this.getStatus()
					} else {
						console.log('erron')
					}
				})
			},

			//判断用户是否领取
			getStatus() {
				if (this.userId != this.upUserId && this.taskStatus < this.$constData.taskWallStatus[3].key) {
					let cnt = {
						taskId: this.id, // Long 任务编号
						// status: status, // Byte <选填> 状态
						userId: this.userId, // Long <选填> 接单者编号
						// works: works, // Boolean <选填> 是否查询作品
						count: 1, // int 
						offset: 0, // int 
					}
					this.$api.getTaskApplys(cnt, (res) => {
						if (res.data.rc == this.$util.RC.SUCCESS) {
							console.log('用户接单列表↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓')
							console.log(this.$util.tryParseJson(res.data.c))
							if (this.$util.tryParseJson(res.data.c).length > 0) {
								this.userStatus = false
							}
						} else {
							uni.showToast({
								title: '服务器错误'
							})
							this.userStatus = false
						}
					})
				}
			},

			getTaskApplys() {
				let cnt = {
					taskId: this.id, // Long 任务编号
					// status: status, // Byte <选填> 状态
					// userId: userId, // Long <选填> 接单者编号
					// works: works, // Boolean <选填> 是否查询作品
					count: 10, // int
					offset: 0, // int
				}
				this.$api.getTaskApplys(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						console.log('-----------------------------')
						let arr = this.$util.tryParseJson(res.data.c)
						for (let i = 0; i < arr.length; i++) {
							arr[i].data = this.$util.tryParseJson(arr[i].data)
							let time = new Date(arr[i].time)
							let y = time.getFullYear()
							let m = time.getMonth() + 1
							let d = time.getDate()
							arr[i].time = `${y}-${m}-${d}`
							if (arr[i].user) {
								arr[i].user.ext = this.$util.tryParseJson(arr[i].user.ext)
							}
						}
						this.comment = arr
						console.log(this.comment)
					}
				})
			},

		}
	}
</script>

<style lang="scss">
	.autoBox {
		padding: $box-margin-top $box-margin-left;
		font-size: $list-title;
	}

	.contentBox {
		background-color: #ec706b;
		color: #fff;
		// font-weight: bold;
		border-radius: 10upx;
		padding: $box-margin-top $box-margin-left;

		text {
			display: inline-block;
			width: 33.3%;
			text-align: center;
		}
	}

	.leftTitle {
		display: inline-block;
		width: 20vw;
		text-align: center;
	}

	.infoText {
		color: $list-info-color;
	}

	.bottomBox {
		margin: $box-margin-top $box-margin-left;
		font-size: $list-title;
	}

	.s-header {
		padding: 20upx 30upx;
		font-size: 30upx;
		color: #303133;
		background: #fff;
		margin-top: 16upx;

		&:before {
			content: '';
			width: 0;
			height: 40upx;
			margin-right: 24upx;
			border-left: 6upx solid #ec706b;
		}
	}

	/* 评论 */
	.evalution {
		display: flex;
		flex-direction: column;
		background: #fff;
		padding: 20upx 0;
	}

	.eva-item {
		display: flex;
		padding: 20upx 30upx;
		position: relative;

		image {
			width: 60upx;
			height: 60upx;
			border-radius: 50px;
			flex-shrink: 0;
			margin-right: 24upx;
		}

		&:after {
			content: '';
			position: absolute;
			left: 30upx;
			bottom: 0;
			right: 0;
			height: 0;
			border-bottom: 1px solid #eee;
			transform: translateY(50%);
		}

		&:last-child:after {
			border: 0;
		}
	}

	.eva-right {
		display: flex;
		flex-direction: column;
		flex: 1;
		font-size: 26upx;
		color: #909399;
		position: relative;

		.zan-box {
			display: flex;
			align-items: base-line;
			position: absolute;
			top: 10upx;
			right: 10upx;

			.yticon {
				margin-left: 8upx;
			}
		}

		.content {
			font-size: 28upx;
			color: #333;
			padding-top: 20upx;
		}
	}

	/* end */

	.bottomBtn {
		position: fixed;
		bottom: 10upx;
		width: 100vw;
	}

	.receiveBtn {
		width: 80vw;
		margin: 0 auto;
		font-size: $list-title;
	}

	.hiddenBox {
		position: fixed;
		z-index: 5;
		box-sizing: border-box;
		padding: $box-margin-top $box-margin-left;
		background-color: #fff;
		height: 210upx;
		width: 100vw;
		bottom: 0;
		box-shadow: 0px -5px 5px #888888;

		button {
			position: absolute;
			bottom: 10upx;
			left: 50%;
			width: 5em;
			margin-left: -2.5em;
			font-size: $list-title;
		}

		input {
			width: 10em;
			font-size: $list-title;
		}

		// z-index: 3;
	}

	.colseBox {
		position: absolute;
		right: 10upx;
		top: 10upx;
		font-size: 30upx;
		width: 40upx;
		height: 40upx;
		text-align: center;
		background-color: #ec706b;
		color: #F8F8F8;
	}

	.upLoadBox {
		padding: $box-margin-top $box-margin-left;
		font-size: $list-title;
	}

	.commitBtn {
		position: relative;

		button {
			position: absolute;
			width: 5em;
			font-size: $list-title;
			right: 0;
		}
	}

	.bottomBtnBox {
		position: fixed;
		bottom: $box-margin-top;
		height: 2em;
		width: 100vw;

		button {
			position: absolute;
			display: inline-block;
			font-size: $list-title;
		}
	}

	.leftBtn {
		left: 5vw;
	}

	.rightBtn {
		right: 5vw;
	}

	.choiceB {
		position: fixed;
		padding: $box-margin-top $box-margin-left;
		box-sizing: border-box;
		height: 45vw;
		width: 80vw;
		top: 50%;
		transform: translate(-50%, -50%);
		left: 50%;
		background-color: #fff;
		box-shadow: 0px 0px 10px #333333;
		border-radius: 10upx;
	}

	.choiceTitle {
		font-size: $list-title;
		font-weight: bold;
	}

	.choiceBtnBox {
		position: absolute;
		left: 0;
		height: 2em;
		bottom: $box-margin-top;
		width: 100%;

		button {
			position: absolute;
			font-size: $list-title;
		}
	}

	.noEva {
		padding: $box-margin-top $box-margin-left;
		font-size: $list-title;
	}

	.rateBox {
		display: inline-block;
		margin-bottom: 10upx;
	}
</style>
