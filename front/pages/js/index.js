import { getAnnonces } from '/api/annonces.api.js';
import { showToast } from '/components/toast/toast.js';

const annoncesGrid = document.getElementById('annoncesGrid');
const emptyMsg = document.getElementById('emptyMsg');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const filterCategorie = document.getElementById('filterCategorie');
const filterPrix = document.getElementById('filterPrix');
const navLinks = document.getElementById('navLinks');

const token = sessionStorage.getItem('accessToken');
const userId = sessionStorage.getItem('userId');


const renderNav = () => {
    if (token) {
        navLinks.innerHTML = `
            <a href="/pages/create.html" class="btn-nav">Déposer une annonce</a>
            <a href="/pages/profil.html" class="nav-link">Mon profil</a>
            <button id="logoutBtn" class="btn-nav-outline">Déconnexion</button>
        `;
        document.getElementById('logoutBtn').addEventListener('click', () => {
            sessionStorage.clear();
            window.location.reload();
        });
    } else {
        navLinks.innerHTML = `
            <a href="/pages/login.html" class="nav-link">Se connecter</a>
            <a href="/pages/register.html" class="btn-nav">S'inscrire</a>
        `;
    }
};


const createCard = (annonce) => {
    const card = document.createElement('article');
    card.className = 'annonce-card';
    card.innerHTML = `
        <div class="card-image">
            <span class="card-categorie">${annonce.categorie_nom}</span>
        </div>
        <div class="card-body">
            <h2 class="card-title">${annonce.titre}</h2>
            <p class="card-desc">${annonce.description}</p>
            <div class="card-footer">
                <span class="card-prix">${Number(annonce.prix).toLocaleString('fr-FR')} €</span>
                <span class="card-lieu">${annonce.localisation}</span>
            </div>
            <div class="card-meta">
                <span class="card-vendeur">Par ${annonce.vendeur}</span>
                <span class="card-date">${new Date(annonce.date_publication).toLocaleDateString('fr-FR')}</span>
            </div>
        </div>
    `;
    card.addEventListener('click', () => {
        window.location.href = `/pages/annonce.html?id=${annonce.id}`;
    });
    return card;
};


let toutesLesAnnonces = [];

const afficherAnnonces = (liste) => {
    annoncesGrid.innerHTML = '';
    if (liste.length === 0) {
        emptyMsg.style.display = 'block';
        return;
    }
    emptyMsg.style.display = 'none';
    liste.forEach(a => annoncesGrid.appendChild(createCard(a)));
};

const remplirCategories = (annonces) => {
    const cats = [...new Set(annonces.map(a => a.categorie_nom))];
    cats.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = cat;
        filterCategorie.appendChild(opt);
    });
};

const filtrer = () => {
    const search = searchInput.value.toLowerCase();
    const cat = filterCategorie.value;
    const prix = filterPrix.value;

    let liste = toutesLesAnnonces.filter(a => {
        const matchSearch = a.titre.toLowerCase().includes(search) || a.description.toLowerCase().includes(search);
        const matchCat = cat ? a.categorie_nom === cat : true;
        return matchSearch && matchCat;
    });

    if (prix === 'asc') liste.sort((a, b) => a.prix - b.prix);
    if (prix === 'desc') liste.sort((a, b) => b.prix - a.prix);

    afficherAnnonces(liste);
};

searchBtn.addEventListener('click', filtrer);
searchInput.addEventListener('keyup', (e) => { if (e.key === 'Enter') filtrer(); });
filterCategorie.addEventListener('change', filtrer);
filterPrix.addEventListener('change', filtrer);


const init = async () => {
    renderNav();
    try {
        toutesLesAnnonces = await getAnnonces();
        remplirCategories(toutesLesAnnonces);
        afficherAnnonces(toutesLesAnnonces);
    } catch (err) {
        showToast(err.message, 'error');
    }
};

init();