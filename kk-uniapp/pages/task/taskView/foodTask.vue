<template>
	<view>
		<view class="autoBox">
			<view class="contentBox">
				{{title}}
			</view>
		</view>

		<view class="autoBox">
			<view class="contentBox">
				<text v-for="(item,index) in objList" :key="index">
					{{item.name}}
				</text>
			</view>
		</view>

		<view class="autoBox">
			<view class="contentBox">
				<text v-for="(item,index) in purposeList" :key="index">
					{{item.name}}
				</text>
			</view>
		</view>

		<view class="autoBox">
			<view class="autoBox">
				<text class="leftTitle">年龄</text> <text>{{age}}</text>
			</view>
			<view class="autoBox">
				<text class="leftTitle">地点</text> <text>{{address}}</text>
			</view>
			<view class="autoBox">
				<text class="leftTitle">租金</text> <text>{{money}}元/小时</text>
			</view>
		</view>
		
		<view class="autoBox"> 
			<text class="infoText">
				友情提示：预交定金99%是骗子，请当面交易。
			</text>
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
				<view v-for="(item, index) in comment" :key="index" class="eva-item" @click="openBox(item)">
					<image :src="item.userHead" mode="aspectFill"></image>
					<view class="eva-right">
						<text>{{item.user.name}}</text>
						<text>{{item.time}}</text>
						<view class="zan-box">
							<text v-if="taskStatus == 1&&userId == upUserId">选择</text>
							<text v-if="taskStatus == 2&&item.id == accepterId">交易中</text>
							<!-- <text v-if="taskStatus == 3&&item.id == accepterId">待审核</text> -->
						</view>
						<text class="content">电话: {{item.tel}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 选择乙方盒子 -->
		<view class="choiceB" v-if="upChangeBox">
			<view class="choiceTitle">
				任务将由{{choiceName}}完成
			</view>
			<view class="choiceBtnBox">
				<button class="leftBtn" type="primary" @click="upChangeBox = false">取消</button>
				<button class="rightBtn" type="primary" @click="choiceUser">确定</button>
			</view>
		</view>
		
		<!-- 领取任务按钮 -->
		<view class="bottomBtn" v-if="taskStatus == 1&&userId!=upUserId">
			<button type="primary" class="receiveBtn" @click="receiveBtn" v-if="userId != upUserId">领取</button>
		</view>
		
		<!-- 填写资料盒子 -->
		<view class="hiddenBox" v-if="hidden">
			<view class="colseBox" @click="colseBox">X</view>
			<input type="number" v-model="telPhone" placeholder="请输入电话号码" />
			<button type="primary" @click="submission">提交</button>
		</view>
		
		<!-- 评价按钮 -->
		<view class="bottomBtnBox" v-if="taskStatus == 3&&userId == upUserId">
			<!-- 			<button class="leftBtn" type="primary" @click="navToVideo">查看作品</button> -->
			<button class="rightBtn" type="primary">评价</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId: uni.getStorageSync('userId'), //登录用户id
				video: '', //视频地址.
				title: '标题标题标题标题标题标题标题标题标题标题', //标题
				text: '简介简介简介简介简介简介简介简介简介简介简介简介',
				id: '', //模板id
				upUserId: 1234567890, //上传者ID

				hidden: false, //隐藏box

				taskStatus: 2, //任务状态

				comment: [{
					userHead: '/static/logo.png',
					user: {
						name: '233',
					},
					tel: '1111',
					id: '1234567890',
				}], //接单列表

				telPhone: '', //电话
				accepterId: '1234567890', //接取者id

				objList: [{
						name: '体贴暖男'
					},
					{
						name: '风趣幽默'
					}
				],

				purposeList: [{
						name: '吃饭聊天'
					},
					{
						name: '假扮男友'
					}
				],
				
				age:'18-20',
				address:'遵义',
				money:'50',
				
				//选择陪吃人盒子
				upChangeBox:false,
				choiceName:'name',
			}
		},
		
		onload(options){
			
		},
		
		methods: {
			//选择对象弹窗
			openBox(item){
				if(this.taskStatus != 1||this.userId != this.upUserId){
					return
				}
				this.accepterId = item.id
				this.upChangeBox = true
				this.choiceName = item.user.name
			},
			
			//选择完成任务对象
			choiceUser(){
				this.upChangeBox = false
				uni.showToast({
					title:'选择成功',
					duration:1000
				})
			},

			//领取任务
			receiveBtn() {
				this.hidden = true
			},

			//提交信息
			submission() {
				if (this.telPhone == '') {
					uni.showToast({
						title: '请填写电话',
						duration: 1000,
						icon: 'none'
					})
					return
				}

				this.hidden = false
			},
		}
	}
</script>

<style lang="scss">
	.autoBox {
		padding: $box-margin-top $box-margin-left;
		font-size: $list-title;
	}

	.contentBox {
		background-color: #ec706b;
		color: #fff;
		// font-weight: bold;
		border-radius: 10upx;
		padding: $box-margin-top $box-margin-left;

		text {
			display: inline-block;
			width: 33.3%;
			text-align: center;
		}
	}
	
	.leftTitle{
		display: inline-block;
		width: 20vw;
		text-align: center;
	}
	
	.infoText{
		color: $list-info-color;
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

	.bottomBtn {
		position: fixed;
		bottom: 10upx;
		width: 100vw;
	}

	.receiveBtn {
		width: 80vw;
		margin: 0 auto;
		font-size: $list-title;
	}

	.hiddenBox {
		position: fixed;
		box-sizing: border-box;
		padding: $box-margin-top $box-margin-left;
		background-color: #fff;
		height: 210upx;
		width: 100vw;
		bottom: 0;
		box-shadow: 0px -5px 5px #888888;

		button {
			position: absolute;
			bottom: 10upx;
			left: 50%;
			width: 5em;
			margin-left: -2.5em;
			font-size: $list-title;
		}

		input {
			width: 10em;
			font-size: $list-title;
		}

		// z-index: 3;
	}

	.colseBox {
		position: absolute;
		right: 10upx;
		top: 10upx;
		font-size: 30upx;
		width: 40upx;
		height: 40upx;
		text-align: center;
		background-color: #ec706b;
		color: #F8F8F8;
	}

	.upLoadBox {
		padding: $box-margin-top $box-margin-left;
		font-size: $list-title;
	}

	.commitBtn {
		position: relative;

		button {
			position: absolute;
			width: 5em;
			font-size: $list-title;
			right: 0;
		}
	}

	.bottomBtnBox {
		position: fixed;
		bottom: $box-margin-top;
		height: 2em;
		width: 100vw;

		button {
			position: absolute;
			display: inline-block;
			font-size: $list-title;
		}
	}

	.leftBtn {
		left: 5vw;
	}

	.rightBtn {
		right: 5vw;
	}
	
	.choiceB{
		position: fixed;
		padding: $box-margin-top $box-margin-left;
		box-sizing: border-box;
		height: 45vw;
		width: 80vw;
		top: 50%;
		transform: translate(-50%,-50%);
		left: 50%;
		background-color: #fff;
		box-shadow: 0px 0px 10px #333333;
		border-radius: 10upx;
	}
	
	.choiceTitle{
		font-size: $list-title;
		font-weight: bold;
	}
	
	.choiceBtnBox{
		position: absolute;
		left: 0;
		height: 2em;
		bottom: $box-margin-top;
		width:100%;
		button{
			position: absolute;
			font-size: $list-title;
		}
	}
</style>
