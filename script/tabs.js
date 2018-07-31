document.addEventListener("click",function (event) {
    let target = event.target;
    if(!target.classList.contains("nav-item")){
        return;
    }

    [].forEach.call(target.parentElement.children,child => {
        child.classList.remove("active");
    });
    target.classList.add("active");

    let view = target.getAttribute("data-view");
    let viewTarget = document.querySelector("." + view);

    [].forEach.call(viewTarget.parentElement.children, child => {
        child.classList.add("hide");
    })
    viewTarget.classList.remove("hide");

    // let content = document.querySelector();
    // console.log(target.getAttribute("data-view"));
    // if(content){
    //     [].forEach.call(content.parentElement.childern,child => {
    //         child.style.display = "none";
    //     });
    //     content.style.display = "block";
    // }
})