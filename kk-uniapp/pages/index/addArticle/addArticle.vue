<template>
	<view>
		<view class="titleBox">
			<input type="text" v-model="title" placeholder="请输入标题" />
			<view class="inputInfo">
				点击下方内容文字可以进行进行添加或修改哦
			</view>
		</view>
		<uni-richtext ref="richText"></uni-richtext>
		<view class="addArticle">
			<button type="primary" @click="addContentBtn">提交</button>
		</view>
	</view>
</template>

<script>
	import uniRichtext from '@/components/qiyue-richtext/uni-richtext.vue'
	export default {
		components: {
			uniRichtext,
		},
		data() {
			return {
				title: '',
				imgList: [],
				userId: '',

			};
		},
		methods: {
			addContentBtn() { //添加前判断信息是否完整
				console.log(this.$refs.richText.richList)
				if (this.title == '') {
					uni.showToast({
						title: '请填写标题',
						duration: 1500,
						icon: 'none'
					});
				} else if (this.$refs.richText.richList.length == 0) {
					uni.showToast({
						title: '请添加内容',
						duration: 1500,
						icon: 'none'
					});
				} else if (this.$refs.richText.richList.length > 0) {
					if (this.$refs.richText.richList[0].value == '' && this.$refs.richText.richList[1].value == '') {
						uni.showToast({
							title: '请输入内容',
							duration: 1500,
							icon: 'none'
						});
					}else{
						uni.showLoading({
						    title: '上传中~'
						});
						this.addArticle()
					}
				}
			},
			addArticle() {
				console.log(this.$refs.richText.richList)
				this.imgList = []
				let _this = this
				let type = '5'
				let editor = this.$refs.richText.richList
				for (let i = 0; i < editor.length; i++) {
					if (editor[i].type == 'textarea') {
						console.log(editor[i].value)
						let str = editor[i].value
						let start = str.indexOf('\n')
						console.log(start)
						while (start != -1) {
							console.log(start)
							let str1 = str.substring(0, start)
							let str2 = '</p><p>'
							let str3 = str.substring(start + 1)
							str = str1 + str2 + str3
							start = str.indexOf('\n')
						}
						str = `<div style="${editor[i].style}"><p>` + str + '</p> </div>'
						editor[i].value = str
					}
				}
				this.pushImg(editor)
			},
			pushImg(editor) {
				console.log(editor)
				for (let i = 0; i < editor.length; i++) { //找出编辑器中的图片添加至新数组便于显示
					if (editor[i].type == 'img') {
						let imgSrc = {
							src: editor[i].value
						}
						this.imgList.push(imgSrc)
					}
				}
				console.log(this.imgList)
				this.upContent(editor)
			},
			upContent(editor) {
				let data = {
					url: '{}',
					editor: editor,
					imgList: this.imgList,
					show: 0
				}
				data = JSON.stringify(data)
				let cnt = {
					userId: parseInt(this.userId), // Long 用户编号
					module: [this.$constData.module], // String 用户编号
					status: parseInt(this.$constData.contentStatus[1].key), // Byte 状态Content.STATUS
					// upChannelId: upChannelId, // Long <选填> 上传专栏编号
					title: this.title, // String 标题
					data: data, // String 数据（JSON）
					paid: parseInt(this.$constData.contentPaid[0].key), // Byte 是否付费 0免费  1付费
				}
				if (this.imgList.length > 0) {
					cnt.type = this.$constData.contentType[2].key
				} else {
					cnt.type = this.$constData.contentType[0].key
				}
				cnt.type = parseInt(cnt.type)
				console.log(cnt)
				this.$api.addContent(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.reLaunch({
							url: '/pages/index/index'
						});
						uni.hideLoading()
						uni.showToast({
							title: '添加成功',
							duration: 1500
						});
					} else {
						console.log('失敗')
					}
				})
			}
		},
		onLoad() {
			this.userId = uni.getStorageSync('userId')
		}
	}
</script>

<style lang="scss" scoped>
	.titleBox {
		padding: $box-margin-top $box-margin-left;
		padding-bottom: 10upx;
		font-size: $list-title-l;
		font-weight: bold;
	}

	.addArticle {
		margin-top: 20upx;

		button {
			border-radius: 0;
			background-color: #ec706b;
		}

		.button-hover {
			background-color: rgba(236, 112, 107, 0.5);
			color: rgba(255, 255, 255, 0.5)
		}
	}

	.inputInfo {
		margin-top: 30px;
		font-size: $list-info;
		color: $list-info-color;
	}
</style>
