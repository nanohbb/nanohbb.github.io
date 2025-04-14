document.addEventListener('DOMContentLoaded', function() {
    // URL 파라미터에서 이름을 가져옵니다.
    var urlParams = new URLSearchParams(window.location.search);
    var to = urlParams.get("to");
    var type = urlParams.get("type");

    // 가져온 이름을 사용하여 텍스트를 변경합니다.
    var coupleTitle = document.querySelector("#couple");
    if (to === null) {
        coupleTitle.innerText = "ㅇㅇ 그리고 ㅇㅇ\n 저희 결혼합니다.";
    } else {
        switch (to) {
            case "qyely":
                coupleTitle.innerText = "테스트야";
                break;
            case "dpeac":
                coupleTitle.innerText = "테스트님";
                break;


            default:
                coupleTitle.innerText = to;
        }
    }
    if (type === 'ff') {
        coupleTitle.innerText += "\n나 시집간다!!";
    } else if(type === 'mf'){
        coupleTitle.innerText += "\n나 장가간다!!";
    } else if(type === 'fff'){
        coupleTitle.innerText += "\n저희 결혼합니다!!";
    }
});
