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
				
				columnList: {},
				
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
						this.columnList = JSON.parse(res.data.c).list
						console.log(this.columnList)
					}
				}))
			},
		}
	}
</script>

<style>

</style>
