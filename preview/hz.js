// H 现成版式 + Z 中国风 预览渲染
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
  function tag(c, s, x, y, color, size) { txt(c, s, x, y, size || 14, color || 'rgba(0,0,0,.45)', MONO); }

  // ================= H 系列：参数化版式 =================
  var SERIF = 'Georgia, "Times New Roman", "Songti SC", serif';
  var HSPEC = {
    H1: { bg: '#EFE6D2', ink: '#1F2A5A', accent: '#F2B705', deco: 'sun', title: ['Biennale', 'Yellow'], italic: [false, true], size: 132, font: SERIF, weight: 400, cap: 'THE TWELFTH BIENNALE · EDITORIAL SERIES', foot: 'N° 01 / 2026' },
    H3: { bg: '#F0E9DA', ink: '#1F4EA8', accent: '#1F4EA8', deco: 'rule', title: ['Blue', 'Professional'], size: 118, font: 'Arial, "Helvetica Neue", sans-serif', weight: 700, cap: 'COBALT / TRUST / CLARITY', foot: 'SERIES 03' },
    H4: { bg: '#F6EEDC', ink: '#171717', accent: '#D8382C', deco: 'slash', title: ['Bold', 'Poster'], italic: [true, false], size: 150, font: '"Segoe Script", "Bradley Hand", cursive', weight: 700, cap: 'ISSUE FOUR · THE LOUD ONE', foot: 'PRINT / 2026' },
    H5: { bg: '#F2E8D2', ink: '#221E19', accent: '#E2551F', deco: 'broadside', title: ['THE', 'BROADSIDE'], size: 110, font: '"Arial Black", Impact, sans-serif', weight: 900, cap: 'INDUSTRY · RAIL · STEAM · NEWS', foot: 'VOL. 05 — PRICE 2¢' },
    H6: { bg: '#F7F1E4', ink: '#2B2B2B', accent: '#F6A5C0', deco: 'capsule', title: ['Capsule', 'Edition'], size: 112, font: '"Bodoni 72", "Didot", Georgia, serif', weight: 400, cap: 'SOFT SHAPES / CANDY TONES', foot: 'No. 06' },
    H7: { bg: '#F4F0E6', ink: '#24211C', accent: '#8A7B68', deco: 'cartesian', title: ['Cartesian', 'Space'], size: 92, font: SERIF, weight: 400, cap: 'LESS, BUT BETTER', foot: 'GRID 12 / 2026' },
    H8: { bg: '#F1EADA', ink: '#173FA0', accent: '#173FA0', deco: 'grid', title: ['Cobalt', 'Grid'], size: 126, font: '"Newsreader", Georgia, serif', weight: 500, cap: 'STRUCTURE IS THE STYLE', foot: 'SHEET 08' },
    H9: { bg: '#FBF3E4', ink: '#22303A', accent: '#F26D5B', deco: 'coral', title: ['CORAL', 'HOUR'], size: 150, font: 'Impact, "Arial Black", sans-serif', weight: 700, cap: 'ALL CAPS / ONE ACCENT', foot: 'NINE' },
    H10: { bg: '#FBF6EA', ink: '#141414', accent: '#FF5DA2', deco: 'candy', title: ['Creative', 'Mode'], size: 132, font: '"Arial Black", Impact, sans-serif', weight: 900, cap: 'SATURATED / PLAYFUL / LOUD', foot: 'MODE 10' },
    H11: { bg: '#FDF4DF', ink: '#3A3630', accent: '#F2A03D', deco: 'daisy', title: ['Daisy', 'Days'], size: 128, font: '"Arial Rounded MT Bold", "Segoe UI", sans-serif', weight: 800, cap: 'SUNNY GARDEN PASTELS', foot: 'DAY 11' },
    H12: { bg: '#F2EFE3', ink: '#1E3A2C', accent: '#C77E8E', deco: 'forest', title: ['Editorial', 'Forest'], size: 110, font: SERIF, weight: 400, cap: 'GREEN / PINK / CREAM', foot: 'ISSUE 12' }
  };

  function drawH(c, W, H, s) {
    c.fillStyle = s.bg; c.fillRect(0, 0, W, H);
    KIT.grain(c, W, H, 7, 0.03);
    var d = s.deco;
    if (d === 'sun') {
      var g = c.createRadialGradient(980, 200, 20, 980, 200, 380);
      g.addColorStop(0, 'rgba(242,183,5,.55)'); g.addColorStop(1, 'rgba(242,183,5,0)');
      c.fillStyle = g; c.fillRect(0, 0, W, H);
    } else if (d === 'rule') {
      c.fillStyle = s.accent; c.fillRect(96, 120, 88, 6);
      c.fillStyle = 'rgba(31,78,168,.10)'; c.fillRect(96, 138, W - 192, 2);
    } else if (d === 'slash') {
      c.save(); c.rotate(-0.06); c.fillStyle = s.accent; c.fillRect(-60, 430, W + 120, 22); c.restore();
    } else if (d === 'broadside') {
      c.strokeStyle = 'rgba(34,30,25,.25)'; c.lineWidth = 2;
      c.strokeRect(60, 60, W - 120, H - 120);
      c.strokeRect(72, 72, W - 144, H - 144);
      c.fillStyle = s.accent; c.fillRect(60, 60, W - 120, 10);
    } else if (d === 'capsule') {
      c.fillStyle = 'rgba(246,165,192,.55)';
      c.beginPath();
      if (c.roundRect) c.roundRect(760, 120, 420, 180, 90); else c.rect(760, 120, 420, 180);
      c.fill();
      c.fillStyle = 'rgba(160,214,196,.75)';
      c.beginPath();
      if (c.roundRect) c.roundRect(880, 330, 300, 140, 70); else c.rect(880, 330, 300, 140);
      c.fill();
    } else if (d === 'cartesian') {
      c.save(); c.strokeStyle = 'rgba(36,33,28,.10)'; c.lineWidth = 1;
      for (var x = 96; x < W - 96; x += 96) { c.beginPath(); c.moveTo(x, 200); c.lineTo(x, H - 120); c.stroke(); }
      for (var y = 200; y < H - 120; y += 96) { c.beginPath(); c.moveTo(96, y); c.lineTo(W - 96, y); c.stroke(); }
      c.restore();
    } else if (d === 'grid') {
      c.save(); c.strokeStyle = 'rgba(23,63,160,.22)'; c.lineWidth = 1.2;
      for (var i = 0; i < W; i += 54) { c.beginPath(); c.moveTo(i, 0); c.lineTo(i, H); c.stroke(); }
      for (var j = 0; j < H; j += 54) { c.beginPath(); c.moveTo(0, j); c.lineTo(W, j); c.stroke(); }
      c.restore();
    } else if (d === 'coral') {
      c.fillStyle = 'rgba(242,109,91,.18)'; c.beginPath(); c.arc(1040, 520, 210, 0, T); c.fill();
      c.fillStyle = s.accent; c.beginPath(); c.arc(1040, 520, 62, 0, T); c.fill();
    } else if (d === 'candy') {
      c.fillStyle = 'rgba(255,93,162,.85)'; c.fillRect(760, 120, 200, 200);
      c.fillStyle = 'rgba(255,210,63,.9)'; c.beginPath(); c.arc(1060, 220, 100, 0, T); c.fill();
      c.fillStyle = 'rgba(63,198,255,.85)'; c.fillRect(760, 350, 420, 110);
    } else if (d === 'daisy') {
      var r = rng(111);
      for (var k = 0; k < 9; k++) {
        var cx = 760 + r() * 420, cy = 120 + r() * 380, rr = 14 + r() * 22;
        c.fillStyle = 'rgba(242,160,61,.55)';
        for (var p = 0; p < 8; p++) {
          var a = p / 8 * T;
          c.beginPath(); c.ellipse(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, rr * 0.55, rr * 0.3, a, 0, T); c.fill();
        }
        c.fillStyle = '#FFF6DC'; c.beginPath(); c.arc(cx, cy, rr * 0.42, 0, T); c.fill();
      }
    } else if (d === 'forest') {
      c.fillStyle = 'rgba(30,58,44,.10)'; c.fillRect(760, 0, 240, H);
      c.fillStyle = 'rgba(199,126,142,.35)'; c.beginPath(); c.arc(1090, 480, 150, 0, T); c.fill();
    }
    var y0 = 400;
    s.title.forEach(function (line, i) {
      c.save();
      c.font = (s.italic && s.italic[i] ? 'italic ' : '') + s.weight + ' ' + s.size + 'px ' + s.font;
      c.fillStyle = i === 1 ? s.ink : s.ink;
      c.textBaseline = 'alphabetic';
      c.fillText(line, 96, y0 + i * (s.size * 1.02));
      c.restore();
    });
    // 细线
    c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(96, 120, W - 192, 1);
    txt(c, s.cap, 96, 100, 14, s.accent, MONO);
    txt(c, s.foot, 96, H - 70, 14, 'rgba(0,0,0,.4)', MONO);
    // 标题下的短说明
    txt(c, s.cap, 96, H - 110, 16, 'rgba(0,0,0,.45)', '400 "Microsoft YaHei", sans-serif');
  }

  Object.keys(HSPEC).forEach(function (id) {
    C[id] = function (c, W, H) { drawH(c, W, H, HSPEC[id]); };
  });

  // ================= Z 系列 =================
  function inkWash(c, x, y, r, alpha, seed) {
    var r1 = rng(seed);
    for (var i = 0; i < 9; i++) {
      c.fillStyle = 'rgba(28,28,30,' + (alpha * (0.06 + r1() * 0.1)) + ')';
      c.beginPath();
      c.ellipse(x + (r1() - 0.5) * r, y + (r1() - 0.5) * r * 0.6, r * (0.6 + r1() * 0.5), r * (0.3 + r1() * 0.3), r1() * T, 0, T);
      c.fill();
    }
  }
  function seal(c, x, y, s, text) {
    c.save();
    c.fillStyle = '#B23A2E';
    c.beginPath();
    if (c.roundRect) c.roundRect(x, y, s, s, 4); else c.rect(x, y, s, s);
    c.fill();
    c.fillStyle = '#F6EFE2';
    txt(c, text, x + s / 2, y + s * 0.66, s * 0.42, '#F6EFE2', '700 "Songti SC", "SimSun", serif', 'center');
    c.restore();
  }

  // Z1 水墨
  C.Z1 = function (c, W, H) {
    c.fillStyle = '#F7F3E9'; c.fillRect(0, 0, W, H);
    KIT.paper(c, W, H, '#F7F3E9', 11, { fibers: 4000, len: 18 });
    inkWash(c, 420, 470, 260, 0.9, 12);
    inkWash(c, 760, 300, 200, 0.7, 13);
    // 竹
    c.save();
    [[900, 4], [1010, 8], [1120, 2]].forEach(function (b, i) {
      var bx = b[0], lw = i === 1 ? 11 : 7;
      c.strokeStyle = 'rgba(24,24,26,.85)'; c.lineWidth = lw; c.lineCap = 'round';
      c.beginPath(); c.moveTo(bx, 110); c.quadraticCurveTo(bx - 14, 400, bx - 6, 700); c.stroke();
      // 竹节
      c.lineWidth = 2.6; c.strokeStyle = 'rgba(24,24,26,.7)';
      for (var k = 0; k < 7; k++) {
        var yy = 150 + k * 82, xx = bx - (k * 82 / 590) * 12;
        c.beginPath(); c.moveTo(xx - lw * 1.1, yy); c.lineTo(xx + lw * 1.1, yy); c.stroke();
      }
      // 竹叶：一簇一簇的柳叶形
      c.fillStyle = 'rgba(24,24,26,.8)';
      for (var m = 0; m < 5; m++) {
        var yy2 = 176 + m * 92, dir = m % 2 ? 1 : -1;
        for (var n = 0; n < 3; n++) {
          c.save();
          c.translate(bx + dir * (26 + n * 30), yy2 - n * 16);
          c.rotate(dir * (0.42 + n * 0.16));
          c.beginPath(); c.ellipse(0, 0, 40 - n * 6, 7, 0, 0, T); c.fill();
          c.restore();
        }
      }
    });
    c.restore();
    txt(c, '墨', 96, 210, 110, 'rgba(24,24,26,.88)', '400 "Songti SC", "SimSun", serif');
    txt(c, '在纸上散开，剩下的交给留白。', 98, 258, 20, 'rgba(24,24,26,.5)', '400 "Microsoft YaHei", sans-serif');
    seal(c, 1010, 620, 64, '水墨');
    tag(c, 'INK WASH / 01', 96, 690, 'rgba(24,24,26,.4)', 14);
  };

  // Z2 工笔
  C.Z2 = function (c, W, H) {
    c.fillStyle = '#F6EFE0'; c.fillRect(0, 0, W, H);
    KIT.grain(c, W, H, 21, 0.025);
    // 牡丹
    function petal(x, y, r, rot, col) {
      c.save(); c.translate(x, y); c.rotate(rot);
      c.fillStyle = col;
      c.beginPath(); c.ellipse(0, -r * 0.6, r * 0.5, r * 0.9, 0, 0, T); c.fill();
      c.strokeStyle = 'rgba(120,30,40,.45)'; c.lineWidth = 1.2; c.stroke();
      c.restore();
    }
    var cx = 520, cy = 380;
    for (var ring = 0; ring < 3; ring++) {
      var n = 8 - ring * 2, rr = 150 - ring * 34;
      for (var i = 0; i < n; i++) {
        petal(cx + Math.cos(i / n * T) * rr * 0.55, cy + Math.sin(i / n * T) * rr * 0.4, rr * 0.62, i / n * T, ring === 0 ? '#F3B7C4' : ring === 1 ? '#EE8FA6' : '#E46C8B');
      }
    }
    c.fillStyle = '#F2D46B'; c.beginPath(); c.arc(cx, cy, 34, 0, T); c.fill();
    // 枝
    c.strokeStyle = '#5C6B3A'; c.lineWidth = 6; c.lineCap = 'round';
    c.beginPath(); c.moveTo(cx, cy + 40); c.quadraticCurveTo(cx + 30, cy + 160, cx - 10, cy + 250); c.stroke();
    // 叶
    [[600, 520], [460, 560], [540, 620]].forEach(function (p, i) {
      c.save(); c.translate(p[0], p[1]); c.rotate(i * 0.8 - 0.4);
      c.fillStyle = '#7E9A4E'; c.beginPath(); c.ellipse(0, 0, 54, 20, 0, 0, T); c.fill();
      c.strokeStyle = 'rgba(60,80,30,.6)'; c.lineWidth = 1.2; c.stroke();
      c.restore();
    });
    txt(c, '工笔', 96, 190, 84, '#2B2B2B', '400 "Songti SC", "SimSun", serif');
    txt(c, '一笔一笔，把细节画满。', 98, 236, 20, 'rgba(43,43,43,.5)', '400 "Microsoft YaHei", sans-serif');
    seal(c, 1010, 620, 64, '工笔');
    tag(c, 'GONGBI / 02', 96, 690, 'rgba(43,43,43,.4)', 14);
  };

  // Z3 写意
  C.Z3 = function (c, W, H) {
    c.fillStyle = '#F5F0E4'; c.fillRect(0, 0, W, H);
    KIT.paper(c, W, H, '#F5F0E4', 31, { fibers: 5000, len: 22 });
    // 大笔触
    c.save();
    [[180, 470, 420, 300, 90], [520, 300, 780, 420, 70], [700, 500, 980, 380, 50]].forEach(function (b) {
      c.strokeStyle = 'rgba(30,30,32,.72)'; c.lineWidth = b[4]; c.lineCap = 'round';
      c.beginPath(); c.moveTo(b[0], b[1]); c.quadraticCurveTo((b[0] + b[2]) / 2, b[1] - 120, b[2], b[3]); c.stroke();
    });
    c.restore();
    // 飞白
    var r = rng(33);
    for (var i = 0; i < 200; i++) {
      c.fillStyle = 'rgba(245,240,228,' + (0.25 + r() * 0.5) + ')';
      c.fillRect(300 + r() * 700, 260 + r() * 260, 2 + r() * 9, 1.5);
    }
    // 墨点
    for (var k = 0; k < 40; k++) {
      c.fillStyle = 'rgba(30,30,32,' + (0.1 + r() * 0.35) + ')';
      c.beginPath(); c.arc(240 + r() * 820, 220 + r() * 330, 1 + r() * 5, 0, T); c.fill();
    }
    txt(c, '写意', 96, 200, 96, 'rgba(30,30,32,.9)', '400 "Songti SC", "SimSun", serif');
    txt(c, '意到，笔不到。', 98, 250, 22, 'rgba(30,30,32,.5)', '400 "Microsoft YaHei", sans-serif');
    seal(c, 1010, 620, 64, '写意');
    tag(c, 'XIEYI / 03', 96, 690, 'rgba(30,30,32,.4)', 14);
  };

  // Z4 山水
  C.Z4 = function (c, W, H) {
    var g = c.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#EDE8DA'); g.addColorStop(1, '#DCE3E0');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    // 远山
    [[0.20, '#B9C2C4', 0.55], [0.38, '#8E9EA2', 0.75], [0.58, '#5E7278', 0.9]].forEach(function (m) {
      c.fillStyle = m[1]; c.globalAlpha = m[2];
      c.beginPath(); c.moveTo(0, H);
      for (var x = 0; x <= W; x += 18) c.lineTo(x, 420 - 190 * Math.abs(Math.sin(x / 340 + m[0] * 6)) - 40 * Math.sin(x / 90));
      c.lineTo(W, H); c.closePath(); c.fill(); c.globalAlpha = 1;
    });
    // 水
    c.fillStyle = 'rgba(240,244,242,.75)'; c.fillRect(0, 560, W, 160);
    c.strokeStyle = 'rgba(94,114,120,.28)'; c.lineWidth = 1.4;
    for (var i = 0; i < 8; i++) { c.beginPath(); c.moveTo(60 + i * 30, 590 + i * 14); c.lineTo(W - 120 + i * 8, 590 + i * 14); c.stroke(); }
    // 古亭
    c.save(); c.translate(880, 470);
    c.fillStyle = '#2E3A3C';
    c.beginPath(); c.moveTo(-90, 0); c.lineTo(0, -56); c.lineTo(90, 0); c.closePath(); c.fill();
    c.fillRect(-54, 0, 108, 10);
    [-40, 0, 40].forEach(function (x) { c.fillRect(x - 4, 10, 8, 66); });
    c.restore();
    // 雾
    c.fillStyle = 'rgba(255,255,255,.42)'; c.fillRect(0, 430, W, 70);
    txt(c, '山水', 96, 200, 92, '#2E3A3C', '400 "Songti SC", "SimSun", serif');
    txt(c, '山高，水长，亭子等一个人。', 98, 248, 20, 'rgba(46,58,60,.55)', '400 "Microsoft YaHei", sans-serif');
    seal(c, 1010, 620, 64, '山水');
    tag(c, 'SHAN SHUI / 04', 96, 690, 'rgba(46,58,60,.4)', 14);
  };

  // Z6 年画
  C.Z6 = function (c, W, H) {
    c.fillStyle = '#C8322A'; c.fillRect(0, 0, W, H);
    KIT.grain(c, W, H, 61, 0.05);
    // 灯笼
    function lantern(x, y, s) {
      c.save(); c.translate(x, y); c.scale(s, s);
      c.fillStyle = '#E23B2E'; c.beginPath(); c.ellipse(0, 0, 70, 88, 0, 0, T); c.fill();
      c.strokeStyle = '#F2B705'; c.lineWidth = 4;
      c.beginPath(); c.ellipse(0, 0, 70, 88, 0, 0, T); c.stroke();
      for (var i = -2; i <= 2; i++) { c.beginPath(); c.ellipse(0, 0, 70 - Math.abs(i) * 12, 88, 0, 0, T); c.stroke(); }
      c.fillStyle = '#F2B705'; c.fillRect(-34, -96, 68, 12); c.fillRect(-34, 84, 68, 12);
      c.fillStyle = '#F2B705'; c.fillRect(-3, 96, 6, 34);
      c.restore();
    }
    lantern(300, 220, 1.1); lantern(980, 200, 0.9);
    // 对联
    c.fillStyle = '#E23B2E'; c.fillRect(80, 120, 74, 460); c.fillRect(1126, 120, 74, 460);
    c.strokeStyle = '#F2B705'; c.lineWidth = 3; c.strokeRect(80, 120, 74, 460); c.strokeRect(1126, 120, 74, 460);
    ['新', '年', '快', '乐'].forEach(function (ch, i) {
      txt(c, ch, 117, 180 + i * 102, 44, '#2B1B12', '700 "Songti SC", "SimSun", serif', 'center');
    });
    ['万', '事', '如', '意'].forEach(function (ch, i) {
      txt(c, ch, 1163, 180 + i * 102, 44, '#2B1B12', '700 "Songti SC", "SimSun", serif', 'center');
    });
    // 中间福字
    c.fillStyle = '#F2B705'; c.beginPath(); c.arc(640, 330, 130, 0, T); c.fill();
    txt(c, '福', 640, 392, 150, '#C8322A', '700 "Songti SC", "SimSun", serif', 'center');
    // 元宝
    c.fillStyle = '#F2B705';
    [[420, 560], [860, 560]].forEach(function (p) {
      c.beginPath(); c.ellipse(p[0], p[1], 70, 34, 0, 0, T); c.fill();
      c.fillStyle = '#E0A100'; c.beginPath(); c.ellipse(p[0], p[1] - 12, 40, 18, 0, 0, T); c.fill();
      c.fillStyle = '#F2B705';
    });
    txt(c, '年画', 96, 660, 40, '#F2B705', '700 "Songti SC", "SimSun", serif');
    tag(c, 'NEW YEAR PRINT / 06', 96, 700, 'rgba(242,183,5,.6)', 13);
  };

  // Z7 皮影
  C.Z7 = function (c, W, H) {
    c.fillStyle = '#120C0A'; c.fillRect(0, 0, W, H);
    // 灯屏
    var g = c.createRadialGradient(W / 2, H / 2, 40, W / 2, H / 2, 620);
    g.addColorStop(0, 'rgba(255,214,140,.30)'); g.addColorStop(1, 'rgba(255,214,140,0)');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    c.fillStyle = 'rgba(255,232,180,.10)'; c.fillRect(120, 60, W - 240, H - 120);
    c.strokeStyle = 'rgba(255,214,140,.35)'; c.lineWidth = 2; c.strokeRect(120, 60, W - 240, H - 120);
    // 皮影人：侧面剪影，举扇，关节可见
    c.save(); c.translate(600, 380);
    c.fillStyle = 'rgba(214,62,48,.88)';
    c.strokeStyle = 'rgba(255,214,140,.9)'; c.lineWidth = 2.6; c.lineJoin = 'round';
    // 头（侧脸：额、鼻、下巴）
    c.beginPath();
    c.moveTo(-34, -232);
    c.bezierCurveTo(30, -238, 46, -196, 40, -168);
    c.lineTo(58, -156); c.lineTo(38, -146);
    c.bezierCurveTo(34, -120, 4, -112, -18, -128);
    c.bezierCurveTo(-44, -148, -54, -206, -34, -232);
    c.fill(); c.stroke();
    // 冠
    c.beginPath(); c.moveTo(-40, -230); c.lineTo(-6, -320); c.lineTo(34, -236); c.closePath(); c.fill(); c.stroke();
    // 身（侧身长袍）
    c.beginPath();
    c.moveTo(-26, -120); c.bezierCurveTo(34, -126, 52, -60, 56, 6);
    c.lineTo(96, 128); c.lineTo(-52, 128); c.lineTo(-40, 6);
    c.bezierCurveTo(-46, -58, -56, -96, -26, -120);
    c.fill(); c.stroke();
    // 举扇的手臂
    c.beginPath(); c.moveTo(20, -96); c.lineTo(-40, -30); c.lineTo(-96, -78); c.stroke();
    c.beginPath(); c.moveTo(-96, -78); c.lineTo(-150, -150); c.stroke();
    c.save(); c.translate(-150, -150); c.rotate(-0.7);
    c.beginPath(); c.ellipse(0, -34, 30, 44, 0, 0, T); c.fill(); c.stroke();
    c.restore();
    // 另一只手
    c.beginPath(); c.moveTo(34, -70); c.lineTo(96, -6); c.stroke();
    // 腿
    c.beginPath(); c.moveTo(-10, 128); c.lineTo(-44, 236); c.stroke();
    c.beginPath(); c.moveTo(52, 128); c.lineTo(96, 226); c.stroke();
    // 关节
    [[20, -96], [-40, -30], [-96, -78], [34, -70], [-10, 128], [52, 128]].forEach(function (p) {
      c.beginPath(); c.arc(p[0], p[1], 7, 0, T); c.fillStyle = 'rgba(255,214,140,.95)'; c.fill();
    });
    // 袍上的镂空纹
    c.strokeStyle = 'rgba(18,12,10,.45)'; c.lineWidth = 2;
    for (var i = 0; i < 3; i++) {
      c.beginPath(); c.arc(8, -60 + i * 46, 14, 0, T); c.stroke();
    }
    c.restore();
    // 操纵杆
    c.strokeStyle = 'rgba(255,214,140,.5)'; c.lineWidth = 3;
    c.beginPath(); c.moveTo(470, 150); c.lineTo(600, 290); c.moveTo(830, 150); c.lineTo(700, 290); c.stroke();
    txt(c, '皮影', 96, 140, 46, 'rgba(255,224,170,.9)', '400 "Songti SC", "SimSun", serif');
    txt(c, '光在幕后，戏在光里。', 96, 186, 20, 'rgba(255,224,170,.5)', '400 "Microsoft YaHei", sans-serif');
    tag(c, 'SHADOW PUPPET / 07', 96, 690, 'rgba(255,224,170,.4)', 14);
  };

  // Z8 敦煌
  C.Z8 = function (c, W, H) {
    c.fillStyle = '#8C5A2B'; c.fillRect(0, 0, W, H);
    KIT.grain(c, W, H, 81, 0.09);
    // 壁画底色
    var g = c.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#C98B4B'); g.addColorStop(0.5, '#A86B33'); g.addColorStop(1, '#7A4A24');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    // 飞天：侧身飞行，飘带向后
    c.save(); c.translate(660, 330);
    // 飘带
    c.strokeStyle = 'rgba(217,164,65,.9)'; c.lineWidth = 7; c.lineCap = 'round';
    c.beginPath(); c.moveTo(-20, 10); c.bezierCurveTo(-160, 70, -300, -10, -430, 60); c.stroke();
    c.strokeStyle = 'rgba(201,75,58,.85)'; c.lineWidth = 5;
    c.beginPath(); c.moveTo(-10, 40); c.bezierCurveTo(-150, 120, -280, 40, -400, 120); c.stroke();
    c.strokeStyle = 'rgba(46,110,106,.9)'; c.lineWidth = 4;
    c.beginPath(); c.moveTo(0, -20); c.bezierCurveTo(-140, 10, -250, -90, -360, -30); c.stroke();
    // 头光
    c.fillStyle = 'rgba(217,164,65,.28)'; c.beginPath(); c.arc(46, -108, 62, 0, T); c.fill();
    c.strokeStyle = 'rgba(217,164,65,.85)'; c.lineWidth = 3; c.stroke();
    // 身体（侧身）
    c.fillStyle = '#2E6E6A';
    c.beginPath();
    c.moveTo(30, -76);
    c.bezierCurveTo(56, -40, 40, 10, 10, 44);
    c.bezierCurveTo(-4, 62, -2, 86, 14, 96);
    c.lineTo(-34, 108);
    c.bezierCurveTo(-44, 74, -30, 40, -18, 8);
    c.bezierCurveTo(-8, -24, -6, -60, 30, -76);
    c.fill();
    // 手臂
    c.strokeStyle = '#D9A441'; c.lineWidth = 11; c.lineCap = 'round';
    c.beginPath(); c.moveTo(30, -56); c.quadraticCurveTo(96, -70, 132, -104); c.stroke();
    c.beginPath(); c.moveTo(22, -44); c.quadraticCurveTo(-30, -16, -72, -34); c.stroke();
    // 手：托莲
    c.fillStyle = '#C94B3A'; c.beginPath(); c.arc(140, -112, 13, 0, T); c.fill();
    c.fillStyle = '#F2C9A0'; c.beginPath(); c.arc(134, -106, 8, 0, T); c.fill();
    // 腿（向后弯）
    c.strokeStyle = '#D9A441'; c.lineWidth = 13;
    c.beginPath(); c.moveTo(-14, 96); c.quadraticCurveTo(-66, 84, -96, 44); c.stroke();
    c.beginPath(); c.moveTo(-14, 96); c.quadraticCurveTo(-52, 122, -104, 112); c.stroke();
    // 头
    c.fillStyle = '#F2C9A0'; c.beginPath(); c.arc(46, -108, 30, 0, T); c.fill();
    c.fillStyle = '#2B1B12'; c.beginPath(); c.arc(46, -140, 13, 0, T); c.fill();
    c.fillStyle = '#2B1B12'; c.beginPath(); c.arc(38, -110, 3.4, 0, T); c.fill();
    c.strokeStyle = '#B23A2E'; c.lineWidth = 2.4;
    c.beginPath(); c.arc(40, -100, 7, 0.2, Math.PI - 0.2); c.stroke();
    c.restore();
    // 矿物色块
    [[180, 200, 60, '#C94B3A'], [1060, 240, 44, '#2E6E6A'], [980, 560, 56, '#D9A441'], [220, 560, 40, '#2E6E6A']].forEach(function (p) {
      c.fillStyle = p[3]; c.beginPath(); c.arc(p[0], p[1], p[2], 0, T); c.fill();
    });
    txt(c, '敦煌', 96, 150, 62, 'rgba(255,236,200,.92)', '400 "Songti SC", "SimSun", serif');
    txt(c, '矿物颜料，一千年不褪。', 98, 196, 20, 'rgba(255,236,200,.55)', '400 "Microsoft YaHei", sans-serif');
    tag(c, 'DUNHUANG / 08', 96, 690, 'rgba(255,236,200,.45)', 14);
  };

  // Z9 青花
  C.Z9 = function (c, W, H) {
    c.fillStyle = '#F4F1E8'; c.fillRect(0, 0, W, H);
    // 瓷盘
    c.save(); c.translate(640, 380);
    c.fillStyle = '#FBFAF5'; c.beginPath(); c.arc(0, 0, 290, 0, T); c.fill();
    c.strokeStyle = '#1B4F9C'; c.lineWidth = 6; c.beginPath(); c.arc(0, 0, 288, 0, T); c.stroke();
    c.lineWidth = 2; c.beginPath(); c.arc(0, 0, 250, 0, T); c.stroke();
    // 缠枝
    c.strokeStyle = '#1B4F9C'; c.lineWidth = 3;
    for (var i = 0; i < 8; i++) {
      var a = i / 8 * T;
      c.save(); c.rotate(a);
      c.beginPath(); c.moveTo(0, -245); c.quadraticCurveTo(40, -190, 0, -140); c.stroke();
      c.fillStyle = '#2C6BC4';
      c.beginPath(); c.ellipse(0, -150, 18, 34, 0, 0, T); c.fill();
      c.beginPath(); c.arc(0, -118, 9, 0, T); c.fill();
      c.restore();
    }
    // 中心
    c.fillStyle = '#1B4F9C'; c.beginPath(); c.arc(0, 0, 74, 0, T); c.fill();
    c.fillStyle = '#FBFAF5'; c.beginPath(); c.arc(0, 0, 40, 0, T); c.fill();
    c.strokeStyle = '#1B4F9C'; c.lineWidth = 2.5;
    for (var k = 0; k < 6; k++) { c.beginPath(); c.arc(0, 0, 54, k / 6 * T, k / 6 * T + 0.6); c.stroke(); }
    c.restore();
    txt(c, '青花', 96, 180, 66, '#1B4F9C', '400 "Songti SC", "SimSun", serif');
    txt(c, '白底蓝花，一朵一朵画上去。', 98, 228, 20, 'rgba(27,79,156,.55)', '400 "Microsoft YaHei", sans-serif');
    seal(c, 1010, 620, 64, '青花');
    tag(c, 'BLUE & WHITE / 09', 96, 690, 'rgba(27,79,156,.4)', 14);
  };

  // Z10 木版画
  C.Z10 = function (c, W, H) {
    c.fillStyle = '#F2E6CE'; c.fillRect(0, 0, W, H);
    KIT.paper(c, W, H, '#F2E6CE', 101, { fibers: 6000, len: 20 });
    // 套色错位
    c.save(); c.globalAlpha = 0.85;
    c.fillStyle = '#C8452F'; c.fillRect(360, 240, 300, 300);
    c.fillStyle = '#1F4E79'; c.fillRect(376, 226, 300, 300);
    c.fillStyle = '#E0A21B'; c.fillRect(390, 260, 250, 250);
    c.restore();
    // 木刻线条
    c.save(); c.strokeStyle = '#211B16'; c.lineWidth = 3;
    for (var i = 0; i < 26; i++) {
      var x = 300 + i * 22;
      c.beginPath(); c.moveTo(x, 220 + (i % 3) * 4); c.lineTo(x + 4, 600); c.stroke();
    }
    c.restore();
    // 主体：一棵树
    c.fillStyle = '#211B16';
    c.fillRect(626, 380, 26, 200);
    for (var k = 0; k < 5; k++) {
      c.beginPath(); c.arc(640, 330 - k * 26, 90 - k * 12, 0, T); c.fillStyle = k % 2 ? '#2E5E3A' : '#3E7A4A'; c.fill();
    }
    txt(c, '木版', 96, 180, 64, '#211B16', '400 "Songti SC", "SimSun", serif');
    txt(c, '刻一刀，印一版，颜色会自己错开。', 98, 228, 20, 'rgba(33,27,22,.55)', '400 "Microsoft YaHei", sans-serif');
    tag(c, 'WOODBLOCK / 10', 96, 690, 'rgba(33,27,22,.4)', 14);
  };

  // Z11 京剧脸谱
  C.Z11 = function (c, W, H) {
    c.fillStyle = '#F4EBDD'; c.fillRect(0, 0, W, H);
    c.save(); c.translate(640, 380);
    // 脸型
    c.fillStyle = '#F7F2E6';
    c.beginPath(); c.ellipse(0, 0, 210, 270, 0, 0, T); c.fill();
    c.strokeStyle = '#171717'; c.lineWidth = 6; c.stroke();
    // 对称纹样
    function mirror(fn) { fn(1); fn(-1); }
    mirror(function (s) {
      c.save(); c.scale(s, 1);
      // 额头
      c.fillStyle = '#C8261D';
      c.beginPath(); c.moveTo(0, -250); c.bezierCurveTo(90, -220, 110, -120, 60, -70);
      c.lineTo(0, -110); c.closePath(); c.fill();
      // 眼窝
      c.fillStyle = '#171717';
      c.beginPath(); c.ellipse(86, -30, 62, 40, -0.25, 0, T); c.fill();
      c.fillStyle = '#F7F2E6'; c.beginPath(); c.ellipse(86, -30, 40, 24, -0.25, 0, T); c.fill();
      c.fillStyle = '#171717'; c.beginPath(); c.arc(86, -30, 15, 0, T); c.fill();
      // 脸颊
      c.fillStyle = '#2B5FA8';
      c.beginPath(); c.moveTo(40, 40); c.quadraticCurveTo(160, 30, 150, 130); c.quadraticCurveTo(90, 110, 40, 90); c.closePath(); c.fill();
      // 嘴
      c.fillStyle = '#C8261D';
      c.beginPath(); c.ellipse(60, 170, 44, 22, 0.2, 0, T); c.fill();
      c.restore();
    });
    c.restore();
    txt(c, '脸谱', 96, 170, 60, '#171717', '400 "Songti SC", "SimSun", serif');
    txt(c, '红忠、黑直、蓝勇——颜色就是台词。', 98, 216, 19, 'rgba(23,23,23,.55)', '400 "Microsoft YaHei", sans-serif');
    tag(c, 'OPERA MASK / 11', 96, 690, 'rgba(23,23,23,.4)', 14);
  };

  // Z12 书法
  C.Z12 = function (c, W, H) {
    c.fillStyle = '#F7F2E6'; c.fillRect(0, 0, W, H);
    KIT.paper(c, W, H, '#F7F2E6', 121, { fibers: 5000, len: 22 });
    // 米字格
    c.save(); c.strokeStyle = 'rgba(178,58,46,.22)'; c.lineWidth = 2;
    c.strokeRect(300, 130, 520, 520);
    c.setLineDash([10, 10]);
    c.beginPath(); c.moveTo(560, 130); c.lineTo(560, 650); c.moveTo(300, 390); c.lineTo(820, 390); c.stroke();
    c.setLineDash([]);
    c.beginPath(); c.moveTo(300, 130); c.lineTo(820, 650); c.moveTo(820, 130); c.lineTo(300, 650); c.stroke();
    c.restore();
    // 大字
    c.save();
    c.font = '700 380px "KaiTi", "STKaiti", "Songti SC", serif';
    c.fillStyle = '#171717'; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText('永', 560, 396);
    c.restore();
    // 落款
    txt(c, '永字八法', 870, 250, 28, 'rgba(23,23,23,.75)', '400 "Songti SC", "SimSun", serif');
    txt(c, '一点一横，都有来处。', 872, 290, 18, 'rgba(23,23,23,.45)', '400 "Microsoft YaHei", sans-serif');
    seal(c, 872, 330, 52, '书');
    tag(c, 'CALLIGRAPHY / 12', 96, 690, 'rgba(23,23,23,.4)', 14);
  };

  // Z13 水墨漫画
  C.Z13 = function (c, W, H) {
    c.fillStyle = '#F8F4E9'; c.fillRect(0, 0, W, H);
    KIT.paper(c, W, H, '#F8F4E9', 131, { fibers: 4000, len: 16 });
    inkWash(c, 760, 420, 220, 0.55, 132);
    // 漫画人物：圆头 + 几笔
    c.save(); c.translate(560, 400);
    c.strokeStyle = '#1A1A1C'; c.lineWidth = 7; c.lineCap = 'round'; c.lineJoin = 'round';
    c.beginPath(); c.arc(0, -120, 92, 0, T); c.stroke();
    c.fillStyle = 'rgba(26,26,28,.06)'; c.fill();
    // 眼睛（豆豆）
    c.fillStyle = '#1A1A1C';
    c.beginPath(); c.arc(-32, -136, 8, 0, T); c.fill();
    c.beginPath(); c.arc(34, -136, 8, 0, T); c.fill();
    // 嘴
    c.beginPath(); c.arc(0, -104, 26, 0.3, Math.PI - 0.3); c.stroke();
    // 身体
    c.beginPath(); c.moveTo(0, -28); c.lineTo(0, 120); c.stroke();
    c.beginPath(); c.moveTo(0, 10); c.lineTo(-90, 80); c.moveTo(0, 10); c.lineTo(90, 70); c.stroke();
    c.beginPath(); c.moveTo(0, 120); c.lineTo(-64, 220); c.moveTo(0, 120); c.lineTo(64, 220); c.stroke();
    c.restore();
    // 对话框
    c.fillStyle = '#FFFDF7'; c.strokeStyle = '#1A1A1C'; c.lineWidth = 5;
    c.beginPath();
    if (c.roundRect) c.roundRect(760, 170, 380, 130, 12); else c.rect(760, 170, 380, 130);
    c.fill(); c.stroke();
    txt(c, '这一笔，我想了很久。', 790, 246, 28, '#1A1A1C', '400 "KaiTi", "Microsoft YaHei", sans-serif');
    txt(c, '水墨漫画', 96, 170, 48, '#1A1A1C', '400 "Songti SC", "SimSun", serif');
    seal(c, 1010, 620, 64, '水墨');
    tag(c, 'INK COMIC / 13', 96, 680, 'rgba(26,26,28,.4)', 14);
  };

  // Z14 彩铅手绘
  C.Z14 = function (c, W, H) {
    KIT.paper(c, W, H, '#F3EADB', 141, { fibers: 9000, len: 30 });
    // 排线
    function hatch(x, y, w, h, col, seed, ang) {
      var r = rng(seed);
      c.save(); c.strokeStyle = col; c.lineWidth = 2; c.globalAlpha = 0.55;
      for (var i = 0; i < w / 5; i++) {
        var px = x + i * 5 + r() * 3;
        c.beginPath(); c.moveTo(px, y); c.lineTo(px + Math.sin(ang) * h, y + h); c.stroke();
      }
      c.restore();
    }
    // 苹果
    c.save();
    hatch(360, 300, 240, 200, '#C2543F', 142, 0.3);
    hatch(420, 290, 180, 210, '#B23A2E', 143, -0.4);
    c.fillStyle = 'rgba(178,58,46,.35)';
    c.beginPath(); c.ellipse(520, 430, 150, 130, 0, 0, T); c.fill();
    c.strokeStyle = '#5A4A2E'; c.lineWidth = 8; c.lineCap = 'round';
    c.beginPath(); c.moveTo(520, 300); c.quadraticCurveTo(516, 250, 540, 220); c.stroke();
    c.fillStyle = 'rgba(110,140,70,.6)';
    c.beginPath(); c.ellipse(566, 232, 46, 22, -0.5, 0, T); c.fill();
    c.restore();
    // 背景排线
    hatch(760, 180, 380, 400, '#7E9A4E', 144, 0.2);
    txt(c, '彩铅', 96, 180, 64, '#5A4A2E', '400 "Songti SC", "SimSun", serif');
    txt(c, '一笔一笔排出来，纸的纹路还在。', 98, 228, 20, 'rgba(90,74,46,.55)', '400 "Microsoft YaHei", sans-serif');
    tag(c, 'COLORED PENCIL / 14', 96, 690, 'rgba(90,74,46,.4)', 14);
  };

  // Z15 水彩科普卡
  C.Z15 = function (c, W, H) {
    c.fillStyle = '#FBF7EF'; c.fillRect(0, 0, W, H);
    // 水彩晕
    function wash(x, y, r, col, seed) {
      var rr = rng(seed);
      for (var i = 0; i < 12; i++) {
        c.fillStyle = col.replace('ALPHA', (0.05 + rr() * 0.08).toFixed(2));
        c.beginPath();
        c.ellipse(x + (rr() - 0.5) * r * 0.7, y + (rr() - 0.5) * r * 0.5, r * (0.5 + rr() * 0.5), r * (0.35 + rr() * 0.4), rr() * T, 0, T);
        c.fill();
      }
    }
    wash(300, 300, 190, 'rgba(120,170,220,ALPHA)', 151);
    wash(900, 430, 210, 'rgba(240,170,120,ALPHA)', 152);
    wash(700, 180, 130, 'rgba(150,200,150,ALPHA)', 153);
    // 友好的房子
    c.save(); c.translate(560, 420);
    c.fillStyle = 'rgba(240,170,120,.75)'; c.fillRect(-120, -60, 240, 170);
    c.fillStyle = 'rgba(200,90,70,.8)';
    c.beginPath(); c.moveTo(-150, -60); c.lineTo(0, -170); c.lineTo(150, -60); c.closePath(); c.fill();
    c.fillStyle = 'rgba(255,250,240,.9)'; c.fillRect(-40, 10, 80, 100);
    c.fillStyle = 'rgba(120,170,220,.75)'; c.fillRect(-96, -20, 44, 44);
    c.restore();
    // 卡片框
    c.strokeStyle = 'rgba(90,74,46,.25)'; c.lineWidth = 2;
    c.strokeRect(60, 60, W - 120, H - 120);
    txt(c, '水彩科普卡', 96, 150, 52, 'rgba(70,60,45,.9)', '400 "Songti SC", "SimSun", serif');
    txt(c, '先晕开，再说清楚。', 98, 196, 20, 'rgba(70,60,45,.5)', '400 "Microsoft YaHei", sans-serif');
    txt(c, '01  ·  为什么天是蓝的？', 96, 600, 26, 'rgba(70,60,45,.8)', '600 "Microsoft YaHei", sans-serif');
    tag(c, 'WATERCOLOR CARD / 15', 96, 690, 'rgba(70,60,45,.4)', 14);
  };
})();
