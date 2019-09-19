<template>
	<view>
		<image class="topImg" :src="imgSrc" mode="aspectFill"></image>
		<view class="titleBox">
			陪吃任务
			<view class="infoBox">
				{{text}}
			</view>
		</view>
		<view class="bottomBtn">
			<button type="primary" @click="navToNext">下一步</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgSrc: '',
				id:'',
				type:'',
				text:'',
			}
		},
		onLoad(res) {
			this.id = res.id
			this.getTemplate()
		},
		methods: {
			//获取模板
			getTemplate(){
				let cnt = {
					id:this.id
				}
				this.$api.getTemplate(cnt,(res)=>{
					if(res.data.rc == this.$util.RC.SUCCESS){
						let arr = this.$util.tryParseJson(res.data.c)
						this.title = arr.name
						this.imgSrc = this.$util.tryParseJson(arr.data).src
						this.type = arr.type
						this.text = arr.text
					}
				})
			},
			
			//下一步
			navToNext(){
				uni.redirectTo({
					url: `/pages/task/createTask/addFoodTask?type=${this.type}`
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.topImg {
		width: 100vw;
		height: 56.25vw;
	}
	
	.titleBox{
		padding: $box-margin-top $box-margin-left;
		font-size: $list-title;
		font-weight: bold;
	}
	
	.infoBox{
		padding: $box-margin-top $box-margin-left;
		font-size: $list-title;
		font-weight: normal;
	}
	
	.bottomBtn{
		position:fixed;
		height: 2em;
		bottom:$box-margin-top;
		width:100vw;
		
		button{
			display: inline-block;
			position: absolute;
			right: $box-margin-left;
			font-size: $list-title;
		}
	}
</style>
