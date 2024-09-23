window.addEventListener("load", function () {
  // 콤마 기능
  function priceToString(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  // data.json을 로딩, 연결시킨다.
  const xhttp = new XMLHttpRequest();
  //    console.log(xhttp);
  xhttp.onreadystatechange = function (e) {
    const req = e.target;
    // console.log(req);

    if (req.readyState === XMLHttpRequest.DONE) {
      const str = req.response;
      // console.log(str);
      //   json문자열로 변화 JSON.parse(str)
      let obj = JSON.parse(str);
      //   console.log(obj);
      VISUAL_ARR = obj.visual;
      //   오늘의 물품
      TODAY_GOOD = obj.todaygood;
      // 세일 물품
      SALE_GOOD = obj.salegood;
      // new 물품
      NEW_GOOD = obj.newgood;
      //   console.log(VISUAL_ARR);
      // 추천 물품
      RECOMMEND_GOOD = obj.recommendgood;
      // ================
      showVisual(); // 비주얼을 화면에 배치
      //오늘의 물품 화면에 배치
      showToadyGood();
      // 세일 물품 화면 배치
      showSaleGood();
      // new물품 화면 배치
      showNewGood();
      // 추천 물품 화면 배치
      showRecommendGood();
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
  let TODAY_GOOD;
  let todayTag = this.document.getElementById("data-today");
  let todayTag2 = this.document.getElementById("data-today2");
  // 세일 물품
  let SALE_GOOD;
  let saleTag = this.document.getElementById("data-sale");
  // new 물품
  let NEW_GOOD;
  // console.log(NEW_GOOD);

  let newTag = this.document.getElementById("data-new");
  let newTagList = this.document.getElementById("data-new-list");
  // 추천 물품
  let RECOMMEND_GOOD
  let recommendTag = this.document.getElementById("data-recommend")
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
    const swVisualPlay = document.querySelector(".visual-play");
    swVisualPlay.addEventListener("click", function () {
      if (swVisualPlay.classList.contains("active")) {
        swVisual.autoplay.start();
        swVisualPlay.classList.remove("active");
      } else {
        swVisual.autoplay.stop();
        swVisualPlay.classList.add("active");
      }
    });
  } // = showVisual end =
  // 오늘의 물품 화면 출력 기능
  function showToadyGood() {
    let htmlTop = "";
    let htmlBottom = "";
    const topArr = TODAY_GOOD.filter(function (item, index) {
      // console.log(item);
      if (index < 4) {
        return item;
      }
    });
    const bottomArr = TODAY_GOOD.filter(function (item, index) {
      // console.log(item);
      if (index > 3) {
        return item;
      }
    });
    // console.log(topArr);
    topArr.forEach(function (item) {
      // console.log(item);
      let tag = `
      <div class="good-box">
      <!-- 제품이미지 -->
      <a href="${item.link}" class="good-img">
      <img src="../images/${item.pic}" alt="${item.name}"/>
      <span class="good-type">${item.tag}</span>
      </a>
      <!-- 제품정보 -->
      <a href="${item.link}" class="good-info">
      <em>${item.name}</em>(<em>${item.unit}</em>)
      </a>
      <!-- 제품가격 -->
      <a href="${item.link}" class="good-info-price">
        ${priceToString(item.price)} <em>원</em>
      </a>
      <!-- 장바구니 이미지 -->
      <button class="good-add-cart"></button>
    </div>
      `;
      htmlTop += tag;
    });
    bottomArr.forEach(function (item) {
      // console.log(item);
      let tag = `
      <div class="good-box">
      <!-- 제품이미지 -->
      <a href="${item.link}" class="good-img">
      <img src="../images/${item.pic}" alt="${item.name}"/>
      <span class="good-type">${item.tag}</span>
      </a>
      <!-- 제품정보 -->
      <a href="${item.link}" class="good-info">
      <em>${item.name}</em>(<em>${item.unit}</em>)
      </a>
      <!-- 제품가격 -->
      <a href="${item.link}" class="good-info-price">
        ${priceToString(item.price)} <em>원</em>
      </a>
      <!-- 장바구니 이미지 -->
      <button class="good-add-cart"></button>
    </div>
      `;

      htmlBottom += tag;
    });

    todayTag.innerHTML = htmlTop;
    todayTag2.innerHTML = htmlBottom;
  }
  // 세일 물품 화면 출력 기능
  function showSaleGood() {
    let html = `
    <div class="swiper sw-sale">
    <div class="swiper-wrapper">
    `;
    SALE_GOOD.forEach(function (item) {
      // console.log(item);
      let tag = `
      <div class= "swiper-slide">
      <div class="good-box">
      <!-- 제품이미지 -->
      <a href="${item.link}" class="good-img">
      <img src="images/${item.pic}" alt="${item.name}">
      <span class="good-type">${item.tag}</span>
      </a>
      <!-- 제품정보 -->
      <a href="${item.link}" class="good-info">
      <em>${item.name}</em>(<em>${item.unit}</em>)
</a>
<!-- 제품가격 -->
<a href="${item.link}" class="good-info-price">
    ${priceToString(item.price)}<em>원</em>
</a>
<!-- 장바구니 이미지 -->
<button class="good-add-cart"></button>
</div>
</div>
      `;
      html += tag;
    });

    html += `
    </div>
    </div>`;

    saleTag.innerHTML = html;
    // swiper
    const swSale = new Swiper(".sw-sale", {
      slidesPerView: 3, // 보여지는 슬라이드 개수
      spaceBetween: 16, // 슬라이드 간의 간격
      slidesPerGroup: 3, // 넘어가는 슬라이드 개수
      navigation: {
        prevEl: ".sale .slide-prev",
        nextEl: ".sale .slide-next",
      },
      pagination: {
        // 페이지 수 출력됨.
        el: ".sale .slide-pg",
        type: "fraction", // type을 하지 않으면 점으로 나옴.
      },
    });
  }
  // new 물품 화면 출력 기능
  function showNewGood() {
    // 첫번째 화면 출력(왼쪽)
    let obj = NEW_GOOD[0];
    // console.log(NEW_GOOD);
    let newgoodFirst = `
  <a href="${obj.link}" class="new-img">
  <img src="images/${obj.pic}" alt="${obj.title}"/>
  </a>
  <a href="${obj.link}" class="new-title">
  ${obj.title}
  </a>
  <a href="${obj.link}" class="new-txt">
  ${obj.txt}
  </a>`;
    newTag.innerHTML = newgoodFirst;

    // 두번째 화면 출력(오른쪽)
    let html = "";
    NEW_GOOD.forEach(function (item, index) {
      // console.log(item);
      let tag = "";
      if (index !== 0) {
        tag = `
        <div class="new-box">
        <a href="${item.link}" class="new-box-img">
          <img src="images/${item.pic}" alt="${item.title}"/>
        </a>
        <a href="${item.link}" class="new-box-title">
          ${item.title}
        </a>
        </div>
        `;
        html += tag;
        newTagList.innerHTML = html;
      }
    });
  }
  // 추천 물품 화면 출력 기능
  function showRecommendGood() {
    let html = `
    <div class="swiper sw-recommend">
    <div class="swiper-wrapper">
    `;
    RECOMMEND_GOOD.forEach(function (item) {
      // console.log(item);
      let tag = `
      <div class= "swiper-slide">
      <div class="good-box">
      <!-- 제품이미지 -->
      <a href="${item.link}" class="good-img">
      <img src="images/${item.pic}" alt="${item.name}">
      <span class="good-type">${item.tag}</span>
      </a>
      <!-- 제품정보 -->
      <a href="${item.link}" class="good-info">
      <em>${item.name}</em>(<em>${item.unit}</em>)
</a>
<!-- 제품가격 -->
<a href="${item.link}" class="good-info-price">
    ${priceToString(item.price)}<em>원</em>
</a>
<!-- 장바구니 이미지 -->
<button class="good-add-cart"></button>
</div>
</div>
      `;
      html += tag;
    });

    html += `
    </div>
    </div>`;

    recommendTag.innerHTML = html;
    // swiper
    const swSale = new Swiper(".sw-recommend", {
      slidesPerView: 3, // 보여지는 슬라이드 개수
      spaceBetween: 16, // 슬라이드 간의 간격
      slidesPerGroup: 3, // 넘어가는 슬라이드 개수
      navigation: {
        prevEl: ".recommend .slide-prev",
        nextEl: ".recommend .slide-next",
      },
      pagination: {
        // 페이지 수 출력됨.
        el: ".recommend .slide-pg",
        type: "fraction", // type을 하지 않으면 점으로 나옴.
      },
    });
  }
  //   ==========================end
});
