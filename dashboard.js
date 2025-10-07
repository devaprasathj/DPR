document.addEventListener('DOMContentLoaded', () => {
    // 1. Check Authentication first
    if (!checkAuth()) return; 
    
    // --- Simulated Data Source (Real data would come from the Express backend) ---
    const dashboardData = {
        totalDPRs: '1,247',
        highRisk: '23',
        compliantProjects: '1,189',
        avgQuality: '87.5%',
        
        assessments: [
            { id: 1, name: 'Highway Construction - Shillong', score: 92, status: 'Approved' },
            { id: 2, name: 'Water Treatment Plant - Guwahati', score: 78, status: 'Under Review' },
            { id: 3, name: 'School Building - Imphal', score: 85, status: 'Approved' },
        ],
        
        riskAlerts: [
            { title: 'Budget discrepancy detected', project: 'Bridge Construction - Aizawl', type: 'budget' },
            { title: 'Environmental compliance pending', project: 'Industrial Park - Agartala', type: 'compliance' },
            { title: 'Timeline exceeds standard', project: 'Road Widening - Kohima', type: 'timeline' },
        ]
    };

    // 2. Render Statistical Cards
    function renderStats() {
        document.getElementById('totalDPRs').textContent = dashboardData.totalDPRs;
        document.getElementById('highRisk').textContent = dashboardData.highRisk;
        document.getElementById('compliantProjects').textContent = dashboardData.compliantProjects;
        document.getElementById('avgQuality').textContent = dashboardData.avgQuality;
    }

    // 3. Render Recent Assessments
    function renderAssessments() {
        const list = document.getElementById('assessmentsList');
        list.innerHTML = dashboardData.assessments.map(item => {
            const statusClass = item.status === 'Approved' ? 'status-approved' : 'status-review';
            const progressBarColor = item.status === 'Approved' ? 'var(--success-color)' : 'var(--warning-color)';
            
            return `
                <div class="assessment-item">
                    <h4>${item.name}</h4>
                    <div class="assessment-details">
                        <span>${item.score}% Quality Score</span>
                        <span class="status-badge ${statusClass}">${item.status}</span>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${item.score}%; background-color: ${progressBarColor};"></div>
                    </div>
                    <a href="project analys view.html?id=${item.id}" class="view-link" style="font-size:12px; color:var(--secondary-color); text-decoration:none; margin-top: 5px; display: block;">View Details</a>
                </div>
            `;
        }).join('');
    }

    // 4. Render Risk Alerts
    function renderRiskAlerts() {
        const list = document.getElementById('riskAlertsList');
        list.innerHTML = dashboardData.riskAlerts.map(alert => {
            const dotClass = alert.type === 'budget' ? 'red' : (alert.type === 'compliance' ? 'orange' : 'blue');
            const alertClass = alert.type === 'budget' ? 'budget' : (alert.type === 'compliance' ? 'compliance' : 'timeline');
            
            return `
                <div class="alert-item ${alertClass}">
                    <div class="dot ${dotClass}"></div>
                    <div>
                        <h4>${alert.title}</h4>
                        <p>${alert.project}</p>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Execute rendering functions
    renderStats();
    renderAssessments();
    renderRiskAlerts();
});
