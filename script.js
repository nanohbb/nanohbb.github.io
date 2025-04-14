document.addEventListener("DOMContentLoaded", function () {
    // makeMap();
    addPhotos();
    getDDay();
    accordion();

    // Kakao.init('5b530fd96142df42568888e8aba54815'); // 사용하려는 앱의 JavaScript 키 입력

    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });
    document.addEventListener('dragstart', function (e) {
        e.preventDefault();
    });
    document.addEventListener('keydown', function (e) {
        if (e.keyCode === 123) {
            e.preventDefault();
        }
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
        }
        if (e.ctrlKey && e.keyCode === 67) {
            e.preventDefault();
        }
        if (e.ctrlKey && e.keyCode === 86) {
            e.preventDefault();
        }

    });
});

/*카카오 맵 불러오기*/
function makeMap() {
    var mapContainer = document.getElementById('map'),
        mapOption = {
            center: new kakao.maps.LatLng(37.517701, 126.899744),
            level: 5
        };

    var map = new kakao.maps.Map(mapContainer, mapOption);
    map.setDraggable(false);
    map.setZoomable(false);

    var geocoderCenter = new kakao.maps.services.Geocoder();
    geocoderCenter.addressSearch('주소', function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
            var centerCords = new kakao.maps.LatLng(result[0].y, result[0].x);

            var geocoder = new kakao.maps.services.Geocoder();
            geocoder.addressSearch('주소', function (result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    var cords = new kakao.maps.LatLng(result[0].y, result[0].x);

                    var marker = new kakao.maps.Marker({
                        map: map,
                        position: cords
                    });

                    var infowindow = new kakao.maps.InfoWindow({
                        content: '<div style="width:150px;text-align:center;padding:6px 0;font-size: 18px;">상균♡다미<br/>루클라비 수원</div>'
                    });
                    infowindow.open(map, marker);

                    map.setCenter(centerCords);
                }
            });
        }
    });

}

function addPhotos() {
    const photoCarousel = document.getElementById("photoCarousel");
    const thumbnailContainer = document.querySelector(".thumbnail-container");

    // Clear the thumbnail container before adding new images.
    thumbnailContainer.innerHTML = '';

    const photoPrefix = 'img/photos/';
    const photoSuffix = '.jpeg';
    let photoName = '';

    for (let i = 1; i <= 16; i++) {
        const baseDiv = document.createElement("div");
        baseDiv.className = i == 1 ? "carousel-item active" : "carousel-item";

        photoName = photoPrefix + i + photoSuffix;

        const baseImg = document.createElement("img");
        baseImg.className = "d-block w-100";
        baseImg.src = photoName;

        baseDiv.appendChild(baseImg);
        photoCarousel.appendChild(baseDiv);

        const thumbnailImg = document.createElement("img");
        thumbnailImg.className = "img-thumbnail";
        thumbnailImg.src = photoName;
        thumbnailImg.dataset.target = "#carouselExampleIndicators";
        thumbnailImg.dataset.slideTo = i - 1;

        thumbnailContainer.appendChild(thumbnailImg);
    }
}

// 카카오 페이
function payLink(receiver) {
    let payLinkList = {
        'kw': 'https://qr.kakaopay.com/FR2',
        'hy': 'https://qr.kakaopay.com/FOL'
    };

    location.href = payLinkList[receiver];
}

function copyAccount(receiver) {
    let accountList = {
        'sg': '110424415060', //신랑
        'dm': '70490200007572', // 신부
        'sgf': '01044891533', // 신랑 부
        'sgm': '01046771533', // 신랑 모
        'dmf': '16702382795', // 신부 부
        'dmm': '3020238359811' // 신부 모
    };

    var tempElem = document.createElement('textarea');
    tempElem.value = accountList[receiver];
    document.body.appendChild(tempElem);

    tempElem.select();
    document.execCommand("copy");
    document.body.removeChild(tempElem);

    alert("계좌번호 복사완료!");
}

function getDDay() {
    const setDate = new Date("2025-07-05T00:00:00+0900");
    const setDateYear = setDate.getFullYear();
    const setDateMonth = setDate.getMonth() + 1;
    const setDateDay = setDate.getDate();

    const now = new Date();

    const distance = setDate.getTime() - now.getTime();

    const day = Math.ceil(distance / (1000 * 60 * 60 * 24));

    const dDayElem = document.getElementById("dday");

    if (day === 0) {
        dDayElem.parentElement.innerHTML = ' 상균<span class="highlight">♥</span> 다미의 결혼식이 <span class="highlight fw-bold">오늘</span> 입니다.';
    } else if (day <= -1) {
        dDayElem.innerHTML = 0 + '일';
    } else {
        dDayElem.innerHTML = day + '일';
    }
}

function accordion() {
    document.querySelectorAll('.accordion').forEach(function (accordion) {
        accordion.addEventListener('show.bs.collapse', function (e) {
            const accordionItem = e.target.closest('.accordion-item');

            // 뷰포트 높이의 절반 구하기
            const halfViewportHeight = window.innerHeight / 2;

            // 아코디언 항목의 높이의 절반 구하기 (이 시점에서 아코디언 항목이 완전히 열리지 않았을 수 있으므로 근사치)
            const halfAccordionHeight = accordionItem.clientHeight / 2;

            // 화면 중앙으로 조정된 스크롤 위치 계산
            const scrollPosition = accordionItem.offsetTop - halfViewportHeight + halfAccordionHeight;

            window.scroll({
                top: scrollPosition,
                behavior: 'smooth'
            });
        });
    });
}