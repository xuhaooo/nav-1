let log = console.log.bind(console)

$('.addButton').on('click', ()=>{
    let url = window.prompt('请问你想要添加的网址是啥？')
    if(url.indexOf('http') !== 0){
        url = 'https://' + url
    }
})