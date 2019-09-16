<template>
	<view>
		<video class="video" :src="video" controls></video>
		<view class="teplateInfo">
			{{text}}
		</view>
		
		<view class="bottomBox" v-if="taskStatus == 1">
			接单列表
			<view class="userList" v-for="(item,index) in userList" :key="index">
				<view class="listHead">
				<image src="/static/logo.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				userId:uni.getStorageSync('userId'),//登录用户id
				video:'',//视频地址
				text:'简介简介简介简介简介简介简介简介简介简介简介简介',
				id:'',//模板id
				upUserId:1234567890,//上传者ID
				
				userList:[
					{
						name:'',
						tel:'',
						id:'',
					}
				],
			}
		},
		methods:{
			
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
	
	.bottomBox{
		margin: $box-margin-top $box-margin-left;
		font-size: $list-title;
	}
	
	.userList{
		position: relative;
		margin: $box-margin-top 0;
		
	}
	
	.listHead{
		border-radius: 100px;
		width: 80upx;
	}
</style>
