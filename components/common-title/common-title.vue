<template>
	<view class="title-container">
		<view class="title">
			<slot name='title'></slot>
		</view>
		<view class="custom">
			<slot name='custom'></slot>
		</view>
	</view>
</template>

<script setup>
</script>

<style lang="scss" scoped>
	.title-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;

		.title {
			font-size: 40rpx;
			font-weight: 600;
		}
	}
</style>