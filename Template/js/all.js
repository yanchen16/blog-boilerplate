document.addEventListener('DOMContentLoaded', () => {
  // 頁面載入完成後，為 body 加入 'loaded' class 以觸發淡入動畫
  document.body.classList.add('loaded');

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const navBar = document.querySelector(".navbar");

  // 選取所有導覽連結，包括 Logo 和主要導覽項目
  const allNavLinks = document.querySelectorAll('.nav-links a, .logo a');

  function handlePageTransition(event) {
    const targetUrl = this.href;
    const currentUrl = window.location.href;

    // 如果目標 URL 與目前 URL 相同，或是同一頁面上的錨點連結，則不執行過渡動畫，允許預設行為
    if (targetUrl === currentUrl || (targetUrl.split('#')[0] === currentUrl.split('#')[0] && targetUrl.includes('#'))) {
        // 如果是同一頁面上的錨點連結，且漢堡選單是開啟的，則關閉它
        if (targetUrl.includes('#') && this.closest('.nav-links') && navLinks && navLinks.classList.contains("active")) {
            navLinks.classList.remove("active");
        }
        return; // 允許預設的頁面內滾動或不執行任何操作
    }
    
    event.preventDefault(); // 防止立即跳轉

    // 移除 'loaded' class，觸發淡出動畫 (body 的 opacity 會變為 0)
    document.body.classList.remove('loaded');

    // 等待淡出動畫完成 (0.5秒，與 CSS 中的 transition-duration 一致)
    setTimeout(() => {
      window.location.href = targetUrl; // 動畫結束後跳轉到目標頁面
    }, 500);
  }

  allNavLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      // 如果點擊的是主要導覽項目中的連結，且漢堡選單是開啟的，則關閉它
      if (this.closest('.nav-links') && navLinks && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
      }
      // 執行頁面過渡處理
      handlePageTransition.call(this, event);
    });
  });
  
  // --- 保留原有的漢堡選單開關和導覽列滾動邏輯 ---
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  if (navBar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        navBar.classList.add("scrolled");
      } else {
        navBar.classList.remove("scrolled");
      }
    });
  }
});