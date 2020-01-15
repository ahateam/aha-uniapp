<template>
	<view class="body">
		<!-- 用户 -->
		<view class="commentBox" :style="index == 0 ? 'border:none' : ''" v-for="(list, index) in comment" :key="index">
			<view class="userBox">
				<image :src="constData.oss + list.user.userHead" mode="aspectFill"></image>
				<view class="rightBox">
					<view>{{ list.user.userName }}</view>
					<view class="time">{{ getTime(list.reply.createTime) }}</view>
				</view>

				<!-- 点赞 -->
				<view class="tag-box">密信</view>
			</view>

			<view class="textBox">{{ list.reply.text }}</view>
			<!-- 回复区 -->
			<view class="replayBtn" @click="createComment(list, index)" v-if="list.reply.sequenceId">回复</view>
			<view class="replayBox" v-if="list.comment[0].commentInfo">
				<view v-for="(item, index) in list.comment" :key="index" v-if="index == 0">
					<text>{{ item.commentInfo.upUserName }}：</text>
					<text class="replayText">{{ item.commentInfo.text }}</text>
					<view v-if="item.totalCount > 1">
						共
						<text style="color: #00C8BE;">{{ item.totalCount }}</text>
						条回复
					</view>
				</view>
			</view>
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
		zan(list, index) {
			this.$emit('zan', list.reply.sequenceId, index);
		},

		createComment(list, index) {
			this.$emit('createComment', list, index);
		},

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
	margin-left: 80rpx;
	font-size: $group-font;
	line-height: $group-font-line;
}

.time {
	font-size: $group-font-info;
	line-height: $group-font-info;
	color: $group-color-befor;
	margin-top: $group-margin-s;
}

.textBox {
	font-size: $group-font;
	line-height: $group-font-line;
	color: $group-color-article;
	margin: $group-margin-top 0 $group-margin-befor 80rpx;
}

.replayBtn {
	margin-left: 80rpx;
	font-size: $group-font;
	color: $group-color-befor;
	height: 50rpx;
	line-height: 50rpx;
	background-color: $group-color-search;
	border-radius: 25rpx;
	overflow: hidden;
	display: inline-block;
	padding: 0 $group-margin-top;
	vertical-align: middle;
}

.replayBox {
	background-color: $group-color-search;
	border-radius: 4rpx;
	color: $group-color;
	font-size: $group-font;
	margin: $group-margin-befor 0 0 80rpx;
	padding: $group-margin-befor;
}

.replayText {
	color: $group-color-article;
}

.commentBox {
	padding: 24rpx 0;
	border-top: 1rpx rgba($color: $group-color-border, $alpha: 0.8) solid;
}

.tag-box {
	position: absolute;
	right: 0rpx;
	top: 0;
	color: #999999;
	font-size: 22rpx;
	line-height: 36rpx;
	border-radius: 4rpx;
	border: 1rpx solid #999999;
	text-align: center;
	width: 68rpx;
}
</style>
