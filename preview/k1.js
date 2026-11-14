// K 系列预览（K1–K19）
(function () {
  var C = window.CUSTOM || (window.CUSTOM = {});
  var T = Math.PI * 2;
  function txt(c, s, x, y, size, color, font, align) {
    var weight = 400, family = SANS;
    if (typeof font === 'string') {
      var m = font.match(/^(\d{3})\s+([\s\S]+)$/);
      if (m) { weight = m[1]; family = m[2]; } else { family = font; }
    }
    c.save(); c.font = weight + ' ' + size + 'px ' + family;
    c.fillStyle = color; c.textBaseline = 'alphabetic'; c.textAlign = align || 'left';
    c.fillText(s, x, y); c.restore();
  }
  function tag(c, s, x, y, color, size) { txt(c, s, x, y, size || 14, color || 'rgba(0,0,0,.42)', MONO); }
  function face(c, x, y, r, ink) {
    c.fillStyle = ink;
    c.beginPath(); c.arc(x - r * 0.34, y - r * 0.1, r * 0.09, 0, T); c.fill();
    c.beginPath(); c.arc(x + r * 0.34, y - r * 0.1, r * 0.09, 0, T); c.fill();
    c.strokeStyle = ink; c.lineWidth = Math.max(2, r * 0.06); c.lineCap = 'round';
    c.beginPath(); c.arc(x, y + r * 0.12, r * 0.28, 0.3, Math.PI - 0.3); c.stroke();
  }

  // K1 扁平矢量
  C.K1 = function (c, W, H) {
    var bg = '#EAF2FB', blue = '#2F6BE8', red = '#E8503F', yellow = '#F5B72E', ink = '#1B2A3D', skin = '#F3C6A5';
    c.fillStyle = bg; c.fillRect(0, 0, W, H);
    // 背景几何
    c.fillStyle = '#CFE2F7'; c.beginPath(); c.arc(1000, 180, 150, 0, T); c.fill();
    c.fillStyle = '#BBD8F2'; c.fillRect(0, 560, W, 160);
    // 人物
    c.fillStyle = blue; c.fillRect(520, 400, 130, 220);
    c.fillStyle = yellow; c.fillRect(650, 400, 130, 220);
    c.fillStyle = ink;
    c.beginPath(); c.arc(590, 350, 54, 0, T); c.fill();
    c.beginPath(); c.arc(720, 350, 54, 0, T); c.fill();
    c.fillStyle = skin;
    c.beginPath(); c.arc(590, 350, 44, 0, T); c.fill();
    c.beginPath(); c.arc(720, 350, 44, 0, T); c.fill();
    face(c, 590, 350, 44, ink); face(c, 720, 350, 44, ink);
    // 手臂
    c.strokeStyle = skin; c.lineWidth = 22; c.lineCap = 'round';
    c.beginPath(); c.moveTo(540, 450); c.lineTo(470, 520); c.stroke();
    c.beginPath(); c.moveTo(760, 450); c.lineTo(830, 500); c.stroke();
    c.fillStyle = red; c.beginPath(); c.arc(470, 520, 18, 0, T); c.fill();
    txt(c, '平涂就好', 90, 200, 62, ink, '800 ' + SANS);
    txt(c, '不用阴影，不用渐变。', 92, 250, 22, 'rgba(27,42,61,.5)', '500 "Microsoft YaHei", sans-serif');
    tag(c, 'FLAT VECTOR / K1', 90, 680, 'rgba(27,42,61,.4)');
  };

  // K2 Q 版
  C.K2 = function (c, W, H) {
    var bg = '#FFF1E6', ink = '#4A3A33', skin = '#FFD9C0', hair = '#4A3A33', cloth = '#F58AA8';
    c.fillStyle = bg; c.fillRect(0, 0, W, H);
    c.fillStyle = '#FFE0CE'; c.beginPath(); c.arc(640, 380, 260, 0, T); c.fill();
    // 大头
    c.fillStyle = hair; c.beginPath(); c.arc(640, 330, 170, 0, T); c.fill();
    c.fillStyle = skin; c.beginPath(); c.arc(640, 350, 148, 0, T); c.fill();
    // 刘海
    c.fillStyle = hair;
    c.beginPath(); c.moveTo(500, 300); c.quadraticCurveTo(640, 150, 780, 300);
    c.quadraticCurveTo(700, 260, 640, 300); c.quadraticCurveTo(570, 260, 500, 300); c.fill();
    // 眼睛
    c.fillStyle = '#2B2B2B';
    c.beginPath(); c.ellipse(580, 370, 26, 34, 0, 0, T); c.fill();
    c.beginPath(); c.ellipse(700, 370, 26, 34, 0, 0, T); c.fill();
    c.fillStyle = '#fff';
    c.beginPath(); c.arc(572, 358, 9, 0, T); c.fill();
    c.beginPath(); c.arc(692, 358, 9, 0, T); c.fill();
    c.fillStyle = '#E88A8A'; c.beginPath(); c.ellipse(540, 420, 24, 12, 0, 0, T); c.fill();
    c.beginPath(); c.ellipse(740, 420, 24, 12, 0, 0, T); c.fill();
    c.strokeStyle = '#8A5A4A'; c.lineWidth = 4; c.lineCap = 'round';
    c.beginPath(); c.arc(640, 420, 18, 0.2, Math.PI - 0.2); c.stroke();
    // 小身子
    c.fillStyle = cloth;
    if (c.roundRect) c.roundRect(590, 496, 100, 110, 40); else c.rect(590, 496, 100, 110);
    c.fill();
    c.strokeStyle = skin; c.lineWidth = 18;
    c.beginPath(); c.moveTo(596, 530); c.lineTo(540, 580); c.stroke();
    c.beginPath(); c.moveTo(684, 530); c.lineTo(740, 580); c.stroke();
    txt(c, 'Q 版', 90, 190, 74, ink, '800 ' + SANS);
    txt(c, '头大，手短，眼睛亮。', 92, 238, 22, 'rgba(74,58,51,.5)', '500 "Microsoft YaHei", sans-serif');
    tag(c, 'CHIBI / K2', 90, 680, 'rgba(74,58,51,.4)');
  };

  // K3 卡哇伊
  C.K3 = function (c, W, H) {
    var bg = '#FFF5F8', pink = '#FFB7CE', ink = '#5A4046';
    c.fillStyle = bg; c.fillRect(0, 0, W, H);
    [[220, 180, 60], [1080, 520, 44], [320, 580, 30], [1000, 160, 24]].forEach(function (p) {
      c.fillStyle = 'rgba(255,183,206,.5)'; c.beginPath(); c.arc(p[0], p[1], p[2], 0, T); c.fill();
    });
    c.fillStyle = pink;
    c.beginPath(); c.ellipse(640, 400, 190, 168, 0, 0, T); c.fill();
    c.beginPath(); c.arc(540, 260, 62, 0, T); c.fill();
    c.beginPath(); c.arc(740, 260, 62, 0, T); c.fill();
    c.fillStyle = '#FFD9E4';
    c.beginPath(); c.arc(540, 260, 40, 0, T); c.fill();
    c.beginPath(); c.arc(740, 260, 40, 0, T); c.fill();
    // 胡须
    c.strokeStyle = 'rgba(90,64,70,.55)'; c.lineWidth = 3; c.lineCap = 'round';
    [[-1, 600], [1, 680]].forEach(function (d) {
      for (var k = 0; k < 3; k++) {
        c.beginPath(); c.moveTo(640 + d[0] * 70, 430 + k * 14);
        c.lineTo(640 + d[0] * 170, 410 + k * 26); c.stroke();
      }
    });
    // 三角鼻
    c.fillStyle = '#E88AA8';
    c.beginPath(); c.moveTo(624, 428); c.lineTo(656, 428); c.lineTo(640, 446); c.closePath(); c.fill();
    c.fillStyle = ink;
    c.beginPath(); c.arc(580, 380, 12, 0, T); c.fill();
    c.beginPath(); c.arc(700, 380, 12, 0, T); c.fill();
    c.fillStyle = '#E88AA8'; c.beginPath(); c.arc(640, 420, 8, 0, T); c.fill();
    c.strokeStyle = ink; c.lineWidth = 4; c.lineCap = 'round';
    c.beginPath(); c.moveTo(640, 428); c.quadraticCurveTo(620, 450, 600, 440); c.stroke();
    c.beginPath(); c.moveTo(640, 428); c.quadraticCurveTo(660, 450, 680, 440); c.stroke();
    c.fillStyle = 'rgba(232,138,168,.6)';
    c.beginPath(); c.ellipse(520, 420, 30, 16, 0, 0, T); c.fill();
    c.beginPath(); c.ellipse(760, 420, 30, 16, 0, 0, T); c.fill();
    txt(c, '卡哇伊', 90, 190, 64, ink, '800 ' + SANS);
    txt(c, '圆滚滚，豆豆眼。', 92, 236, 22, 'rgba(90,64,70,.5)', '500 "Microsoft YaHei", sans-serif');
    tag(c, 'KAWAII / K3', 90, 680, 'rgba(90,64,70,.4)');
  };

  // K4 极简线条小人
  C.K4 = function (c, W, H) {
    c.fillStyle = '#FFFFFF'; c.fillRect(0, 0, W, H);
    c.strokeStyle = '#171717'; c.lineWidth = 6; c.lineCap = 'round';
    var x = 620, y = 300;
    c.beginPath(); c.arc(x, y, 56, 0, T); c.stroke();
    c.beginPath(); c.moveTo(x, y + 56); c.lineTo(x, y + 240); c.stroke();
    c.beginPath(); c.moveTo(x, y + 110); c.lineTo(x - 110, y + 180); c.stroke();
    c.beginPath(); c.moveTo(x, y + 110); c.lineTo(x + 110, y + 150); c.stroke();
    c.beginPath(); c.moveTo(x, y + 240); c.lineTo(x - 80, y + 380); c.stroke();
    c.beginPath(); c.moveTo(x, y + 240); c.lineTo(x + 80, y + 380); c.stroke();
    txt(c, '极简', 90, 200, 62, '#171717', '300 ' + SANS);
    txt(c, '几根线，就是一个人。', 92, 246, 21, 'rgba(23,23,23,.45)', '300 "Microsoft YaHei", sans-serif');
    tag(c, 'MINIMAL LINE / K4', 90, 680, 'rgba(23,23,23,.35)');
  };

  // K5 孟菲斯扁平人
  C.K5 = function (c, W, H) {
    var bg = '#F4F1EA', blue = '#3A5BD9', red = '#E8503F', yellow = '#F5B72E', teal = '#3AAFA9', ink = '#222';
    c.fillStyle = bg; c.fillRect(0, 0, W, H);
    c.fillStyle = yellow; c.fillRect(860, 90, 130, 130);
    c.fillStyle = teal; c.beginPath(); c.arc(200, 200, 90, 0, T); c.fill();
    c.fillStyle = red; c.fillRect(120, 520, 180, 40);
    // 长手长脚的人
    c.fillStyle = red; c.fillRect(596, 380, 88, 110);
    c.strokeStyle = ink; c.lineWidth = 10; c.lineCap = 'round';
    c.beginPath(); c.moveTo(640, 344); c.lineTo(640, 382); c.stroke();
    c.beginPath(); c.moveTo(612, 412); c.lineTo(462, 330); c.stroke();
    c.beginPath(); c.moveTo(668, 412); c.lineTo(820, 342); c.stroke();
    c.beginPath(); c.moveTo(620, 490); c.lineTo(560, 600); c.stroke();
    c.beginPath(); c.moveTo(660, 490); c.lineTo(720, 600); c.stroke();
    c.fillStyle = blue; c.beginPath(); c.arc(640, 300, 46, 0, T); c.fill();
    txt(c, '孟菲斯', 90, 190, 62, ink, '800 ' + SANS);
    txt(c, '手脚很长，颜色很跳。', 92, 236, 21, 'rgba(34,34,34,.45)', '500 "Microsoft YaHei", sans-serif');
    tag(c, 'MEMPHIS / K5', 90, 680, 'rgba(34,34,34,.35)');
  };

  // K6 清线漫画
  C.K6 = function (c, W, H) {
    var bg = '#F6F1E3', ink = '#1A1A1A', blue = '#2B5FA8', skin = '#F2D3B0', red = '#C8452F';
    c.fillStyle = bg; c.fillRect(0, 0, W, H);
    c.strokeStyle = ink; c.lineWidth = 3; c.lineJoin = 'round';
    // 记者
    c.fillStyle = blue;
    c.beginPath(); c.moveTo(540, 620); c.lineTo(540, 420); c.quadraticCurveTo(640, 360, 740, 420); c.lineTo(740, 620); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = skin; c.beginPath(); c.arc(640, 320, 84, 0, T); c.fill(); c.stroke();
    c.fillStyle = ink;
    c.beginPath(); c.moveTo(556, 300); c.quadraticCurveTo(640, 190, 724, 300);
    c.quadraticCurveTo(690, 258, 640, 286); c.quadraticCurveTo(590, 258, 556, 300); c.fill(); c.stroke();
    c.fillStyle = ink;
    c.beginPath(); c.arc(612, 320, 6, 0, T); c.fill();
    c.beginPath(); c.arc(668, 320, 6, 0, T); c.fill();
    c.beginPath(); c.arc(640, 352, 18, 0.2, Math.PI - 0.2); c.stroke();
    // 狗
    c.fillStyle = '#E8D3A8';
    c.beginPath(); c.ellipse(900, 560, 70, 46, 0, 0, T); c.fill(); c.stroke();
    c.beginPath(); c.arc(960, 520, 32, 0, T); c.fill(); c.stroke();
    c.fillStyle = ink;
    c.beginPath(); c.arc(972, 514, 4, 0, T); c.fill();
    txt(c, '清线', 90, 190, 60, ink, '800 ' + SANS);
    txt(c, '一条线都不含糊。', 92, 236, 21, 'rgba(26,26,26,.45)', '500 "Microsoft YaHei", sans-serif');
    tag(c, 'CLEAN LINE / K6', 90, 680, 'rgba(26,26,26,.35)');
  };

  // K7 日式动画
  C.K7 = function (c, W, H) {
    var bg = '#FDF6F0', hair = '#2B2430', skin = '#FFE0CC', red = '#D94A4A';
    var g = c.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#FFE9F0'); g.addColorStop(1, '#FDF6F0');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    // 头发
    c.fillStyle = hair;
    c.beginPath(); c.moveTo(420, 520);
    c.quadraticCurveTo(400, 180, 640, 150); c.quadraticCurveTo(880, 180, 860, 520);
    c.lineTo(800, 480); c.lineTo(780, 300); c.lineTo(720, 360); c.lineTo(640, 250);
    c.lineTo(560, 360); c.lineTo(500, 300); c.lineTo(480, 480); c.closePath(); c.fill();
    // 脸
    c.fillStyle = skin;
    c.beginPath(); c.ellipse(640, 400, 140, 160, 0, 0, T); c.fill();
    // 刘海
    c.fillStyle = hair;
    c.beginPath(); c.moveTo(500, 340); c.quadraticCurveTo(560, 240, 660, 260);
    c.quadraticCurveTo(740, 250, 790, 330); c.quadraticCurveTo(700, 292, 640, 320);
    c.quadraticCurveTo(570, 292, 500, 340); c.fill();
    // 大眼
    function eye(x) {
      c.fillStyle = '#fff'; c.beginPath(); c.ellipse(x, 410, 34, 44, 0, 0, T); c.fill();
      c.fillStyle = '#4A6FD9'; c.beginPath(); c.ellipse(x, 414, 22, 32, 0, 0, T); c.fill();
      c.fillStyle = '#1A1A2A'; c.beginPath(); c.ellipse(x, 416, 12, 20, 0, 0, T); c.fill();
      c.fillStyle = '#fff'; c.beginPath(); c.arc(x - 7, 400, 8, 0, T); c.fill();
      c.strokeStyle = '#2B2430'; c.lineWidth = 4;
      c.beginPath(); c.arc(x, 410, 34, 3.4, 6.1); c.stroke();
    }
    eye(586); eye(694);
    c.fillStyle = 'rgba(240,120,120,.35)';
    c.beginPath(); c.ellipse(540, 460, 26, 14, 0, 0, T); c.fill();
    c.beginPath(); c.ellipse(740, 460, 26, 14, 0, 0, T); c.fill();
    c.strokeStyle = '#B04A4A'; c.lineWidth = 3;
    c.beginPath(); c.arc(640, 470, 14, 0.3, Math.PI - 0.3); c.stroke();
    txt(c, '日式动画', 90, 180, 56, '#2B2430', '800 ' + SANS);
    txt(c, '眼睛要大，光要打在里面。', 92, 226, 21, 'rgba(43,36,48,.5)', '500 "Microsoft YaHei", sans-serif');
    tag(c, 'ANIME / K7', 90, 680, 'rgba(43,36,48,.4)');
  };

  // K8 绘本
  C.K8 = function (c, W, H) {
    KIT.paper(c, W, H, '#F4E8D4', 81, { fibers: 6000, len: 22 });
    c.fillStyle = 'rgba(214,236,214,.5)'; c.beginPath(); c.arc(980, 180, 160, 0, T); c.fill();
    // 小熊
    c.fillStyle = '#B98A5E';
    c.beginPath(); c.ellipse(640, 430, 170, 180, 0, 0, T); c.fill();
    c.beginPath(); c.arc(520, 280, 62, 0, T); c.fill();
    c.beginPath(); c.arc(760, 280, 62, 0, T); c.fill();
    c.fillStyle = '#D9B48C';
    c.beginPath(); c.arc(520, 280, 38, 0, T); c.fill();
    c.beginPath(); c.arc(760, 280, 38, 0, T); c.fill();
    c.beginPath(); c.ellipse(640, 470, 100, 80, 0, 0, T); c.fill();
    c.fillStyle = '#3A2A20';
    c.beginPath(); c.arc(592, 400, 10, 0, T); c.fill();
    c.beginPath(); c.arc(688, 400, 10, 0, T); c.fill();
    c.beginPath(); c.ellipse(640, 470, 18, 13, 0, 0, T); c.fill();
    c.strokeStyle = '#3A2A20'; c.lineWidth = 3; c.lineCap = 'round';
    c.beginPath(); c.arc(640, 486, 12, 0.3, Math.PI - 0.3); c.stroke();
    c.fillStyle = 'rgba(232,120,120,.35)';
    c.beginPath(); c.ellipse(520, 452, 26, 15, 0, 0, T); c.fill();
    c.beginPath(); c.ellipse(760, 452, 26, 15, 0, 0, T); c.fill();
    txt(c, '绘本', 90, 190, 64, '#3A2A20', '400 "Songti SC", "SimSun", serif');
    txt(c, '形状软一点，纸的纹路留着。', 92, 238, 21, 'rgba(58,42,32,.5)', '400 "Microsoft YaHei", sans-serif');
    tag(c, 'PICTURE BOOK / K8', 90, 680, 'rgba(58,42,32,.4)');
  };

  // K9 涂鸦
  C.K9 = function (c, W, H) {
    c.fillStyle = '#FBF8F2'; c.fillRect(0, 0, W, H);
    c.save(); c.translate(620, 360); c.rotate(-0.06);
    // 草稿线
    c.strokeStyle = 'rgba(90,90,90,.25)'; c.lineWidth = 2;
    for (var i = 0; i < 6; i++) {
      c.beginPath(); c.ellipse(0, -60, 150 + i * 8, 160 + i * 6, i * 0.2, 0, T); c.stroke();
    }
    c.strokeStyle = '#1A1A1A'; c.lineWidth = 7; c.lineCap = 'round'; c.lineJoin = 'round';
    c.beginPath(); c.arc(0, -110, 96, 0, T); c.stroke();
    c.beginPath(); c.arc(0, -110, 100, 0.4, 2.6); c.stroke();
    c.fillStyle = '#1A1A1A';
    c.beginPath(); c.arc(-34, -126, 9, 0, T); c.fill();
    c.beginPath(); c.arc(36, -126, 9, 0, T); c.fill();
    c.beginPath(); c.arc(0, -90, 24, 0.2, Math.PI - 0.2); c.stroke();
    c.beginPath(); c.moveTo(0, -14); c.lineTo(0, 120); c.stroke();
    c.beginPath(); c.moveTo(0, 20); c.lineTo(-110, 90); c.stroke();
    c.beginPath(); c.moveTo(0, 20); c.lineTo(112, 76); c.stroke();
    c.beginPath(); c.moveTo(0, 120); c.lineTo(-70, 230); c.stroke();
    c.beginPath(); c.moveTo(0, 120); c.lineTo(74, 224); c.stroke();
    c.restore();
    txt(c, '涂鸦', 90, 190, 64, '#1A1A1A', '800 ' + SANS);
    txt(c, '线条可以歪，草稿线不用擦。', 92, 238, 21, 'rgba(26,26,26,.45)', '500 "Microsoft YaHei", sans-serif');
    tag(c, 'DOODLE / K9', 90, 680, 'rgba(26,26,26,.35)');
  };

  // K10 粉笔黑板
  C.K10 = function (c, W, H) {
    c.fillStyle = '#20272A'; c.fillRect(0, 0, W, H);
    KIT.grain(c, W, H, 101, 0.08);
    var r = rng(102);
    for (var i = 0; i < 40; i++) {
      c.fillStyle = 'rgba(255,255,255,' + (0.02 + r() * 0.04) + ')';
      c.beginPath(); c.ellipse(r() * W, r() * H, 40 + r() * 90, 8 + r() * 16, r() * T, 0, T); c.fill();
    }
    c.save(); c.lineCap = 'round'; c.lineJoin = 'round';
    // 粉笔画：房子 + 太阳
    c.strokeStyle = 'rgba(247,243,232,.92)'; c.lineWidth = 5;
    c.strokeRect(420, 380, 300, 220);
    c.beginPath(); c.moveTo(396, 384); c.lineTo(570, 270); c.lineTo(744, 384); c.stroke();
    c.strokeRect(500, 470, 60, 60); c.strokeRect(600, 470, 60, 60);
    c.strokeStyle = 'rgba(245,214,110,.95)'; c.lineWidth = 5;
    c.beginPath(); c.arc(920, 200, 70, 0, T); c.stroke();
    for (var k = 0; k < 8; k++) {
      var a = k / 8 * T;
      c.beginPath(); c.moveTo(920 + Math.cos(a) * 92, 200 + Math.sin(a) * 92);
      c.lineTo(920 + Math.cos(a) * 122, 200 + Math.sin(a) * 122); c.stroke();
    }
    c.strokeStyle = 'rgba(214,240,220,.9)'; c.lineWidth = 4;
    for (var m = 0; m < 5; m++) { c.beginPath(); c.moveTo(160, 300 + m * 22); c.lineTo(300, 300 + m * 22); c.stroke(); }
    c.restore();
    c.save();
    c.font = '400 62px "Segoe Print", "Comic Sans MS", "KaiTi", cursive';
    c.fillStyle = 'rgba(247,243,232,.95)';
    c.fillText('今天学盖房子', 150, 210);
    c.restore();
    tag(c, 'CHALKBOARD / K10', 150, 700, 'rgba(247,243,232,.45)');
  };

  // K11 手账笔记
  C.K11 = function (c, W, H) {
    c.fillStyle = '#F8F4EA'; c.fillRect(0, 0, W, H);
    c.save(); c.strokeStyle = 'rgba(120,140,180,.22)'; c.lineWidth = 1.4;
    for (var y = 120; y < H; y += 44) { c.beginPath(); c.moveTo(80, y); c.lineTo(W - 80, y); c.stroke(); }
    c.strokeStyle = 'rgba(200,90,90,.35)';
    c.beginPath(); c.moveTo(170, 80); c.lineTo(170, H - 60); c.stroke();
    c.restore();
    KIT.handText(c, '今天记三件事', 210, 150, 54, '#2B2622', 5, { font: 'KaiTi, "Microsoft YaHei", sans-serif', double: true });
    c.strokeStyle = '#2B2622'; c.lineWidth = 3;
    [[210, 230], [210, 300], [210, 370]].forEach(function (p, i) {
      c.strokeRect(p[0], p[1] - 20, 26, 26);
      c.fillStyle = '#C8452F';
      c.beginPath(); c.moveTo(p[0] + 4, p[1] - 6); c.lineTo(p[0] + 12, p[1] + 4); c.lineTo(p[0] + 24, p[1] - 14); c.stroke();
    });
    KIT.handText(c, '把线画清楚', 260, 232, 32, '#2B2622', 11, { font: 'KaiTi, "Microsoft YaHei", sans-serif' });
    KIT.handText(c, '把话说短', 260, 302, 32, '#2B2622', 12, { font: 'KaiTi, "Microsoft YaHei", sans-serif' });
    KIT.handText(c, '把图贴上', 260, 372, 32, '#2B2622', 13, { font: 'KaiTi, "Microsoft YaHei", sans-serif' });
    // 便利贴
    c.save(); c.translate(880, 420); c.rotate(0.06);
    c.fillStyle = '#FFE9A8'; c.fillRect(0, 0, 240, 180);
    c.restore();
    KIT.handText(c, '下周再看一遍', 900, 490, 26, 'rgba(43,38,34,.8)', 14, { font: 'KaiTi, "Microsoft YaHei", sans-serif' });
    tag(c, 'BULLET JOURNAL / K11', 210, 690, 'rgba(43,38,34,.4)');
  };

  // K12 报纸四格
  C.K12 = function (c, W, H) {
    c.fillStyle = '#F2EEE2'; c.fillRect(0, 0, W, H);
    c.strokeStyle = '#1A1A1A'; c.lineWidth = 4;
    var px = 120, py = 150, pw = 480, ph = 200, gap = 30;
    for (var r = 0; r < 2; r++) for (var col = 0; col < 2; col++) {
      c.strokeRect(px + col * (pw + gap), py + r * (ph + gap), pw, ph);
    }
    // 四格内容：一个圆头小人
    function figure(x, y, s, extra) {
      c.save(); c.translate(x, y); c.scale(s, s);
      c.strokeStyle = '#1A1A1A'; c.lineWidth = 4; c.fillStyle = '#fff';
      c.beginPath(); c.arc(0, 0, 26, 0, T); c.fill(); c.stroke();
      c.beginPath(); c.moveTo(0, 26); c.lineTo(0, 74); c.stroke();
      c.beginPath(); c.moveTo(0, 40); c.lineTo(-26, 62); c.moveTo(0, 40); c.lineTo(26, 54); c.stroke();
      c.beginPath(); c.moveTo(0, 74); c.lineTo(-20, 104); c.moveTo(0, 74); c.lineTo(20, 104); c.stroke();
      c.fillStyle = '#1A1A1A';
      c.beginPath(); c.arc(-8, -4, 3, 0, T); c.fill();
      c.beginPath(); c.arc(8, -4, 3, 0, T); c.fill();
      c.restore();
    }
    figure(300, 230, 1); figure(830, 230, 1);
    figure(300, 470, 1); figure(830, 470, 1);
    // 对话框
    c.strokeStyle = '#1A1A1A'; c.lineWidth = 3;
    c.beginPath(); if (c.roundRect) c.roundRect(660, 190, 300, 70, 6); else c.rect(660, 190, 300, 70); c.stroke();
    txt(c, '这有什么好笑的？', 676, 234, 18, '#1A1A1A', '400 "Microsoft YaHei", sans-serif');
    c.beginPath(); if (c.roundRect) c.roundRect(660, 430, 300, 70, 6); else c.rect(660, 430, 300, 70); c.stroke();
    txt(c, '……确实好笑。', 676, 474, 18, '#1A1A1A', '400 "Microsoft YaHei", sans-serif');
    txt(c, '四格', 120, 110, 40, '#1A1A1A', '800 ' + SANS);
    tag(c, 'NEWSPAPER STRIP / K12', 120, 700, 'rgba(26,26,26,.4)');
  };

  // K13 美漫网点
  C.K13 = function (c, W, H) {
    c.fillStyle = '#F5EFE0'; c.fillRect(0, 0, W, H);
    c.save(); c.fillStyle = 'rgba(30,30,30,.16)';
    for (var y = 0; y < H; y += 8) for (var x = (y / 8 % 2) * 8; x < W; x += 16) c.fillRect(x, y, 4, 4);
    c.restore();
    // 速度线
    c.save(); c.strokeStyle = 'rgba(20,20,20,.6)'; c.lineWidth = 4;
    for (var i = 0; i < 22; i++) {
      var a = -1.1 + i * 0.06;
      c.beginPath(); c.moveTo(640, 380); c.lineTo(640 + Math.cos(a) * 460, 380 + Math.sin(a) * 460); c.stroke();
    }
    c.restore();
    // 英雄
    c.fillStyle = '#2A6FDB'; c.strokeStyle = '#141414'; c.lineWidth = 8; c.lineJoin = 'round';
    c.beginPath();
    c.moveTo(640, 250); c.lineTo(720, 380); c.lineTo(660, 380); c.lineTo(700, 560);
    c.lineTo(580, 560); c.lineTo(620, 380); c.lineTo(560, 380); c.closePath();
    c.fill(); c.stroke();
    c.fillStyle = '#E23B2E';
    c.beginPath(); c.arc(640, 240, 56, 0, T); c.fill(); c.stroke();
    c.fillStyle = '#141414';
    c.beginPath(); c.ellipse(618, 236, 12, 8, 0, 0, T); c.fill();
    c.beginPath(); c.ellipse(662, 236, 12, 8, 0, 0, T); c.fill();
    // 爆炸框
    c.save(); c.translate(980, 200);
    c.fillStyle = '#FFD43B'; c.beginPath();
    for (var k = 0; k < 14; k++) { var ang = k / 14 * T, rr = k % 2 ? 56 : 96; c.lineTo(Math.cos(ang) * rr, Math.sin(ang) * rr); }
    c.closePath(); c.fill(); c.strokeStyle = '#141414'; c.lineWidth = 6; c.stroke();
    c.restore();
    txt(c, 'BAM!', 936, 220, 40, '#141414', '900 ' + SANS);
    txt(c, '美漫', 90, 160, 52, '#141414', '900 ' + SANS);
    tag(c, 'AMERICAN COMIC / K13', 90, 690, 'rgba(20,20,20,.4)');
  };

  // K14 波普
  C.K14 = function (c, W, H) {
    var red = '#E23B2E', yellow = '#FFD43B', blue = '#2B6BD9', ink = '#141414';
    c.fillStyle = yellow; c.fillRect(0, 0, W, H);
    c.fillStyle = red; c.beginPath(); c.arc(300, 200, 180, 0, T); c.fill();
    // 人脸
    c.fillStyle = '#FFE3C4'; c.beginPath(); c.ellipse(620, 380, 170, 195, 0, 0, T); c.fill();
    c.strokeStyle = ink; c.lineWidth = 10; c.stroke();
    c.fillStyle = ink;
    c.beginPath(); c.ellipse(560, 350, 26, 18, 0, 0, T); c.fill();
    c.beginPath(); c.ellipse(686, 350, 26, 18, 0, 0, T); c.fill();
    c.fillStyle = red; c.beginPath(); c.ellipse(620, 440, 54, 30, 0, 0, T); c.fill();
    c.fillStyle = '#fff'; c.fillRect(590, 428, 60, 10);
    // 网点
    c.save(); c.fillStyle = 'rgba(226,59,46,.5)';
    for (var y = 200; y < 560; y += 12) for (var x = 470 + (y / 12 % 2) * 12; x < 780; x += 24) c.fillRect(x, y, 5, 5);
    c.restore();
    // 对话框
    c.fillStyle = '#fff'; c.strokeStyle = ink; c.lineWidth = 8;
    c.beginPath(); if (c.roundRect) c.roundRect(840, 130, 330, 150, 18); else c.rect(840, 130, 330, 150);
    c.fill(); c.stroke();
    txt(c, 'POP!', 900, 230, 68, red, '900 ' + SANS);
    txt(c, '波普', 90, 640, 56, ink, '900 ' + SANS);
    tag(c, 'POP ART / K14', 90, 690, 'rgba(20,20,20,.4)');
  };

  // K15 橡皮管 1930
  C.K15 = function (c, W, H) {
    c.fillStyle = '#F3EEE0'; c.fillRect(0, 0, W, H);
    c.save(); c.fillStyle = 'rgba(20,20,20,.05)';
    for (var y = 0; y < H; y += 6) c.fillRect(0, y, W, 1);
    c.restore();
    c.strokeStyle = '#171717'; c.fillStyle = '#F3EEE0'; c.lineWidth = 9; c.lineCap = 'round';
    // 身体
    c.beginPath(); c.ellipse(640, 450, 120, 130, 0, 0, T); c.fill(); c.stroke();
    // 头
    c.beginPath(); c.arc(640, 290, 100, 0, T); c.fill(); c.stroke();
    // 饼形眼
    c.fillStyle = '#171717';
    c.beginPath(); c.ellipse(606, 276, 22, 30, 0, 0, T); c.fill();
    c.beginPath(); c.ellipse(674, 276, 22, 30, 0, 0, T); c.fill();
    c.fillStyle = '#F3EEE0';
    c.beginPath(); c.arc(600, 266, 7, 0, T); c.fill();
    c.beginPath(); c.arc(668, 266, 7, 0, T); c.fill();
    // 嘴
    c.beginPath(); c.arc(640, 320, 36, 0.25, Math.PI - 0.25); c.stroke();
    // 面条手
    c.beginPath(); c.moveTo(530, 420); c.bezierCurveTo(430, 380, 400, 500, 340, 470); c.stroke();
    c.beginPath(); c.moveTo(750, 420); c.bezierCurveTo(850, 380, 880, 500, 940, 470); c.stroke();
    c.beginPath(); c.arc(340, 470, 24, 0, T); c.fill(); c.stroke();
    c.beginPath(); c.arc(940, 470, 24, 0, T); c.fill(); c.stroke();
    // 面条腿
    c.beginPath(); c.moveTo(590, 570); c.bezierCurveTo(570, 640, 620, 680, 580, 720); c.stroke();
    c.beginPath(); c.moveTo(690, 570); c.bezierCurveTo(710, 640, 660, 680, 700, 720); c.stroke();
    txt(c, '橡皮管', 90, 170, 56, '#171717', '800 ' + SANS);
    txt(c, '手脚像面条，眼睛像饼。', 92, 216, 20, 'rgba(23,23,23,.45)', '500 "Microsoft YaHei", sans-serif');
    tag(c, 'RUBBER HOSE 1930 / K15', 90, 120, 'rgba(23,23,23,.4)');
  };

  // K16 中世纪现代
  C.K16 = function (c, W, H) {
    var cream = '#F2E8D5', teal = '#2A7C74', mustard = '#D9A02B', brick = '#B4462F', ink = '#1F2A2A';
    c.fillStyle = cream; c.fillRect(0, 0, W, H);
    c.fillStyle = teal; c.beginPath(); c.arc(900, 240, 160, 0, T); c.fill();
    c.fillStyle = mustard; c.fillRect(80, 480, 300, 24);
    c.fillStyle = brick; c.beginPath(); c.moveTo(420, 560); c.lineTo(560, 340); c.lineTo(700, 560); c.closePath(); c.fill();
    // 抽象人物
    c.fillStyle = ink; c.beginPath(); c.arc(300, 300, 46, 0, T); c.fill();
    c.fillStyle = brick; c.fillRect(258, 346, 84, 150);
    c.fillStyle = ink; c.fillRect(258, 496, 36, 90); c.fillRect(306, 496, 36, 90);
    c.strokeStyle = ink; c.lineWidth = 6;
    c.beginPath(); c.moveTo(342, 370); c.lineTo(430, 330); c.stroke();
    txt(c, 'MID-CENTURY', 80, 180, 46, ink, '700 ' + SANS);
    txt(c, '几何、平涂、颜色少但敢用。', 82, 220, 18, 'rgba(31,42,42,.5)', '500 "Microsoft YaHei", sans-serif');
    tag(c, 'MID-CENTURY / K16', 80, 690, 'rgba(31,42,42,.4)');
  };

  // K17 几何
  C.K17 = function (c, W, H) {
    c.fillStyle = '#F7F2E7'; c.fillRect(0, 0, W, H);
    var cols = ['#E8503F', '#2F6BE8', '#F5B72E', '#3AAFA9', '#1B2A3D'];
    c.fillStyle = cols[0]; c.beginPath(); c.arc(420, 330, 170, 0, T); c.fill();
    c.fillStyle = cols[1]; c.fillRect(560, 200, 240, 240);
    c.fillStyle = cols[2]; c.beginPath(); c.moveTo(840, 330); c.lineTo(980, 560); c.lineTo(700, 560); c.closePath(); c.fill();
    c.fillStyle = cols[3]; c.beginPath(); c.arc(300, 540, 90, 0, T); c.fill();
    c.fillStyle = cols[4]; c.fillRect(880, 120, 70, 70);
    c.strokeStyle = '#1B2A3D'; c.lineWidth = 6;
    c.beginPath(); c.arc(420, 330, 170, 0, T); c.stroke();
    txt(c, '几何', 90, 170, 64, '#1B2A3D', '800 ' + SANS);
    txt(c, '圆、方、三角，拼出一切。', 92, 216, 21, 'rgba(27,42,61,.45)', '500 "Microsoft YaHei", sans-serif');
    tag(c, 'GEOMETRIC / K17', 90, 690, 'rgba(27,42,61,.4)');
  };

  // K18 水彩
  C.K18 = function (c, W, H) {
    KIT.paper(c, W, H, '#FBF7EF', 181, { fibers: 9000, len: 26 });
    function wash(x, y, r, col, seed) {
      var rr = rng(seed);
      for (var i = 0; i < 14; i++) {
        c.fillStyle = col.replace('A', (0.05 + rr() * 0.09).toFixed(2));
        c.beginPath();
        c.ellipse(x + (rr() - 0.5) * r * 0.8, y + (rr() - 0.5) * r * 0.6, r * (0.45 + rr() * 0.55), r * (0.3 + rr() * 0.45), rr() * T, 0, T);
        c.fill();
      }
    }
    wash(520, 380, 260, 'rgba(110,160,215,A)', 182);
    wash(760, 430, 230, 'rgba(235,150,100,A)', 183);
    wash(650, 250, 170, 'rgba(135,190,135,A)', 184);
    // 一朵花
    c.save(); c.translate(640, 380);
    c.fillStyle = 'rgba(240,150,170,.55)';
    for (var i = 0; i < 7; i++) {
      var a = i / 7 * T;
      c.beginPath(); c.ellipse(Math.cos(a) * 58, Math.sin(a) * 58, 52, 30, a, 0, T); c.fill();
    }
    c.fillStyle = 'rgba(70,150,200,.5)';
    c.beginPath(); c.arc(0, 0, 34, 0, T); c.fill();
    c.strokeStyle = 'rgba(90,140,80,.9)'; c.lineWidth = 12; c.lineCap = 'round';
    c.beginPath(); c.moveTo(0, 50); c.quadraticCurveTo(-20, 160, 10, 260); c.stroke();
    c.fillStyle = 'rgba(110,160,90,.6)';
    c.beginPath(); c.ellipse(-70, 140, 46, 20, -0.5, 0, T); c.fill();
    c.beginPath(); c.ellipse(72, 190, 42, 18, 0.4, 0, T); c.fill();
    c.restore();
    txt(c, '水彩', 90, 180, 64, 'rgba(80,70,60,.9)', '400 "Songti SC", "SimSun", serif');
    txt(c, '边缘自己会晕开。', 92, 226, 21, 'rgba(80,70,60,.45)', '400 "Microsoft YaHei", sans-serif');
    tag(c, 'WATERCOLOR / K18', 90, 680, 'rgba(80,70,60,.4)');
  };

  // K19 厚涂
  C.K19 = function (c, W, H) {
    c.fillStyle = '#2E2422'; c.fillRect(0, 0, W, H);
    var r = rng(191);
    c.save(); c.translate(640, 350);
    c.fillStyle = '#5A4038'; c.beginPath(); c.ellipse(0, 250, 270, 170, 0, Math.PI, T); c.fill();
    c.fillStyle = '#C98A66'; c.fillRect(-38, 120, 76, 120);
    c.fillStyle = '#E0A87E'; c.beginPath(); c.ellipse(0, 10, 122, 152, 0, 0, T); c.fill();
    c.fillStyle = '#3A2420';
    c.beginPath(); c.moveTo(-126, 40);
    c.bezierCurveTo(-150, -140, 150, -160, 132, 30);
    c.bezierCurveTo(110, -60, -100, -70, -126, 40); c.fill();
    c.fillStyle = '#2B1B18';
    c.beginPath(); c.ellipse(-46, -6, 16, 11, 0, 0, T); c.fill();
    c.beginPath(); c.ellipse(44, -6, 16, 11, 0, 0, T); c.fill();
    c.strokeStyle = '#8E4A3A'; c.lineWidth = 6; c.lineCap = 'round';
    c.beginPath(); c.moveTo(-2, 4); c.lineTo(-8, 50); c.quadraticCurveTo(8, 58, 22, 50); c.stroke();
    c.beginPath(); c.moveTo(-32, 92); c.quadraticCurveTo(0, 110, 34, 90); c.stroke();
    c.fillStyle = 'rgba(200,90,70,.32)';
    c.beginPath(); c.ellipse(-80, 54, 26, 16, 0, 0, T); c.fill();
    c.beginPath(); c.ellipse(82, 54, 26, 16, 0, 0, T); c.fill();
    c.restore();
    function strokes(x, y, w, h, cols, n) {
      for (var i = 0; i < n; i++) {
        var px = x + (r() - 0.5) * w, py = y + (r() - 0.5) * h;
        c.save(); c.translate(px, py); c.rotate((r() - 0.5) * 1.1);
        c.fillStyle = cols[Math.floor(r() * cols.length)]; c.globalAlpha = 0.34;
        c.beginPath(); c.ellipse(0, 0, 10 + r() * 16, 4 + r() * 6, 0, 0, T); c.fill();
        c.restore();
      }
    }
    strokes(640, 370, 230, 290, ['#F0C49E', '#D89A74', '#C98462', '#F5D3B0'], 90);
    strokes(640, 290, 250, 190, ['#3A2420', '#2B1B18', '#4A3028'], 40);
    // 五官压在最上面
    c.save(); c.translate(640, 350);
    c.fillStyle = '#2B1B18';
    c.beginPath(); c.ellipse(-46, -6, 17, 12, 0, 0, T); c.fill();
    c.beginPath(); c.ellipse(44, -6, 17, 12, 0, 0, T); c.fill();
    c.strokeStyle = '#8E4A3A'; c.lineWidth = 6; c.lineCap = 'round';
    c.beginPath(); c.moveTo(-2, 4); c.lineTo(-8, 50); c.quadraticCurveTo(8, 58, 22, 50); c.stroke();
    c.beginPath(); c.moveTo(-32, 92); c.quadraticCurveTo(0, 110, 34, 90); c.stroke();
    c.fillStyle = 'rgba(200,90,70,.3)';
    c.beginPath(); c.ellipse(-82, 54, 26, 16, 0, 0, T); c.fill();
    c.beginPath(); c.ellipse(84, 54, 26, 16, 0, 0, T); c.fill();
    c.restore();
    txt(c, '厚涂', 90, 180, 62, '#F0D9C4', '800 ' + SANS);
    txt(c, '看得见笔触，也看得见层次。', 92, 226, 20, 'rgba(240,217,196,.55)', '500 "Microsoft YaHei", sans-serif');
    tag(c, 'IMPASTO / K19', 90, 690, 'rgba(240,217,196,.4)');
  };
})();
