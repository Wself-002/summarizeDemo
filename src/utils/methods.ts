import { timestampToTimeConversionResult } from './types';
/**
 * 
 * @param len
 * @returns 随机字符串(字母 + 数字)
 */
export const getRandomAlphaNum = (len: number) => {
    let rdmString = "";
    for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
    return rdmString.substr(0, len);
};


/**
 * 
 * @param android_dp 
 * @param android_apk 
 * @param ios_dep 
 * @param ios_apk
 * @function android/ios通用 deeplink跳转,无法跳转则去下载app 
 */
export const deeplinkOrDownload = (android_dp: string, android_apk: string, ios_dep: string, ios_apk: string) => {
    const userAgent = navigator.userAgent;
    const isAndroid = /Android/i.test(userAgent) ? true : false;
    if (isAndroid) {
        var iframe = document.createElement("iframe");
        iframe.src = android_dp;
        iframe.style.display = "none";
        document.body.appendChild(iframe);
        setTimeout(function () {
            if (document.visibilityState === "visible") {
                window.location.href = android_apk;
            }
            document.body.removeChild(iframe);
        }, 1500);
    } else {
        window.location.href = ios_dep;
        setTimeout(() => {
            window.location.href = ios_apk;
        }, 0);
    }
}

/**
 *
 * @param {*} startDate
 * @param {*} endDate
 * @returns true/false  eg:开始日期跟结束日期之间的跨度是否为1个月
 * (2024-10-01/2024-10-31,2024-10-02/2024-11-01)true
 * (2024-10-01/2024-11-01,2024-10-02/2024-11-02)false
 */
export const isOneMonthInterval = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // 计算开始和结束的年月
    const startYear = start.getFullYear();
    const startMonth = start.getMonth(); // 0-11
    const endYear = end.getFullYear();
    const endMonth = end.getMonth(); // 0-11

    // 计算年和月的差异
    const monthDiff = (endYear - startYear) * 12 + (endMonth - startMonth);

    // 同一个月内的情况
    if (monthDiff === 0) {
        return true; // 在同一个月内，直接返回 true
    }

    // 跨月的情况
    if (monthDiff === 1) {
        // 确保结束日期在下一个月的相应日期之前
        return end.getDate() < start.getDate();
    }

    return false; // 其他情况返回 false
};

/**
 * 
 * @param {*} response 完整的后台返回内容
 * @param {*} fileName 文件名
 * 后台返回文件流,前端下载文件方法
 */
export const downloadFile = (response: any, fileName?: string) => {
    let time_file_name = new Date().getTime() + ".xlsx";
    if (!fileName) {
        const disposition = response.headers["content-disposition"];
        fileName = disposition.match(/filename=(.*)/)[1]
            ? decodeURIComponent(disposition.match(/filename=(.*)/)[1])
            : time_file_name;
    }
    const blob = new Blob([response.data], {
        type: response.headers["content-type"],
    });
    const url = window.URL.createObjectURL(blob);
    if (url) {
        let a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.setAttribute("download", decodeURIComponent(fileName));
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
};

/**
*
* @param targetDate
* @returns {status:true/false,year:xx,month:xx,day:xx,hour:xx,minute:xx,second:xx}
* @tips 传入时间戳,获取当前时间戳对应的年/月/日/时/分/秒
*/
export const timestampToTimeConversion = (
    targetDate: number | string
): timestampToTimeConversionResult => {
    if (typeof targetDate != "number" && typeof targetDate != "string")
        return { status: false, msg: "请检查传入数值类型" };
    let date: number;
    if (String(targetDate).length == 10) {
        date = parseInt(String(targetDate)) * 1000;
    } else if (String(targetDate).length == 13) {
        date = parseInt(String(targetDate));
    } else {
        return { status: false, msg: "请检查输入值长度,允许长度为10/13位" };
    }
    const dateTime = new Date(date);
    const year = dateTime.getFullYear();
    const month = ("0" + (dateTime.getMonth() + 1)).slice(-2);
    const day = ("0" + dateTime.getDate()).slice(-2);
    const hour = ("0" + dateTime.getHours()).slice(-2);
    const minute = ("0" + dateTime.getMinutes()).slice(-2);
    const second = ("0" + dateTime.getSeconds()).slice(-2);
    return {
        status: true,
        year,
        month,
        day,
        hour,
        minute,
        second,
    };
};

/**
 * @param urlStr
 * @returns {xx:xx,xx:xx};
 * @tips 传入的是完整的url地址   返回的是?后边的参数对象
 */
export const getUrlDataFN = (
    urlStr: string
): Record<string, string | undefined> => {
    const urlObj: Record<string, string | undefined> = {}; // 使用 Record 来定义对象类型
    if (urlStr.indexOf("?") === -1) return {}; // 通常返回空对象而不是 false，除非你有特殊理由

    const index = urlStr.indexOf("?");
    if (index !== -1) {
        const dataStr = urlStr.substr(index + 1);
        const decode_str = decodeURIComponent(dataStr);
        const dataArr = decode_str.split("&");
        dataArr.forEach((str) => {
            if (str.includes("token=")) {
                const token_index = str.indexOf("=");
                const key = str.slice(0, token_index);
                const value = str.slice(token_index + 1);
                urlObj[key] = value;
            } else {
                const [key, value = undefined] = str.split("=", 2); // 使用解构和默认值
                urlObj[key] = value;
            }
        });
    }

    return urlObj;
};

/**
 * @param object
 * @returns a=1&b=2&c=3
 */
export const objToQueryString = (obj: object) => {
    // 初始化一个空字符串用于存储结果
    let queryString = "";

    // 遍历对象的每个属性
    for (let key in obj) {
        // 确保属性是对象自身的属性（排除继承的属性）
        if (obj.hasOwnProperty(key)) {
            // 使用 encodeURIComponent 来处理特殊字符
            // @ts-ignore
            let value = encodeURIComponent(obj[key]);

            // 如果是第一个键值对，则不添加&符号
            if (queryString === "") {
                queryString = `${key}=${value}`;
            } else {
                // 否则，添加&符号和新的键值对
                queryString += `&${key}=${value}`;
            }
        }
    }

    return queryString;
};

/**
* 防抖函数
*/
export function debounce<T extends (...args: any[]) => any>(
    fn: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout> | undefined; // 更好的做法是使用 undefined 而不是不初始化
    let isFirstCall: boolean = true;

    return (...args: Parameters<T>): void => {
        if (isFirstCall) {
            // 首次调用，立即执行函数
            fn(...args);
            isFirstCall = false; // 更新为已不是首次调用
        }
        if (timeout !== undefined) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

/**
 * 节流函数
 */
export function throttle<T extends (...args: any[]) => any>(
    fn: T,
    limit: number
): (...args: Parameters<T>) => void {
    let lastFunc: ReturnType<typeof setTimeout>;
    let lastRan: number;

    return (...args: Parameters<T>): void => {
        if (!lastRan) {
            fn(...args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                if (Date.now() - lastRan >= limit) {
                    fn(...args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

/**
 * 倒计时函数
 */
export function startCountdown(duration: number, callback: any, timeSpeed = 1000): void {
    let remaining = duration;
    const interval = setInterval(() => {
        remaining--;
        if (remaining >= 0) {
            // 调用回调函数，传入当前剩余秒数
            callback(remaining);
        } else {
            // 倒计时结束，清除定时器
            clearInterval(interval);
            // 可以选择在这里调用一次回调函数，传入0或null表示结束
            callback(0);
        }
    }, timeSpeed); // 每秒更新一次
}


/**
* 判断是否是数组
*/
export function isArrowFunction(arr: any) {
    return Array.isArray(arr) ? (Object.prototype.toString.call(arr) === '[object Array]' ? true : false) : false
}