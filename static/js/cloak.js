// Tab Cloaking on visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Tab is hidden - apply cloak if enabled
        const cloakActive = localStorage.getItem('cloakActive') === 'true';
        if (cloakActive) {
            const title = localStorage.getItem('cloakTitle');
            if (title && title !== 'default') {
                const titles = {
                    Google: 'Google',
                    Classroom: 'Google Classroom', 
                    Drive: 'Google Drive',
                    Docs: 'Google Docs'
                };
                document.title = titles[title] || title;
            }
        }
    } else {
        // Tab visible - restore
        const siteName = localStorage.getItem('siteName') || 'OnlyLessons';
        document.title = siteName;
    }
});
