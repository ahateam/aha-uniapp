<template>
	<view>
		<navBar>
			<view class="title">发帖</view>
			<view slot="right" class="rightBtn">
				<button type="primary" @click="addContent">发表</button>
			</view>
		</navBar>
		<view class="textBox">
			<textarea v-model="text" placeholder="告诉大家你今天的分享…" />
			</view>
		<movable-area class="imgBox">
			<movable-view direction="all" :out-of-bounds="false" v-for="(item,index) in imgList" :key="index" :style="(index+1)%3 == 0?'margin-right:0':''" @change="moveBox">
				<image :src="item" mode="aspectFill"></image>
			</movable-view>
			<view class="addImgBtn" @click="openPopup" v-if="imgList.length < 9">
				<text class="iconfont icon-jia"></text>
			</view>
		</movable-area>
		<view class="functionBox" @click="changeStatus">
			<text class="leftBox">
				<text class="iconfont icon-suo"></text>
				<text>仅校友可见</text>
			</text>
			
			<text class="rightBox">
				{{statusName}}<text class="iconfont icon-xiayibu"></text>
			</text>
		</view>
		
		<uni-popup class="popup-box" :show="showPopup" type="bottom" mask-click @change="change">
			<button class="chose-btn" v-for="(item,index) in choseImg" :key="index" @click="addImgs(item.type)">
				{{item.name}}
			</button>
			<view class="border-box"></view>
			<button class="close-btn" @click="change">取消</button>
		</uni-popup>
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
				text:'',
				imgList:[
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574433704351&di=4cf91a007e1dd0415600b94836e5eba1&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1310%2F07%2Fc61%2F27063604_27063604_1381150720096_mthumb.jpg',
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574433704351&di=4cf91a007e1dd0415600b94836e5eba1&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1310%2F07%2Fc61%2F27063604_27063604_1381150720096_mthumb.jpg',
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574433704351&di=4cf91a007e1dd0415600b94836e5eba1&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1310%2F07%2Fc61%2F27063604_27063604_1381150720096_mthumb.jpg',
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574433704351&di=4cf91a007e1dd0415600b94836e5eba1&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1310%2F07%2Fc61%2F27063604_27063604_1381150720096_mthumb.jpg',
				],
				statusName:'公开',
				showPopup:false,
				
				choseImg:[
					{
						name:'从相册选择',
						type:'album'
					},
					{
						name:'立拍',
						type:'camera'
					}
				]
			}
		},
		methods:{
			moveBox(res){
				console.log(res)
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
				let data = JSON.stringify(this.imgList)
				let cnt = {
					moduleId: this.$constData.module, // String 模块编号
					// ownerId: ownerId, // Long 持有者内容编号
					upUserId: uni.getStorageSync('userId'), // Long 创建者用户编号
					text: this.text, // String <选填> 文本
					data: data, // String <选填> 其他图片视频数据
					// ext: ext, // String <选填> 扩展数据
				}
				if(this.imgList.length == 0){
					cnt.type = this.$constData.groupType[0].key
				}else{
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
			
			//相册添加图片
			addImgs(e){
				let tiemr = new Date()
				let address = tiemr.getFullYear()+"" + (tiemr.getMonth()+1) + "" + tiemr.getDate();
				address ='image/'+address+'/'
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: [e],
					success: (res) => {
						this.showPopup = false
						var imageSrc = res.tempFilePaths[0]
						let str = res.tempFilePaths[0].substr(res.tempFilePaths[0].lastIndexOf('.'))
						let nameStr =address+ tiemr.getTime()+str
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
			
			// 拍照添加图片
			cameraChose(){
				let tiemr = new Date()
				let address = tiemr.getFullYear()+"" + (tiemr.getMonth()+1) + "" + tiemr.getDate();
				address ='image/'+address+'/'
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['camera'],
					success: (res) => {
						var imageSrc = res.tempFilePaths[0]
						let str = res.tempFilePaths[0].substr(res.tempFilePaths[0].lastIndexOf('.'))
						let nameStr =address+ tiemr.getTime()+str
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
			
			// 上传至服务器
			upLoadImg(imageSrc,nameStr){
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
						this.imgList.push('https://weapp-xhj.oss-cn-hangzhou.aliyuncs.com/'+nameStr)
						console.log(this.imgList)
					},fail: (err) => {
						console.log('uploadImage fail', err);
						uni.showModal({
							content: err.errMsg,
							showCancel: false
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
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
		padding: 49rpx 20rpx 0 60rpx;
		font-size: $group-font-befor;
		line-height: $group-font-line;
		color: $group-color-article;
		textarea{
			width: 100%;
			height: 160rpx;
		}
	}
	
	.imgBox{
		width: auto;
		height: auto;
		padding: 23rpx 60rpx 0;
		display: flex;
		flex-wrap: wrap;
		// justify-content: space-between;
		margin-bottom: 170rpx;
		
		movable-view{
			position: relative;
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
	
	.addImgBtn{
		width: 197rpx;
		height: 197rpx;
		border-radius: 4rpx;
		background-color: $group-color-search;
		color: $group-color;
		line-height: 200rpx;
		text-align: center;
		.iconfont{
			font-size: $group-font-big;
		}
	}
	
	.functionBox{
		border: 1rpx solid rgba($color: $group-color-border, $alpha: 0.8);
		border-left: none;
		border-right: none;
		padding: $group-margin-left $group-margin-left;
		font-size: $group-font-befor;
		color: $group-color;
		.iconfont{
			margin-right: $group-margin-top;
			font-size: $group-font-befor;
		}
	}
	
	.rightBox{
		position: absolute;
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
</style>
