// X 系列预览渲染（第一部分：X2–X12）
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
  function tag(c, s, x, y, color, size) {
    txt(c, s, x, y, size || 15, color || 'rgba(255,255,255,.6)', MONO);
  }
  function rule(c, x1, y1, x2, y2, color, w) {
    c.save(); c.strokeStyle = color; c.lineWidth = w || 1;
    c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke(); c.restore();
  }
  function steps(c, items, x, y, w, ink, accent) {
    items.forEach(function (it, i) {
      var yy = y + i * 58;
      txt(c, '0' + (i + 1), x, yy, 15, accent, MONO);
      txt(c, it, x + 46, yy, 24, ink, SANS);
      rule(c, x, yy + 18, x + w, yy + 18, 'rgba(255,255,255,.16)', 1);
    });
  }
  function bignum(c, val, label, x, y, size, color, labelColor) {
    txt(c, val, x, y, size, color, MONO);
    txt(c, label, x + 4, y + 26, 16, labelColor, MONO);
  }

  // ---------------- X2 品牌动态图形
  C.X2 = function (c, W, H) {
    var bg = '#0c0b1d', ink = '#f2f1f7', cy = '#38d6e6', vi = '#7c5cff', red = '#ff5d5d';
    c.fillStyle = bg; c.fillRect(0, 0, W, H);
    KIT.vignette(c, W, H, 0.55, '0,0,0');
    tag(c, 'BRAND MOTION / 01', 64, 64, 'rgba(242,241,247,.5)');
    // 手绘细线
    c.save(); c.strokeStyle = 'rgba(242,241,247,.20)'; c.lineWidth = 1.4;
    c.beginPath(); c.moveTo(660, 120);
    for (var x = 660; x < 1210; x += 18) c.lineTo(x, 120 + Math.sin(x / 60) * 26);
    c.stroke();
    c.beginPath(); c.arc(960, 420, 150, 0, T); c.stroke();
    c.restore();
    txt(c, 'A  TO  B', 64, 250, 132, ink, '800 ' + SANS);
    txt(c, '把一件难讲的事，', 66, 330, 34, 'rgba(242,241,247,.62)');
    txt(c, '变成一条能看懂的线。', 66, 374, 34, 'rgba(242,241,247,.62)');
    txt(c, 'PAIN', 64, 500, 46, red, '800 ' + MONO);
    txt(c, '→', 190, 500, 46, 'rgba(242,241,247,.4)', MONO);
    txt(c, 'GAIN', 260, 500, 46, cy, '800 ' + MONO);
    steps(c, ['问题被看见', '结构被拆开', '答案落地'], 700, 540, 460, ink, vi);
  };

  // ---------------- X3 沙画
  C.X3 = function (c, W, H) {
    var g = c.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, '#f3dcae'); g.addColorStop(0.55, '#d9bc86'); g.addColorStop(1, '#9b7648');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    KIT.grain(c, W, H, 21, 0.06);
    // 顶光
    var lg = c.createRadialGradient(W * 0.52, -80, 40, W * 0.52, -80, 760);
    lg.addColorStop(0, 'rgba(255,246,220,.55)'); lg.addColorStop(1, 'rgba(255,246,220,0)');
    c.fillStyle = lg; c.fillRect(0, 0, W, H);

    // 沙：远山
    c.save();
    c.fillStyle = 'rgba(46,32,20,.55)';
    c.beginPath(); c.moveTo(0, 520);
    for (var x = 0; x <= W; x += 12) c.lineTo(x, 520 - 90 * Math.abs(Math.sin(x / 210)) - 20 * Math.sin(x / 55));
    c.lineTo(W, H); c.lineTo(0, H); c.closePath(); c.fill();
    c.restore();

    // 沙：树与人
    c.save();
    c.fillStyle = '#2e2014';
    c.beginPath(); c.ellipse(260, 430, 92, 116, 0, 0, T); c.fill();       // 树冠
    c.fillRect(252, 500, 16, 120);                                        // 树干
    // 人
    c.beginPath(); c.arc(760, 402, 26, 0, T); c.fill();                   // 头
    c.beginPath(); c.moveTo(760, 428); c.lineTo(760, 510); c.lineWidth = 18;
    c.strokeStyle = '#2e2014'; c.lineCap = 'round'; c.stroke();
    c.beginPath(); c.moveTo(760, 452); c.lineTo(712, 492); c.moveTo(760, 452); c.lineTo(806, 488); c.stroke();
    c.beginPath(); c.moveTo(760, 510); c.lineTo(724, 566); c.moveTo(760, 510); c.lineTo(796, 566); c.stroke();
    c.restore();

    // 沙粒毛边
    var r = rng(7);
    for (var i = 0; i < 900; i++) {
      c.fillStyle = 'rgba(46,32,20,' + (0.05 + r() * 0.12) + ')';
      var px = r() * W, py = 380 + r() * 260;
      c.fillRect(px, py, 1.5, 1.5);
    }

    txt(c, '2008 — 2024', 64, 96, 26, 'rgba(46,32,20,.7)', MONO);
    txt(c, '一粒沙', 64, 210, 78, '#2e2014', '600 "Cormorant Garamond", Georgia, serif');
    txt(c, '也能堆成一座山', 66, 282, 42, 'rgba(46,32,20,.75)', '400 "Cormorant Garamond", Georgia, serif');
    tag(c, 'SAND ART', W - 64, 96, 'rgba(46,32,20,.6)');
  };

  // ---------------- X4 歌词 MV
  C.X4 = function (c, W, H) {
    var bg = '#0b0f1e', ink = '#e9edf6', dim = '#5e6886', cy = '#35d0e6', pink = '#ff5cc8', yel = '#ffc53a';
    c.fillStyle = bg; c.fillRect(0, 0, W, H);
    c.save(); c.strokeStyle = 'rgba(94,104,134,.14)'; c.lineWidth = 1;
    for (var x = 0; x < W; x += 64) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); }
    for (var y = 0; y < H; y += 64) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
    c.restore();
    KIT.vignette(c, W, H, 0.6, '0,0,0');
    tag(c, 'VERSE 01 · 0:24', 64, 64, dim);
    tag(c, '♪ 128 BPM', W - 64, 64, dim);
    txt(c, '我把没说出口的话', 64, 268, 76, ink, '800 ' + SANS);
    txt(c, '写进了', 64, 366, 76, ink, '800 ' + SANS);
    txt(c, '副歌', 268, 366, 76, pink, '800 ' + SANS);
    txt(c, '里', 420, 366, 76, ink, '800 ' + SANS);
    txt(c, 'That night we never said goodbye', 66, 470, 34, 'rgba(233,237,246,.5)', '400 Georgia, serif');
    // 波形
    var r = rng(5);
    for (var i = 0; i < 84; i++) {
      var hh = 8 + Math.abs(Math.sin(i * 0.7)) * 34 * (0.4 + r() * 0.6);
      c.fillStyle = i % 7 === 0 ? pink : i % 5 === 0 ? cy : 'rgba(94,104,134,.55)';
      c.fillRect(64 + i * 13.4, 600 - hh / 2, 6, hh);
    }
    tag(c, 'LYRIC / KINETIC TYPE', 64, 668, dim);
  };

  // ---------------- X5 卡点素材剪辑
  C.X5 = function (c, W, H) {
    var light = '#f7f3ef', peach = '#ffd9c4', ink = '#151515', orange = '#ff5a1f';
    c.fillStyle = light; c.fillRect(0, 0, W, H);
    var g = c.createRadialGradient(W * 0.5, H * 0.9, 40, W * 0.5, H * 0.9, 620);
    g.addColorStop(0, 'rgba(255,217,196,.85)'); g.addColorStop(1, 'rgba(255,217,196,0)');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    // 底部暗台
    c.fillStyle = '#0b0b0c'; c.fillRect(0, 596, W, 124);
    var glow = c.createLinearGradient(0, 560, 0, 620);
    glow.addColorStop(0, 'rgba(255,90,31,0)'); glow.addColorStop(1, 'rgba(255,90,31,.55)');
    c.fillStyle = glow; c.fillRect(0, 560, W, 60);

    tag(c, 'BEAT 01 · 0.5s', 64, 70, 'rgba(21,21,21,.42)');
    var words = [['做', 96], ['减', 262], ['法', 428]];
    words.forEach(function (w) {
      txt(c, w[0], w[1], 300, 168, ink, '900 ' + SANS);
    });
    // 强调块
    c.fillStyle = orange; c.fillRect(600, 150, 132, 132);
    txt(c, '01', 614, 268, 92, '#fff', '800 ' + MONO);
    txt(c, '删掉一半，剩下的就响了。', 64, 420, 40, 'rgba(21,21,21,.72)', '700 ' + SANS);
    txt(c, 'CUT ON THE BEAT', 66, 660, 18, 'rgba(247,243,239,.6)', MONO);
    bignum(c, '04', 'HARD CUTS', 1000, 660, 40, '#f4f4f4', 'rgba(247,243,239,.5)');
  };

  // ---------------- X6 界面形变
  C.X6 = function (c, W, H) {
    var bg = '#ecebe7', ink = '#0b0b0b', dim = '#8d8c88';
    c.fillStyle = bg; c.fillRect(0, 0, W, H);
    // 同一元素沿一条基线长大：方角 → 圆角 → 胶囊 → 圆
    var st = [
      { x: 150, s: 150, r: 4 },
      { x: 400, s: 172, r: 40 },
      { x: 680, s: 196, r: 98 },
      { x: 980, s: 220, r: 110 }
    ];
    st.forEach(function (o, i) {
      var y = 330 - o.s / 2;
      c.save();
      if (i === 3) {
        c.fillStyle = ink;
        c.beginPath(); c.arc(o.x + o.s / 2, 330, o.s / 2, 0, T); c.fill();
      } else {
        c.strokeStyle = 'rgba(11,11,11,.55)'; c.lineWidth = 2.5;
        c.beginPath();
        if (c.roundRect) c.roundRect(o.x, y, o.s, o.s, o.r); else c.rect(o.x, y, o.s, o.s);
        c.stroke();
      }
      c.restore();
      if (i < 3) {
        var nx = st[i + 1].x - 26;
        c.save(); c.strokeStyle = 'rgba(11,11,11,.35)'; c.lineWidth = 2;
        c.beginPath(); c.moveTo(o.x + o.s + 12, 330); c.lineTo(nx, 330); c.stroke();
        c.beginPath(); c.moveTo(nx, 330); c.lineTo(nx - 11, 325); c.lineTo(nx - 11, 335); c.closePath();
        c.fillStyle = 'rgba(11,11,11,.35)'; c.fill();
        c.restore();
      }
      txt(c, 'r ' + o.r, o.x + o.s / 2, 470, 16, dim, MONO, 'center');
    });
    txt(c, 'MORPH', 64, 600, 76, ink, '800 ' + SANS);
    txt(c, '不换元素，只改半径、尺寸和填充。', 66, 650, 28, dim, '500 ' + SANS);
    tag(c, 'UI MORPH / ONE SHAPE', W - 64, 600, dim, 15);
    txt(c, '同一形状 · 四个状态', W - 64, 630, 16, dim, MONO, 'right');
  };

  // ---------------- X7 英雄漫画
  C.X7 = function (c, W, H) {
    var paper = '#f4ecd6', ink = '#141414', blue = '#2a6fdb', red = '#e23b2e', yel = '#ffd43b', sky = '#59c3e8';
    c.fillStyle = paper; c.fillRect(0, 0, W, H);
    // 半调网点
    c.save(); c.fillStyle = 'rgba(42,111,219,.14)';
    for (var y = 0; y < H; y += 8) for (var x = (y / 8 % 2) * 8; x < W; x += 16) c.fillRect(x, y, 4, 4);
    c.restore();
    function panel(x, y, w, h, fill, rot) {
      c.save();
      c.translate(x + w / 2, y + h / 2); c.rotate(rot || 0);
      c.fillStyle = ink; c.fillRect(-w / 2, -h / 2, w, h);
      c.fillStyle = fill; c.fillRect(-w / 2 + 7, -h / 2 + 7, w - 14, h - 14);
      c.restore();
    }
    panel(56, 56, 620, 380, sky, -0.01);
    panel(700, 56, 524, 236, yel, 0.012);
    panel(700, 320, 524, 116, '#fff', -0.008);
    // 速度线
    c.save(); c.strokeStyle = 'rgba(20,20,20,.55)'; c.lineWidth = 3;
    for (var i = 0; i < 16; i++) {
      var a = -0.9 + i * 0.11;
      c.beginPath(); c.moveTo(360, 300); c.lineTo(360 + Math.cos(a) * 300, 300 + Math.sin(a) * 300); c.stroke();
    }
    c.restore();
    // 英雄剪影
    c.fillStyle = blue;
    c.beginPath(); c.arc(360, 250, 46, 0, T); c.fill();
    c.beginPath(); c.moveTo(310, 300); c.lineTo(410, 300); c.lineTo(440, 420); c.lineTo(280, 420); c.closePath(); c.fill();
    c.fillStyle = red;
    c.beginPath(); c.moveTo(300, 296); c.lineTo(420, 296); c.lineTo(360, 230); c.closePath(); c.fill();
    // 爆炸框
    c.save(); c.translate(950, 170);
    c.fillStyle = yel; c.beginPath();
    for (var k = 0; k < 16; k++) {
      var ang = k / 16 * T, rr = k % 2 ? 78 : 118;
      c.lineTo(Math.cos(ang) * rr, Math.sin(ang) * rr);
    }
    c.closePath(); c.fill();
    c.strokeStyle = ink; c.lineWidth = 5; c.stroke();
    c.restore();
    txt(c, 'POW!', 902, 190, 48, ink, '900 ' + SANS);
    // 对白框
    c.fillStyle = '#fff'; c.strokeStyle = ink; c.lineWidth = 4;
    c.beginPath(); c.roundRect ? c.roundRect(730, 350, 464, 56, 6) : c.rect(730, 350, 464, 56);
    c.fill(); c.stroke();
    txt(c, '「这一格，得让人记住。」', 750, 388, 24, ink, '700 ' + SANS);
    txt(c, 'ISSUE #01', 58, 480, 20, 'rgba(20,20,20,.65)', MONO);
    txt(c, 'HERO COMIC', 58, 512, 42, ink, '900 ' + SANS);
  };

  // ---------------- X8 手账剪贴本
  C.X8 = function (c, W, H) {
    var kraft = '#cdb38d', paper = '#fbf8f0', ink = '#2b2622', blue = '#3b6fb6', red = '#d94f3d';
    c.fillStyle = kraft; c.fillRect(0, 0, W, H);
    KIT.grain(c, W, H, 31, 0.07);
    // 笔记本
    c.save(); c.translate(120, 70); c.rotate(-0.02);
    c.shadowColor = 'rgba(60,40,20,.25)'; c.shadowBlur = 24; c.shadowOffsetY = 10;
    c.fillStyle = paper; c.fillRect(0, 0, 1040, 590);
    c.restore();
    // 横线
    c.save(); c.strokeStyle = 'rgba(59,111,182,.18)'; c.lineWidth = 1.4;
    for (var y = 150; y < 640; y += 44) { c.beginPath(); c.moveTo(140, y); c.lineTo(1140, y); c.stroke(); }
    c.strokeStyle = 'rgba(217,79,61,.4)';
    c.beginPath(); c.moveTo(230, 90); c.lineTo(230, 650); c.stroke();
    c.restore();
    // 拍立得
    function polaroid(x, y, rot, fill, cap) {
      c.save(); c.translate(x, y); c.rotate(rot);
      c.shadowColor = 'rgba(60,40,20,.3)'; c.shadowBlur = 14; c.shadowOffsetY = 6;
      c.fillStyle = '#fff'; c.fillRect(0, 0, 230, 268);
      c.shadowColor = 'transparent';
      c.fillStyle = fill; c.fillRect(12, 12, 206, 200);
      txt(c, cap, 16, 248, 17, 'rgba(43,38,34,.6)', MONO);
      c.restore();
    }
    polaroid(330, 190, 0.06, '#8fb7d9', 'DAY 01');
    polaroid(600, 220, -0.05, '#d9a48f', 'DAY 12');
    // 胶带
    c.save(); c.fillStyle = 'rgba(255,255,255,.55)';
    c.translate(380, 180); c.rotate(-0.2); c.fillRect(-60, -14, 120, 28); c.restore();
    c.save(); c.fillStyle = 'rgba(255,255,255,.55)';
    c.translate(660, 206); c.rotate(0.16); c.fillRect(-60, -14, 120, 28); c.restore();
    // 手写标题
    KIT.handText(c, '这一页，记下来', 300, 520, 62, ink, 8, { font: 'KaiTi, "Microsoft YaHei", sans-serif', double: true });
    KIT.strokePath(c, [[300, 546], [420, 552], [540, 545], [650, 551]], red, 6, 9, false, 2);
    // 便签
    c.save(); c.translate(880, 380); c.rotate(0.08);
    c.fillStyle = '#ffe9a8'; c.fillRect(0, 0, 220, 150);
    c.restore();
    KIT.handText(c, '下次还要来', 900, 440, 30, 'rgba(43,38,34,.8)', 10, { font: 'KaiTi, "Microsoft YaHei", sans-serif' });
    tag(c, 'SCRAPBOOK', 64, 690, 'rgba(43,38,34,.55)');
  };

  // ---------------- X9 撕纸拼贴
  C.X9 = function (c, W, H) {
    var ground = '#e2cfa8', ink = '#3a3833', slate = '#5f6570', blue = '#6f8dab', olive = '#8b8d5c', clay = '#c7684e', ice = '#b8c9da';
    KIT.paper(c, W, H, ground, 41, { fibers: 7000, len: 26 });
    function torn(x, y, w, h, fill, seed) {
      var r = rng(seed), pts = [], n = 26, i;
      for (i = 0; i <= n; i++) pts.push([x + w * i / n, y + (r() - 0.5) * 14]);
      for (i = 1; i <= 10; i++) pts.push([x + w + (r() - 0.5) * 14, y + h * i / 10]);
      for (i = n; i >= 0; i--) pts.push([x + w * i / n, y + h + (r() - 0.5) * 14]);
      for (i = 9; i >= 1; i--) pts.push([x + (r() - 0.5) * 14, y + h * i / 10]);
      c.save();
      c.shadowColor = 'rgba(58,56,51,.22)'; c.shadowBlur = 10; c.shadowOffsetY = 4;
      KIT.poly(c, pts, fill);
      c.restore();
      // 白色纤维边
      c.save(); c.strokeStyle = 'rgba(255,252,244,.65)'; c.lineWidth = 2.2;
      c.beginPath(); pts.forEach(function (p, j) { j ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]); });
      c.closePath(); c.stroke(); c.restore();
    }
    torn(70, 70, 520, 330, ice, 3);
    torn(560, 210, 420, 300, clay, 7);
    torn(180, 430, 560, 220, olive, 11);
    torn(830, 470, 320, 180, slate, 13);
    // 撕纸上的内容
    txt(c, '切', 120, 300, 160, 'rgba(58,56,51,.86)', '900 ' + SANS);
    txt(c, '开', 300, 300, 160, 'rgba(58,56,51,.86)', '900 ' + SANS);
    txt(c, '重', 620, 400, 120, 'rgba(226,207,168,.92)', '900 ' + SANS);
    txt(c, '拼', 760, 400, 120, 'rgba(226,207,168,.92)', '900 ' + SANS);
    txt(c, '记忆是可以剪开再拼的。', 200, 560, 40, 'rgba(58,56,51,.75)', '700 ' + SANS);
    tag(c, 'TORN PAPER COLLAGE', 64, 690, 'rgba(58,56,51,.55)');
  };

  // ---------------- X10 粒子
  C.X10 = function (c, W, H) {
    c.fillStyle = '#05060b'; c.fillRect(0, 0, W, H);
    var r = rng(101), i;
    for (i = 0; i < 900; i++) {
      var x = r() * W, y = r() * H, a = r() * T, l = 6 + r() * 40;
      var col = r() < 0.4 ? 'rgba(90,220,255,' : r() < 0.6 ? 'rgba(180,120,255,' : 'rgba(255,255,255,';
      c.strokeStyle = col + (0.08 + r() * 0.26) + ')';
      c.lineWidth = 0.8 + r() * 1.2;
      c.beginPath(); c.moveTo(x, y);
      c.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l * 0.6); c.stroke();
    }
    // 辉光垫底
    var g = c.createRadialGradient(W / 2, 330, 40, W / 2, 330, 520);
    g.addColorStop(0, 'rgba(80,200,255,.16)'); g.addColorStop(1, 'rgba(80,200,255,0)');
    c.fillStyle = g; c.fillRect(0, 0, W, H);

    // 用粒子堆出字形
    var oc = document.createElement('canvas');
    oc.width = 960; oc.height = 260;
    var og = oc.getContext('2d');
    og.font = '900 210px ' + SANS;
    og.fillStyle = '#fff'; og.textAlign = 'center'; og.textBaseline = 'middle';
    og.fillText('FLOW', 480, 140);
    var px = og.getImageData(0, 0, 960, 260).data;
    var r2 = rng(202);
    for (var yy = 0; yy < 260; yy += 2) {
      for (var xx = 0; xx < 960; xx += 2) {
        if (px[(yy * 960 + xx) * 4 + 3] < 120) continue;
        var jx = (r2() - 0.5) * 5, jy = (r2() - 0.5) * 5;
        var a2 = 0.3 + r2() * 0.62;
        c.fillStyle = r2() < 0.5 ? 'rgba(150,235,255,' + a2 + ')' : 'rgba(226,247,255,' + a2 + ')';
        c.fillRect(W / 2 - 480 + xx + jx, 200 + yy + jy, 2.2, 2.2);
        if (r2() < 0.06) {
          c.fillStyle = 'rgba(255,120,210,' + (a2 * 0.8) + ')';
          c.fillRect(W / 2 - 480 + xx + jx - 2, 200 + yy + jy, 1.4, 1.4);
        }
      }
    }
    tag(c, 'PARTICLES / 40K', 64, 64, 'rgba(255,255,255,.45)');
    txt(c, '每一个点都在往同一个方向走。', 64, 660, 26, 'rgba(255,255,255,.4)', '400 ' + SANS);
  };

  // ---------------- X11 翻牌显示板
  C.X11 = function (c, W, H) {
    c.fillStyle = '#2c2c30'; c.fillRect(0, 0, W, H);
    var g = c.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, 'rgba(255,255,255,.05)'); g.addColorStop(1, 'rgba(0,0,0,.35)');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    // 板
    c.fillStyle = '#0f0f10'; c.fillRect(60, 150, W - 120, 420);
    c.strokeStyle = '#232326'; c.lineWidth = 10; c.strokeRect(60, 150, W - 120, 420);
    // 翻牌
    var cols = 12, rows = 3, cw = (W - 160) / cols, ch = 110;
    var msg = ['S', 'T', 'Y', 'L', 'E', '', '3', '4', '1'];
    var r = rng(77);
    for (var row = 0; row < rows; row++) {
      for (var col = 0; col < cols; col++) {
        var x = 80 + col * cw, y = 170 + row * (ch + 16);
        c.fillStyle = '#1b1b1e'; c.fillRect(x, y, cw - 8, ch);
        c.strokeStyle = '#0a0a0b'; c.lineWidth = 2; c.strokeRect(x, y, cw - 8, ch);
        // 中缝
        c.fillStyle = '#0a0a0b'; c.fillRect(x, y + ch / 2 - 2, cw - 8, 4);
        var idx = row * cols + col;
        var ch2 = idx < msg.length ? msg[idx] : String.fromCharCode(65 + Math.floor(r() * 26));
        c.fillStyle = idx < msg.length ? '#f1ede2' : 'rgba(241,237,226,.16)';
        c.font = '700 64px ' + MONO;
        c.textAlign = 'center'; c.textBaseline = 'middle';
        c.fillText(ch2, x + (cw - 8) / 2, y + ch / 2 + 2);
      }
    }
    c.textAlign = 'left'; c.textBaseline = 'alphabetic';
    // 状态灯
    c.fillStyle = '#39d353'; c.beginPath(); c.arc(96, 118, 8, 0, T); c.fill();
    tag(c, 'SPLIT-FLAP BOARD / ONLINE', 116, 124, 'rgba(241,237,226,.55)');
    bignum(c, '341', 'MESSAGES', 64, 660, 54, '#ffb000', 'rgba(241,237,226,.45)');
  };

  // ---------------- X12 霓虹灯牌
  C.X12 = function (c, W, H) {
    c.fillStyle = '#1b1417'; c.fillRect(0, 0, W, H);
    // 砖墙
    var r = rng(12);
    for (var y = 0; y < H; y += 46) {
      for (var x = ((y / 46) % 2) * 60; x < W; x += 120) {
        c.fillStyle = 'rgba(255,255,255,' + (0.012 + r() * 0.02) + ')';
        c.fillRect(x, y, 116, 42);
      }
    }
    // 湿地板
    var fl = c.createLinearGradient(0, 560, 0, H);
    fl.addColorStop(0, 'rgba(0,0,0,.5)'); fl.addColorStop(1, 'rgba(255,79,163,.06)');
    c.fillStyle = fl; c.fillRect(0, 560, W, H - 560);

    function neon(text, x, y, size, col, blur) {
      c.save();
      c.font = '800 ' + size + 'px "Segoe Script", "Bradley Hand", cursive';
      c.textAlign = 'center'; c.textBaseline = 'middle';
      c.shadowColor = col; c.shadowBlur = blur; c.fillStyle = col;
      c.fillText(text, x, y); c.fillText(text, x, y);
      c.shadowBlur = blur * 0.4; c.fillStyle = '#fff';
      c.globalAlpha = 0.85; c.fillText(text, x, y);
      c.restore();
    }
    neon('OPEN', W / 2, 250, 190, '#ff4fa3', 46);
    neon('24 / 7', W / 2, 400, 96, '#3ff0ff', 34);
    // 管子
    c.save();
    c.strokeStyle = '#ff8a3d'; c.lineWidth = 6; c.shadowColor = '#ff8a3d'; c.shadowBlur = 24;
    c.beginPath(); c.roundRect ? c.roundRect(250, 150, 780, 330, 26) : c.rect(250, 150, 780, 330);
    c.stroke();
    c.restore();
    // 地面倒影：压扁、翻转、压暗
    c.save();
    c.globalAlpha = 0.16;
    c.translate(0, 660); c.scale(1, -0.34); c.translate(0, -250);
    neon('OPEN', W / 2, 250, 190, '#ff4fa3', 18);
    c.restore();
    txt(c, '霓虹灯牌 / 一条街的招牌', 64, 680, 20, 'rgba(255,255,255,.35)', '400 ' + SANS);
  };
})();
