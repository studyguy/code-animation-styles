// M 系列预览（M2–M20）
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
  function person(c, x, y, s, ink, fill) {
    c.save(); c.translate(x, y); c.scale(s, s);
    c.fillStyle = fill || ink;
    c.beginPath(); c.arc(0, -54, 24, 0, T); c.fill();
    c.beginPath(); c.moveTo(-26, -24); c.lineTo(26, -24); c.lineTo(34, 60); c.lineTo(-34, 60); c.closePath(); c.fill();
    c.fillRect(-32, 60, 18, 56); c.fillRect(14, 60, 18, 56);
    c.restore();
  }

  // M2 纸感手写笔记
  C.M2 = function (c, W, H) {
    var paper = '#F9F4E8', ink = '#2B2622', red = '#C8452F';
    strip3(c, W, H, {
      bg: '#EFE7D6', ink: ink, panelBg: paper,
      title: 'M2 纸感手写笔记', right: '20s · 一笔一笔写出来',
      frames: [
        function (g, w, h) { KIT.handText(g, '今天讲三件事', 30, 70, 40, ink, 1, { font: 'KaiTi, "Microsoft YaHei", sans-serif' }); },
        function (g, w, h) {
          KIT.handText(g, '今天讲三件事', 30, 70, 40, ink, 1, { font: 'KaiTi, "Microsoft YaHei", sans-serif' });
          KIT.handText(g, '一、先说结论', 36, 180, 34, ink, 2, { font: 'KaiTi, "Microsoft YaHei", sans-serif' });
          KIT.strokePath(g, [[36, 196], [300, 200]], red, 6, 3, false, 2);
        },
        function (g, w, h) {
          KIT.handText(g, '一、先说结论', 36, 180, 34, ink, 2, { font: 'KaiTi, "Microsoft YaHei", sans-serif' });
          KIT.handText(g, '二、再拆三步', 36, 250, 34, ink, 4, { font: 'KaiTi, "Microsoft YaHei", sans-serif' });
          KIT.handText(g, '三、最后收尾', 36, 320, 34, ink, 5, { font: 'KaiTi, "Microsoft YaHei", sans-serif' });
          g.fillStyle = 'rgba(255,220,120,.75)'; g.fillRect(30, 292, 250, 34);
          KIT.handText(g, '三、最后收尾', 36, 320, 34, ink, 5, { font: 'KaiTi, "Microsoft YaHei", sans-serif' });
        }
      ]
    });
  };

  // M3 文字建筑
  C.M3 = function (c, W, H) {
    var bg = '#F2EEE6', ink = '#1C1B19', accent = '#D6452F';
    strip3(c, W, H, {
      bg: bg, ink: ink, panelBg: '#FAF7F0',
      title: 'M3 文字建筑', right: '词是梁、柱、地板',
      frames: [
        function (g, w, h) {
          g.fillStyle = ink; g.fillRect(40, h - 120, 300, 24);
          txt(g, '因为', 44, h - 138, 38, ink, '800 "Microsoft YaHei", sans-serif');
        },
        function (g, w, h) {
          g.fillStyle = ink; g.fillRect(40, h - 120, 300, 24);
          g.fillRect(60, 210, 24, h - 330); g.fillRect(296, 210, 24, h - 330);
          g.fillRect(60, 210, 260, 22);
          txt(g, '所以', 72, 190, 32, ink, '800 "Microsoft YaHei", sans-serif');
          txt(g, '但是', 262, 190, 32, ink, '800 "Microsoft YaHei", sans-serif');
        },
        function (g, w, h) {
          g.fillStyle = ink; g.fillRect(40, h - 120, 300, 24);
          g.fillRect(60, 210, 24, h - 330); g.fillRect(296, 210, 24, h - 330);
          g.fillRect(60, 210, 260, 22);
          g.fillStyle = accent; g.fillRect(40, h - 226, 300, 44);
          txt(g, '所以', 72, 190, 32, ink, '800 "Microsoft YaHei", sans-serif');
          txt(g, '但是', 262, 190, 32, ink, '800 "Microsoft YaHei", sans-serif');
          txt(g, '这句话站住了', 56, h - 196, 28, '#fff', '800 "Microsoft YaHei", sans-serif');
        }
      ]
    });
  };

  // M4 一个元素串全片
  C.M4 = function (c, W, H) {
    var bg = '#F7F5EF', ink = '#22201D', accent = '#F26B3A';
    strip3(c, W, H, {
      bg: bg, ink: ink, panelBg: '#FFFFFF',
      title: 'M4 一个元素串全片', right: '它先是一个点',
      frames: [
        function (g, w, h) {
          g.strokeStyle = 'rgba(34,32,29,.10)'; g.lineWidth = 1;
          for (var i = 0; i < 6; i++) { g.beginPath(); g.moveTo(0, 90 + i * 80); g.lineTo(w, 90 + i * 80); g.stroke(); }
          g.fillStyle = accent; g.beginPath(); g.arc(w / 2, h / 2, 62, 0, T); g.fill();
          g.fillStyle = 'rgba(255,255,255,.5)'; g.beginPath(); g.arc(w / 2 - 18, h / 2 - 20, 16, 0, T); g.fill();
        },
        function (g, w, h) {
          g.strokeStyle = accent; g.lineWidth = 9; g.lineCap = 'round';
          g.beginPath(); g.moveTo(50, h / 2); g.lineTo(w - 90, h / 2); g.stroke();
          g.beginPath(); g.arc(w - 60, h / 2, 34, 0, T); g.stroke();
          g.fillStyle = accent; g.beginPath(); g.arc(50, h / 2, 26, 0, T); g.fill();
        },
        function (g, w, h) {
          g.strokeStyle = accent; g.lineWidth = 9; g.beginPath();
          g.moveTo(46, h / 2); g.bezierCurveTo(w * 0.3, h * 0.18, w * 0.62, h * 0.82, w - 46, h / 2); g.stroke();
          g.fillStyle = accent; g.beginPath(); g.arc(46, h / 2, 22, 0, T); g.fill();
          g.beginPath(); g.arc(w - 46, h / 2, 22, 0, T); g.fill();
          g.fillStyle = 'rgba(34,32,29,.35)'; g.fillRect(46, h - 70, w - 92, 2);
        }
      ]
    });
  };

  // M5 一镜到底
  C.M5 = function (c, W, H) {
    var bg = '#F4F1EA', ink = '#1F1D1A';
    strip3(c, W, H, {
      bg: bg, ink: ink, panelBg: '#FCFAF5',
      title: 'M5 一镜到底', right: '不切镜头，从上一个场景里长出来',
      frames: [
        function (g, w, h) {
          g.fillStyle = '#D9CBB2'; g.fillRect(50, h - 140, 300, 90);
          g.fillStyle = '#8FA9C4'; g.fillRect(50, h - 230, 300, 90);
          g.strokeStyle = ink; g.lineWidth = 3; g.beginPath(); g.moveTo(50, h - 230); g.lineTo(350, h - 230); g.stroke();
        },
        function (g, w, h) {
          g.fillStyle = '#D9CBB2'; g.fillRect(50, h - 140, 300, 90);
          g.fillStyle = '#8FA9C4'; g.fillRect(50, h - 230, 300, 90);
          g.strokeStyle = ink; g.lineWidth = 3;
          g.beginPath(); g.moveTo(300, h - 230); g.lineTo(300, 120); g.lineTo(200, 120); g.stroke();
        },
        function (g, w, h) {
          g.fillStyle = '#D9CBB2'; g.fillRect(50, h - 140, 300, 90);
          g.fillStyle = '#8FA9C4'; g.fillRect(50, h - 230, 300, 90);
          g.fillStyle = '#E8A04A'; g.fillRect(230, 90, 140, 90);
          g.strokeStyle = ink; g.lineWidth = 3; g.strokeRect(230, 90, 140, 90);
          txt(g, '同一个镜头', 70, 80, 18, 'rgba(31,29,26,.5)', '500 "Microsoft YaHei", sans-serif');
        }
      ]
    });
  };

  // M6 苹果发布会风
  C.M6 = function (c, W, H) {
    var g = c.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#F4FAFF'); g.addColorStop(1, '#D8E9F7');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    var glow = c.createRadialGradient(W / 2, 330, 40, W / 2, 330, 520);
    glow.addColorStop(0, 'rgba(120,180,240,.35)'); glow.addColorStop(1, 'rgba(120,180,240,0)');
    c.fillStyle = glow; c.fillRect(0, 0, W, H);
    c.save(); c.shadowColor = 'rgba(70,110,160,.35)'; c.shadowBlur = 60; c.shadowOffsetY = 30;
    c.fillStyle = '#FFFFFF';
    if (c.roundRect) c.roundRect(420, 200, 440, 270, 40); else c.rect(420, 200, 440, 270);
    c.fill(); c.restore();
    var scr = c.createLinearGradient(460, 240, 820, 430);
    scr.addColorStop(0, '#8FC6F2'); scr.addColorStop(1, '#3C7BC4');
    c.fillStyle = scr;
    if (c.roundRect) c.roundRect(460, 240, 360, 190, 26); else c.rect(460, 240, 360, 190);
    c.fill();
    c.save(); c.globalAlpha = 0.45; c.fillStyle = '#fff';
    c.beginPath(); c.moveTo(460, 240); c.lineTo(610, 240); c.lineTo(500, 430); c.lineTo(460, 430); c.closePath(); c.fill();
    c.restore();
    txt(c, 'SOFT', 420, 150, 44, 'rgba(30,60,95,.85)', '800 ' + SANS);
    txt(c, '轻一点，亮一点，镜头别停。', 422, 566, 30, 'rgba(30,60,95,.9)', '600 "Microsoft YaHei", sans-serif');
    txt(c, 'THE NEW THING', 424, 606, 16, 'rgba(30,60,95,.45)', MONO);
    tag(c, 'APPLE KEYNOTE / M6', 424, 660, 'rgba(30,60,95,.4)');
  };

  // M7 极简卡点
  C.M7 = function (c, W, H) {
    strip3(c, W, H, {
      bg: '#FFFFFF', ink: '#161616', panelBg: '#FFFFFF', border: 'rgba(0,0,0,.12)',
      title: 'M7 极简卡点', right: '一刀一拍，一个强调色',
      frames: [
        function (g, w, h) { g.fillStyle = '#E8402C'; g.fillRect(w / 2 - 40, h / 2 - 40, 80, 80); },
        function (g, w, h) { g.fillStyle = '#161616'; g.beginPath(); g.arc(w / 2, h / 2, 56, 0, T); g.fill(); },
        function (g, w, h) {
          g.fillStyle = '#161616'; g.fillRect(60, h / 2 - 6, w - 120, 12);
          g.fillStyle = '#E8402C'; g.beginPath(); g.arc(w / 2, h / 2, 26, 0, T); g.fill();
        }
      ],
      numColor: 'rgba(0,0,0,.3)'
    });
  };

  // M8 口播 + 逐字字幕
  C.M8 = function (c, W, H) {
    c.fillStyle = '#FBFAF7'; c.fillRect(0, 0, W, H);
    // 人物剪影
    c.fillStyle = '#D9D3C7'; c.beginPath(); c.arc(400, 330, 78, 0, T); c.fill();
    c.beginPath(); c.ellipse(400, 560, 150, 170, 0, Math.PI, T); c.fill();
    // 字幕
    var line = '这句话，值得一个字一个字说。';
    c.font = '800 54px ' + SANS; c.textBaseline = 'alphabetic';
    var x = 120, y = 640;
    var hi = 4;
    for (var i = 0; i < line.length; i++) {
      var ch = line[i];
      c.fillStyle = i === hi ? '#E8402C' : 'rgba(22,22,22,.9)';
      c.fillText(ch, x, y);
      x += c.measureText(ch).width + 4;
    }
    c.strokeStyle = 'rgba(22,22,22,.12)'; c.lineWidth = 2; c.beginPath(); c.moveTo(120, 664); c.lineTo(1160, 664); c.stroke();
    tag(c, 'TALKING HEAD + WORD-BY-WORD / M8', 90, 690, 'rgba(22,22,22,.4)');
  };

  // M9 情绪弧线
  C.M9 = function (c, W, H) {
    strip3(c, W, H, {
      bg: '#F5F2EC', ink: '#1E1C19', panelBg: '#FFFFFF',
      title: 'M9 混乱 → 掌控 → 清晰', right: '一条弧线走到底',
      frames: [
        function (g, w, h) {
          var r = rng(91);
          for (var i = 0; i < 40; i++) {
            g.save(); g.translate(r() * w, r() * h); g.rotate(r() * T);
            g.fillStyle = 'rgba(30,28,25,' + (0.2 + r() * 0.5) + ')';
            g.fillRect(-20, -4, 8 + r() * 40, 8); g.restore();
          }
        },
        function (g, w, h) {
          var r = rng(92);
          for (var i = 0; i < 16; i++) {
            var x = 40 + (i % 4) * 90, y = 80 + Math.floor(i / 4) * 130;
            g.strokeStyle = 'rgba(30,28,25,.55)'; g.lineWidth = 3; g.strokeRect(x, y, 70, 70);
          }
        },
        function (g, w, h) {
          g.fillStyle = '#1E1C19'; g.fillRect(40, 120, w - 80, 8);
          g.fillRect(40, 200, w - 180, 8);
          g.fillRect(40, 280, w - 120, 8);
          txt(g, '一句话说清', 40, 420, 30, '#1E1C19', '800 "Microsoft YaHei", sans-serif');
        }
      ]
    });
  };

  // M10 抽象概念做成画面
  C.M10 = function (c, W, H) {
    strip3(c, W, H, {
      bg: '#101018', ink: '#EDEAF2', panelBg: '#16161F', border: 'rgba(255,255,255,.12)', numColor: 'rgba(255,255,255,.35)',
      title: 'M10 把抽象做成画面', right: '颜色和形状的变化',
      frames: [
        function (g, w, h) {
          g.fillStyle = '#5B6CFF'; g.beginPath(); g.arc(w / 2, h / 2, 110, 0, T); g.fill();
        },
        function (g, w, h) {
          g.fillStyle = 'rgba(91,108,255,.7)';
          for (var i = 0; i < 5; i++) { g.beginPath(); g.arc(w / 2, h / 2, 110 - i * 20, 0, T); g.fill(); }
          g.fillStyle = '#FF7A59'; g.beginPath(); g.arc(w / 2, h / 2, 34, 0, T); g.fill();
        },
        function (g, w, h) {
          g.strokeStyle = 'rgba(237,234,242,.85)'; g.lineWidth = 3;
          for (var i = 0; i < 7; i++) {
            g.beginPath();
            for (var x = 20; x < w - 20; x += 6) {
              var y = h / 2 + Math.sin(x / 40 + i * 0.6) * (30 + i * 12);
              x === 20 ? g.moveTo(x, y) : g.lineTo(x, y);
            }
            g.stroke();
          }
          txt(g, '说不出的感觉', 40, h - 60, 22, 'rgba(237,234,242,.7)', '500 "Microsoft YaHei", sans-serif');
        }
      ]
    });
  };

  // M11 人生循环
  C.M11 = function (c, W, H) {
    var ink = '#2A241C';
    strip3(c, W, H, {
      bg: '#F6F1E6', ink: ink, panelBg: '#FDF9F0',
      title: 'M11 人生循环', right: '同一人，从小到老，接回开头',
      frames: [
        function (g, w, h) { person(g, w / 2, h / 2 + 60, 0.8, ink, '#8FB7D9'); },
        function (g, w, h) { person(g, w / 2, h / 2 + 40, 1.1, ink, '#C9A66B'); },
        function (g, w, h) {
          person(g, w / 2, h / 2 + 40, 1.05, ink, '#9AA6B2');
          g.strokeStyle = '#C8452F'; g.lineWidth = 4;
          g.beginPath(); g.arc(w / 2, h / 2 - 40, 150, -0.5, 3.2); g.stroke();
          g.beginPath(); g.moveTo(w / 2 + 130, h / 2 - 130); g.lineTo(w / 2 + 156, h / 2 - 104);
          g.lineTo(w / 2 + 118, h / 2 - 98); g.fillStyle = '#C8452F'; g.fill();
        }
      ]
    });
  };

  // M12 剪纸皮影
  C.M12 = function (c, W, H) {
    strip3(c, W, H, {
      bg: '#17100C', ink: '#F2C98A', panelBg: '#2A1B12', border: 'rgba(242,201,138,.2)', numColor: 'rgba(242,201,138,.5)',
      title: 'M12 剪纸皮影', right: '光在幕后，影在动',
      frames: [0, 1, 2].map(function (k) {
        return function (g, w, h) {
          var lg = g.createRadialGradient(w / 2, h / 2, 20, w / 2, h / 2, 260);
          lg.addColorStop(0, 'rgba(255,220,150,.28)'); lg.addColorStop(1, 'rgba(255,220,150,0)');
          g.fillStyle = lg; g.fillRect(0, 0, w, h);
          g.save(); g.translate(w / 2, h / 2 + 20); g.rotate(-0.1 + k * 0.1);
          g.fillStyle = 'rgba(214,62,48,.9)'; g.strokeStyle = 'rgba(255,214,140,.85)'; g.lineWidth = 2;
          g.beginPath(); g.arc(0, -110, 32, 0, T); g.fill(); g.stroke();
          g.beginPath(); g.moveTo(-30, -80); g.lineTo(30, -80); g.lineTo(40, 60); g.lineTo(-40, 60); g.closePath(); g.fill(); g.stroke();
          g.beginPath(); g.moveTo(-30, 60); g.lineTo(-70, 150 - k * 16); g.moveTo(30, 60); g.lineTo(70, 150 - k * 16);
          g.stroke();
          g.beginPath(); g.moveTo(-26, -50); g.lineTo(-100, -10 + k * 24); g.stroke();
          g.beginPath(); g.moveTo(26, -50); g.lineTo(100, -10 + k * 24); g.stroke();
          g.restore();
        };
      })
    });
  };

  // M13 手绘定格，第一人称
  C.M13 = function (c, W, H) {
    strip3(c, W, H, {
      bg: '#F3EEE2', ink: '#1C1A17', panelBg: '#FBF7EC',
      title: 'M13 手绘定格 · 第一人称', right: '一帧一帧，有点抖',
      frames: [0, 1, 2].map(function (k) {
        return function (g, w, h) {
          var j = [-1.6, 0.8, 1.4][k];
          g.save(); g.translate(w / 2 + j, h / 2 + j);
          g.strokeStyle = '#1C1A17'; g.lineWidth = 7; g.lineCap = 'round';
          g.beginPath(); g.arc(0, -70, 62, 0, T); g.stroke();
          g.beginPath(); g.arc(0, -70, 66, 0.5, 3.4); g.stroke();
          g.fillStyle = '#1C1A17';
          g.beginPath(); g.arc(-22, -82, 7, 0, T); g.fill();
          g.beginPath(); g.arc(24, -82, 7, 0, T); g.fill();
          g.beginPath(); g.arc(0, -56, 18, 0.3, Math.PI - 0.3); g.stroke();
          g.beginPath(); g.moveTo(0, -8); g.lineTo(0, 110 + k * 12); g.stroke();
          g.beginPath(); g.moveTo(0, 20); g.lineTo(-80 - k * 10, 60); g.moveTo(0, 20); g.lineTo(80 + k * 10, 60); g.stroke();
          g.restore();
        };
      })
    });
  };

  // M18 3Blue1Brown
  C.M18 = function (c, W, H) {
    var bg = '#0C1018', chalk = '#DCE6F2', cyan = '#5AC8E0', gold = '#F2C14E';
    c.fillStyle = bg; c.fillRect(0, 0, W, H);
    var r = rng(181);
    for (var i = 0; i < 240; i++) {
      c.fillStyle = 'rgba(220,230,242,' + (0.02 + r() * 0.06) + ')';
      c.fillRect(r() * W, r() * H, 1.4, 1.4);
    }
    txt(c, 'f(x) = x²', 100, 220, 60, chalk, '500 ' + MONO);
    txt(c, "f'(x) = 2x", 100, 300, 60, cyan, '500 ' + MONO);
    txt(c, '斜率在每一处都不一样。', 102, 360, 26, 'rgba(220,230,242,.55)', '400 "Microsoft YaHei", sans-serif');
    // 曲线
    c.strokeStyle = gold; c.lineWidth = 4;
    c.beginPath();
    for (var x = 0; x <= 520; x += 4) {
      var px = 700 + x, py = 620 - (x / 520) * (x / 520) * 420;
      x ? c.lineTo(px, py) : c.moveTo(px, py);
    }
    c.stroke();
    // 切线
    c.strokeStyle = cyan; c.lineWidth = 3;
    var t = 0.62, tx = 700 + 520 * t, ty = 620 - 420 * t * t;
    c.beginPath(); c.moveTo(tx - 120, ty + 2 * t * 420 * (120 / 520)); c.lineTo(tx + 120, ty - 2 * t * 420 * (120 / 520)); c.stroke();
    c.fillStyle = '#fff'; c.beginPath(); c.arc(tx, ty, 6, 0, T); c.fill();
    tag(c, '3BLUE1BROWN / M18', 100, 690, 'rgba(220,230,242,.4)');
  };

  // M19 零基础科普
  C.M19 = function (c, W, H) {
    c.fillStyle = '#FBF8F1'; c.fillRect(0, 0, W, H);
    txt(c, '从一杯奶茶说起', 90, 150, 52, '#2A241C', '800 "Microsoft YaHei", sans-serif');
    // 杯子
    c.fillStyle = '#E8D5B5'; c.beginPath();
    c.moveTo(200, 280); c.lineTo(360, 280); c.lineTo(330, 520); c.lineTo(230, 520); c.closePath(); c.fill();
    c.fillStyle = '#8B5E3C'; c.fillRect(210, 340, 140, 170);
    c.fillStyle = '#F2E4CC'; c.fillRect(210, 300, 140, 40);
    // 三个箭头 + 词
    [[430, '珍珠'], [640, '糖'], [850, '奶']].forEach(function (p, i) {
      c.strokeStyle = '#C8452F'; c.lineWidth = 6; c.lineCap = 'round';
      c.beginPath(); c.moveTo(p[0] - 60, 400 + i * 40); c.lineTo(p[0], 400 + i * 40); c.stroke();
      txt(c, p[1], p[0] + 20, 410 + i * 40, 30, '#2A241C', '700 "Microsoft YaHei", sans-serif');
    });
    txt(c, '生活里的东西 → 专业词 → 原理', 90, 620, 26, 'rgba(42,36,28,.55)', '500 "Microsoft YaHei", sans-serif');
    tag(c, 'BEGINNER EXPLAINER / M19', 90, 690, 'rgba(42,36,28,.4)');
  };

  // M20 时间线
  C.M20 = function (c, W, H) {
    c.fillStyle = '#F7F3E9'; c.fillRect(0, 0, W, H);
    c.strokeStyle = '#2A241C'; c.lineWidth = 6; c.lineCap = 'round';
    c.beginPath(); c.moveTo(100, 400); c.lineTo(1180, 400); c.stroke();
    var nodes = [[220, '2008', '第一次'], [480, '2014', '转折'], [740, '2019', '爆发'], [1000, '2026', '现在']];
    nodes.forEach(function (n, i) {
      c.fillStyle = '#C8452F'; c.beginPath(); c.arc(n[0], 400, 16, 0, T); c.fill();
      c.strokeStyle = '#2A241C'; c.lineWidth = 3;
      c.beginPath(); c.moveTo(n[0], 384); c.lineTo(n[0], 330 - i * 10); c.stroke();
      txt(c, n[1], n[0] - 24, 300 - i * 10, 22, '#2A241C', '700 ' + MONO);
      txt(c, n[2], n[0] - 22, 460 + i * 8, 24, 'rgba(42,36,28,.7)', '500 "Microsoft YaHei", sans-serif');
    });
    txt(c, '时间往前走，事一件一件发生。', 100, 620, 30, '#2A241C', '700 "Microsoft YaHei", sans-serif');
    tag(c, 'TIMELINE / M20', 100, 690, 'rgba(42,36,28,.4)');
  };
})();
