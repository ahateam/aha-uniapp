<template>
	<view class="contentBox" :style="{backgroundImage: 'url(' + JSON.parse(obj.data).src + ')' }">
		<navigator :url="'/pages/index/vip/column/column?id='+obj.id+'&title='+obj.title+'&time='+obj.createTime+'&img='+JSON.parse(obj.data).src">
			<view class="columnTitle">{{ obj.title }}</view>
			<view class="columnTime">{{ getTime(obj.createTime) }}</view>
		</navigator>
		<view class="contentList">
			<view v-for="(list,key) in obj.child" :key="key">
				<view :class="key == 0?'lists':'listTop'" :url="'/pages/index/vip/course/details/details?id='+list.id+'&id1='+list._id"
				 v-if="list.type == 3" @click="navigator(list)">
					<view class="imgBox">
						<image :src="JSON.parse(list.data).imgSrc" mode="aspectFill"></image>
					</view>
					<view class="rightBox">
						<view class="title">{{ list.title }}</view>
						<text class="msg">{{ list.time }}</text>
					</view>
					<view class="clearBoth"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['obj'],
		data() {
			return {

			}
		},
		methods: {
			navigator(list) {
				let url = ''
				if (list.type == this.$constData.contentType[0].key || list.type == this.$constData.contentType[2].key) {
					url = 'details'
				} else if (list.type == this.$constData.contentType[1].key) {
					url = 'detailsAtc'
				}
				console.log(`/pages/index/vip/course/${url}/${url}?id=${list.id}&id1=$(list._id)`)
				// uni.navigateTo({
				// 	url:`/pages/index/vip/course/${url}/${url}?id=${list.id}&id1=$(list._id)`
				// })
			},
			getTime(date){
				let time = new Date(date)
				let localTime = time.toLocaleString()
				return localTime
			},
		}
	}
</script>

<style lang="scss" scoped>
	.clearBoth {
		clear: both;
	}

	.columnTitle {
		padding-top: 60upx;
		margin-left: 20upx;
		color: #FFFFFF;
		font-size: 50upx;
		font-weight: bold;
	}

	.columnTime {
		padding: 10upx 0 60upx 20upx;
		color: #FFFFFF;
		font-size: 28upx;
	}

	.contentBox {
		background-color: #f0f0f0;
		padding: 10px 0;
		border-radius: 5px;
		overflow: hidden;
		letter-spacing: 1px;
		position: relative;
		margin: $box-margin-top $box-margin-left;
		width: 690upx;
		box-sizing: border-box;

		.contentList {
			background-color: #fff;
			width: 94%;
			border-radius: 5px;
			margin: 0 auto;
			margin-top: 10upx;

			.lists {
				position: relative;
				padding: 2vw;
				height: 29vw;
				font-size: 18px;
				line-height: 18px;

				.title {
					margin-bottom: 50upx;
					color: #000;
					font-size: 20px;
				}


				.msg {
					font-size: 14px;
					color: #dcdcdc;
				}
			}

			.imgBox {
				position: absolute;
				top: 50%;
				margin-top: -12.5vw;
				width: 25vw;
				height: 25vw;
				border-radius: 5px;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}


		}
	}

	.rightBox {
		position: absolute;
		margin-left: 29vw;
		top: 50%;
		margin-top: -30px;
	}
</style>
