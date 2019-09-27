<template>
	<view class="body">
		<view class="taskBox" v-for="(item,index) in list" :key="index">
			<view @click="navToCreate(item.type)">
				<view :class="'iconfont '+item.iconClass" style="font-size: 30vw;"></view>
				<view>{{item.name}}</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						name: '求表扬',
						iconClass: 'kk-kuazan',
						type: this.$constData.taskType[0].key
					},
					{
						name: '求陪玩',
						iconClass: 'kk-wan',
						type: this.$constData.taskType[1].key
					},
					{
						name: '分享',
						iconClass: 'kk-fenxiang',
						type: this.$constData.taskType[2].key
					},
					{
						name: '制作',
						iconClass: 'kk-zhizuo',
						type: this.$constData.taskType[3].key
					}
				]
			};
		},
		methods: {
			//跳转至对应模板页
			navToCreate(e){
				uni.redirectTo({
					url:`/pages/task/template/template?type=${e}`
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.body{
		
	}
	
	.taskBox {
		display: inline-block;
		width: 40vw;
		margin: 3vw;
		padding: 2vw;
		background-image: linear-gradient( 135deg, #5EFCE8 10%, #736EFE 100%);
		color: #FFECEC;
		font-size: 40upx;
		text-align: center;
		font-weight: bold;
		border-radius: 10%;

		image {
			width: 30vw;
			height: 30vw;
		}
	}
</style>
