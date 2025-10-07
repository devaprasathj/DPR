document.addEventListener('DOMContentLoaded', () => {
    if (!checkAuth()) return; // Field officers must be logged in

    const reportForm = document.getElementById('reportForm');
    const messageBox = document.getElementById('submissionMessage');

    reportForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const project = document.getElementById('projectSelect').value;
        const status = document.getElementById('status').value;
        const notes = document.getElementById('notes').value;

        // Simple validation
        if (!project || !status || !notes) {
            messageBox.textContent = 'Please fill out all fields.';
            messageBox.className = 'message-box error';
            messageBox.style.display = 'block';
            return;
        }

        // In a real app, this would be an AJAX call to /api/projects/report
        console.log('Simulating report submission:', { project, status, notes });
        
        // --- SIMULATION ---
        // Assume successful submission after a delay
        setTimeout(() => {
            messageBox.textContent = 'Report submitted successfully! Thank you.';
            messageBox.className = 'message-box success';
            messageBox.style.display = 'block';
            reportForm.reset();
        }, 800);
    });
});
