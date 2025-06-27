<template>
	<view class="topic-container">
		<navigator :url="`/pages/class-list/class-list?id=${topic._id}&name=${topic.name}`" class="box" v-if="!isMore">
			<image class="pic" :src="topic.picurl" mode="aspectFill"></image>
			<view class="mask">
				{{topic.name}}
			</view>
			<view class="tab">
				{{formatTimeDiff(topic.updateTime)}}
			</view>
		</navigator>
		<navigator v-if="isMore" url="/pages/category/category" open-type="reLaunch" class="box more">
			<image class="pic" src="/common/images/more.jpg" mode="aspectFill"></image>
			<view class="mask">
				<uni-icons type="more-filled" size="30" color="white"></uni-icons>
				<view>
					更多
				</view>
			</view>
		</navigator>
	</view>
</template>

<script setup>
	defineProps({
		isMore: {
			type: Boolean,
			defalut: false
		},
		topic: {
			type: Object,
			default: () => {
				return {
					name: '默认名称',
					picurl: '../../common/images/classify1.jpg',
					updateTime: Date.now() - 1000 * 60 * 60 * 24
				}
			}
		}
	})
	import {
		formatTimeDiff
	} from '@/utils/common.js'
</script>

<style lang="scss" scoped>
	.topic-container {
		.box {
			height: 340rpx;
			border-radius: 10rpx;
			overflow: hidden;
			position: relative;

			.pic {
				width: 100%;
				height: 100%;
			}

			.mask {
				position: absolute;
				width: 100%;
				height: 70rpx;
				font-size: 30rpx;
				left: 0;
				bottom: 0;
				background-color: rgba(0, 0, 0, 0.2);
				backdrop-filter: blur(20rpx);
				color: #fff;
				text-align: center;
				line-height: 70rpx;
				font-weight: 600;
			}

			.tab {
				position: absolute;
				top: 0;
				left: 0;
				background-color: rgba(250, 129, 90, 0.7);
				backdrop-filter: blur(20rpx);
				color: white;
				font-size: 24rpx;
				border-radius: 0 0 20rpx 0;
				padding: 6rpx 12rpx;
			}
		}

		.box.more {
			.mask {
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, 0.2);
				backdrop-filter: blur(20rpx);
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>