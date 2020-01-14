// 수입산
if(o("chrome") && !o("edge")) {
    // 모드에 따라서
    let fontColor = 'white'
    let bgColor = '#324472'
    if (env.PUB_ENV == 'staging') {
        bgColor = '#873b53'
    } else if (env.PUB_ENV == 'production') {
        bgColor = '#242527'
    }
    console.log(
        '%c Beautiful Tools ' + env.VERSION + ' %c Have a Beautiful Day! %c ' + env.PUB_ENV + ' ',
        'background: #35495e; padding: 2px; color: #fff; border-radius: 3px 0 0 3px; font-size: 12px;',
        'background: #ff665e; padding: 2px; color: #fff; font-size: 12px;',
        'background: ' + bgColor + '; padding: 2px; color: ' + fontColor + '; border-radius: 0 3px 3px 0; font-size: 12px;'
    )
} else {
    console.log(' Beautiful Tools ' + env.VERSION + ' - Have a Beautiful Day! | ' + env.PUB_ENV + ' ')
}
function o(n) {
    return -1 < navigator.userAgent.toLowerCase().indexOf(n)
}
