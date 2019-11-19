<template>
	<view>
		<view class="search-box">
			<view class="search-input-box">
				<text class="iconfont icon-iconfonticonfontsousuo1 search-icon"></text>
				<input focus type="text" class="search-input" v-model="text" :placeholder="newInfo" />
			</view>
			<view class="back-text" @click="navBack">取消</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text: '',
				newInfo: '期末考通关秘籍',
			};
		},
		methods: {
			navBack() {
				uni.navigateBack()
			},

		}
	}
</script>

<style lang="scss" scoped>
	.search-box {
		display: flex;
		align-items: center;
		padding: 50rpx 30rpx 0;
		font-size: $group-font-befor;
	}

	.search-input-box {
		display: flex;
		align-items: center;
		box-sizing: border-box;
		background-color: $group-color-search;
		width: 600rpx;
		height: 70rpx;
		padding: 0 30rpx;
		border-radius: 4rpx;
		margin-right: 30rpx;
	}

	.search-icon {
		font-size: 28rpx;
		margin-right: 15rpx;
	}

	.search-input {
		font-size: 28rpx;
		flex: 1;
	}

	.back-text {
		color: $group-color;
	}
</style>
