<template>
	<view>
		<view>
			<uni-notice-bar show-icon="true" background-color="#cce0fe" text="[多行] 这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，">
			</uni-notice-bar>
		</view>
		<view class="swiper_box">
			<swiper class="swiper_style" indicator-dots="true" indicator-color="rgba(255, 255, 255, 0.3)" indicator-active-color="#d7cbd1"
			 autoplay="true">
				<swiper-item>
					<image src="../../static/a.jpg"></image>
				</swiper-item>
				<swiper-item>
					<image src="../../static/a.jpg"></image>
				</swiper-item>
				<swiper-item>
					<image src="../../static/a.jpg"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="content">

			<navigator url="../poll/poll" class="content_box">
				<view class="content_box_text">
					<p class="text-box">我的</p>
					<p class="text-box1">投票</p>
				</view>
			</navigator>

			<navigator url="../examine/examine">
				<view class="content_box" style="background-color: #9788ff;">
					<view class="content_box_text">
						<p class="text-box">
							我的
						</p>
						<p class="text-box1">
							审批
						</p>

					</view>
				</view>
			</navigator>

			<navigator url="../bonus/bonus">
				<view class="content_box" style="background-color: #fb7eb8;">
					<view class="content_box_text">
						<p class="text-box">我的</p>
						<p class="text-box1">分红</p>
					</view>
				</view>
			</navigator>
			<navigator url="../org/org">
				<view class="content_box">
					<view class="content_box_text">
						<p class="text-box">集体</p>
						<p class="text-box1">资料</p>
					</view>
				</view>
			</navigator>

			<navigator url="../assets/assets">
				<view class="content_box" style="background-color: #9788ff;">
					<view class="content_box_text">
						<p class="text-box">集体</p>
						<p class="text-box1">资产</p>
					</view>
				</view>
			</navigator>

			<view class="content_box" style="background-color: #fb7eb8;">
				<view class="content_box_text">
					<p class="text-box">公告</p>
					<p class="text-box1">信息</p>
				</view>
			</view>
		</view>


		<view class="content_box">
			<view class="content_box_text">
				<p class="text-box">发起</p>
				<p class="text-box1">投票</p>
			</view>
		</view>
		<view class="content_box" style="background-color: #9788ff;">
			<view class="content_box_text">
				<p class="text-box">职务</p>
				<p class="text-box1">管理</p>
			</view>
		</view>

		
			<view class="content_box" style="background-color: #fb7eb8;" @click="toAbout()">
				<view class="content_box_text">
					<p class="text-box">个人</p>
					<p class="text-box1">信息</p>
				</view>
			</view>
	



		<view class="content_box" @click="toChooseOrg">
			<view class="content_box_text">
				<p class="text-box">更换</p>
				<p class="text-box1">组织</p>
			</view>
		</view>

		<view class="content_box" @click="outLogin()" style="background-color: #fb7eb8;">
			<view class="content_box_text">
				<p class="text-box">注销</p>
				<p class="text-box1">登录</p>
			</view>
		</view>

	</view>

	</view>
</template>

<script>
	import uniNoticeBar from "@/components/uni-notice-bar/uni-notice-bar.vue"
	export default {
		components: {
			uniNoticeBar
		},
		data() {
			return {

			}
		},
		onLoad() {
			let userObj = JSON.parse(uni.getStorageSync('userInfo')) //只有用户信息
			let orgObj = JSON.parse(uni.getStorageSync('orgInfo')) //只有用户的组织信息

			if (!userObj) {
				uni.reLaunch({
					url: '../login/login'
				})
			}
			if (!orgObj) {
				uni.reLaunch({
					url: '../chooseOrg/chooseOrg'
				})
			}
			let orgUserInfo = Object.assign(userObj, orgObj)
			let info = uni.getStorageSync('orgUserInfo')
			if (!info) { //user是否已经存在，若存在就不重新赋值
				uni.setStorageSync('orgUserInfo', JSON.stringify(orgUserInfo))
			}

		},
		methods: {
			outLogin() {
				uni.clearStorageSync();
				uni.reLaunch({
					url: '../login/login'
				})
			},
			toChooseOrg() {
				uni.removeStorageSync('orgInfo');
				uni.removeStorageSync('orgUserInfo');
				uni.reLaunch({
					url: '../chooseOrg/chooseOrg'
				})
			},
			
			toAbout(){
				console.log('----------click about------')
				uni.switchTab({
					url:'../about/about'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	body {
		background-color: #ecf2fe;
	}

	.swiper_style image {
		width: 100%;
	}

	.content_box {
		float: left;
		width: 150rpx;
		height: 150rpx;
		text-align: center;
		line-height: 75rpx;
		border-radius: 20rpx;
		margin: 20rpx 45rpx;
		font-size: 32rpx;
		color: #fff;
		background: #6cbaf8;

	}

	.text-box {
		line-height: 90rpx;
	}

	.text-box1 {
		line-height: 20rpx;
	}
</style>
