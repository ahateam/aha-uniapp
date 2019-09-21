<template>
	<view>
		<view class="showMoney">
			<view v-if="type == 0">￥{{money}}元</view>
			<view v-else-if="type == 1">
				<input type="number" v-model="money" placeholder="请输入支付金额" />
			</view>
		</view>
		<view class="bottonBox">
			<button class="payBtn" type="primary" @click="payMoney">支付</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money: '5',
				id: '',
				taskId: '',
				type: 0,//0为平台预付款 1为任务全款预付款
			}
		},
		onLoad(options) {
			this.id = options.id
			this.taskId = options.taskId
			this.type = options.type
			if (this.type == 1) {
				this.money = ''
			}
		},
		methods: {
			//支付平台信誉定金
			payEarnestMoney(){
				let cnt = this.$store.state.createFoodTask.data
				this.$api.createTask(cnt,(res)=>{
					if(res.data.rc == this.$util.RC.SUCCESS){
						this.$store.state.createFoodTask.data = ''
						uni.switchTab({
							url: '/pages/task/task'
						})
						uni.showToast({
							title: '支付成功',
							duration: 1000
						})
					}else{
						uni.showToast({
							title: '不太行',
							duration: 1000,
							icon:'none'
						})
					}
				})
			},
			
			payMoney() {
				if(this.type == 0){
					this.payEarnestMoney()
					return
				}
				let cnt = {
					id: this.id, // Long 订单id
					taskId: this.taskId, // Long 任务id
				}
				this.$api.TaskApplyConfirm(cnt,(res)=>{//全额定金支付,双方第一次握手
					if(res.data.rc == this.$util.RC.SUCCESS){
						uni.switchTab({
							url: '/pages/task/task'
						});
						uni.showToast({
							title: '支付成功',
							duration: 1000
						})
					}else{
						uni.showToast({
							title: '不太行',
							duration: 1000,
							icon:'none'
						})
					}
				})

				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.showMoney {
		width: 100vw;
		height: 56.25vw;
		text-align: center;
		font-size: $list-title-l;
		line-height: 56.25vw;
		background-color: #f0f0f0;

		input {
			font-size: $list-title-l;
			height: 56.25vw;
		}
	}

	.bottonBox {
		margin-top: $box-margin-top;
		text-align: center;
	}

	.payBtn {
		width: 50vw;
	}
</style>
