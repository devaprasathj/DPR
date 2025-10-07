document.addEventListener('DOMContentLoaded', () => {
    if (!checkAuth()) return;

    const projectNameElem = document.getElementById('projectName');
    const analysisSummaryElem = document.getElementById('analysisSummary');
    const fieldReportsList = document.getElementById('fieldReportsList');
    
    // Get project ID from URL query parameters
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id') || 'N/A';

    // --- Simulated Data for a single project ---
    const projectData = {
        id: projectId,
        name: projectId === '1' ? 'Highway Construction - Shillong' : 'General Project ID: ' + projectId,
        summary: "The AI analysis indicates a 92% quality score. Key risks identified include an outdated procurement log and a moderate environmental risk due to proximity to a protected wetland. Budget adherence is excellent. The project is currently on schedule.",
        reports: [
            { date: '2025-09-28', officer: 'J. Doe', status: 'Compliance Check OK' },
            { date: '2025-09-15', officer: 'A. Singh', status: 'Mid-term Inspection Complete' },
            { date: '2025-09-01', officer: 'M. Khan', status: 'Site mobilization review done' }
        ]
    };

    function renderProjectDetails() {
        projectNameElem.textContent = projectData.name;
        document.getElementById('pageTitle').textContent = `DPR: ${projectData.name}`;
        analysisSummaryElem.textContent = projectData.summary;

        fieldReportsList.innerHTML = projectData.reports.map(report => `
            <li class="report-item">
                <span class="report-date">${report.date}</span>
                <span class="report-officer">by ${report.officer}</span>
                <p class="report-status">${report.status}</p>
            </li>
        `).join('');
    }

    renderProjectDetails();
});
