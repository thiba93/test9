// Pages/gcu.js
import React from "react"
import Layout from "../components/Layout"
import CGUSection from "@/components/CGUSection"

const sections = [
  {
    title: "Préambule",
    content: "Les présentes Conditions Générales d'Utilisation (ci-après « CGU ») définissent les conditions dans lesquelles la société Airneis (ci-après « la Société ») propose l'accès à son site internet de vente de meubles (ci-après « le Site »). En accédant au Site, l'utilisateur (ci-après « l'Utilisateur ») accepte sans réserve les présentes CGU."
  },
  {
    title: "1. Objet",
    content: "Les CGU ont pour objet de définir les modalités d'accès et d'utilisation du Site par l'Utilisateur. Elles constituent un contrat entre l'Utilisateur et la Société."
  },
  {
    title: "2. Accès au Site",
    subtitle:"2.1 Disponibilité du Site",
    content: "La Société s'efforce de maintenir accessible le Site 24 heures sur 24, 7 jours sur 7. Toutefois, elle ne saurait être tenue responsable en cas d'indisponibilité du Site, quelle qu'en soit la cause."
  },
  {
    subtitle: "2.2 Maintenance",
    content: "La Société peut interrompre l'accès au Site pour des raisons de maintenance, sans préavis. L'Utilisateur accepte que la Société ne soit pas responsable des conséquences de ces interruptions."
  },
  {
    title: "3. Inscription et Compte Utilisateur",
    subtitle:"3.1 Inscription",
    content: "Pour accéder à certaines fonctionnalités du Site, l'Utilisateur doit s'inscrire en fournissant des informations personnelles exactes et complètes. L'Utilisateur s'engage à mettre à jour ces informations en cas de changement."
  },
  {
    subtitle: "3.2 Confidentialité du Compte",
    content: "L'Utilisateur est responsable de la confidentialité de ses identifiants de connexion. Toute utilisation du compte de l'Utilisateur, qu'elle soit autorisée ou non, est de la responsabilité de l'Utilisateur. La Société ne saurait être tenue responsable de toute utilisation frauduleuse du compte."
  },
  {
    title: "4. Utilisation du Site",
    subtitle:"4.1 Comportement de l'Utilisateur",
    content: "L'Utilisateur s'engage à utiliser le Site de manière légale et à respecter les lois en vigueur.   Il s'interdit notamment de : -Porter atteinte aux droits de propriété intellectuelle de la Société ou de tiers. -Diffuser des contenus illicites, nuisibles, diffamatoires, ou contraires aux bonnes mœurs. -Perturber le bon fonctionnement du Site."
  },
  {
    subtitle: "4.2 Contenus Utilisateurs",
    content: "L'Utilisateur peut être amené à publier des contenus sur le Site. Il en reste l'unique responsable et s'engage à ce que ces contenus respectent les lois en vigueur et ne portent pas atteinte aux droits de tiers."
  },
  {
    title: "5. Produits et Commandes",
    subtitle: "5.1 Description des Produits",
    content: "La Société s'efforce de fournir des descriptions précises des produits proposés à la vente sur le Site. Toutefois, elle ne saurait être tenue responsable des éventuelles erreurs ou omissions."
  },
  {
    subtitle: "5.2 Commandes",
    content: "Les commandes passées par l'Utilisateur sont fermes et définitives. La Société se réserve le droit de refuser ou d'annuler une commande en cas de litige avec l'Utilisateur, de non-paiement total ou partiel d'une commande précédente, ou pour tout autre motif légitime."
  },
  {
    title: "6. Prix et Paiement",
    subtitle: "6.1 Prix",
    content: "Les prix des produits sont indiqués en euros, toutes taxes comprises (TTC), hors frais de livraison. La Société se réserve le droit de modifier ses prix à tout moment."
  },
  {
    subtitle: "6.2 Paiement",
    content: "Le paiement des commandes s'effectue par les moyens de paiement indiqués sur le Site. L'Utilisateur garantit qu'il dispose des autorisations nécessaires pour utiliser le mode de paiement choisi."
  },
  {
    title: "7. Livraison",
    subtitle: "7.1 Délai de Livraison",
    content: "La Société s'efforce de respecter les délais de livraison indiqués lors de la commande. Toutefois, ces délais sont donnés à titre indicatif et des retards peuvent survenir indépendamment de la volonté de la Société."
  },
  {
    subtitle: "7.2 Réception des Produits",
    content: "L'Utilisateur doit vérifier l'état des produits à la réception et signaler toute anomalie à la Société dans les plus brefs délais."
  },
  {
    title: "8. Droit de Rétractation",
    subtitle: "8.1 Conditions de Rétractation",
    content: "Conformément aux dispositions légales, l'Utilisateur dispose d'un délai de 14 jours à compter de la réception des produits pour exercer son droit de rétractation sans avoir à justifier de motifs ni à payer de pénalités."
  },
  {
    subtitle: "8.2 Retour des Produits",
    content: "Les produits doivent être retournés dans leur état d'origine, complets et non endommagés. Les frais de retour sont à la charge de l'Utilisateur."
  },
  {
    title: "9. Garanties et Responsabilités",
    subtitle: "9.1 Garanties Légales",
    content: "Les produits vendus sur le Site bénéficient des garanties légales de conformité et des vices cachés."
  },
  {
    subtitle: "9.2 Limitation de Responsabilité",
    content: "La responsabilité de la Société ne saurait être engagée pour tout dommage indirect, perte de profit, perte de données ou tout autre dommage résultant de l'utilisation ou de l'impossibilité d'utiliser le Site ou les produits."
  },
  {
    title: "10. Propriété Intellectuelle",
    content: "Tous les contenus du Site (textes, images, logos, etc.) sont la propriété exclusive de la Société ou de ses partenaires. Toute reproduction, représentation ou exploitation, totale ou partielle, sans autorisation préalable de la Société est interdite."
  },
  {
    title: "11. Modifications des CGU",
    content: "La Société se réserve le droit de modifier les présentes CGU à tout moment. Les modifications entreront en vigueur dès leur mise en ligne sur le Site. L'Utilisateur est invité à consulter régulièrement les CGU."
  },
  {
    title: "12. Loi Applicable et Juridiction",
    content: "Les présentes CGU sont soumises au droit français. Tout litige relatif à leur interprétation ou leur exécution sera de la compétence des tribunaux français."
  },
  {
    title: "13. Contact",
    content: "Pour toute question relative aux présentes CGU, l'Utilisateur peut contacter la Société via l'onglet Contact dans le menu."
  },
]
const renderSections = () => sections.map((section, index) => (
    <CGUSection key={index} title={section.title} subtitle ={section.subtitle} content={section.content} />
  ))
const CGU = () => (
  <Layout>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Conditions Générales d'Utilisation</h1>
      <p className="mb-4">Voici les Conditions Générales d'Utilisation de notre site web.</p>
      {renderSections()}
    </div>
  </Layout>
)

export default CGU
