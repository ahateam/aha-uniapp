<template>
	<view>
		<view v-for="(item,index) in columnList" :key="index">
			<column :obj="item"></column>
		</view>
	</view>
</template>

<script>
	import column from '@/components/vip/column.vue'
	export default {
		components: {
			column,
		},
		data() {
			return {
				count: 10,
				offset: 0,
				page:1,
				
				columnList: [],
			}
		},
		onLoad() {
			let cnt = {
				module: this.$constData.module, // String 隶属
				status: 0, // Byte <选填> 状态
				// tags: tags, // String <选填> 标签
				count: this.count, // Integer 
				offset: this.offset, // Integer 
			}
			this.getChannel(cnt)
		},
		methods: {
			getChannel(cnt) {
				this.$api.getChannel(cnt,(res=>{
					if(res.data.rc == this.$util.RC.SUCCESS){
						let columnList = JSON.parse(res.data.c).list
						for (let i = 0; i < columnList.length; i++) {
							let cnt1 = {
								module: 'kkqt', // String 隶属
								channelId: columnList[i].id, // Long 专栏id
								status: 4, // Byte 专栏状态
								count: 3, // Integer 
								offset: 0, // Integer 
							}
							this.$api.getContentByChannelId(cnt1, (res) => {
								let arr = []
								if (res.data.rc == this.$util.RC.SUCCESS) {
									arr = JSON.parse(res.data.c).list
								} else {
									arr = []
								}
						
								let obj = JSON.parse(JSON.stringify(columnList[i]))
								obj.child = arr
								columnList.splice(i, 1, obj)
							})
						}
						this.$nextTick(function() {
							this.columnList = columnList
							console.log(this.columnList) // => '已更新'
						})
					}
				}))
			},
		}
	}
</script>

<style>

</style>
