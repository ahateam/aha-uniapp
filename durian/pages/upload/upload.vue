<template>
	<view>
		<l-file ref="lFile" @up-success="onSuccess"></l-file>
		
		<view class="padding text-center">
			<view class="padding">
				<button @tap="onOpenDoc">预览</button>
			</view>
			<view class="padding">
				<button @tap="onDown">下载到本地</button>
				<view class="text-center padding-sm">{{localPath}}</view>
			</view>
			<view class="padding">
				<button @tap="onUpload">上传</button>
			</view>
			<view class="padding" style="font-size: 26rpx;text-align: center;">
				<text decode>{{tip}}</text>
			</view>
		</view>
	</view>
</template>

<script>

	import lFile from '@/components/l-file/l-file.vue'
	export default {
		components:{lFile},
		data() {
			return {
				localPath: '',
				tip: `
					纯粹是看大家对选择文件多端上传需求比较大\n
					又得不到好的解决\n
					所以只好自己写了一个不需要集成原生插件的上传顺便分享给大家\n
					这里只做了“微信端、android、ios”的上传\n
					h5及其他端自己改改(因为APP使用了plus)\n
					希望能帮到你\n
					不喜勿喷，不要期待更新，我很懒\n
					`,
			}
		},
		mounted(){
			console.log(clinet)
		},
		methods: {
			/* 预览 */
			onOpenDoc() {
				let url = 'https://doc.wendoc.com/word/bde80cbcc2948a222a29694e150750c7759e81050-1.doc';
				this.$refs.lFile.download(url)
				.then(path=>{
					this.$refs.lFile.open(path);
				});
			},
			/* 保存 */
			onDown() {
				let url = 'https://doc.wendoc.com/word/bde80cbcc2948a222a29694e150750c7759e81050-1.doc';
				this.$refs.lFile.download(url,'local')
				.then(path=>{
					this.localPath = path;
				}); 
			},
			/* 上传 */
			onUpload() { 
				this.$refs.lFile.upload({
					// #ifdef APP-PLUS
					currentWebview: this.$mp.page.$getAppWebview(),
					// #endif
					url: 'http://192.168.1.128:8089/durian/posting/uploadFile', //测试地址，记得更换
					name: 'file',
					front:'1111',
					header: {'Content-Type':'multipart/form-data'},
					//...其他参数
				});
			},
			onSuccess(res) {
				console.log(res)
				console.log('上传成功回调',JSON.stringify(res));
			}
		}
	}
</script>

<style>
.padding-sm {
	padding: 20upx;
}

.padding {
	padding: 30upx;
}
</style>
