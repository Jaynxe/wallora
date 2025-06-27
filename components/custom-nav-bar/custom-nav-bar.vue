<template>
	<view class="cnv-container">
		<view class="nav-bar">
			<view class="status-bar" :style="{height:statusBarHeight + 'px'}"></view>
			<view class="title-bar" :style="{height:titleBarHeight + 'px'}">
				<view class="title">
					{{title}}
				</view>
				<navigator url="/pages/search/search" class="search">
					<uni-icons type="search" size="18" color='#888'></uni-icons>
					<text>搜索</text>
				</navigator>
			</view>
		</view>
		<view class="fill" :style="{height:statusBarHeight + titleBarHeight + 'px'}"></view>
	</view>
</template>

<script setup>
	import {
		computed,
		ref
	} from 'vue';
	import {
		getStatusBarHeight,
		getTitleBarHeight
	} from "@/utils/system.js"
	
	defineProps({
		title:{
			type:String,
			default:'papr壁纸'
		}
	})
	const statusBarHeight = ref(getStatusBarHeight())
	const titleBarHeight = ref(getTitleBarHeight())
	
</script>

<style lang="scss" scoped>
	.cnv-container {
		.nav-bar {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 10;
			background:
				linear-gradient(to bottom, rgba(0, 0, 0, 0), #fff 400rpx),
				linear-gradient(to right, #beecd8 28%, #F4E2D8 80%);

			.status-bar {
				
			}

			.title-bar {
				display: flex;
				align-items: center;
				gap: 20rpx;
				padding: 0 30rpx;

				.title {
					font-size: 22px;
					font-weight: 700;
					color: $text-font-color-1;
				}

				.search {
					width: 220rpx;
					height: 56rpx;
					border-radius: 60rpx;
					background: rgba(255, 255, 255, 0.4);
					border: 1px solid #fff;
					margin-left: 30rpx;
					color: #999;
					font-size: 28rpx;
					display: flex;
					align-items: center;
					padding-left: 10rpx;

				}
			}

		}

		.fill {}
	}
</style>