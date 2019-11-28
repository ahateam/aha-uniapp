<template>
	<view>
		<nav-bar :back="false">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
			<view class="view-title">填写表格</view>
		</nav-bar>
		<view style="margin-top: 10rpx;"></view>
		<data-input v-model="taskType" :hiddenIcon="true" placeholder="填写表格" title="任务分类"></data-input>
		<data-input v-model="title" :hiddenIcon="true" placeholder=" " title="任务名称"></data-input>
		<data-input v-model="formType" :hiddenIcon="true" placeholder="填写表格" title="表格类别"></data-input>

		<data-input v-model="remark" :hiddenIcon="true" placeholder=" " title="特别提醒"></data-input>
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'
	import DataInput from '@/components/dataInput/DataInput.vue'

	export default {
		name: 'form',
		components: {
			navBar,
			DataInput
		},
		data() {
			return {
				taskType: '',
				title: '',
				formType: '',

				remark: '',
			}
		},
		methods: {
			navBack() {
				uni.navigateBack()
			}
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
</style>
