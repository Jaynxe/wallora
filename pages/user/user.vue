<template>
	<view class="user-container gradient-bg">
		<view :style="{height:getNavBarHeight()+'px'}">

		</view>
		<view class="user-info">
			<view class="avatar">
				<image src="/static/images/Logo.jpg" mode="aspectFill"></image>
			</view>
			<view class="ip">
				{{userInfo.IP}}
			</view>
			<view class="address">
				来自：{{userInfo.address?.city}}
			</view>
		</view>

		<view class="section">
			<view class="list">
				<navigator url="/pages/class-list/class-list?name=我的下载&type=download">
					<view class="row">

						<view class="left">
							<uni-icons type="download-filled" size="20"></uni-icons>
							<view class="text">
								我的下载
							</view>
						</view>
						<view class="right">
							<view class="text">
								{{userInfo.downloadSize}}
							</view>
							<uni-icons type="right" size="20" color="#aaa"></uni-icons>
						</view>
					</view>
				</navigator>
				<navigator url="/pages/class-list/class-list?name=我的评分&type=score">
					<view class="row">
						<view class="left">
							<uni-icons type="star-filled" size="20"></uni-icons>
							<view class="text">
								我的评分
							</view>
						</view>
						<view class="right">
							<view class="text">
								{{userInfo.scoreSize}}
							</view>
							<uni-icons type="right" size="20" color="#aaa"></uni-icons>
						</view>
					</view>
				</navigator>

				<view class="row">
					<view class="left">
						<uni-icons type="chatboxes-filled" size="20"></uni-icons>
						<view class="text">
							联系客服
						</view>
					</view>
					<view class="right">
						<uni-icons type="right" size="20" color="#aaa"></uni-icons>
					</view>
					<!-- 平台是小程序显示 -->
					<!-- #ifdef MP -->
					<button class="contact" open-type="contact">联系客服</button>
					<!-- #endif -->

					<!-- 平台不是小程序显示 -->
					<!-- #ifndef MP -->
					<button class="contact" @click="handleCallPhone">播打电话</button>
					<!-- #endif -->

				</view>

			</view>
		</view>
		<view class="section">
			<view class="list">
				<navigator class="row" url="/pages/notice/detail?id=653507c6466d417a3718e94b">
					<view class="left">
						<uni-icons type="notification-filled" size="20"></uni-icons>
						<view class="text">
							订阅更新
						</view>
					</view>
					<view class="right">
						<uni-icons type="right" size="20" color="#aaa"></uni-icons>
					</view>
				</navigator>
				<navigator class="row" url="/pages/notice/detail?id=6536358ce0ec19c8d67fbe82">
					<view class="left">
						<uni-icons type="help-filled" size="20"></uni-icons>
						<view class="text">
							常见问题
						</view>
					</view>
					<view class="right">
						<uni-icons type="right" size="20" color="#aaa"></uni-icons>
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		getNavBarHeight
	} from '@/utils/system.js'
	import {
		apiUserInfo
	} from '@/api/apis.js'
	import {
		reactive,
	} from 'vue'
	// 获取用户信息
	const userInfo = reactive({})
	
	const getUserInfo = async () => {
		const res = await apiUserInfo()
		Object.assign(userInfo, res.data)
	}

	// 拨打电话	
	const handleCallPhone = () => {
		uni.makePhoneCall({
			phoneNumber: '114' //仅为示例
		});

	}

	getUserInfo()
</script>

<style lang="scss" scoped>
	.user-container {
		.user-info {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 50rpx 0;

			.avatar {
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.ip {
				font-size: 44rpx;
				color: $text-font-color-2;
				padding: 20rpx 0 5rpx;
			}

			.address {
				font-size: 28rpx;
				color: $text-font-color-3;
			}

		}

		.section {
			width: 690rpx;
			margin: 50rpx auto;
			border: 1rpx solid $border-color-light;
			border-radius: 10rpx;
			box-shadow: 0rpx 0rpx 30rpx rgba(0, 0, 0, 0.05);

			.list {

				.row {
					height: 100rpx;
					padding: 0 30rpx;
					border-bottom: 1rpx solid $border-color-light;
					display: flex !important;
					justify-content: space-between;
					align-items: center;
					position: relative;
					background-color: #fff;

					&:last-child {
						border-bottom: none;
					}

					.left {
						display: flex;
						align-items: center;
						gap: 10rpx;

						:deep() {
							.uni-icons {
								color: $papr-color-primary !important;
							}
						}

						.text {
							color: $text-font-color-2;
						}
					}

					.right {
						display: flex;
						align-items: center;
						gap: 10rpx;

						.text {
							color: $text-font-color-3;
						}
					}

					.contact {
						position: absolute;
						top: 0;
						left: 0;
						height: 100rpx;
						width: 100%;
						opacity: 0;
					}
				}


			}
		}

	}
</style>