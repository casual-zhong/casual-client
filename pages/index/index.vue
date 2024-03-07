<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left">
				<image src="../../static/images/img/four.jpg"></image>
			</view>
			<view class="top-bar-center">
				<image src="../../static/images/index/logo.png"></image>
			</view>
			<view class="top-bar-right">
				<image src="../../static/images/index/add.png"></image>
				<image src="../../static/images/index/search.png"></image>
			</view>
		</view>
		<view class="bottom-content">
			<u-notice-bar :text="notice"></u-notice-bar>
			<view class="content-item" v-for="item in 15" :key="item">
				<view class="item-image">
					<image src="../../static/images/img/p.png" mode=""></image>					
					<text class="image-num">9</text>
				</view>
				<view class="item-msg">
					<view class="item-msg-top">
						<view class="msg-top-left">测试标题</view>
						<view class="msg-top-right">09:40</view>
					</view>
					<view class="item-msg-bottom">一些消息一些消息</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				notice:'所有人大老大是考虑到哈沙龙狮大会拉胯汉兰达开始拉都说了卡号了看'
			}
		},
		onLoad() {
			
		},
		methods: {
		
		}
	}
</script>

<style lang="scss">
	.content {
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
			
			.content-item{
				width: 100%;
				height: 64px;
				padding: 5px;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				&:hover{
					background-color: #F3F3F3;
				}
				.item-image{
					width: 48px;
					height: 48px;
					position: relative;
					image{
						border-radius: 12px;
						width: 100%;
						height: 100%;	
					}
					.image-num{
						position: absolute;
						inset: -5px -5px auto auto;
						min-width: 15px;
						text-align: center;
						padding: 1px;
						border-radius: 50%;
						background-color: #f00;
						color: #fff;
						width: fit-content;
						height: fit-content;
						font-size: 12px;
					}
				}
				.item-msg{
					flex: 1;
					padding: 0 5px 0 15px;
					display: flex;
					flex-direction: column;
					justify-content: space-evenly;
					.item-msg-top{
						display: flex;
						justify-content: space-between;
						align-items: center;
						.msg-top-left{
							flex: 1;
							font-size: 18px;
						}
						.msg-top-right{
							width: 50px;
							text-align: right;
							font-size: 12px;
							color: rgba(39,40,50,0.40);
						}
					}
					.item-msg-bottom{
						font-size: 14px;
						color: rgba(39,40,50,0.60);
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
					}
				}
			}
		}
	}
</style>
