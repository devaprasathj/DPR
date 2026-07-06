(function(){
'use strict';

const reference = [
  {id:'REF-2026-001',submittedAt:'2026-01-14',status:'Under appraisal',data:{projectTitle:'Integrated Road Connectivity - West Khasi Hills',state:'Meghalaya',sector:'Roads & bridges',totalCost:'428.6',duration:'30',beneficiaries:'185000',riskLevel:'Moderate',landStatus:'Fully available',environmentStatus:'Obtained',forestStatus:'Not applicable',utilityStatus:'Plan approved'}},
  {id:'REF-2026-002',submittedAt:'2026-02-08',status:'Approved',data:{projectTitle:'Regional Cancer Care Centre - Guwahati',state:'Assam',sector:'Health',totalCost:'312.4',duration:'36',beneficiaries:'720000',riskLevel:'Low',landStatus:'Fully available',environmentStatus:'Obtained',forestStatus:'Not applicable',utilityStatus:'Completed'}},
  {id:'REF-2026-003',submittedAt:'2026-02-26',status:'Clarification required',data:{projectTitle:'Aizawl Urban Water Augmentation',state:'Mizoram',sector:'Water supply & sanitation',totalCost:'267.8',duration:'42',beneficiaries:'240000',riskLevel:'High',landStatus:'Partially available',environmentStatus:'Applied / in process',forestStatus:'Not applicable',utilityStatus:'In assessment'}},
  {id:'REF-2026-004',submittedAt:'2026-03-11',status:'Under appraisal',data:{projectTitle:'Digital Learning Infrastructure Programme',state:'Manipur',sector:'Education',totalCost:'96.3',duration:'18',beneficiaries:'310000',riskLevel:'Moderate',landStatus:'Not required',environmentStatus:'Not applicable',forestStatus:'Not applicable',utilityStatus:'Completed'}},
  {id:'REF-2026-005',submittedAt:'2026-03-29',status:'Approved',data:{projectTitle:'Eco-Tourism Circuit - South Sikkim',state:'Sikkim',sector:'Tourism',totalCost:'154.2',duration:'24',beneficiaries:'85000',riskLevel:'Low',landStatus:'Fully available',environmentStatus:'Obtained',forestStatus:'Obtained',utilityStatus:'Completed'}},
  {id:'REF-2026-006',submittedAt:'2026-04-17',status:'Clarification required',data:{projectTitle:'Agartala Logistics and Industrial Hub',state:'Tripura',sector:'Digital infrastructure',totalCost:'519.5',duration:'48',beneficiaries:'125000',riskLevel:'Critical',landStatus:'Acquisition in progress',environmentStatus:'Not initiated',forestStatus:'Not applicable',utilityStatus:'In assessment'}},
  {id:'REF-2026-007',submittedAt:'2026-04-30',status:'Under appraisal',data:{projectTitle:'Rural Solar Microgrid Mission',state:'Arunachal Pradesh',sector:'Power & renewable energy',totalCost:'238.9',duration:'30',beneficiaries:'112000',riskLevel:'Moderate',landStatus:'Partially available',environmentStatus:'Not applicable',forestStatus:'Applied / in process',utilityStatus:'Not applicable'}},
  {id:'REF-2026-008',submittedAt:'2026-05-19',status:'Approved',data:{projectTitle:'Kohima District Hospital Expansion',state:'Nagaland',sector:'Health',totalCost:'184.7',duration:'28',beneficiaries:'198000',riskLevel:'Low',landStatus:'Fully available',environmentStatus:'Obtained',forestStatus:'Not applicable',utilityStatus:'Completed'}},
  {id:'REF-2026-009',submittedAt:'2026-05-31',status:'Under appraisal',data:{projectTitle:'Brahmaputra Flood Resilience Works',state:'Assam',sector:'Water supply & sanitation',totalCost:'683.1',duration:'40',beneficiaries:'460000',riskLevel:'High',landStatus:'Partially available',environmentStatus:'Applied / in process',forestStatus:'Applied / in process',utilityStatus:'Plan approved'}},
  {id:'REF-2026-010',submittedAt:'2026-06-09',status:'Approved',data:{projectTitle:'Farm Value Chain and Cold Storage Network',state:'Meghalaya',sector:'Agriculture & allied',totalCost:'143.5',duration:'24',beneficiaries:'92000',riskLevel:'Low',landStatus:'Fully available',environmentStatus:'Not applicable',forestStatus:'Not applicable',utilityStatus:'Completed'}}
];

let portfolio = [];
let activeSelection = null;

const money = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 1 });

function readSubmissions() {
  try {
    return JSON.parse(localStorage.getItem('dpr_submissions')) || [];
  } catch (_) {
    return [];
  }
}

function safe(value) {
  const node = document.createElement('span');
  node.textContent = value ?? '';
  return node.innerHTML;
}

function num(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function valid(status, accepted) {
  return accepted.includes(status);
}

function readiness(record) {
  const d = record.data || {};
  const checks = [
    valid(d.landStatus, ['Fully available', 'Not required']),
    valid(d.environmentStatus, ['Obtained', 'Not applicable']),
    valid(d.forestStatus, ['Obtained', 'Not applicable']),
    valid(d.utilityStatus, ['Completed', 'Plan approved', 'Not applicable'])
  ];
  return Math.round(checks.filter(Boolean).length / checks.length * 100);
}

function riskRank(value) {
  return ({ Low: 1, Moderate: 2, High: 3, Critical: 4 })[value] || 2;
}

function monthsAgo(date, months) {
  const threshold = new Date();
  threshold.setMonth(threshold.getMonth() - months);
  return new Date(date) >= threshold;
}

function group(records, key) {
  return records.reduce((map, item) => {
    const value = (item.data || {})[key] || 'Not specified';
    (map[value] ??= []).push(item);
    return map;
  }, {});
}

function average(values) {
  return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
}

function populateFilters() {
  ['state', 'sector'].forEach(key => {
    const select = document.getElementById(`${key}Filter`);
    [...new Set(portfolio.map(r => (r.data || {})[key]).filter(Boolean))].sort().forEach(value => {
      select.insertAdjacentHTML('beforeend', `<option>${safe(value)}</option>`);
    });
  });
}

function filtered() {
  const state = document.getElementById('stateFilter').value;
  const sector = document.getElementById('sectorFilter').value;
  const risk = document.getElementById('riskFilter').value;
  const period = document.getElementById('periodFilter').value;

  return portfolio.filter(record => {
    const d = record.data || {};
    return (state === 'all' || d.state === state)
      && (sector === 'all' || d.sector === sector)
      && (risk === 'all' || d.riskLevel === risk)
      && (period === 'all' || monthsAgo(record.submittedAt, Number(period)));
  });
}

function flashSelection(text) {
  const panel = document.getElementById('selectionPanel');
  panel.textContent = text;
  panel.classList.remove('is-updated');
  void panel.offsetWidth;
  panel.classList.add('is-updated');
}

function clearActive() {
  document.querySelectorAll('.is-active').forEach(node => node.classList.remove('is-active'));
}

function setSelection(key, id, text) {
  activeSelection = { key, id };
  clearActive();

  document.querySelectorAll(`[data-select-key="${key}"]`).forEach(node => {
    if (node.getAttribute('data-select-id') === id) {
      node.classList.add('is-active');
    }
  });

  flashSelection(text);
}

function renderKpis(records) {
  const costs = records.map(r => num(r.data?.totalCost));
  const total = costs.reduce((a, b) => a + b, 0);
  const high = records.filter(r => riskRank(r.data?.riskLevel) >= 3);
  const ready = records.filter(r => readiness(r) >= 75);

  document.getElementById('kpiProjects').textContent = records.length;
  document.getElementById('kpiStates').textContent = `Across ${new Set(records.map(r => r.data?.state).filter(Boolean)).size} states`;
  document.getElementById('kpiInvestment').textContent = `INR ${money.format(total)} Cr`;
  document.getElementById('kpiAverageCost').textContent = `INR ${money.format(average(costs))} Cr average cost`;
  document.getElementById('kpiReadiness').textContent = `${records.length ? Math.round(ready.length / records.length * 100) : 0}%`;
  document.getElementById('kpiRisk').textContent = `${records.length ? Math.round(high.length / records.length * 100) : 0}%`;
  document.getElementById('kpiRiskCount').textContent = `${high.length} projects need attention`;
}

function renderInvestment(records) {
  const entries = Object.entries(group(records, 'state'))
    .map(([label, items]) => ({
      label,
      value: items.reduce((s, r) => s + num(r.data?.totalCost), 0),
      count: items.length
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  const max = Math.max(...entries.map(e => e.value), 1);
  const chart = document.getElementById('stateInvestmentChart');

  if (!entries.length) {
    chart.innerHTML = '<div class="empty-state">No investment data for the selected filters.</div>';
    return;
  }

  chart.innerHTML = entries.map(entry => {
    const width = entry.value / max * 100;
    return `
      <button class="bar-row" type="button" data-select-key="state" data-select-id="${safe(entry.label)}">
        <span class="bar-label" title="${safe(entry.label)}">${safe(entry.label)}</span>
        <span class="bar-track"><span class="bar-fill" style="width:${width}%"></span></span>
        <strong class="bar-value">INR ${money.format(entry.value)} Cr</strong>
      </button>`;
  }).join('');

  chart.querySelectorAll('.bar-row').forEach((row, index) => {
    const entry = entries[index];
    row.addEventListener('click', () => {
      setSelection(
        'state',
        entry.label,
        `State: ${entry.label} | Investment: INR ${money.format(entry.value)} Cr | DPRs: ${entry.count}`
      );
    });
  });
}

function renderRisk(records) {
  const levels = ['Low', 'Moderate', 'High', 'Critical'];
  const colors = {
    Low: '#16a34a',
    Moderate: '#f59e0b',
    High: '#ef4444',
    Critical: '#7f1d1d'
  };
  const counts = levels.map(level => records.filter(r => (r.data?.riskLevel || 'Moderate') === level).length);
  let cursor = 0;
  const segments = counts.map((count, i) => {
    const start = records.length ? cursor / records.length * 100 : 0;
    cursor += count;
    const end = records.length ? cursor / records.length * 100 : 0;
    return `${colors[levels[i]]} ${start}% ${end}%`;
  });

  const donut = document.getElementById('riskDonut');
  donut.style.background = records.length ? `conic-gradient(${segments.join(',')})` : '#e5ecea';
  document.getElementById('donutValue').textContent = records.length;

  const legend = document.getElementById('riskLegend');
  legend.innerHTML = levels.map((level, i) => `
    <button class="legend-row" type="button" data-select-key="risk" data-select-id="${level}">
      <span class="legend-dot" style="background:${colors[level]}"></span>
      <span>${level}</span>
      <strong>${counts[i]}</strong>
    </button>
  `).join('');

  legend.querySelectorAll('.legend-row').forEach((row, index) => {
    const level = levels[index];
    row.addEventListener('click', () => {
      setSelection('risk', level, `Risk band: ${level} | Projects: ${counts[index]} of ${records.length}`);
      donut.classList.add('is-active');
      setTimeout(() => donut.classList.remove('is-active'), 220);
    });
  });
}

function renderReadiness(records) {
  const metrics = [
    ['Land available', r => valid(r.data?.landStatus, ['Fully available', 'Not required'])],
    ['Environmental clearance', r => valid(r.data?.environmentStatus, ['Obtained', 'Not applicable'])],
    ['Forest clearance', r => valid(r.data?.forestStatus, ['Obtained', 'Not applicable'])],
    ['Utility readiness', r => valid(r.data?.utilityStatus, ['Completed', 'Plan approved', 'Not applicable'])]
  ];

  const values = metrics.map(([, test]) => records.length ? Math.round(records.filter(test).length / records.length * 100) : 0);
  const avgReadiness = records.length ? Math.round(records.reduce((sum, record) => sum + readiness(record), 0) / records.length) : 0;
  const readyCount = records.filter(record => readiness(record) >= 75).length;
  const lowCount = records.filter(record => readiness(record) < 50).length;
  const strongestIndex = values.indexOf(Math.max(...values, 0));
  const weakestIndex = values.indexOf(Math.min(...values, 100));

  const chart = document.getElementById('readinessChart');
  chart.innerHTML = metrics.map(([label, test], index) => {
    const value = values[index];
    return `
      <button class="readiness-item" type="button" data-select-key="readiness" data-select-id="${safe(label)}">
        <div><span>${safe(label)}</span><strong>${value}%</strong></div>
        <div class="readiness-track"><div class="readiness-fill" style="width:${value}%"></div></div>
      </button>`;
  }).join('');

  chart.querySelectorAll('.readiness-item').forEach((row, index) => {
    const [label, test] = metrics[index];
    const value = values[index];
    row.addEventListener('click', () => {
      setSelection('readiness', label, `${label}: ${value}% of filtered projects`);
    });
  });

  const stats = document.getElementById('readinessStats');
  stats.innerHTML = `
    <div class="readiness-stat-card wide">
      <small>Average readiness</small>
      <strong>${avgReadiness}%</strong>
      <div class="readiness-stat-bar"><span style="width:${avgReadiness}%"></span></div>
    </div>
    <div class="readiness-stat-grid">
      <div class="readiness-stat-mini">
        <span>Ready projects</span>
        <strong>${readyCount}</strong>
      </div>
      <div class="readiness-stat-mini">
        <span>Below 50%</span>
        <strong>${lowCount}</strong>
      </div>
      <div class="readiness-stat-mini">
        <span>Strongest</span>
        <strong>${safe(metrics[strongestIndex][0])}</strong>
      </div>
      <div class="readiness-stat-mini">
        <span>Weakest</span>
        <strong>${safe(metrics[weakestIndex][0])}</strong>
      </div>
    </div>
    <div class="readiness-stat-card">
      <small>Clearance coverage chart</small>
      <strong>${Math.max(...values, 0)}% top coverage</strong>
      <div class="readiness-stat-bar"><span style="width:${Math.max(...values, 0)}%"></span></div>
    </div>
    ${metrics.map(([label], index) => `
      <div class="readiness-stat-card">
        <small>${safe(label)}</small>
        <strong>${values[index]}%</strong>
        <div class="readiness-stat-bar"><span style="width:${values[index]}%"></span></div>
      </div>
    `).join('')}
  `;
}

function render() {
  const records = filtered();
  document.getElementById('recordCount').textContent = records.length;
  renderKpis(records);
  renderInvestment(records);
  renderRisk(records);
  renderReadiness(records);

  if (!records.length) {
    flashSelection('No records match the current filters.');
    return;
  }

  if (!activeSelection) {
    flashSelection('Click a bar, legend item, or readiness row to view the value here.');
  }
}

function exportCsv() {
  const rows = filtered();
  const headers = ['DPR ID', 'Project title', 'State', 'Sector', 'Cost (INR crore)', 'Risk', 'Readiness (%)', 'Duration (months)', 'Submission date', 'Status'];
  const quote = value => `"${String(value ?? '').replaceAll('"', '""')}"`;
  const csv = [headers, ...rows.map(r => [
    r.id,
    r.data?.projectTitle,
    r.data?.state,
    r.data?.sector,
    num(r.data?.totalCost),
    r.data?.riskLevel,
    readiness(r),
    num(r.data?.duration),
    r.submittedAt,
    r.status
  ])].map(row => row.map(quote).join(',')).join('\r\n');

  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `mdoner-dpr-analytics-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

document.addEventListener('DOMContentLoaded', () => {
  if (!window.checkAuth()) return;

  const live = readSubmissions();
  portfolio = [...live, ...reference];

  document.getElementById('dataContext').textContent = live.length
    ? `${live.length} submitted DPR${live.length === 1 ? '' : 's'} plus reference portfolio`
    : 'Reference portfolio - submit a DPR to add live data';
  document.getElementById('dataBadge').textContent = live.length ? 'REFERENCE + LIVE DATA' : 'REFERENCE DATA';
  document.getElementById('updatedAt').textContent = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

  populateFilters();
  ['stateFilter', 'sectorFilter', 'riskFilter', 'periodFilter'].forEach(id => {
    document.getElementById(id).addEventListener('change', () => {
      activeSelection = null;
      render();
    });
  });

  document.getElementById('resetFilters').addEventListener('click', () => {
    ['stateFilter', 'sectorFilter', 'riskFilter', 'periodFilter'].forEach(id => {
      document.getElementById(id).value = 'all';
    });
    activeSelection = null;
    render();
  });

  document.getElementById('exportCsv').addEventListener('click', exportCsv);
  document.getElementById('printReport').addEventListener('click', () => window.print());

  render();
});
}());
