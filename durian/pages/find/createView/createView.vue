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
		<view class="imgBox">
			<image :src="item" mode="aspectFill" v-for="(item,index) in imgList" :key="index" v-if="index < 3" :style="index == 2?'margin-right:0':''"></image>
			<view class="addImgBtn" @click="addImgs" v-if="imgList.length < 3">
				<text class="iconfont icon-jia"></text>
			</view>
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
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'

	export default {
		components: {
			navBar,

		},
		data() {
			return {
				text:'',
				imgList:[],
				statusName:'公开'
			}
		},
		methods:{
			changeStatus(){
				if(this.statusName == '公开'){
					this.statusName = '仅校友可见'
				}else{
					this.statusName = '公开'
				}
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
							url:'/pages/group/group'
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
			
			//添加图片
			addImgs(){
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
					},fail: (err) => {
					uni.showToast({
						title:'已取消',
						icon:'none'
					})
					}
				})
			},
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
			font-size: $group-font-befor;
			line-height: $group-font-befor-line;
			padding: 4rpx 20rpx;
			color: $group-color-w;
			background-color: $group-color-curr;
			border-radius: 4rpx;
			vertical-align: middle;
			&:after{
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
		padding: 23rpx 60rpx 0;
		display: flex;
		flex-direction: row;
		// justify-content: space-between;
		margin-bottom: 170rpx;
		
		image{
			width: 200rpx;
			height: 200rpx;
			margin-right: $group-margin-befor;
			border-radius: 4rpx;
		}
	}
	
	.addImgBtn{
		width: 200rpx;
		height: 200rpx;
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
</style>
