<template>
	<view>
		<view class="add-box">
			<input type="text" v-model="searchData" class="input-title" focus placeholder="输入合作社名称查询" />
			<view class="add-btn" @click="searchBtn">搜索</view>
		</view>
		<view class="title-box1">
			合作社列表
		</view>
		<view class="item-box">
			<view v-if="orgList.length>0">
				<view class="item1" v-for="(item,index) in orgList" :key="index" @click="checkOrgBtn(item)">
					<view class="item-title1">
						{{item.name}}
					</view>
					<view class="item-icon1">
						{{item.code}}
					</view>
				</view>
			</view>
			<view v-else class="text-msg">
				暂无搜索到的合作社
			</view>
		</view>
		<view class="footer-box">
			<button type="default" @click="chooseBtn()">更换银行</button>
			<button type="warn" @click="outLogin()">
				注销登录
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'vote',
		data() {
			return {
				searchData: '',
				orgList: [],
				count: 10,
				page: 1
			}
		},
		methods: {
			getORGByBank(cnt) {
				this.$api.getORGByBank(cnt, (res) => {
					let data = []
					if (res.data.rc == this.$util.RC.SUCCESS) {
						data = this.$util.tryParseJson(res.data.c)
					} else {
						data = []
					}
					this.orgList = this.orgList.concat(data)
					console.log(this.orgList)
				})
			},
			searchBtn() {
				this.page = 1
				this.orgList = []
				let cnt={
					bankId: this.$util.tryParseJson(uni.getStorageSync('bankOrgInfo')).orgId, // Long 银行机构id
					count: this.count, // Integer
					offset: (this.page-1)*this.count, // Integer
				}
				if(this.searchData){
					cnt.name = this.searchData
				}
				this.getORGByBank(cnt)
				
			},
			chooseBtn() {
				uni.removeStorageSync('bankOrgInfo')
				uni.reLaunch({
					url: '../chooseOrg/chooseOrg'
				})
			},
			outLogin() {
				uni.clearStorageSync()
				uni.reLaunch({
					url: '../../login/login'
				})
			},
			checkOrgBtn(info){
				uni.navigateTo({
					url:'./voteList?orgId='+info.id+'&orgName='+info.name
				})
			}
		},
		onLoad() {
			let cnt = {
				bankId: this.$util.tryParseJson(uni.getStorageSync('bankOrgInfo')).orgId, // Long 银行机构id
				count: this.count, // Integer
				offset: (this.page-1)*this.count, // Integer
			}
			this.getORGByBank(cnt)
		},
		/**分页*/
		onReachBottom() {
			this.page = this.page+1
			let cnt={
				bankId: this.$util.tryParseJson(uni.getStorageSync('bankOrgInfo')).orgId, // Long 银行机构id
				count: this.count, // Integer
				offset: (this.page-1)*this.count, // Integer
			}
			if(this.searchData){
				cnt.name = this.searchData
			}
			this.getORGByBank(cnt)
		}
	}
</script>

<style scoped lang="scss">
	.add-box {
		width: auto;
		overflow: hidden;
		padding: 40rpx;
		border: 1px solid #eee;
		margin-top: 50rpx;
	}

	.input-title {
		width: 70%;
		line-height: 80rpx;
		height: 80rpx;
		float: left;
		font-size: 28rpx;
		color: #333;
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

	.item-box {
		width: auto;
	}

	.item1 {

		padding: 30rpx 40rpx;
		width: auto;

		line-height: 60rpx;
		border-bottom: 1px solid #eee;

	}

	.item-title1 {
	
		width: 100%;
		line-height: 50rpx;
		color: #666;
		font-size: 28rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;

	}

	.item-icon1 {
		
		width: 100%;
		line-height: 50rpx;
		color: #666;
		font-size: 28rpx;
	
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.text-msg {
		padding: 40rpx;
		font-size: 28rpx;
		color: #666;
	}

	.footer-box {
		width: auto;
		padding: 40rpx;

	}
</style>
