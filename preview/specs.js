// 声明式风格配方：H 系列这种「色块 + 粗边 + 硬投影」的版式，用数据描述即可。
window.SPECS = {
  H2: {
    bg: '#F2EEE4', ink: '#111111', shadow: 14, border: 9,
    blocks: [
      {
        x: 56, y: 56, w: 512, h: 608, fill: '#FF8FAB', badge: '02',
        lines: [
          { text: 'BLOCK', size: 112, y: 268, color: '#111' },
          { text: 'FRAME', size: 112, y: 372, color: '#111' },
          { text: '新粗野主义版式', size: 28, y: 470, color: 'rgba(17,17,17,.72)', weight: 700 }
        ]
      },
      {
        x: 600, y: 56, w: 624, h: 252, fill: '#FFD93D',
        lines: [
          { text: 'NEO-BRUTALISM', size: 42, y: 108, color: '#111' },
          { text: '粗边框 · 硬投影 · 糖果色点缀', size: 27, y: 170, color: 'rgba(17,17,17,.66)', weight: 700 }
        ]
      },
      {
        x: 600, y: 340, w: 624, h: 324, fill: '#4ECDC4',
        lines: [
          { text: '层级靠字重和色块，', size: 31, y: 92, color: '#111', weight: 800 },
          { text: '不靠渐变和柔光。', size: 31, y: 140, color: '#111', weight: 800 }
        ],
        button: { text: '查看 / VIEW', x: 44, y: 194, w: 276, h: 68 }
      }
    ]
  }
};
