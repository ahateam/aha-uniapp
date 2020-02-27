<template>
	<view class="body">
		<!-- 用户 -->
		<view class="commentBox" :style="index == 0 ? 'border:none' : ''" v-for="(list, index) in comment" :key="index">
			<view class="userBox">
				<image :src="constData.oss + list.user.userHead" mode="aspectFill"></image>
				<view class="rightBox">
					<view>{{ list.user.userName }}</view>
				</view>
				<view class="time">{{ getTime(list.reply.createTime) }}</view>
			</view>

			<view class="textBox">{{ list.reply.text }}</view>

			<image class="img-box" :src="constData.oss + list.reply.ext" mode="widthFix"></image>

			<!-- 回复区 -->
			<view class="replay-more" v-if="item.totalCount">更多{{ item.totalCount }}条回复</view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['comment'],
	data() {
		return {
			constData: this.$constData
		};
	},
	methods: {
		getTime(time) {
			return this.$commen.getTimeAgo(time);
		}
	}
};
</script>

<style lang="scss" scoped>
.body {
	position: relative;
}

.body {
	position: relative;
	width: 100%;
}

.userBox {
	position: relative;
	font-size: $group-font;
	line-height: $group-font-line;
	color: $group-color;

	image {
		position: absolute;
		top: 50%;
		margin-top: -30rpx;
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		overflow: hidden;
	}
}

.rightBox {
	margin: 11rpx 0 0 80rpx;
	font-size: $group-font;
	line-height: $group-font-line;
	color: #333333;
}

.time {
	position: absolute;
	right: 0;
	top: 0;
	font-size: $group-font-info;
	line-height: $group-font-info;
	color: #999999;
	margin-top: 11rpx;
}

.textBox {
	font-size: $group-font;
	line-height: $group-font-line;
	color: #333333;
	margin: $group-margin-top 0 $group-margin-befor 80rpx;
}

.commentBox {
	padding: 24rpx 0;
	border-top: 1rpx rgba($color: $group-color-border, $alpha: 0.8) solid;
}

.replay-more {
	margin-left: 80rpx;
	color: $group-color-btn;
	font-size: $group-font;
	line-height: 37rpx;
}

.img-box {
	margin-left: 80rpx;
	width: 450rpx;
	height: auto;
	margin-bottom: $group-margin-befor;
}
</style>
