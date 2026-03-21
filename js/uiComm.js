// 전체 페이지 공통

// mobile GNB
const btnMenu = document.querySelector('.btn_gnb');
const boxGnb = document.querySelector('.box_gnb');
const btnClose = boxGnb.querySelector('.btn_close'); 

if (btnMenu && boxGnb) {
  const breakPoint = 1200;

  function toggleMenu() {
    const isExpanded = btnMenu.getAttribute('aria-expanded') === 'true';
    
    if (isExpanded) {
      // 닫기 로직
      btnMenu.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('overflow-hidden');
    } else {
      // 열기 로직
      btnMenu.setAttribute('aria-expanded', 'true');
      document.body.classList.add('overflow-hidden');
    }
  }

  // 햄버거 버튼 클릭 이벤트
  btnMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // 2. 닫기 버튼 클릭 이벤트 추가
  if (btnClose) {
    btnClose.addEventListener('click', () => {
      toggleMenu();
    });
  }

  // 화면 리사이즈 시 (PC 해상도로 넘어가면 강제 초기화)
  window.addEventListener('resize', () => {
    if (window.innerWidth >= breakPoint) {
      btnMenu.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('overflow-hidden');
    }
  });

  // 메뉴 밖 영역 클릭 시 닫기
  document.addEventListener('click', (e) => {
    const isExpanded = btnMenu.getAttribute('aria-expanded') === 'true';
    if (isExpanded && !boxGnb.contains(e.target) && !btnMenu.contains(e.target)) {
      toggleMenu();
    }
  });
}

// 맨위로가기 버튼
const btnTop = document.querySelector('.footer .btn_top');

if (btnTop) {
  const header = document.querySelector('.header');
  const footer = document.querySelector('.footer');

  // 1. 쓰로틀 함수 정의
  function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        return func.apply(this, args);
      }
    };
  }

  // 2. 부드러운 상단 이동 (jQuery animate 대체)
  function btnScrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // jQuery의 300ms와 유사하게 브라우저 기본 스무스 스크롤 사용
    });
  }

  // 3. 버튼 고정 시점 체크
  function isBtnTopFixed() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const footerHeight = footer ? footer.offsetHeight : 0;
    const windowScroll = window.scrollY || window.pageYOffset;
    
    const btnHeight = btnTop.offsetHeight;
    const btnBottom = parseFloat(getComputedStyle(btnTop).bottom) || 0;
    
    const btnFixedValue = btnHeight / 2 + btnBottom;
    const fixedBtnTop = documentHeight - windowHeight - footerHeight + btnFixedValue;

    // toggleClass 대체
    if (windowScroll >= fixedBtnTop) {
      btnTop.classList.add('btn_fix');
    } else {
      btnTop.classList.remove('btn_fix');
    }
  }

  // 4. 버튼 노출 시점 체크
  function isBtnTopVisible(scrollThreshold) {
    const windowScroll = window.scrollY || window.pageYOffset;
    const headerHeight = header ? header.offsetHeight : 0;

    // 기본값 설정
    const threshold = typeof scrollThreshold === 'number' ? scrollThreshold : headerHeight;

    const isVisible = windowScroll > threshold;
    
    if (isVisible) {
      btnTop.classList.add('on');
    } else {
      btnTop.classList.remove('on');
    }
  }

  // 5. 통합 스크롤 핸들러
  function handleBtnTopScroll() {
    isBtnTopFixed();
    isBtnTopVisible(10); // 기존 코드의 인자 10 유지
  }

  // 6. 이벤트 등록
  const throttledScroll = throttle(handleBtnTopScroll, 30);
  window.addEventListener('scroll', throttledScroll);

  // 버튼 클릭 이벤트
  btnTop.addEventListener('click', btnScrollTop);

  // 초기 실행
  handleBtnTopScroll();
}


// 메인 페이지
// section_visual Swiper
const visualSwiper = new Swiper('.section_visual .swiper',{
  loop: true,
  slidesPerView:1,
  navigation :{
    prevEl: '.section_visual .btn_prev',
    nextEl: '.section_visual .btn_next'
  },
  spaceBetween: 30,
})


// section_main1 CURRICULM Swiper
const curriSwiper = new Swiper('.section_main1 .swiper',{
  slidesPerView:1,
  spaceBetween: 20,
  navigation :{
    prevEl: '.section_main1 .btn_prev',
    nextEl: '.section_main1 .btn_next'
  },
  spaceBetween: 30,
  breakpoints: {
    768: {
      slidesPerView:2,
    },
    
  },
})

// section_main3 REVIEW Swiper
const reviewSwiper = new Swiper('.section_main3 .swiper',{
  loop: true,
  slidesPerView:1,
  spaceBetween: 20,
  navigation :{
    prevEl: '.section_main3 .btn_prev',
    nextEl: '.section_main3 .btn_next'
  },
  spaceBetween: 20, 
  breakpoints: {
    768: {
      slidesPerView:2,
      spaceBetween: 30,
    },
  },
})

// section_main4 SPONSOR Swiper
const sponsorSwiper1 = new Swiper('.section_main4 .swiper.line1',{
  loop: true,               
  slidesPerView: 'auto',   
  freemode: true,          
  speed: 4000,             
  allowTouchMove: false,   
  autoplay: {
    delay: 0,               
    disableOnInteraction: false,
  },
  spaceBetween: 20,
  freeMode: true,
  loopAdditionalSlides: 5,
  allowTouchMove: false,
})
const sponsorSwiper2 = new Swiper('.section_main4 .swiper.line2',{
  loop: true,               
  slidesPerView: 'auto',   
  freemode: true,          
  speed: 4000,             
  allowTouchMove: false,   
  autoplay: {
    delay: 0,               
    disableOnInteraction: false,
    reverseDirection: true, 
  },
  spaceBetween: 20,
  freeMode: true,
  loopAdditionalSlides: 5,
  allowTouchMove: false,
})

// 서브 페이지
    AOS.init({
      anchorPlacement: 'top-bottom', 
      easing: 'ease-out-back', 
      offset: 200, 
      duration: 1200,
    });