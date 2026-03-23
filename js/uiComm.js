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

// contact us - 모달
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.querySelector('.modal_overlay');
  
  // 1. 모달 열기 버튼들 처리
  const openBtn = document.querySelector('.btn_modal');
  openBtn.addEventListener('click', openContactModal);

  // 2. 모달 닫기 기능 (딤드 부분 + X 버튼)
  if (modal) {
    modal.addEventListener('click', function(event) {
      if (event.target === modal) {
        closeContactModal();
      }
    });

    // X 버튼 클릭 시 닫기
    const closeBtn = modal.querySelector('.btn_close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeContactModal);
    }
  }

  function openContactModal() {
    if (!modal) return;
    modal.classList.add('is-active'); // CSS 클래스 추가로 열기 + 애니메이션
    document.body.style.overflow = 'hidden'; // 뒷배경 스크롤 방지 (이건 직접 주는 게 확실합니다)
  }

  function closeContactModal() {
    if (!modal) return;
    modal.classList.remove('is-active'); // CSS 클래스 제거로 닫기
    document.body.style.overflow = 'auto'; // 스크롤 복구
  }
});

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

// 모달 신청서 전화번호 유효성
const telInput = document.getElementById('tel');
telInput.addEventListener('input', (e) => {
  let value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 남기기
  let result = '';

  if (value.length < 4) {
    result = value;
  } else if (value.length < 7) {
    result = value.substr(0, 3) + '-' + value.substr(3);
  } else if (value.length < 11) {
    result = value.substr(0, 3) + '-' + value.substr(3, 3) + '-' + value.substr(6);
  } else {
    result = value.substr(0, 3) + '-' + value.substr(3, 4) + '-' + value.substr(7);
  }

  e.target.value = result;
});

// 모달 - 신청서 작성
const scriptURL = 'https://script.google.com/macros/s/AKfycbzP-uuqNeY9D-j4wSWIOPIVAH-6d-PlukqPLGMSp1ZhRhMPUGo5NGuR_0jBh3QhQuux2g/exec';
const form = document.querySelector('#inquiryForm');
const modal = document.querySelector('#contactModal');

form.addEventListener('submit', e => {
  e.preventDefault(); // 기본 제출 동작 방지
  
  // 버튼 로딩 처리 (중복 클릭 방지)
  const submitBtn = form.querySelector('.btn_submit');
  submitBtn.disabled = true;
  submitBtn.innerText = '신청 중...';

  // fetch를 사용하여 구글 시트로 전송
  fetch(scriptURL, { 
    method: 'POST', 
    body: new FormData(form)
  })
  .then(response => {
    alert('프로그램 참여 신청이 완료되었습니다!');
    form.reset(); // 폼 초기화
    modal.classList.remove('is-active'); // 모달 닫기 (클래스명은 환경에 맞춰 수정)
  })
  .catch(error => {
    alert('오류가 발생했습니다. 다시 시도해주세요.');
    console.error('Error!', error.message);
  })
  .finally(() => {
    // 버튼 상태 복구
    submitBtn.disabled = false;
    submitBtn.innerText = '신청하기';
  });
});

// 닫기 버튼 로직 (추가)
document.querySelector('.btn_close').addEventListener('click', () => {
  modal.classList.remove('active');
});


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
const sponsorSwiper = new Swiper('.section_main4 .swiper',{
  loop: true,               
  slidesPerView: 'auto',   
  freeMode: {
    enables:true,          
    momemtum:false
  },
  speed: 7000,             
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

// 서브 페이지 공통
AOS.init({
  anchorPlacement: 'top-bottom', 
  easing: 'ease-out-back', 
  offset: 200, 
  duration: 1200,
});

// 갤러리 masonly-grid
const container = document.querySelector(".list_gallery");
  if(container){
    const grid = new Grid.MasonryGrid(container, {
      gap: 16,
      align: "justify",
      column: 2,
      useResizeObserver: true, 
      resizeDebounce: 50
    });
    
    function updateGridOption(){
      const winWidth = window.innerWidth;
      if(winWidth < 1200){
        grid.gap = 16;
        grid.column = 2;
      }else{
        grid.gap = 30;
        grid.column = 3;
      }
      grid.renderItems();
    }
    window.addEventListener("resize", updateGridOption);
    window.addEventListener("load", updateGridOption);
  
    updateGridOption();
  }