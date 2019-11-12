<template>
	<view>
		<nav-bar :back="false" type="transparent" fontColor="#333333" title="个人资料">
			<view slot="left" class="iconfont icon-fanhui" @click="navBack"></view>
			<view slot="right" class="save-Btn">保存</view>
		</nav-bar>
		<view style="padding-top: 64px;"></view>

		<view class="head-box">
			<view class="head-change">
				<image src="/static/image/user/icon_xj.png" mode="aspectFit"></image>
			</view>
			<view class="head-text">更换头像</view>
		</view>

		<view class="content-List">

			<view class="content-box" @click="showName = true">
				<view class="left-box">昵称</view>
				<view class="right-box">
					<text>{{name}}</text>
					<image :hidden="showName"  src="/static/image/user/icon_enter.png" mode="aspectFit"></image>
				</view>
			</view>

			<view class="content-box" >
				<view class="left-box">性别</view>
				<view class="right-box">
					<text>{{sex}}</text>
					<image src="/static/image/user/icon_enter.png" mode="aspectFit"></image>
				</view>
			</view>

			<view class="content-box">
				<view class="left-box">生日</view>
				<view class="right-box">
					<text>{{birthday}}</text>
					<image src="/static/image/user/icon_enter.png" mode="aspectFit"></image>
				</view>
			</view>

			<view class="content-box">
				<view class="left-box">所在学校</view>
				<view class="right-box">
					<text>{{school}}</text>
					<image src="/static/image/user/icon_enter.png" mode="aspectFit"></image>
				</view>
			</view>

			<view class="content-box">
				<view class="left-box">注册手机号</view>
				<view class="right-box">
					<text>{{tel}}</text>
					<image src="/static/image/user/icon_enter.png" mode="aspectFit"></image>
				</view>
			</view>

			<uni-popup :show="showName" type="bottom" :mask-click="true" @change="change">
				<input type="text" v-model="name" />
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"

	export default {
		components: {
			navBar,
			uniPopup
		},
		data() {
			return {
				name: '墨尔本来的鱼',
				showName: false,

				sex: '男',
				showSex: false,

				birthday: '1999-10-10',
				showBirth: false,

				school: '北大青鸟',
				showSchool: false,

				tel: '13426885478',
				showTel: false,

			}
		},
		methods: {
			change(){
				this.showName = false
			},
			
			navBack() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.icon-fanhui {
		font-size: 33rpx;
		position: absolute;
		color: #587685;
		left: 29rpx;
	}

	.save-Btn {
		color: #587685;
		margin-right: 30rpx;
		font-size: 32rpx;
	}

	.head-box {
		text-align: center;
		color: $group-color;
		font-size: $group-font;
		margin-top: $group-margin-top;
	}

	.head-change {
		margin: 0 auto;
		border-radius: 50%;
		background-color: #F2F5F7;
		width: 120rpx;
		height: 120rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		image {
			width: 40rpx;
			height: 40rpx;
		}
	}

	.head-text {
		margin-top: 20rpx;
	}

	.content-List {
		padding: 46rpx 40rpx 0;
	}

	.content-box {
		padding: 38rpx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid $group-color-border;
	}

	.left-box {
		font-size: $group-font-befor;
		color: #999999;
	}

	.right-box {
		display: flex;
		align-items: center;
		font-size: $group-font-befor;
		color: #333333;
		max-width: 375rpx;

		text {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		image {
			margin-left: 20rpx;
			width: 21rpx;
			height: 21rpx;
		}
	}
</style>
