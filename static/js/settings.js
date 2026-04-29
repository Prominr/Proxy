// Settings Manager
class SettingsManager {
    constructor() {
        this.loadSettings();
        this.bindEvents();
    }

    bindEvents() {
        // Branding
        document.getElementById('save-branding')?.addEventListener('click', () => {
            const name = document.getElementById('site-name').value;
            const icon = document.getElementById('site-icon').value;
            
            localStorage.setItem('siteName', name);
            localStorage.setItem('siteIcon', icon);
            
            this.applyBranding(name, icon);
        });

        // Tab Cloak
        document.getElementById('cloak-title')?.addEventListener('change', (e) => {
            const customInput = document.getElementById('custom-cloak-input');
            if (e.target.value === 'custom') {
                customInput.classList.remove('hidden');
            } else {
                customInput.classList.add('hidden');
            }
        });

        document.getElementById('apply-cloak')?.addEventListener('click', () => {
            const titleSelect = document.getElementById('cloak-title').value;
            const iconSelect = document.getElementById('cloak-icon').value;

            let title = titleSelect;
            if (titleSelect === 'custom') {
                title = document.getElementById('custom-cloak-title').value;
            }

            this.applyCloak(title, iconSelect);
        });

        // Panic Button
        document.getElementById('save-panic')?.addEventListener('click', () => {
            const key = document.getElementById('panic-key').value || '`';
            const url = document.getElementById('panic-url').value;
            
            localStorage.setItem('panicKey', key);
            localStorage.setItem('panicUrl', url);
            
            window.panicManager.updateSettings(key, url);
        });
    }

    loadSettings() {
        const name = localStorage.getItem('siteName') || 'OnlyLessons';
        const icon = localStorage.getItem('siteIcon') || '';
        
        document.getElementById('site-name').value = name;
        document.getElementById('site-icon').value = icon;
        
        this.applyBranding(name, icon);
    }

    applyBranding(name, icon) {
        document.getElementById('page-title').textContent = name;
        document.querySelector('.logo-text').innerHTML = name.replace(/(\w+)(.*)/, '$1<span class="lessons">$2</span>');
        
        if (icon) {
            document.getElementById('page-icon').href = icon;
        }
    }

    applyCloak(titleType, iconType) {
        const titles = {
            default: localStorage.getItem('siteName') || 'OnlyLessons',
            Google: 'Google',
            Classroom: 'Google Classroom',
            Drive: 'Google Drive',
            Docs: 'Google Docs'
        };

        const icons = {
            default: '',
            google: 'https://www.google.com/favicon.ico',
            classroom: 'https://ssl.gstatic.com/classroom/favicon.png',
            drive: 'https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png'
        };

        const actualTitle = titles[titleType] || titleType;
        const actualIcon = icons[iconType] || '';

        document.title = actualTitle;
        
        if (actualIcon) {
            let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'shortcut icon';
            link.href = actualIcon;
            document.getElementsByTagName('head')[0].appendChild(link);
        }

        localStorage.setItem('cloakTitle', titleType);
        localStorage.setItem('cloakIcon', iconType);
        localStorage.setItem('cloakActive', 'true');
    }
}

// Initialize
window.settingsManager = new SettingsManager();
