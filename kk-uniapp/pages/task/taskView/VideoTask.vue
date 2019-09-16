<template>
	<view>
		<video class="video" :src="video" controls></video>
		<view class="teplateInfo">
			{{text}}
		</view>

		<view class="container">
			<!-- 接单列表 -->
			<view class="s-header">
				<text class="tit">领取任务的人</text>
			</view>
			<view class="evalution">
				<view class="noEva" v-if="comment.length == 0">
					还没有人领任务哦~
				</view>
				<view v-for="(item, index) in comment" :key="index" class="eva-item">
					<image :src="item.userHead" mode="aspectFill"></image>
					<view class="eva-right">
						<text>{{item.user.name}}</text>
						<text>{{item.time}}</text>
						<view class="zan-box" @click="upvote(item.id,index)">
							<text>{{item.commentTotalCount}}</text>
							<text class="yticon iconfont kk-shoucang1"></text>
						</view>
						<text class="content">{{item.tel}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="bottomBtn">
			<button type="primary" class="receiveBtn" @click="receiveBtn" v-if="userId != upUserId">领取</button>
		</view>
		
		<view class="hiddenBox" v-if="hidden">
			<textarea v-model="userText" placeholder="描述下你的特长" />
			<button type="primary" @click="submission">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId: uni.getStorageSync('userId'), //登录用户id
				video: '', //视频地址
				text: '简介简介简介简介简介简介简介简介简介简介简介简介',
				id: '', //模板id
				upUserId: 1234567890, //上传者ID
				
				hidden:false,//隐藏box

				taskStatus: 1,//任务状态

				comment: [{
					userHead: '/static/logo.png',
					user: {
						name: '233',
					},
					tel: '1111',
					id: '',
				}],//接单列表
				
				userText:'',//接单描述
				
				
			}
		},
		methods: {
			
			//领取任务
			receiveBtn(){
				this.hidden = true
			},
			
			//提交信息
			submission(){
				this.hidden = false
			},
		}
	}
</script>

<style lang="scss">
	.video {
		width: 100vw;
		height: 56.25vw;
	}

	.teplateInfo {
		padding: $box-margin-top $box-margin-left;
		font-size: $list-title;
	}

	.bottomBox {
		margin: $box-margin-top $box-margin-left;
		font-size: $list-title;
	}

	.s-header {
		padding: 20upx 30upx;
		font-size: 30upx;
		color: #303133;
		background: #fff;
		margin-top: 16upx;

		&:before {
			content: '';
			width: 0;
			height: 40upx;
			margin-right: 24upx;
			border-left: 6upx solid #ec706b;
		}
	}

	/* 评论 */
	.evalution {
		display: flex;
		flex-direction: column;
		background: #fff;
		padding: 20upx 0;
	}

	.eva-item {
		display: flex;
		padding: 20upx 30upx;
		position: relative;

		image {
			width: 60upx;
			height: 60upx;
			border-radius: 50px;
			flex-shrink: 0;
			margin-right: 24upx;
		}

		&:after {
			content: '';
			position: absolute;
			left: 30upx;
			bottom: 0;
			right: 0;
			height: 0;
			border-bottom: 1px solid #eee;
			transform: translateY(50%);
		}

		&:last-child:after {
			border: 0;
		}
	}

	.eva-right {
		display: flex;
		flex-direction: column;
		flex: 1;
		font-size: 26upx;
		color: #909399;
		position: relative;

		.zan-box {
			display: flex;
			align-items: base-line;
			position: absolute;
			top: 10upx;
			right: 10upx;

			.yticon {
				margin-left: 8upx;
			}
		}

		.content {
			font-size: 28upx;
			color: #333;
			padding-top: 20upx;
		}
	}

	/* end */
	
	.bottomBtn{
		position: fixed;
		bottom: 10upx;
		width: 100vw;
	}
	
	.receiveBtn {
		width: 80vw;
		margin: 0 auto;
		font-size: $list-title;
	}
	
	.hiddenBox{
		position: fixed;
		box-sizing: border-box;
		padding: $box-margin-top $box-margin-left;
		background-color: #fff;
		height: 40vh;
		width: 100vw;
		bottom: 0;
		box-shadow: 0px -5px 5px #888888;
		
		button{
			position: absolute;
			bottom: 10upx;
			left: 50%;
			width: 80vw;
			margin-left: -40vw;
			font-size: $list-title;
			
		}
		// z-index: 3;
	}
</style>
