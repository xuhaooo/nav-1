let log = console.log.bind(console)

const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')

const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    {logo: 'G', url: 'https://www.google.com'},
    {logo: 'S', url: 'https://www.stackoverflow.com'},
    {logo: 'J', url: 'https://www.juejin.cn'},
    {logo: 'B', url: 'https://www.baidu.com'},
    {logo: 'G', url: 'https://www.github.com'}
]

const simplifyUrl = (url) => {
    return url.replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '')
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index)=>{
        const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-close5"></use>
                    </svg>
                </div>
            </div>
        </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url, '_self')
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    })
}
render()


$('.addButton').on('click', ()=>{
    let url = window.prompt('请问你想要添加的网址是啥？')
    if(url.indexOf('http') !== 0){
        url = 'https://' + url
    }
    hashMap.push({
        logo: simplifyUrl(url)[0],
        logoType: 'text',
        url: url
    })
    render()
})

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}
 
$(document).on('keypress', '.search', (e) => {
    e.stopPropagation()
})

let timeOut = 0
$(document).on("touchstart",  function(e) {
    // 长按事件触发
    timeOutEvent = setTimeout(function() {
      timeOutEvent = 0;
        $('.close').addClass('show')
    }, 500);
    //长按500毫秒
  });
  


$(document).on('keypress', (e)=>{
    const {key} = e
    for (let i = 0; i < hashMap.length; i++) {
        if(hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url, '_self')
        }
    }
})