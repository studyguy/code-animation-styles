// 预览图渲染共用原语。依赖 _公共函数.js 里的 rng / clamp / lerp / hex / vgrad / glowDot / offscreen / TAU
window.KIT = (function () {
  'use strict';
  var K = {};
  var T = Math.PI * 2;

  // ---------- 材质 ----------
  K.paper = function (c, w, h, base, seed, opt) {
    opt = opt || {};
    c.save();
    c.fillStyle = base; c.fillRect(0, 0, w, h);
    var r = rng(seed || 7);
    var n = opt.fibers || Math.round(w * h / 60);
    c.lineWidth = 0.7;
    for (var i = 0; i < n; i++) {
      var x = r() * w, y = r() * h, a = r() * T, l = 2 + r() * (opt.len || 16);
      c.strokeStyle = r() < 0.5 ? 'rgba(0,0,0,.032)' : 'rgba(255,255,255,.055)';
      c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); c.stroke();
    }
    c.restore();
  };

  K.grain = function (c, w, h, seed, amt) {
    amt = amt == null ? 0.05 : amt;
    var r = rng(seed || 3);
    var img = c.getImageData(0, 0, w, h), d = img.data, i;
    for (i = 0; i < d.length; i += 4) {
      var n = (r() - 0.5) * 255 * amt;
      d[i] += n; d[i + 1] += n; d[i + 2] += n;
    }
    c.putImageData(img, 0, 0);
  };

  K.scan = function (c, w, h, step, alpha) {
    c.save(); c.fillStyle = 'rgba(0,0,0,' + alpha + ')';
    for (var y = 0; y < h; y += step) c.fillRect(0, y, w, Math.max(1, step * 0.5));
    c.restore();
  };

  K.vignette = function (c, w, h, str, rgb) {
    rgb = rgb || '0,0,0'; str = str == null ? 0.5 : str;
    var g = c.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.32, w / 2, h / 2, Math.max(w, h) * 0.78);
    g.addColorStop(0, 'rgba(' + rgb + ',0)');
    g.addColorStop(1, 'rgba(' + rgb + ',' + str + ')');
    c.save(); c.fillStyle = g; c.fillRect(0, 0, w, h); c.restore();
  };

  // ---------- 形状 ----------
  K.poly = function (c, pts, fill, stroke, lw) {
    c.beginPath();
    for (var i = 0; i < pts.length; i++) {
      if (i) c.lineTo(pts[i][0], pts[i][1]); else c.moveTo(pts[i][0], pts[i][1]);
    }
    c.closePath();
    if (fill) { c.fillStyle = fill; c.fill(); }
    if (stroke) { c.strokeStyle = stroke; c.lineWidth = lw || 1; c.stroke(); }
  };

  K.roundRect = function (c, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    c.beginPath();
    c.moveTo(x + r, y);
    c.arcTo(x + w, y, x + w, y + h, r);
    c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r);
    c.arcTo(x, y, x + w, y, r);
    c.closePath();
  };

  K.line = function (c, x1, y1, x2, y2, color, lw, cap) {
    c.save();
    c.strokeStyle = color; c.lineWidth = lw; c.lineCap = cap || 'round';
    c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke();
    c.restore();
  };

  // ---------- 手绘（抖动 + 叠画两遍） ----------
  K.boil = function (c, seed, fn, amp) {
    var r = rng(seed), n = 3, i;
    amp = amp == null ? 1.6 : amp;
    for (i = 0; i < n; i++) {
      c.save();
      c.translate((r() - 0.5) * amp, (r() - 0.5) * amp);
      c.globalAlpha = i === 0 ? 1 : 0.38;
      fn(c);
      c.restore();
    }
  };

  K.strokePath = function (c, pts, color, lw, seed, close, amp) {
    var r = rng(seed || 5), j = amp == null ? 2.2 : amp;
    c.save();
    c.strokeStyle = color; c.lineWidth = lw; c.lineJoin = 'round'; c.lineCap = 'round';
    for (var pass = 0; pass < 2; pass++) {
      c.globalAlpha = pass ? 0.55 : 0.95;
      c.lineWidth = pass ? lw * 0.55 : lw;
      c.beginPath();
      for (var i = 0; i < pts.length; i++) {
        var x = pts[i][0] + (pass ? (r() - 0.5) * j : 0);
        var y = pts[i][1] + (pass ? (r() - 0.5) * j : 0);
        if (i) c.lineTo(x, y); else c.moveTo(x, y);
      }
      if (close) c.closePath();
      c.stroke();
    }
    c.restore();
  };

  K.handText = function (c, text, x, y, size, color, seed, o) {
    o = o || {};
    var r = rng(seed || 11);
    var font = (o.weight || 700) + ' ' + size + 'px ' + (o.font || 'KaiTi, STKaiti, "Kaiti SC", "Microsoft YaHei", sans-serif');
    var chars = Array.from(text);
    c.save();
    c.font = font; c.textBaseline = 'middle'; c.textAlign = 'left';
    var widths = chars.map(function (ch) { return c.measureText(ch).width; });
    var total = widths.reduce(function (a, b) { return a + b; }, 0) + (o.track || 0) * (chars.length - 1);
    var cx = o.align === 'center' ? x - total / 2 : (o.align === 'right' ? x - total : x);
    var wob = o.wobble == null ? 2.2 : o.wobble;
    var rot = o.rot == null ? 0.05 : o.rot;
    for (var i = 0; i < chars.length; i++) {
      c.save();
      c.translate(cx + widths[i] / 2, y + (r() - 0.5) * wob);
      c.rotate((r() - 0.5) * rot);
      if (o.stroke) {
        c.strokeStyle = color; c.lineWidth = Math.max(1, size * 0.035);
        c.lineJoin = 'round'; c.strokeText(chars[i], -widths[i] / 2, 0);
      }
      c.fillStyle = color; c.fillText(chars[i], -widths[i] / 2, 0);
      if (o.double) {
        c.globalAlpha = 0.35;
        c.fillText(chars[i], -widths[i] / 2 + 1, 1);
      }
      c.restore();
      cx += widths[i] + (o.track || 0);
    }
    c.restore();
    return total;
  };

  K.fitFont = function (c, text, maxW, size, family) {
    var s = size;
    while (s > 8) {
      c.font = '700 ' + s + 'px ' + (family || 'SANS');
      if (c.measureText(text).width <= maxW) break;
      s -= 1;
    }
    return s;
  };

  // ---------- 等距 ----------
  K.isoProjector = function (cx, cy, s) {
    return function (x, y, z) {
      return [cx + (x - y) * s * 0.8660254, cy + (x + y) * s * 0.5 - (z || 0) * s];
    };
  };

  K.isoBox = function (c, P, x, y, z, w, d, hh, pal) {
    var top = [P(x, y, z + hh), P(x + w, y, z + hh), P(x + w, y + d, z + hh), P(x, y + d, z + hh)];
    var left = [P(x, y + d, z + hh), P(x + w, y + d, z + hh), P(x + w, y + d, z), P(x, y + d, z)];
    var right = [P(x + w, y, z + hh), P(x + w, y + d, z + hh), P(x + w, y + d, z), P(x + w, y, z)];
    K.poly(c, left, pal.left);
    K.poly(c, right, pal.right);
    K.poly(c, top, pal.top);
    if (pal.edge) {
      K.poly(c, top, null, pal.edge, 1.2);
      K.poly(c, left, null, pal.edge, 1.2);
      K.poly(c, right, null, pal.edge, 1.2);
    }
  };

  // ---------- 海报配方（H 系列：色块 + 粗边 + 硬投影） ----------
  K.drawPoster = function (c, w, h, spec) {
    c.fillStyle = spec.bg; c.fillRect(0, 0, w, h);
    var sh = spec.shadow == null ? 12 : spec.shadow;
    var bw = spec.border == null ? 9 : spec.border;
    spec.blocks.forEach(function (b) {
      c.save();
      c.fillStyle = spec.shadowColor || '#111111';
      K.roundRect(c, b.x + sh, b.y + sh, b.w, b.h, 2); c.fill();
      c.fillStyle = b.fill;
      K.roundRect(c, b.x, b.y, b.w, b.h, 2); c.fill();
      c.strokeStyle = spec.ink || '#111'; c.lineWidth = bw;
      K.roundRect(c, b.x, b.y, b.w, b.h, 2); c.stroke();
      c.restore();
      (b.lines || []).forEach(function (ln) {
        c.save();
        c.font = (ln.weight || 800) + ' ' + ln.size + 'px ' + (ln.font || SANS);
        c.fillStyle = ln.color || spec.ink || '#111';
        c.textBaseline = 'alphabetic';
        c.fillText(ln.text, b.x + (ln.dx == null ? 40 : ln.dx), b.y + ln.y);
        c.restore();
      });
      if (b.badge) {
        var bx = b.x + b.w - 54, by = b.y + 54;
        c.beginPath(); c.arc(bx, by, 34, 0, T); c.fillStyle = spec.ink || '#111'; c.fill();
        c.fillStyle = '#fff'; c.font = '800 30px ' + MONO; c.textAlign = 'center'; c.textBaseline = 'middle';
        c.fillText(b.badge, bx, by + 2); c.textAlign = 'left';
      }
      if (b.button) {
        var bt = b.button, x = b.x + bt.x, y = b.y + bt.y;
        c.fillStyle = spec.ink || '#111';
        K.roundRect(c, x + 7, y + 7, bt.w, bt.h, 2); c.fill();
        c.fillStyle = '#fff';
        K.roundRect(c, x, y, bt.w, bt.h, 2); c.fill();
        c.strokeStyle = spec.ink || '#111'; c.lineWidth = 5;
        K.roundRect(c, x, y, bt.w, bt.h, 2); c.stroke();
        c.fillStyle = spec.ink || '#111'; c.font = '800 26px ' + SANS;
        c.textAlign = 'center'; c.textBaseline = 'middle';
        c.fillText(bt.text, x + bt.w / 2, y + bt.h / 2 + 1);
        c.textAlign = 'left';
      }
    });
  };

  return K;
})();
