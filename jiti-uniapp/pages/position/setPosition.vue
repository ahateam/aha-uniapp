<template>
	<view>
		<view class="title-box">
			用成员基本信息
		</view>
		<view class="user-info">
			<view class="item">
				<view class="item-title">
					姓名
				</view>
				<view class="item-text">
						{{userPosition.user.realName}}
				</view><view class="clear-both"></view>
			</view>
			<view class="item">
				<view class="item-title">
					身份证号
				</view>
				<view class="item-text">
						{{userPosition.user.idNumber}}
				</view><view class="clear-both"></view>
			</view>
			<view class="item">
				<view class="item-title">
					手机号码
				</view>
				<view class="item-text">
						{{userPosition.user.mobile}}
				</view><view class="clear-both"></view>
			</view>
		</view>
		<view class="title-box1">
			成员职务
		</view>
		<view class="list-box">
			<view>
				<view class="uni-list">
					<checkbox-group @change="checkboxChange">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in roleList" :key="index">
								
							<view class="item-check-box">
								<checkbox :value="item.roleId" :checked="item.checked" />
								{{item.name}}
							</view>
						</label><view class="clear-both"></view>
					</checkbox-group>
				</view>
			</view>
		</view>
		<view class="footer-box">
			<button type="primary" @click="setBtn()">
				确认修改
			</button>
			<button type="default" @click="toHomePage()">
				返回首页
			</button>
		</view>
	</view>
</template>

<script>
	export default{
		name:'setPosition',
		data(){
			return{
				userPosition:'',
				  roleList:[],
                role:[],
                info:''
			}
		},
		methods:{
			checkboxChange:function(e){
				console.log(e)
				this.role = e.detail.value
			},
			editORGUser(cnt){
              this.$api.editORGUser(cnt,(res)=>{
                  if(res.data.rc == this.$util.RC.SUCCESS){
                      uni.showToast({
                      	icon:'success',
						title:'更改职务成功'
                      })
                  }else{
                        uni.showToast({
                     	icon:'none',
                     	title:'操作失败'
                     })
                  }
				  uni.navigateBack();
              })
            },
			setBtn(){
			 let cnt = {
                    orgId:    this.userPosition.orgUser.orgId, // Long 组织编号
                    userId:  this.userPosition.orgUser.userId, // Long 用户编号
                    address: this.userPosition.orgUser.address, // String 地址
                    shareCerNo: this.userPosition.orgUser.shareCerNo, // String 股权证书编号
                    shareCerImg:'无', // String 股权证书图片地址
                    shareCerHolder: this.userPosition.orgUser.shareCerHolder, // Boolean 是否持证人
                    shareAmount:  this.userPosition.orgUser.shareAmount, // Integer 股份数
                    weight:  this.userPosition.orgUser.weight, // Integer 选举权重
                    roles: this.role, // Array 角色（股东，董事长，经理等）
                    groups: this.userPosition.orgUser.groups,
                    tags: this.userPosition.orgUser.tags, // JSONObject 标签，包含groups,tags,以及其它自定义分组标签列表
                    familyNumber: this.userPosition.orgUser.familyNumber,
                    familyMaster:this.userPosition.orgUser.familyMaster,
                }
                this.editORGUser(cnt)
			},
			
			toHomePage() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			}
		},
		onLoad() {
			this.userPosition = JSON.parse(uni.getStorageSync('userPosition'))
			  this.$api.getSysORGUserRoles({},(res)=>{
                if(res.data.rc == this.$util.RC.SUCCESS){
                    this.roleList = this.$util.tryParseJson(res.data.c)
                }else{
                    this.roleList = []
                }
				  this.role = JSON.parse(this.userPosition.orgUser.roles)
				  
				  this.roleList.splice(this.roleList.length-2,2)
				  for(let i =0;i<this.roleList.length;i++){
					  for(let j=0;j<this.role.length;j++){
						  if(this.roleList[i].roleId == this.role[j]){
							  this.$set(this.roleList[i],'checked',true)
						  }
					  }
				  }
				  			console.log(this.role)
            })
          
			

		}
	}
</script>

<style scoped lang="scss">
	.title-box {
		width: auto;
		padding: 30rpx;
		line-height: 50rpx;
		text-align: center;
		font-size: 32rpx;
		color: #fff;
		background: $jiti-color-blue;
		margin-top: 20rpx;
	}
	.user-info{
		padding: 30rpx;
	}
	.item{
		width: auto;
	}
	.item-title{
		float: left;
		width: 30%;
		line-height: 50rpx;
		font-size: 28rpx;
		color: #333;
		
	}
	.item-text{
			float: left;
		width: 70%;
		line-height: 50rpx;
		font-size: 28rpx;
		color: #666;
	}
	.title-box1 {
		width: auto;
		padding: 20rpx;
		line-height: 40rpx;
		text-align: left;
		font-size: 32rpx;
		color: #fff;
		background: $jiti-color-blue;
		margin-top: 20rpx;
	}
	
	.list-box{
		width: auto;
		padding: 30rpx;
		border-bottom:1px solid #eee;
	}
	.list-title{
		float: left;
		width: 25%;
		line-height: 50rpx;
		font-size: 28rpx;
		color: #333;
	}
	.uni-list-cell {
	    justify-content: flex-start
	}
	.item-check-box{
		float: left;
		font-size: 28rpx;
		line-height: 50rpx;
		margin: 20rpx;
		width: 200rpx;
		color: #666;
		
	}
	.clear-both{
		clear: both;
	}
	.footer-box {
		width: auto;
		padding: 40rpx;
	
	}
</style>
