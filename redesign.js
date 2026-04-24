const fs = require('fs');
let h = fs.readFileSync('fsti-test.html','utf8');

// === 1. 替换字体引入：Great Vibes + Inter(瑞士风格无衬线) ===
h = h.replace(
  'https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap',
  'https://fonts.googleapis.com/css2?family=Great+Vibes&family=Inter:wght@300;400;600;800&display=swap'
);

// === 2. 完全重写CSS ===
const oldCSSStart = '<style>';
const oldCSSEnd = '</style>';
const si = h.indexOf(oldCSSStart);
const ei = h.indexOf(oldCSSEnd) + oldCSSEnd.length;

const newCSS = `<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: 'Inter', -apple-system, 'PingFang SC', sans-serif;
  background: #050508; color: #e8e8e8;
  min-height: 100vh; overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* 背景 */
.stars { position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: #050508; z-index: -1; }
.star { position: absolute; border-radius: 50%; background: #fff;
  animation: twinkle 3s ease-in-out infinite alternate; }
@keyframes twinkle { 0%{opacity:0.05} 100%{opacity:0.4} }

.container { max-width: 640px; margin: 0 auto; padding: 24px 28px; }

/* 页面切换 */
.page { display: none; }
.page.active { display: block; }

/* === 首页：瑞士国际主义 === */
.title-section { padding: 80px 0 32px; }
.title-section h1 {
  font-family: 'Great Vibes', cursive;
  font-size: 96px; font-weight: 400;
  color: #a855f7;
  margin-bottom: 0; line-height: 1;
  animation: glowPulse 3s ease-in-out infinite alternate;
}
@keyframes glowPulse {
  0%{ text-shadow: 0 0 20px rgba(168,85,247,0.2); }
  100%{ text-shadow: 0 0 40px rgba(168,85,247,0.5), 0 0 80px rgba(168,85,247,0.15); }
}
.title-section .sub-en {
  font-size: 11px; font-weight: 600; letter-spacing: 6px; text-transform: uppercase;
  color: rgba(168,85,247,0.5); margin-top: 8px;
}
.title-section .tagline {
  font-size: 13px; font-weight: 300; color: rgba(255,255,255,0.3);
  margin-top: 48px; letter-spacing: 1px; line-height: 1.8;
}
.title-section .tagline em {
  font-style: normal; color: rgba(168,85,247,0.7); font-weight: 400;
}
.title-section .hero-line {
  font-size: 28px; font-weight: 800; color: #fff;
  margin-top: 20px; line-height: 1.5; letter-spacing: -0.5px;
}
.title-section .hero-line span { color: #a855f7; }

/* 分割线 */
.divider { width: 40px; height: 2px; background: rgba(168,85,247,0.4); margin: 32px 0; }

.disclaimer {
  font-size: 12px; font-weight: 300; color: rgba(255,255,255,0.25);
  line-height: 2; margin: 24px 0; border-left: 2px solid rgba(168,85,247,0.2); padding-left: 16px;
}

.start-btn {
  display: block; width: 100%; max-width: 360px; margin: 40px 0;
  padding: 18px 0; font-size: 14px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase;
  background: transparent; color: #a855f7;
  border: 1.5px solid rgba(168,85,247,0.4); border-radius: 0;
  cursor: pointer; transition: all 0.4s;
}
.start-btn:hover { background: #a855f7; color: #050508; border-color: #a855f7; }

.footer-note {
  font-size: 11px; font-weight: 300; color: rgba(255,255,255,0.15);
  margin: 40px 0 20px; letter-spacing: 1px;
}

/* === 测试题：网格系统 === */
.progress-bar { height: 1px; background: rgba(255,255,255,0.06); margin: 24px 0 8px; }
.progress-fill { height: 100%; background: #a855f7; transition: width 0.5s; }
.progress-text { color: rgba(255,255,255,0.2); font-size: 11px; font-weight: 600;
  letter-spacing: 4px; margin-bottom: 32px; }
.question-card {
  background: transparent; border: none; border-left: 2px solid rgba(168,85,247,0.3);
  padding: 0 0 0 24px; margin: 0; animation: fadeIn 0.4s;
}
@keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
.question-text {
  font-size: 20px; font-weight: 300; margin-bottom: 32px;
  line-height: 1.8; color: #fff; letter-spacing: 0.3px;
}
.option {
  display: block; width: 100%; padding: 16px 20px; margin: 8px 0;
  background: transparent; border: 1px solid rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.5); font-size: 14px; font-weight: 300;
  text-align: left; cursor: pointer; transition: all 0.3s; line-height: 1.6;
  border-radius: 0;
}
.option:hover { border-color: rgba(168,85,247,0.5); color: #fff; padding-left: 28px; }
.option.selected { border-color: #a855f7; color: #fff; background: rgba(168,85,247,0.06); }
.nav-row { display: flex; justify-content: space-between; align-items: center; margin-top: 24px; }
.prev-btn {
  padding: 8px 20px; font-size: 11px; font-weight: 600; letter-spacing: 2px;
  color: rgba(255,255,255,0.2); background: transparent;
  border: 1px solid rgba(255,255,255,0.08); cursor: pointer; transition: all 0.3s;
}
.prev-btn:hover { border-color: rgba(168,85,247,0.4); color: #a855f7; }
.prev-btn:disabled { opacity: 0.15; cursor: not-allowed; }
.nav-hint { font-size: 10px; color: rgba(255,255,255,0.12); letter-spacing: 1px; }

/* === 结果页 === */
.result-card {
  text-align: left; padding: 0; background: transparent; border: none; margin: 24px 0;
}
.result-emoji { font-size: 72px; margin-bottom: 16px; text-align: center; }
.result-code {
  font-family: 'Inter'; font-size: 11px; font-weight: 600; letter-spacing: 6px;
  color: rgba(168,85,247,0.6); text-transform: uppercase;
}
.result-name {
  font-size: 36px; font-weight: 800; color: #fff; margin: 4px 0 8px;
  letter-spacing: -0.5px; line-height: 1.2;
}
.result-match {
  font-size: 12px; font-weight: 300; color: rgba(255,255,255,0.2);
  margin-bottom: 24px; letter-spacing: 1px;
}
.result-tagline {
  font-size: 18px; font-weight: 300; color: rgba(255,255,255,0.7);
  margin: 0 0 24px; line-height: 1.7; font-style: italic;
  border-left: 2px solid rgba(168,85,247,0.3); padding-left: 16px;
}
.result-desc {
  font-size: 14px; font-weight: 300; line-height: 2.2; color: rgba(255,255,255,0.4);
  padding: 0; background: transparent; margin: 0 0 32px;
}
.result-desc strong { color: #a855f7; font-weight: 600; }
.dims-section { margin: 0 0 32px; }
.dims-section h3 {
  font-size: 10px; font-weight: 600; letter-spacing: 4px; color: rgba(168,85,247,0.5);
  text-transform: uppercase; margin-bottom: 20px;
}
.dim-row { display: flex; align-items: center; margin: 10px 0; font-size: 12px; }
.dim-label { width: 72px; color: rgba(255,255,255,0.3); flex-shrink: 0; font-weight: 300; font-size: 11px; }
.dim-bar { flex: 1; height: 2px; background: rgba(255,255,255,0.04); margin: 0 12px; }
.dim-fill { height: 100%; background: #a855f7; transition: width 1.2s; }
.dim-val { width: 36px; text-align: right; color: rgba(168,85,247,0.6); flex-shrink: 0;
  font-size: 11px; font-weight: 600; }

/* 按钮组 */
.result-actions { display: flex; flex-wrap: wrap; gap: 8px; margin: 32px 0; }
.retry-btn, .poster-btn, .share-btn {
  display: inline-block; padding: 14px 28px; margin: 0;
  font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;
  background: transparent; border: 1px solid rgba(168,85,247,0.3); color: #a855f7;
  border-radius: 0; cursor: pointer; transition: all 0.3s;
}
.retry-btn:hover, .poster-btn:hover, .share-btn:hover {
  background: #a855f7; color: #050508; border-color: #a855f7;
}

/* 二维码区 */
.qr-section {
  margin: 32px 0; padding: 24px 0; border-top: 1px solid rgba(255,255,255,0.04);
  display: flex; align-items: center; gap: 20px; max-width: 100%; text-align: left;
  background: transparent; border-radius: 0;
}
.qr-section img { width: 80px; height: 80px; border-radius: 0; margin: 0; flex-shrink: 0; }
.qr-section .qr-text { font-size: 11px; color: rgba(255,255,255,0.2); line-height: 1.8; font-weight: 300; }

/* 海报弹窗 */
.poster-overlay {
  display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.92); z-index: 9999;
  justify-content: center; align-items: center; flex-direction: column;
}
.poster-overlay.show { display: flex; }
.poster-overlay canvas { max-width: 90vw; max-height: 75vh; }
.poster-actions { margin-top: 20px; display: flex; gap: 12px; }
.poster-actions button {
  padding: 12px 28px; font-size: 11px; font-weight: 600; letter-spacing: 2px;
  cursor: pointer; transition: all 0.3s; border-radius: 0;
}
.poster-save { background: #a855f7; border: none; color: #050508; }
.poster-close { background: transparent; border: 1px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.4); }
.poster-save:hover { background: #c084fc; }
.poster-close:hover { border-color: #fff; color: #fff; }

.brand-logo { display: block; margin: 20px 0 5px; height: 24px; opacity: 0.4; }
.brand-text { color: rgba(255,255,255,0.1); font-size: 10px; margin-bottom: 10px; }

/* 底部镂空水印 */
.fsti-watermark {
  position: fixed; bottom: 16px; left: 0; width: 100%; text-align: center;
  font-family: 'Great Vibes', cursive; font-size: 80px;
  color: transparent;
  -webkit-text-stroke: 1px rgba(168,85,247,0.12);
  animation: wmBreath 4s ease-in-out infinite, wmFlow 6s linear infinite;
  pointer-events: none; z-index: 999; user-select: none;
}
@keyframes wmBreath {
  0%{ -webkit-text-stroke-color: rgba(168,85,247,0.08); }
  50%{ -webkit-text-stroke-color: rgba(168,85,247,0.2); }
  100%{ -webkit-text-stroke-color: rgba(168,85,247,0.08); }
}
@keyframes wmFlow {
  0%{ filter: drop-shadow(0 0 6px rgba(168,85,247,0)); }
  25%{ filter: drop-shadow(3px 0 15px rgba(168,85,247,0.15)); }
  50%{ filter: drop-shadow(0 0 6px rgba(168,85,247,0)); }
  75%{ filter: drop-shadow(-3px 0 15px rgba(168,85,247,0.1)); }
  100%{ filter: drop-shadow(0 0 6px rgba(168,85,247,0)); }
}
</style>`;

h = h.substring(0, si) + newCSS + h.substring(ei);

// === 3. 重构首页HTML ===
const homeStart = '<!-- \\u9996\\u9875 -->';
const homeEnd = '<!-- \\u6d4b\\u8bd5\\u9875 -->';
const hsi = h.indexOf('<!-- \u9996\u9875 -->');
const hei = h.indexOf('<!-- \u6d4b\u8bd5\u9875 -->');

// 提取logo的base64 src
const logoMatch = h.match(/src="(data:image\/png;base64,[^"]+)" alt="QQ/);
const logoSrc = logoMatch ? logoMatch[1] : '';

const newHome = `<!-- \u9996\u9875 -->
<div class="page active" id="page-home">
  <div class="title-section">
    <h1>Fsti</h1>
    <div class="sub-en">Fandom Soul Type Indicator</div>
    <div class="divider"></div>
    <div class="hero-line">\u4f60\u8ffd\u7684\u4e0d\u662f\u661f\uff0c<br>\u662f\u4f60<span>\u7075\u9b42\u6df1\u5904</span>\u7684\u6267\u5ff5\u3002</div>
    <div class="tagline">\u672c\u6d4b\u8bd5\u53ef\u80fd\u7cbe\u51c6\u5230\u8ba9\u4f60\u6000\u7591\u624b\u673a\u88ab\u76d1\u63a7\u3002<br>\u7ed3\u679c\u4ec5\u4f9b\u5a31\u4e50\uff0c\u5021\u5bfc<em>\u7406\u6027\u8ffd\u661f\u3001\u5feb\u4e50\u8ffd\u661f</em>\u3002</div>
  </div>
  <button class="start-btn" id="btn-start">\u5f00\u59cb\u6d4b\u8bd5</button>
  <div class="footer-note">20 Questions \u00b7 24 Types \u00b7 3 Min</div>
  <img class="brand-logo" src="${logoSrc}" alt="QQ\u97f3\u4e50">
</div>

`;

h = h.substring(0, hsi) + newHome + h.substring(hei);

fs.writeFileSync('fsti-test.html', h, 'utf8');

// Verify
const h2 = fs.readFileSync('fsti-test.html','utf8');
const m = h2.match(/<script>([\x00-\uffff]*?)<\/script>/);
try { new Function(m[1]); console.log('JS OK'); } catch(e) { console.log('ERR:', e.message); }
console.log('Inter font:', h2.includes('Inter') ? 'YES' : 'NO');
console.log('Swiss design:', h2.includes('letter-spacing: 6px') ? 'YES' : 'NO');
console.log('Size:', (h2.length/1024).toFixed(0)+'KB');
