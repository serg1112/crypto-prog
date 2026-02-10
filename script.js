const URL = './data.json';
const INTERVAL = 60000; // 60 сек

async function loadData() {
  try {
    const res = await fetch(URL + '?t=' + Date.now());
    if (!res.ok) throw new Error('HTTP error');

    const data = await res.json();
    render(data);

    document.getElementById('status').innerText =
      '✅ Оновлено: ' + new Date().toLocaleTimeString();

  } catch (e) {
    document.getElementById('status').innerText =
      '❌ Помилка завантаження';
    console.error(e);
  }
}

function render(data) {
  const el = document.getElementById('content');
  el.innerHTML = '';

  for (const coin in data) {
    const s = data[coin];

    el.innerHTML += `
      <div class="card">
        <h2>${coin} / USDT (${s.tf})</h2>
        <p>Сигнал: <b>${s.signal}</b></p>
        <p>Вхід: ${s.entry}</p>
        <p>TP: ${s.tp}</p>
        <p>SL: ${s.sl}</p>
      </div>
    `;
  }
}

loadData();
setInterval(loadData, INTERVAL);
