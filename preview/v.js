// V 系列预览渲染（V3–V15）
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

  // ---------------- V3 扁平矢量
  C.V3 = function (c, W, H) {
    var cream = '#FFF6E9', blue = '#2B2BFF', green = '#2EE6A8', red = '#FF5A4E', yellow = '#FFC62B', ink = '#151433';
    c.fillStyle = cream; c.fillRect(0, 0, W, H);
    // 太阳
    c.fillStyle = yellow; c.beginPath(); c.arc(980, 210, 120, 0, T); c.fill();
    // 地面
    c.fillStyle = green; c.fillRect(0, 520, W, 200);
    c.fillStyle = '#20C98F'; c.fillRect(0, 520, W, 14);
    // 城市
    var blocks = [
      [80, 300, 150, 220, blue], [250, 360, 120, 160, red], [390, 250, 170, 270, blue],
      [580, 330, 130, 190, yellow], [730, 280, 150, 240, red]
    ];
    blocks.forEach(function (b) {
      c.fillStyle = b[4]; c.fillRect(b[0], b[1], b[2], b[3]);
      c.fillStyle = 'rgba(255,246,233,.85)';
      for (var y = b[1] + 24; y < b[1] + b[3] - 20; y += 42)
        for (var x = b[0] + 18; x < b[0] + b[2] - 18; x += 38) c.fillRect(x, y, 18, 22);
    });
    // 角色
    c.fillStyle = ink; c.beginPath(); c.arc(1080, 470, 42, 0, T); c.fill();
    c.fillStyle = red; c.fillRect(1046, 512, 68, 108);
    c.fillStyle = ink; c.fillRect(1046, 512, 12, 108); c.fillRect(1102, 512, 12, 108);
    c.fillStyle = ink; c.fillRect(1058, 620, 14, 52); c.fillRect(1088, 620, 14, 52);
    // 文案
    txt(c, '把复杂的事', 80, 150, 56, ink, '900 ' + SANS);
    txt(c, '拆成几块', 80, 216, 56, blue, '900 ' + SANS);
    txt(c, '一块一块讲清楚。', 82, 268, 22, 'rgba(21,20,51,.55)', '500 ' + SANS);
    tag(c, 'FLAT VECTOR / 01', 80, 690, 'rgba(21,20,51,.45)', 14);
  };

  // ---------------- V4 线条画
  C.V4 = function (c, W, H) {
    var bg = '#0B1320', gold = '#E9D7A5';
    c.fillStyle = bg; c.fillRect(0, 0, W, H);
    var g = c.createRadialGradient(W / 2, H / 2, 60, W / 2, H / 2, 700);
    g.addColorStop(0, 'rgba(233,215,165,.07)'); g.addColorStop(1, 'rgba(233,215,165,0)');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    // 一笔画：种子 → 芽 → 叶 → 楼 → 尖顶
    var pts = [];
    var i;
    for (i = 0; i <= 60; i++) { var a = i / 60 * T * 0.9; pts.push([250 + Math.cos(a) * 34, 520 + Math.sin(a) * 22]); }
    for (i = 0; i <= 40; i++) pts.push([250 + Math.sin(i / 40 * 3) * 6, 520 - i * 3.4]);
    for (i = 0; i <= 30; i++) pts.push([250 + i * 2.2, 384 - i * 0.9]);
    for (i = 0; i <= 30; i++) pts.push([316 + i * 2.0, 357 + i * 1.2]);
    for (i = 0; i <= 34; i++) pts.push([376 + i * 1.6, 393 - i * 1.6]);
    for (i = 0; i <= 40; i++) pts.push([430 + i * 4.6, 339]);
    for (i = 0; i <= 30; i++) pts.push([614 + i * 2.4, 339 - i * 2.4]);
    for (i = 0; i <= 46; i++) pts.push([686 + i * 2.6, 267]);
    for (i = 0; i <= 46; i++) pts.push([806 + i * 2.6, 267 + i * 2.6]);
    for (i = 0; i <= 40; i++) pts.push([926, 385 + i * 3.2]);

    c.save();
    c.strokeStyle = gold; c.lineWidth = 3; c.lineCap = 'round'; c.lineJoin = 'round';
    c.shadowColor = 'rgba(233,215,165,.55)'; c.shadowBlur = 12;
    c.beginPath();
    pts.forEach(function (p, k) { k ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]); });
    c.stroke();
    c.restore();
    // 笔尖
    var last = pts[pts.length - 1];
    c.save();
    c.shadowColor = 'rgba(255,240,200,.9)'; c.shadowBlur = 24;
    c.fillStyle = '#FFF6DC'; c.beginPath(); c.arc(last[0], last[1], 7, 0, T); c.fill();
    c.restore();
    txt(c, '一笔', 250, 200, 84, gold, '300 "Songti SC", "SimSun", serif');
    txt(c, '画到底', 380, 200, 84, 'rgba(233,215,165,.45)', '300 "Songti SC", "SimSun", serif');
    txt(c, '整个故事，中间不断。', 252, 252, 22, 'rgba(233,215,165,.5)', '400 "Microsoft YaHei", sans-serif');
    tag(c, 'LINE ART / ONE STROKE', W - 80, 690, 'rgba(233,215,165,.35)', 14);
  };

  // ---------------- V5 3D 渲染
  C.V5 = function (c, W, H) {
    var g = c.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#F6E7F2'); g.addColorStop(0.55, '#E9DDF5'); g.addColorStop(1, '#DCE6F7');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    // 地面反光
    var fl = c.createLinearGradient(0, 560, 0, H);
    fl.addColorStop(0, 'rgba(255,255,255,.55)'); fl.addColorStop(1, 'rgba(255,255,255,0)');
    c.fillStyle = fl; c.fillRect(0, 560, W, 160);
    // 背景虚化球
    [[180, 200, 90, 'rgba(255,180,220,.5)'], [1080, 160, 120, 'rgba(160,200,255,.45)'], [880, 120, 60, 'rgba(255,220,160,.5)']].forEach(function (b) {
      c.save(); c.filter = 'blur(22px)'; c.fillStyle = b[3];
      c.beginPath(); c.arc(b[0], b[1], b[2], 0, T); c.fill(); c.restore();
    });
    // 主体：软胶胶囊
    function pill(x, y, w, h, col1, col2) {
      c.save();
      c.shadowColor = 'rgba(120,90,150,.28)'; c.shadowBlur = 40; c.shadowOffsetY = 22;
      var pg = c.createLinearGradient(x, y, x + w, y + h);
      pg.addColorStop(0, col1); pg.addColorStop(1, col2);
      c.fillStyle = pg;
      if (c.roundRect) c.roundRect(x, y, w, h, h / 2); else c.rect(x, y, w, h);
      c.fill();
      c.restore();
      // 高光
      c.save();
      c.globalAlpha = 0.7;
      var hg = c.createLinearGradient(x, y, x, y + h * 0.5);
      hg.addColorStop(0, 'rgba(255,255,255,.95)'); hg.addColorStop(1, 'rgba(255,255,255,0)');
      c.fillStyle = hg;
      if (c.roundRect) c.roundRect(x + w * 0.12, y + h * 0.12, w * 0.5, h * 0.22, h * 0.11); else c.rect(x + w * 0.12, y + h * 0.12, w * 0.5, h * 0.22);
      c.fill(); c.restore();
    }
    pill(430, 300, 420, 240, '#FF9EC7', '#C77BFF');
    pill(300, 430, 190, 120, '#8FD8FF', '#5AA8FF');
    pill(760, 420, 230, 130, '#FFD79A', '#FF9F68');
    // 小珠子
    var r = rng(51);
    for (var i = 0; i < 9; i++) {
      var x = 200 + r() * 880, y = 600 + r() * 70, rr = 8 + r() * 16;
      var bg2 = c.createRadialGradient(x - rr * 0.4, y - rr * 0.4, 1, x, y, rr);
      bg2.addColorStop(0, '#fff'); bg2.addColorStop(1, i % 2 ? '#C9A8FF' : '#FFB7D8');
      c.fillStyle = bg2; c.beginPath(); c.arc(x, y, rr, 0, T); c.fill();
    }
    txt(c, 'SOFT', 80, 170, 92, 'rgba(70,50,90,.85)', '900 ' + SANS);
    txt(c, '材质先说话。', 82, 214, 24, 'rgba(70,50,90,.5)', '500 "Microsoft YaHei", sans-serif');
    tag(c, '3D RENDER / OCTANE', W - 80, 690, 'rgba(70,50,90,.4)', 14);
  };

  // ---------------- V6 形变
  C.V6 = function (c, W, H) {
    var bg = '#F5F2EC', ink = '#17161A', accent = '#FF5A36';
    c.fillStyle = bg; c.fillRect(0, 0, W, H);
    function cup(x, y, s) {
      c.save(); c.translate(x, y); c.scale(s, s);
      c.fillStyle = ink;
      c.beginPath(); c.moveTo(-46, -34); c.lineTo(46, -34); c.lineTo(34, 46); c.lineTo(-34, 46); c.closePath(); c.fill();
      c.strokeStyle = ink; c.lineWidth = 9; c.beginPath(); c.arc(52, 0, 22, -1.2, 1.2); c.stroke();
      c.fillStyle = ink; c.fillRect(-40, 52, 80, 8);
      c.restore();
    }
    function circle(x, y, r, fill) { c.beginPath(); c.arc(x, y, r, 0, T); c.fillStyle = fill; c.fill(); }
    function sun(x, y, r) {
      circle(x, y, r, accent);
      c.save(); c.strokeStyle = accent; c.lineWidth = 7; c.lineCap = 'round';
      for (var i = 0; i < 8; i++) {
        var a = i / 8 * T;
        c.beginPath(); c.moveTo(x + Math.cos(a) * (r + 14), y + Math.sin(a) * (r + 14));
        c.lineTo(x + Math.cos(a) * (r + 40), y + Math.sin(a) * (r + 40)); c.stroke();
      }
      c.restore();
    }
    function plane(x, y, s) {
      c.save(); c.translate(x, y); c.scale(s, s);
      c.fillStyle = ink;
      c.beginPath(); c.moveTo(-60, 20); c.lineTo(62, -26); c.lineTo(6, 44); c.lineTo(-6, 14); c.closePath(); c.fill();
      c.restore();
    }
    cup(200, 360, 1.5);
    circle(470, 360, 54, 'rgba(23,22,26,.12)');
    sun(720, 360, 62);
    plane(990, 360, 1.4);
    // 箭头
    [ [300, 360, 396], [540, 360, 636], [790, 360, 880] ].forEach(function (a) {
      c.save(); c.strokeStyle = 'rgba(23,22,26,.3)'; c.lineWidth = 2; c.setLineDash([6, 8]);
      c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(a[2], a[1]); c.stroke(); c.restore();
      c.beginPath(); c.moveTo(a[2], a[1]); c.lineTo(a[2] - 12, a[1] - 6); c.lineTo(a[2] - 12, a[1] + 6); c.closePath();
      c.fillStyle = 'rgba(23,22,26,.3)'; c.fill();
    });
    txt(c, 'MORPH', 80, 600, 74, ink, '900 ' + SANS);
    txt(c, '一个形状，接着变成下一个。', 82, 646, 26, 'rgba(23,22,26,.5)', '500 "Microsoft YaHei", sans-serif');
    tag(c, 'SHAPE MORPH / 7 STEPS', W - 80, 690, 'rgba(23,22,26,.35)', 14);
  };

  // ---------------- V7 贴纸讲解
  C.V7 = function (c, W, H) {
    var canvas = '#E9EEF2', slate = '#3C4A5A', accent = '#FF5A36';
    c.fillStyle = canvas; c.fillRect(0, 0, W, H);
    // 大画布网格
    c.save(); c.strokeStyle = 'rgba(60,74,90,.07)'; c.lineWidth = 1;
    for (var x = 0; x < W; x += 40) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); }
    for (var y = 0; y < H; y += 40) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
    c.restore();
    // 贴纸：手机
    c.save(); c.translate(210, 220); c.rotate(-0.05);
    c.shadowColor = 'rgba(60,74,90,.25)'; c.shadowBlur = 22; c.shadowOffsetY = 10;
    c.fillStyle = '#fff';
    if (c.roundRect) c.roundRect(-30, -30, 280, 400, 44); else c.rect(-30, -30, 280, 400);
    c.fill();
    c.shadowColor = 'transparent';
    c.fillStyle = '#2C3644';
    if (c.roundRect) c.roundRect(-14, -14, 248, 368, 34); else c.rect(-14, -14, 248, 368);
    c.fill();
    c.fillStyle = 'rgba(255,255,255,.12)';
    c.fillRect(10, 30, 200, 300);
    c.restore();
    // 扁平图标
    c.fillStyle = accent; c.beginPath(); c.arc(700, 300, 56, 0, T); c.fill();
    c.fillStyle = '#fff'; c.fillRect(676, 268, 48, 64);
    // 图表
    c.fillStyle = slate;
    [70, 100, 140, 118, 170, 150].forEach(function (h, i) {
      c.fillRect(860 + i * 46, 460 - h, 30, h);
    });
    c.fillStyle = accent; c.fillRect(860 + 5 * 46, 460 - 150, 30, 150);
    c.strokeStyle = 'rgba(60,74,90,.3)'; c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(850, 462); c.lineTo(1160, 462); c.stroke();
    // 文案
    txt(c, '一部手机里，', 620, 180, 42, slate, '800 ' + SANS);
    txt(c, '藏着多少种元素？', 620, 232, 42, accent, '800 ' + SANS);
    txt(c, '一张图一个点，镜头一路推过去。', 622, 600, 22, 'rgba(60,74,90,.6)', '400 "Microsoft YaHei", sans-serif');
    tag(c, 'STICKER EXPLAINER / 12', W - 80, 690, 'rgba(60,74,90,.4)', 14);
  };

  // ---------------- V8 赛博朋克 HUD
  C.V8 = function (c, W, H) {
    var bg = '#04121a', cyan = '#00E5FF', orange = '#FF6A00';
    c.fillStyle = bg; c.fillRect(0, 0, W, H);
    var g = c.createRadialGradient(W / 2, H / 2, 40, W / 2, H / 2, 640);
    g.addColorStop(0, 'rgba(0,229,255,.10)'); g.addColorStop(1, 'rgba(0,229,255,0)');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    // 六边形网格
    c.save(); c.strokeStyle = 'rgba(0,229,255,.10)'; c.lineWidth = 1;
    for (var y = 0; y < H; y += 34) for (var x = (y / 34 % 2) * 30; x < W; x += 60) {
      c.beginPath();
      for (var k = 0; k < 6; k++) { var a = k / 6 * T; c.lineTo(x + Math.cos(a) * 17, y + Math.sin(a) * 17); }
      c.closePath(); c.stroke();
    }
    c.restore();
    // 同心环 + 刻度
    c.save(); c.translate(W / 2, H / 2 - 20);
    [260, 210, 160, 110].forEach(function (r, i) {
      c.strokeStyle = i % 2 ? 'rgba(0,229,255,.25)' : 'rgba(0,229,255,.5)';
      c.lineWidth = 1.4; c.beginPath(); c.arc(0, 0, r, 0, T); c.stroke();
      for (var t = 0; t < 48; t++) {
        var a = t / 48 * T;
        c.beginPath(); c.moveTo(Math.cos(a) * (r - (t % 4 ? 4 : 9)), Math.sin(a) * (r - (t % 4 ? 4 : 9)));
        c.lineTo(Math.cos(a) * r, Math.sin(a) * r); c.stroke();
      }
    });
    // 雷达扇形
    var radar = c.createConicGradient ? c.createConicGradient(-0.5, 0, 0) : null;
    if (radar) {
      radar.addColorStop(0, 'rgba(0,229,255,.35)'); radar.addColorStop(0.12, 'rgba(0,229,255,0)'); radar.addColorStop(1, 'rgba(0,229,255,0)');
      c.fillStyle = radar; c.beginPath(); c.arc(0, 0, 260, 0, T); c.fill();
    }
    // 中心目标
    c.strokeStyle = cyan; c.lineWidth = 2;
    c.beginPath(); c.moveTo(-30, 0); c.lineTo(30, 0); c.moveTo(0, -30); c.lineTo(0, 30); c.stroke();
    c.restore();
    // 中心线框立方体
    (function () {
      var cx = W / 2, cy = H / 2 - 20, s = 96;
      function P(x, y, z) { return [cx + (x - y) * s * 0.7, cy + (x + y) * s * 0.34 - z * s]; }
      var V0 = [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0], [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]];
      var E = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
      c.save(); c.strokeStyle = 'rgba(0,229,255,.95)'; c.lineWidth = 2.2;
      c.shadowColor = 'rgba(0,229,255,.8)'; c.shadowBlur = 12;
      E.forEach(function (e) {
        var a = P.apply(null, V0[e[0]]), b = P.apply(null, V0[e[1]]);
        c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke();
      });
      c.fillStyle = '#BFF8FF';
      V0.forEach(function (v) { var p = P(v[0], v[1], v[2]); c.beginPath(); c.arc(p[0], p[1], 3.4, 0, T); c.fill(); });
      c.restore();
    })();
    // 角标
    c.strokeStyle = orange; c.lineWidth = 3;
    [[40, 40, 1, 1], [W - 40, 40, -1, 1], [40, H - 40, 1, -1], [W - 40, H - 40, -1, -1]].forEach(function (p) {
      c.beginPath(); c.moveTo(p[0], p[1] + p[3] * 40); c.lineTo(p[0], p[1]); c.lineTo(p[0] + p[2] * 40, p[1]); c.stroke();
    });
    txt(c, 'TARGET ACQUIRED', 64, 120, 22, orange, '700 ' + MONO);
    // 数据列
    var r = rng(81);
    for (var col = 0; col < 3; col++) {
      for (var row = 0; row < 14; row++) {
        txt(c, (Math.floor(r() * 900) + 100) + ':' + (Math.floor(r() * 90) + 10), W - 210 + col * 52, 180 + row * 26, 12, 'rgba(0,229,255,.45)', MONO);
      }
    }
    txt(c, 'LOCK  /  X-341', 64, 660, 16, 'rgba(0,229,255,.7)', MONO);
    txt(c, 'SYNC 98.4%', 64, 690, 16, 'rgba(0,229,255,.45)', MONO);
    KIT.scan(c, W, H, 4, 0.12);
  };

  // ---------------- V9 拼贴
  C.V9 = function (c, W, H) {
    var news = '#E2CFA8', ink = '#3A3833';
    KIT.paper(c, W, H, news, 91, { fibers: 7000, len: 24 });
    // 半调
    c.save(); c.fillStyle = 'rgba(58,56,51,.10)';
    for (var y = 0; y < H; y += 7) for (var x = (y / 7 % 2) * 7; x < W; x += 14) c.fillRect(x, y, 3, 3);
    c.restore();
    // 人像剪影
    c.save();
    c.fillStyle = '#5F6570';
    c.beginPath(); c.ellipse(420, 300, 104, 122, 0, 0, T); c.fill();          // 头
    c.beginPath(); c.ellipse(420, 500, 168, 170, 0, Math.PI, T); c.fill();     // 肩
    c.strokeStyle = 'rgba(255,252,244,.85)'; c.lineWidth = 6;
    c.beginPath(); c.ellipse(420, 300, 104, 122, 0, Math.PI, T); c.stroke();   // 头（上半圈）
    c.beginPath(); c.ellipse(420, 500, 168, 170, 0, Math.PI, T); c.stroke();   // 肩弧
    c.restore();
    // 开盖：头顶那一块翻起来
    c.save(); c.translate(420, 178); c.rotate(-0.16);
    c.fillStyle = '#5F6570';
    c.beginPath(); c.ellipse(0, 0, 100, 62, 0, Math.PI, T); c.fill();
    c.strokeStyle = 'rgba(255,252,244,.85)'; c.lineWidth = 6; c.stroke();
    c.restore();
    // 开盖里的星空
    c.save();
    c.beginPath(); c.ellipse(420, 236, 96, 62, 0, 0, T); c.clip();
    c.fillStyle = '#101020'; c.fillRect(320, 170, 200, 80);
    var r = rng(92);
    for (var i = 0; i < 60; i++) {
      c.fillStyle = 'rgba(255,255,255,' + (0.2 + r() * 0.8) + ')';
      c.fillRect(330 + r() * 180, 176 + r() * 64, 1.8, 1.8);
    }
    c.fillStyle = '#C7684E'; c.beginPath(); c.arc(392, 236, 9, 0, T); c.fill();
    c.restore();
    // 剪出来的元素
    c.fillStyle = '#C7684E';
    c.beginPath(); c.arc(700, 200, 34, 0, T); c.fill();
    c.fillStyle = '#8B8D5C';
    c.beginPath(); c.ellipse(790, 280, 26, 48, 0.6, 0, T); c.fill();
    c.fillStyle = '#6F8DAB';
    c.beginPath(); c.moveTo(640, 420); c.lineTo(700, 470); c.lineTo(620, 470); c.closePath(); c.fill();
    // 文字
    txt(c, '脑洞', 860, 300, 96, ink, '900 ' + SANS);
    txt(c, '是把不搭的东西', 862, 360, 26, 'rgba(58,56,51,.7)', '500 "Microsoft YaHei", sans-serif');
    txt(c, '拼在一起。', 862, 396, 26, 'rgba(58,56,51,.7)', '500 "Microsoft YaHei", sans-serif');
    tag(c, 'COLLAGE / CUT-OUT', 64, 690, 'rgba(58,56,51,.5)', 14);
  };

  // ---------------- V10 极光毛玻璃
  C.V10 = function (c, W, H) {
    c.fillStyle = '#080914'; c.fillRect(0, 0, W, H);
    var blobs = [
      [300, 260, 300, 'rgba(120,80,255,.55)'], [520, 420, 280, 'rgba(40,120,255,.45)'],
      [860, 240, 320, 'rgba(0,200,255,.40)'], [1040, 480, 260, 'rgba(220,80,220,.38)']
    ];
    blobs.forEach(function (b) {
      var g = c.createRadialGradient(b[0], b[1], 10, b[0], b[1], b[2]);
      g.addColorStop(0, b[3]); g.addColorStop(1, 'rgba(8,9,20,0)');
      c.fillStyle = g; c.beginPath(); c.arc(b[0], b[1], b[2], 0, T); c.fill();
    });
    // 毛玻璃卡片
    function glass(x, y, w, h, r) {
      c.save();
      c.shadowColor = 'rgba(0,0,0,.35)'; c.shadowBlur = 30; c.shadowOffsetY = 14;
      c.fillStyle = 'rgba(255,255,255,.07)';
      if (c.roundRect) c.roundRect(x, y, w, h, r); else c.rect(x, y, w, h);
      c.fill();
      c.shadowColor = 'transparent';
      c.strokeStyle = 'rgba(255,255,255,.28)'; c.lineWidth = 1.4; c.stroke();
      c.restore();
    }
    glass(150, 200, 420, 240, 24);
    glass(620, 160, 300, 180, 20);
    glass(700, 400, 420, 220, 24);
    txt(c, 'Liquid Glass', 186, 290, 40, 'rgba(255,255,255,.9)', '600 ' + SANS);
    txt(c, '慢、透、贵。', 188, 336, 24, 'rgba(255,255,255,.55)', '400 "Microsoft YaHei", sans-serif');
    txt(c, '341', 660, 250, 64, 'rgba(255,255,255,.85)', '700 ' + MONO);
    txt(c, 'STYLES', 664, 280, 15, 'rgba(255,255,255,.4)', MONO);
    txt(c, '背景永远在慢慢呼吸。', 740, 470, 26, 'rgba(255,255,255,.7)', '500 "Microsoft YaHei", sans-serif');
    // 噪点
    var r = rng(101);
    c.save(); c.globalAlpha = 0.05;
    for (var i = 0; i < 6000; i++) {
      c.fillStyle = r() < 0.5 ? '#fff' : '#000';
      c.fillRect(r() * W, r() * H, 1, 1);
    }
    c.restore();
    tag(c, 'AURORA / GLASSMORPHISM', W - 80, 690, 'rgba(255,255,255,.35)', 14);
  };

  // ---------------- V11 包豪斯几何
  C.V11 = function (c, W, H) {
    var cream = '#F1E9DA', red = '#E03C31', yellow = '#F2B705', blue = '#1E4FA3', ink = '#111';
    c.fillStyle = cream; c.fillRect(0, 0, W, H);
    // 严格网格
    c.save(); c.strokeStyle = 'rgba(17,17,17,.08)'; c.lineWidth = 1;
    for (var x = 0; x < W; x += 120) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); }
    for (var y = 0; y < H; y += 120) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
    c.restore();
    // 四分之一圆
    function quarter(x, y, r, col, rot) {
      c.save(); c.translate(x, y); c.rotate(rot);
      c.fillStyle = col; c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, r, 0, Math.PI / 2); c.closePath(); c.fill();
      c.restore();
    }
    quarter(120, 120, 240, red, 0);
    quarter(1160, 600, 240, blue, Math.PI);
    quarter(120, 600, 180, yellow, -Math.PI / 2);
    // 黑色横条
    c.fillStyle = ink; c.fillRect(360, 240, 520, 48);
    c.fillRect(120, 480, 360, 24);
    // 圆
    c.fillStyle = blue; c.beginPath(); c.arc(760, 520, 110, 0, T); c.fill();
    // 三角
    c.fillStyle = red; c.beginPath(); c.moveTo(920, 300); c.lineTo(1080, 480); c.lineTo(920, 480); c.closePath(); c.fill();
    // 字
    txt(c, 'bauhaus', 120, 430, 96, ink, '900 "Helvetica Neue", Arial, sans-serif');
    txt(c, '1919 / 几何与秩序', 124, 470, 20, 'rgba(17,17,17,.55)', '500 "Microsoft YaHei", sans-serif');
    tag(c, 'GEOMETRIC / 120 BPM', W - 80, 690, 'rgba(17,17,17,.4)', 14);
  };

  // ---------------- V12 合成波
  C.V12 = function (c, W, H) {
    var night = '#140A2E';
    var g = c.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#120A2A'); g.addColorStop(0.55, '#3A1150'); g.addColorStop(1, '#1A0B33');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    var r = rng(121);
    for (var i = 0; i < 200; i++) {
      c.fillStyle = 'rgba(255,255,255,' + (0.2 + r() * 0.7) + ')';
      c.fillRect(r() * W, r() * 380, 1.6, 1.6);
    }
    // 条纹太阳
    c.save();
    var sg = c.createLinearGradient(0, 160, 0, 430);
    sg.addColorStop(0, '#FFD23F'); sg.addColorStop(0.5, '#FF8A3D'); sg.addColorStop(1, '#FF4FA3');
    c.fillStyle = sg;
    c.beginPath(); c.arc(W / 2, 400, 190, Math.PI, T); c.fill();
    c.fillStyle = '#3A1150';
    for (var k = 0; k < 5; k++) c.fillRect(W / 2 - 200, 300 + k * 26, 400, 7 + k * 1.4);
    c.restore();
    // 线框山
    c.save(); c.strokeStyle = 'rgba(255,79,163,.75)'; c.lineWidth = 1.6;
    for (var m = 0; m < 4; m++) {
      c.beginPath();
      c.moveTo(0, 470 + m * 30);
      for (var x = 0; x <= W; x += 40) c.lineTo(x, 470 + m * 30 - Math.abs(Math.sin(x / 200 + m * 0.4)) * (70 - m * 12));
      c.stroke();
    }
    c.restore();
    // 透视网格
    c.save(); c.strokeStyle = 'rgba(0,229,255,.55)'; c.lineWidth = 1.6;
    for (var i2 = -10; i2 <= 10; i2++) {
      c.beginPath(); c.moveTo(W / 2 + i2 * 24, 470); c.lineTo(W / 2 + i2 * 190, H); c.stroke();
    }
    for (var j = 0; j < 12; j++) {
      var yy = 470 + Math.pow(j / 11, 2.2) * 250;
      c.beginPath(); c.moveTo(0, yy); c.lineTo(W, yy); c.stroke();
    }
    c.restore();
    // 镀铬标题
    c.save();
    var tg = c.createLinearGradient(0, 120, 0, 240);
    tg.addColorStop(0, '#FFF6E0'); tg.addColorStop(0.45, '#FFD23F'); tg.addColorStop(0.5, '#FF4FA3');
    tg.addColorStop(0.55, '#7A2CFF'); tg.addColorStop(1, '#EFF6FF');
    c.font = '900 86px ' + SANS; c.textAlign = 'center';
    c.fillStyle = tg; c.shadowColor = 'rgba(255,79,163,.8)'; c.shadowBlur = 26;
    c.fillText('NEON DRIVE', W / 2, 200);
    c.restore();
    // VHS
    txt(c, 'PLAY ▶', 80, 90, 20, 'rgba(255,255,255,.85)', MONO);
    txt(c, 'SP 0:24', W - 80, 90, 20, 'rgba(255,255,255,.6)', MONO, 'right');
    KIT.scan(c, W, H, 4, 0.10);
  };

  // ---------------- V13 像素
  C.V13 = function (c, W, H) {
    var oc = document.createElement('canvas'); oc.width = 320; oc.height = 180;
    var g = oc.getContext('2d');
    var pal = ['#1a1c2c', '#5d275d', '#b13e53', '#ef7d57', '#ffcd75', '#a7f070', '#38b764', '#257179', '#29366f', '#3b5dc9', '#41a6f6', '#73eff7', '#f4f4f4'];
    // 天空抖动渐变
    for (var y = 0; y < 110; y++) {
      var t = y / 110;
      for (var x = 0; x < 320; x++) {
        var d = ((x * 7 + y * 13) % 16) / 16;
        var idx = t > 0.66 ? 9 : t > 0.33 ? 10 : 11;
        g.fillStyle = pal[d < (1 - t) * 0.5 ? idx : idx];
        if (d < (1 - t) * 0.35) g.fillStyle = pal[10];
        g.fillRect(x, y, 1, 1);
      }
    }
    // 星
    var r = rng(131);
    for (var i = 0; i < 26; i++) { g.fillStyle = pal[12]; g.fillRect(Math.floor(r() * 320), Math.floor(r() * 70), 1, 1); }
    // 远山
    g.fillStyle = pal[8];
    for (var x3 = 0; x3 < 320; x3++) g.fillRect(x3, 100 - Math.floor(Math.abs(Math.sin(x3 / 26)) * 26), 1, 30);
    // 地面
    g.fillStyle = pal[6]; g.fillRect(0, 128, 320, 52);
    g.fillStyle = pal[5]; g.fillRect(0, 128, 320, 3);
    for (var x4 = 0; x4 < 320; x4 += 16) { g.fillStyle = pal[7]; g.fillRect(x4, 140, 6, 3); }
    // 英雄
    var cells = [[2, 0], [3, 0], [2, 1], [3, 1], [1, 2], [2, 2], [3, 2], [4, 2], [2, 3], [3, 3], [1, 4], [4, 4]];
    cells.forEach(function (p) { g.fillStyle = pal[4]; g.fillRect(60 + p[0] * 5, 100 + p[1] * 5, 5, 5); });
    g.fillStyle = pal[2]; g.fillRect(60 + 2 * 5, 100, 5, 5);
    // 金币
    g.fillStyle = pal[4];
    [[150, 108], [190, 96], [230, 108]].forEach(function (p) { g.fillRect(p[0], p[1], 4, 6); });
    // 放大
    c.imageSmoothingEnabled = false;
    c.drawImage(oc, 0, 0, W, H);
    // UI
    txt(c, 'PIXEL QUEST', 40, 40, 22, 'rgba(255,255,255,.9)', '700 ' + MONO);
    txt(c, '×6  NEAREST', 40, 64, 13, 'rgba(255,255,255,.55)', MONO);
    txt(c, '1UP  034100', W - 40, 64, 15, '#ffcd75', '700 ' + MONO, 'right');
    KIT.scan(c, W, H, 4, 0.13);
  };

  // ---------------- V14 液态
  C.V14 = function (c, W, H) {
    c.fillStyle = '#2A0B2E'; c.fillRect(0, 0, W, H);
    var g = c.createRadialGradient(W / 2, H / 2, 40, W / 2, H / 2, 680);
    g.addColorStop(0, 'rgba(255,120,60,.16)'); g.addColorStop(1, 'rgba(42,11,46,0)');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    // 主液滴
    c.save(); c.translate(W / 2, 350);
    var lg = c.createRadialGradient(-70, -80, 20, 0, 0, 240);
    lg.addColorStop(0, '#FFE1C4'); lg.addColorStop(0.25, '#FF9A5A'); lg.addColorStop(0.6, '#F0508C');
    lg.addColorStop(1, '#8B2BD6');
    c.fillStyle = lg;
    c.beginPath();
    c.moveTo(0, -230);
    c.bezierCurveTo(120, -180, 210, -60, 190, 40);
    c.bezierCurveTo(170, 150, 80, 200, 0, 196);
    c.bezierCurveTo(-80, 200, -170, 150, -190, 40);
    c.bezierCurveTo(-210, -60, -120, -180, 0, -230);
    c.fill();
    // 高光
    c.fillStyle = 'rgba(255,255,255,.55)';
    c.beginPath(); c.ellipse(-62, -96, 34, 62, -0.4, 0, T); c.fill();
    c.fillStyle = 'rgba(255,255,255,.25)';
    c.beginPath(); c.ellipse(66, -60, 16, 30, 0.5, 0, T); c.fill();
    c.restore();
    // 次级液滴
    [[380, 220, 34], [900, 190, 24], [960, 470, 42], [300, 520, 28]].forEach(function (d) {
      var dg = c.createRadialGradient(d[0] - d[2] * 0.4, d[1] - d[2] * 0.4, 2, d[0], d[1], d[2]);
      dg.addColorStop(0, '#FFE1C4'); dg.addColorStop(0.5, '#FF9A5A'); dg.addColorStop(1, '#B02BA0');
      c.fillStyle = dg; c.beginPath(); c.arc(d[0], d[1], d[2], 0, T); c.fill();
    });
    // 拉丝
    c.save(); c.strokeStyle = 'rgba(255,154,90,.6)'; c.lineWidth = 6; c.lineCap = 'round';
    c.beginPath(); c.moveTo(880, 470); c.quadraticCurveTo(930, 420, 952, 500); c.stroke();
    c.restore();
    txt(c, 'LIQUID', 80, 170, 84, 'rgba(255,225,196,.9)', '900 ' + SANS);
    txt(c, '边缘永远不是直线。', 82, 212, 24, 'rgba(255,225,196,.5)', '500 "Microsoft YaHei", sans-serif');
    tag(c, 'LIQUID MOTION / METABALL', W - 80, 690, 'rgba(255,225,196,.35)', 14);
  };

  // ---------------- V15 综艺花字
  C.V15 = function (c, W, H) {
    var bg = '#7ED0F0';
    var g = c.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#8FD8F5'); g.addColorStop(1, '#F7D9A8');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    // 宠物：扁平猫
    c.save(); c.translate(W / 2, 470);
    c.fillStyle = '#F5A35C';
    c.beginPath(); c.ellipse(0, 0, 200, 150, 0, 0, T); c.fill();
    c.beginPath(); c.moveTo(-160, -110); c.lineTo(-110, -210); c.lineTo(-60, -110); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(160, -110); c.lineTo(110, -210); c.lineTo(60, -110); c.closePath(); c.fill();
    c.fillStyle = '#FFE6CC'; c.beginPath(); c.ellipse(0, 40, 110, 84, 0, 0, T); c.fill();
    c.fillStyle = '#2B2B2B';
    c.beginPath(); c.ellipse(-70, -30, 16, 22, 0, 0, T); c.fill();
    c.beginPath(); c.ellipse(70, -30, 16, 22, 0, 0, T); c.fill();
    c.fillStyle = '#E86A8A'; c.beginPath(); c.moveTo(-18, 20); c.lineTo(18, 20); c.lineTo(0, 44); c.closePath(); c.fill();
    c.strokeStyle = '#2B2B2B'; c.lineWidth = 4; c.lineCap = 'round';
    c.beginPath(); c.moveTo(-16, 66); c.quadraticCurveTo(0, 84, 16, 66); c.stroke();
    c.restore();
    // 花字：多层描边
    function flower(s, x, y, size, fill1, fill2, stroke) {
      c.save();
      c.font = '900 ' + size + 'px ' + SANS;
      c.textAlign = 'center'; c.textBaseline = 'middle';
      c.lineJoin = 'round';
      c.strokeStyle = '#fff'; c.lineWidth = size * 0.30; c.strokeText(s, x, y);
      c.strokeStyle = stroke; c.lineWidth = size * 0.20; c.strokeText(s, x, y);
      var tg = c.createLinearGradient(0, y - size / 2, 0, y + size / 2);
      tg.addColorStop(0, fill1); tg.addColorStop(1, fill2);
      c.fillStyle = tg; c.fillText(s, x, y);
      c.restore();
    }
    flower('今日份快乐', W / 2 - 30, 170, 108, '#FFF05A', '#FF8A3D', '#E5306F');
    flower('!!', W / 2 + 300, 210, 80, '#FFF05A', '#FF5D8F', '#7B2CBF');
    // 装饰
    c.save(); c.fillStyle = '#FFF05A';
    [[180, 130], [1120, 120], [1050, 620], [150, 640]].forEach(function (p) {
      c.save(); c.translate(p[0], p[1]);
      for (var k = 0; k < 8; k++) {
        c.rotate(T / 8);
        c.beginPath(); c.moveTo(0, -10); c.lineTo(4, -34); c.lineTo(0, -46); c.lineTo(-4, -34); c.closePath(); c.fill();
      }
      c.restore();
    });
    c.restore();
    // 小标签
    c.save(); c.translate(140, 300); c.rotate(-0.12);
    c.fillStyle = '#E5306F'; c.fillRect(0, 0, 210, 66);
    txt(c, '萌宠日常', 24, 44, 32, '#fff', '900 "Microsoft YaHei", sans-serif');
    c.restore();
    tag(c, 'VARIETY CAPTIONS / 9:16', W - 80, 690, 'rgba(43,43,43,.45)', 14);
  };
})();
