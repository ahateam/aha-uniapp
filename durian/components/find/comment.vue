<template>
	<view class="body">
		<!-- 用户 -->
		<view class="commentBox" :style="index == 0?'border:none':''" v-for="(list,index) in comment" :key="index">
			<view class="userBox">
				<image :src="JSON.parse(list.user.ext).userHead" mode="aspectFill"></image>
				<view class="rightBox">
					<view>{{list.user.name}}</view>
					<view class="time">{{getTime(list.reply.createTime)}}</view>
				</view>

				<!-- 点赞 -->
				<view class="zan-box" :class="{iconCurr:list.isAppraise}" v-if="list.reply.sequenceId" @click="zan(list,index)">
					<text class="iconfont kk-kuazan"></text>
					<text>{{list.appraiseCount}}</text>
				</view>
			</view>



			<view class="textBox">{{list.reply.text}}</view>
			<!-- 回复区 -->
			<view class="replayBtn" v-if="list.reply.sequenceId">
				回复
			</view>
			<view class="replayBox" v-if="list.comment.length > 0">
				<view v-for="(item,index) in list.comment" :key="index" v-if="index == 0">
					<text>{{item.commentInfo.upUserName}}：</text>
					<text class="replayText">{{item.commentInfo.text}}</text>
					<view v-if="item.totalCount > 1">共{{item.totalCount}}条回复</view>
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

			}
		},
		methods: {
			zan(list,index) {
				this.$emit('zan', list.reply.sequenceId,index)
			},

			getTime(time) {
				let newData = new Date(time)
				let y = newData.getFullYear()
				let m = newData.getMonth() * 1 + 1
				let d = newData.getDate()
				return `${y}-${m}-${d}`
			},
		}
	}
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

	.zan-box {
		position: absolute;
		right: 0;
		top: 50%;
		margin-top: calc(-40rpx/2);
		font-size: $group-font;
		line-height: $group-font-line;
		color: $group-color-befor;

		.iconfont {
			margin-right: $group-margin-s;
		}
	}

	.iconCurr {
		color: $group-color-curr;
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
		padding: $box-margin-top 0;
		border-top: 1rpx rgba($color: $group-color-border, $alpha: 0.8) solid;
	}
</style>
