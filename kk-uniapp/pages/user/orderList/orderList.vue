<template>
	<view>
		<view style="position: relative;" v-for="(item,index) in orderList" :key="index">
			<list-box :title="item.goodsName" :text="item.time" :name="item.userName" ></list-box>
			<view class="priceBox">{{item.totalFee}}￥</view>
		</view>
	</view>
</template>

<script>
	import listBox from '@/components/task/taskListBox.vue'
	export default {
		components:{
			listBox,
		},
		data() {
			return {
				orderList:[],
			}
		},
		onLoad() {
			let cnt = {
				openId: uni.getStorageSync('openId'), // Long 用户openid
				count: 20, // int 
				offset: 0, // int 
			}
			this.getPayOrderByUserId(cnt)
		},
		methods: {
			getPayOrderByUserId(cnt) {
				this.$api.getPayOrderByUserId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let orderList = this.$util.tryParseJson(res.data.c)
						for(let i=0;i < orderList.length;i++){
							let time = new Date(orderList[i].createTime)
							let y = time.getFullYear()
							let m = 1 * time.getMonth() + 1
							let d = time.getDate()
							orderList[i].time = `${y}-${m}-${d}`
						}
						this.orderList = orderList
						console.log(this.orderList)
					} else {
						uni.showToast({
							title:'服务器错误',
							icon:'none'
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.priceBox{
		position: absolute;
		font-size: $list-info;
		color: $list-info-color;
		right: $box-margin-left;
		top: $box-margin-top;
	}
</style>
