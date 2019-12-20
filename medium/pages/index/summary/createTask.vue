<template>
	<view>
		<nav-bar :back="false">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
			<view class="view-title">{{title}}</view>
			<view slot="right" class="del-text" @click="delBoxShow = true" v-if="status">删除</view>
		</nav-bar>
		<data-input v-model="price" :inputHidden="delBoxShow" type="number" price="澳元" title="您给多少钱" hiddenIcon></data-input>
		<data-input v-model="time" :inputHidden="delBoxShow" title="完成时间" hiddenIcon disabled @click="showTimeBox"></data-input>

		<view class="bottom-box">
			<next-btn title="发布任务" radius="6rpx" @click="createTask(0)"></next-btn>
			<view style="margin-top: 30rpx;">
				<next-btn title="保存为草稿" type="default" radius="6rpx" @click="createTask(1)"></next-btn>
			</view>
		</view>

		<w-picker mode="limit" :startYear="startYear" :endYear="startYear + 30" :defaultVal="defaultVal" :current="true"
		 @confirm="onConfirm" ref="picker" themeColor="#00C8BE"></w-picker>

		<uni-popup :show="delBoxShow" type="center" @change="changePopup">
			<view class="popup-box">
				<view>确定删除任务吗</view>
				<view class="popup-btn-box">
					<button class="succ-btn" @click="delTask">确定</button>
					<button class="colse-btn" @click="delBoxShow = false">再想想</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import DataInput from '@/components/dataInput/DataInput.vue'
	import NextBtn from '@/components/NextBtn/NextBtn.vue'
	import navBar from '@/components/zhouWei-navBar/index.vue'
	import wPicker from "@/components/w-picker/w-picker.vue";
	import uniPopup from '@/components/uni-popup/uni-popup.vue'

	export default {
		components: {
			navBar,
			DataInput,
			NextBtn,
			wPicker,
			uniPopup
		},
		computed: {
			startYear() {
				return new Date().getFullYear()
			},

			price: {
				get() {
					return this.$store.state.task.taskInfo.taskBudget
				},
				set(value) {
					this.$store.commit('updatePayPrice', value)
				}
			},
		},

		data() {
			return {
				title: '发布任务',
				defaultVal: "['2018','12','31']",
				time: this.$store.state.task.taskInfo.finishDate,
				status: 0,
				delBoxShow: false
			};
		},
		methods: {
			changePopup(e) {
				if (!e.show) {
					this.delBoxShow = false
				}
			},

			onConfirm(res) {
				this.$store.commit('updateFinishDate', res.result)
				this.time = res.result
				this.$refs.picker.hide()
			},

			showTimeBox() {
				this.$refs.picker.show()
			},

			createTask(e) {
				if (this.$store.state.task.taskInfo.taskBudget && this.$store.state.task.taskInfo.finishDate) {
					let cnt = { ...this.$store.state.task.taskInfo
					}
					if (cnt.fileData.length == 0) {
						let {
							fileData,
							...obj
						} = cnt
						cnt = obj
					} else {
						cnt.fileData = JSON.stringify(cnt.fileData)
					}

					if (cnt.imgData.length == 0) {
						let {
							imgData,
							...obj
						} = cnt
						cnt = obj
					} else {
						cnt.imgData = JSON.stringify(cnt.imgData)
					}

					if (e) {
						cnt.isDrafts = true
						cnt.status = this.$constData.taskWall[2].key
					} else {
						cnt.status = this.$constData.taskWall[0].key
					}
					cnt.publishUserId = this.$util.tryParseJson(uni.getStorageSync('userInfo')).userId
					if (this.status) {
						this.updateTaskByTaskId(cnt)
					} else {
						this.createTaskApi(cnt)
					}
				} else {
					uni.showToast({
						title: '请将信息填写完整',
						icon: 'none'
					})
				}
			},

			navBack() {
				uni.navigateBack()
			},

			delTask() {
				let cnt = {
					taskId: this.$store.state.task.taskInfo.taskId, // Long 任务id
				}
				this.$api.deletDurianTaskByTaskId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.switchTab({
							url: '/pages/myTask/myTask'
						})
						uni.showToast({
							title: '删除成功!'
						})
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			},

			updateTaskByTaskId(cnt) {
				this.$api.updateTaskByTaskId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.navigateTo({
							url: './complete'
						})
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			},

			createTaskApi(cnt) {
				this.$api.createTask(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.navigateTo({
							url: './complete'
						})
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			}
		},
		onLoad(res) {
			this.status = res.ediotr
		}
	}
</script>

<style lang="scss" scoped>
	.back-icon {
		position: absolute;
		left: 0;
		padding: 10rpx 29rpx;
		width: 33rpx;
		height: 33rpx;
	}

	.view-title {
		color: #333333;
		font-size: 36rpx;
		font-weight: normal;
	}

	.del-text {
		font-size: 34rpx;
		color: $group-color;
		margin-right: 30rpx;
	}

	.bottom-box {
		position: fixed;
		width: 100%;
		box-sizing: border-box;
		bottom: 30rpx;
		padding: 0 30rpx;
	}

	.popup-box {
		width: 600rpx;
		height: 322rpx;
		box-sizing: border-box;
		padding: 70rpx 40rpx 40rpx;
		font-size: $group-font-befor;
		line-height: 42rpx;
		background-color: $group-color-w;
		border-radius: 4rpx;
		text-align: center;
	}

	.popup-btn-box {
		display: flex;
		margin-top: 90rpx;
		line-height: 80rpx;

		button {
			width: 250rpx;
			margin: 0 20rpx;
			box-sizing: border-box;
			color: $group-color;
			border-radius: 0;

			&:after {
				border: none;
			}
		}
	}

	.succ-btn {
		background-color: #00C8BE;
		color: $group-color-w !important;
	}

	.colse-btn {
		background: #FFFFFF;
		border: 1rpx solid $group-color-befor;
	}
</style>
