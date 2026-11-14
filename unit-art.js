'use strict';
(() => {
  let k = 0;
  const P = (d, cls = '', extra = '') => `<path class="d ${cls}" pathLength="1" style="--k:${k++}" d="${d}" ${extra}/>`;
  const Tx = (x, y, s, size = 20, cls = '', anchor = 'middle') => `<text class="t ${cls}" style="--k:${k++}" x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${s}</text>`;
  const reset = s => { k = 0; return s; };

  window.UNIT_ART = [
    // Unité 1 : Hypophyse -> voie sanguine -> ovaires & testicules
    reset(
      P('M120 82C120 56 144 42 170 42C196 42 220 56 220 82C220 100 202 112 184 114L178 134H162L156 114C138 112 120 100 120 82Z', '') +
      `<circle class="t breathe" cx="170" cy="128" r="10" fill="none" stroke="currentColor" stroke-width="2.5" style="--k:${k++}"/>` +
      P('M215 98H385', 'a') +
      P('M375 90L385 98L375 106', 'a') +
      `<circle class="t breathe" cx="275" cy="98" r="5" fill="currentColor" stroke="none" style="--k:${k++}"/>` +
      `<circle class="t breathe" cx="325" cy="98" r="5" fill="currentColor" stroke="none" style="--k:${k++}"/>` +
      P('M410 66H488V130H410Z', '') +
      P('M430 98H468', 'a') +
      Tx(170, 28, 'hypophyse', 19, 'a') +
      Tx(300, 74, 'hormones · sang', 19, 'a') +
      Tx(449, 28, 'organes cibles', 19, 'a')
    ),
    // Unité 2 : Courbes œstrogènes / progestérone + frein pilule « − »
    reset(
      P('M70 144V42M70 144H320', 'faint') +
      P('M76 138Q130 132 162 62Q192 132 232 128Q272 68 308 138', '') +
      P('M162 46V144', 'a', 'stroke-dasharray="5 5"') +
      P('M360 98H418', 'faint') +
      P('M408 90L418 98L408 106', 'faint') +
      `<circle class="t breathe" cx="478" cy="98" r="34" fill="none" stroke="currentColor" stroke-width="3" style="--k:${k++}"/>` +
      P('M462 98H494', 'a') +
      Tx(195, 28, 'pics J14 · cycles', 19, 'a') +
      Tx(478, 28, 'pilule · blocage −', 19, 'a')
    ),
  ];
})();
