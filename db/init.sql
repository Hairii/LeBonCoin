CREATE DATABASE IF NOT EXISTS leboncoin;
USE leboncoin;

CREATE TABLE utilisateur (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categorie (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL
);

CREATE TABLE annonce (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    prix DECIMAL(10, 2) NOT NULL,
    localisation VARCHAR(150) NOT NULL,
    date_publication DATETIME DEFAULT CURRENT_TIMESTAMP,
    utilisateur_id INT NOT NULL,
    categorie_id INT NOT NULL,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id) ON DELETE CASCADE,
    FOREIGN KEY (categorie_id) REFERENCES categorie(id)
);

CREATE TABLE image (
    id INT PRIMARY KEY AUTO_INCREMENT,
    url VARCHAR(255) NOT NULL,
    annonce_id INT NOT NULL,
    FOREIGN KEY (annonce_id) REFERENCES annonce(id) ON DELETE CASCADE
);

CREATE TABLE message (
    id INT PRIMARY KEY AUTO_INCREMENT,
    contenu TEXT NOT NULL,
    date_envoi DATETIME DEFAULT CURRENT_TIMESTAMP,
    expediteur_id INT NOT NULL,
    destinataire_id INT NOT NULL,
    annonce_id INT NOT NULL,
    FOREIGN KEY (expediteur_id) REFERENCES utilisateur(id) ON DELETE CASCADE,
    FOREIGN KEY (destinataire_id) REFERENCES utilisateur(id) ON DELETE CASCADE,
    FOREIGN KEY (annonce_id) REFERENCES annonce(id) ON DELETE CASCADE
);