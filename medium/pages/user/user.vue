<template>
	<view>
		<view :style="{'padding-top':`calc(${getNavHeight()} - 20rpx)` }"></view>
		<view class="user-box">
			<view class="flex-box">
				<image class="user-head" :src="imgSrc" mode="aspectFill"></image>
				<view class="btns-box">
					<view class="user-name">{{name}}</view>
					<view class="money-box">
						<image src="/static/image/icon/user/icon_zhaq.png" mode="aspectFill"></image>
						<text>平台币{{money}}</text>
					</view>
				</view>
			</view>
			<view class="right-box">
				<view class="editor-box btns-box" @click="navToUser">
					<image src="/static/image/icon/user/edior.png" mode="aspectFill"></image>
					<text>修改个人资料</text>
				</view>
				
			</view>
		</view>

		<view class="content-List">
			<view class="content-box" v-for="(item,index) in contentList" :key="index" @click="navToView(item.path)">
				<view class="left-box">
					<image class="left-icon" :src="item.iconSrc" mode="aspectFill"></image>
					<text>{{item.text}}</text>
				</view>
				<image class="right-icon" src="/static/image/icon/icon_enter.png" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'user',
		components: {

		},
		data() {
			return {
				userInfo: {},
				// imgSrc: uni.getStorageSync('userHead'),
				imgSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575299763852&di=29607e81f528164e31fa7e0fde3e8c2f&imgtype=0&src=http%3A%2F%2F04imgmini.eastday.com%2Fmobile%2F20191022%2F2019102213_68c92b59f9a34b9b85fd586fa71112bc_7805_cover_mwpm_03201609.jpg',
				// name: uni.getStorageSync('userName'),
				name: '印第安老斑鸠',
				money: 0,
				contentList: [{
						text: '共赚取1000澳元',
						iconSrc: '/static/image/icon/user/icon_gzqaud.png',
						path: '/pages/user/bill/bill'
					},
					{
						text: '任务总览及浏览历史',
						iconSrc: '/static/image/icon/user/icon_rwzljllls.png',
						path: '/pages/user/task/task'
					},
					{
						text: '收款账户',
						iconSrc: '/static/image/icon/user/icon_skzh.png',
						path: ''
					},
					{
						text: '账户安全',
						iconSrc: '/static/image/icon/user/icon_zhaq.png',
						path: ''
					},
					{
						text: '帮助中心',
						iconSrc: '/static/image/icon/user/icon_bzzx.png',
						path: ''
					}
				],

				applyTitle: 'Monash大学计算机专业申请',
				applyHsty: '签字已提交',
				hstyNumber: '25'
			}
		},
		methods: {
			navToUser() {
				uni.navigateTo({
					url: '/pages/user/userData/userData'
				})
			},

			navToView(url) {
				if (url) {
					uni.navigateTo({
						url: url
					})
				}
			},

			getNavHeight() {
				return 44 + uni.getSystemInfoSync()['statusBarHeight'] + 'px'
			},
		},
		onShow() {
			let userInfo = uni.getStorageSync('userInfo')
			console.log(this.$util.tryParseJson(userInfo))
			if (uni.getStorageSync('userId')) {
				this.name = uni.getStorageSync('userName')
				this.imgSrc = uni.getStorageSync('userHead')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.padding-top-box {
		padding-top: calc(64px - 20rpx);
	}

	.icon-fanhui {
		font-size: 33rpx;
		position: absolute;
		left: 29rpx;
	}

	.user-head {
		width: 150rpx;
		height: 150rpx;
		border-radius: 50%;
		margin-right: 30rpx;
	}

	.user-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 40rpx;
	}

	.user-name {
		text-align: center;
		font-size: 34rpx;
		color: $group-color;
		line-height: 48rpx;
	}

	.btns-box {
		image {
			width: 17rpx;
			height: 20rpx;
			margin-right: 10rpx;
		}
	}

	.money-box {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 143rpx;
		border-radius: 25rpx;
		background-color: #FFF8E5;
		box-sizing: border-box;
		border: 1rpx solid #FFF8E5;
		color: #FFA405;
		margin-top: 22rpx;
		font-size: 24rpx;
	}

	.editor-box {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 180rpx;
		font-size: 20rpx;
		line-height: 50rpx;
		box-sizing: border-box;
		border-radius: 25rpx;
		border: 1rpx solid #00C8BE;
		color: #00C8BE;
	}

	.content-List {
		margin-top: 52rpx;
		padding: 0 40rpx;
		font-size: 30rpx;
		color: #333333;
	}

	.content-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 34rpx 0 34rpx 20rpx;
		border-bottom: 1rpx solid rgba($color: $group-color-border, $alpha: 0.7);
	}

	.left-box {
		display: flex;
		align-items: center;
	}

	.left-icon {
		width: 35rpx;
		height: 35rpx;
		margin-right: 40rpx;
	}

	.right-icon {
		width: 12rpx;
		height: 21rpx;
	}

	.apply-info {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 596rpx;
		height: 120rpx;
		margin: 30rpx 0 0 74rpx;
		padding: 0 44rpx 0 24rpx;
		background-color: rgba($color: $group-color-search, $alpha: .36);
		border: 1rpx solid rgba($color: #CFDCE9, $alpha: .36);
	}

	.apply-text {
		font-size: 24rpx;
		line-height: 33rpx;
		color: $group-color;
	}

	.apply-hsty {
		color: #00C8BE;
	}

	.flex-box {
		display: flex;
		align-items: center;
	}
	
	.right-box{
		
	}
</style>
