// K 系列预览（K20–K38）
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

  // K20 剪纸（层叠纸片）
  C.K20 = function (c, W, H) {
    c.fillStyle = '#F1E7D6'; c.fillRect(0, 0, W, H);
    KIT.paper(c, W, H, '#F1E7D6', 201, { fibers: 5000, len: 18 });
    function layer(pts, fill, shadow, dy) {
      c.save();
      c.shadowColor = 'rgba(90,70,45,.30)'; c.shadowBlur = 12; c.shadowOffsetX = 5; c.shadowOffsetY = dy || 7;
      KIT.poly(c, pts, fill);
      c.restore();
      c.strokeStyle = 'rgba(255,252,244,.7)'; c.lineWidth = 2;
      c.beginPath(); pts.forEach(function (p, i) { i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]); }); c.closePath(); c.stroke();
    }
    layer([[360, 250], [640, 180], [920, 250], [920, 520], [640, 590], [360, 520]], '#8FA9C4');
    layer([[420, 300], [640, 240], [860, 300], [860, 490], [640, 550], [420, 490]], '#C9A66B');
    // 剪出的树
    layer([[610, 480], [610, 380], [560, 380], [640, 300], [720, 380], [670, 380], [670, 480]], '#4F7A4A');
    layer([[590, 560], [640, 500], [690, 560]], '#B4462F');
    txt(c, '剪纸', 90, 180, 62, '#2B2620', '800 ' + SANS);
    txt(c, '一层一层叠起来，边缘看得见。', 92, 226, 20, 'rgba(43,38,32,.5)', '500 "Microsoft YaHei", sans-serif');
    tag(c, 'PAPER CUT / K20', 90, 690, 'rgba(43,38,32,.4)');
  };

  // K21 手工纸艺
  C.K21 = function (c, W, H) {
    c.fillStyle = '#EFE3CE'; c.fillRect(0, 0, W, H);
    KIT.grain(c, W, H, 211, 0.05);
    // 纸做的花与叶，带厚度和投影
    function paperShape(pts, fill, off) {
      c.save();
      c.shadowColor = 'rgba(80,60,35,.35)'; c.shadowBlur = 10; c.shadowOffsetX = off || 4; c.shadowOffsetY = off || 6;
      KIT.poly(c, pts, fill);
      c.restore();
      c.strokeStyle = 'rgba(255,255,250,.8)'; c.lineWidth = 1.6;
      c.beginPath(); pts.forEach(function (p, i) { i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]); }); c.closePath(); c.stroke();
    }
    var cx = 620, cy = 380;
    for (var i = 0; i < 8; i++) {
      var a = i / 8 * T;
      c.save(); c.translate(cx, cy); c.rotate(a);
      paperShape([[0, -20], [54, -90], [96, -40], [30, 10]], i % 2 ? '#E8798E' : '#F0A0AE', 6);
      c.restore();
    }
    c.fillStyle = '#F5C84B';
    c.beginPath(); c.arc(cx, cy, 40, 0, T); c.fill();
    // 茎与叶
    paperShape([[608, 420], [632, 420], [628, 620], [612, 620]], '#6E8F52');
    paperShape([[620, 520], [700, 470], [730, 520], [650, 560]], '#7EA45E');
    txt(c, '手工纸艺', 90, 180, 52, '#2B2620', '800 ' + SANS);
    txt(c, '每一片都是剪下来、折过的。', 92, 226, 20, 'rgba(43,38,32,.5)', '500 "Microsoft YaHei", sans-serif');
    tag(c, 'PAPER CRAFT / K21', 90, 690, 'rgba(43,38,32,.4)');
  };

  // K23 拼贴
  C.K23 = function (c, W, H) {
    KIT.paper(c, W, H, '#E8DCC4', 231, { fibers: 6000, len: 22 });
    function torn(x, y, w, h, fill, seed) {
      var r = rng(seed), pts = [], i, n = 18;
      for (i = 0; i <= n; i++) pts.push([x + w * i / n, y + (r() - 0.5) * 12]);
      for (i = 0; i <= 6; i++) pts.push([x + w + (r() - 0.5) * 12, y + h * i / 6]);
      for (i = n; i >= 0; i--) pts.push([x + w * i / n, y + h + (r() - 0.5) * 12]);
      for (i = 5; i >= 0; i--) pts.push([x + (r() - 0.5) * 12, y + h * i / 6]);
      c.save(); c.shadowColor = 'rgba(60,45,25,.28)'; c.shadowBlur = 10; c.shadowOffsetY = 5;
      KIT.poly(c, pts, fill); c.restore();
      c.strokeStyle = 'rgba(255,250,240,.7)'; c.lineWidth = 2.4;
      c.beginPath(); pts.forEach(function (p, j) { j ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]); }); c.closePath(); c.stroke();
    }
    torn(120, 110, 420, 300, '#B8C9DA', 232);
    torn(480, 240, 380, 300, '#C7684E', 233);
    torn(760, 120, 340, 250, '#8B8D5C', 234);
    torn(200, 420, 340, 220, '#E2CFA8', 235);
    // 照片条
    c.save(); c.translate(700, 420); c.rotate(-0.06);
    c.fillStyle = '#FBF7EC'; c.fillRect(0, 0, 300, 220);
    c.fillStyle = '#6F8DAB'; c.fillRect(14, 14, 272, 160);
    c.fillStyle = 'rgba(20,20,20,.5)'; c.beginPath(); c.arc(150, 100, 40, 0, T); c.fill();
    c.restore();
    // 胶带
    c.save(); c.globalAlpha = 0.55; c.fillStyle = '#FFFDF5';
    c.translate(300, 100); c.rotate(-0.3); c.fillRect(-60, -16, 120, 32);
    c.translate(520, 100); c.rotate(0.5); c.fillRect(-60, -16, 120, 32);
    c.restore();
    txt(c, '拼贴', 90, 660, 56, '#2B2620', '800 ' + SANS);
    txt(c, '撕边、照片、胶带，混在一起。', 92, 700, 18, 'rgba(43,38,32,.5)', '500 "Microsoft YaHei", sans-serif');
  };

  // K24 粘土
  C.K24 = function (c, W, H) {
    var bg = '#F3E7DA';
    c.fillStyle = bg; c.fillRect(0, 0, W, H);
    var r = rng(241);
    // 粘土小人
    c.save(); c.translate(640, 400);
    c.shadowColor = 'rgba(120,90,60,.35)'; c.shadowBlur = 30; c.shadowOffsetY = 18;
    c.fillStyle = '#E8A07A'; c.beginPath(); c.ellipse(0, 60, 170, 190, 0, 0, T); c.fill();
    c.restore();
    c.save(); c.translate(640, 400);
    c.fillStyle = '#F2B896'; c.beginPath(); c.arc(0, -130, 110, 0, T); c.fill();
    c.shadowColor = 'transparent';
    c.fillStyle = '#2B2018';
    c.beginPath(); c.arc(-38, -140, 12, 0, T); c.fill();
    c.beginPath(); c.arc(40, -140, 12, 0, T); c.fill();
    c.strokeStyle = '#8E4A35'; c.lineWidth = 7; c.lineCap = 'round';
    c.beginPath(); c.arc(0, -108, 28, 0.3, Math.PI - 0.3); c.stroke();
    // 手指印
    for (var i = 0; i < 26; i++) {
      c.strokeStyle = 'rgba(150,90,60,' + (0.06 + r() * 0.1) + ')'; c.lineWidth = 3;
      var px = (r() - 0.5) * 300, py = 40 + (r() - 0.5) * 320;
      c.beginPath(); c.arc(px, py, 8 + r() * 14, r() * T, r() * T + 1.2); c.stroke();
    }
    c.restore();
    txt(c, '粘土', 90, 180, 62, '#2B2018', '800 ' + SANS);
    txt(c, '有手指印，才是手捏的。', 92, 226, 20, 'rgba(43,32,24,.5)', '500 "Microsoft YaHei", sans-serif');
    tag(c, 'CLAY / K24', 90, 690, 'rgba(43,32,24,.4)');
  };

  // K25 皮克斯式 3D
  C.K25 = function (c, W, H) {
    var g = c.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#BFE3FF'); g.addColorStop(1, '#F2E6D2');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    // 地面
    c.fillStyle = '#9ED49A'; c.beginPath(); c.ellipse(640, 620, 520, 90, 0, 0, T); c.fill();
    // 身体
    c.save(); c.translate(640, 400);
    var bg2 = c.createRadialGradient(-60, -40, 20, 0, 0, 220);
    bg2.addColorStop(0, '#FFD9A8'); bg2.addColorStop(1, '#D98A4A');
    c.fillStyle = bg2; c.beginPath(); c.ellipse(0, 90, 150, 180, 0, 0, T); c.fill();
    // 头
    var hg = c.createRadialGradient(-50, -160, 10, 0, -120, 150);
    hg.addColorStop(0, '#FFF0DC'); hg.addColorStop(1, '#E8A878');
    c.fillStyle = hg; c.beginPath(); c.arc(0, -120, 118, 0, T); c.fill();
    // 眼
    c.fillStyle = '#fff'; c.beginPath(); c.ellipse(-46, -130, 36, 42, 0, 0, T); c.fill();
    c.beginPath(); c.ellipse(46, -130, 36, 42, 0, 0, T); c.fill();
    c.fillStyle = '#2B3A5A'; c.beginPath(); c.arc(-44, -126, 20, 0, T); c.fill();
    c.beginPath(); c.arc(48, -126, 20, 0, T); c.fill();
    c.fillStyle = '#fff'; c.beginPath(); c.arc(-52, -136, 7, 0, T); c.fill();
    c.beginPath(); c.arc(40, -136, 7, 0, T); c.fill();
    // 高光
    c.fillStyle = 'rgba(255,255,255,.55)';
    c.beginPath(); c.ellipse(-34, -196, 40, 18, -0.5, 0, T); c.fill();
    // 头发
    c.fillStyle = '#8E5A3A';
    c.beginPath(); c.moveTo(-70, -210); c.quadraticCurveTo(-40, -282, 10, -252);
    c.quadraticCurveTo(42, -302, 82, -240); c.quadraticCurveTo(40, -230, 20, -200);
    c.quadraticCurveTo(-20, -220, -70, -210); c.fill();
    // 眉毛
    c.strokeStyle = '#6B4028'; c.lineWidth = 9; c.lineCap = 'round';
    c.beginPath(); c.moveTo(-74, -180); c.quadraticCurveTo(-46, -194, -18, -182); c.stroke();
    c.beginPath(); c.moveTo(18, -182); c.quadraticCurveTo(46, -194, 74, -180); c.stroke();
    // 嘴
    c.strokeStyle = '#8E4A35'; c.lineWidth = 7;
    c.beginPath(); c.arc(0, -62, 30, 0.3, Math.PI - 0.3); c.stroke();
    c.restore();
    txt(c, '皮克斯式 3D', 90, 170, 48, '#2B2018', '800 ' + SANS);
    txt(c, '比例夸张，光要柔。', 92, 214, 20, 'rgba(43,32,24,.5)', '500 "Microsoft YaHei", sans-serif');
    tag(c, 'STYLIZED 3D / K25', 90, 690, 'rgba(43,32,24,.4)');
  };

  // K26 卡通渲染 3D
  C.K26 = function (c, W, H) {
    c.fillStyle = '#DFF1F7'; c.fillRect(0, 0, W, H);
    c.fillStyle = '#BFE3CE'; c.beginPath(); c.ellipse(640, 620, 500, 80, 0, 0, T); c.fill();
    c.save(); c.translate(640, 400);
    // 硬边阴影的身体
    c.fillStyle = '#F2A03D'; c.beginPath(); c.ellipse(0, 90, 150, 180, 0, 0, T); c.fill();
    c.fillStyle = '#D07A22'; // 硬边阴影
    c.beginPath(); c.arc(30, 120, 178, -0.5, 1.4); c.lineTo(30, 120); c.fill();
    // 头
    c.fillStyle = '#FFE0B8'; c.beginPath(); c.arc(0, -120, 118, 0, T); c.fill();
    c.fillStyle = '#E8B078';
    c.beginPath(); c.arc(24, -104, 128, -0.4, 1.5); c.lineTo(24, -104); c.fill();
    // 黑描边
    c.strokeStyle = '#1A1A1A'; c.lineWidth = 9; c.lineJoin = 'round';
    c.beginPath(); c.arc(0, -120, 118, 0, T); c.stroke();
    c.beginPath(); c.ellipse(0, 90, 150, 180, 0, 0, T); c.stroke();
    // 眼
    c.fillStyle = '#fff'; c.beginPath(); c.ellipse(-46, -130, 34, 40, 0, 0, T); c.fill();
    c.beginPath(); c.ellipse(46, -130, 34, 40, 0, 0, T); c.fill();
    c.strokeStyle = '#1A1A1A'; c.lineWidth = 7;
    c.beginPath(); c.ellipse(-46, -130, 34, 40, 0, 0, T); c.stroke();
    c.beginPath(); c.ellipse(46, -130, 34, 40, 0, 0, T); c.stroke();
    c.fillStyle = '#1A1A1A'; c.beginPath(); c.arc(-44, -126, 18, 0, T); c.fill();
    c.beginPath(); c.arc(48, -126, 18, 0, T); c.fill();
    c.restore();
    txt(c, '卡通渲染', 90, 170, 50, '#1A1A1A', '800 ' + SANS);
    txt(c, '3D 的模型，硬边的阴影，一圈黑描边。', 92, 214, 18, 'rgba(26,26,26,.5)', '500 "Microsoft YaHei", sans-serif');
    tag(c, 'CEL-SHADED 3D / K26', 90, 690, 'rgba(26,26,26,.4)');
  };

  // K27 低多边形
  C.K27 = function (c, W, H) {
    var g = c.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#2B3A55'); g.addColorStop(1, '#5A6E8A');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    // 低多边形狐狸头
    var tones = ['#E88C3C', '#D9762A', '#F2A65A', '#C4601E', '#F7C08A'];
    function tri(a, b, d, col) {
      c.fillStyle = col;
      c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.lineTo(d[0], d[1]); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(30,20,12,.14)'; c.lineWidth = 1; c.stroke();
    }
    var cx = 640, cy = 380;
    // 耳朵
    tri([cx - 150, cy - 60], [cx - 110, cy - 230], [cx - 30, cy - 90], tones[0]);
    tri([cx + 150, cy - 60], [cx + 110, cy - 230], [cx + 30, cy - 90], tones[1]);
    tri([cx - 128, cy - 90], [cx - 112, cy - 186], [cx - 66, cy - 100], tones[4]);
    tri([cx + 128, cy - 90], [cx + 112, cy - 186], [cx + 66, cy - 100], tones[4]);
    // 头
    tri([cx - 150, cy - 60], [cx, cy - 110], [cx, cy + 40], tones[0]);
    tri([cx + 150, cy - 60], [cx, cy - 110], [cx, cy + 40], tones[2]);
    tri([cx - 150, cy - 60], [cx, cy + 40], [cx - 60, cy + 70], tones[1]);
    tri([cx + 150, cy - 60], [cx, cy + 40], [cx + 60, cy + 70], tones[1]);
    // 吻部
    tri([cx - 60, cy + 30], [cx, cy + 40], [cx, cy + 150], tones[4]);
    tri([cx + 60, cy + 30], [cx, cy + 40], [cx, cy + 150], tones[4]);
    tri([cx - 60, cy + 30], [cx - 10, cy + 120], [cx, cy + 40], '#FBF1E4');
    tri([cx + 60, cy + 30], [cx + 10, cy + 120], [cx, cy + 40], '#FBF1E4');
    c.fillStyle = '#241812'; c.beginPath(); c.arc(cx, cy + 150, 12, 0, T); c.fill();
    // 眼睛
    tri([cx - 100, cy - 20], [cx - 50, cy - 40], [cx - 75, cy + 10], '#241812');
    tri([cx + 100, cy - 20], [cx + 50, cy - 40], [cx + 75, cy + 10], '#241812');
    txt(c, '低多边形', 90, 170, 50, '#F0D8B8', '800 ' + SANS);
    txt(c, '面越少，越像雕塑。', 92, 214, 20, 'rgba(240,216,184,.55)', '500 "Microsoft YaHei", sans-serif');
    tag(c, 'LOW POLY / K27', 90, 690, 'rgba(240,216,184,.4)');
  };

  // K28 像素
  C.K28 = function (c, W, H) {
    var oc = document.createElement('canvas'); oc.width = 320; oc.height = 180;
    var g = oc.getContext('2d');
    var pal = ['#1a1c2c', '#5d275d', '#b13e53', '#ef7d57', '#ffcd75', '#a7f070', '#38b764', '#257179', '#29366f', '#3b5dc9', '#41a6f6', '#73eff7', '#f4f4f4'];
    g.fillStyle = pal[8]; g.fillRect(0, 0, 320, 180);
    // 像素头像：大脸
    for (var y = 0; y < 180; y += 10) for (var x = 0; x < 320; x += 10) {
      if ((x + y) % 40 === 0) { g.fillStyle = pal[9]; g.fillRect(x, y, 10, 10); }
    }
    // 脸
    g.fillStyle = pal[4];
    for (var yy = 40; yy < 160; yy += 10) for (var xx = 90; xx < 230; xx += 10) {
      if (Math.abs(xx - 160) < 70 && Math.abs(yy - 100) < 60) g.fillRect(xx, yy, 10, 10);
    }
    g.fillStyle = pal[0];
    g.fillRect(120, 84, 16, 20); g.fillRect(184, 84, 16, 20);
    g.fillRect(140, 124, 40, 8);
    g.fillStyle = pal[2]; g.fillRect(100, 50, 20, 10); g.fillRect(200, 50, 20, 10);
    // 帽子
    g.fillStyle = pal[2]; g.fillRect(100, 30, 120, 20); g.fillRect(90, 50, 140, 10);
    c.imageSmoothingEnabled = false;
    c.drawImage(oc, 0, 0, W, H);
    txt(c, 'PIXEL', 40, 48, 24, 'rgba(255,255,255,.9)', '700 ' + MONO);
    txt(c, 'PIXEL / K28', W - 40, 700, 14, 'rgba(255,255,255,.5)', MONO, 'right');
    KIT.scan(c, W, H, 4, 0.10);
  };

  // K29 蓝图
  C.K29 = function (c, W, H) {
    var blue = '#173F73', white = 'rgba(235,244,255,.9)', dim = 'rgba(235,244,255,.42)';
    c.fillStyle = blue; c.fillRect(0, 0, W, H);
    c.save(); c.strokeStyle = 'rgba(235,244,255,.10)'; c.lineWidth = 1;
    for (var x = 0; x < W; x += 32) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); }
    for (var y = 0; y < H; y += 32) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
    c.restore();
    // 等距零件
    var P = KIT.isoProjector(640, 400, 46);
    function box(x, y, z, w, d, hh) {
      KIT.isoBox(c, P, x, y, z, w, d, hh, { top: 'rgba(235,244,255,.14)', left: 'rgba(235,244,255,.07)', right: 'rgba(235,244,255,.10)', edge: white });
    }
    box(-1.5, -1.5, 0, 3, 3, 0.4);
    box(-0.9, -0.9, 0.4, 1.8, 1.8, 1.6);
    box(-0.4, -0.4, 2.0, 0.8, 0.8, 0.6);
    // 尺寸线
    c.save(); c.strokeStyle = dim; c.lineWidth = 1.2; c.setLineDash([6, 6]);
    c.beginPath(); c.moveTo(420, 640); c.lineTo(860, 640); c.stroke(); c.restore();
    txt(c, '341 × 193 × 148 mm', 640, 664, 14, dim, MONO, 'center');
    txt(c, 'BLUEPRINT', 90, 170, 46, white, '700 ' + MONO);
    txt(c, '等距视角，标上尺寸。', 92, 208, 18, dim, '400 "Microsoft YaHei", sans-serif');
    tag(c, 'BLUEPRINT / K29', 90, 690, dim);
  };

  // K30 说明书线稿
  C.K30 = function (c, W, H) {
    c.fillStyle = '#F7F5EE'; c.fillRect(0, 0, W, H);
    c.strokeStyle = '#2B2B2B'; c.lineWidth = 3; c.lineCap = 'round'; c.lineJoin = 'round';
    // 椅子线稿
    c.strokeRect(430, 300, 300, 40);
    c.strokeRect(450, 340, 26, 220);
    c.strokeRect(684, 340, 26, 220);
    c.strokeRect(430, 300, 300, 120);
    c.strokeRect(470, 340, 220, 80);
    // 编号
    c.strokeStyle = '#C8452F'; c.lineWidth = 2;
    [[560, 290, 1], [440, 570, 2], [700, 570, 3]].forEach(function (p) {
      c.beginPath(); c.arc(p[0], p[1] - 30, 20, 0, T); c.stroke();
      txt(c, String(p[2]), p[0], p[1] - 23, 18, '#C8452F', MONO, 'center');
    });
    // 箭头
    c.strokeStyle = '#2B2B2B'; c.lineWidth = 2;
    c.beginPath(); c.moveTo(560, 316); c.lineTo(560, 300); c.stroke();
    c.beginPath(); c.moveTo(720, 470); c.lineTo(760, 470); c.stroke();
    // 步骤
    txt(c, '1', 90, 620, 22, '#C8452F', MONO);
    txt(c, '装椅面', 120, 620, 22, '#2B2B2B', '500 "Microsoft YaHei", sans-serif');
    txt(c, '2', 260, 620, 22, '#C8452F', MONO);
    txt(c, '装两条前腿', 290, 620, 22, '#2B2B2B', '500 "Microsoft YaHei", sans-serif');
    txt(c, '3', 500, 620, 22, '#C8452F', MONO);
    txt(c, '拧紧', 530, 620, 22, '#2B2B2B', '500 "Microsoft YaHei", sans-serif');
    txt(c, '所有零件', 90, 170, 44, '#2B2B2B', '700 ' + SANS);
    tag(c, 'ASSEMBLY LINE ART / K30', 90, 690, 'rgba(43,43,43,.4)');
  };

  // K31 平铺整理
  C.K31 = function (c, W, H) {
    c.fillStyle = '#E9E2D4'; c.fillRect(0, 0, W, H);
    KIT.grain(c, W, H, 311, 0.04);
    // 桌面上的物件，俯拍，整齐排列
    function obj(x, y, w, h, fill, radius) {
      c.save(); c.shadowColor = 'rgba(80,60,40,.28)'; c.shadowBlur = 10; c.shadowOffsetY = 6;
      c.fillStyle = fill;
      c.beginPath();
      if (c.roundRect) c.roundRect(x, y, w, h, radius || 6); else c.rect(x, y, w, h);
      c.fill(); c.restore();
    }
    obj(160, 150, 220, 150, '#3A4A5A', 8);   // 笔记本
    obj(420, 150, 90, 150, '#C8452F', 4);     // 书
    obj(540, 150, 70, 150, '#2E5B7A', 4);
    obj(640, 150, 70, 150, '#D9A02B', 4);
    obj(160, 340, 260, 60, '#F2C94C', 6);     // 尺
    obj(460, 340, 120, 120, '#F7F5EE', 8);    // 线圈本
    c.strokeStyle = '#C8452F'; c.lineWidth = 8; c.lineCap = 'round';
    c.beginPath(); c.moveTo(700, 360); c.lineTo(860, 360); c.stroke();
    // 笔
    obj(160, 460, 300, 26, '#2B3A5A', 13);
    obj(480, 460, 220, 26, '#C8452F', 13);
    // 小方块
    [[740, 460], [800, 460], [860, 460]].forEach(function (p) {
      obj(p[0], p[1], 46, 46, '#7EA45E', 6);
    });
    txt(c, '平铺整理', 90, 640, 44, '#2B2620', '800 ' + SANS);
    txt(c, '东西摆整齐，从上往下拍。', 92, 680, 18, 'rgba(43,38,32,.5)', '500 "Microsoft YaHei", sans-serif');
  };

  // K32 积木
  C.K32 = function (c, W, H) {
    c.fillStyle = '#EAF2FA'; c.fillRect(0, 0, W, H);
    function brick(x, y, w, h, col, studs) {
      c.fillStyle = col; c.fillRect(x, y, w, h);
      c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(x, y, w, 6);
      c.fillStyle = 'rgba(0,0,0,.18)';
      for (var i = 0; i < studs; i++) {
        var cx = x + (i + 0.5) * (w / studs);
        c.beginPath(); c.ellipse(cx, y, (w / studs) * 0.28, 7, 0, 0, T); c.fill();
      }
    }
    brick(360, 480, 260, 90, '#E23B2E', 3);
    brick(620, 480, 260, 90, '#2B6BD9', 3);
    brick(430, 390, 180, 90, '#FFD43B', 2);
    brick(610, 390, 180, 90, '#3AAFA9', 2);
    brick(520, 300, 180, 90, '#E23B2E', 2);
    txt(c, '积木', 90, 180, 62, '#1B2A3D', '800 ' + SANS);
    txt(c, '一块一块往上搭。', 92, 226, 21, 'rgba(27,42,61,.45)', '500 "Microsoft YaHei", sans-serif');
    tag(c, 'BRICKS / K32', 90, 690, 'rgba(27,42,61,.4)');
  };

  // K33 地铁图
  C.K33 = function (c, W, H) {
    c.fillStyle = '#F7F4EC'; c.fillRect(0, 0, W, H);
    function line(pts, col) {
      c.save(); c.strokeStyle = col; c.lineWidth = 14; c.lineCap = 'round'; c.lineJoin = 'round';
      c.beginPath(); pts.forEach(function (p, i) { i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]); });
      c.stroke(); c.restore();
    }
    line([[120, 520], [340, 520], [420, 440], [700, 440], [780, 360], [1080, 360]], '#D9774F');
    line([[240, 200], [240, 340], [320, 420], [320, 600], [620, 600], [700, 520]], '#23408E');
    [[120, 520], [340, 520], [420, 440], [700, 440], [780, 360], [1080, 360]].forEach(function (p) {
      c.beginPath(); c.arc(p[0], p[1], 11, 0, T); c.fillStyle = '#fff'; c.fill();
      c.strokeStyle = '#D9774F'; c.lineWidth = 6; c.stroke();
    });
    [[240, 200], [240, 340], [320, 420], [320, 600], [620, 600], [700, 520]].forEach(function (p) {
      c.beginPath(); c.arc(p[0], p[1], 11, 0, T); c.fillStyle = '#fff'; c.fill();
      c.strokeStyle = '#23408E'; c.lineWidth = 6; c.stroke();
    });
    c.fillStyle = '#1F2A44'; c.fillRect(800, 170, 280, 64);
    txt(c, 'STYLE LINE', 820, 212, 22, '#fff', '700 ' + MONO);
    txt(c, '一站一站，讲清楚。', 90, 150, 34, '#1D1D22', '700 "Microsoft YaHei", sans-serif');
    tag(c, 'SUBWAY MAP / K33', 90, 690, 'rgba(29,29,34,.4)');
  };

  // K34 赛博霓虹
  C.K34 = function (c, W, H) {
    c.fillStyle = '#0B0714'; c.fillRect(0, 0, W, H);
    // 城市剪影
    var r = rng(341);
    for (var x = 0; x < W; x += 40) {
      var h = 120 + r() * 220;
      c.fillStyle = '#140E24'; c.fillRect(x, H - h, 40, h);
      for (var y = H - h + 12; y < H - 20; y += 22) {
        if (r() < 0.4) { c.fillStyle = r() < 0.5 ? 'rgba(255,79,163,.6)' : 'rgba(63,240,255,.55)'; c.fillRect(x + 8, y, 8, 8); }
      }
    }
    // 霓虹圈
    c.save(); c.shadowColor = '#FF4FA3'; c.shadowBlur = 40;
    c.strokeStyle = '#FF4FA3'; c.lineWidth = 8;
    c.beginPath(); c.arc(640, 330, 150, 0, T); c.stroke();
    c.restore();
    c.save(); c.shadowColor = '#3FF0FF'; c.shadowBlur = 30;
    c.strokeStyle = '#3FF0FF'; c.lineWidth = 5;
    c.beginPath(); c.arc(640, 330, 190, 0.4, 2.6); c.stroke();
    c.restore();
    txt(c, 'NEON', 640, 350, 96, '#FFF6FB', '900 ' + SANS, 'center');
    txt(c, '赛博霓虹', 90, 160, 44, '#FF8FD0', '800 "Microsoft YaHei", sans-serif');
    txt(c, '深色底，光是唯一的主角。', 92, 202, 18, 'rgba(255,143,208,.55)', '400 "Microsoft YaHei", sans-serif');
    tag(c, 'CYBER NEON / K34', 90, 690, 'rgba(255,143,208,.4)');
  };

  // K35 旧学院风
  C.K35 = function (c, W, H) {
    c.fillStyle = '#D8C3A0'; c.fillRect(0, 0, W, H);
    KIT.grain(c, W, H, 351, 0.09);
    // 老书页
    c.fillStyle = 'rgba(245,235,215,.55)'; c.fillRect(90, 90, W - 180, H - 180);
    c.strokeStyle = 'rgba(90,70,45,.35)'; c.lineWidth = 2; c.strokeRect(90, 90, W - 180, H - 180);
    c.strokeRect(104, 104, W - 208, H - 208);
    // 铜版画插图
    c.save(); c.translate(640, 360);
    c.strokeStyle = '#3A2A1E'; c.lineWidth = 2;
    c.beginPath(); c.arc(0, -40, 90, 0, T); c.stroke();
    c.beginPath(); c.ellipse(0, 110, 140, 90, 0, 0, T); c.stroke();
    // 排线阴影
    var r = rng(352);
    for (var i = 0; i < 90; i++) {
      var a = r() * T, rr = r() * 80;
      c.beginPath(); c.moveTo(Math.cos(a) * rr, -40 + Math.sin(a) * rr);
      c.lineTo(Math.cos(a) * (rr + 18), -40 + Math.sin(a) * (rr + 18) + 10); c.stroke();
    }
    c.restore();
    txt(c, 'OLD ACADEMIA', 120, 160, 34, '#3A2A1E', '400 Georgia, serif');
    txt(c, '泛黄、棕褐、像一本旧书。', 122, 200, 18, 'rgba(58,42,30,.55)', '400 "Microsoft YaHei", sans-serif');
    tag(c, 'OLD ACADEMIA / K35', 120, 680, 'rgba(58,42,30,.45)');
  };

  // K36 丝网印刷
  C.K36 = function (c, W, H) {
    c.fillStyle = '#F2EBDD'; c.fillRect(0, 0, W, H);
    // 套色错位：同一只鸟印三层
    function bird(dx, dy, col) {
      c.save(); c.translate(dx, dy); c.fillStyle = col;
      c.beginPath(); c.ellipse(640, 380, 150, 100, -0.12, 0, T); c.fill();           // 身
      c.beginPath(); c.arc(520, 300, 62, 0, T); c.fill();                            // 头
      c.beginPath(); c.moveTo(470, 300); c.lineTo(390, 276); c.lineTo(470, 326); c.fill(); // 喙
      c.beginPath(); c.moveTo(700, 420); c.lineTo(830, 500); c.lineTo(700, 470); c.fill(); // 尾
      c.beginPath(); c.moveTo(600, 300); c.quadraticCurveTo(660, 200, 760, 250);
      c.quadraticCurveTo(680, 280, 640, 330); c.fill();                              // 翅
      c.restore();
    }
    bird(-12, 10, 'rgba(226,59,46,.62)');
    bird(14, -8, 'rgba(43,107,217,.58)');
    bird(0, 0, 'rgba(255,212,59,.72)');
    // 墨点
    var r = rng(361);
    for (var i = 0; i < 260; i++) {
      c.fillStyle = 'rgba(20,20,20,' + (0.02 + r() * 0.05) + ')';
      c.fillRect(r() * W, r() * H, 1 + r() * 3, 1 + r() * 3);
    }
    txt(c, '丝网印刷', 90, 180, 52, '#1A1A1A', '800 ' + SANS);
    txt(c, '套色会错开，那是它的手感。', 92, 226, 19, 'rgba(26,26,26,.5)', '500 "Microsoft YaHei", sans-serif');
    tag(c, 'SCREEN PRINT / K36', 90, 690, 'rgba(26,26,26,.4)');
  };

  // K37 哥特
  C.K37 = function (c, W, H) {
    c.fillStyle = '#0E0A14'; c.fillRect(0, 0, W, H);
    // 尖拱
    c.strokeStyle = '#6B3A7A'; c.lineWidth = 6;
    c.beginPath(); c.moveTo(420, 620); c.lineTo(420, 300);
    c.quadraticCurveTo(640, 60, 860, 300); c.lineTo(860, 620); c.stroke();
    c.strokeStyle = 'rgba(200,60,80,.55)'; c.lineWidth = 2;
    c.beginPath(); c.moveTo(450, 620); c.lineTo(450, 310);
    c.quadraticCurveTo(640, 110, 830, 310); c.lineTo(830, 620); c.stroke();
    // 玫瑰窗
    c.save(); c.translate(640, 300);
    c.strokeStyle = '#C83C50'; c.lineWidth = 3;
    c.beginPath(); c.arc(0, 0, 110, 0, T); c.stroke();
    for (var i = 0; i < 8; i++) {
      c.save(); c.rotate(i / 8 * T);
      c.beginPath(); c.moveTo(0, 0); c.lineTo(0, -110); c.stroke();
      c.beginPath(); c.arc(0, -62, 26, 0, T); c.stroke();
      c.restore();
    }
    c.restore();
    // 十字
    c.fillStyle = '#C83C50';
    c.fillRect(632, 470, 16, 110); c.fillRect(600, 492, 80, 16);
    txt(c, 'GOTHIC', 90, 160, 44, '#C83C50', '400 Georgia, serif');
    txt(c, '细长、尖、暗紫和暗红。', 92, 202, 18, 'rgba(200,60,80,.55)', '400 "Microsoft YaHei", sans-serif');
    tag(c, 'GOTHIC / K37', 90, 690, 'rgba(200,60,80,.4)');
  };

  // K38 情景喜剧
  C.K38 = function (c, W, H) {
    var bg = '#F5D76E';
    c.fillStyle = bg; c.fillRect(0, 0, W, H);
    // 客厅背景
    c.fillStyle = '#E8B84B'; c.fillRect(0, 420, W, 300);
    c.fillStyle = '#8ED1C6'; c.fillRect(80, 120, 320, 300);
    c.strokeStyle = '#4A4A4A'; c.lineWidth = 5; c.strokeRect(80, 120, 320, 300);
    // 沙发
    c.fillStyle = '#D96A5A'; c.fillRect(760, 400, 340, 160);
    c.fillStyle = '#C25A4A'; c.fillRect(760, 400, 340, 40);
    // 人物：黄皮肤、凸眼、棕口鼻
    c.save(); c.translate(560, 360);
    // 头发（锯齿）
    c.fillStyle = '#FFD90F';
    c.beginPath();
    c.moveTo(-96, -100);
    c.lineTo(-104, -150); c.lineTo(-72, -132); c.lineTo(-62, -186);
    c.lineTo(-24, -146); c.lineTo(0, -196); c.lineTo(24, -146);
    c.lineTo(62, -188); c.lineTo(72, -132); c.lineTo(104, -152);
    c.lineTo(96, -100);
    c.closePath(); c.fill();
    // 头
    c.beginPath(); c.ellipse(0, -56, 100, 108, 0, 0, T); c.fill();
    // 身体
    c.beginPath(); c.ellipse(0, 100, 84, 110, 0, 0, T); c.fill();
    // 领子
    c.fillStyle = '#F4F4F4';
    c.beginPath(); c.moveTo(-40, 20); c.lineTo(0, 56); c.lineTo(40, 20); c.lineTo(0, 0); c.closePath(); c.fill();
    // 眼睛
    c.fillStyle = '#fff';
    c.beginPath(); c.arc(-34, -78, 32, 0, T); c.fill();
    c.beginPath(); c.arc(34, -78, 32, 0, T); c.fill();
    c.fillStyle = '#1A1A1A';
    c.beginPath(); c.arc(-32, -76, 10, 0, T); c.fill();
    c.beginPath(); c.arc(36, -76, 10, 0, T); c.fill();
    // 口鼻
    c.fillStyle = '#C8A06A';
    c.beginPath(); c.ellipse(0, 4, 62, 42, 0, 0, T); c.fill();
    c.fillStyle = '#1A1A1A';
    c.beginPath(); c.arc(-14, -2, 5, 0, T); c.fill();
    c.beginPath(); c.arc(14, -2, 5, 0, T); c.fill();
    c.strokeStyle = '#1A1A1A'; c.lineWidth = 4; c.lineCap = 'round';
    c.beginPath(); c.arc(0, 22, 26, 0.25, Math.PI - 0.25); c.stroke();
    c.restore();
    txt(c, '情景喜剧', 90, 660, 44, '#2B2018', '800 "Microsoft YaHei", sans-serif');
    txt(c, '平涂、黄皮肤、动作不用多。', 92, 700, 18, 'rgba(43,32,24,.55)', '500 "Microsoft YaHei", sans-serif');
    tag(c, 'SITCOM / K38', 90, 620, 'rgba(43,32,24,.45)');
  };
})();
