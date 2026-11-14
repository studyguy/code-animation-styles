// X 系列预览渲染（第二部分：X13–X31）
(function () {
  var C = window.CUSTOM || (window.CUSTOM = {});
  var T = Math.PI * 2;

  function txt(c, s, x, y, size, color, font, align) {
    var weight = 400, family = SANS;
    if (typeof font === 'string') {
      var m = font.match(/^(\d{3})\s+([\s\S]+)$/);
      if (m) { weight = m[1]; family = m[2]; } else { family = font; }
    }
    c.save();
    c.font = weight + ' ' + size + 'px ' + family;
    c.fillStyle = color; c.textBaseline = 'alphabetic';
    c.textAlign = align || 'left';
    c.fillText(s, x, y);
    c.restore();
  }
  function tag(c, s, x, y, color, size) { txt(c, s, x, y, size || 15, color || 'rgba(255,255,255,.6)', MONO); }
  function rule(c, x1, y1, x2, y2, color, w) {
    c.save(); c.strokeStyle = color; c.lineWidth = w || 1;
    c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke(); c.restore();
  }
  function px(c, x, y, s, col) { c.fillStyle = col; c.fillRect(x, y, s, s); }

  // ---------------- X13 16-bit 街机
  C.X13 = function (c, W, H) {
    var g = c.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#10081f'); g.addColorStop(0.55, '#1b0f3a'); g.addColorStop(1, '#5a2a6e');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    var r = rng(13);
    for (var i = 0; i < 120; i++) px(c, Math.floor(r() * W / 6) * 6, Math.floor(r() * H * 0.6 / 6) * 6, 4, 'rgba(217,204,255,' + (0.25 + r() * 0.6) + ')');
    for (var x = 0; x < W; x += 48) {
      c.fillStyle = '#3d1a52'; c.fillRect(x, 560, 48, 160);
      c.fillStyle = '#5a2a6e'; c.fillRect(x, 560, 48, 10);
    }
    (function () {
      var u = 18, ox = 170, oy = 428;
      var cells = [[2, 0], [3, 0], [2, 1], [3, 1], [1, 2], [2, 2], [3, 2], [4, 2], [1, 3], [2, 3], [3, 3], [4, 3], [2, 4], [3, 4], [1, 5], [4, 5]];
      cells.forEach(function (p) { px(c, ox + p[0] * u, oy + p[1] * u, u - 2, '#ffd23f'); });
      px(c, ox + 2 * u, oy, u - 2, '#ff5a4f');
      c.fillStyle = 'rgba(0,0,0,.35)';
      c.beginPath(); c.ellipse(ox + 3 * u, oy + 6 * u, 46, 8, 0, 0, T); c.fill();
    })();
    txt(c, 'STAGE 01', 96, 190, 58, '#ffd23f', '900 ' + MONO);
    txt(c, 'THE STYLE RUN', 96, 240, 26, '#d9ccff', '700 ' + MONO);
    txt(c, 'HIGH SCORE', 96, 330, 18, 'rgba(217,204,255,.7)', MONO);
    txt(c, '034100', 96, 380, 46, '#ffffff', '700 ' + MONO);
    txt(c, 'PRESS START', W - 96, 520, 26, '#ffd23f', '700 ' + MONO, 'right');
    c.fillStyle = '#ffd23f'; c.fillRect(W - 84, 500, 14, 26);
    tag(c, 'INSERT COIN', W - 96, 580, 'rgba(217,204,255,.6)', 14);
    KIT.scan(c, W, H, 4, 0.16);
  };

  // ---------------- X15 热敏小票
  C.X15 = function (c, W, H) {
    var bg = '#2c3038', paper = '#f6f3ea', ink = '#2c3038', teal = '#2e5b5f', red = '#d23a3a';
    c.fillStyle = bg; c.fillRect(0, 0, W, H);
    c.save(); c.translate(W / 2, 0);
    c.shadowColor = 'rgba(0,0,0,.5)'; c.shadowBlur = 40; c.shadowOffsetY = 10;
    c.fillStyle = paper; c.fillRect(-260, 40, 520, 620);
    c.restore();
    for (var x = W / 2 - 260; x < W / 2 + 260; x += 12) {
      c.fillStyle = bg;
      c.beginPath(); c.moveTo(x, 40); c.lineTo(x + 6, 52); c.lineTo(x + 12, 40); c.closePath(); c.fill();
      c.beginPath(); c.moveTo(x, 660); c.lineTo(x + 6, 648); c.lineTo(x + 12, 660); c.closePath(); c.fill();
    }
    var lx = W / 2 - 224;
    txt(c, 'STYLE MART', W / 2, 110, 26, ink, '700 ' + MONO, 'center');
    txt(c, '341 种风格 · 自助结账', W / 2, 138, 14, teal, MONO, 'center');
    rule(c, lx, 160, lx + 448, 160, 'rgba(44,48,56,.35)', 1.5);
    var items = [['逐帧手绘', '12.00'], ['等距 2.5D', '09.50'], ['剪纸', '08.00'], ['CRT 终端', '15.00'], ['折纸', '06.50']];
    items.forEach(function (it, i) {
      var y = 200 + i * 42;
      txt(c, it[0], lx, y, 20, ink, '500 ' + MONO);
      txt(c, it[1], lx + 448, y, 20, ink, '500 ' + MONO, 'right');
    });
    rule(c, lx, 412, lx + 448, 412, 'rgba(44,48,56,.35)', 1.5);
    txt(c, 'TOTAL', lx, 452, 22, ink, '700 ' + MONO);
    txt(c, '341.00', lx + 448, 452, 34, ink, '700 ' + MONO, 'right');
    txt(c, '谢谢惠顾 / THANK YOU', W / 2, 520, 16, teal, MONO, 'center');
    var rb = rng(5);
    for (var i = 0; i < 54; i++) {
      c.fillStyle = ink; c.fillRect(lx + 40 + i * 7, 552, 1 + (rb() < 0.4 ? 3 : 1.5), 60);
    }
    txt(c, 'NO. 00341', W / 2, 640, 14, teal, MONO, 'center');
    c.save(); c.translate(W / 2 + 140, 300); c.rotate(-0.18);
    c.strokeStyle = red; c.lineWidth = 4;
    c.strokeRect(-70, -34, 140, 68);
    txt(c, '已挑选', 0, 10, 30, red, '700 "Microsoft YaHei", sans-serif', 'center');
    c.restore();
    tag(c, 'THERMAL RECEIPT', W - 64, 700, 'rgba(246,243,234,.4)', 14);
  };

  // ---------------- X16 地铁线路图
  C.X16 = function (c, W, H) {
    var paper = '#f4f0e6', ink = '#1d1d22', muted = '#6f6a60', terra = '#d9774f', navy = '#23408e';
    c.fillStyle = paper; c.fillRect(0, 0, W, H);
    KIT.grain(c, W, H, 16, 0.025);
    function line(pts, color) {
      c.save(); c.strokeStyle = color; c.lineWidth = 16; c.lineCap = 'round'; c.lineJoin = 'round';
      c.beginPath(); pts.forEach(function (p, i) { i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]); });
      c.stroke(); c.restore();
    }
    var p1 = [[120, 560], [330, 560], [430, 460], [700, 460], [800, 360], [1090, 360]];
    var p2 = [[220, 180], [220, 330], [320, 430], [320, 620], [620, 620], [720, 520], [1000, 520]];
    line(p1, terra); line(p2, navy);
    function station(x, y, color, on) {
      c.beginPath(); c.arc(x, y, 13, 0, T); c.fillStyle = paper; c.fill();
      c.lineWidth = 7; c.strokeStyle = color; c.stroke();
      if (on) { c.beginPath(); c.arc(x, y, 6, 0, T); c.fillStyle = color; c.fill(); }
    }
    [[120, 560], [330, 560], [430, 460], [700, 460], [800, 360], [1090, 360]].forEach(function (p, i) { station(p[0], p[1], terra, i === 3); });
    [[220, 180], [220, 330], [320, 430], [320, 620], [620, 620], [720, 520], [1000, 520]].forEach(function (p, i) { station(p[0], p[1], navy, i === 4); });
    c.fillStyle = navy; c.fillRect(620, 250, 300, 74);
    txt(c, 'STYLE LINE', 640, 282, 20, '#fff', '700 ' + MONO);
    txt(c, '往 341 方向', 640, 310, 18, 'rgba(255,255,255,.8)', '500 "Microsoft YaHei", sans-serif');
    txt(c, '换乘一次，', 96, 120, 44, ink, '800 ' + SANS);
    txt(c, '就能到终点。', 96, 172, 44, ink, '800 ' + SANS);
    tag(c, 'TRANSIT MAP', W - 96, 120, muted);
    txt(c, '— 一条线，九个站，一个方向。', 96, 660, 22, muted, '400 ' + SANS);
    c.fillStyle = terra; c.fillRect(900, 640, 22, 8); txt(c, 'A 线', 932, 650, 16, muted, MONO);
    c.fillStyle = navy; c.fillRect(1020, 640, 22, 8); txt(c, 'B 线', 1052, 650, 16, muted, MONO);
  };

  // ---------------- X17 蓝图
  C.X17 = function (c, W, H) {
    var blue = '#17508c', white = 'rgba(238,246,255,.92)', dim = 'rgba(238,246,255,.4)', yel = '#ffd166';
    c.fillStyle = blue; c.fillRect(0, 0, W, H);
    c.save(); c.strokeStyle = 'rgba(238,246,255,.10)'; c.lineWidth = 1;
    for (var x = 0; x < W; x += 40) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); }
    for (var y = 0; y < H; y += 40) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
    c.restore();
    c.strokeStyle = 'rgba(238,246,255,.5)'; c.lineWidth = 2; c.strokeRect(40, 40, W - 80, H - 80);
    function box(x, y, w, h, n) {
      c.strokeStyle = white; c.lineWidth = 2.5; c.strokeRect(x, y, w, h);
      c.beginPath(); c.arc(x, y, 16, 0, T); c.strokeStyle = yel; c.lineWidth = 1.8; c.stroke();
      txt(c, String(n), x, y + 6, 15, yel, MONO, 'center');
      txt(c, 'PART ' + n, x + 8, y + h + 24, 14, dim, MONO);
    }
    box(160, 220, 210, 150, 1); box(470, 220, 210, 150, 2); box(780, 220, 210, 150, 3);
    c.strokeStyle = white; c.lineWidth = 2;
    [[370, 295, 470, 295], [680, 295, 780, 295]].forEach(function (a) {
      c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(a[2], a[1]); c.stroke();
      c.beginPath(); c.moveTo(a[2], a[1]); c.lineTo(a[2] - 14, a[1] - 7); c.lineTo(a[2] - 14, a[1] + 7); c.closePath();
      c.fillStyle = white; c.fill();
    });
    c.save(); c.strokeStyle = dim; c.lineWidth = 1.4; c.setLineDash([6, 6]);
    c.beginPath(); c.moveTo(160, 430); c.lineTo(990, 430); c.stroke();
    c.setLineDash([]);
    [160, 990].forEach(function (px0) {
      c.beginPath(); c.moveTo(px0, 415); c.lineTo(px0, 445); c.stroke();
    });
    c.restore();
    txt(c, '760 mm', 545, 460, 16, dim, MONO, 'center');
    c.strokeStyle = white; c.lineWidth = 2;
    c.strokeRect(W - 380, H - 210, 320, 150);
    txt(c, 'DRAWING No. 017', W - 360, H - 170, 16, dim, MONO);
    txt(c, 'BLUEPRINT / 结构', W - 360, H - 138, 22, white, '700 "Microsoft YaHei", sans-serif');
    txt(c, 'SHEET 1 OF 1 · 2026-11', W - 360, H - 106, 14, dim, MONO);
    txt(c, 'SPEC', 96, 150, 62, white, '700 ' + MONO);
    txt(c, '把结构画清楚，剩下的都好说。', 98, 186, 20, dim, '400 "Microsoft YaHei", sans-serif');
    tag(c, 'NOTE: 所有尺寸以毫米计', 96, 640, dim, 14);
  };

  // ---------------- X18 漫画书
  C.X18 = function (c, W, H) {
    var bg = '#05050f', ink = '#101020', yel = '#ffd43b', red = '#e03028', blue = '#3068c8';
    c.fillStyle = bg; c.fillRect(0, 0, W, H);
    KIT.vignette(c, W, H, 0.7, '0,0,0');
    c.save(); c.translate(W / 2, H / 2); c.rotate(-0.02);
    c.shadowColor = 'rgba(0,0,0,.7)'; c.shadowBlur = 40;
    c.fillStyle = '#f7f2e4'; c.fillRect(-520, -330, 1040, 660);
    c.restore();
    function panel(x, y, w, h, fill) {
      c.fillStyle = ink; c.fillRect(x, y, w, h);
      c.fillStyle = fill; c.fillRect(x + 8, y + 8, w - 16, h - 16);
    }
    panel(120, 90, 520, 300, blue);
    panel(660, 90, 500, 140, yel);
    panel(660, 250, 500, 140, '#f7f2e4');
    c.save(); c.fillStyle = 'rgba(16,16,32,.18)';
    for (var y = 96; y < 386; y += 7) for (var x = 126 + ((y / 7) % 2) * 7; x < 636; x += 14) c.fillRect(x, y, 3, 3);
    c.restore();
    c.save(); c.translate(910, 180);
    c.fillStyle = red; c.beginPath();
    for (var k = 0; k < 14; k++) { var a = k / 14 * T, rr = k % 2 ? 52 : 86; c.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); }
    c.closePath(); c.fill(); c.strokeStyle = ink; c.lineWidth = 4; c.stroke();
    c.restore();
    txt(c, 'BOOM', 872, 196, 34, '#fff', '900 ' + SANS);
    c.fillStyle = '#fff'; c.strokeStyle = ink; c.lineWidth = 4;
    c.beginPath(); if (c.roundRect) c.roundRect(690, 292, 440, 76, 8); else c.rect(690, 292, 440, 76);
    c.fill(); c.stroke();
    txt(c, '「这一页，翻过去就是下一章。」', 710, 322, 20, ink, '700 "Microsoft YaHei", sans-serif');
    txt(c, '「...」', 710, 350, 18, ink, '700 ' + SANS);
    txt(c, 'ISSUE #18', 124, 62, 16, 'rgba(16,16,32,.55)', MONO);
    txt(c, '漫画书 / COMIC ISSUE', 124, 730, 20, 'rgba(247,242,228,.35)', '400 "Microsoft YaHei", sans-serif');
  };

  // ---------------- X19 纪录片
  C.X19 = function (c, W, H) {
    c.fillStyle = '#000'; c.fillRect(0, 0, W, H);
    var r = rng(19);
    for (var i = 0; i < 180; i++) {
      c.fillStyle = 'rgba(' + Math.round(200 + r() * 55) + ',' + Math.round(170 + r() * 60) + ',' + Math.round(140 + r() * 60) + ',' + (0.06 + r() * 0.18) + ')';
      c.fillRect(r() * W, r() * H, 1.2, 1.2);
    }
    var g = c.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, 'rgba(150,71,60,.10)'); g.addColorStop(1, 'rgba(0,0,0,.7)');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    c.save();
    c.shadowColor = 'rgba(0,0,0,.8)'; c.shadowBlur = 50;
    c.fillStyle = '#D5CAB4'; c.fillRect(230, 140, 820, 400);
    c.restore();
    c.save();
    c.beginPath(); c.rect(250, 160, 780, 360); c.clip();
    c.fillStyle = '#D07152'; c.fillRect(250, 160, 780, 360);
    c.fillStyle = '#96473C';
    c.beginPath(); c.moveTo(250, 420);
    for (var x = 250; x <= 1030; x += 20) c.lineTo(x, 400 - 60 * Math.abs(Math.sin(x / 170)) - 20 * Math.sin(x / 60));
    c.lineTo(1030, 520); c.lineTo(250, 520); c.closePath(); c.fill();
    c.fillStyle = 'rgba(232,222,210,.55)';
    c.beginPath(); c.arc(820, 250, 46, 0, T); c.fill();
    c.restore();
    c.strokeStyle = 'rgba(232,222,210,.35)'; c.lineWidth = 2; c.strokeRect(250, 160, 780, 360);
    c.fillStyle = 'rgba(0,0,0,.65)'; c.fillRect(230, 570, 820, 66);
    txt(c, '「那一年，我们把整座山走了一遍。」', 254, 612, 28, '#E8DED2', '400 "Songti SC", "SimSun", serif');
    tag(c, '01:24:07 / ARCHIVE 1978', 230, 700, 'rgba(232,222,210,.45)', 14);
    txt(c, '纪录片', W - 230, 700, 22, 'rgba(232,222,210,.6)', '400 "Microsoft YaHei", sans-serif', 'right');
  };

  // ---------------- X20 博物馆展览
  C.X20 = function (c, W, H) {
    c.fillStyle = '#070604'; c.fillRect(0, 0, W, H);
    var fg = c.createLinearGradient(0, 560, 0, H);
    fg.addColorStop(0, 'rgba(106,90,67,.35)'); fg.addColorStop(1, 'rgba(7,6,4,0)');
    c.fillStyle = fg; c.fillRect(0, 560, W, 160);
    var lg = c.createRadialGradient(W / 2, 60, 30, W / 2, 60, 700);
    lg.addColorStop(0, 'rgba(255,156,96,.52)'); lg.addColorStop(0.5, 'rgba(255,120,70,.18)'); lg.addColorStop(1, 'rgba(255,156,96,0)');
    c.fillStyle = lg; c.fillRect(0, 0, W, H);
    c.fillStyle = '#2a2019'; c.fillRect(500, 470, 280, 130);
    c.fillStyle = '#3a2c22'; c.fillRect(500, 470, 280, 14);
    c.save();
    var vg = c.createLinearGradient(520, 0, 760, 0);
    vg.addColorStop(0, '#8A4B33'); vg.addColorStop(0.35, '#F0A077'); vg.addColorStop(0.65, '#E58B62'); vg.addColorStop(1, '#7A6046');
    c.fillStyle = vg;
    c.beginPath();
    c.moveTo(600, 290); c.bezierCurveTo(520, 320, 510, 430, 570, 468);
    c.lineTo(710, 468); c.bezierCurveTo(770, 430, 760, 320, 680, 290);
    c.closePath(); c.fill();
    c.strokeStyle = 'rgba(255,220,190,.55)'; c.lineWidth = 2.5;
    c.beginPath(); c.ellipse(640, 292, 42, 12, 0, 0, T); c.stroke();
    c.fillStyle = 'rgba(255,230,200,.28)';
    c.beginPath(); c.ellipse(604, 380, 22, 54, 0.12, 0, T); c.fill();
    c.restore();
    c.fillStyle = '#EADEC6'; c.fillRect(830, 400, 300, 130);
    txt(c, 'No. 020', 850, 432, 16, '#653728', MONO);
    txt(c, '折肩陶罐', 850, 468, 26, '#2a2019', '700 "Songti SC", "SimSun", serif');
    txt(c, '公元前 2000 年 · 手制', 850, 498, 15, '#6A5A43', '400 "Microsoft YaHei", sans-serif');
    txt(c, 'MUSEUM', 64, 700, 20, 'rgba(218,210,197,.45)', MONO);
    txt(c, '一件东西，值得一盏灯。', 64, 640, 24, 'rgba(218,210,197,.7)', '400 "Songti SC", "SimSun", serif');
    KIT.vignette(c, W, H, 0.75, '0,0,0');
  };

  // ---------------- X21 突发新闻
  C.X21 = function (c, W, H) {
    var bg = '#030e29', red = '#d6121c', blue = '#36b5fe', ink = '#e8eefb';
    c.fillStyle = bg; c.fillRect(0, 0, W, H);
    c.save(); c.strokeStyle = 'rgba(54,181,254,.08)'; c.lineWidth = 1;
    for (var x = 0; x < W; x += 54) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); }
    for (var y = 0; y < H; y += 54) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
    c.restore();
    var r = rng(21);
    for (var i = 0; i < 700; i++) {
      var mx = 120 + r() * 1040, my = 120 + r() * 330;
      c.fillStyle = r() < 0.1 ? 'rgba(54,181,254,.8)' : 'rgba(54,181,254,.18)';
      c.fillRect(mx, my, 3, 3);
    }
    c.fillStyle = red; c.fillRect(0, 470, W, 88);
    txt(c, 'BREAKING', 64, 532, 46, '#fff', '900 ' + SANS);
    txt(c, '刚刚确认：这条线，全部走通。', 320, 528, 34, '#fff', '700 "Microsoft YaHei", sans-serif');
    c.fillStyle = '#0c2151'; c.fillRect(0, 558, W, 46);
    txt(c, 'STYLE 341 · 193 STILLS · 148 TO BUILD · 10 SERIES ·', 64, 588, 18, 'rgba(232,238,251,.75)', MONO);
    c.fillStyle = blue; c.fillRect(0, 604, W, 3);
    txt(c, 'LIVE', 64, 110, 22, red, '700 ' + MONO);
    c.beginPath(); c.arc(136, 102, 7, 0, T); c.fillStyle = red; c.fill();
    txt(c, '晚间新闻', 64, 190, 58, ink, '800 "Songti SC", "SimSun", serif');
    txt(c, '整点更新 / 22:00', 64, 230, 20, 'rgba(232,238,251,.55)', '400 "Microsoft YaHei", sans-serif');
    tag(c, 'NEWS CHANNEL 07', W - 64, 110, 'rgba(232,238,251,.5)');
  };

  // ---------------- X22 侦探线索板
  C.X22 = function (c, W, H) {
    var cork = '#89552F', paper = '#EFE4CE', red = '#C8271D', pin = '#B78F9A';
    c.fillStyle = cork; c.fillRect(0, 0, W, H);
    KIT.grain(c, W, H, 22, 0.10);
    c.save(); c.strokeStyle = 'rgba(23,16,10,.18)'; c.lineWidth = 1;
    var rr = rng(221);
    for (var i = 0; i < 260; i++) {
      var x = rr() * W, y = rr() * H;
      c.beginPath(); c.moveTo(x, y); c.lineTo(x + 6, y + 3); c.stroke();
    }
    c.restore();
    function photo(x, y, w, h, rot, col, label) {
      c.save(); c.translate(x + w / 2, y + h / 2); c.rotate(rot);
      c.shadowColor = 'rgba(0,0,0,.45)'; c.shadowBlur = 14; c.shadowOffsetY = 6;
      c.fillStyle = paper; c.fillRect(-w / 2, -h / 2, w, h);
      c.shadowColor = 'transparent';
      var ix = -w / 2 + 10, iy = -h / 2 + 10, iw = w - 20, ih = h - 46;
      c.fillStyle = col; c.fillRect(ix, iy, iw, ih);
      // 照片内容：一条地平线 + 一个剪影 + 颗粒
      c.fillStyle = 'rgba(23,16,10,.35)';
      c.fillRect(ix, iy + ih * 0.62, iw, ih * 0.38);
      c.beginPath();
      c.arc(ix + iw * 0.32, iy + ih * 0.34, Math.min(iw, ih) * 0.12, 0, T);
      c.fillStyle = 'rgba(23,16,10,.55)'; c.fill();
      c.fillRect(ix + iw * 0.32 - 6, iy + ih * 0.34, 12, ih * 0.28);
      c.fillStyle = 'rgba(239,228,206,.22)';
      c.fillRect(ix + iw * 0.66, iy + ih * 0.18, iw * 0.2, ih * 0.14);
      txt(c, label, -w / 2 + 12, h / 2 - 12, 14, 'rgba(23,16,10,.6)', MONO);
      c.restore();
    }
    photo(150, 140, 240, 190, -0.06, '#917350', 'FACT 01');
    photo(520, 110, 240, 190, 0.05, '#694929', 'FACT 02');
    photo(850, 170, 240, 190, -0.03, '#A19347', 'FACT 03');
    photo(300, 420, 260, 200, 0.04, '#B78F9A', 'SUSPECT');
    photo(720, 430, 260, 200, -0.05, '#C8271D', 'MOTIVE');
    c.save(); c.strokeStyle = red; c.lineWidth = 3;
    var pins = [[270, 145], [640, 115], [970, 175], [430, 425], [850, 435]];
    c.beginPath(); c.moveTo(pins[0][0], pins[0][1]);
    c.lineTo(pins[1][0], pins[1][1]); c.lineTo(pins[3][0], pins[3][1]);
    c.moveTo(pins[1][0], pins[1][1]); c.lineTo(pins[2][0], pins[2][1]); c.lineTo(pins[4][0], pins[4][1]);
    c.stroke(); c.restore();
    pins.forEach(function (p) {
      c.beginPath(); c.arc(p[0], p[1], 8, 0, T); c.fillStyle = pin; c.fill();
      c.beginPath(); c.arc(p[0] - 2, p[1] - 2, 3, 0, T); c.fillStyle = 'rgba(255,255,255,.6)'; c.fill();
    });
    c.save(); c.translate(1080, 90); c.rotate(0.07); c.fillStyle = '#F4D7CA'; c.fillRect(0, 0, 150, 110); c.restore();
    KIT.handText(c, '谁做的？', 1098, 145, 24, 'rgba(23,16,10,.8)', 33, { font: 'KaiTi, "Microsoft YaHei", sans-serif' });
    txt(c, 'CASE #07', 64, 700, 18, 'rgba(239,228,206,.55)', MONO);
    txt(c, '每一个事实都连得起来。', 64, 660, 24, 'rgba(239,228,206,.8)', '700 "Microsoft YaHei", sans-serif');
  };

  // ---------------- X23 绘本
  C.X23 = function (c, W, H) {
    c.fillStyle = '#40291a'; c.fillRect(0, 0, W, H);
    c.save(); c.strokeStyle = 'rgba(20,12,8,.35)'; c.lineWidth = 3;
    for (var y = 0; y < H; y += 38) {
      c.beginPath(); c.moveTo(0, y); c.lineTo(W, y + 8 * Math.sin(y / 60)); c.stroke();
    }
    c.restore();
    c.save(); c.translate(W / 2, 390);
    c.shadowColor = 'rgba(0,0,0,.55)'; c.shadowBlur = 40; c.shadowOffsetY = 14;
    c.fillStyle = '#F4EBD8'; c.fillRect(-470, -250, 940, 500);
    c.restore();
    c.fillStyle = 'rgba(70,25,18,.18)'; c.fillRect(W / 2 - 3, 140, 6, 500);
    c.save(); c.beginPath(); c.rect(186, 170, 440, 400); c.clip();
    var sky = c.createLinearGradient(0, 170, 0, 570);
    sky.addColorStop(0, '#a9d9f0'); sky.addColorStop(1, '#e8f2f7');
    c.fillStyle = sky; c.fillRect(186, 170, 440, 400);
    c.fillStyle = '#9bc278';
    c.beginPath(); c.moveTo(186, 470);
    c.quadraticCurveTo(320, 380, 430, 460); c.quadraticCurveTo(520, 510, 626, 450);
    c.lineTo(626, 570); c.lineTo(186, 570); c.closePath(); c.fill();
    c.fillStyle = '#632c21'; c.fillRect(390, 400, 100, 80);
    c.fillStyle = '#461912';
    c.beginPath(); c.moveTo(378, 402); c.lineTo(440, 356); c.lineTo(502, 402); c.closePath(); c.fill();
    c.fillStyle = '#40291a'; c.fillRect(430, 440, 26, 40);
    c.fillStyle = '#7a6485'; c.beginPath(); c.arc(540, 300, 24, 0, T); c.fill();
    c.restore();
    KIT.handText(c, '从前有座山', 720, 250, 40, 'rgba(70,25,18,.85)', 21, { font: 'KaiTi, "Microsoft YaHei", sans-serif' });
    KIT.handText(c, '山里有座庙', 720, 320, 40, 'rgba(70,25,18,.85)', 22, { font: 'KaiTi, "Microsoft YaHei", sans-serif' });
    KIT.handText(c, '庙里有个', 720, 390, 40, 'rgba(70,25,18,.85)', 23, { font: 'KaiTi, "Microsoft YaHei", sans-serif' });
    txt(c, '— 故事就是这样开始的。', 720, 470, 20, 'rgba(70,25,18,.5)', '400 "Microsoft YaHei", sans-serif');
    tag(c, 'PICTURE BOOK / 01', 64, 700, 'rgba(244,235,216,.35)', 14);
  };

  // ---------------- X24 RPG 任务
  C.X24 = function (c, W, H) {
    var navy = '#283267', gold = '#E6B85A';
    var g = c.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#0C0A22'); g.addColorStop(0.6, '#1B1545'); g.addColorStop(1, '#371D5A');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    var r = rng(24);
    for (var i = 0; i < 90; i++) px(c, Math.floor(r() * W / 5) * 5, Math.floor(r() * 380 / 5) * 5, 3, 'rgba(253,242,210,' + (0.3 + r() * 0.6) + ')');
    c.fillStyle = '#1B1545';
    c.beginPath(); c.moveTo(0, 470);
    for (var x = 0; x <= W; x += 30) c.lineTo(x, 440 - 40 * Math.abs(Math.sin(x / 190)));
    c.lineTo(W, 560); c.lineTo(0, 560); c.closePath(); c.fill();
    c.fillStyle = '#283267'; c.fillRect(900, 340, 150, 150);
    for (var k = 0; k < 4; k++) c.fillRect(900 + k * 42, 312, 22, 34);
    c.fillStyle = gold;
    for (var w = 0; w < 5; w++) c.fillRect(918 + (w % 2) * 46, 372 + Math.floor(w / 2) * 40, 14, 18);
    c.fillStyle = '#2A1F4A'; c.fillRect(0, 556, W, 164);
    c.fillStyle = '#3B2A63';
    for (var t = 0; t < W; t += 32) c.fillRect(t, 556, 16, 8);
    c.fillStyle = navy; c.fillRect(56, 470, 760, 170);
    c.strokeStyle = '#5A6BC8'; c.lineWidth = 4; c.strokeRect(56, 470, 760, 170);
    c.strokeStyle = 'rgba(255,255,255,.25)'; c.lineWidth = 1.5; c.strokeRect(64, 478, 744, 154);
    txt(c, ' QUEST 07 ', 84, 504, 16, gold, MONO);
    txt(c, '「沿着夜路往北，', 84, 548, 28, '#FDF2D2', '700 "Microsoft YaHei", sans-serif');
    txt(c, '  把 341 种风格收齐。」', 84, 590, 28, '#FDF2D2', '700 "Microsoft YaHei", sans-serif');
    txt(c, '▶ 接受任务', 660, 618, 18, gold, '700 "Microsoft YaHei", sans-serif');
    c.fillStyle = 'rgba(12,10,34,.85)'; c.fillRect(860, 60, 360, 190);
    c.strokeStyle = gold; c.lineWidth = 2; c.strokeRect(860, 60, 360, 190);
    txt(c, 'QUEST LOG', 880, 92, 16, gold, MONO);
    txt(c, '☐ 找到 148 张预览', 880, 128, 18, '#FDF2D2', '500 "Microsoft YaHei", sans-serif');
    txt(c, '☑ 定下视觉标准', 880, 158, 18, '#8FE0A8', '500 "Microsoft YaHei", sans-serif');
    txt(c, 'EXP', 880, 200, 14, gold, MONO);
    c.fillStyle = '#314292'; c.fillRect(880, 210, 300, 12);
    c.fillStyle = gold; c.fillRect(880, 210, 186, 12);
  };

  // ---------------- X25 天气预报
  C.X25 = function (c, W, H) {
    var g = c.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#09316b'); g.addColorStop(1, '#031433');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    c.save(); c.strokeStyle = 'rgba(222,228,231,.16)'; c.lineWidth = 2;
    for (var i = 0; i < 7; i++) {
      c.beginPath();
      for (var x = 0; x <= W; x += 20) {
        var y = 180 + i * 46 + Math.sin(x / 160 + i) * 26;
        x ? c.lineTo(x, y) : c.moveTo(x, y);
      }
      c.stroke();
    }
    c.restore();
    txt(c, '24°', 180, 270, 150, '#dee4e7', '300 ' + SANS);
    txt(c, '18°', 900, 250, 92, 'rgba(222,228,231,.55)', '300 ' + SANS);
    c.fillStyle = '#ffd75e'; c.beginPath(); c.arc(330, 420, 44, 0, T); c.fill();
    c.fillStyle = 'rgba(255,255,255,.85)';
    c.beginPath(); c.arc(700, 420, 40, 0, T); c.arc(760, 420, 52, 0, T); c.arc(820, 420, 36, 0, T); c.fill();
    c.fillStyle = 'rgba(3,20,51,.86)'; c.fillRect(0, 560, W, 160);
    c.fillStyle = '#dd2222'; c.fillRect(0, 560, 12, 160);
    txt(c, '今日天气', 64, 616, 40, '#fff', '800 "Microsoft YaHei", sans-serif');
    txt(c, '多云转晴 · 东南风 3 级 · 降水概率 10%', 64, 664, 24, 'rgba(222,228,231,.75)', '400 "Microsoft YaHei", sans-serif');
    txt(c, '22:00', W - 64, 616, 26, 'rgba(222,228,231,.7)', MONO, 'right');
    tag(c, 'WEATHER / 07', W - 64, 664, 'rgba(222,228,231,.45)', 14);
  };

  // ---------------- X26 电视购物
  C.X26 = function (c, W, H) {
    var hue = '#5B088A', hot = '#FFD400', red = '#E01B24', dark = '#1F1F1F';
    c.fillStyle = hue; c.fillRect(0, 0, W, H);
    c.save(); c.translate(W / 2, H * 0.55);
    for (var i = 0; i < 32; i++) {
      c.rotate(T / 32);
      c.fillStyle = i % 2 ? 'rgba(255,255,255,.06)' : 'rgba(255,212,0,.08)';
      c.beginPath(); c.moveTo(0, 0); c.lineTo(1400, -90); c.lineTo(1400, 90); c.closePath(); c.fill();
    }
    c.restore();
    c.save(); c.translate(W / 2 - 40, 380); c.rotate(-0.06);
    c.shadowColor = 'rgba(0,0,0,.45)'; c.shadowBlur = 40; c.shadowOffsetY = 20;
    c.fillStyle = dark; c.fillRect(-190, -150, 380, 300);
    c.fillStyle = '#2E2E2E'; c.fillRect(-170, -130, 340, 260);
    c.shadowColor = 'transparent';
    txt(c, '341', 0, 20, 110, hot, '900 ' + SANS, 'center');
    txt(c, 'STYLES', 0, 62, 22, 'rgba(255,255,255,.8)', MONO, 'center');
    c.restore();
    c.fillStyle = red; c.beginPath();
    c.moveTo(880, 250); c.lineTo(1160, 250); c.lineTo(1190, 285); c.lineTo(1160, 320); c.lineTo(880, 320); c.closePath(); c.fill();
    txt(c, '仅需', 900, 292, 24, '#fff', '700 "Microsoft YaHei", sans-serif');
    txt(c, '¥0', 960, 306, 68, hot, '900 ' + SANS);
    c.save(); c.translate(1040, 470);
    c.fillStyle = hot; c.beginPath();
    for (var k = 0; k < 18; k++) { var a = k / 18 * T, rr = k % 2 ? 70 : 104; c.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); }
    c.closePath(); c.fill();
    c.restore();
    txt(c, '限时', 1014, 462, 26, dark, '900 "Microsoft YaHei", sans-serif');
    txt(c, '免费', 1014, 496, 26, dark, '900 "Microsoft YaHei", sans-serif');
    txt(c, '不要 998，', 64, 620, 48, '#fff', '900 "Microsoft YaHei", sans-serif');
    txt(c, '也不要 98。', 64, 678, 48, hot, '900 "Microsoft YaHei", sans-serif');
    tag(c, 'ON AIR · 00:59', W - 64, 64, 'rgba(255,255,255,.7)', 16);
    c.fillStyle = red; c.beginPath(); c.arc(W - 250, 60, 9, 0, T); c.fill();
    txt(c, 'LIVE', W - 232, 68, 18, '#fff', '700 ' + MONO);
  };

  // ---------------- X27 体育直播
  C.X27 = function (c, W, H) {
    c.fillStyle = '#091330'; c.fillRect(0, 0, W, H);
    c.save(); c.globalCompositeOperation = 'lighter';
    [[300, -100], [980, -100]].forEach(function (p) {
      var g = c.createLinearGradient(p[0], p[1], p[0] + 90, 460);
      g.addColorStop(0, 'rgba(200,220,255,.22)'); g.addColorStop(1, 'rgba(200,220,255,0)');
      c.fillStyle = g;
      c.beginPath(); c.moveTo(p[0] - 30, p[1]); c.lineTo(p[0] + 30, p[1]); c.lineTo(p[0] + 180, 470); c.lineTo(p[0] - 10, 470); c.closePath(); c.fill();
    });
    c.restore();
    c.fillStyle = '#0B1A3A'; c.fillRect(0, 300, W, 150);
    for (var i = 0; i < 400; i++) {
      c.fillStyle = i % 9 === 0 ? 'rgba(204,90,40,.5)' : 'rgba(120,140,180,.18)';
      c.fillRect(20 + (i % 40) * 31, 316 + Math.floor(i / 40) * 26, 4, 4);
    }
    c.fillStyle = '#0F2A1A'; c.fillRect(0, 450, W, 270);
    for (var s = 0; s < 9; s++) {
      c.fillStyle = s % 2 ? 'rgba(22,68,42,.9)' : 'rgba(15,42,26,.9)';
      c.fillRect(s * 142, 450, 142, 270);
    }
    c.strokeStyle = 'rgba(220,230,255,.5)'; c.lineWidth = 3;
    c.beginPath(); c.moveTo(0, 520); c.lineTo(W, 520); c.stroke();
    c.beginPath(); c.arc(W / 2, 520, 90, 0, T); c.stroke();
    c.fillStyle = 'rgba(6,10,26,.92)'; c.fillRect(64, 60, 620, 120);
    c.fillStyle = '#cc5a28'; c.fillRect(64, 60, 8, 120);
    txt(c, 'LIVE', 96, 106, 20, '#ff5a4f', '700 ' + MONO);
    txt(c, 'STYLE', 96, 158, 44, '#fff', '800 ' + SANS);
    txt(c, '341', 300, 158, 44, '#ffd23f', '800 ' + MONO);
    txt(c, '已补', 470, 158, 26, 'rgba(255,255,255,.6)', '500 "Microsoft YaHei", sans-serif');
    txt(c, '148', 560, 158, 44, '#fff', '800 ' + MONO);
    c.fillStyle = 'rgba(9,19,48,.9)'; c.fillRect(0, 640, W, 80);
    c.fillStyle = '#cc5a28'; c.fillRect(0, 640, 10, 80);
    txt(c, '第 341 场 · 风格联赛', 40, 688, 24, '#fff', '600 "Microsoft YaHei", sans-serif');
    txt(c, '22:41', W - 64, 688, 22, 'rgba(255,255,255,.6)', MONO, 'right');
  };

  // ---------------- X28 组装说明书
  C.X28 = function (c, W, H) {
    var paper = '#F0EEE4', ink = '#191A18', dim = '#CCC6B6', accent = '#D0643A';
    c.fillStyle = paper; c.fillRect(0, 0, W, H);
    KIT.grain(c, W, H, 28, 0.03);
    KIT.vignette(c, W, H, 0.12, '120,110,95');
    function part(x, y, w, h, label, n) {
      c.strokeStyle = ink; c.lineWidth = 2.4; c.strokeRect(x, y, w, h);
      c.fillStyle = 'rgba(25,26,24,.04)'; c.fillRect(x, y, w, h);
      c.strokeStyle = accent; c.lineWidth = 1.6;
      c.beginPath(); c.arc(x + w / 2, y - 40, 18, 0, T); c.stroke();
      txt(c, String(n), x + w / 2, y - 34, 16, accent, MONO, 'center');
      c.save(); c.setLineDash([5, 5]); c.strokeStyle = dim; c.lineWidth = 1.4;
      c.beginPath(); c.moveTo(x + w / 2, y - 22); c.lineTo(x + w / 2, y); c.stroke(); c.restore();
      txt(c, label, x + w / 2, y + h + 28, 16, ink, '500 "Microsoft YaHei", sans-serif', 'center');
    }
    part(120, 250, 150, 150, '灯罩', 1);
    part(360, 250, 190, 150, '灯杆', 2);
    part(650, 250, 150, 150, '底座', 3);
    part(900, 250, 150, 150, '灯泡', 4);
    c.strokeStyle = dim; c.lineWidth = 2;
    [[290, 325, 340, 325], [570, 325, 630, 325], [820, 325, 880, 325]].forEach(function (a) {
      c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(a[2], a[1]); c.stroke();
      c.beginPath(); c.moveTo(a[2], a[1]); c.lineTo(a[2] - 12, a[1] - 6); c.lineTo(a[2] - 12, a[1] + 6); c.closePath();
      c.fillStyle = dim; c.fill();
    });
    txt(c, 'STEP 01', 120, 520, 15, accent, MONO);
    txt(c, '先装灯杆，再上灯罩。', 120, 556, 26, ink, '700 "Microsoft YaHei", sans-serif');
    txt(c, 'STEP 02', 120, 610, 15, accent, MONO);
    txt(c, '最后拧灯泡，别太用力。', 120, 646, 26, ink, '700 "Microsoft YaHei", sans-serif');
    txt(c, 'ASSEMBLY', 120, 150, 54, ink, '800 ' + SANS);
    txt(c, 'No. 028 / 台灯 / 4 个零件', 122, 186, 20, ink, '400 "Microsoft YaHei", sans-serif');
    txt(c, 'ASSEMBLY MANUAL', W - 120, 700, 16, dim, MONO, 'right');
  };

  // ---------------- X29 白板讲课
  C.X29 = function (c, W, H) {
    var board = '#F7F7F5', ink = '#24262E', blue = '#2F5BD6', green = '#158A45', red = '#D5382B', gray = '#99A2AB';
    c.fillStyle = board; c.fillRect(0, 0, W, H);
    c.save(); c.strokeStyle = 'rgba(153,162,171,.14)'; c.lineWidth = 46; c.lineCap = 'round';
    for (var i = 0; i < 4; i++) { c.beginPath(); c.arc(200 + i * 300, 120 + i * 40, 90, 0.4, 2.2); c.stroke(); }
    c.restore();
    KIT.handText(c, '这一章讲什么', 90, 110, 72, ink, 5, { double: true, track: 2 });
    KIT.strokePath(c, [[92, 150], [300, 156], [510, 149]], red, 8, 6, false, 3);
    function col(x, n, title, items, color) {
      txt(c, n, x, 232, 16, color, MONO);
      KIT.handText(c, title, x, 282, 38, ink, 40 + n.length, { double: true });
      items.forEach(function (it, i) {
        txt(c, '· ' + it, x, 330 + i * 36, 20, 'rgba(36,38,46,.72)', '500 "Microsoft YaHei", sans-serif');
      });
      KIT.strokePath(c, [[x - 4, 214], [x + 210, 218]], color, 5, 50 + n.length, false, 2);
    }
    col(100, '01', '问题', ['选题太散', '观众看不懂'], blue);
    col(500, '02', '结构', ['先结论', '再拆三步'], green);
    col(900, '03', '收尾', ['一句话记住', '给下一步'], red);
    KIT.strokePath(c, [[360, 470], [450, 470]], gray, 6, 60, false, 2);
    KIT.strokePath(c, [[760, 470], [850, 470]], gray, 6, 61, false, 2);
    c.save(); c.strokeStyle = blue; c.lineWidth = 4;
    if (c.roundRect) c.roundRect(100, 540, 1080, 100, 8); else c.rect(100, 540, 1080, 100);
    c.stroke(); c.restore();
    txt(c, '结论：先把结构讲清楚，再谈风格。', 130, 602, 30, ink, '700 "Microsoft YaHei", sans-serif');
    tag(c, 'WHITEBOARD LECTURE', W - 64, 690, gray, 14);
  };

  // ---------------- X30 电影预告
  C.X30 = function (c, W, H) {
    c.fillStyle = '#150B09'; c.fillRect(0, 0, W, H);
    var g = c.createRadialGradient(W * 0.5, H * 0.42, 30, W * 0.5, H * 0.42, 620);
    g.addColorStop(0, 'rgba(226,168,130,.22)'); g.addColorStop(0.5, 'rgba(154,117,98,.07)'); g.addColorStop(1, 'rgba(21,11,9,0)');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    var r = rng(30);
    for (var i = 0; i < 160; i++) {
      c.fillStyle = 'rgba(251,230,203,' + (0.05 + r() * 0.2) + ')';
      c.fillRect(r() * W, r() * H, 1.4, 1.4);
    }
    txt(c, 'IN A WORLD', W / 2, 250, 26, 'rgba(251,230,203,.55)', '400 ' + MONO, 'center');
    txt(c, 'WHERE  STYLE', W / 2, 350, 54, '#FBE6CB', '400 Georgia, "Times New Roman", serif', 'center');
    txt(c, 'IS  EVERYTHING', W / 2, 418, 54, '#FBE6CB', '400 Georgia, "Times New Roman", serif', 'center');
    rule(c, W / 2 - 180, 470, W / 2 + 180, 470, 'rgba(251,230,203,.4)', 1);
    txt(c, 'ONE LIBRARY.  341 WAYS.', W / 2, 512, 20, 'rgba(251,230,203,.6)', '400 ' + MONO, 'center');
    txt(c, 'COMING SOON', W / 2, 640, 22, 'rgba(251,230,203,.45)', '400 ' + MONO, 'center');
    ['DIRECTED BY  MOTION', 'SOUND  CANVAS', '2026'].forEach(function (s, i) {
      txt(c, s, W / 2, 566 + i * 18, 11, 'rgba(176,166,165,.35)', MONO, 'center');
    });
    tag(c, 'TRAILER / 02:31', 64, 60, 'rgba(251,230,203,.35)', 14);
    KIT.grain(c, W, H, 31, 0.05);
    KIT.vignette(c, W, H, 0.7, '0,0,0');
  };

  // ---------------- X31 数学证明讲课
  C.X31 = function (c, W, H) {
    var bg = '#0a0b0f', chalk = '#c7c7c9', cyan = '#5ac4dc', green = '#8ab679', red = '#ca6f74', yel = '#fed74b';
    c.fillStyle = bg; c.fillRect(0, 0, W, H);
    var g = c.createRadialGradient(W * 0.34, H * 0.4, 40, W * 0.34, H * 0.4, 640);
    g.addColorStop(0, 'rgba(90,196,220,.10)'); g.addColorStop(1, 'rgba(90,196,220,0)');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    txt(c, 'THEOREM 3.1', 90, 120, 18, cyan, MONO);
    KIT.handText(c, '对任意 n ≥ 1，', 90, 190, 46, chalk, 5, { font: 'KaiTi, "Microsoft YaHei", sans-serif' });
    KIT.handText(c, '前 n 个奇数的和等于 n²。', 90, 254, 46, chalk, 6, { font: 'KaiTi, "Microsoft YaHei", sans-serif' });
    txt(c, '1 + 3 + 5 + ⋯ + (2n − 1) = n²', 96, 350, 42, yel, '600 ' + MONO);
    txt(c, 'PROOF.', 96, 420, 16, green, MONO);
    txt(c, 'n = 1 时，1 = 1²，成立。', 96, 460, 22, 'rgba(199,199,201,.8)', '400 "Microsoft YaHei", sans-serif');
    txt(c, '设 n = k 时成立，加到第 k+1 项：', 96, 500, 22, 'rgba(199,199,201,.8)', '400 "Microsoft YaHei", sans-serif');
    txt(c, 'k² + (2k + 1) = (k + 1)²', 96, 546, 30, chalk, '600 ' + MONO);
    txt(c, '□', 96, 606, 46, red, '700 ' + MONO);
    var gx = 800, gy = 160, cell = 34;
    for (var i = 0; i < 5; i++) for (var j = 0; j < 5; j++) {
      c.strokeStyle = 'rgba(199,199,201,.35)'; c.lineWidth = 1;
      c.strokeRect(gx + i * cell, gy + j * cell, cell, cell);
    }
    for (var k = 0; k < 3; k++) {
      c.fillStyle = 'rgba(90,196,220,.30)';
      c.fillRect(gx + 4 * cell, gy + k * cell, cell, cell);
      c.fillRect(gx + k * cell, gy + 4 * cell, cell, cell);
    }
    c.fillStyle = 'rgba(254,215,75,.35)'; c.fillRect(gx + 4 * cell, gy + 4 * cell, cell, cell);
    txt(c, 'n² 的正方形 = n 个奇数', 800, 350, 18, 'rgba(199,199,201,.6)', '400 "Microsoft YaHei", sans-serif');
    tag(c, 'LECTURE / MATH 101', W - 64, 690, 'rgba(199,199,201,.4)', 14);
  };
})();
