<template>
	<view class="noticeLayout">
		<view class="title">
			<view class="tag" v-if='detail.select'>
				<uni-tag inverted text="置顶" type="error" />
			</view>
			<view class="font">{{detail.title}}</view>
		</view>

		<view class="info">
			<view class="item">{{detail.author}}</view>
			<view class="item">
				<uni-dateformat :date="Date.now()" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
			</view>
		</view>


		<view class="content">
			<mp-html :content="detail.content" />
			<!-- <rich-text :nodes="detail.content"></rich-text> -->
		</view>

		<view class="count">
			{{detail.view_count}}
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue'
	import {
		apiNoticeDetail
	} from '@/api/apis.js'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		log
	} from 'console'
	const noticeId = ref('')
	const detail = reactive({})
	onLoad((option) => {
		noticeId.value = option.id
		getNoticeDetail()
	})
	const getNoticeDetail = async () => {
		const res = await apiNoticeDetail({
			id: noticeId.value
		});
		Object.assign(detail, res.data)
	}
</script>

<style lang="scss" scoped>
	.noticeLayout {
		padding: 30rpx;

		.title {
			font-size: 40rpx;
			color: #111;
			line-height: 1.6em;
			padding-bottom: 30rpx;
			display: flex;

			.tag {
				transform: scale(0.8);
				transform-origin: left center;
				flex-shrink: 0;
			}

			.font {
				padding-left: 6rpx;
			}
		}

		.info {
			display: flex;
			align-items: center;
			color: #999;
			font-size: 28rpx;

			.item {
				padding-right: 20rpx;
			}
		}

		.content {
			padding: 50rpx 0;
		}

		.count {
			color: #999;
			font-size: 28rpx;
		}
	}
</style>