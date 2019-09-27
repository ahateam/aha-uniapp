<template>
	<view>
		<view v-if="noticeList.length>0">
			<uni-notice-bar show-icon="true" background-color="#cce0fe" :text="noticeList[0].title" @click="toNoticeInfo(noticeList[0])">
			</uni-notice-bar>
		</view>
		<view class="swiper_box">
			<swiper class="swiper_style" indicator-dots="true" indicator-color="rgba(255, 255, 255, 0.3)" indicator-active-color="#d7cbd1"
			 autoplay="true">
				<swiper-item>
					<image src="../../static/banner/banner1.png"></image>
				</swiper-item>
				<swiper-item>
					<image src="../../static/banner/banner2.png"></image>
				</swiper-item>
				<swiper-item>
					<image src="../../static/banner/banner3.png"></image>
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

			<view class="content_box" style="background-color: #fb7eb8;" @click="toNotice()">
				<view class="content_box_text">
					<p class="text-box">公告</p>
					<p class="text-box1">信息</p>
				</view>
			</view>

		</view>

		<template v-if="userPermission.length>0">
			<template v-for="(item,index) in userPermission">
				<view :key="index">
					<view v-if="item == addVoteId ">
						<navigator url="../vote/vote">
							<view class="content_box">
								<view class="content_box_text">
									<p class="text-box">发起</p>
									<p class="text-box1">投票</p>
								</view>
							</view>
						</navigator>
					</view>
					<view v-if="item == editPostId ">
						<navigator url="../position/position">
							<view class="content_box" style="background-color: #9788ff;">
								<view class="content_box_text">
									<p class="text-box">职务</p>
									<p class="text-box1">管理</p>
								</view>
							</view>
						</navigator>
					</view>
				</view>

			</template>

		</template>





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
				addVoteId: this.$constData.permission[0].key,
				editPostId: this.$constData.permission[1].key,
				userPermission: '',
				noticeList: []
			}
		},
		onLoad() {
			this.userPermission = JSON.parse(uni.getStorageSync('permission'))
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
			this.getNotice()

		},
		methods: {
			//请求公告列表
			getNoticeByRoleGroup(cnt) {
				this.$api.getNoticeByRoleGroup(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.noticeList = this.$util.tryParseJson(res.data.c)
					} else {
						this.noticeList = []
					}
					console.log(this.noticeList)
				})
			},
			getNotice() {
				let userInfo = JSON.parse(uni.getStorageSync('orgInfo'))
				let groups = []
				if (userInfo.groups == undefined || userInfo.groups == '' || userInfo.groups.length == 0) {
					groups[0] = 102
				} else {
					groups = userInfo.groups
				}

				let cnt = {
					orgId: userInfo.orgId, // Long 组织编号
					roles: userInfo.orgRoles, // String 角色编号 [102,103,104]
					groups: groups, // String 分组编号 [1111111,555555,111]
					count: 1, // Integer
					offset: 0, // Integer
				}
				this.getNoticeByRoleGroup(cnt)
			},
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

			toAbout() {

				uni.switchTab({
					url: '../about/about'
				})
			},
			toNotice() {
				uni.switchTab({
					url: '../notice/notice'
				})
			},
			//跳转详情
			toNoticeInfo(item) {
				let info = encodeURIComponent(JSON.stringify(item))
				uni.navigateTo({
					url: '../notice/noticeInfo?info=' + info
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	body {
		background-color: #ecf2fe;
	}

	.swiper_style image {
		width: 100%;
		height: 100%;
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
