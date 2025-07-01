type JsonLdSchemaProps = {
  locale: string
}

export const JsonLdSchema = ({ locale }: JsonLdSchemaProps) => {
  const isArabic = locale === 'ar'

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Coursinity",
    "url": "https://www.coursinity.com",
    "logo": "https://www.coursinity.com/assets/logos/coursinity-logo.png",
    "description": isArabic 
      ? "توفر كورسينتي برامج تدريب مؤسسي مخصصة للشركات والمنظمات الحكومية في المملكة العربية السعودية"
      : "Coursinity provides customized corporate training programs for businesses and government organizations in Saudi Arabia.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Riyadh",
      "addressCountry": "SA"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "info@coursinity.com",
      "contactType": "customer service"
    }
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": isArabic 
      ? "التدريب المؤسسي للحكومة والأعمال"
      : "Corporate Training for Government and Business",
    "provider": {
      "@type": "Organization",
      "name": "Coursinity"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Saudi Arabia"
    },
    "description": isArabic
      ? "تقدم كورسينتي برامج تدريب في القيادة والتحول الرقمي والمهارات الناعمة مصممة خصيصاً لرؤية 2030 وتطوير القطاع العام في المملكة العربية السعودية"
      : "Coursinity offers leadership, digital transformation, and soft skills training programs tailored to Vision 2030 and public sector upskilling in Saudi Arabia."
  }

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5",
      "bestRating": "5"
    },
    "author": {
      "@type": "Person",
      "name": isArabic ? "فاطمة المطيري" : "Fatima Al-Mutairi"
    },
    "reviewBody": isArabic
      ? "برامج التدريب المؤسسي من كورسينتي ممتازة وملائمة لاحتياجات رؤية 2030. الخدمة احترافية والمحتوى عالي الجودة."
      : "Coursinity's corporate training programs are excellent and well-suited for Vision 2030 needs. Professional service and high-quality content.",
    "itemReviewed": {
      "@type": "Organization",
      "name": "Coursinity"
    }
  }

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [organizationSchema, serviceSchema, reviewSchema]
  }

  // Використовуємо детермінований JSON формат
  const jsonString = JSON.stringify(combinedSchema, null, 2)

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: jsonString
      }}
    />
  )
} 