<template>
	<view>

		<view class="list-box">
			<view class="list-title">
				选举标题
			</view>
			<view class="list-val">
				{{vote.title}}
			</view>
			<view class="clear-both"></view>
		</view>




		<view class="title-box">
			已有选项列表
		</view>
		<view class="item-box">
			<view class="item" v-for="(item,index) in optionList" :key="index">
				<view class="item-title">
					{{item.title}}
				</view>
				<view class="item-icon" @click="delVoteOption(item.id)">
					<i class="iconfont icon-quxiao"></i>
				</view>
			</view>
		</view>

		<view class="add-box">
			<input type="text" v-model="searchData" class="input-title" focus placeholder="输入被选举人的名字/身份证号搜索" />
			<view class="add-btn" @click="searchBtn">搜索</view>
		</view>
		<view class="title-box1">
			搜索列表
		</view>
		<view class="item-box">
			<view v-if="list.length>0">
				<view class="item1" v-for="(item,index) in list" :key="index" @click="addBtn(item)">
					<view class="item-title1">
						{{item.user.realName}}
					</view>
					<view class="item-icon1">
						{{item.user.idNumber}}
					</view>
				</view>
			</view>
			<view style="color: #666;font-size: 26rpx;padding: 20rpx;" v-else >
				暂无搜索到的成员
			</view>
		</view>
		<view class="footer-box">
			<button type="primary" @click="toHomePage()">创建完成</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'createVoteOptionPeople',
		data() {
			return {
				vote: '',
				searchData: '',
				optionList: [],
				list: [],
				count: 10,
				offset: 0
			}
		},
		methods: {
			getVoteOptions() {
				let cnt = {
					voteId: this.vote.id
				}
				this.$api.getVoteOptions(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.optionList = this.$util.tryParseJson(res.data.c)
					} else {
						this.optionList = []
					}
					console.log(this.optionList)
				})
			},
			//身份证搜索
			getORGUsersLikeIDNumber(cnt) {
				this.$api.getORGUsersLikeIDNumber(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.list = this.$util.tryParseJson(res.data.c)
					} else {
						this.list = []
					}
					console.log(this.list)
				})
			},
			//姓名搜索
			getORGUsersLikeRealName(cnt) {
				this.$api.getORGUsersLikeRealName(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.list = this.$util.tryParseJson(res.data.c)
					} else {
						this.list = []
					}
					console.log(this.list)
				})
			},

			searchBtn() {

				if (this.searchData == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入需搜索的成员'
					})
				} else {
					let data = this.searchData.substr(0, 1)
					if (isNaN(data) == false) {
						let orgId = JSON.parse(uni.getStorageSync('orgUserInfo')).orgId
						let cnt = {
							orgId: orgId,
							idNumber: this.searchData,
							count: this.count,
							offset: this.offset
						}
						this.getORGUsersLikeIDNumber(cnt)
					} else {
						let orgId = JSON.parse(uni.getStorageSync('orgUserInfo')).orgId
						let cnt = {
							orgId: orgId,
							realName: this.searchData,
							count: this.count,
							offset: this.offset
						}
						this.getORGUsersLikeRealName(cnt)

					}

				}
			},

			//新增选项
			addVoteOption(cnt) {
				this.$api.addVoteOption(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.showToast({
							icon: 'success',
							title: '新增成功'
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: '新增失败'
						})
					}
					this.addInput = ''
					this.getVoteOptions()
				})
			},




			//删除选项
			delVoteOption(id) {
				let cnt = {
					voteId: this.vote.id,
					optionId: id
				}

				this.$api.delVoteOption(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.showToast({
							icon: 'success',
							title: '删除成功'
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: '删除失败'
						})
					}
				})
				this.getVoteOptions()
			},
			toHomePage() {
				uni.setStorageSync('vote', '')
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			addBtn(info) {
				let ext = {
					userId: info.user.userId,
					idNumber: info.user.idNumber,
					realName: info.user.realName,
				}
				let cnt = {
					voteId: this.vote.id,
					title: info.user.realName,
					remark: '无',
					ext: ext
				}
				this.addVoteOption(cnt)

			},
		},
		onShow() {

			this.vote = JSON.parse(uni.getStorageSync('vote'))
			this.getVoteOptions()

		}
	}
</script>

<style scoped lang="scss">
	.clear-both {
		clear: both
	}

	.list-box {
		width: auto;
		padding: 30rpx;
		border-bottom: 1px solid #eee;
	}

	.list-title {
		float: left;
		width: 25%;
		line-height: 50rpx;
		font-size: 28rpx;
		color: #333;
	}

	.list-val {
		float: left;
		width: 75%;
		line-height: 50rpx;
		font-size: 28rpx;
		color: #666;
	}

	.text-box {
		margin-top: 20rpx;
		font-size: 28rpx;
		color: #333;
		line-height: 25rpx;
	}

	.item-check-box {
		float: left;
		font-size: 28rpx;
		line-height: 50rpx;
		margin: 20rpx;
		width: 200rpx;
		color: #666;
	}

	.item-check-box1 {
		float: left;
		font-size: 28rpx;
		line-height: 50rpx;
		width: 150rpx;
		margin: 0 20rpx;
		color: #666;
	}

	.footer-box {
		width: auto;
		padding: 20rpx;
	}


	.add-box {
		width: auto;
		overflow: hidden;
		padding: 40rpx;
		border: 1px solid #eee;
		margin-top: 50rpx;
	}

	.add-btn {
		line-height: 80rpx;
		width: 30%;
		float: left;
		color: #fff;
		font-size: 32rpx;
		text-align: center;
		background: $jiti-color-blue;
		border-radius: 10rpx;

	}

	.add-btn:active {
		background: #409EFF;
	}

	.input-title {
		width: 70%;
		line-height: 80rpx;
		height: 80rpx;
		float: left;
		font-size: 28rpx;
		color: #333;
	}

	.item-box {
		width: auto;
	}

	.item {
		margin-top: 20rpx;
		padding: 20rpx 40rpx;
		width: auto;
		height: 60rpx;
		line-height: 60rpx;
		border-bottom: 1px solid #eee;

	}

	.item1 {

		padding: 30rpx 40rpx;
		width: auto;
		height: 60rpx;
		line-height: 60rpx;
		border-bottom: 1px solid #eee;

	}

	.title-box1 {
		width: auto;
		padding: 20rpx;
		line-height: 40rpx;
		text-align: left;
		font-size: 32rpx;
		color: #fff;
		background: $jiti-color-blue;
		margin-top: 20rpx;
	}


	.title-box {
		width: auto;
		padding: 30rpx;
		line-height: 50rpx;
		text-align: center;
		font-size: 32rpx;
		color: #fff;
		background: $jiti-color-blue;
		margin-top: 20rpx;
	}

	.item-title1 {
		float: left;
		width: 40%;
		line-height: 50rpx;
		color: #666;
		font-size: 28rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;

	}

	.item-icon1 {
		float: left;
		width: 50%;
		line-height: 50rpx;
		color: #666;
		font-size: 28rpx;
		text-align: right;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.item-title {
		float: left;
		width: 70%;
		line-height: 50rpx;
		color: #666;

		font-size: 28rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;

	}

	.item-icon {
		float: left;
		width: 20%;
		line-height: 50rpx;
		color: #f44;
		font-size: 28rpx;
		padding-left: 40rpx;
		text-align: center;

		i {
			display: block;
			width: auto;
			height: 50rpx;
			line-height: 50rpx;
		}
	}

	.footer-box {
		width: auto;
		padding: 40rpx;
	}

	.list-search-item {
		color: #666;
		font-size: 26rpx;
		padding: 20rpx;

	}
</style>
