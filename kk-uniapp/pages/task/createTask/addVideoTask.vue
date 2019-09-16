<template>
	<view>
		<video class="video" :src="video" controls></video>
		
		<view class="teplateInfo">
			<input class="changeBtn nameBox" type="text" v-model="userName" placeholder="请输入你想夸的人的名字" /><button class="changeBtn" type="primary" @click="changeName">确定</button>
		</view>
		
		<view class="teplateInfo">
			<!-- <textarea type="text" v-model="text" placeholder="请输入台词" /> -->
			<textarea v-model="text" placeholder="请输入台词" />
			<view class="moreBtn">
				<text style="vertical-align: middle;" @click="moreText">更多文字模板</text><text class="moreIcon iconfont kk-jia"></text>
			</view>
		</view>
		
		<view class="moneyBox">
			<text>预算</text>
			
			<text v-for="(item,index) in moneyList" :class="index==foucs?'listFoucs':'moneyList'" :key="index" @click="changeMoney(item,index)">
				{{item.val}}
			</text>
			
			<view class="taskInfo">
				发布任务预交5元定金
			</view>
		</view>
		
		<button class="nextBtn" type="primary" @click="navToNext">发布</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				video:'',//视频地址
				userName:'',//用户想夸的对象名字
				text:'',//
				id:'',//模板id
				moneyList:[
					{
						val:'50',
						key:1
					},
					{
						val:'100',
						key:1
					},
					{
						val:'商谈',
						key:2
					}
				],//价格列表
				money:'',
				foucs:0,//选中价格下标
			}
		},
		onLoad() {
			
		},
		onShow(){
			if(this.$store.state.taskInfo.text){
				console.log(this.$store.state.taskInfo.text)
				this.text = this.$store.state.taskInfo.text
			}
		},
		
		methods:{
			changeName(){
				this.$store.state.taskInfo.name = this.userName
				console.log(this.$store.state.taskInfo.name)
			},
			
			navToNext(){
				uni.redirectTo({
				    url: `/pages/task/payView/payView`
				})
			},
			moreText(){
				uni.navigateTo({
					url:'/pages/task/template/textTemplate'
				})
			},
			changeMoney(item,index){
				this.foucs = index
				if(item.key !=2){
					this.money = item.val
				}else{
					this.money = 0
				}
			},
		}
	}
</script>

<style lang="scss" scoped> 
	.video{
		width: 100vw;
		height: 56.25vw;
	}
	
	.teplateInfo{
		position: relative;
		padding: $box-margin-top $box-margin-left;
		font-size: $list-title;
		textarea{
			width: auto;
		}
	}
	
	.nextBtn{
		position: fixed;
		right: $box-margin-left;
		bottom: $box-margin-top;
		font-size: $list-title;
	}
	
	.moreBtn{
		position: absolute;
		z-index: 5;
		bottom: -$box-margin-top;
		right: $box-margin-left;
		font-size: $list-title;
		color: $list-info-color;
	}
	
	.moreIcon{
		font-size: 18upx;
		vertical-align: middle;
	}
	
	.moneyBox{
		font-size: $list-title;
		padding: $box-margin-top $box-margin-left;
	}
	
	.moneyList{
		margin-left: $box-margin-left;
		color:$list-info-color;
	}
	
	.listFoucs{
		margin-left: $box-margin-left;
		color: #ec706b;
	}
	
	.taskInfo{
		color: $list-info-color;
		margin-top: 1em;
	}
	
	.nameBox{
		width: 70vw;
	}
	
	.changeBtn{
		display: inline-block;
		font-size: $list-title;
		line-height: $list-title-line;
	}
</style>
