
async function loadData() {
  try {
    const res = await fetch('./data.json?t=' + Date.now());
    if (!res.ok) throw new Error('HTTP ' + res.status);

    const data = await res.json();
    render(data);

    document.getElementById('status').innerText =
      '✅ Дані оновлено: ' + new Date().toLocaleTimeString();
  } catch (e) {
    document.getElementById('status').innerText = '❌ Помилка завантаження';
    console.error(e);
  }
}

function render(data) {
  const el = document.getElementById('content');

  let html = '';

  for (const coin in data) {
    const s = data[coin];

    html += `
      <div class="card">
        <h2>${coin} / USDT (${s.timeframe ?? s.tf ?? ''})</h2>
        <p><b>${s.bias ?? s.signal ?? ''}</b></p>
        <p>Зона: ${s.zone ?? ''}</p>
        ${s.entry ? `<p>Вхід: ${s.entry}</p>` : ''}
        ${s.take_profit ? `<p>TP: ${s.take_profit.join(' / ')}</p>` : ''}
        ${s.tp ? `<p>TP: ${s.tp}</p>` : ''}
        ${s.stop_loss ? `<p>SL: ${s.stop_loss}</p>` : ''}
        ${s.sl ? `<p>SL: ${s.sl}</p>` : ''}
        ${s.comment ? `<p>${s.comment}</p>` : ''}
      </div>
    `;
  }

  el.innerHTML = html;
}

loadData();
setInterval(loadData, 60000);
