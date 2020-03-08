<template>
	<view id="page">
		<view v-if="pageStatus != 'onload'">
			<view class="nav-box flex-box">
				<image class="back-icon" src="/static/image/icon/icon_back_w.png" @tap="navBack" mode="aspectFit"></image>
			</view>
			<image class="view-bg" src="/static/image/bg_c.png" mode="widthFix"></image>
			<view class="content-box">
				<view class="radius-box"></view>

				<view class="task-title flex-box">
					<view class="left-line"></view>
					<view class="left-title">{{ task.title }}</view>
					<view class="price-box">
						<view class="tasker-text" v-if="task.advanceType == constData.priceType[2].key">由任务人报价</view>
						<view class="flex-box price-info" v-else>
							<view class="money-info">{{ task.advanceAmount }}</view>
							<view v-if="task.advanceType == constData.priceType[0].key">澳元/总价</view>
							<view v-if="task.advanceType == constData.priceType[1].key">>澳元/小时</view>
						</view>
					</view>
				</view>

				<view class="auto-info flex-box" v-if="task.updataTime">
					<view class="left-dot"></view>
					<view class="left-time-title">
						接收时间
						<text>{{ getDateTime(task.updataTime) }}</text>
					</view>
				</view>

				<view class="auto-info flex-box">
					<view class="left-dot"></view>
					<view class="left-time-title">
						完成时间
						<text>{{ getDateTime(task.finishTime) }}</text>
					</view>
				</view>

				<view class="auto-info flex-box" v-if="task.applyNum == 0">
					<view class="left-dot"></view>
					<view class="left-time-title">
						收到报价
						<text>{{ task.applyNum }}</text>
					</view>
				</view>

				<view class="status-box flex-box">
					<view class="left-dot" style="background-color: #508324;"></view>
					<view class="status-text">{{ getStatus(task.status) }}</view>

					<view class="tasker-price-box" v-if="task.applyNum > 0">
						<image src="/static/image/task/icon_sdlgbj.png" mode="aspectFit"></image>
						<view>
							收到
							<text style="font-size: 30rpx;">{{ task.applyNum }}</text>
							个报价
						</view>
					</view>
				</view>

				<view class="flex-box auto-info">
					<image class="address-icon" src="/static/image/icon/position.png" mode="aspectFit"></image>
					<view>{{ address }}</view>
					<view style="font-size: 26rpx;">(距我{{ margin }}公里)</view>
				</view>
				<view class="bottom-line" v-if="mapShow">
					<map @markertap="testFct" :markers="markers" :longitude="pos.longitude" :latitude="pos.latitude" id="myMap" ref="myMap"></map>
				</view>
				<view class="task-info-title">
					<text style="position: relative;z-index: 1;">详情描述</text>
					<view class="task-info-title-bg"></view>
				</view>
				<view class="task-info-text">{{ task.detail.text }}</view>
				<view>
					<view class="flex-box img-list-box">
						<image class="auto-imgs" :class="{ 'big-img': index == 0 }" :style="index % 3 == 0 ? 'margin-right:0' : ''" v-for="(item, index) in task.detail.imgList"
						 :key="index" :src="constData.oss + item" mode="aspectFill"></image>
					</view>
				</view>
			</view>

			<view class="bottom-btn-box" v-if="task.status == constData.taskWall[0].key"></view>
			<view class="buttons flex-box" @tap="accTheTask" v-if="task.status == constData.taskWall[0].key">
				<view v-if="task.advanceType != 2">急速接单</view>
				<view v-else>我要报价</view>
			</view>
			<!-- <button @click="acceptTask">接任务</button>
			<button @click="addPrice">报价</button> -->

			<view class="comment-box">
				<view class="comment-title">
					<view style="position: relative;z-index: 1;">任务者留言</view>
					<view class="comment-radius"></view>
					<view class="comment-info">请不要提供私人信息哦</view>
				</view>
				<view v-if="commentList.length == 0" class="no-comment flex-box">
					<image src="/static/image/ly.png" mode="aspectFit"></image>
					<view>想接单，先评论</view>
				</view>
				<view class="comment-list" v-else>
					<comment :comment="commentList"></comment>
				</view>
			</view>
		</view>

		<loading :status="pageStatus"></loading>
	</view>
</template>

<script>
	import Loading from '@/components/Loading/Loading.vue';
	import comment from '@/components/comment/comment.vue';

	export default {
		components: {
			Loading,
			comment
		},
		data() {
			return {
				constData: this.$constData,

				taskId: '',

				pageStatus: 'onload', // 接口回调状态

				task: {}, // 任务对象

				commentList: [], // 评论列表

				pos: {}, // 坐标对象

				address: {}, // 任务地点地址

				margin: '', // 距当前用户距离

				mapShow: false, // 地图是否需要渲染

				markers: [] // 地图标点
			};
		},
		methods: {
			testFct(res) {
				console.log(res);
			},

			getAddress() {
				let arr = this.task.pos.split(',');
				this.pos = {
					latitude: Number(arr[0]),
					longitude: Number(arr[1])
				};

				let mapSearch = weex.requireModule('mapSearch');

				this.markers.splice(0, 0, {
					id: 1,
					latitude: Number(arr[0]),
					longitude: Number(arr[1]),
					iconPath: '',
					width: 5,
					height: 5
				});
				setTimeout(() => {
					this.mapShow = true;
				}, 300);

				this.getMargin(arr);

				mapSearch.reverseGeocode({
						point: {
							latitude: Number(arr[0]),
							longitude: Number(arr[1])
						}
					},
					res => {
						if (res.type == 'success') {
							this.address = res.address;
						} else {
							this.address = res.message;
						}
					}
				);
			},

			getMargin(arr) {
				uni.getLocation({
					type: 'gcj02',
					success: res => {
						let margin = this.$commen.GetDistance(res.latitude, res.longitude, arr[0], arr[1]);
						this.margin = margin.toFixed(2);
					},
					fail: err => {
						uni.showToast({
							title: res.errMsg,
							icon: 'none'
						});
					}
				});
			},

			getStatus(status) {
				let obj = this.$constData.taskWall.find(i => i.key == status);
				return obj.val;
			},

			addPrice() {
				console.log(uni.getStorageSync('accTaskTitle'))
				uni.navigateTo({
					url: `./accTask?id=${this.task.id}`
				});
			},

			accTheTask() {
				if (this.task.advanceType != 2) {
					let userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'));
					let cnt = {
						taskId: this.task.id, // Long 任务id
						userId: userInfo.userId, // Long 用户id
					};
					this.$api.accpetTask(cnt, res => {
						if (res.data.rc == this.$util.RC.SUCCESS) {
							uni.navigateTo({
								url: `../accSuccess/accSuccess`
							});
							uni.showToast({
								title: '接收成功',
								icon: 'none'
							});
						} else {
							uni.showToast({
								title: res.data.rm,
								icon: 'none'
							});
						}
					});
				} else {
					uni.removeStorageSync('accTaskTitle');
					uni.setStorageSync('accTaskTitle', this.task.title);
					uni.navigateTo({
						url: `./accTask?id=${this.task.id}&advanceType=${this.task.advanceType}&price=${this.task.advanceAmount}`
					});
				}
			},

			navBack() {
				uni.navigateBack();
			},

			getTask(cnt) {
				this.$api.getTask(cnt, res => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let obj = this.$util.tryParseJson(res.data.c);
						obj.detail = this.$util.tryParseJson(obj.detail);
						console.log(obj);
						console.log('______________________________________');
						this.task = obj;
						this.pageStatus = 'succ';
						this.getAddress();
					} else {
						uni.showToast({
							title: '服务器错误',
							icon: 'none'
						});
					}
				});
			},

			getDateTime(time) {
				return this.$commen.getNewDate(time);
			},

			getReplys(cnt) {
				this.$api.getReplys(cnt, res => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.commentList = this.$util.tryParseJson(res.data.c);
						console.log('----------评论------------');
						console.log(this.commentList);
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						});
					}
				});
			}
		},
		onLoad(res) {
			this.taskId = res.id;
			let userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'));
			this.userInfo = userInfo;
			let cnt = {
				ownerId: this.taskId, // Long 帖子id
				userId: userInfo.userId, // Long 当前用户id
				sort: true, // Boolean 是否排序
				count: 10, // int
				offset: 0 // int
			};
			this.getReplys(cnt);
		},
		onReady() {
			let cnt = {
				id: this.taskId // Long 任务id
			};
			this.getTask(cnt);
		}
	};
</script>

<style lang="scss" scoped>
	#page {
		background-color: $group-color-bg;
		min-height: 100vh;
	}

	.view-bg {
		position: absolute;
		top: 0;
		z-index: 0;
		width: 100vw;
		height: 100vh;
	}

	.nav-box {
		position: relative;
		z-index: 1;
		padding-top: $status-height;
		height: 88rpx;
	}

	.flex-box {
		display: flex;
		align-items: center;
	}

	.back-icon {
		position: absolute;
		left: 0;
		padding: 10rpx 29rpx;
		width: 33rpx;
		height: 33rpx;
	}

	.content-box {
		position: relative;
		margin: 40rpx 30rpx 30rpx;
		box-sizing: border-box;
		width: 690rpx;
		padding: 40rpx 30rpx;
		background-color: #ffffff;
		border-radius: 6rpx;
	}

	.radius-box {
		position: absolute;
		left: 417rpx;
		top: 0;
		width: 182rpx;
		height: 89rpx;
		border-radius: 0 0 182rpx 182rpx;
		background-color: rgba($color: #ffd78d, $alpha: 0.1);
	}

	.task-title {
		position: relative;
		padding-bottom: 14rpx;
	}

	.left-line {
		position: absolute;
		left: -30rpx;
		height: 40rpx;
		width: 5rpx;
		border-radius: 0 4rpx 4rpx 0;
		background-color: $group-color-btn;
	}

	.left-title {
		font-size: 34rpx;
		line-height: 48rpx;
		color: #333333;
	}

	.price-box {
		position: absolute;
		right: 10rpx;
		top: 0;
	}

	.tasker-text {
		color: $group-color-curr;
		font-size: 26rpx;
		line-height: 37rpx;
	}

	.price-info {
		flex-direction: column;
		justify-content: flex-end;
		font-size: 20rpx;
		line-height: 28rpx;
		color: #999999;
	}

	.money-info {
		color: $group-color-curr;
		font-size: 50rpx;
		line-height: 58rpx;
		margin-bottom: 8rpx;
	}

	.auto-info {
		color: #666666;
		font-size: 28rpx;
		line-height: 40rpx;
		margin-top: 30rpx;
	}

	.tasker-price-box {
		position: absolute;
		right: -44rpx;
		bottom: 34rpx;

		image {
			width: 260rpx;
			height: 72rpx;
		}

		view {
			position: absolute;
			right: 24rpx;
			top: 21rpx;
			width: 100%;
			line-height: 42rpx;
			font-size: 26rpx;
			color: #ffffff;
			text-align: right;
		}
	}

	.left-dot {
		margin: 12rpx 32rpx 12rpx 12rpx;
		width: 12rpx;
		height: 12rpx;
		border-radius: 50%;
		background-color: #c4d06a;
	}

	.left-time-title {
		text {
			margin-left: 30rpx;
			font-size: 30rpx;
		}
	}

	.status-box {
		position: relative;
		margin-top: 30rpx;
		color: $group-color-btn;
		font-size: 26rpx;
		line-height: 37rpx;
		padding-bottom: 33rpx;
		border-bottom: 1rpx solid #eef1f2;
	}

	.address-icon {
		width: 36rpx;
		height: 36rpx;
		margin: 0 10rpx 0 0;
	}

	#myMap {
		width: 630rpx;
		height: 240rpx;
		margin: 30rpx auto;
	}

	.bottom-line {
		border-bottom: 1rpx solid $group-color-border;
	}

	.task-info-title {
		position: relative;
		color: #333333;
		font-size: 34rpx;
		line-height: 48rpx;
		margin-top: 30rpx;

		.task-info-title-bg {
			position: absolute;
			bottom: 0;
			z-index: 0;
			background-color: #fff8e5;
			width: 150rpx;
			height: 20rpx;
			border-radius: 10rpx;
		}
	}

	.task-info-text {
		margin-top: 30rpx;
		color: #666666;
		font-size: 30rpx;
		line-height: 50rpx;
	}

	.img-list-box {
		flex-wrap: wrap;
		border-radius: 6rpx;
	}

	.auto-imgs {
		margin: 15rpx 15rpx 0 0;
		width: 200rpx;
		height: 200rpx;
	}

	.big-img {
		margin-top: 30rpx;
		width: 630rpx;
		height: 502rpx;
	}

	.bottom-btn-box {
		position: fixed;
		z-index: 1;
		bottom: 0;
		background-image: linear-gradient(transparent, #ffffff);
		height: 240rpx;
		width: 100vw;
		pointer-events: none;
	}

	.buttons {
		position: fixed;
		z-index: 2;
		bottom: 30rpx;
		justify-content: center;
		width: 690rpx;
		height: 102rpx;
		margin-left: 30rpx;
		border-radius: 6rpx;
		background-color: #0f1b07;
		color: #ffffff;
		font-size: 30rpx;
		margin-bottom: 30rpx;
	}

	.comment-box {
		position: relative;
		margin: 50rpx 0 0;
		padding-top: 50rpx;
		padding-bottom: 172rpx;
		border-radius: 20rpx 20rpx 0 0;
		background-color: #ffffff;
		box-sizing: border-box;
	}

	.comment-title {
		position: relative;
		left: 50rpx;
		color: #333333;
		font-size: 34rpx;
		line-height: 48rpx;
	}

	.comment-radius {
		position: absolute;
		top: 0;
		left: -14rpx;
		background-image: linear-gradient(#ffd78d, #ffb700);
		opacity: 0.5;
		border-radius: 50%;
		width: 50rpx;
		height: 50rpx;
	}

	.comment-info {
		margin-top: 20rpx;
		line-height: 37rpx;
		font-size: 26rpx;
		color: #999999;
	}

	.comment-list {
		padding: 0 50rpx;
	}

	.no-comment {
		flex-direction: column;
		justify-content: center;
		padding: 150rpx 0 50rpx;
		color: #999999;
		font-size: $group-font;
		line-height: 37rpx;

		image {
			height: 196rpx;
			width: 149rpx;
			margin-bottom: 50rpx;
		}
	}
</style>
