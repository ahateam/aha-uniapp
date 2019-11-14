<template>
	<view class="body">
		<view class="topBox">
			<view class="title_box" :class="{currNav:navCurrIndex == index}" v-for="(item,index) in navTags" :key="index" :style="index == 0?'margin-right:50rpx':''"
			 @click="changeNav(index)">
				{{item.name}}
			</view>
		</view>

		<view class="tipBox" v-if="tipStatus">
			<view>{{tipText}}</view>
			<button class="tipBtn">去开启</button>
			<view class="iconfont icon-guanbi" @click="tipStatus = false"></view>
		</view>

		<view class="boxList">
			<view class="contentBox" v-for="(item,index) in contentList" :Key="index">
				<view class="imgBox">
					<image :src="item.imgSrc" mode="aspectFill"></image>
				</view>
				<view style="position: relative;">
					<view class="userTopBox">
						<view class="userNameBox">{{item.name}}</view>
						<view class="timeBox">{{item.time}}</view>
					</view>
					<view class="userTextBox">
						{{item.text}}
					</view>
					<view class="tipMesTag">1</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tipStatus: true,
				navTags: [{
						name: '聊天记录'
					},
					{
						name: '通讯录'
					}
				],
				navCurrIndex: 0,

				tipText: '重要通知第一时间知晓,开启消息通知~',

				contentList: [{
					imgSrc: 'http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071011.png',
					name: '奥斯丁',
					time: '2019-07-08',
					text: 'asdasdasdd'
				}]
			}
		},
		methods: {
			changeNav(index) {
				this.navCurrIndex = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.body {
		margin: 0 $group-margin-top;
	}

	.topBox {
		position: relative;
		display: flex;
		align-items: flex-end;
		margin-bottom: 50rpx;
	}

	.title_box {
		font-size: 40rpx;
		line-height: 56rpx;
		font-weight: $group-title-weight;
		color: #CCCCCC;
	}

	.currNav {
		color: #333333;
		font-size: 50rpx;
		line-height: 70rpx;
		font-weight: bold;
	}

	.tipBox {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 25rpx 20rpx 25rpx 30rpx;
		font-size: $group-font;
		color: #946934;
		background-color: rgba($color: #FFD78D, $alpha: 0.8);
		margin-bottom: 50rpx;
		border-radius: 4rpx;
	}

	.tipBtn {
		border-radius: 4rpx;
		background-color: #FFD78D;
		padding: 6rpx 20rpx;
		line-height: 50rpx;
		color: #946934;
		font-size: 26rpx;

		&:after {
			border: none;
		}
	}

	.icon-guanbi {
		width: 38rpx;
		height: 38rpx;
		color: #FFD78D;
		line-height: 38rpx;
		border-radius: 50%;
		text-align: center;
		font-size: 17rpx;
		background-color: #FFFFFF;
	}

	.contentBox {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 25rpx;

		image {
			height: 100%;
			width: 100%;
			border-radius: 50%;
		}
	}

	.imgBox {
		height: 120rpx;
		width: 120rpx;
	}

	.userTopBox {
		display: flex;
		justify-content: space-between;
		font-size: 30rpx;
		color: #333333;
		line-height: 42rpx;
		align-items: center;
		width: 520rpx;
	}
	
	.userNameBox{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 300rpx;
	}

	.timeBox {
		font-size: 22rpx;
		color: #999999;
	}

	.userTextBox {
		color: #999999;
		font-size: 26rpx;
		margin-top: 20rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 520rpx;
	}
	
	.tipMesTag{
		display: inline-block;
		position: absolute;
		font-size: 20rpx;
		color: $group-color-w;
		line-height: 26rpx;
		text-align: center;
		padding: 0 9rpx;
		border-radius: 50%;
		background-color: #EE455A;
		right: 0;
		top: 50%;
		margin-top: 13rpx;
	}
</style>
