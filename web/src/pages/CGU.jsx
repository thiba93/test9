// Pages/gcu.js
import React from "react"
import Layout from "../components/Layout"
import CGUSection from "@/components/CGUSection"

const sections = [
  {
    title: "1. Introduction",
    content: "Bienvenue sur notre site web. En accédant ou en utilisant notre site web, vous acceptez d'être lié par ces termes et conditions."
  },
  {
    title: "2. Droits de Propriété Intellectuelle",
    content: "À l'exception du contenu que vous possédez, en vertu de ces Termes, nous possédons tous les droits de propriété intellectuelle et les matériaux contenus dans ce site web."
  },
  {
    title: "3. Restrictions",
    content: "Vous êtes spécifiquement restreint de tout ce qui suit : publier tout matériel du site web dans tout autre média ; vendre, sous-licencier et/ou autrement commercialiser tout matériel du site web."
  },
  {
    title: "4. Votre Contenu",
    content: "Dans ces Termes et Conditions Standard du Site Web, « Votre Contenu » désigne tout audio, vidéo, texte, images ou autre matériel que vous choisissez d'afficher sur ce site web."
  },
  {
    title: "5. Aucune garantie",
    content: "Ce site web est fourni 'tel quel', avec toutes les fautes, et nous ne faisons aucune représentation ou garantie, de quelque nature que ce soit, en ce qui concerne ce site web ou les matériaux contenus sur ce site web."
  },
  {
    title: "6. Limitation de responsabilité",
    content: "En aucun cas nous, ni aucun de nos dirigeants, administrateurs et employés, ne serons tenus responsables de quoi que ce soit découlant de ou de quelque manière que ce soit lié à votre utilisation de ce site web."
  },
  {
    title: "7. Indemnisation",
    content: "Vous nous indemnisez par la présente dans toute la mesure permise de toute responsabilité, coûts, demandes, causes d'action, dommages et dépenses découlant de quelque manière que ce soit de votre violation de l'une des dispositions de ces Termes."
  },
  {
    title: "8. Divisibilité",
    content: "Si une disposition de ces Termes est jugée invalide en vertu de toute loi applicable, ces dispositions seront supprimées sans affecter les autres dispositions des présentes."
  },
  {
    title: "9. Variation des Termes",
    content: "Nous sommes autorisés à réviser ces Termes à tout moment comme bon nous semble, et en utilisant ce site web, vous êtes censé examiner ces Termes sur une base régulière."
  },
  {
    title: "10. Cession",
    content: "Nous sommes autorisés à céder, transférer et sous-traiter nos droits et/ou obligations en vertu de ces Termes sans aucune notification."
  },
  {
    title: "11. Accord Complet",
    content: "Ces Termes constituent l'intégralité de l'accord entre nous et vous en relation avec votre utilisation de ce site web, et remplacent tous les accords et ententes antérieurs."
  },
  {
    title: "12. Loi Applicable et Juridiction",
    content: "Ces Termes seront régis et interprétés conformément aux lois de l'État de [Votre État], et vous vous soumettez à la juridiction non exclusive des tribunaux d'État et fédéraux situés dans [Votre État] pour la résolution de tout différend."
  },
]
const renderSections = () => sections.map((section, index) => (
    <CGUSection key={index} title={section.title} content={section.content} />
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
