export function formatTimeDiff(timestamp) {
	const now = Date.now();
	const diff = now - timestamp;

	if (diff < 0) return null; // 未来时间，直接返回 null

	const minute = 60 * 1000;
	const hour = 60 * minute;
	const day = 24 * hour;
	const month = 30 * day; // 粗略估计一个月为30天

	if (diff < minute) {
		return '1分钟前更新';
	} else if (diff < hour) {
		const minutes = Math.floor(diff / minute);
		return `${minutes}分钟前更新`;
	} else if (diff < day) {
		const hours = Math.floor(diff / hour);
		return `${hours}小时前更新`;
	} else if (diff < month) {
		const days = Math.floor(diff / day);
		return `${days}天前更新`;
	} else if (diff < 3 * month) {
		const months = Math.floor(diff / month);
		return `${months}个月前更新`;
	} else {
		return null;
	}
}


export function gotoHome() {
	uni.showModal({
		title: "提示",
		content: "页面有误将返回首页 ",
		showCancel: false,
		success: (res) => {
			if(res.confirm){
				uni.reLaunch({
					url:'/pages/index/index'
				})
			}
		}
	})
}