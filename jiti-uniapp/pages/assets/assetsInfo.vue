<template>
	<view>
		<view class="card" v-if="info">
			<view class="card-box">
				<view class="title-box">
					基础信息
				</view>
				<view class="card-content">
					<view class="item-list">
						<view class="list-title">
							资产名称
						</view>
						<view class="list-val">
							{{info.name}}
						</view>
					</view>
					<view class="item-list">
						<view class="list-title">
							资产证件
						</view>
						<view class="list-val">
							{{info.sn}}
						</view>
					</view>
					<view class="item-list">
						<view class="list-title">
							资源类型
						</view>
						<view class="list-val">
							{{info.resType}}
						</view>
					</view>
					<view class="item-list">
						<view class="list-title">
							资产类型
						</view>
						<view class="list-val">
							{{info.assetType}}
						</view>
					</view>
					<view class="item-list">
						<view class="list-title">
							资产价格
						</view>
						<view class="list-val">
							{{info.originPrice}} (万元)
						</view>
					</view>
					<view class="item-list">
						<view class="list-title">
							资产位置
						</view>
						<view class="list-val">
							{{info.location}}
						</view>
					</view>
					<view class="item-list">
						<view class="list-title">
							资产权属
						</view>
						<view class="list-val">
							{{info.ownership}}
						</view>
					</view>

					<view class="item-list">
						<view class="list-title">
							保管人
						</view>
						<view class="list-val">
							{{info.keeper}}
						</view>
					</view>



				</view>
			</view>

			<view class="card-box" style="margin-top: 40rpx;">
				<view class="title-box">
					经营属性
				</view>
				<view class="card-content">
					<view class="item-list">
						<view class="list-title">
							经营方式
						</view>
						<view class="list-val">
							{{info.businessMode}}
						</view>
					</view>
					<view class="item-list">
						<view class="list-title">
							起止时间
						</view>
						<view class="list-val">
							{{info.businessTime}}
						</view>
					</view>
					<view class="item-list">
						<view class="list-title">
							投资对象
						</view>
						<view class="list-val">
							{{info.holder}}
						</view>
					</view>
					<view class="item-list">
						<view class="list-title">
							年收益
						</view>
						<view class="list-val">
							{{info.yearlyIncome}} (万元)
						</view>
					</view>
				</view>
			</view>

			<view class="card-box" style="margin-top: 40rpx;" v-if="info.assetType == '不动产'">
				<view class="title-box">
					不动产属性
				</view>
				<view class="card-content">
					<view class="item-list">
						<view class="list-title">
							不动产类型
						</view>
						<view class="list-val">
							{{info.estateType}}
						</view>
					</view>
					<view class="item-list">
						<view class="list-title">
							建筑面积
						</view>
						<view class="list-val">
							{{info.area}} (平方米)
						</view>
					</view>
					<view class="item-list">
						<view class="list-title">
							占地面积
						</view>
						<view class="list-val">
							{{info.floorArea}} （平方米）
						</view>
					</view>
					<view class="item-list">
						<view class="list-title">
							起点位置
						</view>
						<view class="list-val">
							{{info.locationStart}}
						</view>
					</view>
					<view class="item-list">
						<view class="list-title">
							终点位置
						</view>
						<view class="list-val">
							{{info.locationEnd}}
						</view>
					</view>
					<view class="item-list">
						<view class="list-title">
							起点坐标
						</view>
						<view class="list-val">
							{{info.coordinateStart}}
						</view>
					</view>
					<view class="item-list">
						<view class="list-title">
							终点坐标
						</view>
						<view class="list-val">
							{{info.coordinateEnd}}
						</view>
					</view>
					<view class="item-list">
						<view class="list-title">
							资产蓄积
						</view>
						<view class="list-val">
							{{info.accumulateStock}} (立方米)
						</view>
					</view>
					<view class="item-list">
						<view class="list-title">
							棵数
						</view>
						<view class="list-val">
							{{info.treeNumber}} （棵）
						</view>
					</view>

					<view class="card-box-title2">
						四至边界
					</view>
					<view class="item-list">
						<view class="list-title">
							东面
						</view>
						<view class="list-val">
							{{getEast()}}
						</view>
					</view>
					<view class="item-list">
						<view class="list-title">
							西面
						</view>
						<view class="list-val">
							{{geteWest()}}
						</view>
					</view>
					<view class="item-list">
						<view class="list-title">
							南面
						</view>
						<view class="list-val">
							{{getSouth()}}
						</view>
					</view>
					<view class="item-list">
						<view class="list-title">
							北面
						</view>
						<view class="list-val">
							{{getNorth()}}
						</view>
					</view>
				</view>
			</view>


			<view class="card-box" style="margin-top: 40rpx;" v-if="info.assetType == '动产'">
				<view class="title-box">
					动产属性
				</view>
				<view class="card-content">
					<view class="item-list">
						<view class="list-title">
							规格型号
						</view>
						<view class="list-val">
							{{info.specType}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="footer-box">
			<button type="default" @click="toBack">返回上一页</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'assetsInfo',
		data() {
			return {
				info: ''
			}
		},
		methods: {
			getEast() {
				if (this.info.boundary) {
					return JSON.parse(this.info.boundary).east
				}

			},
			geteWest() {
				if (this.info.boundary) {
					return JSON.parse(this.info.boundary).west
				}

			},
			getSouth() {
				if (this.info.boundary) {
					return JSON.parse(this.info.boundary).south
				}

			},
			getNorth() {
				if (this.info.boundary) {
					return JSON.parse(this.info.boundary).north
				}

			},
			toBack(){
				uni.navigateBack()
			}
		},
		onLoad(option) {
			this.info = JSON.parse(decodeURIComponent(option.info))
		}
	}
</script>

<style scoped lang="scss">
	.card {
		width: 90%;
		margin: 32rpx auto 0 auto;

		.card-box {
			width: auto;
			-webkit-box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
			box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
		}

		.title-box {
			width: auto;
			height: 50rpx;
			color: #fff;
			font-size: 32rpx;
			line-height: 50rpx;
			background: $jiti-color-blue;
			padding: 20rpx;
			text-align: center;
		}

		.card-content {
			width: auto;

			.item-list {
				padding: 20rpx;
				margin-top: 10rpx;
				width: auto;
				overflow: hidden;
				border-top: 1px solid #eee;

				.list-title {
					float: left;
					width: 30%;
					line-height: 50rpx;
					font-size: 28rpx;
					color: #333;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.list-val {
					float: left;
					width: 70%;
					line-height: 50rpx;
					font-size: 28rpx;
					color: #666;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
	}

	.card-box-title2 {
		width: auto;
		height: 40rpx;
		color: #fff;
		font-size: 28rpx;
		line-height: 40rpx;
		background: $jiti-color-purple;
		padding: 10rpx;
		text-align: center;

	}
	.footer-box {
		width: auto;
		padding: 40rpx;
	
	}
</style>
