async function loadData() {
  try {
    const res = await fetch('./data.json?_=' + Date.now());
    if (!res.ok) throw new Error('HTTP error');

    const data = await res.json();

    document.getElementById('status').innerText =
      '✅ Оновлено: ' + new Date().toLocaleTimeString();

    let html = '';

    for (const coin in data) {
      const s = data[coin];

      html += `
        <div class="card">
          <h2>${coin} (${s.tf || s.timeframe || ''})</h2>
          <p><b>${s.signal || s.bias || ''}</b></p>
          ${s.entry ? `<p>Вхід: ${s.entry}</p>` : ''}
          ${s.tp ? `<p>TP: ${Array.isArray(s.tp) ? s.tp.join(' / ') : s.tp}</p>` : ''}
          ${s.sl ? `<p>SL: ${s.sl}</p>` : ''}
        </div>
      `;
    }

    document.getElementById('content').innerHTML = html;

  } catch (e) {
    document.getElementById('status').innerText = '❌ Помилка завантаження';
    console.error(e);
  }
}

loadData();
setInterval(loadData, 60000);
