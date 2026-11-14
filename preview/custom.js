// 试点 8 张：V1 / V2 / X14 / X1 / Z5 / K22 / M1（H2 走 specs.js 的声明式配方）
window.CUSTOM = {};
(function () {
  'use strict';
  var C = window.CUSTOM, T = Math.PI * 2;

  // ============================================================ V1 逐帧手绘（三格分镜）
  C.V1 = function (c, W, H) {
    var ink = '#1C1A17', red = '#D6452F', yellow = '#F2B33D', cream = '#F2E7D3';
    var M = 28, gap = 14, head = 46;
    var pw = (W - M * 2 - gap * 2) / 3, ph = H - head - 28;
    var xs = [M, M + pw + gap, M + (pw + gap) * 2];

    c.fillStyle = '#0F0D0B'; c.fillRect(0, 0, W, H);
    c.font = '600 16px ' + MONO; c.fillStyle = 'rgba(242,231,211,.70)';
    c.textBaseline = 'middle';
    c.fillText('V1 逐帧手绘 · 线条沸腾', M, 23);
    c.textAlign = 'right';
    c.fillText('24 fps · 一拍二 · 手作 HAND MADE', W - M, 23);
    c.textAlign = 'left';

    function frame(x, seed) {
      c.save();
      c.beginPath(); c.rect(x, head, pw, ph); c.clip();
      c.translate(x, head);
      KIT.paper(c, pw, ph, cream, seed, { fibers: 2600, len: 11 });
      return function () { c.restore(); };
    }
    function beat(n, txt) {
      c.save();
      c.font = '700 14px ' + MONO; c.fillStyle = 'rgba(28,26,23,.55)';
      c.fillText(n + '  ' + txt, 16, 24);
      c.fillStyle = red; c.fillRect(16, 32, 26, 3);
      c.restore();
    }

    // ---- 01 擦火
    var end = frame(xs[0], 101);
    beat('01', '擦火');
    (function () {
      c.save(); c.translate(42, 0);
      var bx = 74, by = ph - 150, tx = 196, ty = ph - 336;
      KIT.boil(c, 11, function (g) {
        g.lineWidth = 13; g.strokeStyle = '#D8C3A0'; g.lineCap = 'round';
        g.beginPath(); g.moveTo(bx, by); g.lineTo(tx, ty); g.stroke();
      });
      KIT.boil(c, 12, function (g) {
        g.fillStyle = red; g.beginPath(); g.arc(tx, ty, 13, 0, T); g.fill();
      });
      var x = tx + 4, y = ty - 6;
      var grd = c.createLinearGradient(x, y - 120, x, y + 16);
      grd.addColorStop(0, yellow); grd.addColorStop(0.55, red); grd.addColorStop(1, 'rgba(214,69,47,.55)');
      c.fillStyle = grd;
      c.beginPath();
      c.moveTo(x, y - 122);
      c.bezierCurveTo(x + 42, y - 56, x + 48, y - 10, x, y + 14);
      c.bezierCurveTo(x - 48, y - 10, x - 42, y - 56, x, y - 122);
      c.fill();
      c.fillStyle = 'rgba(255,240,190,.88)';
      c.beginPath();
      c.moveTo(x, y - 72);
      c.bezierCurveTo(x + 17, y - 34, x + 19, y - 12, x, y + 2);
      c.bezierCurveTo(x - 19, y - 12, x - 17, y - 34, x, y - 72);
      c.fill();
      (function () {
        var r = rng(31), sx = 272, sy = 236;
        for (var i = 0; i < 11; i++) {
          var a = r() * T, l = 9 + r() * 30;
          c.strokeStyle = i % 3 ? yellow : red; c.lineWidth = 2.6; c.lineCap = 'round';
          c.beginPath(); c.moveTo(sx + Math.cos(a) * 6, sy + Math.sin(a) * 6);
          c.lineTo(sx + Math.cos(a) * (6 + l), sy + Math.sin(a) * (6 + l)); c.stroke();
        }
        c.strokeStyle = 'rgba(214,69,47,.34)'; c.lineWidth = 3;
        for (var k = 0; k < 3; k++) {
          var yy = sy + 12 + k * 16;
          c.beginPath(); c.moveTo(sx + 34, yy); c.lineTo(sx + 34 + 40 - k * 8, yy); c.stroke();
        }
      })();
      c.fillStyle = 'rgba(60,40,20,.10)';
      c.beginPath(); c.ellipse(150, ph - 130, 98, 12, 0, 0, T); c.fill();
      c.restore();
    })();
    end();

    // ---- 02 火灵
    end = frame(xs[1], 202);
    beat('02', '火灵');
    (function () {
      var x = pw / 2, y = ph * 0.45;
      c.save();
      c.strokeStyle = 'rgba(28,26,23,.26)'; c.lineWidth = 2; c.setLineDash([5, 8]);
      c.beginPath(); c.arc(x, y + 40, 132, -2.55, -0.65); c.stroke();
      c.beginPath(); c.arc(x, y + 40, 156, -2.35, -0.85); c.stroke();
      c.restore();
      KIT.boil(c, 21, function (g) {
        g.fillStyle = red;
        g.beginPath();
        g.moveTo(x, y - 152);
        g.bezierCurveTo(x + 62, y - 66, x + 74, y - 8, x, y + 46);
        g.bezierCurveTo(x - 74, y - 8, x - 62, y - 66, x, y - 152);
        g.fill();
      }, 2.4);
      c.fillStyle = yellow;
      c.beginPath();
      c.moveTo(x, y - 92);
      c.bezierCurveTo(x + 34, y - 34, x + 38, y + 2, x, y + 26);
      c.bezierCurveTo(x - 38, y + 2, x - 34, y - 34, x, y - 92);
      c.fill();
      c.fillStyle = ink;
      c.beginPath(); c.arc(x - 22, y - 36, 6.5, 0, T); c.fill();
      c.beginPath(); c.arc(x + 22, y - 36, 6.5, 0, T); c.fill();
      c.strokeStyle = ink; c.lineWidth = 4; c.lineCap = 'round';
      c.beginPath(); c.arc(x, y - 16, 17, 0.25, Math.PI - 0.25); c.stroke();
      for (var s = -1; s <= 1; s += 2) {
        KIT.strokePath(c, [[x + s * 52, y - 14], [x + s * 96, y + 2], [x + s * 104, y - 30]], ink, 7, 40 + s, false, 2);
        KIT.strokePath(c, [[x + s * 20, y + 42], [x + s * 34, y + 78], [x + s * 58, y + 82]], ink, 7, 50 + s, false, 2);
      }
      c.fillStyle = 'rgba(60,40,20,.12)';
      c.beginPath(); c.ellipse(x, y + 98, 94, 14, 0, 0, T); c.fill();
    })();
    end();

    // ---- 03 定格
    end = frame(xs[2], 303);
    beat('03', '定格');
    (function () {
      var r = rng(77), i;
      for (i = 0; i < 5; i++) {
        c.fillStyle = 'rgba(255,255,255,' + (0.16 + r() * 0.12) + ')';
        var px = 60 + r() * (pw - 120), py = 84 + r() * 96, pr = 20 + r() * 30;
        c.beginPath(); c.arc(px, py, pr, 0, T); c.fill();
      }
      var ty = ph * 0.52;
      KIT.handText(c, '手作', pw / 2 + 5, ty + 5, 118, 'rgba(242,179,61,.55)', 9, { align: 'center', track: 6 });
      KIT.handText(c, '手作', pw / 2, ty, 118, ink, 12, { align: 'center', track: 6, double: true });
      KIT.strokePath(c, [[pw / 2 - 128, ty + 80], [pw / 2 - 40, ty + 88], [pw / 2 + 52, ty + 81], [pw / 2 + 132, ty + 89]], red, 9, 88, false, 3);
      c.save();
      c.font = '700 18px ' + MONO; c.fillStyle = 'rgba(28,26,23,.60)'; c.textAlign = 'center';
      c.fillText('HAND MADE', pw / 2, ty + 134);
      c.textAlign = 'left';
      c.restore();
    })();
    end();

    c.strokeStyle = 'rgba(242,231,211,.14)'; c.lineWidth = 1;
    xs.forEach(function (x) { c.strokeRect(x + 0.5, head + 0.5, pw - 1, ph - 1); });
  };

  // ============================================================ V2 等距 2.5D
  C.V2 = function (c, W, H) {
    c.fillStyle = '#EFECF7'; c.fillRect(0, 0, W, H);
    var sky = c.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, 'rgba(255,255,255,.62)');
    sky.addColorStop(0.55, 'rgba(255,255,255,0)');
    c.fillStyle = sky; c.fillRect(0, 0, W, H);

    var S = 62, P = KIT.isoProjector(640, 412, S);
    var i, j, k;

    // 岛底座
    for (i = -3; i < 3; i++) {
      KIT.poly(c, [P(i, 3, 0), P(i + 1, 3, 0), P(i + 1, 3, -1.15), P(i, 3, -1.15)], '#A79FC8');
      KIT.poly(c, [P(3, i, 0), P(3, i + 1, 0), P(3, i + 1, -1.15), P(3, i, -1.15)], '#BAB2D8');
    }
    // 地面
    for (i = -3; i < 3; i++) for (j = -3; j < 3; j++) {
      KIT.poly(c, [P(i, j, 0), P(i + 1, j, 0), P(i + 1, j + 1, 0), P(i, j + 1, 0)],
        (i + j) % 2 === 0 ? '#DDD7F1' : '#D3CCEA');
    }
    // 一条路
    for (k = -3; k < 3; k++) {
      KIT.poly(c, [P(k, 0.55, 0.012), P(k + 1, 0.55, 0.012), P(k + 1, 0.92, 0.012), P(k, 0.92, 0.012)], '#F8F6FF');
    }

    function islandPath() {
      var o = [P(-3, -3, 0), P(3, -3, 0), P(3, 3, 0), P(-3, 3, 0)];
      c.beginPath();
      c.moveTo(o[0][0], o[0][1]);
      for (var n = 1; n < 4; n++) c.lineTo(o[n][0], o[n][1]);
      c.closePath();
    }
    var MINT = { top: '#CDF3E3', left: '#A8E6CF', right: '#8CD4B9' };
    var SKY = { top: '#CFEDFC', left: '#A8D8F0', right: '#8CC4E0' };
    var PEACH = { top: '#FFE3CF', left: '#FFC9A8', right: '#F2B08A' };
    var WHITE = { top: '#FFFFFF', left: '#F7F5FC', right: '#E9E4F4' };
    var BL = [
      [-2.0, -1.4, 1.5, 1.5, 2.7, MINT],
      [0.35, -2.1, 1.2, 1.2, 1.9, SKY],
      [-1.95, 1.5, 1.05, 1.05, 1.3, SKY],
      [-0.55, 0.95, 1.15, 1.15, 1.1, WHITE],
      [1.45, 0.25, 1.35, 1.35, 1.5, PEACH],
      [0.55, 1.75, 1.0, 1.0, 0.95, MINT]
    ];

    // 影子：只在岛内，避免溢出到背景
    c.save();
    islandPath(); c.clip();
    BL.forEach(function (b) {
      var e = 0.46;
      KIT.poly(c, [P(b[0] + e, b[1] + e, 0.004), P(b[0] + b[2] + e, b[1] + e, 0.004),
        P(b[0] + b[2] + e, b[1] + b[3] + e, 0.004), P(b[0] + e, b[1] + b[3] + e, 0.004)],
        'rgba(86,74,120,.20)');
    });
    c.restore();

    // 建筑：按 x+y 从远到近
    BL.sort(function (a, b) { return (a[0] + a[1]) - (b[0] + b[1]); })
      .forEach(function (b) { KIT.isoBox(c, P, b[0], b[1], 0, b[2], b[3], b[4], b[5]); });

    // 树
    function tree(x, y) {
      var b = P(x, y, 0), t = P(x, y, 0.62);
      c.strokeStyle = '#B49A7C'; c.lineWidth = 5;
      c.beginPath(); c.moveTo(b[0], b[1]); c.lineTo(t[0], t[1]); c.stroke();
      var g = c.createRadialGradient(t[0] - 6, t[1] - 8, 3, t[0], t[1], 26);
      g.addColorStop(0, '#9FE0BE'); g.addColorStop(1, '#5FB98C');
      c.fillStyle = g; c.beginPath(); c.arc(t[0], t[1] - 8, 24, 0, T); c.fill();
    }
    tree(-2.6, 0.2); tree(1.0, -1.1); tree(2.3, 1.8); tree(-0.9, -2.5);

    // 风车
    (function () {
      var b = P(2.55, -2.35, 0), t = P(2.55, -2.35, 2.3);
      c.strokeStyle = '#F7F5FF'; c.lineWidth = 7; c.lineCap = 'round';
      c.beginPath(); c.moveTo(b[0], b[1]); c.lineTo(t[0], t[1]); c.stroke();
      c.save(); c.translate(t[0], t[1]); c.rotate(-0.5);
      for (var a = 0; a < 3; a++) {
        c.rotate(T / 3);
        c.fillStyle = '#FFFFFF';
        c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(30, -16, 62, 2); c.quadraticCurveTo(30, 8, 0, 0); c.fill();
      }
      c.restore();
    })();

    // 数据流
    c.save();
    c.setLineDash([7, 8]); c.strokeStyle = 'rgba(122,205,240,.85)'; c.lineWidth = 2.4;
    [[[-1.2, -0.6], [0.9, -1.4]], [[0.9, -1.4], [2.1, 0.9]], [[2.1, 0.9], [0.2, 2.1]]].forEach(function (pair) {
      var a = P(pair[0][0], pair[0][1], 2.4), b = P(pair[1][0], pair[1][1], 2.0);
      c.beginPath(); c.moveTo(a[0], a[1]);
      c.quadraticCurveTo((a[0] + b[0]) / 2, Math.min(a[1], b[1]) - 60, b[0], b[1]);
      c.stroke();
    });
    c.restore();

    // 标题写在岛的前侧立面上
    (function () {
      var p = P(-2.62, 3, -0.82);
      c.save();
      c.setTransform(0.866, 0.5, 0, 1, p[0], p[1]);
      c.font = '800 27px ' + SANS;
      c.textBaseline = 'middle';
      c.fillStyle = 'rgba(255,255,255,.94)';
      c.fillText('SMART CITY OS', 0, 0);
      c.restore();
    })();

    KIT.vignette(c, W, H, 0.14, '70,60,110');
  };

  // ============================================================ X14 CRT 终端
  C.X14 = function (c, W, H) {
    var bg = '#031208', grn = '#46FF8A', amb = '#FFC24A';
    c.fillStyle = bg; c.fillRect(0, 0, W, H);
    var g = c.createRadialGradient(W * 0.34, H * 0.36, 20, W * 0.34, H * 0.36, 560);
    g.addColorStop(0, 'rgba(70,255,138,.15)');
    g.addColorStop(1, 'rgba(70,255,138,0)');
    c.fillStyle = g; c.fillRect(0, 0, W, H);

    c.textBaseline = 'middle';
    c.font = '600 24px ' + MONO;
    c.fillStyle = 'rgba(70,255,138,.55)'; c.fillText('user@studio:~$', 64, 96);
    c.fillStyle = grn; c.fillText('./style --id X14', 268, 96);
    c.fillRect(522, 82, 13, 28);

    c.save();
    c.font = '700 168px ' + MONO;
    c.letterSpacing = '14px';
    c.shadowColor = 'rgba(70,255,138,.6)'; c.shadowBlur = 34;
    c.fillStyle = grn;
    c.fillText('CRT', 60, 250);
    c.restore();

    c.font = '600 26px ' + MONO; c.fillStyle = amb;
    c.fillText('PHOSPHOR TERMINAL / 1997', 68, 338);

    var rows = [
      ['load  styles.db', '341 entries'],
      ['mount prompts/', '333 files'],
      ['init  renderer', 'canvas2d']
    ];
    c.font = '500 22px ' + MONO;
    rows.forEach(function (r, i) {
      var y = 410 + i * 36, dots = '';
      c.fillStyle = 'rgba(70,255,138,.55)'; c.fillText('[ OK ]', 68, y);
      c.fillStyle = grn; c.fillText(r[0], 176, y);
      for (var n = 0; n < Math.max(4, 24 - r[0].length); n++) dots += '.';
      c.fillStyle = 'rgba(70,255,138,.38)'; c.fillText(dots, 372, y);
      c.fillStyle = amb; c.fillText(r[1], 800, y);
    });

    var bx = 68, by = 542, bw = 620, bh = 26;
    c.fillStyle = 'rgba(70,255,138,.52)'; c.fillText('fetching style stills', bx, by - 24);
    c.strokeStyle = 'rgba(70,255,138,.55)'; c.lineWidth = 2; c.strokeRect(bx, by, bw, bh);
    c.fillStyle = grn; c.fillRect(bx + 4, by + 4, (bw - 8) * 0.68, bh - 8);
    c.fillStyle = amb; c.font = '600 20px ' + MONO;
    c.fillText('68%', bx + bw + 20, by + bh / 2);

    // 右侧数字块，补足画面右半边的重量
    c.save();
    c.textAlign = 'right';
    c.font = '700 74px ' + MONO; c.letterSpacing = '2px';
    c.fillStyle = amb; c.fillText('341', 1206, 262);
    c.font = '500 19px ' + MONO; c.letterSpacing = '7px';
    c.fillStyle = 'rgba(255,194,74,.55)'; c.fillText('STYLES', 1206, 312);
    c.strokeStyle = 'rgba(70,255,138,.20)'; c.lineWidth = 1;
    c.beginPath(); c.moveTo(946, 348); c.lineTo(1206, 348); c.stroke();
    c.font = '700 74px ' + MONO; c.letterSpacing = '2px';
    c.fillStyle = grn; c.fillText('193', 1206, 438);
    c.font = '500 19px ' + MONO; c.letterSpacing = '7px';
    c.fillStyle = 'rgba(70,255,138,.52)'; c.fillText('STILLS', 1206, 488);
    c.textAlign = 'left';
    c.restore();

    KIT.scan(c, W, H, 4, 0.17);
    KIT.vignette(c, W, H, 0.86, '0,0,0');
  };

  // ============================================================ X1 手绘 + 8-bit
  C.X1 = function (c, W, H) {
    var paper = '#F4F2EE', ink = '#2B2A28', dark = '#1C1B1A', orange = '#D97757';
    KIT.paper(c, W, H, paper, 41, { fibers: 5200, len: 18 });

    c.strokeStyle = 'rgba(43,42,40,.5)'; c.lineWidth = 2;
    c.beginPath(); c.moveTo(60, 646); c.lineTo(W - 60, 646); c.stroke();
    (function () {
      var r = rng(9);
      for (var i = 0; i < 26; i++) {
        var x = 80 + r() * (W - 160), l = 6 + r() * 14;
        c.strokeStyle = 'rgba(43,42,40,.45)'; c.lineWidth = 1.6;
        c.beginPath(); c.moveTo(x, 646);
        c.quadraticCurveTo(x + 3, 646 - l * 0.6, x + (r() - 0.5) * 8, 646 - l); c.stroke();
      }
    })();

    // 轮廓云
    function cloud(x, y, s) {
      c.save(); c.strokeStyle = 'rgba(43,42,40,.42)'; c.lineWidth = 2;
      c.beginPath();
      c.moveTo(x, y);
      c.bezierCurveTo(x + s * 0.06, y - s * 0.40, x + s * 0.46, y - s * 0.54, x + s * 0.54, y - s * 0.16);
      c.bezierCurveTo(x + s * 0.84, y - s * 0.40, x + s * 1.10, y - s * 0.10, x + s * 0.96, y + s * 0.06);
      c.lineTo(x, y + s * 0.06);
      c.closePath(); c.stroke();
      c.restore();
    }
    cloud(250, 618, 92);
    cloud(452, 600, 58);

    c.fillStyle = dark; c.fillRect(72, 60, W - 144, 476);
    c.strokeStyle = 'rgba(43,42,40,.9)'; c.lineWidth = 2; c.strokeRect(72, 60, W - 144, 476);

    c.textBaseline = 'alphabetic';
    c.fillStyle = 'rgba(244,242,238,.55)';
    c.font = '400 26px Georgia, "Times New Roman", serif';
    c.fillText('Introducing', 132, 158);

    c.fillStyle = paper;
    c.font = '400 124px Georgia, "Times New Roman", serif';
    c.fillText('STYLE', 126, 300);
    c.fillText('LIBRARY', 126, 418);

    c.fillStyle = orange; c.font = '700 54px Georgia, serif';
    c.fillText('341', 128, 496);
    c.fillStyle = 'rgba(244,242,238,.72)';
    c.font = '400 30px "Segoe Script", "Bradley Hand", cursive';
    c.fillText('ways to make a frame move', 238, 494);
    KIT.strokePath(c, [[124, 508], [180, 514], [252, 507], [302, 513]], orange, 5, 17, false, 2.5);

    (function () {
      var px = 928, py = 646, u = 11;
      var cells = [[2, 0], [3, 0], [4, 0],
        [1, 1], [2, 1], [3, 1], [4, 1], [5, 1],
        [1, 2], [2, 2], [3, 2], [4, 2], [5, 2],
        [1, 3], [2, 3], [3, 3], [4, 3], [5, 3],
        [2, 4], [3, 4], [4, 4],
        [1, 5], [4, 5]];
      c.fillStyle = ink;
      cells.forEach(function (p) { c.fillRect(px + p[0] * u, py - (6 - p[1]) * u, u, u); });
      c.fillStyle = orange; c.fillRect(px + 3 * u, py - 6 * u, u, u);
      c.fillStyle = paper;
      c.fillRect(px + 2 * u + 1, py - 5 * u + 2, u - 2, u - 3);
      c.fillRect(px + 4 * u + 1, py - 5 * u + 2, u - 2, u - 3);
      c.fillStyle = 'rgba(43,42,40,.12)';
      c.beginPath(); c.ellipse(px + 3 * u, py + 2, 48, 7, 0, 0, T); c.fill();
    })();

    c.fillStyle = 'rgba(43,42,40,.6)'; c.font = '600 18px ' + MONO;
    c.fillText('WORLD 1-1', 74, 586);
    c.textAlign = 'right';
    c.fillText('193 / 341 有静帧', W - 74, 586);
    c.textAlign = 'left';
  };

  // ============================================================ Z5 剪纸
  C.Z5 = function (c, W, H) {
    var paper = '#F1E8D4', red = '#C8102E', deep = '#8F0B22', k = 0.667;
    KIT.paper(c, W, H, paper, 55, { fibers: 2600, len: 20 });
    var cx = W / 2, cy = H / 2;

    function layer() {
      var cv = document.createElement('canvas'); cv.width = W; cv.height = H;
      var g = cv.getContext('2d'); g.translate(cx, cy);
      return [cv, g];
    }
    function ring(g, n, fn) {
      for (var i = 0; i < n; i++) { g.save(); g.rotate(i * T / n); fn(g, i); g.restore(); }
    }
    function drop(g, yBottom, yTop, w) {
      var d = yBottom - yTop;
      g.beginPath(); g.moveTo(0, yBottom);
      g.bezierCurveTo(w, yBottom - d * 0.15, w * 0.85, yTop + d * 0.22, 0, yTop);
      g.bezierCurveTo(-w * 0.85, yTop + d * 0.22, -w, yBottom - d * 0.15, 0, yBottom);
      g.fill();
    }

    // 底盘：深红圆环
    var L1 = layer(), a = L1[1];
    a.fillStyle = deep; a.beginPath(); a.arc(0, 0, 452 * k, 0, T); a.fill();
    a.globalCompositeOperation = 'destination-out';
    ring(a, 48, function (g) { g.beginPath(); g.arc(0, -428 * k, 10 * k, 0, T); g.fill(); });
    a.beginPath(); a.arc(0, 0, 400 * k, 0, T); a.fill();
    a.globalCompositeOperation = 'source-over';

    // 主盘：亮红镂空
    var L2 = layer(), b = L2[1];
    b.fillStyle = red; b.beginPath(); b.arc(0, 0, 404 * k, 0, T); b.fill();
    b.globalCompositeOperation = 'destination-out';
    ring(b, 48, function (g) { g.beginPath(); g.arc(0, -378 * k, 9 * k, 0, T); g.fill(); });
    ring(b, 24, function (g) { drop(g, -274 * k, -342 * k, 22 * k); });
    ring(b, 12, function (g) { drop(g, -74 * k, -244 * k, 50 * k); });
    ring(b, 12, function (g) {
      g.rotate(Math.PI / 12);
      g.beginPath();
      g.moveTo(0, -226 * k - 24 * k); g.lineTo(16 * k, -226 * k);
      g.lineTo(0, -226 * k + 24 * k); g.lineTo(-16 * k, -226 * k);
      g.closePath(); g.fill();
    });
    ring(b, 12, function (g) {
      g.rotate(Math.PI / 12);
      g.beginPath(); g.arc(0, -170 * k, 12 * k, 0, T); g.fill();
    });
    ring(b, 12, function (g) { drop(g, -148 * k, -78 * k, 26 * k); });
    b.beginPath(); b.arc(0, 0, 76 * k, 0, T); b.fill();
    b.globalCompositeOperation = 'source-over';
    b.fillStyle = red; b.beginPath(); b.arc(0, 0, 46, 0, T); b.fill();
    b.globalCompositeOperation = 'destination-out';
    b.font = '700 34px "Microsoft YaHei", "SimHei", sans-serif';
    b.textAlign = 'center'; b.textBaseline = 'middle';
    b.fillText('囍', 0, 2);
    b.globalCompositeOperation = 'source-over';

    // 角花
    var CS = Math.ceil(262 * k);
    var corner = document.createElement('canvas'); corner.width = CS; corner.height = CS;
    var g2 = corner.getContext('2d');
    g2.fillStyle = red;
    g2.beginPath(); g2.moveTo(0, 0); g2.arc(0, 0, 250 * k, 0, Math.PI / 2); g2.closePath(); g2.fill();
    g2.globalCompositeOperation = 'destination-out';
    for (var i = 0; i < 9; i++) {
      var ang = (i + 0.5) / 9 * Math.PI / 2;
      g2.beginPath(); g2.arc(Math.cos(ang) * 212 * k, Math.sin(ang) * 212 * k, 7 * k, 0, T); g2.fill();
    }
    for (var j = 0; j < 4; j++) {
      var a2 = (j + 0.5) / 4 * Math.PI / 2;
      g2.save(); g2.translate(Math.cos(a2) * 132 * k, Math.sin(a2) * 132 * k); g2.rotate(a2 + Math.PI / 2);
      drop(g2, -20 * k, 20 * k, 10 * k); g2.restore();
    }
    g2.beginPath(); g2.arc(78 * k, 78 * k, 58 * k, 0, T); g2.fill();
    g2.globalCompositeOperation = 'source-over';

    function shadowed(draw) {
      c.save();
      c.shadowColor = 'rgba(70,12,12,.38)'; c.shadowBlur = 16;
      c.shadowOffsetX = 5; c.shadowOffsetY = 9;
      draw();
      c.restore();
    }
    shadowed(function () { c.drawImage(L1[0], 0, 0); });
    shadowed(function () { c.drawImage(L2[0], 0, 0); });
    shadowed(function () {
      c.drawImage(corner, 0, 0);
      c.save(); c.translate(W, 0); c.scale(-1, 1); c.drawImage(corner, 0, 0); c.restore();
      c.save(); c.translate(0, H); c.scale(1, -1); c.drawImage(corner, 0, 0); c.restore();
      c.save(); c.translate(W, H); c.scale(-1, -1); c.drawImage(corner, 0, 0); c.restore();
    });

    KIT.grain(c, W, H, 71, 0.035);
  };

  // ============================================================ K22 折纸
  C.K22 = function (c, W, H) {
    KIT.paper(c, W, H, '#EAE0CB', 66, { fibers: 4200, len: 18 });
    // 下半张纸折过来，压暗一档
    c.save();
    c.beginPath();
    c.moveTo(0, H * 0.44); c.lineTo(W, H * 0.16); c.lineTo(W, H); c.lineTo(0, H);
    c.closePath();
    c.fillStyle = 'rgba(198,178,144,.40)'; c.fill();
    c.restore();
    // 折痕：一道暗线压一道亮线
    c.save();
    c.strokeStyle = 'rgba(146,120,84,.55)'; c.lineWidth = 2;
    c.beginPath(); c.moveTo(0, H * 0.44); c.lineTo(W, H * 0.16); c.stroke();
    c.strokeStyle = 'rgba(255,250,238,.85)'; c.lineWidth = 1.4;
    c.beginPath(); c.moveTo(0, H * 0.44 + 3); c.lineTo(W, H * 0.16 + 3); c.stroke();
    c.restore();

    // 折角
    c.save();
    c.shadowColor = 'rgba(120,95,60,.22)'; c.shadowBlur = 14; c.shadowOffsetX = 6; c.shadowOffsetY = 8;
    c.fillStyle = '#EFE5D3';
    c.beginPath(); c.moveTo(0, 0); c.lineTo(150, 0); c.lineTo(0, 150); c.closePath(); c.fill();
    c.restore();
    c.strokeStyle = 'rgba(150,128,96,.4)'; c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(150, 0); c.lineTo(0, 150); c.stroke();

    // 纸船：正面船体 + 三角帆 + 中缝折痕
    var cx = 640;

    function facet(pts, base, light) {
      var g = c.createLinearGradient(pts[0][0], pts[0][1], pts[2][0], pts[2][1]);
      g.addColorStop(0, light); g.addColorStop(1, base);
      KIT.poly(c, pts, g, 'rgba(120,98,66,.58)', 1.7);
    }

    // 影子：三层叠出柔边
    c.save();
    [[268, 30, 0.05], [246, 24, 0.07], [218, 17, 0.09]].forEach(function (e) {
      c.fillStyle = 'rgba(96,74,44,' + e[2] + ')';
      c.beginPath(); c.ellipse(cx + 8, 540, e[0], e[1], 0, 0, T); c.fill();
    });
    c.restore();

    // 水面折痕
    c.save();
    c.strokeStyle = 'rgba(146,120,84,.32)'; c.lineWidth = 1.4;
    c.beginPath(); c.moveTo(286, 538); c.lineTo(994, 538); c.stroke();
    c.restore();

    // 船体：左右两片
    facet([[396, 392], [640, 392], [640, 516], [492, 516]], '#D2C0A1', '#EEE2CA');
    facet([[640, 392], [884, 392], [788, 516], [640, 516]], '#E7DABF', '#FCF6E8');

    // 帆：左亮右暗
    facet([[596, 88], [512, 392], [640, 392]], '#FFFEF8', '#FFFFFF');
    facet([[596, 88], [640, 392], [768, 392]], '#DFD0B2', '#F6EDDA');

    // 帆上的一道横向折痕（裁在帆内）
    c.save();
    c.strokeStyle = 'rgba(120,98,66,.28)'; c.lineWidth = 1.3;
    c.beginPath(); c.moveTo(540, 300); c.lineTo(710, 300); c.stroke();
    c.restore();

    // 中缝：帆到船底
    c.save();
    c.strokeStyle = 'rgba(120,98,66,.6)'; c.lineWidth = 1.9;
    c.beginPath(); c.moveTo(596, 88); c.lineTo(640, 392); c.lineTo(640, 516); c.stroke();
    c.restore();

    // 船体内部的两道折痕
    c.save();
    c.strokeStyle = 'rgba(120,98,66,.24)'; c.lineWidth = 1.2;
    [[[556, 392], [614, 516]], [[724, 392], [666, 516]]].forEach(function (s) {
      c.beginPath(); c.moveTo(s[0][0], s[0][1]); c.lineTo(s[1][0], s[1][1]); c.stroke();
    });
    c.restore();

    // 右下角一小片折起的纸角
    c.save();
    c.shadowColor = 'rgba(120,95,60,.20)'; c.shadowBlur = 12; c.shadowOffsetX = -5; c.shadowOffsetY = 5;
    c.fillStyle = '#F3E9D6';
    c.beginPath(); c.moveTo(W, H); c.lineTo(W - 132, H); c.lineTo(W, H - 132); c.closePath(); c.fill();
    c.restore();
    c.strokeStyle = 'rgba(120,98,66,.38)'; c.lineWidth = 1.4;
    c.beginPath(); c.moveTo(W - 132, H); c.lineTo(W, H - 132); c.stroke();

    KIT.grain(c, W, H, 12, 0.03);
    KIT.vignette(c, W, H, 0.16, '120,100,70');
  };

  // ============================================================ M1 白板手绘讲解
  C.M1 = function (c, W, H) {
    var bg = '#FBFAF7', ink = '#1B1B1B', acc = '#E5432B';
    c.fillStyle = bg; c.fillRect(0, 0, W, H);
    (function () {
      var r = rng(4);
      for (var i = 0; i < 7; i++) {
        c.strokeStyle = 'rgba(120,120,120,' + (0.018 + r() * 0.022) + ')';
        c.lineWidth = 30 + r() * 40; c.lineCap = 'round';
        c.beginPath(); c.moveTo(r() * W, r() * H); c.lineTo(r() * W, r() * H); c.stroke();
      }
    })();

    KIT.handText(c, 'AI 是怎么干活的', 80, 108, 84, ink, 5, { double: true, track: 2 });
    KIT.strokePath(c, [[84, 152], [300, 158], [520, 151], [612, 157]], acc, 9, 6, false, 3);

    // 云朵脑
    (function () {
      var cx = 336, cy = 392, R = 112, pts = [];
      for (var a = 0; a < T; a += 0.045) {
        var rr = R * (1 + 0.11 * Math.abs(Math.sin(3.5 * a)));
        pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
      }
      KIT.strokePath(c, pts, ink, 9, 15, true, 2.6);
      for (var i = 0; i < 3; i++) {
        var yy = cy - 40 + i * 38, seg = [];
        for (var x = cx - 66; x <= cx + 66; x += 8) seg.push([x, yy + Math.sin((x - cx) / 22) * 9]);
        KIT.strokePath(c, seg, ink, 6, 30 + i, false, 2);
      }
    })();

    // 火柴人
    (function () {
      var cx = 936, cy = 372;
      c.save(); c.strokeStyle = ink; c.fillStyle = ink; c.lineWidth = 8; c.lineCap = 'round';
      c.beginPath(); c.arc(cx, cy - 66, 38, 0, T); c.stroke();
      c.beginPath(); c.moveTo(cx, cy - 28); c.lineTo(cx, cy + 58); c.stroke();
      c.beginPath(); c.moveTo(cx, cy - 10); c.lineTo(cx - 58, cy + 30); c.stroke();
      c.beginPath(); c.arc(cx - 66, cy + 34, 10, 0, T); c.fill();
      c.beginPath(); c.moveTo(cx, cy - 10); c.lineTo(cx + 58, cy + 16); c.stroke();
      c.beginPath(); c.arc(cx + 66, cy + 19, 10, 0, T); c.fill();
      c.beginPath(); c.moveTo(cx, cy + 58); c.lineTo(cx - 40, cy + 128); c.stroke();
      c.beginPath(); c.moveTo(cx, cy + 58); c.lineTo(cx + 42, cy + 128); c.stroke();
      c.restore();
    })();

    // 强调箭头
    (function () {
      var pts = [], x;
      for (x = 496; x <= 812; x += 6) pts.push([x, 400 - Math.sin((x - 496) / 316 * Math.PI) * 48]);
      KIT.strokePath(c, pts, acc, 9, 7, false, 2.2);
      var e = pts[pts.length - 1], p = pts[pts.length - 4];
      var ang = Math.atan2(e[1] - p[1], e[0] - p[0]);
      c.save(); c.strokeStyle = acc; c.lineWidth = 9; c.lineCap = 'round';
      [-0.55, 0.55].forEach(function (d) {
        c.beginPath(); c.moveTo(e[0], e[1]);
        c.lineTo(e[0] - Math.cos(ang + d) * 34, e[1] - Math.sin(ang + d) * 34); c.stroke();
      });
      c.restore();
    })();

    KIT.handText(c, '指令', 606, 322, 40, acc, 22, { align: 'center', double: true });

    // 标签
    KIT.handText(c, '大语言模型', 336, 596, 60, ink, 41, { align: 'center', double: true, track: 2 });
    KIT.handText(c, '会想、会说', 336, 654, 36, acc, 42, { align: 'center' });
    KIT.handText(c, 'Harness', 936, 596, 60, ink, 43, { align: 'center', double: true });
    KIT.handText(c, '手和脚：真去做事', 936, 654, 36, acc, 44, { align: 'center' });

    // 马克笔
    c.save();
    c.translate(1095, 667); c.rotate(0.9);
    c.fillStyle = '#1B1B1B'; c.fillRect(0, -10, 172, 20);
    c.fillStyle = acc; c.fillRect(130, -12, 42, 24);
    c.fillStyle = '#E8E2D6'; c.fillRect(-16, -5.5, 18, 11);
    c.restore();
  };
})();
