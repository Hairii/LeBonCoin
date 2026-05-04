export const showToast = (message, type = 'success') => {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.className = `show ${type}`;

    setTimeout(() => {
        toast.className = '';
    }, 3500);
};