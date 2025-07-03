<template>
	<view class="preview-container">
		<swiper circular :current="currentIndex" @change='changeImage'>
			<swiper-item v-for="(image,index) in classList" :key="image._id">
				<image v-if="readImages.has(index)" @click="handleHideMask" :src="image.picurl" mode="aspectFill" />
			</swiper-item>
		</swiper>
		<view class="mask" v-show="isHideMask">
			<view @click="goBack" class="go-back" :style="{top:getStatusBarHeight()+'px'}">
				<uni-icons type="back" size="24" color="#fff"></uni-icons>
			</view>
			<view class="count">
				{{currentIndex + 1}} / {{classList.length}}
			</view>
			<view class="time">

				<uni-dateformat :date="Date.now()" format="hh:mm"></uni-dateformat>
			</view>
			<view class="date">
				<uni-dateformat :date="Date.now()" format="MM月dd日"></uni-dateformat>
			</view>
			<view class="footer">
				<view class="box" @click="openInfoPopup">
					<uni-icons type="info" size="24"></uni-icons>
					<view>信息</view>
				</view>
				<view class="box" @click="openRatePopup">
					<uni-icons type="star-filled" size="24"
						:color="currentImageInfo.userScore ? '#ffca3e' : '#ccc'"></uni-icons>

					<view>
						{{ currentImageInfo.userScore ? currentImageInfo.userScore + '分' : '评分' }}
					</view>

				</view>
				<view class="box" @click="handleDownload">
					<uni-icons type="download" size="24"></uni-icons>
					<view>下载</view>
				</view>
			</view>
		</view>
		<uni-popup ref="infoRef" is-mask-click type="bottom" :safe-area="false">
			<view class="infoPopup">
				<view class="popup-header">
					<view></view>
					<view class="title">壁纸信息</view>
					<view class="close" @click="closeInfoPopup">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>
				<scroll-view scroll-y>
					<view class="content">
						<view class="row">
							<view class="label">
								壁纸ID：
							</view>
							<text user-select class="value">{{currentImageInfo._id}}</text>
						</view>
						<view class="row">
							<view class="label">
								发布者：
							</view>
							<text user-select class="value">{{currentImageInfo.nickname}}</text>
						</view>
						<view class="row">
							<text class="label">
								评分：
							</text>
							<view class="rate">
								<uni-rate readonly touchable value="3" size="16" :value='currentImageInfo.score' />
								<text class="score">{{currentImageInfo.score}}</text>
							</view>
						</view>
						<view class="row">
							<view class="label">
								摘要：
							</view>
							<text user-select class="value">{{currentImageInfo.description}}</text>
						</view>
						<view class="row">
							<view class="label">
								标签：
							</view>
							<view user-select class="value tabs">
								<view class="tab" v-for="tab in currentImageInfo.tabs" :key='tab'>
									{{tab}}
								</view>
							</view>
							<view class="safe-area-inset-bottom"></view>
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>

		<uni-popup ref="rateRef" type="center">
			<view class="ratePopup">
				<view class="popup-header">
					<view></view>
					<view class="title">{{isScore?'评分过了~':'壁纸评分'}}</view>
					<view class="close" @click="closeRatePopup">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>
				<view class="content">
					<uni-rate v-model="userScore" allow-half :readonly="isScore"
						v-if="currentImageInfo && currentImageInfo.score !== undefined" />
					<text class="score">{{userScore}}分</text>
				</view>
				<view class="footer">
					<button @click="submitRate" type="default" size="mini" plain
						:disabled="!userScore||isScore">确认评分</button>
				</view>
			</view>

		</uni-popup>
	</view>
</template>

<script setup>
	import {
		ref,
	} from 'vue';
	import {
		onLoad,
		onShareAppMessage,
		onShareTimeline
	} from '@dcloudio/uni-app'
	import {
		getStatusBarHeight,
	} from "@/utils/system.js"
	import {
		apiSubmitRate,
		apiWriteDownload,
		apiGetDetailWall
	} from '@/api/apis.js'


	const storageClassList = uni.getStorageSync('classList') || []
	const classList = ref([])
	const infoRef = ref(null)
	const rateRef = ref(null)
	const readImages = new Set()
	const userScore = ref(0)
	const currentIndex = ref(0)
	const currentId = ref('')
	const currentImageInfo = ref({})
	const isHideMask = ref(true)
	const isScore = ref(false)

	// 分享给好友
	onShareAppMessage((option) => {
		return {
			title: 'wallora壁纸',
			path: '/pages/preview/preview?id=' + currentId.value + '&type=share'

		}
	});
	// 分享到朋友圈
	onShareTimeline((option) => {
		return {
			title: 'wallora壁纸',
			query: "id=" + currentId.value + '&type=share'
		}
	});
	// 从缓存中读取数据
	classList.value = storageClassList.map(item => {
		return {
			...item,
			picurl: item.smallPicurl.replace('_small.webp', '.jpg')
		};
	});

	// 加载数据
	onLoad(async (option) => {
		currentId.value = option.id
		// 分享过来的，需要从服务器获取数据，因为本地缓存没有
		if (option.type === 'share') {
			const res = await apiGetDetailWall({
				id: currentId.value
			})
			classList.value = res.data.map(item => {
				return {
					...item,
					picurl: item.smallPicurl.replace('_small.webp', '.jpg')
				};
			});
		}
		currentIndex.value = classList.value.findIndex(item => item._id === currentId.value);
		currentImageInfo.value = classList.value[currentIndex.value]
		markSurroundingImages(currentIndex.value);

	});
	// 切换轮播图片
	const changeImage = (e) => {
		const current = e.detail.current;
		currentIndex.value = current;
		markSurroundingImages(current);
		currentImageInfo.value = classList.value[currentIndex.value]
	};

	// 信息弹窗
	const openInfoPopup = () => {
		infoRef.value.open();
	}
	const closeInfoPopup = () => {
		infoRef.value.close();

	}

	// 评分弹窗
	const openRatePopup = () => {
		rateRef.value.open();
		if (currentImageInfo.value.userScore) {
			isScore.value = true;
			userScore.value = currentImageInfo.value.userScore;
		}
	}
	const closeRatePopup = () => {
		rateRef.value.close();
		userScore.value = 0;
		isScore.value = false;
	}
	// 提交评分
	const submitRate = async () => {
		uni.showLoading({
			title: '加载中...'
		})
		const {
			classid,
			_id: wallId
		} = currentImageInfo.value
		const res = await apiSubmitRate({
			classid,
			wallId,
			userScore: userScore.value
		})
		uni.hideLoading()
		if (res.errCode === 0) {
			uni.showToast({
				title: '评分成功',
				icon: 'success'
			})
			classList.value[currentIndex.value].userScore = userScore.value
			uni.setStorageSync('classList', classList.value)
			closeRatePopup()
		}
	}

	// 下载图片
	const handleDownload = async () => {
		// #ifdef H5
		uni.showModal({
			title: '请长按保存图片',
			showCancel: false
		})
		// #endif
		// #ifndef H5
		try {
			uni.showLoading({
				title: '下载中...',
				mask: true
			})
			// 保存下载记录
			const {
				classid,
				_id: wallId
			} = currentImageInfo.value
			const res = await apiWriteDownload({
				classid,
				wallId
			});
			// 下载记录保存错误
			if (res.errCode !== 0) {
				uni.hideLoading()
				throw res.errMsg;
			}
			uni.getImageInfo({
				src: currentImageInfo.value.picurl,
				success: (res) => {
					uni.saveImageToPhotosAlbum({
						filePath: res.path,
						// 保存成功时触发
						success: (res) => {
							uni.showToast({
								title: "保存成功，请到相册查看",
								icon: 'none'
							})

						},
						// 保存失败时触发(包括权限获取失败)，添加手动授权操作
						fail: (error) => {
							// 授权了，但是取消保存了
							if (error.errMsg === 'saveImageToPhotosAlbum:fail cancel') {
								uni.showToast({
									icon: "none",
									title: "保存失败，请重新点击下载"
								});
								return;
							}

							// 没有授权
							uni.showModal({
								title: '授权提示',
								content: '需要授权保存相册',
								success: (res) => {
									if (res.confirm) {
										// 启动手动授权，这里的弹出的设置是你在后台添加的用户信息设置
										uni.openSetting({
											success: (setting) => {
												if (setting
													.authSetting[
														'scope.writePhotosAlbum'
													]) {
													uni.showToast({
														title: '相册授权成功',
														icon: 'none'
													})
												} else {
													uni.showToast({
														title: '相册授权失败',
														icon: 'none'
													})
												}
											}
										})
									}
								}
							})
						},
						complete: () => {
							uni.hideLoading()
						}
					})
				},

			})
		} catch (error) {
			console.error(error)
			uni.hideLoading();
		}
		// #endif
	}

	const markSurroundingImages = (index) => {
		const len = classList.value.length;
		if (len === 0 || index < 0 || index >= len) return;

		const prev = (index - 1 + len) % len;
		const next = (index + 1) % len;

		readImages.add(index);
		readImages.add(prev);
		readImages.add(next);
	};

	// 返回
	const goBack = () => {
		uni.navigateBack({
				success: () => {

				},
				fail: () => {
					uni.reLaunch({
						url: '/pages/index/index'
					})
				}
			}

		)

	}

	// 隐藏蒙层
	const handleHideMask = () => {
		isHideMask.value = !isHideMask.value
	}
</script>

<style lang="scss">
	.preview-container {
		width: 100%;
		height: 100vh;
		position: relative;

		swiper {
			width: 100%;
			height: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.mask {
			&>view {
				position: absolute;
				left: 0;
				right: 0;
				margin: auto;
				color: #fff;
				width: fit-content;
			}

			.go-back {
				width: 38px;
				height: 38px;
				background: rgba(0, 0, 0, 0.5);
				left: 30rpx;
				margin-left: 0;
				border-radius: 100px;
				backdrop-filter: blur(10rpx);
				border: 1rpx solid rgba(255, 255, 255, 0.3);
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.count {
				top: 10vh;
				padding: 8rpx 28rpx;
				width: fit-content;
				background-color: rgba(0, 0, 0, 0.5);
				backdrop-filter: blur(20rpx);
				border-radius: 40rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.time {
				top: calc(10vh + 80rpx);
				font-size: 120rpx;
				font-weight: 100;
				line-height: 1em;
				text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
			}

			.date {
				font-size: 34rpx;
				top: calc(10vh + 230rpx);
				text-shadow: 0 2rpx rgba(0, 0, 0, 0.3);
			}

			.footer {
				background: rgba(255, 255, 255, 0.8);
				bottom: 10vh;
				display: flex;
				justify-content: space-around;
				align-items: center;
				width: 65vw;
				height: 120rpx;
				border-radius: 60rpx;
				box-shadow: 0 2rpx 0 rgba(0, 0, 0, 0.2);
				backdrop-filter: blur(20rpx);
				color: $text-font-color-1;

				.box {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					color: $text-font-color-2;
					padding: 2rpx 12rpx;
				}
			}
		}

		.infoPopup {
			background: #fff;
			padding: 30rpx;
			border-radius: 30rpx 30rpx 0 0;
			overflow: hidden;


			scroll-view {
				max-height: 50vh;

				.content {
					.row {
						display: flex;
						align-items: center;
						padding: 16rpx 0;
						font-size: 32rpx;
						line-height: 1.7em;

						.label {
							color: $text-font-color-3;
							width: 140rpx;
							text-align: right;
							font-size: 30rpx;
						}

						.value {
							flex: 1;
							width: 0;
						}

						.class {
							color: $papr-color-primary;
						}

						.rate {
							display: flex;
							align-items: center;

							.score {
								font-size: 28rpx;
								color: $text-font-color-3;
								padding-left: 20rpx;
							}

						}

						.tabs {
							display: flex;
							align-items: center;
							flex-wrap: wrap;

							.tab {
								border: 1px solid $papr-color-primary;
								color: $papr-color-primary ;
								font-size: 22rpx;
								padding: 10rpx 30rpx;
								border-radius: 40rpx;
								line-height: 1em;
								margin: 0 10rpx 10rpx 0;
							}
						}
					}
				}
			}
		}

		.popup-header {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.title {
				color: $text-font-color-2;
			}

			.close {
				padding: 6rpx;
			}
		}

		.ratePopup {
			background: #fff;
			padding: 30rpx;
			border-radius: 30rpx;
			overflow: hidden;
			width: 70vw;

			.content {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 10rpx;
				padding: 30rpx 0;

				.score {
					color: #FFCA3E;
					width: 80rpx;
					line-height: 1em;
					text-align: right;
				}
			}

			.footer {
				margin: 20rpx auto;
				text-align: center;
			}
		}
	}
</style>