    //欢迎层脚本
    window.addEventListener('load', () => {
      const overlay = document.getElementById('welcome-overlay');
      const card = document.querySelector('.welcome-card');

      // 等一小会儿再开始旋转动画（比如 0.8s）
      setTimeout(() => {
        card.classList.add('card-animate');
      }, 800);

      // 动画持续 1.6s，结束后隐藏整个 overlay
      card.addEventListener('animationend', () => {
        overlay.classList.add('overlay-hide');
        // 真正从 DOM 移除，可选
        setTimeout(() => overlay.remove(), 600);
      });
    });

    // ================= 1. 时间日期功能 =================
    function updateTime() {
      const now = new Date();

      // 格式化时间 HH:MM:SS
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`;

      // 格式化日期 YYYY年MM月DD日 星期X
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const weekArr = ['日', '一', '二', '三', '四', '五', '六'];
      const week = weekArr[now.getDay()];
      document.getElementById('date').textContent = `${year}年${month}月${day}日 星期${week}`;
    }

    // 立即执行一次，然后每秒刷新
    updateTime();
    setInterval(updateTime, 1000);

    // ================= 2. 一言 API 调用 (Hitokoto) =================
    // 使用 fetch 获取随机句子
    function fetchHitokoto() {
      fetch('https://v1.hitokoto.cn')
        .then(response => response.json())
        .then(data => {
          const hitokoto = document.getElementById('hitokoto_text');
          const from = document.getElementById('hitokoto_from');
          hitokoto.innerText = `“ ${data.hitokoto} ”`;
          from.innerText = `—— ${data.from}`;
        })
        .catch(console.error);
    }

    // 页面加载时获取
    fetchHitokoto();