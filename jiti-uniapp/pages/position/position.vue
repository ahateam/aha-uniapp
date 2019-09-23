<template>
	<view>
		<view class="add-box">
			<input type="text" v-model="searchData" class="input-title" focus  placeholder="输入成员的名字/身份证号搜索" />
			<view class="add-btn" @click="searchBtn">搜索</view>
		</view>
		<view class="title-box1">
			搜索列表
		</view>
		<view class="item-box">
			<view v-if="list.length>0">
				<view class="item1" v-for="(item,index) in list" :key="index" @click="chooseBtn(item)">
					<view class="item-title1">
						{{item.user.realName}}
					</view>
					<view class="item-icon1" >
							{{item.user.idNumber}}
					</view>
				</view>
			</view>
			<view v-else class="text-msg">
					暂无搜索到的成员
			</view>
		</view>
		
			<view class="footer-box">
			<button type="default" @click="toHomePage()">
				返回首页
			</button>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				searchData:'',
				list:[],
				count:10,
				offset:0,
				page:1,
				
			};
		},
		methods:{
			searchBtn(){
		
				if (this.searchData == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入需搜索的成员'
					})
				} else {
					this.page = 1
					this.list = []
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
			
			
	//身份证搜索
			getORGUsersLikeIDNumber(cnt) {
				this.$api.getORGUsersLikeIDNumber(cnt, (res) => {
					let data = []
					if (res.data.rc == this.$util.RC.SUCCESS) {
					data = this.$util.tryParseJson(res.data.c)
					} else {
						data = []
					}
					
						this.list = this.list.concat(data);
				
				})
			},
			//姓名搜索
			getORGUsersLikeRealName(cnt) {
				this.$api.getORGUsersLikeRealName(cnt, (res) => {
					let data = []
					if (res.data.rc == this.$util.RC.SUCCESS) {
						 data= this.$util.tryParseJson(res.data.c)
					} else {
						data = []
					}
	
					this.list = this.list.concat(data);
									
				})
			},
			toHomePage() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			//选择成员
			chooseBtn(info){
				console.log(info)
				uni.setStorageSync('userPosition',JSON.stringify(info))
				uni.navigateTo({
					url:'./setPosition'
				})
			}
		},
		onShow() {
			uni.setStorageSync('userPOsition','')
		},
			/**分页*/
		onReachBottom() {
				this.page = this.page+1
				let data = this.searchData.substr(0, 1)
				if (isNaN(data) == false) {
					let orgId = JSON.parse(uni.getStorageSync('orgUserInfo')).orgId
					let cnt = {
						orgId: orgId,
						idNumber: this.searchData,
						count: this.count,
						offset: (this.page-1)*this.count
					}
					this.getORGUsersLikeIDNumber(cnt)
				} else {
					let orgId = JSON.parse(uni.getStorageSync('orgUserInfo')).orgId
					let cnt = {
						orgId: orgId,
						realName: this.searchData,
						count: this.count,
						offset: (this.page-1)*this.count
					}
					this.getORGUsersLikeRealName(cnt)
								
				}
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
		height: 60rpx;
		line-height: 60rpx;
		border-bottom: 1px solid #eee;
	
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
	.text-msg{
		padding: 40rpx;
		font-size: 28rpx;
		color: #666;
	}
	.footer-box {
		width: auto;
		padding: 40rpx;
	
	}
</style>
