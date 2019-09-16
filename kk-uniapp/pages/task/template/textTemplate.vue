<template>
	<view>
		<view class="listBox" v-for="(item,index) in list" :key="index">
			<view class="textBox">
				{{item.text}}
			</view>
			<button type="primary" class="changeBtn" @click="changeBtn(item)">选择</button>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				list:[
					{
						text:`${this.$store.state.taskInfo.name}你很行`
					}
				],
			}
		},
		methods:{
			changeBtn(item){
				this.$store.state.taskInfo.text = item.text
				uni.navigateBack()
			},
		}
	}
</script>

<style lang="scss" scoped>
	.listBox{
		position: relative;
		padding: $box-margin-top $box-margin-left;
		font-size: $list-title;
		line-height: $list-title-line;
	}
	
	.textBox{
		width: 75vw;
	}
	
	.changeBtn{
		position: absolute;
		right: $box-margin-left;
		top: 50%;
		margin-top: -$list-title-line-half;
		font-size: $list-title;
		line-height: $list-title-line;
	}
</style>
