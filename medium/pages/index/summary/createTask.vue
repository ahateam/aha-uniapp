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
				<next-btn title="保存为草稿" type="default" radius="6rpx"></next-btn>
			</view>
		</view>
	</view>
</template>

<script>
	import DataInput from '@/components/dataInput/DataInput.vue'
	import NextBtn from '@/components/NextBtn/NextBtn.vue'
	import navBar from '@/components/zhouWei-navBar/index.vue'

	export default {
		components: {
			navBar,
			DataInput,
			NextBtn
		},
		data() {
			return {
				title: '发布任务',
				price: '', //多少钱
				time: '', //完成时间
			};
		},
		methods: {
			showTimeBox() {
				this.time = '666666'
			},

			createTask() {
				uni.reLaunch({
					url:'./complete'
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
