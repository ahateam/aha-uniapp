<template>
	<view>
		<video class="videoBox" :src="videoSrc" controls></video>

		<view v-if="status != 3">
			<view class="commentBox">
				<textarea v-model="textarea" placeholder="请输入评论" />
				</view>
		
			<view class="bottomBtnBox">
				<button class="leftBtn" type="primary" @click="editApplyWorks(false)">不满意</button>
				<button class="rightBtn" type="primary" @click="editApplyWorks(true)">满意</button>
			</view>
		</view>
		<view v-else>
			<view class="share">
				<button class="iconBox" @click="downWork">
					<view class="iconfont kk-xiazai icons"></view>
					<view>下载</view>
				</button>
				
				<button class="iconBox" open-type="share">
					<view class="iconfont kk-friendzone icons"></view>
					<view>分享好友</view>
				</button>
				
				<button class="iconBox">
					<view class="iconfont kk-friendzone icons"></view>
					<view>分享朋友圈</view>
				</button>
			</view>
			<view v-if="iCircleStatus">
				<view class="view_box">
					<iCircle
						:percent="percent"
						:size="200"
						:stroke-color="iCircleColor"
						:dashboard="true"
						BgId="BgId1"
						InId="InId1"
					>
						<icon v-if="percent == 100" type="success" size="60" color="#5cb85c" />
						<text v-else :style="'font-size:24px; color:' + iCircleColor">{{ percent }}%</text>
						<view slot="canvas">
							<canvas
								class="CanvasBox strokeCanvas"
								canvas-id="BgId1"
							></canvas>
							<canvas
								class="CanvasBox trailCanvas"
								canvas-id="InId1"
							></canvas>
						</view>
					</iCircle>
				</view>
				<view class="stopBtn">
					<button type="primary" @click="stopDown" v-if="downStatus">放弃下载</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import iCircle from '@/components/xiaoran-circle/xiaoran-circle.vue'
	
	export default {
		components:{
			iCircle
		},
		data() {
			return {
				videoSrc:'',
				id:'',
				status:'',
				textarea:'',
				
				downloadTask:{},
				
				//进度环
				percent:0,
				iCircleColor:'#2db7f5',
				iCircleStatus:false,
				downStatus:true,
				
			};
		},
		onLoad(res) {
			this.id = res.id
			this.getUserWork()
		},
		methods:{
			//放弃下载
			stopDown(){
				this.downloadTask.abort()
				this.percent = 0
			},
			
			//下载作品
			downWork(){
				this.iCircleStatus = true
				this.downloadTask = uni.downloadFile({
				    url: this.videoSrc, //仅为示例，并非真实的资源
				    success: (res) => {
						if(this.percent == 100){
							this.downStatus = false
							console.log(res.tempFilePath)
							uni.saveVideoToPhotosAlbum({
								filePath: res.tempFilePath,
								success: () => {
									uni.showToast({
										title:'下载完成'
									})
								},
								fail: () => {
									uni.showToast({
										title:'未保存'
									})
								}
							})
						}else{
							uni.showToast({
								title:'已放弃下载',
								icon:'none'
							})
						}
				    },
					fail: (err) => {
						uni.showToast({
							title:err,
							icon:'none'
						})
					}
				})
				this.downloadTask.onProgressUpdate((res)=>{
					this.percent = res.progress
					if( res.progress == 100){
						this.iCircleColor = '#5cb85c'
					}
				})
			},
			//获取作品
			getUserWork(){
				let cnt = {
					id: this.id, // Long 订单id
				}
				this.$api.getTaskApply(cnt,(res)=>{
					if(res.data.rc == this.$util.RC.SUCCESS){
						let arr = this.$util.tryParseJson(res.data.c)
						this.videoSrc = arr.taskData
						this.status = arr.status
					}else{
						this.videoSrc = ''
						uni.showToast({
							title:'获取失败',
							duration:1000,
							icon:'none'
						})
					}
				})
			},
			//修改任务状态
			editApplyWorks(e){
				let cnt = {
					id: this.id, // Long 订单id
					res: e, // boolean 是否满意（true：满意，false：不满意）
				}
				console.log(cnt)
				this.$api.editApplyWorks(cnt,(res)=>{
					if(res.data.rc == this.$util.RC.SUCCESS){
						uni.switchTab({
						    url: '/pages/task/task'
						})
						uni.showToast({
							title:'评价成功'
						})
					}else{
						console.log(res.data.c)
						uni.showToast({
							title:res.data.c,
							icon:'none'
						})
					}
				})
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
	
	.share{
		margin: 30upx auto;
		
		button::after {
			border: none;
		}
	}
	
	.iconBox{
		background-color: #FFFFFF;
		padding: 0;
		display: inline-block;
		width: 33.3vw;
		text-align: center;
		font-size:$list-title;
		image{
			width: 14vw;
			height: 14vw;
		}
		
	}
	
	.icons{
		font-size: 14vw;
		line-height: 14vw;
	}
	
	.CanvasBox {
	    width: 100%;
	    height: 100%;
	    position: absolute;
	    top: 0px;
	    left: 0px;
	
	    display: flex;
	    justify-content: center;
	    align-items: center;
	}
	
	.view_box {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.stopBtn{
		width: 100%;
		button {
			font-size: $list-info;
			background-color: #ec706b;
			width: 7em;
			margin: 0 auto;
		}
		
		.button-hover {
			background-color: rgba(236, 112, 107, 0.5);
			color: rgba(255, 255, 255, 0.5)
		}
	}
</style>
