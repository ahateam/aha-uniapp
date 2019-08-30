<template>
	<view>
		<view class="">
			<uni-notice-bar 
				show-icon="true" 
				background-color="#cce0fe"
				text="[多行] 这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，">
			</uni-notice-bar>
		</view>
		<view class="swiper_box">
			<swiper class="swiper_style" indicator-dots="true" indicator-color="rgba(255, 255, 255, 0.3)" indicator-active-color="#d7cbd1" autoplay="true">
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
			<view class="content_box" @click="toPoll">
				<view class="content_box_text">我的投票</view>
			</view>
			<view class="content_box" @click="toAssets" style="background-color: #9788ff;">
				<view class="content_box_text">集体资产</view>
			</view>
			<view class="content_box" @click="toMoney" style="background-color: #fb7eb8;">
				<view class="content_box_text">我的分红</view>
			</view>
			<view class="content_box" @click="toOrg">
				<view class="content_box_text">我的机构</view>
			</view>
			<view class="content_box" @click="toNotice" style="background-color: #9788ff;">
				<view class="content_box_text">我的公告</view>
			</view>
			<view class="content_box" @click="toExamine" style="background-color: #fb7eb8;">
				<view class="content_box_text">我的审批</view>
			</view>
			<view class="content_box" @click="toVote">
				<view class="content_box_text">发起投票</view>
			</view>
			<view class="content_box" style="background-color: #9788ff;">
				<view class="content_box_text">职务管理</view>
			</view>
			<view class="content_box" style="background-color: #fb7eb8;">
				<view class="content_box_text">个人信息</view>
			</view>
			<view class="content_box" @click="toChooseOrg">
				<view class="content_box_text">更换组织</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNoticeBar from "@/components/uni-notice-bar/uni-notice-bar.vue"
	export default {
		components: {uniNoticeBar},
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		methods: {
			toPoll(){
				uni.navigateTo({
					url:"../poll/poll"
				})
			},
			toAssets(){
				uni.navigateTo({
					url:"../assets/assets"
				})
			},
			toOrg(){
				uni.navigateTo({
					url:"../org/org"
				})
			},
			toMoney(){
				uni.navigateTo({
					url:"../bonus/bonus"
				})
			},
			toNotice(){
				uni.navigateTo({
					url:"../notice/notice"
				})
			},
			toExamine(){
				uni.navigateTo({
					url:"../examine/examine"
				})
			},
			toChooseOrg(){
				uni.navigateTo({
					url:"../chooseOrg/chooseOrg"
				})
			},
			toVote(){
				uni.navigateTo({
					url:"../vote/vote"
				})
			}
		}
	}
</script>

<style>
	body{
		background-color: #ecf2fe;
	}
	.swiper_style image{
		width: 100%;
	}
	.content{
		width: 100%;
		margin-bottom: 33rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.content_box{
		width: 162rpx;
		height: 162rpx;
		background-color: #6cbaf8;
		border-radius: 10%;
		margin: 66rpx auto auto 45rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.content_box_text{
		width: 81rpx;
		height: 81rpx;
		font-size: 32rpx;
		color: #fff;
		text-align: center;
		line-height: 40.5rpx;
	}
</style>
