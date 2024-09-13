window.addEventListener("load", function () {
  // data.json을 로딩, 연결시킨다.
  const xhttp = new XMLHttpRequest();
  //    console.log(xhttp);
  xhttp.onreadystatechange = function (e) {
    const req = e.target;
    // console.log(req);

    if (req.readyState === XMLHttpRequest.DONE) {
      const str = req.response;
      console.log(str);
      //   json문자열로 변화 JSON.parse(str)
      let obj = JSON.parse(str);
      //   console.log(obj);
      VISUAL_ARR = obj.visual;
      //   오늘의 물품

      //   console.log(VISUAL_ARR);
      // ================
      showVisual(); // 비주얼을 화면에 배치
      //오늘의 물품 화면에 배치
    }
  };
  //   자료호출
  xhttp.open("GET", "data.json");
  xhttp.send();
  //   ============================================
  // 비주얼 슬라이드==
  let VISUAL_ARR;
  let visualTag = this.document.getElementById("data-visual");
  //   오늘의 물품
  // ==============================================
  // 비주얼 화면 출력 기능
  function showVisual() {
    let html = "";
    VISUAL_ARR.forEach(function (item) {
      //   console.log(item);
      const tag = `
    <div class="swiper-slide">
                <div class="visual-slide-page">
                  <a href="${item.link}">
                    <img src="images/${item.pic}" alt="${item.name}">
                  </a>
                </div>
               </div>
    `;
      html += tag;
    });
    visualTag.innerHTML = html;
    // swiper 기능 ====================
    const swVisual = new Swiper(".sw-visual", {
      loop: true, // loop : 무한으로 도는 것.
      autoplay: {
        delay: 2500,
        disableOnInteraction: false, // 상관없이 계속 autoplay.
      },
      navigation: {
        prevEl: ".visual-prev",
        nextEl: ".visual-next",
      },
      pagination: {
        // 하나하나 넘어가는 것.
        el: ".visual-pg",
        type: "fraction",
      },
    });
// 비주얼 슬라이드 머춤 기능
const swVisualPlay = document.querySelector(".visual-play")
swVisualPlay.addEventListener("click" , function(){
  if(swVisualPlay.classList.contains("active")){
    swVisual.autoplay.start()
    swVisualPlay.classList.remove("active")
  }else{
    swVisual.autoplay.stop()
    swVisualPlay.classList.add("active")

  }
})

  } // = showVisual end =

  //   ==========================end
});
