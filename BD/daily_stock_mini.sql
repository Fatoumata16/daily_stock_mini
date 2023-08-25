-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 25 août 2023 à 16:52
-- Version du serveur :  10.4.19-MariaDB
-- Version de PHP : 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `daily_stock_mini`
--

-- --------------------------------------------------------

--
-- Structure de la table `appro`
--

CREATE TABLE `appro` (
  `id_appro` bigint(20) UNSIGNED NOT NULL,
  `date_appro` date NOT NULL,
  `id_user` smallint(5) UNSIGNED NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `appro`
--

INSERT INTO `appro` (`id_appro`, `date_appro`, `id_user`, `id`) VALUES
(1, '2023-08-09', 3, 0),
(2, '2023-08-09', 4, 0),
(3, '2023-08-09', 15, 0),
(4, '2023-08-16', 15, 0),
(5, '2023-08-16', 1, 0),
(6, '2023-08-09', 15, 0),
(7, '2023-08-24', 16, 0),
(8, '2023-08-25', 16, 1),
(9, '2023-08-25', 16, 2),
(10, '2023-08-25', 16, 3),
(11, '2023-08-25', 17, 1);

-- --------------------------------------------------------

--
-- Structure de la table `depense`
--

CREATE TABLE `depense` (
  `id_depense` int(10) UNSIGNED NOT NULL,
  `libelle` varchar(255) NOT NULL,
  `montant` int(11) NOT NULL,
  `date_depense` date NOT NULL,
  `id_user` smallint(5) UNSIGNED NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `ligne_appro`
--

CREATE TABLE `ligne_appro` (
  `id_produit` int(10) UNSIGNED NOT NULL,
  `id_appro` bigint(20) UNSIGNED NOT NULL,
  `quantite` int(10) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `ligne_appro`
--

INSERT INTO `ligne_appro` (`id_produit`, `id_appro`, `quantite`) VALUES
(1, 1, 234),
(1, 2, 234),
(1, 3, 239),
(2, 3, 200),
(1, 4, 239),
(3, 4, 239),
(1, 3, 200),
(1, 6, 400),
(11, 7, 400),
(10, 7, 200),
(9, 7, 250);

-- --------------------------------------------------------

--
-- Structure de la table `ligne_vente`
--

CREATE TABLE `ligne_vente` (
  `id_vente` bigint(20) UNSIGNED NOT NULL,
  `id_produit` int(10) UNSIGNED NOT NULL,
  `quantite` int(10) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `ligne_vente`
--

INSERT INTO `ligne_vente` (`id_vente`, `id_produit`, `quantite`) VALUES
(1, 1, 234),
(2, 1, 230),
(3, 2, 200),
(2, 2, 100),
(4, 1, 400);

-- --------------------------------------------------------

--
-- Structure de la table `produit`
--

CREATE TABLE `produit` (
  `id_produit` int(10) UNSIGNED NOT NULL,
  `libelle` varchar(150) NOT NULL,
  `stock_min` int(11) NOT NULL,
  `prix_achat` int(11) DEFAULT NULL,
  `prix_vente` int(11) DEFAULT NULL,
  `path` varchar(255) NOT NULL,
  `id_user` smallint(5) UNSIGNED NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `produit`
--

INSERT INTO `produit` (`id_produit`, `libelle`, `stock_min`, `prix_achat`, `prix_vente`, `path`, `id_user`, `id`) VALUES
(1, 'pharm1249', 700, 22222, 28, 'http://localhost:3000/images/interfaceafaire.png1691597427983.png', 15, 0),
(2, 'pharm1244', 299, 22222, 28, 'http://localhost:3000/images/interfaceafaire.png1691597029648.png', 15, 0),
(3, 'produit6', 20, 25000, 45000, 'sdfghjkl', 3, 0),
(4, 'produit7', 15, 25000, 45000, 'sdfghjkl', 1, 0),
(5, 'pharm124934', 6828, 22222, 28, 'file:///C:/Users/Fatoumata%20DEMBELE/Desktop/images/openfarm5.webp1692871901392.undefined', 15, 0),
(6, 'pharm12493434', 6828, 22222, 28, 'file:///C:/Users/Fatoumata%20DEMBELE/Desktop/images/conn.png1692872472337.png', 15, 0),
(7, 'produitA', 6828, 22222, 28, 'http://localhost:3000/images/open6.jpg1692891945277.jpg', 15, 0),
(8, 'cahier', 30, 200, 300, 'http://localhost:3000/images/open6.jpg1692898825683.jpg', 16, 0),
(9, 'sac', 20, 250, 350, 'http://localhost:3000/images/open6.jpg1692898857114.jpg', 16, 0),
(10, 'telephone', 25, 200, 350, 'http://localhost:3000/images/open6.jpg1692898879570.jpg', 16, 0),
(11, 'bic', 10, 100, 200, 'http://localhost:3000/images/open6.jpg1692898910510.jpg', 16, 0);

-- --------------------------------------------------------

--
-- Structure de la table `stock`
--

CREATE TABLE `stock` (
  `id_stock` int(10) UNSIGNED NOT NULL,
  `quantite` int(10) UNSIGNED NOT NULL,
  `id_produit` int(10) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `stock`
--

INSERT INTO `stock` (`id_stock`, `quantite`, `id_produit`) VALUES
(1, 881, 1),
(6, 239, 3),
(3, 200, 2),
(7, 400, 11),
(8, 200, 10),
(9, 250, 9);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id_user` smallint(5) UNSIGNED NOT NULL,
  `login` varchar(45) NOT NULL,
  `pass` varchar(100) NOT NULL,
  `nom_boutique` varchar(255) NOT NULL,
  `type_boutique` varchar(100) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `telephone` varchar(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id_user`, `login`, `pass`, `nom_boutique`, `type_boutique`, `adresse`, `telephone`) VALUES
(1, 'feitan', '123456', 'clan', 'boutique', 'Magnanbougou', '56389615'),
(2, 'ahmad06', 'monopoly', 'Ahmad', 'Mode', 'Bakadjanbougou', '77777552'),
(3, 'barouni', 'gambi', 'boutique koroni', 'cosmetic', 'kati', '60000100'),
(15, 'Diaminatou', '$2b$10$.JVNRtA4z3OwakAIZ4EYq.pKFHqko.labdHwJ38Ay5hAFB7LAsRba', '6828233779', 'passworddrr', 'feminin', '68286610'),
(16, 'user1', '$2b$10$CxlVzZQRek5pIxwidhEt7el2CAGGUT/BmQYgleMRjSGoI6kMJ9pru', 'user1', 'commerce general', 'ACI2000', '68286620'),
(17, 'user12', '$2b$10$hQ9.UyQsOBvOO2KwmGlLZux99YBI.yiR49gVPmNc92dOLkjJKm4RK', 'user12', 'commerce general', 'ACI2000', '68286629'),
(18, 'user12', '$2b$10$6jNbqzQaYc3nEGfOv3lsU.NRShm82cbl/RNfzFs.khxHwRJHtUpoG', 'user12', 'commerce general', 'ACI2000', '68286628');

-- --------------------------------------------------------

--
-- Structure de la table `vente`
--

CREATE TABLE `vente` (
  `id_vente` bigint(20) UNSIGNED NOT NULL,
  `date_vente` datetime NOT NULL,
  `id_user` smallint(5) UNSIGNED NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `vente`
--

INSERT INTO `vente` (`id_vente`, `date_vente`, `id_user`, `id`) VALUES
(3, '2023-08-17 23:18:43', 3, 0),
(2, '2023-08-09 13:27:45', 15, 0),
(4, '2023-08-18 16:32:50', 15, 0),
(5, '2023-08-25 11:37:43', 16, 1),
(6, '2023-08-25 11:37:55', 16, 2),
(7, '2023-08-25 11:38:32', 17, 1),
(8, '2023-08-25 11:38:44', 17, 2);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `appro`
--
ALTER TABLE `appro`
  ADD PRIMARY KEY (`id_appro`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `depense`
--
ALTER TABLE `depense`
  ADD PRIMARY KEY (`id_depense`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `ligne_appro`
--
ALTER TABLE `ligne_appro`
  ADD KEY `id_produit` (`id_produit`),
  ADD KEY `id_appro` (`id_appro`);

--
-- Index pour la table `ligne_vente`
--
ALTER TABLE `ligne_vente`
  ADD KEY `id_vente` (`id_vente`),
  ADD KEY `id_produit` (`id_produit`);

--
-- Index pour la table `produit`
--
ALTER TABLE `produit`
  ADD PRIMARY KEY (`id_produit`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`id_stock`),
  ADD KEY `id_produit` (`id_produit`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- Index pour la table `vente`
--
ALTER TABLE `vente`
  ADD PRIMARY KEY (`id_vente`),
  ADD KEY `id_user` (`id_user`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `appro`
--
ALTER TABLE `appro`
  MODIFY `id_appro` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `depense`
--
ALTER TABLE `depense`
  MODIFY `id_depense` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `produit`
--
ALTER TABLE `produit`
  MODIFY `id_produit` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT pour la table `stock`
--
ALTER TABLE `stock`
  MODIFY `id_stock` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `vente`
--
ALTER TABLE `vente`
  MODIFY `id_vente` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
