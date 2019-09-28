<template>
	<view>
		<view v-for="(item,index) in contentList" :key="index">
			<listBox :title="item.title" :text="item.status"></listBox>
		</view>
		<uniLoadMore :status="pageStatus"></uniLoadMore>
	</view>
</template>

<script>
	import listBox from '@/components/task/taskListBox.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'

	export default {
		components: {
			listBox,
			uniLoadMore
		},
		data() {
			return {
				userId: uni.getStorageSync('userId'),
				contentList: [],

				count: 10,
				offset: 0,
				page: 1,
				pageOver:false,
				pageStatus:'loading'
			}
		},
		onLoad() {
			let cnt = {
				module: this.$constData.module, // String 模块
				// type: type, // Byte <选填> 类型
				// status: status, // Byte <选填> 状态编号
				// power: power, // Byte <选填> 权力
				upUserId: this.userId, // Long <选填> 上传用户编号
				// upChannelId: upChannelId, // Long <选填> 上传专栏编号
				// tags: tags, // JSONObject <选填> 标签
				count: this.count, // int 
				offset: this.offset, // int 
			}
			this.getContents(cnt)
		},
		methods: {
			getContents(cnt) {
				this.$api.getContents(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.stopPullDownRefresh()
						let arr = this.$util.tryParseJson(res.data.c)
						if (arr.length < 10) {
							this.pageOver = true
							this.pageStatus = 'nomore'
						} else {
							this.pageStatus = 'more'
							this.pageOver = false
						}
						let status = this.$constData.contentStatus
						for (let i = 0; i < arr.length; i++) {
							switch (arr[i].status) {
								case status[0].key:
									arr[i].status = '草稿'
									break;
								case status[1].key:
									arr[i].status = '待审核'
									break;
								case status[2].key:
									arr[i].status = '未过审'
									break;
								case status[3].key:
									arr[i].status = '已删除'
									break;
								case status[4].key:
									arr[i].status = '已发布'
									break;
								case status[5].key:
									arr[i].status = '发布失败'
									break;
							}
						}

						this.contentList = this.contentList.concat(arr)
						console.log(this.contentList)
					} else {
						uni.showToast({
							title: '服务器错误'
						})
					}
				})
			},

		},

		//下拉刷新
		onPullDownRefresh() {
			this.contentList = []
			this.page = 1
			this.pageOver = false
			let cnt = {
				module: this.$constData.module, // String 模块
				// type: type, // Byte <选填> 类型
				// status: status, // Byte <选填> 状态编号
				// power: power, // Byte <选填> 权力
				upUserId: this.userId, // Long <选填> 上传用户编号
				// upChannelId: upChannelId, // Long <选填> 上传专栏编号
				// tags: tags, // JSONObject <选填> 标签
				count: this.count, // int 
				offset: this.offset, // int 
			}
			this.getContents(cnt)
		},
		onReachBottom() {
			this.page += 1
			if(this.pageOver == true){
				return
			}
			this.pageStatus = 'loading'
			let cnt = {
				module: this.$constData.module, // String 模块
				// type: type, // Byte <选填> 类型
				// status: status, // Byte <选填> 状态编号
				// power: power, // Byte <选填> 权力
				upUserId: this.userId, // Long <选填> 上传用户编号
				// upChannelId: upChannelId, // Long <选填> 上传专栏编号
				// tags: tags, // JSONObject <选填> 标签
				count: this.count, // int 
				offset: (this.page - 1) * this.count, // int 
			}
			this.getContents(cnt)
		}
	}
</script>

<style lang="scss" scoped>

</style>
