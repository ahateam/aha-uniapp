<template>
	<view>
		<nav-bar :back="false">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
			<view class="view-title">{{title}}</view>
			<view slot="right" class="del-text" @click="delTask" v-if="status">删除</view>
		</nav-bar>
		<data-input v-model="price" price="澳元" title="您给多少钱" hiddenIcon></data-input>
		<data-input v-model="time" title="完成时间" hiddenIcon disabled @click="showTimeBox"></data-input>

		<view class="bottom-box">
			<next-btn title="发布任务" radius="6rpx" @click="createTask(0)"></next-btn>
			<view style="margin-top: 30rpx;">
				<next-btn title="保存为草稿" type="default" radius="6rpx" @click="createTask(1)"></next-btn>
			</view>
		</view>

		<w-picker mode="limit" :startYear="startYear" :endYear="startYear + 30" :defaultVal="defaultVal" :current="true"
		 @confirm="onConfirm" ref="picker" themeColor="#00C8BE"></w-picker>
	</view>
</template>

<script>
	import DataInput from '@/components/dataInput/DataInput.vue'
	import NextBtn from '@/components/NextBtn/NextBtn.vue'
	import navBar from '@/components/zhouWei-navBar/index.vue'
	import wPicker from "@/components/w-picker/w-picker.vue";

	export default {
		components: {
			navBar,
			DataInput,
			NextBtn,
			wPicker
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
				status: 0
			};
		},
		methods: {
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
</style>
