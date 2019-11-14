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
		
		<navigator url="../customer/customer">
			<view class="content_box" style="background-color: #9788ff;">
				<view class="content_box_text">
					<p class="text-box">联系</p>
					<p class="text-box1">客服</p>
				</view>
			</view>
		</navigator>

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
				noticeList: [],
				msgInfo: ''
			}
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
			//消息跳转审批详情（分户+股权变更）
			toExamine() {
				let cnt = {
					examineId: Number(this.msgInfo.action)
				}
				this.$api.getExamineById(cnt,(res)=>{
					if(res.data.rc == this.$util.RC.SUCCESS){
						let data = this.$util.tryParseJson(res.data.c)
						let infoData = encodeURIComponent(JSON.stringify(data))
						if(data.type == this.$constData.examineType[0].key){
							uni.navigateTo({
								url: '../examine/familyInfo?info=' + infoData,
							})
						}else if(data.type == this.$constData.examineType[1].key){
							uni.navigateTo({
								url: '../examine/shareInfo?info=' + infoData,
							})
						}
					}
				})

			},
			//通知完成
			delMail() {
				let cnt = {
					moduleId: this.msgInfo.moduleId, // Long 模块编号
					receiver: this.msgInfo.receiver, // String 接收者编号列表，JSONArray格式
					sequenceId: this.msgInfo.sequenceId, // Long 接收者编号
					tags: this.msgInfo.tags, // JSONArray <选填> 标签
					sender: this.msgInfo.sender, // String 发送者编号
					title: this.msgInfo.title, // String 标题
					text: this.msgInfo.text, // String 正文
					action: false, // String <选填> 消息行为
					createTime: this.msgInfo.createTime, // Long <选填> 消息行为
					ext: this.msgInfo.ext, // String <选填> 消息扩展
				}
				this.$api.delMail(cnt, (res) => {
					console.log(res)
				})
			},
			//消息提示框
			notice() {
				let tag = JSON.parse(this.msgInfo.tags)[0]
				uni.showModal({
					title: this.msgInfo.title,
					content: this.msgInfo.text,
					confirmText: '立即查看',
					success: (res) => {
						if (res.confirm) {
							this.delMail()
							if (tag == this.$constData.tags[0].val) { //投票提醒
								uni.setStorageSync('poll', this.msgInfo.action)
								uni.navigateTo({
									url: '../poll/pollInfo',
								});
							} else if (tag == this.$constData.tags[1].val) { //审批提醒
								this.toExamine()
							}
						} else if (res.cancel) {
							this.delMail()
						}
					}
				});
			},


			showModel() {

				let cnt = {
					userId: JSON.parse(uni.getStorageSync('userInfo')).id
				}
				this.$api.latlestMail(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.msgInfo = this.$util.tryParseJson(res.data.c)
						
						if (Object.keys(this.msgInfo).length) {
							this.notice()
						}

					}

				})


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

			this.showModel()



		},
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
