// 모바일 GNB
const btnGnb = document.querySelector('.btn_gnb.mobile');
const boxGnb = document.querySelector('.box_gnb');

const isExpanded = btnGnb.getAttribute('aria-expanded') === 'true';
btnGnb.addEventListener('click', () => {
  btnGnb.setAttribute('aria-expanded', !isExpanded);
});

document.body.addEventListener('click', (e) => {
  if (isExpanded && !boxGnb.contains(e.target) && e.target !== btnGnb) {
    btnGnb.setAttribute('aria-expanded', 'false');
  }
});


// section_visual Swiper
const visualSwiper = new Swiper('.section_visual .swiper',{
  loop: true,
  slidesPerView:1,
  autoplay: {
    delay:5000, // autoplay 간격
  },
  navigation :{
    prevEl: '.btn_prev',
    nextEl: '.btn_next'
  },
  spaceBetween: 30,
})

// section_main2 REVIEW Swiper
const reviewSwiper = new Swiper('.section_main2 .swiper',{
  loop: true,
  slidesPerView:1,
  navigation :{
    prevEl: '.btn_prev',
    nextEl: '.btn_next'
  },
  spaceBetween: 20, 
  breakpoints: {
    768: {
      slidesPerView:2,
      spaceBetween: 30,
    },
  },
})

// section_main3 SPONSOR Swiper
const sponsorSwiper1 = new Swiper('.section_main3 .swiper.line1',{
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
const sponsorSwiper2 = new Swiper('.section_main3 .swiper.line2',{
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