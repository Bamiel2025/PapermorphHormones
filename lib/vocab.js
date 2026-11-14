/* Bibliothèque graphique partagée pour « Contrôle hormonal, reproduction et contraception » (SVT 4e).
   Chargée après lib/engine.js et lib/lang-fr.js, avant audio/fr/timings.js. */
'use strict';

const C_BRAIN = '#f27c6e';
const C_SEX = '#4cd4aa';
const C_ESTRO = '#f6b952';
const C_PROG = '#a98cf2';
const C_BLOOD = '#5bc0f8';
const C_PILULE = '#e85d75';
const C_INK = '#f4f8fc';

(function horSyncThemeColors() {
  COL.board = '#102030';
  COL.panel = '#152b40';
  COL.chalk = C_INK;
  COL.dim = '#a8c4da';
  COL.faint = '#496a88';
  COL.task = C_BLOOD;
  COL.good = C_SEX;
  COL.bad = C_BRAIN;
  COL.int = C_ESTRO;
  COL.nat = C_PROG;
  COL.whole = C_BLOOD;
})();

function horText(p, str, x, y, t0, { size = 26, fill = COL.chalk, anchor = 'start', weight = 500, font = UI } = {}) {
  const e = T(p, str, { x, y, size, fill, anchor, weight, font, o: 0 });
  show(e, t0, .45);
  return e;
}

function horTitle(p, str, y = 68, t0 = .05, sub = '') {
  const g = G(p, { o: 0 });
  T(g, str, { x: 800, y, size: 42, weight: 700, fill: COL.chalk, anchor: 'middle' });
  if (sub) T(g, sub, { x: 800, y: y + 38, size: 24, weight: 400, fill: COL.dim, anchor: 'middle' });
  show(g, t0, .45);
  return g;
}

function horCard(p, x, y, w, h, { title = '', color = '#2f5170', fill = '#152b40', rx = 18, t0 = null, o = 1 } = {}) {
  const g = G(p, { x, y, o: t0 !== null ? 0 : o });
  mk('rect', { x: 0, y: 0, width: w, height: h, rx, fill, stroke: color, 'stroke-width': 2.5 }, g);
  if (title) {
    mk('rect', { x: 0, y: 0, width: w, height: 48, rx, fill: mix('#102030', color, .22) }, g);
    mk('rect', { x: 0, y: 30, width: w, height: 18, fill: mix('#102030', color, .22) }, g);
    mk('line', { x1: 0, y1: 48, x2: w, y2: 48, stroke: color, 'stroke-width': 1.5, opacity: .65 }, g);
    T(g, title, { x: w / 2, y: 33, size: 23, weight: 700, fill: color === '#2f5170' ? COL.chalk : color, anchor: 'middle' });
  }
  if (t0 !== null) show(g, t0, .45);
  return g;
}

function horPill(p, cx, cy, label, color = C_SEX, t0 = null, { w = null, h = 42, size = 21 } = {}) {
  const width = w || Math.max(120, label.length * (size * .58) + 42);
  const g = G(p, { x: cx, y: cy, o: t0 !== null ? 0 : 1 });
  mk('rect', {
    x: -width / 2, y: -h / 2, width, height: h, rx: h / 2,
    fill: mix('#102030', color, .24), stroke: color, 'stroke-width': 2.2,
  }, g);
  T(g, label, { x: 0, y: size * .34, size, weight: 700, fill: color, anchor: 'middle' });
  if (t0 !== null) show(g, t0, .4);
  return g;
}

function horArrow(p, x1, y1, x2, y2, t0, { color = COL.dim, sw = 4, curve = 0, dur = .55, dashed = false } = {}) {
  const g = G(p, { o: 1 });
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len, ny = dx / len;
  const cx = mx + nx * curve, cy = my + ny * curve;
  const d = curve ? `M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}` : `M${x1} ${y1} L${x2} ${y2}`;
  const attrs = { stroke: color, 'stroke-width': sw };
  if (dashed) attrs['stroke-dasharray'] = '10 6';
  const ln = path(g, d, attrs, dashed ? { o: 0 } : { d: 0 });
  const tx = curve ? x2 - cx : dx, ty = curve ? y2 - cy : dy;
  const tlen = Math.hypot(tx, ty) || 1;
  const ux = tx / tlen, uy = ty / tlen;
  const ax = x2 - ux * 14, ay = y2 - uy * 14;
  const px = -uy * 8, py = ux * 8;
  const head = path(g, `M${ax + px} ${ay + py} L${x2} ${y2} L${ax - px} ${ay - py}`, { stroke: color, 'stroke-width': sw }, { o: 0 });
  if (dashed) {
    show(ln, t0, .35);
  } else {
    draw(ln, t0, dur);
  }
  show(head, t0 + Math.max(.05, dur - .14), .2);
  return g;
}

let _horClipSeq = 0;

function horDoc(p, href, x, y, w, h, {
  color = C_BLOOD, pad = 10, rx = 14, caption = '', sub = '', t0 = null, o = 1,
} = {}) {
  const clipId = `hor-doc-clip-${++_horClipSeq}`;
  const g = G(p, { x, y, o: t0 !== null ? 0 : o });
  mk('rect', {
    x: 0, y: 0, width: w, height: h, rx,
    fill: '#ffffff', stroke: color, 'stroke-width': 2.5,
  }, g);
  const defs = mk('defs', {}, g);
  const cp = mk('clipPath', { id: clipId }, defs);
  mk('rect', { x: pad, y: pad, width: w - 2 * pad, height: h - 2 * pad, rx: Math.max(4, rx - 4) }, cp);
  mk('image', {
    href, x: pad, y: pad, width: w - 2 * pad, height: h - 2 * pad,
    preserveAspectRatio: 'xMidYMid meet', 'clip-path': `url(#${clipId})`,
  }, g);
  if (caption) T(g, caption, { x: w / 2, y: h + 30, size: 21, weight: 700, fill: COL.chalk, anchor: 'middle' });
  if (sub) T(g, sub, { x: w / 2, y: h + (caption ? 56 : 28), size: 17, fill: COL.dim, anchor: 'middle' });
  if (t0 !== null) show(g, t0, .45);
  return g;
}

function horSpotlight(p, x, y, w, h, color = C_ESTRO, t0 = .2, dur = .4, { rx = 10, fillOpacity = .12 } = {}) {
  const r = mk('rect', {
    x, y, width: w, height: h, rx,
    fill: color, 'fill-opacity': fillOpacity,
    stroke: color, 'stroke-width': 3.5, 'stroke-dasharray': '10 6',
    opacity: 0,
  }, p);
  show(r, t0, dur);
  return r;
}

function horSchemaNode(p, cx, cy, w, h, label, {
  kind = 'rect', color = C_SEX, fill = null, sub = '', t0 = null, size = 21,
} = {}) {
  const g = G(p, { x: cx, y: cy, o: t0 !== null ? 0 : 1 });
  const bg = fill || mix('#102030', color, .22);
  if (kind === 'diamond') {
    mk('polygon', {
      points: `0,${-h / 2} ${w / 2},0 0,${h / 2} ${-w / 2},0`,
      fill: bg, stroke: color, 'stroke-width': 2.5, 'stroke-linejoin': 'round',
    }, g);
  } else if (kind === 'circle') {
    const r = Math.min(w, h) / 2;
    mk('circle', { r, fill: bg, stroke: color, 'stroke-width': 2.8 }, g);
  } else {
    mk('rect', {
      x: -w / 2, y: -h / 2, width: w, height: h, rx: kind === 'pill' ? h / 2 : 14,
      fill: bg, stroke: color, 'stroke-width': 2.5,
    }, g);
  }
  const lines = Array.isArray(label) ? label : [label];
  const lineH = size * 1.24;
  const startY = sub ? -lineH * (lines.length - 1) / 2 - 4 : -lineH * (lines.length - 1) / 2 + size * .32;
  lines.forEach((ln, idx) => {
    T(g, ln, { x: 0, y: startY + idx * lineH, size, weight: 700, fill: COL.chalk, anchor: 'middle' });
  });
  if (sub) T(g, sub, { x: 0, y: h / 2 + 24, size: 17, fill: color, anchor: 'middle' });
  if (t0 !== null) show(g, t0, .45);
  return g;
}

function horBloodStream(p, x1, y1, x2, y2, color = C_BLOOD, t0 = .2, dur = .75, { droplets = 5, radius = 7, bend = 0 } = {}) {
  const g = G(p, { o: 0 });
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
  const cx = mx + (-dy / len) * bend, cy = my + (dx / len) * bend;
  const d = bend ? `M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}` : `M${x1} ${y1} L${x2} ${y2}`;
  path(g, d, { stroke: '#6c2b3d', 'stroke-width': 24, 'stroke-linecap': 'round' });
  path(g, d, { stroke: '#361824', 'stroke-width': 15, 'stroke-linecap': 'round' });
  show(g, t0, .35);
  for (let i = 0; i < droplets; i++) {
    const k0 = i / droplets;
    const px = bend
      ? (1 - k0) * (1 - k0) * x1 + 2 * (1 - k0) * k0 * cx + k0 * k0 * x2
      : x1 + dx * k0;
    const py = bend
      ? (1 - k0) * (1 - k0) * y1 + 2 * (1 - k0) * k0 * cy + k0 * k0 * y2
      : y1 + dy * k0;
    const dot = mk('circle', { cx: px, cy: py, r: radius, fill: color, stroke: COL.chalk, 'stroke-width': 1.2, opacity: 0 }, g);
    const ti = t0 + .15 + (i / droplets) * (dur * .6);
    show(dot, ti, .25);
    if (!bend) {
      tw(dot, { x: dx * (1 - k0) * .55, y: dy * (1 - k0) * .55 }, ti, dur * .85, out);
    }
  }
  return g;
}

function horBlockBadge(p, cx, cy, color = C_PILULE, t0 = .2, r = 16) {
  const g = G(p, { x: cx, y: cy, o: 0 });
  mk('circle', { r, fill: mix('#102030', color, .35), stroke: color, 'stroke-width': 2.5 }, g);
  mk('line', { x1: -r * .48, y1: 0, x2: r * .48, y2: 0, stroke: COL.chalk, 'stroke-width': 3.5, 'stroke-linecap': 'round' }, g);
  show(g, t0, .35);
  return g;
}

function horMucosaStage(p, x, y, w, h, { stage = 'grow', t0 = .2, label = '', color = C_SEX } = {}) {
  const g = G(p, { x, y, o: 0 });
  mk('rect', {
    x: 0, y: 0, width: w, height: h, rx: 12,
    fill: mix('#102030', '#1d3650', .4), stroke: color, 'stroke-width': 2,
  }, g);
  // Base musculaire de la paroi (myomètre)
  const baseY = h - 22;
  mk('rect', { x: 8, y: baseY, width: w - 16, height: 14, rx: 4, fill: '#4f3a4f' }, g);
  const specs = {
    thin: { mh: 18, glands: 0, vessels: false, shed: false },
    menstruation: { mh: 26, glands: 2, vessels: true, shed: true },
    grow: { mh: 48, glands: 4, vessels: true, shed: false },
    thick: { mh: 76, glands: 6, vessels: true, shed: false },
  };
  const cfg = specs[stage] || specs.grow;
  const topY = baseY - cfg.mh;
  mk('rect', {
    x: 8, y: topY, width: w - 16, height: cfg.mh, rx: 6,
    fill: mix('#6a2232', '#b84256', stage === 'thin' ? .2 : .7),
    stroke: '#df7888', 'stroke-width': 1.5,
  }, g);
  if (cfg.glands > 0) {
    const step = (w - 36) / cfg.glands;
    for (let i = 0; i < cfg.glands; i++) {
      const gx = 24 + i * step;
      const d = `M${gx} ${topY + 4} Q${gx - 7} ${topY + cfg.mh * .35} ${gx + 4} ${topY + cfg.mh * .62} T${gx} ${baseY - 4}`;
      path(g, d, { stroke: '#ffd1dc', 'stroke-width': 2 });
    }
  }
  if (cfg.vessels) {
    const step = (w - 40) / 3;
    for (let i = 0; i < 3; i++) {
      const vx = 34 + i * step;
      path(g, `M${vx} ${baseY} Q${vx + 8} ${topY + cfg.mh * .5} ${vx - 4} ${topY + 8}`, {
        stroke: '#5bc0f8', 'stroke-width': 2,
      });
    }
  }
  if (cfg.shed) {
    [w * .25, w * .52, w * .76].forEach((sx, idx) => {
      mk('circle', { cx: sx, cy: topY - 10 - (idx % 2) * 8, r: 5, fill: '#f27c6e' }, g);
    });
  }
  if (label) T(g, label, { x: w / 2, y: h + 26, size: 19, weight: 700, fill: color, anchor: 'middle' });
  show(g, t0, .45);
  return g;
}
