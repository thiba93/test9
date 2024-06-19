import React from "react"

const CGUSection = ({ title, subtitle, content }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    {subtitle && <h3 className="text-xl font-semibold mb-2">{subtitle}</h3>}
    <p className="mb-4">{content}</p>
  </div>
)

export default CGUSection
