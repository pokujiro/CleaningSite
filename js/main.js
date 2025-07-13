// スムーズスクロール＋ヘッダー分オフセット
document.addEventListener('DOMContentLoaded', function() {
  // スクロールリンク
  document.querySelectorAll('a.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const y = target.getBoundingClientRect().top + window.pageYOffset;
          // オフセット値はヘッダーの高さ（stickyで60px～80px程度）
          const offset = window.innerWidth < 768 ? 64 : 80;
          window.scrollTo({
            top: y - offset,
            behavior: 'smooth'
          });
        }
        // モバイルメニュー閉じる
        document.getElementById('mobile-nav').classList.add('hidden');
      }
    });
  });

  // ハンバーガーメニュー
  const navToggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  navToggle.addEventListener('click', function() {
    mobileNav.classList.toggle('hidden');
  });

  // お知らせ・キャンペーン表示
  const newsList = document.getElementById('news-list');
  fetch('data/news.json')
    .then(res => res.json())
    .then(newsArr => {
      if (!newsArr.length) {
        newsList.innerHTML = '<p class="text-center text-gray-500">現在、新しいお知らせはありません。</p>';
        return;
      }
      newsList.innerHTML = newsArr.map(item => `
        <div class="bg-white p-4 rounded shadow">
          <div class="flex items-center mb-2">
            <span class="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">${item.category}</span>
            <span class="ml-2 text-gray-500 text-xs">${item.date}</span>
          </div>
          <h4 class="font-semibold mb-1">${item.title}</h4>
          <p class="text-sm">${item.content}</p>
        </div>
      `).join('');
    });
});
