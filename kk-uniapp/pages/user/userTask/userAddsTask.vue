<template>
	<view>
		<view v-for="(item,index) in contentData" :key="index" @click="navToTask(item)">
			<task-list-box :title="item.title" :text="item.detail" :name="item.user.name" :head="item.user.head"></task-list-box>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				contentData: [],
				userId: uni.getStorageSync('userId')
			}
		},
		onLoad() {
			let cnt = {
				
			}
			this.getTask()
		},
		methods: {
			getTask() {
				
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
