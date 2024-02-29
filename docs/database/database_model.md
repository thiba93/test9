# Schema

```mermaid
---
title: Airneis database model
---

classDiagram

CategoryGroup "1" --|> "*" ItemCatalog : contains
OrderLog "1" --|> "1" OrderStatus : has
ItemCatalog "*" --|> "*" OrderLog : orders
ClientProfile "1" --|> "*" ShippingDetails : has
ClientProfile "1" --|> "*" OrderLog : places
ClientProfile "1" --|> "*" UserMessages : sends
OrderLog "*" --|> "*" CartItems : includes
ItemCatalog "*" --|> "*" CartItems : included in

class ClientProfile {
    userProfileID increments notNull
    email text unique notNull
    pwdHash text notNull
    pwdSalt text notNull
    hashAndSalt text not Null
    nameFirst text notNull
    nameLast text notNull
    roleAdmin boolean default false notNull
}

class CategoryGroup {
    categoryID increments notNull
    displayName text notNull
    uniqueSlug text unique notNull
    displayRank number notNull
}

class ItemCatalog {
    catalogID increments notNull
    title text notNull
    groupID number notNull
    cost number notNull
    summary text notNull
    pictureLinks text notNull
    fabricType text notNull
    previewUrl text notNull
    unavailable boolean default false notNull
    featuredItem boolean default false notNull
}

class ShippingDetails {
    addressID increments notNull
    clientID number notNull
    primaryAddress text notNull
    secondaryAddress text
    town text notNull
    region text notNull
    postalCode text notNull
    nation text notNull
    firstName text notNull
    lastName text notNull
    mobileNumber text notNull
    extraNotes text 
}

class OrderLog {
    logID increments notNull
    clientID number notNull
    statusID number notNull
    sendAddressID number notNull
    billAddressID number notNull
    orderProcessing boolean notNull 
    orderFulfilled boolean notNull
    orderRevoked boolean notNull
}

class OrderStatus {
    statusID increments notNull
    statusName text notNull
    relatedToOrder boolean notNull
}

class CartItems {
    itemID increments notNull
    catalogID number notNull
    basketID number notNull
    itemCount number notNull
}

class UserMessages {
    messageID increments notNull
    fromEmail text notNull
    toEmail text notNull
    emailSubject text notNull
    emailMessage text notNull
    userProfileID number notNull
}

````

## Introduction

Ce document décrit le modèle de base de données conçu pour l'application Airneis. Il fournit une vue d'ensemble des différentes tables (classes), leurs attributs, et les relations entre elles. Ce modèle vise à soutenir les opérations de l'application en fournissant une structure organisée pour le stockage des données des utilisateurs, des produits, des commandes, et plus encore.

## Modèle de Base de Données

Le modèle de base de données Airneis est conçu pour gérer efficacement les informations relatives aux produits, aux utilisateurs, aux commandes, et aux interactions entre ces entités. Voici une description détaillée de chaque table impliquée dans le modèle.

### Tables et leurs Descriptions

#### ClientProfile

Stocke les informations des utilisateurs, y compris leurs détails d'identification, de contact, et leurs rôles au sein de l'application.

- **Attributes:**
  - `userProfileID`: Identifiant unique de l'utilisateur.
  - `email`: Adresse email de l'utilisateur.
  - `pwdHash`: Hash du mot de passe.
  - `pwdSalt`: Sel utilisé pour le hashage du mot de passe.
  - `hashAndSalt`: Combinaison du hash et du sel pour une sécurité accrue.
  - `nameFirst`: Prénom de l'utilisateur.
  - `nameLast`: Nom de famille de l'utilisateur.
  - `roleAdmin`: Indique si l'utilisateur a des droits d'administrateur.

#### CategoryGroup

Définit les catégories des produits pour organiser le catalogue.

- **Attributes:**
  - `categoryID`: Identifiant unique de la catégorie.
  - `displayName`: Nom affiché de la catégorie.
  - `uniqueSlug`: Slug unique pour l'URL de la catégorie.
  - `displayRank`: Ordre d'affichage de la catégorie.

#### ItemCatalog

Contient les informations détaillées sur chaque produit, y compris le prix, la description, et les images.

- **Attributes:**
  - `catalogID`: Identifiant unique du produit.
  - `title`: Titre du produit.
  - `groupID`: Identifiant de la catégorie à laquelle appartient le produit.
  - `cost`: Prix du produit.
  - `summary`: Description courte du produit.
  - `pictureLinks`: Liens vers les images du produit.
  - `fabricType`: Type de matériau du produit.
  - `previewUrl`: URL de l'image principale du produit.
  - `unavailable`: Indique si le produit est en rupture de stock.
  - `featuredItem`: Indique si le produit est mis en avant.

#### ShippingDetails

Gère les adresses de livraison associées aux utilisateurs.

- **Attributes:**
  - `addressID`: Identifiant unique de l'adresse.
  - `clientID`: Identifiant de l'utilisateur associé à l'adresse.
  - `primaryAddress`: Adresse principale.
  - `secondaryAddress`: Complément d'adresse.
  - `town`: Ville.
  - `region`: Région ou état.
  - `postalCode`: Code postal.
  - `nation`: Pays.
  - `firstName`: Prénom du destinataire.
  - `lastName`: Nom de famille du destinataire.
  - `mobileNumber`: Numéro de téléphone du destinataire.
  - `extraNotes`: Notes supplémentaires concernant la livraison.

#### OrderLog

Enregistre les détails des commandes passées, y compris leur statut et les adresses de livraison et de facturation.

- **Attributes:**
  - `logID`: Identifiant unique de la commande.
  - `clientID`: Identifiant de l'utilisateur ayant passé la commande.
  - `statusID`: Identifiant du statut de la commande.
  - `sendAddressID`: Identifiant de l'adresse de livraison.
  - `billAddressID`: Identifiant de l'adresse de facturation.
  - `orderProcessing`: Indique si la commande est en cours de traitement.
  - `orderFulfilled`: Indique si la commande a été livrée.
  - `orderRevoked`: Indique si la commande a été ann

ulée.

#### OrderStatus

Définit les différents statuts possibles pour les commandes.

- **Attributes:**
  - `statusID`: Identifiant unique du statut.
  - `statusName`: Nom du statut.
  - `relatedToOrder`: Indique si le statut est associé à une commande.

#### CartItems

Gère les articles ajoutés au panier d'achat par les utilisateurs, y compris la quantité de chaque produit.

- **Attributes:**
  - `itemID`: Identifiant unique de l'article du panier.
  - `catalogID`: Identifiant du produit ajouté au panier.
  - `basketID`: Identifiant du panier auquel appartient l'article.
  - `itemCount`: Quantité du produit ajoutée au panier.

#### UserMessages

Permet de stocker les messages envoyés par les utilisateurs via le formulaire de contact de l'application.

- **Attributes:**
  - `messageID`: Identifiant unique du message.
  - `fromEmail`: Adresse email de l'expéditeur.
  - `toEmail`: Adresse email du destinataire.
  - `emailSubject`: Sujet de l'email.
  - `emailMessage`: Corps du message.
  - `userProfileID`: Identifiant de l'utilisateur ayant envoyé le message.

## Conclusion

Ce document fournit une vue d'ensemble du modèle de base de données pour l'application Airneis, y compris les relations entre les différentes entités. Ce modèle est conçu pour être évolutif et pour soutenir efficacement les opérations de l'application.
```

