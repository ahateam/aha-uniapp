<template>
	<view>
		<nav-bar :back="false">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
			<view class="view-title">{{title}}</view>
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
					return this.$store.state.taskInfo.payPrice
				},
				set(value) {
					this.$store.commit('updataPayPrice', value)
				}
			},
		},

		data() {
			return {
				title: '发布任务',
				defaultVal: "['2018','12','31']",
				time: this.$store.state.taskInfo.finishDate
			};
		},
		methods: {
			onConfirm(res) {
				this.$store.commit('updataFinishDate', res.result)
				this.time = res.result
				this.$refs.picker.hide()
			},

			showTimeBox() {
				this.$refs.picker.show()
			},

			createTask(e) {
				let cnt = { ...this.$store.state.taskInfo
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

				this.createTaskApi(cnt)
			},

			navBack() {
				uni.navigateBack()
			},

			createTaskApi(cnt) {
				this.$api.createTask(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.reLaunch({
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
			console.log(res)
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

	.bottom-box {
		position: fixed;
		width: 100%;
		box-sizing: border-box;
		bottom: 30rpx;
		padding: 0 30rpx;
	}
</style>
