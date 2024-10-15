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
      // 세일물품
      SALE_GOOD = obj.salegood;
      // 새물품
      NEW_GOOD = obj.newgood;
      // 추천물품
      RECOMMEND_GOOD = obj.recommendgood;
      //   console.log(VISUAL_ARR);
      // 인기물품
      // 아이콘
      POPULAR_ICON = obj.popularicon;
      // 목록
      POPULAR_GOOD = obj.populargood;
      // 브랜드관
      BRAND_ARR = obj.brandarr;
      // 배너
      BANNER_ARR = obj.bannerarr;
      // 제철요리
      SEASON_GOOD = obj.seasongood;
      // 리뷰
      REVIEW_ARR = obj.review;
      // 공지사항
      NOTICE_ARR = obj.notice;
      // 물품소식
      GOODNEWS_ARR = obj.goodnews;
      // ================
      // 비주얼을 화면에 배치
      showVisual();
      //오늘의 물품 화면에 배치
      showTdodayGood();
      // 세일물품 화면 배치
      showSaleGood();
      // 새물품 화면 배치
      showNewGood();
      // 추천물품 화면 배치
      showRecommendGood();
      // 인기물품 아이콘 화면배치
      showPopularIcon();
      // 인기물품 목록 화면배치
      showPopularGood();
      // 브랜드관 화면배치
      showBrandArr();
      // 배너 화면배치
      showBannerArr();
      // 제철요리 화면배치
      showSeasonGood();
      // 리뷰 화면배치
      showReview();
      // 공지사항 화면배치
      showNotice();
      // 물품소식 화면배치
      showGoodNews();
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
  // 새물품
  let NEW_GOOD;

  let newTag = this.document.getElementById("data-new");
  let newTagList = this.document.getElementById("data-new-list");
  // 추천물품
  let RECOMMEND_GOOD;
  let recommendTag = this.document.getElementById("data-recommend");
  // 인기물품 아이콘
  let POPULAR_ICON;
  let popularIConTag = this.document.getElementById("data-popular-icon");
  // 인기물품 목록
  let POPULAR_GOOD;
  // json파일중에 인텍스번호 0을 할당
  let popularShow = 1;
  let popularGoodTag = this.document.getElementById("data-popular");
  // 브랜드관 목록
  let BRAND_ARR;
  let brandTag = this.document.getElementById("data-brand");
  // 배너 목록
  let BANNER_ARR;
  let bannerTag = this.document.getElementById("data-banner");
  // 제철요리 목록
  let SEASON_GOOD;
  let seosonTag = this.document.getElementById("data-season");
  // 리뷰
  let REVIEW_ARR;
  let reviewTag = this.document.getElementById("data-review");
  // 공지사항
  let NOTICE_ARR;
  let noticeTag = this.document.getElementById("data-notice");
  // 물품소식
  let GOODNEWS_ARR;
  let goodNewsTag = this.document.getElementById("data-goodnews");
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
  function showTdodayGood() {
    let htmlTop = "";
    let htmlBottom = "";
    const topArr = TODAY_GOOD.filter(function (item, index) {
      // console.log(item);
      // console.log(index);
      if (index < 4) {
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
    // 아랫부분 index 4~7 배열 만들기
    const botArr = TODAY_GOOD.filter(function (item, index) {
      if (index > 3) {
        return item;
      }
    });
    // console.log(botArr);
    botArr.forEach(function (item) {
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
    // console.log(html);

    html += `
    </div>
    </div>
    `;
    // console.log(html);
    saleTag.innerHTML = html;
    // swiper 기능
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
  // 새 물품 화면 출력 기능
  function showNewGood() {
    // 첫번째 화면출력(왼쪽)
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
</a>
    `;
    newTag.innerHTML = newgoodFirst;

    // 두번째 화면출력(오른쪽)
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
      }
      html += tag;
    });
    newTagList.innerHTML = html;
  }
  // 추천물품 화면 출력 기능
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
    // console.log(html);

    html += `
     </div>
     </div>
     `;
    // console.log(html);
    recommendTag.innerHTML = html;
    // swiper 기능
    const sRecommend = new Swiper(".sw-recommend", {
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
  // 인기물품 화면 출력 기능
  function showPopularIcon() {
    let html = `
    <div class = "swiper sw-icon"> 
    <div class ="swiper-wrapper">
       `;
    //  데이터 처리
    POPULAR_ICON.forEach(function (item) {
      // console.log(item);
      const tag = `
    <div class = "swiper-slide">
<a href = "${item.link}">
    <span class = "popular-cate-icon"
    style = "
    background : url('images/${item.icon}') no-repeat;
    background-position : 0px 0px;">
    </span>
    <span class = "popular-cate-name">${item.txt}</span>
</a>
</div>
      `;
      html += tag;
    });
    html += `
    </div>
    </div>
    `;
    popularIConTag.innerHTML = html;
    const swIcon = new Swiper(".sw-icon", {
      slidesPerView: 7, // 보여지는 슬라이드 개수
      spaceBetween: 10, // 슬라이드 간의 간격
      slidesPerGroup: 7, // 넘어가는 슬라이드 개수
      navigation: {
        prevEl: ".popular-cate .popular-slide-prev",
        nextEl: ".popular-cate .popular-slide-next",
      },
    });
    // 아이콘에 클릭했을때 해당하는 목록 이벤트
    const tag = document.querySelectorAll(".popular-slide a");

    // 첫 번째 아이콘 활성화
    tag[1].style.border = "2px solid #76bd42";
    tag[1].style.backgroundColor = "#fff"; // 배경색을 흰색으로 설정
    const firstIconSpanTag = tag[1].querySelector(".popular-cate-icon");
    if (firstIconSpanTag) {
      firstIconSpanTag.style.backgroundPositionY = "-64px";
      firstIconSpanTag.classList.add("active"); // 첫 번째 아이콘은 처음부터 활성화 상태
    }

    tag.forEach(function (item, index) {
      // 아이콘에 호버했을 때 이미지 변경
      item.addEventListener("mouseover", function () {
        const spanTag = this.querySelector(".popular-cate-icon");
        if (!spanTag.classList.contains("active")) {
          spanTag.style.backgroundPositionY = "-64px";
          this.style.backgroundColor = "#fff"; // 호버 시 배경색을 흰색으로 설정
          this.style.border = "2px solid #76bd42"; // 호버 시 테두리 색상 변경
        }
      });

      // 마우스가 아이콘에서 벗어났을 때 원래 이미지로 변경
      item.addEventListener("mouseleave", function () {
        const spanTag = this.querySelector(".popular-cate-icon");
        if (!spanTag.classList.contains("active")) {
          spanTag.style.backgroundPositionY = "0px";
          this.style.backgroundColor = ""; // 원래 배경색으로 복원
          this.style.border = "none"; // 원래 테두리로 복원
        }
        // tag[1]에 대해서는 마우스 리브 동작 무시
        // tag[1]이 활성화 상태가 아니면 마우스 리브 기능 적용
        if (item === tag[1] && spanTag.classList.contains("active")) {
          return; // tag[1]이 활성화 상태면 무시
        }
      });

      // 아이콘 클릭 시 목록 변경 및 스타일 업데이트
      item.addEventListener("click", function (e) {
        e.preventDefault();

        // "물품 더보기" 이름 변경
        const bt = document.querySelector(".popular-more");
        const title = this.querySelector(".popular-cate-name");
        bt.innerHTML = `${title.innerHTML} 물품 더보기 `;

        // 클릭된 아이콘의 스타일 업데이트
        tag.forEach(function (item) {
          item.style.border = "none";
          const otherSpanTag = item.querySelector(".popular-cate-icon");
          if (otherSpanTag) {
            otherSpanTag.style.backgroundPositionY = "0px";
            item.style.backgroundColor = "#f9f9f9";
            otherSpanTag.classList.remove("active");
          }
        });

        // 현재 클릭된 아이콘을 활성화
        this.style.backgroundColor = "#fff";
        this.style.border = "2px solid #76bd42";
        const spanTag = this.querySelector(".popular-cate-icon");
        if (spanTag) {
          spanTag.style.backgroundPositionY = "-64px";
          spanTag.classList.add("active");
        }

        // 아이콘에 해당하는 목록 출력
        popularShow = index;
        showPopularGood();
      });
    });

    // ======================
  }
  // 인기물품 화면 출력 기능
  function showPopularGood() {
    let html = "";
    let popCate = "populargood-" + (popularShow + 1); //인덱스 번호에 계속 +1을 한다
    // console.log(POPULAR_GOOD[popCate]);
    // console.log(popCate);
    POPULAR_GOOD[popCate].forEach(function (item) {
      // console.log(item);

      // 여러개이므로 foreach
      let tag = `
 <div class="good-box">
 <!-- 제품이미지 -->
 <a href="${item.link}" class="good-img">
     <img src="images/${item.pic}" alt="${item.name}" />
     <span class="good-type">${item.tag}</span>
 </a>
 <!-- 제품정보 -->
 <a href="${item.link}" class="good-info">
     <em>${item.name}</em>(<em>${item.unit}</em>)
 </a>
 <!-- 제품가격 -->
 <a href="${item.link}" class="good-info-price">${priceToString(item.price)}<em>원</em></a>
 <!-- 장바구니 -->
 <button class="good-add-cart"></button>
 </div>
 `;
      html += tag;
      popularGoodTag.innerHTML = html;
    });
  }
  // 브랜드관 화면 출력 기능
  function showBrandArr() {
    let html = `
    <div class="swiper sw-brand">
      <div class="swiper-wrapper">
   `;
    BRAND_ARR.forEach(function (item) {
      // console.log(item);
      let tag = `
      <div class="swiper-slide">
              <div class="brand-box">
                  <a href="${item.link}">
                      <img src="images/${item.pic}" alt="${item.name}"/>
                      <p>${item.name}</p>
                      <ul class="brand-info clearfix">
                          <li>
                              <span class="brand-info-title">${item.title1}</span>
                              <span class="brand-info-value">${item.value1}</span>
                          </li>
                          <li>
                              <span class="brand-info-title">${item.title2}</span>
                              <span class="brand-info-value">${item.value2}</span>
                          </li>
                      </ul>
                  </a>
              </div>
          </div>
      `;
      html += tag;
    });
    html += `
    </div>
    </div>
    `;
    brandTag.innerHTML = html;
    const swBrand = new Swiper(".sw-brand", {
      slidesPerView: 3, // 보여지는 슬라이드 개수
      spaceBetween: 16, // 슬라이드 간의 간격
      slidesPerGroup: 1, // 넘어가는 슬라이드 개수
      navigation: {
        prevEl: ".brand .slide-prev",
        nextEl: ".brand .slide-next",
      },
      pagination: {
        el: ".brand .slide-pg",
        type: "fraction",
      },
    });
  }
  // 배너 화면 출력 기능
  function showBannerArr() {
    let html = `
     <div class = "swiper sw-banner">
  <div class = "swiper-wrapper">
    `;
    BANNER_ARR.forEach(function (item) {
      // console.log(item);
      let tag = `
      <div class="swiper-slide">
            <a href="${item.link}">
                <img src = "images/${item.image}" alt ="${item.title}"/>
            </a>
        </div>
      `;
      html += tag;
    });
    html += `
    </div>
    </div>
    `;
    bannerTag.innerHTML = html;
    const swBanner = new Swiper(".sw-banner", {
      loop: true,
      autoplay: {
        delay: 2500,
      },
      slidesPerView: 2,
      spaceBetween: 0,
      navigation: {
        prevEl: ".banner .slide-prev",
        nextEl: ".banner .slide-next",
      },
    });
  }
  // 제철요리 화면 출력 기능
  function showSeasonGood() {
    let html = "";
    SEASON_GOOD.forEach(function (item, index) {
      // console.log(item, index);
      const tag = `
        <li>
                    <div class="season-good clearfix">
                      <input type="checkbox" id="ch${index}" class="season-good-check season-item" value="${item.price}">
                      <label for="ch${index}" class="season-label"></label>
                      <a href="${item.link}" class="season-good-img">
                        <img src="images/${item.pic}" alt="${item.title}">
                      </a>
                      <p class="season-good-info">
                        <a href="${item.link}" class="season-good-title">${item.title}</a>
                        <a href="${item.link}" class="season-good-price">
                            <em>${priceToString(item.price)}</em>원
                        </a>
                      </p>
                    </div>
                   </li>
      `;
      html += tag;
    });
    seosonTag.innerHTML = html;
    Scrollbar.initAll(); // smooth scrollbar 적용
    checkBoxFn();
    showBuyGood();
  }
  // 제철요리 전체 체크박스 기능
  const buyTotal = this.document.getElementById("buy-total"); //총갯수
  const bytTotalMoney = this.document.getElementById("buy-total-money");
  let buyTotalCount = 0; // 기본값
  let buyTotalMoneyPrice = 0; // 기본값
  // 전체 체크박스 기능
  const chkAll = this.document.getElementById("chkall");
  chkAll.addEventListener("change", function () {
    const chkArr = document.querySelectorAll(".season-item");
    // console.log(chkArr);

    if (chkAll.checked) {
      // 전체 체크를 해야하는 경우
      chkArr.forEach(function (item) {
        // console.log(item);
        item.checked = true;
      });
    } else {
      chkArr.forEach(function (item) {
        // console.log(item);
        item.checked = false;
      });
    }
    // 계산출력 기능 호출
    showBuyGood();
  });
  // 체크박스 각각의 기능
  function checkBoxFn() {
    const chkArr = document.querySelectorAll(".season-item");
    chkArr.forEach(function (item) {
      // console.log(item);
      item.addEventListener("change", function () {
        // 계산출력 기능 호출
        showBuyGood();
      });
    });
  }
  // 계산출력하는 기능 함수
  function showBuyGood() {
    // 체크가 된 값을 카운팅하고 더한다.
    let count = 0; //체크된 상품의 수를 저장할 변수
    let priceTotal = 0; //체크된 상품들의 총 가격을 저장할 변수
    const chkArr = document.querySelectorAll(".season-item");
    //모든 체크박스 요소를 가져와서 배열에 저장
    chkArr.forEach(function (item) {
      // console.log(item);
      const state = item.checked; //현재 체크박스에 체크상태를 확인
      // console.log(state);
      if (state) {
        // 체크박스가 되어있으면
        count += 1; // 체크된 상품의 수를 증가 count++
        // console.log(count);
        const price = parseInt(item.value);
        // console.log(price);
        priceTotal += price;
      }
    });
    // 체크된 상품의 수를 전역변수에 저장
    buyTotalCount = count;
    // console.log(buyTotalCount);
    // 총가격을 전역변수에 저장
    buyTotalMoneyPrice = priceTotal;
    // console.log(buyTotalMoneyPrice);
    // 체크된 갯수만큼 갯수 변경
    buyTotal.innerHTML = buyTotalCount;
    // 체크된 갯수만큼 금액 변경
    bytTotalMoney.innerHTML = priceToString(buyTotalMoneyPrice);
  }
  // 리뷰 기능 함수
  function showReview() {
    let html = `
    <div class="swiper sw-review">
    <div class="swiper-wrapper">
    `;
    // 데이터처리
    REVIEW_ARR.forEach(function (item) {
      // console.log(item);
      const tag = `
      <div class="swiper-slide">
<div class="review-box">
    <a href="${item.link}">
        <div class= "review-box-desc">
            <span class= " review-box-title">
                ${item.title}
            </span>
            <span class="review-box-star"> ${item.star} </span>
            <span class="review-box-img">
                <img src="images/${item.pic}" alt="${item.title}"/>
            </span>
        </div>
        <p class="review-box-txt">
            ${item.txt}
        </p>
        <span class="review-box-user">${item.user} (${item.shop})</span>
    </a>
</div>
</div>
      `;
      html += tag;
    });
    html += `
    </div>
</div>
    `;
    reviewTag.innerHTML = html;
    const swReview = new Swiper(".sw-review", {
      slidesPerView: 3,
      spaceBetween: 16,
      slidesPerGroup: 3,
      navigation: {
        prevEl: ".review .slide-prev",
        nextEl: ".review .slide-next",
      },
      pagination: {
        el: ".review .slide-pg",
        type: "fraction",
      },
    });
  }
  //공지사항 기능 함수
  function showNotice() {
    let html = "";
    // 데이터 갱신
    NOTICE_ARR.forEach(function (item) {
      // console.log(item);
      const tag = `
        <li>
            <a href="${item.link}">
                <span>
                    ${item.title}
                </span><em>${item.date}</em>
            </a>
        </li>
`;
      html += tag;
    });
    noticeTag.innerHTML = html;
  }
  //물품소식 기능 함수
  function showGoodNews() {
    let html = "";
    // 데이터 갱신
    GOODNEWS_ARR.forEach(function (item) {
      // console.log(item);
      const tag = `
        <li>
            <a href="${item.link}">
                <span>
                    ${item.title}
                </span><em>${item.date}</em>
            </a>
        </li>
`;
      html += tag;
    });
    goodNewsTag.innerHTML = html;
  }
  // 커뮤니티 탭메뉴
  const tabBtArr = this.document.querySelectorAll(".community-bt");
  // 탭내용
  const tabConArr = this.document.querySelectorAll(".community-notice dd");
  // 탭포커스
  let tabFocusIndex = 0;
  // 탭 버튼 클릭처리 기능
  tabBtArr.forEach(function (item, index) {
    // console.log(item, index);
    item.addEventListener("click", function () {
      // console.log(item ,index);
      tabFocusIndex = index;
      // console.log(tabFocusIndex);
      tabFocusFn();
    });
  });
  // 탭포커스가 클릭됐을때 보여지는 함수 생성
  function tabFocusFn() {
    tabBtArr.forEach(function (item) {
      // console.log(item);
      item.classList.remove("community-bt-active");
    });
    tabConArr.forEach(function (item) {
      // console.log(item);
      item.classList.remove("community-visible-active")
    });
    // 인덱스에 해당하는것만 적용
    tabBtArr[tabFocusIndex].classList.add("community-bt-active")
    tabConArr[tabFocusIndex].classList.add("community-visible-active")
  }
  //   ==========================end
});
