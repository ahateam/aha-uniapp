<template>
	<view>
		<nav-bar :back="false">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
			<view class="view-title">{{title}}</view>
		</nav-bar>
		<data-input v-model="price" price="澳元" title="您给多少钱" hiddenIcon></data-input>
		<data-input v-model="time" title="完成时间" hiddenIcon disabled @click="showTimeBox"></data-input>

		<view class="bottom-box">
			<next-btn title="发布任务" radius="6rpx" @click="createTask"></next-btn>
			<view style="margin-top: 30rpx;">
				<next-btn title="保存为草稿" type="default" radius="6rpx" @click="createDrafts"></next-btn>
			</view>
		</view>

		<w-picker mode="dateTime" startYear="2019" endYear="2030" :defaultVal="defaultVal" :current="true" @confirm="onConfirm"
		 ref="picker" themeColor="#f00"></w-picker>
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
			price: {
				get() {
					return this.$store.state.taskInfo.payPrice
				},
				set(value) {
					this.$store.commit('updataPayPrice', value)
				}
			},

			time() {
				return this.$store.state.taskInfo.finishDate
			}
		},

		data() {
			return {
				title: '发布任务',
				defaultVal: "['2018','12','31']"
			};
		},
		methods: {
			onConfirm(res) {
				this.$store.commit('updataFinishDate', res.result)
				this.$refs.picker.hide()
			},

			showTimeBox() {
				this.$refs.picker.show()
			},

			createTask() {
				uni.reLaunch({
					url: './complete'
				})
			},

			navBack() {
				uni.navigateBack()
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
