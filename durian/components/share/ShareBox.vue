<template>
	<view>
		<view class="share-box" @click="click">
			<image :src="shareInfo.shareImg" mode="aspectFill"></image>
			<view class="share-text">{{ shareInfo.shareText }}...</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'ShareBox',
	props: ['shareInfo'],
	data() {
		return {};
	},
	methods: {
		click() {
			if (this.shareInfo.shareType == this.$constData.shareType[1].key || this.shareInfo.shareType == this.$constData.shareType[2].key) {
				if (this.shareInfo.type == this.$constData.groupType[3].key) {
					uni.navigateTo({
						url: `/pages/find/videoView/videoView?id=${this.shareInfo.shareId}`
					});
				} else {
					uni.navigateTo({
						url: `/pages/find/imgView/imgView?id=${this.shareInfo.shareId}`
					});
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.share-box {
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: $group-color-search;
	padding: 18rpx;
	box-sizing: border-box;

	image {
		width: 100rpx;
		height: 100rpx;
	}
}

.share-text {
	width: 80%;
	color: $group-color-befor;
	font-size: $group-font-befor;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
