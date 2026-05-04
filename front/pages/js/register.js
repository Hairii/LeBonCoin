import { registerUser } from '/api/auth.api.js';
import { showToast } from '/components/toast/toast.js';

const form = document.getElementById('registerForm');
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

const validate = (nom, email, password) => {
    let valid = true;

    if (!nom.trim()) {
        showError('nomError', 'Le nom est requis.');
        valid = false;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        showError('emailError', 'Adresse email invalide.');
        valid = false;
    }

    if (password.length < 6) {
        showError('passwordError', 'Au moins 6 caractères requis.');
        valid = false;
    }

    return valid;
};

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const nom = document.getElementById('nom').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!validate(nom, email, password)) return;

    submitBtn.textContent = 'Création...';
    submitBtn.disabled = true;

    try {
        await registerUser({ nom, email, password });
        showToast('Compte créé ! Redirection...', 'success');
        setTimeout(() => window.location.href = 'login.html', 1500);
    } catch (err) {
        showToast(err.message, 'error');
    } finally {
        submitBtn.textContent = 'Créer mon compte';
        submitBtn.disabled = false;
    }
});