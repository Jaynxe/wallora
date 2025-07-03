<template>
	<view class="index-container gradient-bg">
		<custom-nav-bar title="推荐"></custom-nav-bar>
		<!-- 轮播图 -->
		<view class="banner">
			<swiper :indicator-dots="true" indicator-color="rgba(255,255,255,0.4)" indicator-active-color="white"
				:autoplay="true" :interval="3000" :duration="1000" circular>
				<swiper-item v-for="banner in banners" :key="banner._id">
					<navigator v-if="banner.target === 'miniProgram'" target="miniProgram" :url="banner.url"
						:app-id="banner.appid" class="link">
						<image :src="banner.picurl" mode="aspectFill"></image>
					</navigator>
					<navigator v-else :url="`/pages/class-list/class-list?${banner.url}`" class="link">
						<image :src="banner.picurl" mode="aspectFill"></image>
					</navigator>
				</swiper-item>
			</swiper>
		</view>
		<!-- 公告 -->
		<view class="notice">
			<view class="left">
				<uni-icons type="sound-filled" size="24"></uni-icons>
				<text class="title">公告</text>
			</view>
			<view class="center">
				<swiper vertical :autoplay="true" :interval="3000" :duration="1000" circular>
					<swiper-item v-for="notice in notices" :key="notice._id">
						<navigator :url="`/pages/notice/detail?id=${notice._id}`">{{notice.title}}</navigator>
					</swiper-item>
				</swiper>
			</view>
			<view class="right">
				<uni-icons type="right" size="20" color="#888"></uni-icons>
			</view>
		</view>
		<!-- 每日推荐 -->
		<view class="recommend">
			<common-title>
				<template #title>
					每日推荐
				</template>
				<template #custom>
					<view class="date">
						<uni-icons type="calendar" size="20"> </uni-icons>
						<uni-dateformat :date="Date.now()" format='dd号'></uni-dateformat>
					</view>
				</template>
			</common-title>
			<view class="content">
				<scroll-view scroll-x="true">
					<view class="box" v-for="random in randomList" :key="random._id">

						<image @click="goPreview(random._id)" :src="random.smallPicurl" mode="aspectFill"></image>
					</view>
				</scroll-view>

			</view>
		</view>
		<!-- 专题精选 -->
		<view class="topic">
			<common-title>
				<template #title>
					专题精选
				</template>
				<template #custom>
					<navigator url="/pages/category/category" open-type="reLaunch" class="more">
						更多
					</navigator>
				</template>
			</common-title>
			<view class="content">
				<topic-item v-for="topic in categoties" :topic='topic' :key='topic._id'></topic-item>
				<topic-item isMore></topic-item>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		onShareAppMessage,
		onShareTimeline,
	} from '@dcloudio/uni-app'
	import {
		apiGetBanners,
		apiGetDayRandom,
		apiGetNotices,
		apiGetCategory
	} from '@/api/apis.js'
	const banners = ref([])
	const randomList = ref([])
	const notices = ref([])
	const categoties = ref([])
	const getBanners = async () => {
		const res = await apiGetBanners()
		banners.value = res.data

	}
	const getDayRandom = async () => {
		try {
			const res = await apiGetDayRandom();
			randomList.value = res.data
		} catch (error) {
			console.log(error.error);
		}
	}

	const getNotices = async () => {
		const res = await apiGetNotices({
			select: true
		})
		notices.value = res.data
	}

	const getCategories = async () => {
		const res = await apiGetCategory({
			select: true
		})
		categoties.value = res.data

	}

	const goPreview = (id) => {
		uni.setStorageSync('classList', randomList.value)
		uni.navigateTo({
			url: '/pages/preview/preview?id=' + id
		});

	}

	// 分享给好友
	onShareAppMessage((option) => {
		return {
			title: 'wallora壁纸',
			path: '/pages/index/index'

		}
	});
	// 分享到朋友圈
	onShareTimeline((option) => {
		return {
			title: 'wallora壁纸',
		}
	});
	getBanners();
	getDayRandom();
	getNotices();
	getCategories();
</script>

<style lang="scss" scoped>
	.index-container {

		// 轮播图
		.banner {
			width: 750rpx;
			padding: 30rpx 0;

			swiper {
				width: 750rpx;
				height: 340rpx;

				swiper-item {
					width: 100%;
					height: 100%;
					padding: 0 30rpx;

					.link {
						width: 100%;
						height: 100%;
					}

					image {
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}
			}
		}

		// 公告
		.notice {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 690rpx;
			height: 80rpx;
			border-radius: 40rpx;
			background-color: #eee;
			padding: 0 10rpx;
			margin: 0 auto;
			overflow: hidden;

			.left {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 5rpx;
				width: 140rpx;
				text-align: left;

				:deep() {
					.uni-icons {
						color: $papr-color-primary !important;
					}
				}

				.title {
					color: $papr-color-primary;
					font-weight: bold;
					font-size: 28rpx;
				}
			}

			.center {
				flex: 1;
				height: 100%;

				swiper {
					height: 100%;

					swiper-item {
						height: 100%;
						color: $text-font-color-2;
						font-size: 30rpx;
						line-height: 80rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;

					}

				}

			}

			.right {
				width: 40rpx;
				text-align: right;

			}
		}

		// 每日推荐
		.recommend {

			padding-top: 50rpx;

			.date {
				display: flex;
				align-items: center;
				color: $papr-color-primary;

				:deep() {
					.uni-icons {
						color: $papr-color-primary !important;
					}
				}
			}

			.content {
				width: 720rpx;
				margin-left: 30rpx;
				margin-top: 30rpx;

				scroll-view {
					white-space: nowrap;

					.box {
						width: 220rpx;
						height: 280px;
						display: inline-block;
						margin-right: 15rpx;

						&:last-child {
							margin-right: 30rpx;
						}

						image {
							width: 100%;
							height: 100%;
							border-radius: 10rpx;
						}
					}
				}

			}

		}

		// 专题精选
		.topic {
			padding: 50rpx 0;

			.more {
				font-size: 32rpx;
				color: $text-font-color-2;
			}

			.content {
				margin-top: 30rpx;
				padding: 0 30rpx;
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				gap: 15rpx;
			}
		}
	}
</style>