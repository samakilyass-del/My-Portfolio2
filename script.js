document.addEventListener('DOMContentLoaded', function () {
    const img = document.getElementById('profile-pic');
    const input = document.getElementById('upload-photo');
    // Load saved profile image (data URL) from localStorage if present
    try {
        const stored = localStorage.getItem('profileImage');
        if (stored && img) img.src = stored;
    } catch (e) {
        console.warn('Could not access localStorage', e);
    }

    // When the user selects a file, read it and store as data URL
    if (input) {
        input.addEventListener('change', function (ev) {
            const file = ev.target.files && ev.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function () {
                const dataUrl = reader.result;
                if (img) img.src = dataUrl;
                try {
                    localStorage.setItem('profileImage', dataUrl);
                } catch (e) {
                    console.warn('Could not save image to localStorage', e);
                }
            };
            reader.readAsDataURL(file);
        });
    }
});

// Add a recommendation from the textarea into the recommendations list
function addRecommendation() {
    const textarea = document.getElementById('new_recommendation');
    const all = document.getElementById('all_recommendations');
    if (!textarea || !all) return;
    const text = textarea.value.trim();
    if (!text) return;
    const div = document.createElement('div');
    div.className = 'recommendation';
    div.textContent = text;
    all.appendChild(div);
    textarea.value = '';
    // Update button label and focus textarea for quick additional submissions
    const btn = document.getElementById('submit-recommendation');
    if (btn) btn.textContent = 'Submit New Recommendation';
    textarea.focus();

    // Show confirmation popup
    showPopup('Thank you for leaving a recommendation!');
}

// Show a transient confirmation popup with given message
function showPopup(message) {
    const popup = document.getElementById('confirm-popup');
    if (!popup) return;
    const textEl = popup.querySelector('.popup-text');
    if (textEl) textEl.textContent = message;
    popup.hidden = false;
    popup.classList.add('confirm-popup--visible');
    setTimeout(() => {
        popup.classList.remove('confirm-popup--visible');
        popup.hidden = true;
    }, 2500);
}
