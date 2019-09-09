<template>
	<view>
		<video class="video" :src="video" controls></video>
		<view class="teplateInfo">
			{{text}}
		</view>
		<button class="nextBtn" type="primary" @click="navToNext">下一步</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				video:'',//视频地址
				text:'简介简介简介简介简介简介简介简介简介简介简介简介',
				id:'',//模板id
			}
		},
		methods:{
			navToNext(){
				uni.redirectTo({
				    url: `/pages/task/createTask/addVideoTask?id=${this.id}`
				})
			},
		}
	}
</script>

<style lang="scss">
	.video{
		width: 100vw;
		height: 56.25vw;
	}
	
	.teplateInfo{
		padding: $box-margin-top $box-margin-left;
		font-size: $list-title;
	}
	
	.nextBtn{
		position: fixed;
		right: $box-margin-left;
		bottom: $box-margin-top;
		font-size: $list-title;
	}
</style>
