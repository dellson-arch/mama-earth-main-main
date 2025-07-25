// Dynamic product database
export const productCategories = {
  "face-care": "Face Care",
  "hair-care": "Hair Care",
  "body-care": "Body Care",
  "baby-care": "Baby Care",
  "men-care": "Men's Care",
}

export const allProducts = [
  {
    id: 1,
    name: "Vitamin C Face Serum with Vitamin C & Turmeric",
    price: 599,
    originalPrice: 799,
    image: "/vitaminc.jpg",
    category: "face-care",
    rating: 4.8,
    reviews: 2847,
    description: "Brightens skin and reduces dark spots with natural Vitamin C and turmeric extract",
    fullDescription:
      "Transform your skin with our powerful Vitamin C Face Serum. This potent formula combines the brightening power of Vitamin C with the anti-inflammatory benefits of turmeric to give you radiant, even-toned skin. Perfect for daily use, this serum helps reduce dark spots, fine lines, and gives your skin a natural glow.",
    ingredients: ["Vitamin C (20%)", "Turmeric Extract", "Hyaluronic Acid", "Niacinamide", "Aloe Vera"],
    benefits: ["Brightening", "Anti-aging", "Hydrating", "Even Skin Tone"],
    skinType: ["All Skin Types", "Dull Skin", "Uneven Tone"],
    howToUse: [
      "Cleanse your face thoroughly",
      "Apply 2-3 drops on clean, dry skin",
      "Gently massage until absorbed",
      "Follow with moisturizer",
      "Use twice daily for best results",
      "Always apply sunscreen during the day",
    ],
    isBestseller: true,
    isNew: false,
    inStock: true,
    stockCount: 150,
    tags: ["Vitamin C", "Brightening", "Anti-aging", "Natural"],
  },
  {
    id: 2,
    name: "Onion Hair Oil for Hair Regrowth & Hair Fall Control",
    price: 399,
    originalPrice: 499,
    image: "/onion.avif",
    category: "hair-care",
    rating: 4.6,
    reviews: 1923,
    description: "Reduces hair fall and promotes hair growth with red onion extract and natural oils",
    fullDescription:
      "Say goodbye to hair fall with our potent Onion Hair Oil. Enriched with red onion extract, this oil strengthens hair follicles, reduces hair fall, and promotes healthy hair growth. The blend of natural oils nourishes your scalp and leaves your hair soft, shiny, and strong.",
    ingredients: ["Red Onion Extract", "Coconut Oil", "Curry Leaves", "Bhringraj", "Fenugreek"],
    benefits: ["Hair Growth", "Reduces Hair Fall", "Strengthening", "Scalp Nourishment"],
    hairType: ["All Hair Types", "Thinning Hair", "Hair Fall"],
    howToUse: [
      "Section your hair and apply oil to scalp",
      "Massage gently for 5-10 minutes",
      "Leave for at least 2 hours or overnight",
      "Wash with a mild shampoo",
      "Use 2-3 times a week for best results",
    ],
    isBestseller: false,
    isNew: true,
    inStock: true,
    stockCount: 89,
    tags: ["Onion", "Hair Growth", "Natural", "Ayurvedic"],
  },
  {
    id: 3,
    name: "Tea Tree Face Wash with Tea Tree & Neem",
    price: 249,
    originalPrice: 299,
    image: "/tea tree.avif",
    category: "face-care",
    rating: 4.4,
    reviews: 3421,
    description: "Deep cleanses and controls acne with natural tea tree oil and neem extract",
    fullDescription:
      "Combat acne and oily skin with our Tea Tree Face Wash. This gentle yet effective cleanser combines the antibacterial properties of tea tree oil with the purifying benefits of neem to deep cleanse pores, control excess oil, and prevent breakouts.",
    ingredients: ["Tea Tree Oil", "Neem Extract", "Aloe Vera", "Salicylic Acid", "Glycerin"],
    benefits: ["Acne Control", "Deep Cleansing", "Oil Control", "Antibacterial"],
    skinType: ["Oily Skin", "Acne-Prone", "Combination Skin"],
    howToUse: [
      "Wet your face with lukewarm water",
      "Take a small amount and create lather",
      "Gently massage on face for 30 seconds",
      "Rinse thoroughly with water",
      "Use twice daily - morning and evening",
      "Follow with a moisturizer",
    ],
    isBestseller: true,
    isNew: false,
    inStock: true,
    stockCount: 234,
    tags: ["Tea Tree", "Acne Control", "Natural", "Deep Cleansing"],
  },
  {
    id: 4,
    name: "Argan Hair Mask with Argan Oil & Vanilla",
    price: 449,
    originalPrice: 599,
    image: "/argan.webp",
    category: "hair-care",
    rating: 4.7,
    reviews: 1156,
    description: "Deep conditioning mask for dry and damaged hair with Moroccan argan oil",
    fullDescription:
      "Restore your hair's natural beauty with our luxurious Argan Hair Mask. Infused with pure Moroccan argan oil and vanilla, this intensive treatment deeply nourishes and repairs damaged hair, leaving it silky smooth and manageable.",
    ingredients: ["Argan Oil", "Vanilla Extract", "Shea Butter", "Keratin", "Coconut Oil"],
    benefits: ["Deep Conditioning", "Frizz Control", "Shine Enhancement", "Hair Repair"],
    hairType: ["Dry Hair", "Damaged Hair", "Frizzy Hair", "Chemically Treated"],
    howToUse: [
      "Shampoo hair and towel dry",
      "Apply mask from mid-length to ends",
      "Comb through for even distribution",
      "Leave for 10-15 minutes",
      "Rinse thoroughly with lukewarm water",
      "Use once or twice a week",
    ],
    isBestseller: false,
    isNew: false,
    inStock: true,
    stockCount: 67,
    tags: ["Argan Oil", "Deep Conditioning", "Luxury", "Hair Repair"],
  },
  {
    id: 5,
    name: "Ubtan Face Pack with Turmeric & Saffron",
    price: 299,
    originalPrice: 399,
    image: "/ubtan.jpg",
    category: "face-care",
    rating: 4.5,
    reviews: 2156,
    description: "Traditional Ayurvedic face pack for glowing and radiant skin",
    fullDescription:
      "Experience the ancient beauty secret with our Ubtan Face Pack. This traditional Ayurvedic blend of turmeric, saffron, and gram flour gently exfoliates, brightens, and gives you naturally glowing skin.",
    ingredients: ["Turmeric", "Saffron", "Gram Flour", "Rose Water", "Sandalwood"],
    benefits: ["Glowing Skin", "Tan Removal", "Natural Glow", "Gentle Exfoliation"],
    skinType: ["All Skin Types", "Dull Skin", "Tanned Skin"],
    howToUse: [
      "Mix with rose water or milk to form paste",
      "Apply evenly on clean face and neck",
      "Leave for 15-20 minutes until dry",
      "Gently scrub while washing off",
      "Rinse with lukewarm water",
      "Use 2-3 times a week",
    ],
    isBestseller: true,
    isNew: false,
    inStock: true,
    stockCount: 178,
    tags: ["Ubtan", "Ayurvedic", "Traditional", "Glowing Skin"],
  },
  {
    id: 6,
    name: "Rice Water Hair Conditioner with Rice Water & Keratin",
    price: 349,
    originalPrice: 449,
    image: "/rice.jpg",
    category: "hair-care",
    rating: 4.3,
    reviews: 987,
    description: "Smoothens and strengthens hair with fermented rice water and keratin",
    fullDescription:
      "Unlock the secret of Asian hair care with our Rice Water Hair Conditioner. Enriched with fermented rice water and keratin, this conditioner smoothens, strengthens, and adds incredible shine to your hair.",
    ingredients: ["Fermented Rice Water", "Keratin", "Coconut Milk", "Argan Oil", "Vitamin E"],
    benefits: ["Hair Smoothening", "Strengthening", "Shine Enhancement", "Detangling"],
    hairType: ["All Hair Types", "Rough Hair", "Tangled Hair"],
    howToUse: [
      "After shampooing, apply to damp hair",
      "Focus on mid-lengths and ends",
      "Leave for 2-3 minutes",
      "Rinse thoroughly with cool water",
      "Use after every shampoo",
    ],
    isBestseller: false,
    isNew: true,
    inStock: true,
    stockCount: 123,
    tags: ["Rice Water", "Asian Beauty", "Smoothening", "Natural"],
  },
  {
    id: 7,
    name: "Charcoal Face Mask with Activated Charcoal & Coffee",
    price: 199,
    originalPrice: 249,
    image: "/charcoal.jpg",
    category: "face-care",
    rating: 4.2,
    reviews: 1834,
    description: "Detoxifies and purifies skin with activated charcoal and coffee grounds",
    fullDescription:
      "Deep cleanse your skin with our Charcoal Face Mask. This powerful combination of activated charcoal and coffee grounds draws out impurities, unclogs pores, and leaves your skin feeling fresh and revitalized.",
    ingredients: ["Activated Charcoal", "Coffee Grounds", "Bentonite Clay", "Tea Tree Oil", "Aloe Vera"],
    benefits: ["Detoxifying", "Pore Cleansing", "Oil Control", "Blackhead Removal"],
    skinType: ["Oily Skin", "Combination Skin", "Acne-Prone"],
    howToUse: [
      "Apply on clean, dry face avoiding eye area",
      "Leave for 10-15 minutes until dry",
      "Gently peel off or rinse with warm water",
      "Follow with a moisturizer",
      "Use 1-2 times a week",
    ],
    isBestseller: false,
    isNew: false,
    inStock: true,
    stockCount: 201,
    tags: ["Charcoal", "Detox", "Pore Cleansing", "Coffee"],
  },
  {
    id: 8,
    name: "Coconut Body Lotion with Virgin Coconut Oil & Shea Butter",
    price: 299,
    originalPrice: 399,
    image: "/coco.jpg",
    category: "body-care",
    rating: 4.6,
    reviews: 1456,
    description: "Deeply moisturizes and nourishes skin with virgin coconut oil and shea butter",
    fullDescription:
      "Pamper your skin with our luxurious Coconut Body Lotion. This rich, creamy formula with virgin coconut oil and shea butter provides long-lasting hydration and leaves your skin soft, smooth, and beautifully scented.",
    ingredients: ["Virgin Coconut Oil", "Shea Butter", "Vitamin E", "Glycerin", "Natural Fragrance"],
    benefits: ["Deep Moisturizing", "Long-lasting Hydration", "Skin Softening", "Natural Fragrance"],
    skinType: ["All Skin Types", "Dry Skin", "Normal Skin"],
    howToUse: [
      "Apply on clean, dry skin",
      "Massage gently until absorbed",
      "Use daily after shower",
      "Pay attention to dry areas like elbows and knees",
    ],
    isBestseller: false,
    isNew: false,
    inStock: true,
    stockCount: 89,
    tags: ["Coconut", "Body Care", "Moisturizing", "Natural"],
  },
  {
    id: 9,
    name: "Aloe Vera Gel with 99% Pure Aloe Vera & Vitamin E",
    price: 199,
    originalPrice: 249,
    image: "/vitaminE.jpg",
    category: "body-care",
    rating: 4.8,
    reviews: 3245,
    description: "Multi-purpose gel for skin and hair with 99% pure aloe vera",
    fullDescription:
      "Experience the healing power of nature with our Pure Aloe Vera Gel. With 99% pure aloe vera and vitamin E, this versatile gel soothes, hydrates, and heals your skin and hair naturally.",
    ingredients: ["99% Pure Aloe Vera", "Vitamin E", "Cucumber Extract", "Green Tea", "Natural Preservatives"],
    benefits: ["Soothing", "Healing", "Multi-purpose", "Hydrating"],
    skinType: ["All Skin Types", "Sensitive Skin", "Sunburned Skin"],
    howToUse: [
      "Apply on clean skin or hair",
      "Massage gently until absorbed",
      "Can be used as moisturizer, hair gel, or after-sun care",
      "Use as needed throughout the day",
    ],
    isBestseller: true,
    isNew: false,
    inStock: true,
    stockCount: 456,
    tags: ["Aloe Vera", "Multi-purpose", "Soothing", "Natural"],
  },
  {
    id: 10,
    name: "Neem Face Wash with Neem & Tulsi",
    price: 179,
    originalPrice: 229,
    image: "/neem.avif",
    category: "face-care",
    rating: 4.3,
    reviews: 1876,
    description: "Antibacterial face wash for acne-prone skin with neem and tulsi",
    fullDescription:
      "Harness the power of Ayurveda with our Neem Face Wash. This gentle yet effective cleanser combines neem and tulsi to fight acne-causing bacteria while maintaining your skin's natural moisture balance.",
    ingredients: ["Neem Extract", "Tulsi", "Aloe Vera", "Glycerin", "Natural Cleansing Agents"],
    benefits: ["Antibacterial", "Acne Prevention", "Gentle Cleansing", "Natural"],
    skinType: ["Acne-Prone", "Oily Skin", "Sensitive Skin"],
    howToUse: [
      "Wet face with lukewarm water",
      "Apply small amount and create lather",
      "Massage gently for 30 seconds",
      "Rinse thoroughly",
      "Use twice daily",
    ],
    isBestseller: false,
    isNew: false,
    inStock: true,
    stockCount: 167,
    tags: ["Neem", "Ayurvedic", "Antibacterial", "Gentle"],
  },
  {
    id: 11,
    name: "Bhringraj Hair Oil for Hair Growth & Thickness",
    price: 429,
    originalPrice: 549,
    image: "/bhringraj.avif",
    category: "hair-care",
    rating: 4.5,
    reviews: 1234,
    description: "Ayurvedic hair oil for promoting hair growth and thickness",
    fullDescription:
      "Revitalize your hair with our traditional Bhringraj Hair Oil. This Ayurvedic formulation promotes hair growth, increases thickness, and prevents premature graying while nourishing your scalp.",
    ingredients: ["Bhringraj Extract", "Coconut Oil", "Sesame Oil", "Amla", "Fenugreek"],
    benefits: ["Hair Growth", "Thickness", "Prevents Graying", "Scalp Health"],
    hairType: ["All Hair Types", "Thinning Hair", "Premature Graying"],
    howToUse: [
      "Apply oil to scalp and hair",
      "Massage for 10-15 minutes",
      "Leave for 2 hours or overnight",
      "Wash with mild shampoo",
      "Use 2-3 times weekly",
    ],
    isBestseller: false,
    isNew: true,
    inStock: true,
    stockCount: 78,
    tags: ["Bhringraj", "Ayurvedic", "Hair Growth", "Traditional"],
  },
  {
    id: 12,
    name: "Gentle Baby Shampoo with Tear-Free Formula",
    price: 249,
    originalPrice: 299,
    image: "/baby.avif",
    category: "baby-care",
    rating: 4.9,
    reviews: 2567,
    description: "Gentle, tear-free shampoo specially formulated for babies",
    fullDescription:
      "Keep your baby's hair clean and soft with our Gentle Baby Shampoo. This tear-free, hypoallergenic formula is specially designed for delicate baby skin and hair, ensuring a safe and pleasant bath time.",
    ingredients: ["Mild Cleansing Agents", "Chamomile", "Aloe Vera", "Vitamin E", "Natural Moisturizers"],
    benefits: ["Tear-Free", "Gentle Cleansing", "Hypoallergenic", "Moisturizing"],
    skinType: ["Baby Skin", "Sensitive Skin"],
    howToUse: [
      "Wet baby's hair with lukewarm water",
      "Apply small amount of shampoo",
      "Gently massage and create lather",
      "Rinse thoroughly with clean water",
      "Use during every bath",
    ],
    isBestseller: true,
    isNew: false,
    inStock: true,
    stockCount: 345,
    tags: ["Baby Care", "Tear-Free", "Gentle", "Hypoallergenic"],
  },
]

// Helper functions
export const getProductById = (id) => {
  return allProducts.find((product) => product.id === Number.parseInt(id))
}

export const getProductsByCategory = (category) => {
  if (category === "all") return allProducts
  return allProducts.filter((product) => product.category === category)
}

export const getBestsellers = () => {
  return allProducts.filter((product) => product.isBestseller)
}

export const getNewProducts = () => {
  return allProducts.filter((product) => product.isNew)
}

export const searchProducts = (query) => {
  const searchTerm = query.toLowerCase()
  return allProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
      product.ingredients.some((ingredient) => ingredient.toLowerCase().includes(searchTerm)),
  )
}

export const getRelatedProducts = (productId, limit = 4) => {
  const product = getProductById(productId)
  if (!product) return []

  const related = allProducts.filter((p) => p.id !== productId && p.category === product.category).slice(0, limit)

  return related
}

export const getCategoryStats = () => {
  const stats = {}
  Object.keys(productCategories).forEach((category) => {
    stats[category] = allProducts.filter((p) => p.category === category).length
  })
  stats.all = allProducts.length
  return stats
}
