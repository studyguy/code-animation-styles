// M 系列预览（M21–M38）
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
  function strip3(c, W, H, o) {
    var m = 28, gap = 14, head = 46;
    var pw = (W - m * 2 - gap * 2) / 3, ph = H - head - 28;
    c.fillStyle = o.bg; c.fillRect(0, 0, W, H);
    c.font = '600 16px ' + MONO; c.fillStyle = o.hcolor || o.ink; c.textBaseline = 'middle';
    c.fillText(o.title || '', m, 23);
    c.textAlign = 'right'; c.fillText(o.right || '', W - m, 23); c.textAlign = 'left';
    o.frames.forEach(function (fn, i) {
      var x = m + i * (pw + gap);
      c.save();
      c.beginPath(); c.rect(x, head, pw, ph); c.clip();
      c.translate(x, head);
      if (o.panelBg) { c.fillStyle = o.panelBg; c.fillRect(0, 0, pw, ph); }
      fn(c, pw, ph, i);
      c.restore();
      c.strokeStyle = o.border || 'rgba(0,0,0,.14)'; c.lineWidth = 1;
      c.strokeRect(x + 0.5, head + 0.5, pw - 1, ph - 1);
      c.font = '700 13px ' + MONO; c.fillStyle = o.numColor || o.ink;
      c.fillText('0' + (i + 1), x + 14, head + ph - 14);
    });
  }

  // M21 原理拆解
  C.M21 = function (c, W, H) {
    c.fillStyle = '#F6F2E9'; c.fillRect(0, 0, W, H);
    // 外壳
    c.strokeStyle = '#2A241C'; c.lineWidth = 4;
    c.strokeRect(360, 240, 520, 320);
    // 内部零件
    c.fillStyle = '#C9A66B'; c.fillRect(420, 300, 150, 100);
    c.fillStyle = '#8FA9C4'; c.fillRect(620, 300, 200, 60);
    c.fillStyle = '#9AA6B2'; c.fillRect(620, 400, 120, 120);
    c.fillStyle = '#C8452F'; c.beginPath(); c.arc(820, 460, 44, 0, T); c.fill();
    // 引线
    [[495, 300, 220, 150, '① 电源'], [720, 300, 760, 150, '② 芯片'], [880, 460, 1000, 360, '③ 马达']].forEach(function (l) {
      c.strokeStyle = 'rgba(42,36,28,.45)'; c.lineWidth = 1.5; c.setLineDash([5, 5]);
      c.beginPath(); c.moveTo(l[0], l[1]); c.lineTo(l[2], l[3]); c.stroke(); c.setLineDash([]);
      txt(c, l[4], l[2] - 30, l[3] - 10, 20, '#2A241C', '600 "Microsoft YaHei", sans-serif');
    });
    txt(c, '拆开看，才知道它怎么转。', 90, 170, 40, '#2A241C', '800 "Microsoft YaHei", sans-serif');
    tag(c, 'TEARDOWN / M21', 90, 690, 'rgba(42,36,28,.42)');
  };

  // M22 配方式步骤
  C.M22 = function (c, W, H) {
    strip3(c, W, H, {
      bg: '#F7F2E8', ink: '#2A241C', panelBg: '#FFFDF8',
      title: 'M22 配方式步骤', right: '每加一样，标出名字和分量',
      frames: [
        function (g, w, h) {
          g.strokeStyle = '#2A241C'; g.lineWidth = 4;
          g.beginPath(); g.moveTo(w / 2 - 70, 180); g.lineTo(w / 2 + 70, 180);
          g.lineTo(w / 2 + 50, 420); g.lineTo(w / 2 - 50, 420); g.closePath(); g.stroke();
        },
        function (g, w, h) {
          g.strokeStyle = '#2A241C'; g.lineWidth = 4;
          g.beginPath(); g.moveTo(w / 2 - 70, 180); g.lineTo(w / 2 + 70, 180);
          g.lineTo(w / 2 + 50, 420); g.lineTo(w / 2 - 50, 420); g.closePath(); g.stroke();
          g.fillStyle = '#D9A441'; g.fillRect(w / 2 - 44, 330, 88, 84);
          txt(g, '威士忌 45ml', 30, 150, 18, '#2A241C', '600 "Microsoft YaHei", sans-serif');
        },
        function (g, w, h) {
          g.fillStyle = '#B4462F'; g.beginPath();
          g.moveTo(w / 2 - 62, 200); g.lineTo(w / 2 + 62, 200); g.lineTo(w / 2 + 50, 420); g.lineTo(w / 2 - 50, 420); g.closePath(); g.fill();
          g.fillStyle = '#F2C14E'; g.beginPath(); g.arc(w / 2 + 40, 210, 20, 0, T); g.fill();
          txt(g, '加冰，完成', 30, 150, 20, '#2A241C', '700 "Microsoft YaHei", sans-serif');
        }
      ]
    });
  };

  // M23 五幕讲解
  C.M23 = function (c, W, H) {
    c.fillStyle = '#F4F0E6'; c.fillRect(0, 0, W, H);
    var acts = ['起', '承', '转', '合', '收'];
    acts.forEach(function (a, i) {
      var x = 60 + i * 236, y = 200, w = 210, h = 300;
      c.fillStyle = '#FFFDF7'; c.fillRect(x, y, w, h);
      c.strokeStyle = '#2A241C'; c.lineWidth = 2; c.strokeRect(x, y, w, h);
      c.fillStyle = '#C8452F';
      c.beginPath(); c.arc(x + w / 2, y + 130, 40 + i * 6, 0, T); c.globalAlpha = 0.25 + i * 0.12; c.fill(); c.globalAlpha = 1;
      txt(c, a, x + w / 2, y + 246, 34, '#2A241C', '800 "Microsoft YaHei", sans-serif', 'center');
    });
    txt(c, '五个画面，讲完一件事。', 60, 150, 34, '#2A241C', '800 "Microsoft YaHei", sans-serif');
    tag(c, 'FIVE ACTS / M23', 60, 690, 'rgba(42,36,28,.42)');
  };

  // M24 四段式发布片
  C.M24 = function (c, W, H) {
    c.fillStyle = '#101018'; c.fillRect(0, 0, W, H);
    var cols = ['#2B3A55', '#7A2C3A', '#2E6E5A', '#8A6A2A'];
    var labels = ['大环境', '痛点', '办法', '好处'];
    cols.forEach(function (col, i) {
      c.fillStyle = col; c.fillRect(60 + i * 290, 200, 260, 260);
      txt(c, labels[i], 90 + i * 290, 360, 34, 'rgba(255,255,255,.9)', '700 "Microsoft YaHei", sans-serif');
    });
    c.fillStyle = '#F2C14E'; c.beginPath(); c.arc(640, 560, 46, 0, T); c.fill();
    txt(c, 'LOGO', 640, 570, 20, '#101018', '800 ' + SANS, 'center');
    txt(c, '四段走完，最后落 logo。', 60, 150, 32, 'rgba(255,255,255,.85)', '700 "Microsoft YaHei", sans-serif');
    tag(c, 'LAUNCH FILM / M24', 60, 680, 'rgba(255,255,255,.4)');
  };

  // M25 歌词卡点
  C.M25 = function (c, W, H) {
    c.fillStyle = '#0D1220'; c.fillRect(0, 0, W, H);
    var words = ['我', '把', '没', '说', '出', '口', '的', '话'];
    var x = 120;
    words.forEach(function (w, i) {
      var hot = i === 5;
      c.font = '800 76px ' + SANS;
      c.fillStyle = hot ? '#FF5CC8' : 'rgba(233,237,246,' + (0.25 + i * 0.09) + ')';
      c.fillText(w, x, 360);
      x += c.measureText(w).width + 10;
      c.fillStyle = 'rgba(94,104,134,.5)';
      c.fillRect(x - 4, 392, 2, 18);
    });
    // 节拍条
    for (var i = 0; i < 16; i++) {
      c.fillStyle = i === 5 ? '#FF5CC8' : 'rgba(94,104,134,.35)';
      c.fillRect(120 + i * 64, 460, 22, i === 5 ? 30 : 12);
    }
    tag(c, 'LYRIC SYNC / M25', 120, 560, 'rgba(233,237,246,.4)');
  };

  // M27 无对白短片
  C.M27 = function (c, W, H) {
    strip3(c, W, H, {
      bg: '#101014', ink: '#EDE8E0', panelBg: '#17171C', border: 'rgba(255,255,255,.12)', numColor: 'rgba(255,255,255,.35)',
      title: 'M27 无对白短片', right: '画面和声音讲故事',
      frames: [
        function (g, w, h) {
          g.fillStyle = '#EDE8E0'; g.beginPath(); g.arc(w / 2, h / 2 - 30, 70, 0, T); g.fill();
          g.fillStyle = 'rgba(237,232,224,.25)'; g.fillRect(0, h - 160, w, 160);
          txt(g, '♪', w - 60, 70, 34, 'rgba(237,232,224,.6)', MONO);
        },
        function (g, w, h) {
          g.fillStyle = '#EDE8E0'; g.beginPath(); g.arc(w / 2, h / 2 + 20, 40, 0, T); g.fill();
          g.strokeStyle = 'rgba(237,232,224,.35)'; g.lineWidth = 2;
          for (var i = 0; i < 4; i++) { g.beginPath(); g.arc(w / 2, h / 2 + 20, 70 + i * 34, 0, T); g.stroke(); }
          txt(g, '♪♪', w - 84, 70, 30, 'rgba(237,232,224,.6)', MONO);
        },
        function (g, w, h) {
          g.fillStyle = 'rgba(237,232,224,.18)'; g.fillRect(40, 120, w - 80, 10);
          g.fillRect(40, 170, w - 140, 10);
          g.fillRect(40, 220, w - 100, 10);
          txt(g, '（静）', 40, h - 80, 26, 'rgba(237,232,224,.45)', '400 "Microsoft YaHei", sans-serif');
        }
      ]
    });
  };

  // M28 对称暖色空镜
  C.M28 = function (c, W, H) {
    var g = c.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#F7D9C4'); g.addColorStop(1, '#E8B49A');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    var cx = W / 2;
    // 对称的窗
    c.strokeStyle = 'rgba(120,80,60,.35)'; c.lineWidth = 6;
    c.strokeRect(cx - 300, 120, 600, 330);
    c.beginPath(); c.moveTo(cx, 120); c.lineTo(cx, 450); c.moveTo(cx - 300, 285); c.lineTo(cx + 300, 285); c.stroke();
    // 窗外日落
    c.fillStyle = '#F2A25C'; c.beginPath(); c.arc(cx, 380, 70, 0, T); c.fill();
    // 桌子
    c.fillStyle = 'rgba(120,80,60,.28)'; c.fillRect(0, 470, W, 250);
    // 对称的杯子
    [-1, 1].forEach(function (s) {
      c.fillStyle = '#FBF3E8';
      c.beginPath(); c.moveTo(cx + s * 160 - 46, 500); c.lineTo(cx + s * 160 + 46, 500);
      c.lineTo(cx + s * 160 + 36, 600); c.lineTo(cx + s * 160 - 36, 600); c.closePath(); c.fill();
      c.fillStyle = '#8B5E3C'; c.fillRect(cx + s * 160 - 40, 520, 80, 60);
    });
    txt(c, '左右对称，粉嫩暖色，像一个小舞台。', cx, 660, 22, 'rgba(90,60,45,.65)', '500 "Microsoft YaHei", sans-serif', 'center');
    tag(c, 'SYMMETRICAL STILL / M28', 90, 690, 'rgba(90,60,45,.45)');
  };

  // M29 日落 3D 空镜
  C.M29 = function (c, W, H) {
    var g = c.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#2A1B4A'); g.addColorStop(0.45, '#8A3A5A'); g.addColorStop(0.7, '#E07A5A'); g.addColorStop(1, '#2A1B2A');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    var r = rng(291);
    for (var i = 0; i < 60; i++) {
      c.fillStyle = 'rgba(255,220,200,' + (0.1 + r() * 0.4) + ')';
      c.beginPath(); c.arc(r() * W, r() * 300, 2 + r() * 6, 0, T); c.fill();
    }
    c.fillStyle = '#FFD9A8'; c.beginPath(); c.arc(W / 2, 430, 90, 0, T); c.fill();
    // 海面
    c.fillStyle = '#3A1E3A'; c.fillRect(0, 470, W, 250);
    c.save(); c.globalAlpha = 0.35; c.fillStyle = '#FFD9A8';
    for (var k = 0; k < 14; k++) {
      var ww = 220 - k * 12;
      c.fillRect(W / 2 - ww / 2, 490 + k * 16, ww, 4);
    }
    c.restore();
    txt(c, '把一天，交给一句短话。', W / 2, 120, 26, 'rgba(255,235,220,.8)', '500 "Microsoft YaHei", sans-serif', 'center');
    tag(c, '3D SUNSET / M29', 90, 690, 'rgba(255,235,220,.4)');
  };

  // M30 东方意境
  C.M30 = function (c, W, H) {
    var g = c.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#1A2430'); g.addColorStop(1, '#3A4A55');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    // 月
    c.fillStyle = 'rgba(245,240,220,.92)'; c.beginPath(); c.arc(920, 180, 78, 0, T); c.fill();
    // 远山
    c.fillStyle = 'rgba(20,28,36,.75)';
    c.beginPath(); c.moveTo(0, 480);
    for (var x = 0; x <= W; x += 18) c.lineTo(x, 440 - 70 * Math.abs(Math.sin(x / 260)));
    c.lineTo(W, 620); c.lineTo(0, 620); c.closePath(); c.fill();
    // 江
    c.fillStyle = 'rgba(58,74,85,.9)'; c.fillRect(0, 590, W, 130);
    c.strokeStyle = 'rgba(245,240,220,.22)'; c.lineWidth = 1.4;
    for (var i = 0; i < 7; i++) { c.beginPath(); c.moveTo(120 + i * 20, 620 + i * 12); c.lineTo(W - 160, 620 + i * 12); c.stroke(); }
    // 楼阁
    c.fillStyle = '#121A22';
    c.beginPath(); c.moveTo(300, 600); c.lineTo(300, 520); c.lineTo(250, 520); c.lineTo(330, 470); c.lineTo(410, 520); c.lineTo(360, 520); c.lineTo(360, 600); c.closePath(); c.fill();
    txt(c, '月落江心，楼里有人。', 90, 160, 30, 'rgba(245,240,220,.8)', '400 "Songti SC", "SimSun", serif');
    tag(c, 'EASTERN MOOD / M30', 90, 690, 'rgba(245,240,220,.35)');
  };

  // M31 粘土定格 MV
  C.M31 = function (c, W, H) {
    var r = rng(311);
    strip3(c, W, H, {
      bg: '#F3E7DA', ink: '#2B2018', panelBg: '#FBF3E8',
      title: 'M31 粘土定格 MV', right: '一帧一帧捏出来',
      frames: [0, 1, 2].map(function (k) {
        return function (g, w, h) {
          g.save(); g.translate(w / 2, h / 2 + 40 - k * 10);
          g.fillStyle = '#E8A07A'; g.beginPath(); g.ellipse(0, 40, 80, 96, 0, 0, T); g.fill();
          g.fillStyle = '#F2B896'; g.beginPath(); g.arc(0, -70, 58, 0, T); g.fill();
          g.fillStyle = '#2B2018';
          g.beginPath(); g.arc(-20, -78, 7, 0, T); g.fill();
          g.beginPath(); g.arc(22, -78, 7, 0, T); g.fill();
          g.strokeStyle = '#8E4A35'; g.lineWidth = 4;
          g.beginPath(); g.arc(0, -54, 15, 0.3, Math.PI - 0.3); g.stroke();
          for (var i = 0; i < 16; i++) {
            g.strokeStyle = 'rgba(150,90,60,' + (0.05 + r() * 0.1) + ')'; g.lineWidth = 2.5;
            g.beginPath(); g.arc((r() - 0.5) * 150, 40 + (r() - 0.5) * 160, 6 + r() * 10, r() * T, r() * T + 1); g.stroke();
          }
          g.restore();
        };
      })
    });
  };

  // M32 竖屏 POV
  C.M32 = function (c, W, H) {
    c.fillStyle = '#0E0E12'; c.fillRect(0, 0, W, H);
    var vw = 405, vh = 720, vx = (W - vw) / 2;
    c.save(); c.beginPath(); c.rect(vx, 0, vw, vh); c.clip();
    c.fillStyle = '#3A2E4A'; c.fillRect(vx, 0, vw, vh);
    // 第一人称：双手
    c.fillStyle = '#E8B48C';
    c.beginPath(); c.ellipse(vx + 90, 600, 60, 90, -0.3, 0, T); c.fill();
    c.beginPath(); c.ellipse(vx + 320, 610, 60, 90, 0.3, 0, T); c.fill();
    // 快切的小格
    for (var i = 0; i < 4; i++) {
      c.fillStyle = ['#C8452F', '#2E6E5A', '#D9A441', '#2B5FA8'][i];
      c.fillRect(vx + 40 + (i % 2) * 170, 80 + Math.floor(i / 2) * 170, 150, 150);
    }
    c.restore();
    c.strokeStyle = 'rgba(255,255,255,.25)'; c.lineWidth = 2; c.strokeRect(vx, 0, vw, vh);
    txt(c, '9:16', vx + vw + 60, 200, 30, 'rgba(255,255,255,.6)', MONO);
    txt(c, '快、碎、第一人称', vx + vw + 60, 250, 20, 'rgba(255,255,255,.45)', '500 "Microsoft YaHei", sans-serif');
    tag(c, 'VERTICAL POV / M32', 90, 690, 'rgba(255,255,255,.35)');
  };

  // M33 从一个点拉远
  C.M33 = function (c, W, H) {
    strip3(c, W, H, {
      bg: '#0A0A0F', ink: '#EDEAF2', panelBg: '#101018', border: 'rgba(255,255,255,.12)', numColor: 'rgba(255,255,255,.35)',
      title: 'M33 从一个点拉远', right: '点 → 桌面 → 太空',
      frames: [
        function (g, w, h) { g.fillStyle = '#EDEAF2'; g.beginPath(); g.arc(w / 2, h / 2, 4, 0, T); g.fill(); },
        function (g, w, h) {
          g.strokeStyle = 'rgba(237,234,242,.25)'; g.lineWidth = 2;
          g.strokeRect(w / 2 - 120, h / 2 - 80, 240, 160);
          g.fillStyle = '#EDEAF2'; g.beginPath(); g.arc(w / 2, h / 2, 4, 0, T); g.fill();
          g.fillStyle = 'rgba(237,234,242,.2)'; g.fillRect(w / 2 + 40, h / 2 - 40, 60, 40);
        },
        function (g, w, h) {
          var neb = g.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, 260);
          neb.addColorStop(0, 'rgba(120,90,200,.30)'); neb.addColorStop(1, 'rgba(120,90,200,0)');
          g.fillStyle = neb; g.fillRect(0, 0, w, h);
          var r2 = rng(333);
          for (var i = 0; i < 260; i++) {
            g.fillStyle = 'rgba(255,255,255,' + (0.25 + r2() * 0.75) + ')';
            g.beginPath(); g.arc(r2() * w, r2() * h, 0.8 + r2() * 1.6, 0, T); g.fill();
          }
          g.strokeStyle = 'rgba(237,234,242,.35)'; g.lineWidth = 2;
          g.strokeRect(w / 2 - 50, h / 2 - 36, 100, 72);
          g.fillStyle = '#FFD9A8'; g.beginPath(); g.arc(w / 2, h / 2, 5, 0, T); g.fill();
          txt(g, '就是这一个点', 30, h - 40, 16, 'rgba(237,234,242,.55)', '400 "Microsoft YaHei", sans-serif');
        }
      ]
    });
  };

  // M34 新闻快讯盘点
  C.M34 = function (c, W, H) {
    c.fillStyle = '#0A1A3A'; c.fillRect(0, 0, W, H);
    c.fillStyle = '#D6121C'; c.fillRect(0, 90, 240, 70);
    txt(c, '快讯', 30, 142, 34, '#fff', '800 "Microsoft YaHei", sans-serif');
    var items = ['01  这一条，先看结论', '02  这一条，看数字', '03  这一条，看变化'];
    items.forEach(function (s, i) {
      var y = 240 + i * 120;
      c.strokeStyle = 'rgba(255,255,255,.16)'; c.lineWidth = 1;
      c.beginPath(); c.moveTo(90, y + 40); c.lineTo(W - 90, y + 40); c.stroke();
      txt(c, s, 90, y + 10, 30, i === 0 ? '#fff' : 'rgba(255,255,255,.6)', '700 "Microsoft YaHei", sans-serif');
    });
    c.fillStyle = '#D6121C'; c.fillRect(0, 640, W, 56);
    txt(c, '一条一条过，每条点出看点。', 90, 678, 20, '#fff', '600 "Microsoft YaHei", sans-serif');
    tag(c, 'NEWS ROUNDUP / M34', 90, 60, 'rgba(255,255,255,.45)');
  };

  // M36 破框
  C.M36 = function (c, W, H) {
    c.fillStyle = '#EDE7DA'; c.fillRect(0, 0, W, H);
    // 海报框
    c.save(); c.beginPath(); c.rect(340, 160, 600, 420); c.clip();
    c.fillStyle = '#8FA9C4'; c.fillRect(340, 160, 600, 420);
    c.fillStyle = '#C8452F'; c.beginPath(); c.arc(640, 360, 120, 0, T); c.fill();
    c.restore();
    c.strokeStyle = '#1E1C19'; c.lineWidth = 10; c.strokeRect(340, 160, 600, 420);
    // 冲出来的元素
    c.save(); c.shadowColor = 'rgba(30,28,25,.4)'; c.shadowBlur = 20; c.shadowOffsetX = 10; c.shadowOffsetY = 14;
    c.fillStyle = '#F2C14E'; c.beginPath();
    c.arc(980, 200, 90, 0, T); c.fill();
    c.restore();
    c.fillStyle = '#1E1C19'; c.beginPath(); c.arc(950, 180, 10, 0, T); c.fill();
    c.beginPath(); c.arc(1006, 190, 10, 0, T); c.fill();
    txt(c, '海报里的东西，冲出了边框。', 90, 680, 26, '#1E1C19', '700 "Microsoft YaHei", sans-serif');
    tag(c, 'OUT OF FRAME / M36', 90, 110, 'rgba(30,28,25,.45)');
  };

  // M37 Logo 慢慢拼出来
  C.M37 = function (c, W, H) {
    var parts = [[380, 240], [860, 260], [420, 520], [880, 500], [640, 180], [300, 390], [980, 380], [640, 560]];
    parts.forEach(function (p, i) {
      c.save(); c.translate(p[0], p[1]); c.rotate(i * 0.5);
      c.fillStyle = 'rgba(91,108,255,' + (0.35 + i * 0.05) + ')';
      c.fillRect(-34, -26, 68, 52);
      c.restore();
    });
    // 中心拼合
    c.save(); c.translate(640, 380); c.rotate(0.12);
    c.fillStyle = '#5B6CFF'; c.fillRect(-90, -70, 180, 140);
    c.fillStyle = '#FF7A59'; c.fillRect(-40, -20, 80, 80);
    c.restore();
    txt(c, '碎片慢慢聚拢，最后是 logo。', 90, 660, 26, '#1A1A22', '700 "Microsoft YaHei", sans-serif');
    tag(c, 'LOGO ASSEMBLY / M37', 90, 690, 'rgba(26,26,34,.4)');
  };

  // M38 一个形状变到底
  C.M38 = function (c, W, H) {
    var st = [
      { x: 120, kind: 'button', label: '按钮' },
      { x: 420, kind: 'loader', label: '加载圈' },
      { x: 720, kind: 'player', label: '播放器' },
      { x: 1020, kind: 'slider', label: '滑块' }
    ];
    c.fillStyle = '#F4F2ED'; c.fillRect(0, 0, W, H);
    st.forEach(function (s) {
      c.save(); c.translate(s.x + 70, 340);
      if (s.kind === 'button') {
        c.fillStyle = '#2B3A55';
        if (c.roundRect) c.roundRect(-70, -24, 140, 48, 12); else c.rect(-70, -24, 140, 48);
        c.fill();
        txt(c, '开始', 0, 8, 20, '#fff', '700 "Microsoft YaHei", sans-serif', 'center');
      } else if (s.kind === 'loader') {
        c.strokeStyle = '#2B3A55'; c.lineWidth = 8;
        c.beginPath(); c.arc(0, 0, 46, 0.4, 5.2); c.stroke();
      } else if (s.kind === 'player') {
        c.fillStyle = '#2B3A55';
        if (c.roundRect) c.roundRect(-90, -60, 180, 120, 14); else c.rect(-90, -60, 180, 120);
        c.fill();
        c.fillStyle = '#fff'; c.beginPath(); c.moveTo(-12, -18); c.lineTo(24, 0); c.lineTo(-12, 18); c.closePath(); c.fill();
      } else {
        c.fillStyle = '#D5D2CA'; c.fillRect(-90, -8, 180, 16);
        c.fillStyle = '#2B3A55'; c.fillRect(-90, -8, 96, 16);
        c.beginPath(); c.arc(6, 0, 18, 0, T); c.fill();
      }
      c.restore();
      txt(c, s.label, s.x + 70, 470, 20, 'rgba(30,30,36,.6)', '500 "Microsoft YaHei", sans-serif', 'center');
      if (s.x < 1020) {
        c.fillStyle = 'rgba(30,30,36,.25)';
        c.fillRect(s.x + 170, 336, 60, 3);
      }
    });
    txt(c, '同一个形状，换成四个控件。', 90, 640, 30, '#1E1E24', '700 "Microsoft YaHei", sans-serif');
    tag(c, 'SHAPE TO UI / M38', 90, 690, 'rgba(30,30,36,.4)');
  };
})();
