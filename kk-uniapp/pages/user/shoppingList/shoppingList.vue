<template>
	<view>
		<view v-for="(item,index) in channelList" :key="index" @click="navToChanle(item)">
			<taskListBox :title="item.name" :text="item.price+'￥'"></taskListBox>
		</view>
	</view>
</template>

<script>
	import taskListBox from '@/components/task/taskListBox.vue'

	export default {
		components: {
			taskListBox
		},
		data() {
			return {
				channelList: [],

			}
		},
		onLoad() {
			let cnt = {
				openId: uni.getStorageSync('openId'), // String 用户openid
				count: 10, // int 
				offset: 0, // int 
			}
			this.getPayChannel(cnt)
		},
		methods: {
			// navToChanle(item){
			// 	let randomColor = this.$constData.colorData[Math.floor(Math.random() * this.$constData.colorData.length)]
			// 	uni.navigateTo({
			// 		url:'/pages/vip/column/column?id='+item.channelId+'&title='+item.name+'&time='+' '+'&color='+randomColor
			// 	})
			// },

			getPayChannel(cnt) {
				console.log('111')
				this.$api.getPayChannel(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.channelList = this.$util.tryParseJson(res.data.c)
						console.log(this.channelList)
					} else {
						console.log('err')
					}
				})
			},

		},
	}
</script>

<style lang="scss" scoped>

</style>
