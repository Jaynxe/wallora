<template>
	<view class="catogoty-container gradient-bg">
		<custom-nav-bar title="分类"></custom-nav-bar>
		<view class="category-list">
			<topic-item v-for="topic in categories" :topic="topic" :key='topic._id'></topic-item>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		apiGetCategory
	} from '@/api/apis.js'
	import {
		onShareAppMessage,
		onShareTimeline,
	} from '@dcloudio/uni-app'
	const categories = ref([])
	const getCategories = async () => {
		const res = await apiGetCategory({
			pageSize:20
		})
		categories.value = res.data
	}
	// 分享给好友
	onShareAppMessage((option) => {
		return {
			title: 'wallora壁纸, 精选分类',
			path: '/pages/category/category'

		}
	});
	// 分享到朋友圈
	onShareTimeline((option) => {
		return {
			title: 'wallora壁纸, 精选分类',
		}
	});
	getCategories()
</script>

<style lang="scss" scoped>
	.catogoty-container {
		padding: 30rpx;

		.category-list {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 15rpx;
		}
	}
</style>