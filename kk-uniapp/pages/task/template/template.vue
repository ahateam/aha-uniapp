<template>
	<view>
		<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft">
			<view v-for="(item, index) in contentTagGroupData" :key="index" class="nav-item" :class="{ current: index === currentSort }"
			 @click="changeNav(index)" :id="'tab'+index">
				{{ item.name }}
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				count: 10,
				offset: 0,
				type:'',

				contentData: {}, //模板列表

				contentTagGroupData: {}, //标签列表
				currentSort: 0, //标签选中下标
				tagName: '',

				templateName: '',
			};
		},
		onLoad(res) {
			this.templateName = this.$constData.taskType[res.type].templateName
			this.type = res.type
			this.getTags()
			let cnt = {
				module: this.$constData.module, // String 隶属
				type: res.type, // Byte <选填> 类型
				status: this.$constData.tagStatus[1].key, // Byte <选填> 状态
				// tags: tags, // String <选填> 标签
				count: 10, // Integer 
				offset: 0, // Integer 
			}
			this.getTemplate(cnt)
		},
		methods: {
			//根据标签改变内容
			changeNav(e) {
				this.currentSort = e
				this.tagName = this.contentTagGroupData[e].name
				
				let cnt = {
					module: this.$constData.module, // String 隶属
					type: this.type, // Byte <选填> 类型
					status: this.$constData.tagStatus[1].key, // Byte <选填> 状态
					tags: this.tagName, // String <选填> 标签
					count: 10, // Integer 
					offset: 0, // Integer 
				}
				this.getTemplate(cnt)
			},

			//获取标签
			getTags() {
				let cnt = {
					module: this.$constData.module, // String 隶属
					status: this.$constData.tagStatus[1].key, // Byte 标签状态
					keyword: this.templateName, // String 标签分组
					count: 50, // Integer 
					offset: 0, // Integer 
				}
				this.$api.getTags(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.contentTagGroupData = this.$util.tryParseJson(res.data.c)
						console.log(this.contentTagGroupData)
					}
				})
			},

			//获取模板
			getTemplate(cnt) {
				this.$api.getTemplate(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.contentData = this.$util.tryParseJson(res.data.c)
						console.log(this.contentData)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav-bar {
		position: fixed;
		z-index: 10;
		height: 90upx;
		white-space: nowrap;
		box-shadow: 0 2upx 8upx rgba(0, 0, 0, 0.06);
		background-color: #fff;

		.nav-item {
			display: inline-block;
			width: 150upx;
			height: 90upx;
			text-align: center;
			line-height: 90upx;
			font-size: 30upx;
			color: #303133;
			position: relative;

			&:after {
				content: '';
				width: 0;
				height: 0;
				border-bottom: 4upx solid #007aff;
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				transition: 0.3s;
			}
		}

		.current {
			color: #007aff;

			&:after {
				width: 30%;
			}
		}
	}
</style>
