<template>
	<view>
		<video class="video" :src="video" controls></video>
		<view class="teplateInfo">
			<view class="adminInfo">
				上传者要求:
			</view>
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
				<view v-for="(item, index) in comment" :key="index" class="eva-item" @click="navToUserInfo(item)">
					<image :src="item.user.ext.userHead" mode="aspectFill"></image>
					<view class="eva-right">
						<text>{{item.user.name}}</text>
						<text>{{item.time}}</text>
						<view class="zan-box">
							<text v-if="item.status == constData.taskStatus[1].key">进行中</text>
							<text v-if="item.status == constData.taskStatus[2].key">已上传，待审核</text>
							<text v-if="item.status == constData.taskStatus[3].key">已完成</text>
							<text v-if="item.status == constData.taskStatus[4].key">未通过，重新提交</text>
						</view>
						<text class="content">电话: {{item.data.tel}}</text>
					</view>
				</view>
			</view>
		</view>


		<view class="bottomBtn" v-if="taskStatus < constData.taskWallStatus[3].key && userId!=upUserId">
			<button type="primary" class="receiveBtn" @click="receiveBtn">领取</button>
		</view>

		<view class="hiddenBox" v-if="hidden">
			<view class="colseBox" @click="colseBox">X</view>
			<view class="userImg">
				<view class="addImg" style="margin-bottom: 10upx;display: inline-block;" v-if="imgSrc == ''" @click="upLoadImg">
					<text class="iconfont kk-jia"></text>
				</view>
				<text class="infoText">上传您的照片</text>
				<image :src="imgSrc" mode="aspectFill" v-if="imgSrc != ''"></image>
			</view>
			<input type="text" v-model="telPhone" placeholder="请输入您的联系方式" />
			<textarea v-model="userText" placeholder="描述下您的特长" />
			<button type="primary" @click="submission">提交</button>
		</view>
		
		<view class="upLoadBox" v-if="taskStatus == 4 && userId != upUserId ||taskStatus == 5 && userId != upUserId">
			<view style="margin-bottom: 15upx;">
				上传作品：
			</view>
			
			<view class="userImg">
				<view class="addImg" v-if="videoSrc == ''" @click="upLoadVideo">
					<text class="iconfont kk-jia"></text>
				</view>
				<video :src="videoSrc" v-if="videoSrc != ''"></video>
			</view>
			
			<view class="commitBtn">
				<button type="primary" @click="commitVideo">提交</button>
			</view>
		</view>
		<view class="bottomBtnBox" v-if="taskStatus == 5&&userId == upUserId || taskStatus == 6 &&userId == upUserId">
			<button class="leftBtn" type="primary" @click="navToVideo">查看作品</button>
			<button class="rightBtn" type="primary">评价</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				constData:this.$constData,
				
				userId: uni.getStorageSync('userId'), //登录用户id
				video: '', //视频地址
				text: '',
				id: '', //模板id
				upUserId: '', //上传者ID
				
				hidden:false,//隐藏box

				taskStatus: 999,//任务状态

				comment: [],//接单列表
				
				userText:'',//接单描述
				
				imgSrc:'',//上传照片地址
				
				accepterId:'',//接取者id
				videoSrc:'',//上传作品地址
				
				telPhone:'',//电话
			}
		},
		onLoad(res) {
			this.id = res.id
			this.getTask()
			this.getTaskApplys()
		},
		methods: {
			//查看作品
			navToVideo(){
				let cnt = {
					taskId: this.id, // Long <选填> 任务编号
					// status: this.$constData.taskStatus[1].key, // Byte <选填> 状态
					works: true, // Boolean <选填> 是否查询作品
					// userId: this.userId, // Long <选填> 接单者编号
					count: 1, // int 
					offset: 0, // int 
				}
				this.$api.getTaskApplys(cnt,(res)=>{
					if(res.data.rc == this.$util.RC.SUCCESS){
						let arr = this.$util.tryParseJson(res.data.c)
						console.log('11111')
						console.log(arr)
						if(arr.length>0){
							let id = arr[0].id
							uni.navigateTo({
								url:`/pages/task/taskView/userWorks/userWorks?id=${id}`
							})
						}
					}else{
						console.log('失败')
					}
				})
			},
			
			//提交作品
			commitVideo(){
				if(this.videoSrc == ''){
					uni.showToast({
						title:'请上传作品',
						duration:1000,
						icon:'none'
					})
					return
				}
				let cnt = {
					taskId: this.id, // Long <选填> 任务编号
					// status: status, // Byte <选填> 状态
					userId: this.userId, // Long <选填> 接单者编号
					count: 10, // int 
					offset: 0, // int 
				}
				this.$api.getTaskApplys(cnt,(res)=>{
					if(res.data.rc == this.$util.RC.SUCCESS){
						let arr = this.$util.tryParseJson(res.data.c)
						let cnt1 = {
							id: arr[0].id, // Long 任务订单id
							taskDate: this.videoSrc, // String 上传作品数据
						}
						this.$api.editApplyTaskData(cnt1,(res)=>{
							if(res.data.rc == this.$util.RC.SUCCESS){
								uni.switchTab({
									url:'/pages/task/task'
								})
								uni.showToast({
									title:'提交成功',
									duration:1500
								})
							}else{
								uni.showToast({
									title:'提交失败',
									duration:1500,
									icon:'none'
								})
							}
						})
					}
				})
			},
			
			//上传作品
			upLoadVideo(){
				let tiemr = new Date()
				let address = tiemr.getFullYear()+"" + (tiemr.getMonth()+1) + "" + tiemr.getDate();
				address ='video/'+address+'/'
				uni.chooseVideo({
				count: 1,
				sourceType: ['album', 'camera'],
				success:(res)=> {
					let videoSrc = res.tempFilePath
					let str = res.tempFilePath.substr(res.tempFilePath.lastIndexOf('.'))
					let nameStr =address+ tiemr.getTime()+str
					uni.showLoading({
					    title: '上传中'
					})
					uni.uploadFile({
						url: 'https://weapp-xhj.oss-cn-hangzhou.aliyuncs.com',
						filePath: videoSrc,
						fileType: 'video',
						name: 'file',
						formData:{
							name:nameStr,
							'key' : nameStr,
							'policy': 'eyJleHBpcmF0aW9uIjoiMjAyMi0wMS0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==',
							'OSSAccessKeyId': 'LTAIJ9mYIjuW54Cj', 
							'success_action_status' : '200', 
							//让服务端返回200,不然，默认会返回204
							'signature': 'kgQ5n4s0oKpFHp35EI12CuTFvVM=',
						},
						success: (res) => {
							console.log(res)
							uni.hideLoading()
							uni.showToast({
								title: '上传成功',
								icon: 'success',
								duration: 1000
							})
							//只管这个变量
							this.videoSrc = 'https://weapp-xhj.oss-cn-hangzhou.aliyuncs.com/'+nameStr
							console.log(this.videoSrc)
						},
						fail: (err) => {
							console.log('uploadImage fail', err);
							uni.showModal({
								content: err.errMsg,
								showCancel: false
							})
						}
					})
				}, fail: (err) => {
					uni.showToast({
						title:err.errMsg,
						duration:1000,
						icon:'none'
					})
				}
				})
			},
			
			//查看乙方信息
			navToUserInfo(item){
				if(this.userId != this.upUserId){
					return
				}
				uni.navigateTo({
				    url: `/pages/task/choiceUser/choiceUser?id=${item.id}&title=${item.title}`
				})
			},
			
			// 上传照片
			upLoadImg(){
				let tiemr = new Date()
				let address = tiemr.getFullYear() + "" + (tiemr.getMonth() + 1) + "" + tiemr.getDate();
				address = 'image/' + address + '/'
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'],
					sourceType: ['album'],
					success: res => {
						uni.showLoading({
							mask: true,
						})
						var imageSrc = res.tempFilePaths[0]
						let str = res.tempFilePaths[0].substr(res.tempFilePaths[0].lastIndexOf('.'))
						let nameStr = address + tiemr.getTime() + str
						uni.uploadFile({
							url: 'https://weapp-xhj.oss-cn-hangzhou.aliyuncs.com',
							filePath: imageSrc,
							fileType: 'image',
							name: 'file',
							formData: {
								name: nameStr,
								'key': nameStr,
								'policy': 'eyJleHBpcmF0aW9uIjoiMjAyMi0wMS0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==',
								'OSSAccessKeyId': 'LTAIJ9mYIjuW54Cj',
								'success_action_status': '200',
								//让服务端返回200,不然，默认会返回204
								'signature': 'kgQ5n4s0oKpFHp35EI12CuTFvVM=',
							},
							success: (res) => {
								uni.hideLoading()
								uni.showToast({
									title: '上传成功',
									icon: 'success',
									duration: 1000
								})
								this.imgSrc = 'https://weapp-xhj.oss-cn-hangzhou.aliyuncs.com/' + nameStr
							},
							fail: (err) => {
								uni.showToast({
									title: err,
									icon: 'success',
									duration: 1000
								})
							}
						});
					}
				})
			},
			
			//关闭盒子
			colseBox(){
				this.hidden = false
			},
			
			//领取任务
			receiveBtn(){
				if(this.userId == '1234567890' || this.userId == ''){
					uni.switchTab({
						url:'/pages/user/user'
					})
					uni.showToast({
						title:'请登录',
						icon:'none'
					})
				}
				this.hidden = true
			},
			
			//提交信息
			submission(){
				if(this.userText == ''||this.imgSrc == ''||this.telPhone == ''){
					uni.showToast({
						title:'请填写信息',
						duration:1000,
						icon:'none'
					})
					return
				}
				
				let data = {
					imgSrc:this.imgSrc,
					text:this.userText,
					tel:this.telPhone
				}
				
				data = JSON.stringify(data)
				
				let cnt = {
					taskId: this.id, // Long 任务id
					userId: this.userId, // Long 接单用户编号
					taskTitle: this.text, // String 任务标题
					data: data, // String <选填> 推荐信息
				}
				this.$api.createTaskApply(cnt,(res)=>{
					if(res.data.rc == this.$util.RC.SUCCESS){
						console.log(this.$util.tryParseJson(res.data.c))
						uni.switchTab({
							url:'/pages/task/task'
						})
						uni.showToast({
							title:'OK！',
							duration:1000
						})
					}else{
						uni.showToast({
							title:'我觉得不行',
							duration:1000,
							icon:'none'
						})
					}
				})
				
				this.hidden = false
			},
			
			//获取任务下接单列表
			getTaskApplys(){
				let cnt = {
					taskId: this.id, // Long <选填> 任务编号
					// status: status, // Byte <选填> 状态
					// userId: userId, // Long <选填> 接单者编号
					count: 10, // int 
					offset: 0, // int
				}
				this.$api.getTaskApplys(cnt,(res)=>{
					if(res.data.rc == this.$util.RC.SUCCESS){
						let arr = this.$util.tryParseJson(res.data.c)
						console.log(arr)
						console.log('----------------')
						for(let i = 0;i<arr.length;i++){
							let time = new Date(arr[i].createTime)
							let y = time.getFullYear(time)
							let m = time.getMonth(time) + 1
							let d = time.getDate(time)
							arr[i].time = `${y}-${m}-${d}`
							
							arr[i].data = this.$util.tryParseJson(arr[i].data)
							
							if(arr[i].user){
								arr[i].user.ext = this.$util.tryParseJson(arr[i].user.ext)
							} 
						}
						this.comment = arr
						console.log(this.comment)
					}else{
						console.log('获取接单列表失败')
					}
				})
			},
			
			//获取任务信息
			getTask(){
				let cnt = {
					id:this.id
				}
				this.$api.getTask(cnt,(res)=>{
					if(res.data.rc == this.$util.RC.SUCCESS){
						let arr = this.$util.tryParseJson(res.data.c)
						console.log(arr)
						this.taskStatus = arr.status
						this.upUserId = arr.upUserId
						let data = this.$util.tryParseJson(arr.detail)
						this.text = data.text
						
						this.getTemplate(data.templateId)
					}
				})
			},
			
			//获取模板
			getTemplate(id){
				let cnt = {
					id:id
				}
				this.$api.getTemplate(cnt,(res)=>{
					if(res.data.rc == this.$util.RC.SUCCESS){
						let arr = this.$util.tryParseJson(res.data.c)
						console.log(arr)
						this.video = this.$util.tryParseJson(arr.data).src
					}
				})
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
	
	.adminInfo{
		font-size: $list-title;
		color: $list-info-color;
		margin-bottom: $box-margin-top;
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
	
	.noEva{
		padding: 0 $box-margin-left;
		font-size: $list-title;
	}
	/* end */
	
	.bottomBtn{
		position: fixed;
		bottom: 10upx;
		width: 100vw;
		button{
			background: #ec706b;
			color: #fff;
		}
		.button-hover{
			background: #ec706b;
			color: #fff;
		}
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
			width: 5em;
			margin-left: -2.5em;
			font-size: $list-title;
			
		}
		
		textarea{
			height: 200upx;
			font-size: $list-title;
		}
		
		input{
			font-size: $list-title;
		}
	}
	
	.colseBox{
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
	
	.userImg{
		
		image{
			width: 100upx;
			height: 100upx;
		}
		
		video{
			width: 450upx;
			height: 253.128upx;
			margin: 0 auto;
		}
	}
	
	.addImg{
		position: relative;
		width: 100upx;
		height: 100upx;
		// border: 1px solid $list-info-color;
		outline: 1px solid $list-info-color;
		color: $list-info-color;
		text-align: center;
		vertical-align: middle;
		text{
			font-size: 80upx;
			line-height: 100upx;
		}
	}
	
	.upLoadBox{
		padding: $box-margin-top $box-margin-left;
		font-size: $list-title;
	}
	
	.commitBtn{
		position:relative;
		
		button{
			position: absolute;
			width: 5em;
			font-size: $list-title;
			right: 0;
		}
	}
	
	.infoText{
		color: $list-info-color;
		font-size: $list-info;
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
