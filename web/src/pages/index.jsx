import Carousel from "@/components/Carousel"
import Layout from "@/components/Layout"
import React from "react"
import Category from "@/components/Category"
import Link from "next/link"

const IndexPage = () => (
  <Layout>
    <Carousel></Carousel>
    <div className="text-center my-4">
      <Link href="/category" legacyBehavior>
        <a className="text-blue-500 underline">Voir toutes les catégories</a>
      </Link>
    </div>
    <Category></Category>
  </Layout>
)

export default IndexPage
