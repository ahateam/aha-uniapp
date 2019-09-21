<template>
	<view>
		<video class="video" :src="video" controls></video>

		<view class="teplateInfo">
			<input class="changeBtn nameBox" type="text" v-model="userName" placeholder="请输入你想夸的人的名字" @change="changeName"/>
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
				title:'',//标题
				video:'',//视频地址
				userName:'',//用户想夸的对象名字
				text:'',//
				id:'',//模板id
				type:'',
				moneyList:[
					{
						val:50,
						key:1
					},
					{
						val:100,
						key:1
					},
					{
						val:'商谈',
						key:2
					}
				],//价格列表
				money:50,
				foucs:0,//选中价格下标
			}
		},
		onLoad(res) {
			this.id = res.id
			this.video = res.src
			this.type = res.type
			this.title = res.title
			this.text = res.text
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
				let data = {
					text:this.text,
					templateId:this.id
				}
				// data = JSON.stringify()
				let cnt = {
					module: this.$constData.module, // Long 模块编号
					ask: this.type, // Byte 诉求分类（0求表扬，1求陪玩，2求分享，3求制作）
					type: 1, // Byte 类型（0图文,1视频,2gif表情,3音频,4描述）
					upUserId: uni.getStorageSync('userId'), // Long 创建者
					// tags: tags, // String 标签
					title: this.title, // String 标题
					detail: JSON.stringify(data), // String 需求详细
					deposit: 5, // Double 保证金
					advanceAmount: this.money, // Double 预付款
					// pos: pos, // String <选填> 位置
				}
				this.$store.state.createFoodTask.data = cnt 
				uni.navigateTo({
					url:`/pages/task/payView/payView?type=0`
				})
				// this.$api.createTask(cnt,(res)=>{
				// 	if(res.data.rc == this.$util.RC.SUCCESS){
				// 		uni.switchTab({
				// 		    // url: `/pages/task/payView/payView?type=0`
				// 			url:'/pages/task/task'
				// 		})
				// 		uni.showToast({
				// 			title:'成功',
				// 			duration:1000
				// 		})
				// 	}else{
				// 		uni.showToast({
				// 			title:'我觉得不行',
				// 			duration:1000,
				// 			icon:'none'
				// 		})
				// 	}
				// })
				
				
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
					this.money = -1
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
