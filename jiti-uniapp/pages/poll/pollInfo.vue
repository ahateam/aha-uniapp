<template>
	<view>
		<view class="title">1.投票标题</view>
		<view class="vote-item">
			<view class="max_text">最多可以选投: 3个选项</view>
			<view class="vote-item-status">
				<text style="color:#40c9c6">表决未完成</text>
				<!-- <span v-if=false style="color: #909399">表决失效</text>
				<text v-if=false style="color: #67C23A">表决成功</text>
				<text v-if=false style="color: #F56C6C">表决失败</text> -->
			</view>
		</view>
		<view class="vote_text">应到总人数：82 人，已参投有效人数：0 人，已投票数：0票，其中弃权人数：0 人，未参投人数：82 人</view>
		<view class="vote_content">
			<text>投票内容。。。。。松林镇松林村股份经济合作社章程（草案） 第一章 总则 第一条 为规范本社股份经济合作社(以下简称合作社)的行为，保障合作社及其股东的合法权益，根据《农业农居部 中国人民银行国家 市场监督管理总局关于开展农居集体经济组织登记赋码工作的通知（农经发〔2018〕4号）》和有关法律法规</text>
		</view>
		<view class="vote_option">
			<view class="vote_option_text">选项1</view>
			<view class="vote_option_text">选项2</view>
			<view class="vote_option_text">选项2</view>
			<view class="vote_option_text">选项2</view>
			<view class="vote_option_text">选项3</view>
		</view>
		<view class="vote_btn">
			<view class="vote_btn_sub">
				<button type="primary">提交投票</button>
			</view>
			<view class="vote_btn_res">
				<button type="default">报告单</button>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style scoped lang="scss">
	.title{
		width: 98%;
		border-bottom: 2rpx solid #F5F5F5;
		margin: 10rpx auto;
	}
	.vote-item{
		width: 98%;
		height: 40rpx;
		margin: 10rpx auto;
		font-size: 24rpx;
		color: #666;
		display: flex;
		justify-content: space-between;
	}
	.max_text{
		width: 300rpx;
		height: 40rpx;
	}
	.vote_text{
		width: 98%;
		margin: 40rpx auto;
		background-color: #fff7cc;
		border: 2rpx solid ##fceea0;
		border-radius: 5%;
		color: #f56723;
		font-size: 28rpx;
	}
	.vote_content{
		width: 98%;
		margin: 0 auto;
		font-size: 32rpx;
	}
	.vote_option{
		width: 80%;
		margin: 40rpx auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
	}
	.vote_option view{
		width: 140rpx;
		height: 88rpx;
		border: 2rpx solid #44bb00;
		color: #44bb00;
		font-size: 32rpx;
		text-align: center;
		line-height: 88rpx;
		margin: 10rpx;
	}
	.vote_btn{
		width: 80%;
		margin: 40rpx auto;
		
	}
	.vote_btn view{
		margin-bottom: 40rpx;
	}
	
</style>
