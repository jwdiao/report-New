/**
 * @since 初始化OCX组件
 * @param 需要初始化的object
 */
export function InitSpvx(ocxObj) {
	var languageType = 1, ret = ocxObj.SPV_Init(languageType);
	return ret;
}

/**
 * @since 反初始化OCX组件
 * @param ocxObj
 *            需要反初始化的object
 * @returns
 */
export function SPV_Uninit(ocxObj) {
	var ret = ocxObj.SPV_Uninit();
	return ret;
}
/**
 * @since 设置OCX本地参数
 * @param ocxObj
 *            需要设置参数的ocx
 */
export function SetLocalParam(ocxObj) {
	var devPxRa = screen.deviceXDPI / screen.logicalXDPI, height = $(ocxObj)
			.height()
			* devPxRa, width = $(ocxObj).width() * devPxRa, xml = '<?xml version="1.0" encoding="UTF-8"?> '
			+ '<localParam> '
			+ '<width>'
			+ width
			+ '</width> '
			+ '<height>'
			+ height
			+ '</height>'
			+ '<picType>0</picType> '
			+ '<capturePath>C:\\Hikvision</capturePath>'
			+ '<recordSize>2</recordSize>'
			+ '<recordPath>C:\\Hikvision</recordPath>' + '</localParam>', ret = ocxObj
			.SPV_SetLocalParam(xml);
	return ret;
}

/**
 * @since 通过摄像头id获取预览参数
 * @param camerauuid
 *            摄像头id
 * @param from
 *            0 重能 1 重卡
 * @param isReviewImg
 *            是否需要获取 实时监控截图
 * @returns
 */
export function getPreviewParamByUuid(camerauuid, from, isReviewImg, companyCode) {
	return getPreviewParam('', 0, from, camerauuid, isReviewImg, companyCode);
}

/**
 * @param camerauuid
 *            摄像头id
 * @param type
 *            设备类型 0 设备摄像头 1 区域摄像头
 * @param from
 *            0 重能 1 重卡
 * @param isReviewImg
 *            是否需要获取 实时监控截图
 */
export function getPreviewParam(name, type, from, camerauuid, isReviewImg, companyCode) {
	var url = "http://10.19.7.69:8083/videoSource/getPreviewParamByCamerauuid?type=" + type + "&from="
			+ from + '&isReviewImg=' + isReviewImg, returnObj;

	if (name)
		url += '&name=' + name;

	if (camerauuid)
		url += '&camerauuid=' + camerauuid;

	if (companyCode)
		url += '&companyCode=' + companyCode

	url = encodeURI(encodeURI(url));
	 $.ajax({
		url : url,
		type : "get",
		dataType : "json",
		cache : false,
		async : false,
		success : function(result) {
			var data = result.data, ret = result.ret;
			if (parseInt(ret) === 200) {
				if (isReviewImg) {
					var path = data.path, imgUrl = data.imgUrl;
					returnObj['path'] = path;
					returnObj['imgUrl'] = imgUrl;
				} else {
					returnObj = data.path;
				}
			}
		},
		error : function(e) {
			console.log(e);
		}
	}); 
  
	return returnObj;
}

/**
 * @since 通过设备设备名称获取预览参数
 * @param cameraName
 *            摄像头或者设备名称
 * @param type
 *            设备类型 0 设备摄像头 1 区域摄像头
 * @param from
 *            0 重能 1 重卡
 * @param isReviewImg
 *            是否需要获取 实时监控截图
 * @returns
 */
export function getPreviewParamByName(cameraName, type, from, isReviewImg) {
	return getPreviewParam(cameraName, type, from, '', isReviewImg);
}

/**
 * @since 设置工具栏按钮
 * @param ocxObj
 * @returns
 */
export function SetToolBar(ocxObj) {
	var tbars = '0,1,2,3,4,5,6', ret = ocxObj.SPV_SetToolBar(tbars);
	if (ret != 0) {
		//alert("设置工具条失败！");
	}

	return ret;
}

/**
 * @since 播放视频(OCX)
 * @param name
 *            视频地址
 */
export function playVideoByOcx(spvxOcx, url) {
	var ret = spvxOcx.SPV_StartPreview(url);
	return ret;
}

/**
 * @since 停止ocx预览
 * @param ocxObj
 *            需要停止预览的ocx
 * @returns
 */
export function stopPreview(ocxObj) {
	var ret = ocxObj.SPV_StopPreview();
	return ret;
}

/**
 * @since 抓图
 * @param ocxObj
 * @returns
 */
export function SnapPic(ocxObj) {
	var ret = ocxObj.SPV_SnapPic();
	return ret;
}

/**
 * @since 叠加文字
 * @param ocxObj
 * @param xml
 *            需要叠加的文字的xml
 * @returns
 */
export function SPV_SetOSDText(ocxObj, xml) {
	var ret = ocxObj.SPV_SetOSDText(xml);
	return ret;
}

/**
 * @since 解析浏览器参数获取对应值
 * @param name
 *            需要获取值得 参数
 * @returns
 */
export function getQueryStringParam(name) {
	var returnStr = null;
	if (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
			returnStr = unescape(r[2]);
	}
	return returnStr;
}

/**
 * @since 计算屏幕宽高
 * @param isWidth
 *            是否获取宽度 true是 false 否
 * @param isMax
 *            是否获取最最大值 true 是 false 否
 * @returns
 */
export function getScreenWidthAndHeight(isWidth, isMax) {
	var returnData = '';
	if (isWidth) {
		var clientWidth = document.body.clientWidth, offsetWidth = document.body.offsetWidth, scrollWidth = document.body.scrollWidth, width = window.screen.width, availWidth = window.screen.availWidth;
		returnData = (isMax === true) ? Math.max(clientWidth, offsetWidth,
				scrollWidth, width, availWidth) : Math.min(clientWidth,
				offsetWidth, scrollWidth, width, availWidth);
	} else {
		var clientHeight = document.body.clientHeight, offsetHeight = document.body.offsetHeight, scrollHeight = document.body.scrollHeight, height = window.screen.height, availHeight = window.screen.availHeight;
		returnData = (isMax === true) ? Math.max(clientHeight, offsetHeight,
				scrollHeight, height, availHeight) : Math.min(clientHeight,
				offsetHeight, scrollHeight, height, availHeight);
	}

	return returnData;
}
// ocx end