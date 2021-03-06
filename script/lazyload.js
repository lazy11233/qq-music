function lazyload(images) {
    let imgs = [].slice.call(images);
    
    if("IntersectionObserver" in window){
        let ovserver = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if(entry.intersectionRatio > 0){
                    loadImages(entry.target,() => {
                        ovserver.unobserve(entry.target);
                    })
                }
            })
        },{threshold: 0.01});
        imgs.forEach(img => ovserver.observe(img));
    }else {

        let onscroll = throttle(function(){
            console.log(new Date());
            if (imgs.length === 0) {
                return window.removeEventListener("scroll", onscroll);
            }
            imgs = imgs.filter(img => img.classList.contains("lazyload"));
            imgs.forEach(img => {
                if (inViewport) {
                    loadImages(img);
                }
            });
        },500);
    
        window.addEventListener("scroll", onscroll);
        window.dispatchEvent(new Event("scroll")); //解决页面未滚动时出现的图片不显示。
    }
}

function inViewport(img) {
    let { top, left, right, bottom } = img.getBoundimgClientRect();
    let vpWidth = document.documentElement.clientWidth;
    let vpHeight = document.documentElement.clientHeight;
    return (
        (top > 0 && top < vpHeight || bottom > 0 && bottom < vpHeight) &&
        (left > 0 && left < vpWidth || right > 0 && right < vpWidth)
    )
}

function loadImages(img,callback) {
    let image = new Image();
    image.src = img.dataset.src;
    image.onload = function () {
        img.src = image.src;
        img.classList.remove("lazyload");
        if(typeof callback === "function"){
            callback();
        }
    }

}

function throttle(func,wait) {
    let prev,timer;
    return function fn(){
        let curr = Date.now();
        let diff = curr -prev;
        if(!prev || diff >= wait){
            func();
            prev = curr;
        }else if(diff< wait){
            clearTimeout(timer);
            timer = setTimeout(fn,wait-diff);   
        }
    }
}