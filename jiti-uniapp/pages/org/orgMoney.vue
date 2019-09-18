<template>
	<view>
		<view class="maincon orgInfo-box">
			<view class="org-item">
				<view class="org-name">机构名称：</view>
				<view class="org-res">{{info.name}}</view>
			</view>
			<view class="org-item">
				<view class="org-name">组织资金：</view>
				<view class="org-res">￥{{info.capital}}</view>
			</view>
			<view class="org-item">
				<view class="org-name">负债资金：</view>
				<view class="org-res">￥{{info.debt}}</view>
			</view>
			<view class="org-item">
				<view class="org-name">债权资金：</view>
				<view class="org-res">￥{{info.receivables}}</view>
			</view>
			<view class="org-item">
				<view class="org-name">年毛收入：</view>
				<view class="org-res">￥{{info.income}}</view>
			</view>
			<view class="org-item">
				<view class="org-name">每股分红：</view>
				<view class="org-res">￥{{info.bonus}}</view>
			</view>
			<view class="org-item">
				<view class="org-name">工作预算：</view>
				<view class="org-res">￥{{info.budget}}</view>
			</view>
			<view class="org-item">
				<view class="org-name">剩余工作预算：</view>
				<view class="org-res">￥{{moreDudget}}</view>
			</view>
			<view class="org-item">
				<view class="org-name">对外投资：</view>
				<view class="org-res">￥{{info.investment}}</view>
			</view>
			<view class="org-item">
				<view class="org-name">资产估值：</view>
				<view class="org-res">￥{{info.valuation}}</view>
			</view>
				<view class="footer-box">
				<button type="primary" @click="toAsset()">查看资产详情</button>
				<button type="default" @click="toBack()">返回上一页</button>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		name: 'orgMoney',
		data() {
			return {
				info: '',
				moreDudget: '',
			}
		},
		methods: {
			toAsset(){
				uni.navigateTo({
					url:'../assets/assets'
				})
			},
			toBack(){
				uni.navigateBack()
			}
		},
		onLoad() {
			console.log('1111')
			let orgId = JSON.parse(uni.getStorageSync('orgUserInfo')).orgId

			let cnt = {
				orgId: orgId
			}
			this.$api.getORGById(cnt, (res) => {
				if (res.data.rc == this.$util.RC.SUCCESS) {
					this.info = this.$util.tryParseJson(res.data.c)
					this.moreDudget = parseInt(this.info.budget) - parseInt(this.info.financialBudget)
				}

			})
		}
	}
</script>

<style scoped lang="scss">
	.org-item {
		width: 100%;
		height: 88rpx;
		display: flex;
		flex-direction: row;
		border-bottom: 1rpx solid #DDDDDD;
	}

	.org-item view {
		height: 88rpx;
		line-height: 88rpx;
		font-size: 28rpx;
	}

	.org-name {
		width: 40%;
	}

	.org-res {
		width: 60%;
		color: #969799;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	image {
		width: 650rpx;
	}

	.org-item-img {
		font-size: 30rpx;
		margin-top: 20rpx;
	}

	button {
		margin-top: 40rpx;
	}
</style>
