<template>
	<view>
		<video class="video" :src="video" controls></video>
		<view>
			
		</view>
		<view class="teplateInfo">
			<input type="text" placeholder="请输入你想夸的人的名字" />
		</view>
		<button class="nextBtn" type="primary" @click="navToNext">发布</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				video:'',//视频地址
				userName:'',//用户想夸的对象名字
				text:'简介简介简介简介简介简介简介简介简介简介简介简介',//
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
