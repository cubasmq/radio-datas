const slotForm = document.getElementById('slot-form');
const crmForm = document.getElementById('crm-form');
const slotsList = document.getElementById('slots');
const advertisersList = document.getElementById('advertisers');
const aiOutput = document.getElementById('ai-output');

const state = {
  slots: JSON.parse(localStorage.getItem('radio-datas-slots') || '[]'),
  advertisers: JSON.parse(localStorage.getItem('radio-datas-advertisers') || '[]')
};

function save() {
  localStorage.setItem('radio-datas-slots', JSON.stringify(state.slots));
  localStorage.setItem('radio-datas-advertisers', JSON.stringify(state.advertisers));
}

function render() {
  slotsList.innerHTML = state.slots
    .map(
      (s) => `<li><strong>[${s.type}]</strong> ${s.date} ${s.time} — ${s.title}</li>`
    )
    .join('');

  advertisersList.innerHTML = state.advertisers
    .map((a) => `<li><strong>${a.name}</strong> (${a.contact})</li>`)
    .join('');
}

slotForm.addEventListener('submit', (e) => {
  e.preventDefault();
  state.slots.push({
    title: document.getElementById('slot-title').value,
    date: document.getElementById('slot-date').value,
    time: document.getElementById('slot-time').value,
    type: document.getElementById('slot-type').value
  });
  save();
  render();
  slotForm.reset();
});

crmForm.addEventListener('submit', (e) => {
  e.preventDefault();
  state.advertisers.push({
    name: document.getElementById('crm-name').value,
    contact: document.getElementById('crm-contact').value
  });
  save();
  render();
  crmForm.reset();
});

document.getElementById('simulate').addEventListener('click', () => {
  const provider = document.getElementById('provider').value;
  const prompt = document.getElementById('prompt').value || 'Aucun prompt saisi';
  aiOutput.textContent = `[${provider}] Réponse simulée:\n${prompt}\n\nSuggestion: publier ce contenu après validation humaine.`;
});

render();
