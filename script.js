async function loadData() {
  try {
    const res = await fetch('./data.json?ts=' + Date.now());
    if (!res.ok) throw new Error('HTTP ' + res.status);

    const data = await res.json();

    document.getElementById('status').innerText =
      '✅ Оновлено: ' + new Date().toLocaleTimeString();

    let html = '';
    for (const key in data) {
      const s = data[key];
      html += `
        <div style="border:1px solid #333;padding:10px;margin:10px 0">
          <b>${key}</b><br>
          TF: ${s.tf || s.timeframe}<br>
          Сигнал: ${s.signal || s.bias}<br>
          Вхід: ${s.entry || s.zone}<br>
          TP: ${(s.tp || s.take_profit || []).toString()}<br>
          SL: ${s.sl || s.stop_loss}
        </div>
      `;
    }
    document.getElementById('content').innerHTML = html;

  } catch (e) {
    document.getElementById('status').innerText = '❌ Помилка JS';
    console.error(e);
  }
}

loadData();
setInterval(loadData, 60000);
