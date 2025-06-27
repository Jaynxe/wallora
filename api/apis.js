import {
	request
} from '@/utils/request.js'

// 获取首页轮播图
export function apiGetBanners() {
	return request({
		url: '/homeBanner'
	})

}

// 获取首页每日推荐
export function apiGetDayRandom() {
	return request({
		url: '/randomWall'
	})
}

// 获取首页公告
export function apiGetNotices(data = {}) {
	return request({
		url: '/wallNewsList',
		data
	})
}
// 获取分类列表
export function apiGetCategory(data = {}) {
	return request({
		url: '/classify',
		data
	})
}
// 获取某个分类的图片列表
export function apiGetClassList(data = {}) {
	return request({
		url: '/wallList',
		data
	})
}
// 获取我的评分或者我的下载壁纸列表
export function apiGetHistoryClassList(data = {}) {
	return request({
		url: '/userWallList',
		data
	})
}
// 提交评分
export function apiSubmitRate(data = {}) {
	return request({
		url: '/setupScore',
		data,
	})
}

// 写入下载记录
export function apiWriteDownload(data = {}) {
	return request({
		url: '/downloadWall',
		data,
	})
}

// 壁纸详情
export function apiGetDetailWall(data = {}) {
	return request({
		url: '/detailWall',
		data
	})
}
// 获取用户信息
export function apiUserInfo(data = {}) {
	return request({
		url: "/userInfo",
		data
	})
}
// 获取公告详情
export function apiNoticeDetail(data = {}) {
	return request({
		url: "/wallNewsDetail",
		data
	})
}

// 搜索
export function apiSearchData(data = {}) {
	return request({
		url: "/searchWall",
		data
	})
}