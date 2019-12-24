<template>
	<view>
		<navBar :back="false">
			<image slot="left" class="back-icon" @click="navBack" src="/static/image/icon/icon_fh.png" mode="aspectFit"></image>
			<view class="title">发帖</view>
			<view slot="right" class="rightBtn">
				<button type="primary" @click="addContent">发表</button>
			</view>
		</navBar>

		<!-- 解决iphone手机添加图片显示问题 -->
		<view class="hidden-box">{{imgList[imgList.length-1]}}</view>
		<!-- end -->

		<movable-area class="imgBox">
			<view class="textBox">
				<textarea v-model="text" placeholder="告诉大家你今天的分享…" />
				</view>
				
			<movable-view class="video-box" direction="all" out-of-bounds @change="moveBox" @touchend="reSet" v-if="videoSrc">
				<video :src="videoSrc" controls></video>
			</movable-view>
			
			<movable-view 
			class="movable-view"
			:class="item == ''?'hidden-box':'pt-view'"
			:style="isLeftImg(index)?'margin-left:60rpx':''"
			:data-index="index" 
			direction="all" 
			out-of-bounds
			v-for="(item,index) in imgList" 
			:key="index"
			@change="moveBox" 
			@touchend="reSet" 
			>
				<image class="img-list" :src="constData.oss + item" mode="aspectFill" :style="index == currIndex&&delImg?'opacity: 0.5':''"></image>
			</movable-view>
			
			<view class="addImgBtn" :style="isLeftBtn()?'margin-left:60rpx':''" @click="openPopup" v-if="imgList.length < 9&&videoSrc == ''">
				<text class="iconfont icon-jia"></text>
			</view>
			
			<view class="functionBox" @click="changeStatus">
				<text class="leftBox">
					<text class="iconfont icon-suo"></text>
					<text>仅校友可见</text>
				</text>
				
				<text class="rightBox">
					{{statusName}}<text class="iconfont icon-xiayibu"></text>
				</text>
			</view>
		</movable-area>
		<uni-popup class="popup-box" :show="showPopup" type="bottom" mask-click @change="change">
			<button class="chose-btn" v-for="(item,index) in choseImg" :key="index" @click="addImgs(item.type)">
				{{item.name}}
			</button>
			<view class="border-box"></view>
			<button class="close-btn" @click="change">取消</button>
		</uni-popup>
		
		<view class="del-img-tip" v-if="delImgHover">
			<image src="/static/image/icon/icon_del.png" mode="aspectFit"></image>
			<view>拖到此处删除</view>
		</view>
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'


	export default {
		components: {
			navBar,
			uniPopup
		},
		data() {
			return {
				constData: this.$constData,
				userInfo: this.$util.tryParseJson(uni.getStorageSync('userInfo')),
				
				text:'',
				imgList:[],
				
				videoSrc:'',
				statusName:'公开',
				showPopup:false,
				statusIndex:0,
				
				choseImg:[
					{
						name:'从相册选择',
						type:'album'
					},
					{
						name:'立拍',
						type:'camera'
					}
				],
				
				delImg:false,
				delImgHover:false,
				
				currIndex:-1,
			}
		},
		methods:{
			isLeftBtn(){
				let length = this.imgList.length
				let imgSrc = this.imgList[length - 1]
				if(length == 0|| length == 3 && imgSrc!= ''||length == 6 && imgSrc != ''){
					return true
				}else if(length == 4 && imgSrc == ''||length == 6 && imgSrc == ''){
					return true
				}else{
					return false
				}
			},
			
			moveBox(res){
				this.currIndex = res.currentTarget.dataset.index
				this.delImgHover = true
				if( res.detail.source == 'touch-out-of-bounds'){
					this.delImg = true
				}else if(res.detail.source == 'touch'){
					this.delImg = false
				}
			},
			
			isLeftImg(index){
				if(index == 0 || index == 3||index == 6){
					return true
				}else{
					return false
				}
			},
			
			addImg(){
				this.imgList.splice(this.imgList.length , 0,this.imgList[0])
				this.reSet()
			},
			
			reSet(e){
				if(this.imgList.length > 0){
					setTimeout(()=>{
						this.imgList.splice(this.imgList.length ,0,'')
						setTimeout(()=> {
							if(this.delImg){
								let index = e.currentTarget.dataset.index
								this.delImg = false
								this.imgList.splice(index,1)
								uni.showToast({
									title:'已删除',
									icon:'none'
								})
							}
							if(this.imgList[this.imgList.length - 1] == ''){
								this.imgList.splice(this.imgList.length - 1 , 1)
							}
							this.delImgHover = false
							console.log(this.imgList)
						}, 50)
					},50)
				}else{
					
					setTimeout(()=>{
						this.imgList.splice(this.imgList.length ,0,'')
						setTimeout(()=> {
							if(this.delImg){
								this.videoSrc = ''
								uni.showToast({
									title:'已删除',
									icon:'none'
								})
							}
							if(this.imgList[this.imgList.length - 1] == ''){
								this.imgList.splice(this.imgList.length - 1 , 1)
							}
							this.delImgHover = false
							console.log(this.imgList)
						}, 50)
					},50)
				}
			},
			
			//弹出层显示
			change(e){
				if (!e.show) {
					this.showPopup = false
				}
			},
			
			// 打开弹出层
			openPopup(){
				this.showPopup = true
			},
			
			changeStatus(){
				uni.navigateTo({
					url:`./canSee`
				})
			},
			
			addContent(){
				
				let cnt = {
					moduleId: this.$constData.module, // String 模块编号
					// ownerId: ownerId, // Long 持有者内容编号
					show: this.statusIndex, // Byte <选填> 校内外可见
					upUserId: this.userInfo.userId, // Long 创建者用户编号
					text: this.text, // String <选填> 文本
					// data: data, // String <选填> 其他图片视频数据
					// ext: ext, // String <选填> 扩展数据
				}
				if(this.videoSrc){
					let data = this
					cnt.data = data
					cnt.type = this.$constData.groupType[2].key
				}
				else if(this.imgList.length == 0){
					cnt.type = this.$constData.groupType[0].key
				}else{
					let data = JSON.stringify(this.imgList)
					cnt.data = data
					cnt.type = this.$constData.groupType[1].key
				}
				this.$api.createPosting(cnt,(res)=>{
					if(res.data.rc == this.$util.RC.SUCCESS){
						uni.switchTab({
							url:'/pages/find/find'
						})
						uni.showToast({
							title:'发表成功'
						})
					}else{
						uni.showToast({
							title:'服务器错误！',
							icon:'none'
						})
					}
				})
			},
			
			choiceSucc(e){
				let userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'))
				let tiemr = new Date()
				let address = tiemr.getFullYear() + '' + (tiemr.getMonth() + 1) + '' + tiemr.getDate() + '/';
				let str = e.substr(e.lastIndexOf('.'))
				let nameStr = userInfo.userId + '/' + address + tiemr.getTime() + str
				
				let imgType = ["gif", "jpeg", "jpg", "bmp", "png"];
				let videoType = ["avi","wmv","mkv","mp4","mov","rm","3gp","flv","mpg","rmvb"];
				if(RegExp("\.(" + imgType.join("|") + ")$", "i").test(str.toLowerCase())) {
					uni.showLoading({
						title: '上传中'
					})
					this.upLoadImg(e,nameStr)
				} else if(RegExp("\.(" + videoType.join("|") + ")$", "i").test(str.toLowerCase())) {
					uni.showLoading({
						title: '上传中'
					})
					this.uploadVideo(e,nameStr)
				} else {
					uni.showToast({
						title:'请选择媒体文件',
						icon:'none'
					})
				}
			},
			
			choiceErr(e){
				console.log('失败')
				console.log(e)
				
			},
			
			//相册添加图片
			addImgs(e){
				plus.io.requestFileSystem(plus.io.PRIVATE_WWW,function(e){
					console.log(e)
				},function(e){
					console.log(e)
				})
				// this.showPopup = false
				// if(e == 'album'){
				// 	let type = ''
				// 	if(this.imgList.length > 0){
				// 		 type = 'image'
				// 	}else{
				// 		type = 'none'
				// 	}
				// 	plus.gallery.pick(this.choiceSucc, this.choiceErr,{filter: type});
				// }else{
				// 	let camera = plus.camera.getCamera();
				// 	camera.captureImage(this.choiceSucc,this.choiceErr)
				// }
			},
			
			// 拍照添加图片
			cameraChose(){
				let userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'))
				let tiemr = new Date()
				let address = tiemr.getFullYear() + '' + (tiemr.getMonth() + 1) + '' + tiemr.getDate() + '/';
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['camera'],
					success: (res) => {
						this.showPopup = false
						let imageSrc = res.tempFilePaths[0]
						let str = res.tempFilePaths[0].substr(res.tempFilePaths[0].lastIndexOf('.'))
						let nameStr = userInfo.userId + '/' + address + tiemr.getTime() + str
						// nameStr =  res.tempFilePaths[0]
						console.log(nameStr)
						uni.showLoading({
						    title: '上传中'
						})
						this.upLoadImg(imageSrc,nameStr)
					},fail: (err) => {
					uni.showToast({
						title:'已取消',
						icon:'none'
					})
					}
				})
			},
			
			uploadVideo(videoSrc,nameStr){
				uni.uploadFile({
					url: this.$constData.oss,
					filePath: videoSrc,
					fileType: 'video',
					name: 'file',
					formData:{
							name: nameStr,
							'key': nameStr,
							'policy': 'eyJleHBpcmF0aW9uIjoiMjAyMC0wMS0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==',
							'OSSAccessKeyId': 'LTAI4FqngBZhahjCXBPUDwSu',
							'success_action_status': '200',
							//让服务端返回200,不然，默认会返回204
							'signature': '5n38HJgZyzC55khl0sPEf2oATtQ=',
					},success: (res) =>{
						console.log(res)
						uni.hideLoading()
						uni.showToast({
							title: '上传成功',
							icon: 'none'
						})
						//只管这个变量
						this.videoSrc = this.$constData.oss + nameStr
						console.log(this.videoSrc)
					}
				})
			},
			
			// 上传至服务器
			upLoadImg(imageSrc,nameStr){
				uni.uploadFile({
						url: this.$constData.oss,
						filePath: imageSrc,
						fileType: 'image',
						name: 'file',
						formData:{
							name: nameStr,
							'key': nameStr,
							'policy': 'eyJleHBpcmF0aW9uIjoiMjAyMC0wMS0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==',
							'OSSAccessKeyId': 'LTAI4FqngBZhahjCXBPUDwSu',
							'success_action_status': '200',
							//让服务端返回200,不然，默认会返回204
							'signature': '5n38HJgZyzC55khl0sPEf2oATtQ=',
					},success: (res) => {
						console.log(res)
						uni.hideLoading()
						uni.showToast({
							title: '上传成功',
							icon: 'none'
						})
						//只管这个变量
						this.imgList.push(nameStr)
						console.log(this.imgList)
					},fail: (err) => {
						console.log('uploadImage fail', err);
						uni.showToast({
							title: '上传失敗',
							icon: 'none'
						})
					}
				})
			},
			
			navBack() {
				uni.navigateBack()
			},
		},
		
		onLoad() {
			uni.setStorageSync('createStatus',0)
		},
		
		onShow() {
			setTimeout(()=>{
				let status = uni.getStorageSync('createStatus')
				this.statusIndex = status
				this.statusName = this.$constData.postingStatus[status].val
			},300)
		}
	}
</script>

<style lang="scss" scoped>
	.back-icon {
		width: 33rpx;
		height: 33rpx;
		position: absolute;
		left: 29rpx;
	}
	
	.title{
		font-size: 36rpx;
		line-height: 50rpx;
		color: $group-color-article;
		font-weight: normal;
		vertical-align: middle;
	}
	
	.rightBtn {
		margin-right: 25rpx;
		button{
			line-height: 60rpx;
			font-size: $group-font-befor;
			color: $group-color-w;
			border-radius: 4rpx;
			background-color: #24D4D0;
			padding: 0 20rpx;
			
			&:after {
				border: none;
			}
		}
	}
	
	.textBox{
		width: 100%;
		height: 232rpx;
		font-size: $group-font-befor;
		line-height: $group-font-line;
		color: $group-color-article;
		textarea{
			width: 100%;
			height: 160rpx;
			box-sizing: border-box;
			padding: 49rpx 20rpx 0 60rpx;
		}
	}
	
	.imgBox{
		width: auto;
		height: auto;
		min-height: calc(100vh - 140rpx - 64px);
		// padding: 0 60rpx;
		// display: flex;
		// flex-wrap: wrap;
		// align-items: flex-start;
		// justify-content: space-between;
		
		.movable-view{
			// position: relative;
			display: inline-block;
			width: 197rpx;
			height: 197rpx;
			margin-right: $group-margin-befor;
			margin-bottom: $group-margin-befor;
		}
		
		image{
			width: 197rpx;
			height: 197rpx;
			border-radius: 4rpx;
		}
	}
	
	.video-box{
		position: relative;
		width: 650rpx;
		height: 365.6rpx;
		margin-left:50rpx;
		
		video{
			width: 100%;
			height: 100%;
		}
	}
	
	.pt-view{
		position: relative;
		z-index: 2;
	}
	
	.addImgBtn{
		display: inline-block;
		width: 197rpx;
		height: 197rpx;
		border-radius: 4rpx;
		background-color: $group-color-search;
		color: $group-color;
		line-height: 200rpx;
		text-align: center;
		vertical-align: top;
		
		.iconfont{
			font-size: $group-font-big;
		}
	}
	
	.functionBox{
		width: 100vw;
		height: 120rpx;
		margin-top: 30rpx;
		border: 1rpx solid rgba($color: $group-color-border, $alpha: 0.8);
		border-left: none;
		border-right: none;
		padding: $group-margin-left $group-margin-left;
		font-size: $group-font-befor;
		color: $group-color;
		box-sizing: border-box;
		
		.iconfont{
			margin-right: $group-margin-top;
			font-size: $group-font-befor;
		}
	}
	
	.rightBox{
		position: absolute;
		z-index: 0;
		right: 0;
		color: $group-color-befor;
	}
	
	.popup-box{
		button{
			line-height: 120rpx;
			font-size: 36rpx;
			background-color: #FFFFFF;
			border-radius: 0;
			&:after{
				border: none;
			}
		}
		
		.button-hover{
			filter:brightness(90%);
		}
	}
	
	.chose-btn{
		color: #333333;
		border-bottom: 1rpx solid $group-color-border;
	}
	
	.border-box{
		border-top: 18rpx solid $group-color-search;
	}
	
	.close-btn{
		color: #999999;
	}
	
	.img-list{
		transition: all .3s;
	}
	
	.hidden-box{
		position: fixed;
		top: -100vh;
	}
	
	.del-img-tip{
		position: fixed;
		display: flex;
		z-index: 3;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		bottom: 0;
		width: 100%;
		height: 140rpx;
		background-color: rgba($color: #EE455A, $alpha: .9);
		color: $group-color-w;
		font-size: $group-font-befor;
		
		image{
			width: 40rpx;
			height: 40rpx;
			margin-bottom: 14rpx;
		}
	}
</style>
