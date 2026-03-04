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
    .map((s) => `<li><strong>[${s.type}]</strong> ${s.date} ${s.time} — ${s.title}</li>`)
    .join('');

  advertisersList.innerHTML = state.advertisers
    .map((a) => `<li><strong>${a.name}</strong> (${a.contact})</li>`)
    .join('');
}

function hasConflict(date, time) {
  return state.slots.some((slot) => slot.date === date && slot.time === time);
}

slotForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('slot-title').value;
  const date = document.getElementById('slot-date').value;
  const time = document.getElementById('slot-time').value;
  const type = document.getElementById('slot-type').value;

  if (hasConflict(date, time)) {
    window.alert('Conflit détecté : un créneau existe déjà à cette date/heure.');
    return;
  }

  state.slots.push({ title, date, time, type });
  save();
  render();
  slotForm.reset();
});

crmForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('crm-name').value;
  const contact = document.getElementById('crm-contact').value;

  state.advertisers.push({ name, contact });
  save();
  render();
  crmForm.reset();
});

document.getElementById('simulate').addEventListener('click', () => {
  const provider = document.getElementById('provider').value;
  const prompt = document.getElementById('prompt').value || 'Aucun prompt saisi';
  const now = new Date().toLocaleTimeString('fr-FR');

  aiOutput.textContent = `[${provider}] Réponse simulée (${now})\n\n${prompt}\n\nSuggestion: valider en régie avant diffusion.`;
});

render();
