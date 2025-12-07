export const defaultPageData = [
  // 1. Product Pitch
  {
    id: "pitch_" + Date.now(),
    type: "productPitch",
    hidden: false,
    bgColor: "#FFFFFF",
    textColor: "#000000",

    title: "Smell Luxury. Pay Less. Get Noticed Instantly.",
    bullets: [
      "10–18 hours longevity (oil-based)",
      "Designer-inspired scent DNA",
      "Strong projection & scent trail",
      "Unisex premium blends",
    ],

    buttonText: "Order Now — Limited Stock",
    buttonLink: "#order",
    buttonColor: "#ff6b6b",
    buttonTextColor: "#ffffff",
    buttonAlign: "center",

    animation: "fadeIn",
  },

  // 2. Image + Text
  {
    id: "imageText_" + Date.now(),
    type: "imageText",
    hidden: false,
    bgColor: "#F7F7FC",
    textColor: "#000000",

    image: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    text: "<b>You deserve a scent that stays all day.</b> Our premium oils cling to skin & clothes, giving you confidence and compliments everywhere.",

    animation: "slideUp",
  },

  // 3. Benefit Grid
  {
    id: "benefits_" + Date.now(),
    type: "benefitGrid",
    hidden: false,
    bgColor: "#FDF4FF",
    textColor: "#000000",

    title: "Why Customers Prefer Our Luxury Perfumes",
    benefits: [
      {
        icon: "🔥",
        title: "Long Lasting",
        text: "10–18 hour performance on skin & clothes.",
      },
      {
        icon: "💎",
        title: "Designer Quality",
        text: "Smells almost identical to luxury originals.",
      },
      {
        icon: "💨",
        title: "Strong Projection",
        text: "Leaves a memorable scent everywhere you go.",
      },
      {
        icon: "💰",
        title: "Affordable Luxury",
        text: "Premium fragrance without premium pricing.",
      },
    ],

    animation: "fadeIn",
  },

  // 4. Product Showcase Grid
  {
    id: "products_" + Date.now(),
    type: "productShowcase",
    hidden: false,
    bgColor: "#FFFFFF",
    textColor: "#000000",

    title: "Our Best Selling Scents",
    products: [
      {
        name: "Million Nights™",
        desc: "Bold, masculine and powerful.",
        image: "https://via.placeholder.com/400",
      },
      {
        name: "Velvet Bloom™",
        desc: "Sweet, elegant feminine vibe.",
        image: "https://via.placeholder.com/400",
      },
      {
        name: "Arabian Ember™",
        desc: "Warm, oud-rich and mysterious.",
        image: "https://via.placeholder.com/400",
      },
      {
        name: "Blue Rush™",
        desc: "Sporty, fresh everyday scent.",
        image: "https://via.placeholder.com/400",
      },
    ],

    buttonText: "View Full Price List",
    buttonLink: "#prices",
    buttonColor: "#ff6b6b",
    buttonTextColor: "#ffffff",
    buttonAlign: "center",

    animation: "fadeIn",
  },

  // 5. Testimonials
  {
    id: "testimonials_" + Date.now(),
    type: "testimonials",
    hidden: false,
    bgColor: "#F7F7FC",
    textColor: "#000000",

    title: "Trusted by Over 3,200+ Customers",
    testimonials: [
      {
        name: "Sarah L.",
        quote: "Lasted from morning till night. Better than my 75k perfume.",
        stars: 5,
      },
      {
        name: "Michael A.",
        quote: "People compliment me everywhere I go.",
        stars: 5,
      },
      {
        name: "David U.",
        quote: "The scent trail is mad. I'm buying more.",
        stars: 5,
      },
    ],

    animation: "slideUp",
  },

  // 6. Countdown Offer
  {
    id: "countdown_" + Date.now(),
    type: "countdown",
    hidden: false,
    bgColor: "#111827",
    textColor: "#ffffff",

    title: "🔥 Flash Sale: Buy 2 Get 1 Free",
    subtext: "Offer ends when the timer hits zero or stock finishes.",
    deadline: "2025-12-31T23:59:59",

    buttonText: "Claim Offer Now",
    buttonLink: "#order",
    buttonColor: "#ff6b6b",
    buttonTextColor: "#ffffff",
    buttonAlign: "center",
    deadline: s.deadline,

    animation: "fadeIn",
  },

  // 7. Guarantee Section
  {
    id: "guarantee_" + Date.now(),
    type: "guarantee",
    hidden: false,
    bgColor: "#FFFFFF",
    textColor: "#000000",

    title: "100% Satisfaction Guaranteed",
    text: "If you're not satisfied with the longevity or scent quality, we’ll replace it — no stress.",

    animation: "fadeIn",
  },

  // 8. Final CTA
  {
    id: "finalCTA_" + Date.now(),
    type: "finalCTA",
    hidden: false,
    bgColor: "#6A5DFC",
    textColor: "#ffffff",

    title: "Ready to Smell Expensive?",
    text: "Order now and enjoy luxury scents delivered to you today.",

    buttonText: "Order on WhatsApp",
    buttonLink: "https://wa.me/234XXXXXXXXXX",
    buttonColor: "#ff6b6b",
    buttonTextColor: "#ffffff",
    buttonAlign: "center",

    animation: "slideUp",
    // ✅ REQUIRED DEFAULTS
    hasForm: false,
    formNameLabel: "Enter your name",
    formPhoneLabel: "Enter your WhatsApp number",
  },

  // 9. FAQ Section
  {
    id: "faq_" + Date.now(),
    type: "faq",
    hidden: false,
    bgColor: "#FFFFFF",
    textColor: "#000000",

    title: "Frequently Asked Questions",
    faqs: [
      { q: "How long does it last?", a: "10–18 hours depending on skin type." },
      { q: "Is it unisex?", a: "Yes, all fragrances are unisex blends." },
      { q: "Do you offer delivery?", a: "Yes, nationwide delivery available." },
    ],

    animation: "fadeIn",
  },

  // 10. Footer
  {
    id: "footer_" + Date.now(),
    type: "footer",
    hidden: false,
    bgColor: "#000000",
    textColor: "#ffffff",

    text: "© 2025 Perfume Brand. All rights reserved.",

    animation: "fadeIn",
  },
];
