<template>
	<view>
		<video class="video" :src="video" controls></video>
		<view class="teplateInfo">
			{{text}}
		</view>
		<button class="nextBtn" type="primary" @click="navToNext">下一步</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				video: '', //视频地址
				text: '简介简介简介简介简介简介简介简介简介简介简介简介',
				id: '', //模板id
				type: '', //任务类型
				title: '', //模板标题
			}
		},
		onLoad(res) {
			this.id = res.id
			this.getTemplate()
		},
		methods: {
			getTemplate() {
				let cnt = {
					id: this.id
				}
				this.$api.getTemplate(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let obj = this.$util.tryParseJson(res.data.c)
						console.log('模板信息↓↓↓↓↓↓↓↓↓↓↓↓↓↓')
						console.log(obj)
						this.title = obj.name
						this.video = this.$util.tryParseJson(obj.data).src
						this.type = obj.taskType
						this.text = obj.text
					}
				})
			},

			//下一步方法
			navToNext() {
				this.$store.state.taskInfo.text = this.text
				uni.redirectTo({
					url: `/pages/task/createTask/addVideoTask?id=${this.id}`
				})
			},
		}
	}
</script>

<style lang="scss">
	.video {
		width: 100vw;
		height: 56.25vw;
	}

	.teplateInfo {
		padding: $box-margin-top $box-margin-left;
		font-size: $list-title;
	}

	.nextBtn {
		position: fixed;
		right: $box-margin-left;
		bottom: $box-margin-top;
		font-size: $list-title;
	}
</style>
