<template>
	<view>
		<!-- 顶部选项卡 -->
		<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft">
			<view v-for="(item,index) in tagsList" :key="item" class="nav-item" :class="{current: index === tabCurrentIndex}"
			@click="changeTag(index)">{{item}}</view>
		</scroll-view>

		<view>
			<template v-for="(item,index) in contents">
				<view :key="index">
					<view class="item-box" @click="toPollInfo">
						<view class="poll_title">标题</view>
						<view class="poll_content">
							<view>内容</view>
							<view class="content_text">查看详情</view>
						</view>
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
				tagsList: ["等待参与","已参与","全部投票"], //标签列表
				tabCurrentIndex: 0, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离,
				tagActiveId: '400548885618571', //默认标签id-全部

				userId: '',

				contents: ["1","2"],		//内容列表
				
				//上拉加载 ---分页
				offset: 0,
				count: 10,
				page: 1,
				pageOver: false,	//还能不能分页
				
				

			}
		},
		onLoad() { 
			
		},
		methods: {
			/*根据标签获取内容列表*/
			getContentsByTag(cnt) {
				this.$api.getContents(cnt, (res) => {
					let list = []
					if (res.data.rc == this.$util.RC.SUCCESS) {
						list = this.$util.tryParseJson(res.data.c)
						
						this.tryDataList(list)
						
						
					} else {
						list = []
					}
					if(list.length && list.length<this.count){
						this.pageOver = true
					}else{
						this.pageOver = false
					}
				
					this.contents.push(list)
					console.log('1111')
					console.log(this.contents)
				})

			},

			/* 触发改变选中标签*/
			changeTag(_index) {
				this.tabCurrentIndex = _index
			},
			toPollInfo(){
				uni.navigateTo({
					url:"pollInfo"
				})
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
			width: 33%;
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
		width: 700rpx;
		height: 140rpx;
		background: #fff;
		margin: 10rpx auto;
		border-radius: 2%;
	}
	
	.poll_title{
		height: 70rpx;
		border-bottom: #F5F5F5 1rpx solid;
		line-height: 70rpx;
	}
	.poll_content{
		height: 63rpx;;
		font-size: 28rpx;
		color: darkgray;
		line-height: 63rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.content_text{
		width: 100rpx;
		height: 32rpx;
		background-color: #007aff;
		color: #fff;
		border-radius: 2%;
		font-size: 20rpx;
		line-height: 32rpx;
		text-align: center;
	}
</style>
