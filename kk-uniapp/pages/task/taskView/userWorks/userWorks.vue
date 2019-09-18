<template>
	<view>
		<video class="videoBox" :src="videoSrc" controls></video>
		
		<view class="commentBox">
			<textarea v-model="textarea" placeholder="请输入评论" />
		</view>
		
		<view class="bottomBtnBox">
			<button class="leftBtn" type="primary" @click="dissatisfied">不满意</button>
			<button class="rightBtn" type="primary" @click="satisfied">满意</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoSrc:'',
				
			};
		},
		onLoad() {
			
		},
		methods:{
			dissatisfied(){
				
			},
			satisfied(){
				
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.videoBox{
		width: 100vw;
		height: 56.25vw;
	}
	
	.commentBox{
		padding: $box-margin-top $box-margin-left;
		font-size: $list-title;
	}
	
	.bottomBtnBox{
		position: fixed;
		bottom: $box-margin-top;
		height: 2em;
		width: 100vw;
		button{
			position: absolute;
			display: inline-block;
			font-size: $list-title;
		}
	}
	
	.leftBtn{
		left: 5vw;
	}
	
	.rightBtn{
		right: 5vw;
	}
</style>
