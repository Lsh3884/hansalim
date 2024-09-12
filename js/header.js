window.addEventListener("load", function () {
  const header = this.document.querySelector(".header");
  //    console.log(header);
  let scy = 0;
  console.log(scy);

  this.window.addEventListener("scroll", function () {
    // console.log(scy);
    scy = this.document.documentElement.scrollTop;
    // console.log(scy);
    if (scy > 0) {
      header.classList.add("active");
    } else {
      header.classList.remove("active");
    }
  });
  //  펼침목록 보기 기능
  // 더보기 목록기능
  const menuBt = document.getElementById("menu-bt");
  const menuList = document.getElementById("menu-list");
  // 참여 목록기능
  const joinBt = document.getElementById("join-bt");
  const joinList = document.getElementById("join-list");
  //  조합원센터 목록기능
  const centerBt = document.getElementById("center-bt");
  const centerList = document.getElementById("center-list");
  // 배열 순서번호가 주어진다.
  const toggleListArr = [menuList, joinList, centerList];
  const toggleBtArr = [menuBt, joinBt, centerBt];
  // 펼침 목록 모두 닫기

  // 코드 블럭이 같은 기능을 반복된다
  // 기능을 만들어서 사용(함수)

  function listToggle(bt, list) {
    // console.log(bt);
    // console.log(list);
    list.style.display = "none";
    bt.addEventListener("click", function () {
      // 전체 클릭했을때 기능을 초기화
      toggleBtArr.forEach(function (item) {
        // console.log(item);
        item.classList.remove("active");
      });
      const nowListId = list.getAttribute("id");
      console.log(nowListId);
      const hideArr = toggleListArr.filter(function (item) {
        // console.log(item);
        let id = item.getAttribute("id");
        console.log(id);
        if (id !== nowListId) {
          return this;
        }
      });
      //   해당하는 버튼의 리스트 제외한 배열재생
      //   console.log(hideArr);
      hideArr.forEach(function (item) {
        // console.log(item);
        item.style.display = "none";
      });
      const css = getComputedStyle(list).display;
      if (css === "none") {
        list.style.display = "block";
        bt.classList.add("active");
      } else {
        list.style.display = "none";
        bt.classList.remove("active");
      }
    });
  }
  listToggle(menuBt, menuList);
  listToggle(joinBt, joinList);
  listToggle(centerBt, centerList);
  // =============================================
  // 전체메뉴 펼침기능
  const allMenu = this.document.querySelector(".all-menu");
  const cateList = this.document.querySelector(".cate-list");
  const cateListWrap = this.document.querySelector(".all-menu-cate-wrap");
  const deliList = this.document.querySelector(".deli-list");
  const themeList = this.document.querySelector(".theme-list");
  let isMenuOpen = false;
  cateList.addEventListener("mouseleave", function () {
    // cateList마우스리브 했을 때
    if (!isMenuOpen) {
      allMenu.classList.remove("active");
    }
  });
  cateListWrap.addEventListener("mouseenter" , function(){
    allMenu.classList.add("active")
  })
  cateList.addEventListener("mouseenter", function () {
    allMenu.classList.add("active");
  });
  deliList.addEventListener("mouseenter", function () {
    allMenu.classList.remove("active");
  });
  themeList.addEventListener("mouseenter", function () {
    allMenu.classList.remove("active");
  });
  // 서브 카테고리
  const cateLists = this.document.querySelectorAll(".cate-list > li");
  const cateDepth2 = this.document.querySelectorAll(".cate-depth2-list");
  cateLists.forEach(function (item, index) {
    // console.log(item);
    // console.log(index);
    item.addEventListener("mouseenter", function () {
      cateDepth2.forEach(function (itemSub, indexSub) {
        itemSub.style.display = "none"
        if (indexSub === index) {
          itemSub.style.display = "block";
        }
      });
    });
  });
  // ========================================end
});
