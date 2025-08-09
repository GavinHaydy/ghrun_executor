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
    if (domain !== 'localhost' && !options.domain) {
        options.domain = domain
    }
    if (!('path' in options)) options.path = '/'
    if (!('secure' in options)) options.secure = window.location.protocol === 'https:'
    if (!('sameSite' in options)) options.sameSite = 'None'

    return originalSet(key, value, options)
}

export default Cookies
