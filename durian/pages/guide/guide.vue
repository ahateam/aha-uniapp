<template>
	<view id="body">
		<image class="bg-img" :src="list[curr].img" mode="widthFix"></image>

		<view class="tip-box" :style="{bottom:tipBottom}">
			<view>{{list[curr].text}}</view>
			<view class="bottom-box flex-box" :class="{'over-box':curr == 3}">
				<view @click="nextBtn" v-if="curr < 3">下一步</view>
				<view class="flex-box dot-list">
					<view class="dot-box" v-for="(item,index) in list" :class="{'curr-dot':index == curr}" :key="index"></view>
				</view>
				<view v-if="curr < 3" @click="navToIndex">跳过</view>
				<view v-else @click="navToIndex">好的</view>
			</view>
			<view class="triangle" :style="{left:triangleLeft}"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						text: '亲，请先完善个人信息，可以让更多的同学认识你，代理人也可以更高效地为你服务~',
						img: '/static/image/guide/xs_zy_1.png'
					},
					{
						text: '你可以随时向代理人咨询留学移民的问题，快速帮你找到最好的答案。在线申请还可以获得1000个平台币哦~',
						img: '/static/image/guide/xs_zy_2.png'
					},
					{
						text: '多晒晒自己，也看看其他同学在聊什么，专业干货和极度有趣的分享有机会成为热点，你也可能成为榴莲APP的封面人物哦!',
						img: '/static/image/guide/xs_zy_3.png'
					},
					{
						text: '商城汇聚了老司机的干货，你的好东西也一定要分享出来啊！',
						img: '/static/image/guide/xs_zy_4.png'
					}
				],
				curr: 0,
				triangleLeft: '610rpx',
				tipBottom: '135rpx;'
			};
		},

		methods: {
			navToIndex() {
				uni.reLaunch({
					url: '../index/index'
				})
			},

			nextBtn() {
				this.curr += 1
				if (this.curr == 1) {
					this.triangleLeft = '48rpx'
				} else if (this.curr == 2) {
					this.tipBottom = '296rpx'
					this.triangleLeft = '597rpx'
				} else {
					this.tipBottom = '135rpx'
					this.triangleLeft = '420rpx'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	#body {
		height: 100vh;
	}

	.bg-img {
		position: fixed;
		bottom: 0;
		width: 100vw;
	}

	.tip-box {
		position: fixed;
		z-index: 1;
		left: 40rpx;
		width: 670rpx;
		padding: 40rpx;
		background: linear-gradient(180deg, #00C8BE, #48E1CB);
		color: $group-color-w;
		font-size: 30rpx;
		line-height: 42rpx;
		box-sizing: border-box;
		box-shadow: 0 10rpx 30rpx 0 rgba($color: #00C8BE, $alpha: .3);
	}

	.flex-box {
		display: flex;
		align-items: center;
	}

	.bottom-box {
		justify-content: space-between;
		margin-top: 40rpx;
	}

	.over-box {
		width: 334rpx;
		margin-left: 256rpx;
	}

	.dot-list {
		justify-content: center;
	}

	.dot-box {
		width: 12rpx;
		height: 12rpx;
		border-radius: 50%;
		border: 1rpx solid $group-color-w;
		box-sizing: border-box;
		margin: 5rpx;
	}

	.curr-dot {
		background-color: $group-color-w;
	}

	.triangle {
		position: absolute;
		bottom: -18rpx;
		width: 0;
		height: 0;
		border: 10rpx solid;
		border-color: #48E1CB transparent transparent;
	}
</style>
