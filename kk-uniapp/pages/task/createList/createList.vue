<template>
	<view>
		<view class="taskBox" v-for="(item,index) in list" :key="index">
			<view @click="navToCreate(item.type)">
				<image :src="item.imgSrc" mode="widthFix"></image>
				<view>{{item.name}}</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						name: '求表扬',
						imgSrc: '/static/image/video.png',
						type: this.$constData.taskType[0].key
					},
					{
						name: '求陪玩',
						imgSrc: '/static/image/image.png',
						type: this.$constData.taskType[1].key
					},
					{
						name: '制作',
						imgSrc: '/static/image/voice.png',
						type: this.$constData.taskType[2].key
					},
					{
						name: '分享',
						imgSrc: '/static/image/comments.png',
						type: this.$constData.taskType[3].key
					}
				]
			};
		},
		methods: {
			//跳转至对应模板页
			navToCreate(e){
				uni.redirectTo({
					url:`/pages/task/template/template?type=${e}`
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.taskBox {
		display: inline-block;
		box-sizing: border-box;
		width: 50vw;
		padding: 5vw;
		color: $uni-text-color;
		font-size: 40upx;
		text-align: center;
		font-weight: bold;

		image {
			width: 30vw;
			height: 30vw;
		}
	}
</style>
