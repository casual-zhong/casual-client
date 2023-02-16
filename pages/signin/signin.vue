<template>
	<view class="signin">
		<view class="top-bar">
			<view class="top-bar-left">
				<image src="../../static/images/img/four.jpg"></image>
			</view>
			<view class="top-bar-center">
				<image src="../../static/images/index/logo.png"></image>
			</view>
			<view class="top-bar-right">
				<image src="../../static/images/index/add.png"></image>
			</view>
		</view>
		<view class="bottom-content">
			<image src="../../static/images/index/logo.png"></image>
			<text class="content_title">登录</text>
			<text class="content_describe">您好，欢迎登录！</text>
			<u--form labelPosition="left" :model="userInfo" :rules="rules" ref="uForm">
				<u-form-item label="" prop="account" borderBottom labelWidth="0">
					<u--input v-model="userInfo.account" border="none"></u--input>
				</u-form-item>
				<u-form-item label="" prop="password" borderBottom labelWidth="0">
					<u--input v-model="userInfo.password" type="password" border="none"></u--input>
				</u-form-item>
			</u--form>
			<u-button text="登录" class="submit_button" color="#FFE431" @click="submit"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{
					account:'',
					password:''
				},
				rules: {
					'account': {
						type: 'string',
						required: true,
						message: '请输入账号',
						trigger: ['blur', 'change']
					},
					'password': {
						type: 'string',
						required: false,
						message: '请输入密码',
						trigger: ['blur', 'change']
					},
				}
			};
		},
		methods:{
			submit() {
				this.$refs.uForm.validate().then(res => {
					uni.request({
						// url:"http://192.168.100.4:3000/test",
						// url:"http://192.168.100.4:3000/test1",
						url:"http://192.168.1.15:3000/mail",
						data:{
							mail: this.userInfo.account
						},
						method:"POST",
						success:(res)=>{
							console.log(res)
						}
					})
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			}
		}
	}
</script>

<style lang="scss">
.signin{
	width: 100vw;
	height: 100vh;
	// padding-top: var(--status-bar-height);
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	.top-bar{
		width: 100%;
		height: 88rpx;
		padding: 0 32rpx;
		box-sizing: border-box;
		background: $uni-bg-color;
		box-shadow:0px 1px 0px 0px rgba(0,0,0,0.1);
		overflow: hidden;
		display: flex;
		.top-bar-left,.top-bar-center,.top-bar-right{
			flex: 1;
			height: 100%;
			display: flex;
			align-items: center;
			image {
				width: 60rpx;
				height: 60rpx;
			}
			&.top-bar-center{
				justify-content: center;
			}
			&.top-bar-right{
				justify-content: end;
				image{
					width: 50rpx;
					height: 50rpx;
					margin-left: 10px;
				}
			}
		}
	}
	.bottom-content{
		flex: 1;
		width: 100%;
		overflow-y: auto;
		box-sizing: border-box;
		padding: 70px 30px 0;
		display: flex;
		flex-direction: column;
		image{
			width: 70px;
			height: 70px;
			margin: 0 auto 20px;
		}
		.content_title{
			font-size: 28px;
			color: #272832;
			font-weight: 500;
		}
		.content_describe{
			font-size: 20px;
			color: rgba(39,40,50,0.50);
			margin: 10px 0;
		}
	}
	.submit_button{
		width: 260px;
		height: 48px;
		margin-top: 30px;
		box-shadow: 0px 25px 16px -18px rgba(255,228,49,0.4);
		border-radius: 24px;
	}
}
</style>
