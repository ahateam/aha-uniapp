<template>
	<view class="body">
		<text class="leftTitle">标题：</text>
		<input class="leftTitle" type="text" placeholder="加个标题会有更多赞哦~" v-model="title" style="display: inline-block;" />
		<view v-if="videoUrl == ''">
			<view class="videoBox" @click="addVideo()">
				+
			</view>
			<view class="addBtnText">点击上传视频</view>
		</view>
		<view v-else>
			<video :src="src" class="previewBox"></video>
		</view>

		<view style="margin-top: 20upx;">
			<text class="leftTitle" style="vertical-align: top;">简介：</text> <textarea class="textInput" type="text" placeholder="加一个视频的简介吧~"
			 v-model="text" maxlength='60' />
			</view>
			
		<view v-if="imgSrc == ''">
			<view class="videoBox" @click="addImg()">+</view>
			<view class="addBtnText">点击上传封面</view>
		</view>
		<view v-else>
				<image :src="imgSrc" mode="widthFix" class="previewBox"></image>
		</view>
			
		<view class="addBtnBotton">
			<button type="primary" @click="addvideoBtn">发布视频</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoUrl:'',
				imgSrc:'',
				title:'',
				text:'',
				userId:'',
			};
		},
		onLoad() {
			this.userId = 0 + uni.getStorageSync('userId')
		},
		methods:{
			// 本地视频添加至oss服务器
			addVideo() {
				let _this = this
				let tiemr = new Date()
				let address = tiemr.getFullYear()+"" + (tiemr.getMonth()+1) + "" + tiemr.getDate();
				address ='video/'+address+'/'
				uni.chooseVideo({
			    count: 1,
			    sourceType: ['album', 'camera'],
			    success: function (res) {
					var videoSrc = res.tempFilePath
					let str = res.tempFilePath.substr(res.tempFilePath.lastIndexOf('.'))
					let nameStr =address+ tiemr.getTime()+str
					uni.showLoading({
					    title: '上传中'
					});
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
							_this.videoUrl = 'https://weapp-xhj.oss-cn-hangzhou.aliyuncs.com/'+nameStr
							console.log(_this.videoUrl)
						},
						fail: (err) => {
							console.log('uploadImage fail', err);
							uni.showModal({
								content: err.errMsg,
								showCancel: false
							});
						}
					});
			    }, fail() {
					console.log('失败')
				}
				});
			},
			
			addImg(){
				let _this = this
				let tiemr = new Date()
				let address = tiemr.getFullYear()+"" + (tiemr.getMonth()+1) + "" + tiemr.getDate();
				address ='image/'+address+'/'
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success: (res) => {
						var imageSrc = res.tempFilePaths[0]
						let str = res.tempFilePaths[0].substr(res.tempFilePaths[0].lastIndexOf('.'))
						let nameStr =address+ tiemr.getTime()+str
						// nameStr =  res.tempFilePaths[0]
						console.log(nameStr)
						uni.showLoading({
						    title: '上传中'
						});
						uni.uploadFile({
							url: 'https://weapp-xhj.oss-cn-hangzhou.aliyuncs.com',
							filePath: imageSrc,
							fileType: 'image',
							name: 'file',
							formData:{
								name:nameStr,
								'key' : nameStr,
								'policy': 'eyJleHBpcmF0aW9uIjoiMjAyMi0wMS0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==',
								'OSSAccessKeyId': 'LTAIJ9mYIjuW54Cj', 
								'success_action_status' : '200', 
								//让服务端返回200,不然，默认会返回204
								'signature': 'kgQ5n4s0oKpFHp35EI12CuTFvVM=',
						},success: (res) => {
							console.log(res)
							uni.hideLoading()
							uni.showToast({
								title: '上传成功',
								icon: 'success',
								duration: 1000
							})
							//只管这个变量
							_this.imgSrc = 'https://weapp-xhj.oss-cn-hangzhou.aliyuncs.com/'+nameStr
							console.log(_this.imgSrc)
						},fail: (err) => {
							console.log('uploadImage fail', err);
							uni.showModal({
								content: err.errMsg,
								showCancel: false
							});
						}
					});
					},fail: (err) => {
					console.log('chooseImage fail', err)
					}
				})
			},
			
			//判断内容是否完整
			addvideoBtn(){
				if(this.title==''){
					uni.showToast({
						title: '请好好写标题呢',
						duration: 1000,
						icon:'none'
					});
				}else if(this.src == ''){
					uni.showToast({
						title: '请上传一个视频',
						duration: 1000,
						icon:'none'
					});
				}else if(this.imgSrc==''){
					uni.showToast({
						title: '请上传封面图',
						duration: 1000,
						icon:'none'
					});
				}else {
					uni.showLoading({
					    title: '上传中~'
					});
					this.addVideoContent()
				}
			},
			// 上传视频至后端
			addVideoContent(){
				
				let dataUrl = {
					url:this.videoUrl,
					text:this.text,
					imgSrc:this.imgSrc,
					show:0,
				}
				let cnt ={
					userId:this.userId,
					module:[this.$constData.module],
					type:parseInt(this.$constData.contentType[1].key),
					status:parseInt(this.$constData.contentStatus[1].key),
					// upChannelId:2345678910,
					title:this.title,
					data:dataUrl,
					paid:0,
				}
				this.$api.addContent(cnt,(res)=>{
					if (res.data.rc == this.$util.RC.SUCCESS){
						uni.hideLoading()
						uni.showToast({
						    title: '上传成功',
						    duration: 1500
						});
						uni.reLaunch({
						url: '/pages/index/index'
						});
					 }else{
						console.log('失敗')
					 }
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.body{
		padding:$box-margin-top $box-margin-left;
		font-size: $list-title;
	}
	
	.videoBox{
		text-align: center;
		font-size: 50px;
		color: $list-info-color;
		line-height: 70px;
		border: 1px solid $list-info-color;
		border-radius: 5px;
		width: 70px;
		height: 70px;
		margin-top: 15px;
		margin-bottom: 15px;
	}
	
	.leftTitle{
		vertical-align: middle;
		
	}
	
	.textInput{
		display: inline-block;
		vertical-align: top;
		width: 60vw;
		height: 4em;
	}
	
	.addBtnText{
		padding: 0 20upx 20upx 20upx;
		font-size: $list-info;
		color: $list-info-color;
	}
	
	.previewBox{
		width: 50vw;
		height: 50vw;
	}
	
	.addBtnBotton{
		position: fixed;
		bottom: 10px;
		width: 80vw;
		left: 50%;
		margin-left: -40vw;
		z-index: 2;
		font-size: $list-title-l;
		font-weight: bold;
		
		button{
			background-color: #ec706b;
		}
		
		.button-hover {
			background-color: rgba(236, 112, 107, 0.5);
			color: rgba(255, 255, 255, 0.5)
		}
	}
</style>
