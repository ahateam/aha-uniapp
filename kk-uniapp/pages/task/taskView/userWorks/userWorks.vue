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
				<button class="iconBox">
					<image src="/static/image/" mode="widthFix"></image>
					<view>下载</view>
				</button>
				
				<button class="iconBox" open-type="share">
					<image src="/static/image/wexin.png" mode="widthFix"></image>
					<view>分享好友</view>
				</button>
				
				<button class="iconBox">
					<image src="/static/image/wxpy.png" style="width: 12vw;" mode="widthFix"></image>
					<view>分享朋友圈</view>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoSrc:'',
				id:'',
				status:'',
				textarea:'',
			};
		},
		onLoad(res) {
			this.id = res.id
			this.getUserWork()
		},
		methods:{
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
			editApplyWorks(e){
				let cnt = {
					id: this.id, // Long 订单id
					res: e, // boolean 是否满意（true：满意，false：不满意）
				}
				this.$api.editApplyWorks(cnt,(res)=>{
					if(res.data.rc == this.$util.RC.SUCCESS){
						uni.switchTab({
						    url: '/pages/task/task'
						})
						uni.showToast({
							title:'评价成功',
							duration:1000
						})
					}else{
						uni.showToast({
							title:'失败！',
							duration:1000,
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
</style>
