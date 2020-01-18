<template>
	<view>
		<view class="share-body" @click="click">
			<view class="share-box" :class="{ 'agent-box': shareInfo.shareType == constData.shareType[0].key }">
				<view class="share-text" :style="getType(shareInfo.shareType) ? '-webkit-line-clamp:1' : ''">
					<view>{{ shareInfo.shareText }}</view>
					<view class="other-text" v-if="getType(shareInfo.shareType)">AUD&nbsp;{{ shareInfo.ext }}</view>
				</view>
				<view style="position: relative;" :style="shareInfo.shareType == constData.shareType[0].key ? 'margin-right:20rpx' : 'margin-left:35rpx'">
					<image
						class="auto-img"
						:class="{ 'agent-head': shareInfo.shareType == constData.shareType[0].key }"
						:src="getImgSrc(shareInfo.shareImg)"
						mode="aspectFill"
					></image>
					<image class="agent-icon" v-if="shareInfo.shareType == constData.shareType[0].key" src="/static/image/icon/icon_dlr_xz.png" mode="aspectFit"></image>
				</view>
			</view>
			<view class="info-box">{{ getInfo(shareInfo.shareType) }}</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'ShareBox',
	props: ['shareInfo'],
	data() {
		return {
			constData: this.$constData
		};
	},
	methods: {
		getInfo(e) {
			if (e == this.$constData.shareType[0].key) {
				return '榴莲APP认证代理人  大家都在找';
			} else if (e == this.$constData.shareType[1].key || e == this.$constData.shareType[2].key) {
				return '榴莲APP热搜帖  大家都在看';
			} else if (this.getType(e)) {
				return '每个人都能在榴莲APP找到心头好';
			}
		},

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
			} else if (this.shareInfo.shareType == this.$constData.shareType[0].key) {
				uni.navigateTo({
					url: `/pages/shareView/agentView?id=${this.shareInfo.shareId}`
				});
			} else if (this.getType(this.shareInfo.shareType)) {
				uni.navigateTo({
					url: `/pages/shop/goodsInfo/studyGoods?id=${this.shareInfo.shareId}`
				});
			}
		},

		getImgSrc(src) {
			if (src.indexOf('/static/image/share/') != -1) {
				return src;
			} else {
				return this.$constData.oss + src;
			}
		},

		getType(e) {
			if (e == this.$constData.shareType[3] || e == this.$constData.shareType[4].key || e == this.$constData.shareType[7].key) {
				return true;
			} else {
				return false;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.share-body {
	border-radius: 6rpx;
	border: 1rpx solid #cfdce9;
	background-color: $group-color-w;
}

.share-box {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx;
	box-sizing: border-box;
	height: 140rpx;
	border-bottom: 1rpx solid #cfdce9;

	.auto-img {
		width: 100rpx;
		height: 100rpx;
		border-radius: 4rpx;
	}
}

.share-text {
	width: 80%;
	color: #333333;
	font-size: $group-font;
	line-height: $group-font-line;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}

.info-box {
	padding: 9rpx 20rpx 12rpx;
	color: #999999;
	font-size: 22rpx;
	line-height: 30rpx;
}

.agent-head {
	border-radius: 50% !important;
}

.agent-icon {
	position: absolute;
	right: 0;
	bottom: 0;
	width: 24rpx;
	height: 34rpx;
}

.other-text {
	font-size: 24rpx;
	color: #ffa405;
	line-height: 30rpx;
	margin-top: 10rpx;
}

.agent-box {
	flex-direction: row-reverse;
}
</style>
