<template>
	<view class="box">
		<view class="content-box">
			<view class="title-box">
				<span>请输入您的意见或建议</span>
			</view>
		</view>
		<view class="content-box">
			<textarea placeholder-style="color:#F76260" placeholder="请输入您宝贵的意见或建议,我们会及时联系并回复您" class="text" v-model="feedbackContent" />
			
			<input class="uni-input text"  placeholder="您的联系手机号" v-model="phone" />
			
			<button type="primary" @click="createBtn" class="text"> 提交</button>
						<button type="default" @click="toHome" class="text"> 返回首页</button>
		</view>
	
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				feedbackContent:'',
				phone:'',
				
			}
		},
		methods: {
			createBtn(){
				if(this.phone && this.feedbackContent){
					let cnt ={
						userId:  JSON.parse(uni.getStorageSync('userInfo')).id,
						feedbackContent: this.feedbackContent,
						phone: this.phone, 
					}
					this.$api.createFeedback(cnt,(res)=>{
						if(res.data.rc == this.$util.RC.SUCCESS){
							uni.showToast({
								icon:'success',
							    title: '提交成功',
							    duration: 2000
							});
						}else{
							uni.showToast({
								icon:'none',
							    title: '提交失败',
							    duration: 2000
							});
						}
						setTimeout(()=>{
							uni.navigateBack()
						},1500)
					})
				}else{
					uni.showToast({
						icon:'none',
					    title: '请将信息填写完整',
					    duration: 1000
					});
				}
			},
			toHome(){
				uni.switchTab({
				    url: '/pages/index/index'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.fb_input{
		width: 200rpx;
	}
	.box{
		width: 100%;
		height: 500rpx;
	}
	.content-box {
		width: 94%;
		margin: 0 auto;
	}
	.title-box {
		margin-top: 20rpx;
		width: auto;
		height: 50rpx;
		color: #fff;
		font-size: 32rpx;
		line-height: 50rpx;
		background: $jiti-color-blue;
		padding: 20rpx;
		text-align: center;
	}
	
	.text{
		margin-top: 30rpx;
	}
</style>
