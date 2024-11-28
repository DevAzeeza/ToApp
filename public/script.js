const navDialog = document.getElementById("nav-dialog");
function handleMenu() {
  navDialog.classList.toggle("hidden");
}

const initialTranslateLTR = -48 * 4;
const initialTranslateRTL = 36 * 4;
//1.28.16
function setupIntersectionObserver(element, isLTR, speed) {
  const intersectionCallback = (entries) => {
    const isIntersecting = entries[0].isIntersecting; //when ever intersecting is true(happening), we'll give it a scroll listener
    if (isIntersecting) {
      document.addEventListener("scroll", scrollHandler);
    } else {
      document.removeEventListener("scroll", scrollHandler);
    }
  }; //each time only one entry will be observed

  const intersectionObserver = new IntersectionObserver(intersectionCallback);
  intersectionObserver.observe(element); //everytime the function is called, new intersectionObserver is created which observes the one element and once the element has gone out of page and stops getting intersected, the callback will be gone

  function scrollHandler() {
    const translateX =
      (window.innerHeight - element.getBoundingClientRect().top) * speed;

    let totalTranslate = 0;
    if (isLTR) {
      totalTranslate = translateX + initialTranslateLTR;
    } else {
      totalTranslate = -(translateX + initialTranslateRTL);
    }

    element.style.transform = `translateX(${totalTranslate}px)`;
  }
}

const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const line3 = document.getElementById("line3");
const line4 = document.getElementById("line4");

setupIntersectionObserver(line1, true, 0.15);
setupIntersectionObserver(line2, false, 0.15); //since it goes from right to left
setupIntersectionObserver(line3, true, 0.15);
setupIntersectionObserver(line4, true, 0.8);

//isLTR scroll left to right or right to left
//element - line 1, 2 , 3 will be passed
//in what speed the element must be scrolled
