import Cookies from "js-cookie";

function getTopDomain() {
    const host = window.location.hostname
    const parts = host.split('.')
    if (parts.length >= 2) {
        return parts.slice(-2).join('.')
    }
    return host
}

// 备份原始 set 方法
const originalSet = Cookies.set.bind(Cookies)

// 覆写 set 方法，自动带上 domain 等配置
Cookies.set = function (key: string, value: string, options: Cookies.CookieAttributes = {}) {
    const domain = getTopDomain()
    // 本地环境兼容
    const isLocalhost = domain === "localhost" || domain === "127.0.0.1"

    if (!options.domain && !isLocalhost) {
        options.domain = domain  // 生产环境跨子域
    }
    if (!('path' in options)) options.path = '/'

    if (!('secure' in options)) options.secure = !isLocalhost && window.location.protocol === 'https:'

    if (!('sameSite' in options)) options.sameSite = isLocalhost ? "Lax" : 'None'

    return originalSet(key, value, options)
}

export const clearAllCookies = () =>{
    const domain = window.location.hostname; // 或顶级域名 getTopDomain()
    Object.keys(Cookies.get()).forEach((key) => {
        if (!['theme','lang'].includes( key)){
            Cookies.remove(key, { path: "/", domain });
        }
    });
}

export default Cookies
