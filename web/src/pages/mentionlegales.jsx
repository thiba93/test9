import Layout from "@/components/Layout"
import React from "react"
import Link from "next/link"

const LegalNotice = () => (
  <Layout>
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Mentions Légales</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Éditeur du site</h2>
        <p>Airneis</p>
        <p>Adresse de l&apos;entreprise</p>
        <p>Téléphone : 0123456789</p>
        <p>Contact : <Link href="/contact" legacyBehavior>
          <a>contact@airneis.com</a>
        </Link></p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Hébergement</h2>
        <p>Nom de l&apos;hébergeur</p>
        <p>Adresse de l&apos;hébergeur</p>
        <p>Téléphone : 0123456789</p>
        <p>Contact : <Link href="/contact" legacyBehavior>
          <a>contact@airneis.com</a>
        </Link></p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Propriété intellectuelle</h2>
        <p>Le contenu du site (textes, images, vidéos, etc.) est la propriété exclusive de Airneis sauf mention contraire.</p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Responsabilité</h2>
        <p>Airneis décline toute responsabilité quant à l&apos;utilisation qui pourrait être faite des informations et contenus présents sur le site.</p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Données personnelles</h2>
        <p>Les informations recueillies via les formulaires de contact sont destinées à Airneis et ne seront en aucun cas transmises à des tiers.</p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Cookies</h2>
        <p>Ce site utilise des cookies pour améliorer l&apos;expérience utilisateur.</p>
      </div>
    </div>
    </Layout>
  )

export default LegalNotice
