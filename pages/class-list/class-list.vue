<template>
	<view class="class-container">
		<view class="loading" v-if="!classList.length && hasMore">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		<view class="content">
			<navigator :url="`/pages/preview/preview?id=${image._id}`" class="item" v-for="image in classList"
				:key="image._id">
				<image :src="image.smallPicurl" mode="aspectFill"></image>
			</navigator>

		</view>
		<view class="loading" v-if="classList.length || !hasMore">
			<uni-load-more :status="hasMore? 'loading':'noMore'"></uni-load-more>
		</view>
		<view class="safe-area-inset-bottom"></view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		onLoad,
		onReachBottom,
		onShareAppMessage,
		onShareTimeline,
		onUnload
	} from '@dcloudio/uni-app'
	import {
		apiGetClassList,
		apiGetHistoryClassList
	} from '@/api/apis.js'
	import {
		gotoHome
	} from '@/utils/common.js'
	let pageName;
	const queryParams = {
		pageNum: 1,
		pageSize: 12
	}
	const hasMore = ref(true)
	const classList = ref([])

	const getClassList = async () => {
		let res
		if (queryParams.type) {
			res = await apiGetHistoryClassList(queryParams)
		}else{
			res = await apiGetClassList(queryParams)
		}

		if (queryParams.pageSize > res.data.length) {
			hasMore.value = false
		}

		classList.value = [...classList.value, ...res.data]
		uni.setStorageSync('classList', classList.value)
	}

	onLoad((option) => {
		if (option.id) {
			queryParams.classid = option.id
		}
		// 用于我的下载和评分
		if (option.type) {
			queryParams.type = option.type
		}
		pageName = option.name
		// 修改导航标题
		uni.setNavigationBarTitle({
			title: option.name || ''
		})
		getClassList()
	})

	onReachBottom(() => {
		if (!hasMore.value) {
			return
		}
		queryParams.pageNum++;
		getClassList()
	})

	// 分享给好友
	onShareAppMessage((option) => {
		return {
			title: 'wallora壁纸' + pageName,
			path: '/pages/class-list/class-list?id=' + queryParams.classid + '&name=' + pageName

		}
	});
	// 分享到朋友圈
	onShareTimeline((option) => {
		return {
			title: 'wallora壁纸' + pageName,
			query: "id=" + queryParams.classid + "&name=" + pageName
		}
	});
	onUnload(() => {
		uni.removeStorageSync('classList')
	})
</script>

<style lang="scss" scoped>
	.class-container {
		.content {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 5rpx;
			padding: 5rpx;

			.item {
				height: 440rpx;

				image {
					width: 100%;
					height: 100%;
					display: block;
				}
			}
		}

		.loading {
			padding: 30rpx 0;
		}
	}
</style>