export const siteConfig = {
  name: "Markt 4 Tours and Travel",
  shortName: "M4T",
  description:
    "Your premier travel partner for unforgettable adventures across Uganda and East Africa. Specializing in wildlife safaris, cultural tours, and adventure travel since 2015.",

  // Contact Information
  contact: {
    phone: {
      primary: "+256(0) 762063160",
      secondary: "+256(0) 756384580",
      whatsapp: "+256(0) 762063160",
    },
    email: {
      primary: "info@markt4tours.com",
      bookings: "bookings@markt4tours.com",
      support: "support@markt4tours.com",
    },
    address: {
      street: "P.O.Box 430337",
      city: "Kampala",
      region: "Central Region",
      country: "Uganda",
      coordinates: {
        latitude: "0.3476",
        longitude: "32.5825",
      },
    },
  },

  // Social Media Links
  social: {
    facebook: "https://facebook.com/markt4tours",
    twitter: "https://twitter.com/markt4tours",
    instagram: "https://instagram.com/markt4tours",
    linkedin: "https://linkedin.com/company/markt4tours",
    youtube: "https://youtube.com/markt4tours",
    tripadvisor: "https://tripadvisor.com/markt4tours",
  },

  // Working Hours
  workingHours: {
    status: "Monday - Sunday: 7:00 AM - 8:00 PM",
    emergency: "24/7 Emergency Travel Support",
    office: "Monday - Friday: 8:00 AM - 6:00 PM",
    weekend: "Saturday - Sunday: 9:00 AM - 5:00 PM",
    holidays: "Available on holidays for urgent bookings",
  },

  // Company Meta Information
  meta: {
    foundedYear: 2015,
    license: "Licensed by Uganda Tourism Board",
    accreditation: "Certified Tour Operator & Travel Agency",
    certifications: [
      "Uganda Tourism Board Licensed",
      "IATA Registered Travel Agent",
      "Uganda Association of Tour Operators Member",
    ],
    values: [
      {
        title: "Adventure",
        description: "Creating thrilling and memorable travel experiences",
      },
      {
        title: "Authenticity",
        description: "Showcasing genuine local cultures and traditions",
      },
      {
        title: "Sustainability",
        description: "Promoting responsible and eco-friendly tourism",
      },
      {
        title: "Excellence",
        description:
          "Delivering exceptional service and unforgettable journeys",
      },
    ],
  },

  // Service Categories
  services: {
    safaris: [
      "Wildlife Safaris",
      "Gorilla Trekking",
      "Chimpanzee Tracking",
      "Bird Watching Tours",
      "Photography Safaris",
    ],
    cultural: [
      "Cultural Village Tours",
      "Traditional Craft Workshops",
      "Local Community Visits",
      "Historical Site Tours",
      "Festival & Event Tours",
    ],
    adventure: [
      "Mountain Climbing",
      "White Water Rafting",
      "Hiking & Trekking",
      "Cycling Tours",
      "Zip Lining",
    ],
    destinations: [
      "Bwindi Impenetrable National Park",
      "Queen Elizabeth National Park",
      "Murchison Falls National Park",
      "Lake Mburo National Park",
      "Kibale Forest National Park",
      "Mount Elgon National Park",
      "Semuliki National Park",
    ],
    specialPackages: [
      "Honeymoon Packages",
      "Family Adventure Tours",
      "Solo Traveler Packages",
      "Group Tours",
      "Custom Itineraries",
    ],
  },

  // SEO and Metadata
  seo: {
    title: "Markt 4 Tours and Travel - Uganda Safari & Adventure Tours",
    description:
      "Discover Uganda's wilderness with Markt 4 Tours and Travel. Expert-guided safaris, gorilla trekking, cultural tours, and adventure experiences across East Africa.",
    keywords: [
      "Uganda tours",
      "safari tours",
      "gorilla trekking",
      "wildlife safari",
      "East Africa travel",
      "adventure tours",
      "cultural tours",
      "Uganda travel agency",
      "tour operator",
      "travel Uganda",
    ],
    ogImage: "https://markt4tours.com/og-image.jpg",
  },

  // Legal Information
  legal: {
    name: "Markt 4 Tours and Travel Ltd",
    registration: "UG987654321",
    license: "UTB/TT/123456",
    privacyPolicy: "/privacy-policy",
    terms: "/terms-and-conditions",
    accessibility: "/accessibility",
    cancellationPolicy: "/cancellation-policy",
  },

  // Tour Package Types
  packageTypes: [
    {
      id: "day-trip",
      name: "Day Trip",
      duration: "1 day",
      description: "Perfect for short adventures and local experiences",
    },
    {
      id: "weekend",
      name: "Weekend Getaway",
      duration: "2-3 days",
      description: "Short breaks for busy schedules",
    },
    {
      id: "short-safari",
      name: "Short Safari",
      duration: "4-6 days",
      description: "Compact wildlife experiences",
    },
    {
      id: "classic-safari",
      name: "Classic Safari",
      duration: "7-10 days",
      description: "Comprehensive wildlife and cultural experiences",
    },
    {
      id: "extended-tour",
      name: "Extended Tour",
      duration: "11+ days",
      description: "In-depth exploration of multiple destinations",
    },
  ],

  // Payment and Booking
  booking: {
    paymentMethods: [
      "Credit Card",
      "Bank Transfer",
      "Mobile Money",
      "PayPal",
      "Western Union",
    ],
    currencies: ["USD", "EUR", "GBP", "UGX"],
    bookingPolicy: "50% deposit required, balance due 30 days before travel",
    cancellationPolicy: "Free cancellation up to 14 days before travel",
  },

  // Seasonal Information
  seasons: {
    dry: {
      name: "Dry Season",
      months: "June-September, December-February",
      description: "Best for wildlife viewing and trekking",
    },
    wet: {
      name: "Wet Season",
      months: "March-May, October-November",
      description: "Great for bird watching and lush landscapes",
    },
  },
};

// Helper function to get formatted contact info
export const getContactInfo = () => {
  const { contact } = siteConfig;
  return {
    mainPhone: contact.phone.primary,
    whatsapp: contact.phone.whatsapp,
    email: contact.email.primary,
    fullAddress: `${contact.address.street}, ${contact.address.city}, ${contact.address.region}, ${contact.address.country}`,
  };
};

// Helper function to get social media links
export const getSocialLinks = () => {
  return siteConfig.social;
};

// Helper function to get working hours
export const getWorkingHours = () => {
  return siteConfig.workingHours;
};

// Helper function to get SEO metadata
export const getSEOData = (pageName?: string) => {
  return {
    title: pageName ? `${pageName} - ${siteConfig.name}` : siteConfig.seo.title,
    description: siteConfig.seo.description,
    keywords: siteConfig.seo.keywords.join(", "),
    ogImage: siteConfig.seo.ogImage,
  };
};

// Helper function to get tour packages by type
export const getPackagesByType = (type: string) => {
  return siteConfig.packageTypes.find((pkg) => pkg.id === type);
};

// Helper function to get services by category
export const getServicesByCategory = (
  category: keyof typeof siteConfig.services
) => {
  return siteConfig.services[category] || [];
};

// Helper function to get seasonal information
export const getSeasonalInfo = () => {
  return siteConfig.seasons;
};
