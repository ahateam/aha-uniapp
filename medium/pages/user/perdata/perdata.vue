<template>
	<view class="tab">
		<nav-bar :back="false" type="transparent" fontColor="#333333" title="个人资料">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
			<view slot="right" class="save-Btn" @click="saveData">保存</view>
		</nav-bar>
		<view style="padding-top: 64px;"></view>
		<!-- 个人资料顶部 -->
		<view class="top">
			<view class="top-bgcolor"></view>
			<image src="/static/image/icon/icon_pzsc.png" mode=""></image>
		</view>
		<view class="top-port">更换头像</view>
		<!-- 个人页面资料详情 -->
		<view class="list-bottom" v-for="(item,index) in items" :key="index">
			<view class="list">
				<view class="list-name">{{item.name}}</view>
				<view class="list-right">
					<view>{{item.text}}</view>
					<image src="/static/image/icon/icon_enter.png" mode="widthFix"></image>
				</view>
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
				items: [{
						name: '昵称',
						text: '请输入'
					},
					{
						name: '性别',
						text: '请选择'
					},
					{
						name: '生日',
						text: '请选择'
					},
					{
						name: 'MARN号',
						text: '请输入'
					},
					{
						name: 'FIER号',
						text: '请输入'
					},
					{
						name: 'NAATI',
						text: '请输入'
					},
					{
						name: '注册手机号',
						text: '请输入'
					}
				]
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

	.save-Btn {
		color: #587685;
		margin-right: 30rpx;
		font-size: 32rpx;
	}

	.top {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.top-bgcolor {
		background: #F2F5F7;
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		margin: 30rpx 315rpx 20rpx;
	}

	.top>image {
		width: 39.96rpx;
		height: 32.92rpx;
		position: absolute;
	}

	.top-port {
		color: #587685;
		font-size: 26rpx;
		height: 37rpx;
		line-height: 37rpx;
		text-align: center;
		padding-bottom: 50rpx;
	}

	.list-bottom {
		border-bottom: 1rpx solid #EFF0F4;
		margin: 0 40rpx;
		padding: 33rpx 0;
	}

	.list {
		display: flex;
		justify-content: space-between;
	}

	.list-name {
		color: #666666;
		font-size: 30rpx;
	}

	.list-right {
		display: flex;
		align-items: center;
	}

	.list-right>view {
		color: #B6C4D2;
		height: 42rpx;
		font-size: 30rpx;
		line-height: 42rpx;
		font-weight: 400;
	}

	.list-right>image {
		width: 12rpx;
		height: 21rpx;
		margin-left: 20rpx;
		color: #587685;
	}
</style>
