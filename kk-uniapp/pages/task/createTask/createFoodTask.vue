<template>
	<view>
		<image class="topImg" :src="imgSrc" mode="aspectFill"></image>
		<view class="titleBox">
			陪吃任务
			<view class="infoBox">
				当你寂寞、孤独、心情郁闷、想找人倾诉、想结交朋友，不妨发布陪吃任务。
			</view>
		</view>
		<view class="bottomBtn">
			<button type="primary" @click="navToNext">下一步</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568717788335&di=2649d679b221acb39ee89d069efddd8d&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20190820%2Fab9c89c17d4748be9eb53073b6c32e0c.jpeg'
			}
		},
		onLoad() {

		},
		methods: {
			navToNext(){
				uni.redirectTo({
					url: '/pages/task/createTask/addFoodTask'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.topImg {
		width: 100vw;
		height: 56.25vw;
	}
	
	.titleBox{
		padding: $box-margin-top $box-margin-left;
		font-size: $list-title;
		font-weight: bold;
	}
	
	.infoBox{
		padding: $box-margin-top $box-margin-left;
		font-size: $list-title;
		font-weight: normal;
	}
	
	.bottomBtn{
		position:fixed;
		height: 2em;
		bottom:$box-margin-top;
		width:100vw;
		
		button{
			display: inline-block;
			position: absolute;
			right: $box-margin-left;
			font-size: $list-title;
		}
	}
</style>
