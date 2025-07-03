export const SYSTEM_INFO = uni.getSystemInfoSync();

export const getStatusBarHeight = () => SYSTEM_INFO.statusBarHeight || 15;

export const getTitleBarHeight = () => {
	if (uni.getMenuButtonBoundingClientRect) {
		const {
			top,
			height
		} = uni.getMenuButtonBoundingClientRect();
		return (top - getStatusBarHeight()) * 2 + height;
	} else {
		return 45;
	}
}

export const getLeftIconLeft = () => {

	// #ifdef MP-TOUTIAO 
	const fleftIcon: {
		left,
		width
	} = tt.getcustomButtonBoundingclientRect();
	return left + parseInt(width);
	// #endif 
	// #ifndef MP-TOUTIAO 
	return 0;
	// #endif
}

export const getNavBarHeight = () => getStatusBarHeight() + getTitleBarHeight();