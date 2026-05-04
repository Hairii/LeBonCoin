import { loginUser } from '/api/auth.api.js';
import { showToast } from '/components/toast/toast.js';

const form = document.getElementById('loginForm');
const submitBtn = document.getElementById('submitBtn');

const showError = (id, message) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = message;
    el.classList.add('show');
};

const clearErrors = () => {
    document.querySelectorAll('.error-msg').forEach(el => {
        el.textContent = '';
        el.classList.remove('show');
    });
};

const validate = (email, password) => {
    let valid = true;

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        showError('emailError', 'Adresse email invalide.');
        valid = false;
    }

    if (!password) {
        showError('passwordError', 'Mot de passe requis.');
        valid = false;
    }

    return valid;
};

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!validate(email, password)) return;

    submitBtn.textContent = 'Connexion...';
    submitBtn.disabled = true;

    try {
        const data = await loginUser({ email, password });

        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('userId', data.id);

        showToast('Connexion réussie !', 'success');
        setTimeout(() => window.location.href = '../index.html', 1000);
    } catch (err) {
        showToast(err.message, 'error');
    } finally {
        submitBtn.textContent = 'Se connecter';
        submitBtn.disabled = false;
    }
});