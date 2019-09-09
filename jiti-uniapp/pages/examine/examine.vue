<template>
	<view>
		<!-- 顶部选项卡 -->
		<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft">
			<view v-for="(item,index) in tagsList" :key="item.id" class="nav-item" :class="{current: index === tabCurrentIndex}"
			 :id="item.id" @click="changeTag(index)">{{item.name}}</view>
		</scroll-view>

		<view>
			<template v-for="(item,index) in contents">
				<view :key="index">
					<view class="item-box" @click="toAssetsInfo(tabCurrentIndex)">
						<view class="item-box-text">
							<view class="box-text1">家庭户户主：李旭</view>
							<view class="box-text2">操作时间：2019/8/29 14:02:33</view>
						</view>
						<view class="details-text">等待组织审核</view>
					</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tagsList: [
					{
						id:0,
						name:"分户审批"
					},
					{
						id:1,
						name:"股权变更"
					}
				], //标签列表
				tabCurrentIndex: 0, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离,
				tagActiveId: '400548885618571', //默认标签id-全部

				userId: '',

				contents: [0,1,2,3],		//内容列表
				
				//上拉加载 ---分页
				offset: 0,
				count: 10,
				page: 1,
				pageOver: false,	//还能不能分页
				
				

			}
		},
		onLoad() {},
		methods: {

			

			/* 触发改变选中标签*/
			changeTag(_index) {
				this.tabCurrentIndex = _index
			},
			toAssetsInfo(index){
				if(index==0){
					uni.navigateTo({
						url:"familyInfo"
					})
				}else{
					uni.navigateTo({
						url:"shareInfo"
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page,
	.content {
		background-color: #f8f8f8;
		height: 100%;
		overflow: hidden;
	}

	/* 顶部tabbar */
	.nav-bar {
		position: relative;
		z-index: 10;
		height: 90upx;
		white-space: nowrap;
		box-shadow: 0 2upx 8upx rgba(0, 0, 0, .06);
		background-color: #fff;

		.nav-item {
			display: inline-block;
			width: 50%;
			height: 90upx;
			text-align: center;
			line-height: 90upx;
			font-size: 30upx;
			color: #303133;
			position: relative;

			&:after {
				content: '';
				width: 0;
				height: 0;
				border-bottom: 4upx solid #007aff;
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				transition: .3s;
			}
		}

		.current {
			color: #007aff;

			&:after {
				width: 50%;
			}
		}
	}
	.item-box{
		width: 750rpx;
		height: 102rpx;
		background: #fff;
		margin-top: 10rpx;
		display: flex;
		flex-direction: row;
	}
	.item-box-text{
		width: 65%;
		color: #666;
	}
	.item-box-text view{
		height: 51rpx;
		line-height: 51rpx;
	}
	.box-text1{
		font-size: 28rpx;
	}
	.box-text2{
		font-size: 24rpx;
	}
	.details-text{
		width: 35%;
		height: 102rpx;
		text-align: center;
		line-height: 102rpx;
		color: red;
		font-size: 28rpx;
	}
</style>
