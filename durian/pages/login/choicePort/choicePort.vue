<template>
	<view class="body">
		<navBar :back="false" type="transparent" fontColor="#587685">
			<!-- <view slot="right" class="navTitle" @click="navToMobile">免密登录</view> -->
			<view slot="left" class="iconfont icon-fanhui" @click="navBack"></view>
		</navBar>

		<view class="topBox">
			<view class="title_box">
				我是谁
			</view>
		</view>
		
		<view class="portBox" v-for="(item,index) in portList" :key="index">
			<image :src="currIndex == index?item.imgSrc:item.imgCurr" mode="aspectFill"></image>
			<view class="portText">
				<text class="choiceBox"><text v-if="currIndex == index">√</text></text>
				<text>{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'

	export default {
		components: {
			navBar
		},
		data() {
			return {
				portList: [{
						name: '我是学生',
						imgSrc:'/static/image/port/bg_student.png',
						imgCurr:'/static/image/port/bg_student_curr.png',
						type:0
					},
					{
						name: '我是代理人',
						imgSrc:'/static/image/port/bg_dlr.png',
						imgCurr:'/static/image/port/bg_dlr_curr.png',
						type:1
					}
				],
				currIndex:-1,
			}
		}
	}
</script>

<style lang="scss" scoped>
	.body{
		padding: 0 $group-margin-top;
	}
	
	.topBox {
		position: relative;
	}

	.title_box {
		font-size: $group-font-big;
		line-height: $group-font-big-line;
		font-weight: $group-title-weight;
		color: #333333;
		margin-bottom: $group-margin-s;
	}
	
	.portBox{
		position: relative;
		display: flex;
		align-items:center;
		margin-top: $group-margin-top;
		width: 690rpx;
		height: 360rpx;
		border-radius: 6rpx;
		overflow: hidden;
		color: $group-color;
		font-size: 34rpx;
		
		image{
			position: absolute;
			width: 100%;
			height: 100%;
		}
	}
	
	.choiceBox{
		width: 24rpx;
		height: 24rpx;
		border-radius: 6rpx;
		border: 1rpx $group-color;
		margin-left: 360rpx;
	}
</style>
