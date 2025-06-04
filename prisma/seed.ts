// const { PrismaClient } = require("@prisma/client");
// const bcrypt = require("bcryptjs");

// const db = new PrismaClient({
//   log: ["error", "warn"],
//   datasources: {
//     db: {
//       url: process.env.DATABASE_URL,
//     },
//   },
// });

// // Get current year for password generation
// const currentYear = new Date().getFullYear();

// // Add retry logic for database operations
// async function retryOperation<T>(
//   operation: () => Promise<T>,
//   maxRetries = 3,
//   delay = 2000
// ): Promise<T> {
//   for (let i = 0; i < maxRetries; i++) {
//     try {
//       return await operation();
//     } catch (error) {
//       console.log(`Attempt ${i + 1} failed:`, error);

//       if (i === maxRetries - 1) {
//         throw error;
//       }

//       console.log(`Waiting ${delay}ms before retry...`);
//       await new Promise((resolve) => setTimeout(resolve, delay));

//       // Reconnect to database
//       try {
//         await db.$disconnect();
//         await db.$connect();
//         console.log("Reconnected to database");
//       } catch (reconnectError) {
//         console.log("Reconnection failed:", reconnectError);
//       }
//     }
//   }

//   // This line should technically never be reached
//   throw new Error("Retry operation failed unexpectedly.");
// }

// async function testConnection() {
//   console.log("Testing database connection...");
//   try {
//     await db.$connect();
//     console.log("✅ Database connection successful");

//     // Test a simple query
//     const result = await db.$queryRaw`SELECT 1 as test`;
//     console.log("✅ Database query test successful");
//     return true;
//   } catch (error) {
//     console.error("❌ Database connection failed:");
//     console.error("Error code:");
//     console.error("Error message:");

//     // if (error.code === 'P1001') {
//     //   console.error("\n🔧 Troubleshooting tips:");
//     //   console.error("1. Check if your DATABASE_URL is correct in .env file");
//     //   console.error("2. Verify your Neon database is running (not suspended)");
//     //   console.error("3. Ensure you're using the pooled connection string");
//     //   console.error("4. Check if SSL is required (add ?sslmode=require)");
//     // }

//     return false;
//   }
// }

// async function cleanDatabase() {
//   console.log("Cleaning up existing data...");
//   try {
//     // Use individual delete operations with retry logic
//     await retryOperation(async () => {
//       console.log("Deleting reviews...");
//       await db.review.deleteMany({});
//     });

//     await retryOperation(async () => {
//       console.log("Deleting bookings...");
//       await db.booking.deleteMany({});
//     });

//     await retryOperation(async () => {
//       console.log("Deleting tour attractions...");
//       await db.tourAttraction.deleteMany({});
//     });

//     await retryOperation(async () => {
//       console.log("Deleting tour itineraries...");
//       await db.tourItinerary.deleteMany({});
//     });

//     await retryOperation(async () => {
//       console.log("Deleting tours...");
//       await db.tour.deleteMany({});
//     });

//     await retryOperation(async () => {
//       console.log("Deleting attractions...");
//       await db.attraction.deleteMany({});
//     });

//     await retryOperation(async () => {
//       console.log("Deleting blogs...");
//       await db.blog.deleteMany({});
//     });

//     await retryOperation(async () => {
//       console.log("Deleting blog categories...");
//       await db.blogCategory.deleteMany({});
//     });

//     await retryOperation(async () => {
//       console.log("Deleting categories...");
//       await db.category.deleteMany({});
//     });

//     await retryOperation(async () => {
//       console.log("Deleting sessions...");
//       await db.session.deleteMany({});
//     });

//     await retryOperation(async () => {
//       console.log("Deleting accounts...");
//       await db.account.deleteMany({});
//     });

//     await retryOperation(async () => {
//       console.log("Deleting users...");
//       await db.user.deleteMany({});
//     });

//     console.log("✅ Database cleanup completed.");
//   } catch (error) {
//     console.error("❌ Error during cleanup:", error);
//     throw error;
//   }
// }

// async function seedDatabase() {
//   try {
//     console.log("Starting to seed new data...");

//     // Create admin user with retry
//     console.log("Creating admin user...");
//     const adminPassword = `Admin@${currentYear}`;
//     const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);

//     const adminUser = await retryOperation(async () => {
//       return await db.user.create({
//         data: {
//           email: "admin@tours.com",
//           name: "Tour Admin",
//           firstName: "Tour",
//           lastName: "Admin",
//           phone: "+1234567890",
//           role: "ADMIN",
//           isVerified: true,
//           status: true,
//           password: hashedAdminPassword,
//         },
//       });
//     });

//     // Create regular user for testing with retry
//     console.log("Creating regular user...");
//     const userPassword = `User@${currentYear}`;
//     const hashedUserPassword = await bcrypt.hash(userPassword, 10);

//     const regularUser = await retryOperation(async () => {
//       return await db.user.create({
//         data: {
//           email: "user@tours.com",
//           name: "John Traveler",
//           firstName: "John",
//           lastName: "Traveler",
//           phone: "+0987654321",
//           role: "USER",
//           isVerified: true,
//           status: true,
//           password: hashedUserPassword,
//         },
//       });
//     });

//     console.log("✅ Users created successfully");
//     console.log("Admin credentials:", {
//       email: "admin@tours.com",
//       password: adminPassword,
//     });
//     console.log("User credentials:", {
//       email: "user@tours.com",
//       password: userPassword,
//     });

//     // Create blog categories with retry and individual operations
//     console.log("Creating blog categories...");
//     const blogCategoryData = [
//       {
//         name: "Travel Tips",
//         slug: "travel-tips",
//       },
//       {
//         name: "Destinations",
//         slug: "destinations",
//       },
//       {
//         name: "Adventure",
//         slug: "adventure",
//       },
//       {
//         name: "Culture",
//         slug: "culture",
//       },
//       {
//         name: "Food & Dining",
//         slug: "food-dining",
//       },
//     ];

//     const blogCategories = [];
//     for (const categoryData of blogCategoryData) {
//       const category = await retryOperation(async () => {
//         return await db.blogCategory.create({
//           data: categoryData,
//         });
//       });
//       blogCategories.push(category);
//       console.log(`Created blog category: ${category.name}`);
//     }

//     console.log(`✅ Created ${blogCategories.length} blog categories`);

//     // Create tour categories with retry and individual operations
//     console.log("Creating tour categories...");
//     const tourCategoryData = [
//       {
//         title: "Adventure Tours",
//         slug: "adventure-tours",
//         imageUrl:
//           "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop",
//         description: "Thrilling adventure experiences for adrenaline seekers",
//       },
//       {
//         title: "Cultural Tours",
//         slug: "cultural-tours",
//         imageUrl:
//           "https://images.unsplash.com/photo-1539650116574-75c0c6d73a6e?w=800&h=600&fit=crop",
//         description: "Immerse yourself in local cultures and traditions",
//       },
//       {
//         title: "Nature & Wildlife",
//         slug: "nature-wildlife",
//         imageUrl:
//           "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
//         description: "Explore pristine nature and observe wildlife",
//       },
//       {
//         title: "City Tours",
//         slug: "city-tours",
//         imageUrl:
//           "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop",
//         description: "Discover the best of urban destinations",
//       },
//       {
//         title: "Beach & Island",
//         slug: "beach-island",
//         imageUrl:
//           "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
//         description: "Relaxing beach and tropical island getaways",
//       },
//     ];

//     const categories = [];
//     for (const categoryData of tourCategoryData) {
//       const category = await retryOperation(async () => {
//         return await db.category.create({
//           data: categoryData,
//         });
//       });
//       categories.push(category);
//       console.log(`Created tour category: ${category.title}`);
//     }

//     console.log(`✅ Created ${categories.length} tour categories`);

//     // Continue with rest of seeding... (attractions, tours, etc.)
//     // Create attractions with retry
//     console.log("Creating attractions...");
//     const attractionData = [
//       {
//         name: "Mount Kilimanjaro",
//         description:
//           "Africa's highest peak and one of the world's most iconic mountains",
//         location: "Tanzania",
//         coordinates: { lat: -3.0674, lng: 37.3556 },
//         images: [
//           "https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?w=800&h=600&fit=crop",
//           "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop",
//         ],
//         type: "NATURAL",
//       },
//       {
//         name: "Serengeti National Park",
//         description:
//           "World-renowned wildlife sanctuary famous for the Great Migration",
//         location: "Tanzania",
//         coordinates: { lat: -2.3333, lng: 34.8333 },
//         images: [
//           "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop",
//           "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
//         ],
//         type: "NATURAL",
//       },
//       {
//         name: "Stone Town",
//         description: "Historic center of Zanzibar with rich cultural heritage",
//         location: "Zanzibar, Tanzania",
//         coordinates: { lat: -6.1659, lng: 39.1917 },
//         images: [
//           "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
//           "https://images.unsplash.com/photo-1587974928442-77dc3e1dba72?w=800&h=600&fit=crop",
//         ],
//         type: "HISTORICAL",
//       },
//       {
//         name: "Ngorongoro Crater",
//         description:
//           "Large volcanic caldera with incredible wildlife diversity",
//         location: "Tanzania",
//         coordinates: { lat: -3.2167, lng: 35.5833 },
//         images: [
//           "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop",
//         ],
//         type: "NATURAL",
//       },
//       {
//         name: "Lake Manyara",
//         description: "Scenic lake known for tree-climbing lions and flamingos",
//         location: "Tanzania",
//         coordinates: { lat: -3.3833, lng: 35.8167 },
//         images: [
//           "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&h=600&fit=crop",
//         ],
//         type: "NATURAL",
//       },
//     ];

//     const attractions = [];
//     for (const attractionInfo of attractionData) {
//       const attraction = await retryOperation(async () => {
//         return await db.attraction.create({
//           data: attractionInfo,
//         });
//       });
//       attractions.push(attraction);
//       console.log(`Created attraction: ${attraction.name}`);
//     }

//     console.log(`✅ Created ${attractions.length} attractions`);

//     // Rest of your seeding logic with similar retry patterns...
//     // For brevity, I'm showing the pattern - apply this to all your create operations

//     console.log("🎉 Seed completed successfully!");
//     console.log("=".repeat(50));
//     console.log("LOGIN CREDENTIALS:");
//     console.log("Admin - Email: admin@tours.com, Password:", adminPassword);
//     console.log("User - Email: user@tours.com, Password:", userPassword);
//     console.log("=".repeat(50));
//   } catch (error) {
//     console.error("❌ Error during seeding:", error);
//     throw error;
//   }
// }

// async function main() {
//   console.log("🚀 Starting database seed process...");

//   try {
//     // Test connection first
//     const isConnected = await testConnection();
//     if (!isConnected) {
//       console.error(
//         "❌ Cannot proceed with seeding - database connection failed"
//       );
//       process.exit(1);
//     }

//     await cleanDatabase();
//     await seedDatabase();
//     console.log("🎉 Database seeding completed successfully!");
//   } catch (error) {
//     console.error("❌ Error in main seed process:", error);
//     throw error;
//   }
// }

// main()
//   .catch((e) => {
//     console.error("💥 Failed to seed database:", e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await db.$disconnect();
//     console.log("👋 Database connection closed");
//   });

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const db = new PrismaClient({
  log: ["error", "warn"],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

// Get current year for password generation
const currentYear = new Date().getFullYear();
interface Itinerary {
  day: number;
  title: string;
  description: string;
  activities: string[];
}
// Add retry logic for database operations

async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  delay = 2000
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      console.log(`Attempt ${i + 1} failed:`, error);

      if (i === maxRetries - 1) {
        throw error;
      }

      console.log(`Waiting ${delay}ms before retry...`);
      await new Promise((resolve) => setTimeout(resolve, delay));

      // Reconnect to database
      try {
        await db.$disconnect();
        await db.$connect();
        console.log("Reconnected to database");
      } catch (reconnectError) {
        console.log("Reconnection failed:", reconnectError);
      }
    }
  }

  // This line should technically never be reached
  throw new Error("Retry operation failed unexpectedly.");
}

async function testConnection() {
  console.log("Testing database connection...");
  try {
    await db.$connect();
    console.log("✅ Database connection successful");
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    return false;
  }
}

async function cleanToursData() {
  console.log("Cleaning up existing tours data...");
  try {
    await retryOperation(async () => {
      console.log("Deleting reviews...");
      await db.review.deleteMany({});
    });

    await retryOperation(async () => {
      console.log("Deleting bookings...");
      await db.booking.deleteMany({});
    });

    await retryOperation(async () => {
      console.log("Deleting tour attractions...");
      await db.tourAttraction.deleteMany({});
    });

    await retryOperation(async () => {
      console.log("Deleting tour itineraries...");
      await db.tourItinerary.deleteMany({});
    });

    await retryOperation(async () => {
      console.log("Deleting tours...");
      await db.tour.deleteMany({});
    });

    console.log("✅ Tours data cleanup completed.");
  } catch (error) {
    console.error("❌ Error during tours cleanup:", error);
    throw error;
  }
}

async function seedUgandaTours() {
  try {
    console.log("Starting to seed Uganda tours...");

    // Category IDs as provided
    const categoryIds = {
      adventure: "cmbb3tqxp0007g63clm0b7obx",
      cultural: "cmbb3trl70008g63c3gqpx1vy",
      nature: "cmbb3trxm0009g63cd9ui4a4m",
      city: "cmbb3ts5s000ag63c3uzjrygh",
      beach: "cmbb3tskb000bg63ce0avlar4",
    };

    // Adventure Tours (3 tours)
    const adventureTours = [
      {
        title: "Mount Elgon Hiking Adventure",
        slug: "mount-elgon-hiking-adventure",
        description:
          "Embark on an exhilarating hiking adventure to Mount Elgon, Uganda's second-highest mountain. This challenging trek takes you through diverse ecosystems, from montane forest to bamboo zones and alpine moorland. Experience the thrill of standing on Wagagai Peak at 4,321 meters, explore ancient caves, and witness the spectacular Sipi Falls.",
        shortDescription:
          "5-day challenging hike to Uganda's second-highest peak with camping and cultural experiences",
        images: [
          "https://images.unsplash.com/photo-1464822759844-d150baec4e84?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        ],
        price: 1200,
        discountPrice: 1000,
        duration: 5,
        maxGroupSize: 8,
        difficulty: "CHALLENGING",
        categoryId: categoryIds.adventure,
        location: "Mount Elgon National Park, Uganda",
        includes: [
          "Professional mountain guide",
          "Camping equipment and tents",
          "All meals during the trek",
          "Park entrance fees",
          "Transportation to/from trailhead",
          "Safety equipment",
        ],
        excludes: [
          "Personal hiking gear",
          "Travel insurance",
          "Tips for guides",
          "Personal expenses",
          "Alcoholic beverages",
        ],
        featured: true,
        active: true,
      },
      {
        title: "White Water Rafting on River Nile",
        slug: "white-water-rafting-river-nile",
        description:
          "Experience the ultimate adrenaline rush with white water rafting on the mighty River Nile in Jinja, the adventure capital of East Africa. Navigate through Grade 5 rapids with names like 'The Bad Place' and 'Overtime,' while enjoying stunning views of the Nile's source.",
        shortDescription:
          "Full-day white water rafting adventure on the source of the River Nile",
        images: [
          "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        ],
        price: 180,
        duration: 1,
        maxGroupSize: 12,
        difficulty: "MODERATE",
        categoryId: categoryIds.adventure,
        location: "Jinja, Uganda",
        includes: [
          "Professional rafting guide",
          "All safety equipment",
          "Lunch and refreshments",
          "Transportation from Jinja",
          "Safety briefing",
          "Action photos",
        ],
        excludes: [
          "Transportation to Jinja",
          "Accommodation",
          "Travel insurance",
          "Personal items",
          "Tips",
        ],
        featured: false,
        active: true,
      },
      {
        title: "Bungee Jumping & Zip-lining Combo",
        slug: "bungee-jumping-zip-lining-combo",
        description:
          "Take the ultimate leap of faith with Uganda's highest bungee jump at 44 meters above the River Nile, followed by an exhilarating zip-line experience. Located at the Adrift Adventure Center in Jinja, this combo package offers two of the most thrilling adventure activities in East Africa.",
        shortDescription:
          "Ultimate thrill combo: 44m bungee jump and zip-lining over the River Nile",
        images: [
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
        ],
        price: 250,
        duration: 1,
        maxGroupSize: 6,
        difficulty: "MODERATE",
        categoryId: categoryIds.adventure,
        location: "Jinja, Uganda",
        includes: [
          "Bungee jump experience",
          "Zip-line adventure",
          "Safety equipment",
          "Professional instructors",
          "Certificate of completion",
          "Photo package",
        ],
        excludes: [
          "Transportation",
          "Meals",
          "Accommodation",
          "Travel insurance",
          "Personal expenses",
        ],
        featured: false,
        active: true,
      },
    ];

    // Cultural Tours (3 tours)
    const culturalTours = [
      {
        title: "Batwa Cultural Heritage Experience",
        slug: "batwa-cultural-heritage-experience",
        description:
          "Immerse yourself in the rich cultural heritage of the Batwa people, Uganda's indigenous forest dwellers. This authentic cultural experience takes you to the edge of Bwindi Impenetrable Forest, where you'll learn about traditional Batwa lifestyle, hunting techniques, and medicinal plant knowledge.",
        shortDescription:
          "Authentic cultural immersion with Uganda's indigenous Batwa people",
        images: [
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1587974928442-77dc3e1dba72?w=800&h=600&fit=crop",
        ],
        price: 120,
        duration: 1,
        maxGroupSize: 15,
        difficulty: "EASY",
        categoryId: categoryIds.cultural,
        location: "Bwindi Impenetrable Forest, Uganda",
        includes: [
          "Batwa community guide",
          "Traditional dance performance",
          "Village visit",
          "Craft demonstration",
          "Light refreshments",
          "Community development contribution",
        ],
        excludes: [
          "Transportation to Bwindi",
          "Accommodation",
          "Main meals",
          "Personal purchases",
          "Tips",
        ],
        featured: true,
        active: true,
      },
      {
        title: "Buganda Kingdom Cultural Tour",
        slug: "buganda-kingdom-cultural-tour",
        description:
          "Discover the rich history and culture of the Buganda Kingdom, Uganda's largest traditional kingdom. Visit the magnificent Kasubi Tombs, a UNESCO World Heritage Site where Buganda kings are buried. Explore the Kabaka's Palace and learn about traditional Buganda architecture.",
        shortDescription:
          "Comprehensive cultural tour of Uganda's largest traditional kingdom",
        images: [
          "https://images.unsplash.com/photo-1539650116574-75c0c6d73a6e?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1587974928442-77dc3e1dba72?w=800&h=600&fit=crop",
        ],
        price: 80,
        duration: 1,
        maxGroupSize: 20,
        difficulty: "EASY",
        categoryId: categoryIds.cultural,
        location: "Kampala, Uganda",
        includes: [
          "Professional cultural guide",
          "Kasubi Tombs entrance",
          "Palace visit",
          "Traditional lunch",
          "Craft center visits",
          "Transportation within Kampala",
        ],
        excludes: [
          "Hotel pickup/drop-off",
          "Personal expenses",
          "Tips",
          "Souvenirs",
          "Travel insurance",
        ],
        featured: false,
        active: true,
      },
      {
        title: "Traditional Music & Dance Workshop",
        slug: "traditional-music-dance-workshop",
        description:
          "Participate in an interactive workshop celebrating Uganda's diverse musical traditions. Learn traditional dances from different Ugandan cultures including the energetic Kiganda dance, the graceful Acholi dance, and the powerful Karamojong warrior dance.",
        shortDescription:
          "Interactive workshop learning traditional Ugandan music and dance",
        images: [
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1539650116574-75c0c6d73a6e?w=800&h=600&fit=crop",
        ],
        price: 60,
        duration: 1,
        maxGroupSize: 25,
        difficulty: "EASY",
        categoryId: categoryIds.cultural,
        location: "Kampala, Uganda",
        includes: [
          "Master musician instructors",
          "Traditional instruments",
          "Dance lessons",
          "Cultural background sessions",
          "Performance opportunity",
          "Light refreshments",
        ],
        excludes: [
          "Transportation",
          "Accommodation",
          "Personal recording equipment",
          "Costume rental",
          "Tips",
        ],
        featured: false,
        active: true,
      },
    ];

    // Nature & Wildlife Tours (3 tours)
    const natureTours = [
      {
        title: "Gorilla Trekking in Bwindi Forest",
        slug: "gorilla-trekking-bwindi-forest",
        description:
          "Experience one of the world's most extraordinary wildlife encounters with mountain gorilla trekking in Bwindi Impenetrable Forest. This UNESCO World Heritage Site is home to nearly half of the world's remaining mountain gorillas.",
        shortDescription:
          "Ultimate wildlife experience tracking endangered mountain gorillas",
        images: [
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
        ],
        price: 800,
        discountPrice: 750,
        duration: 1,
        maxGroupSize: 8,
        difficulty: "CHALLENGING",
        categoryId: categoryIds.nature,
        location: "Bwindi Impenetrable Forest, Uganda",
        includes: [
          "Gorilla tracking permit",
          "Expert guide and trackers",
          "Park entrance fees",
          "Packed lunch",
          "Walking stick",
          "Certificate of participation",
        ],
        excludes: [
          "Transportation to Bwindi",
          "Accommodation",
          "Porter services",
          "Travel insurance",
          "Tips for guides",
        ],
        featured: true,
        active: true,
      },
      {
        title: "Queen Elizabeth Safari Adventure",
        slug: "queen-elizabeth-safari-adventure",
        description:
          "Explore Uganda's most popular national park on this comprehensive safari adventure. Queen Elizabeth National Park offers incredible biodiversity with over 95 mammal species and 600 bird species.",
        shortDescription:
          "3-day comprehensive safari in Uganda's most biodiverse national park",
        images: [
          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop",
        ],
        price: 600,
        duration: 3,
        maxGroupSize: 10,
        difficulty: "EASY",
        categoryId: categoryIds.nature,
        location: "Queen Elizabeth National Park, Uganda",
        includes: [
          "Professional safari guide",
          "Game drives",
          "Boat cruise on Kazinga Channel",
          "Park entrance fees",
          "Full board accommodation",
          "Transportation during safari",
        ],
        excludes: [
          "Flight to Uganda",
          "Alcoholic beverages",
          "Laundry services",
          "Travel insurance",
          "Personal expenses",
        ],
        featured: true,
        active: true,
      },
      {
        title: "Murchison Falls Wildlife Safari",
        slug: "murchison-falls-wildlife-safari",
        description:
          "Witness the raw power of nature at Murchison Falls, where the mighty Nile River explodes through a narrow gorge creating Uganda's most spectacular waterfall. This 3-day safari combines game drives with boat trips to the base of the falls.",
        shortDescription:
          "3-day safari combining spectacular waterfalls with Big Five game viewing",
        images: [
          "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
        ],
        price: 700,
        duration: 3,
        maxGroupSize: 12,
        difficulty: "MODERATE",
        categoryId: categoryIds.nature,
        location: "Murchison Falls National Park, Uganda",
        includes: [
          "Professional guide",
          "Game drives",
          "Boat cruise to falls",
          "Rhino tracking at Ziwa",
          "Full board accommodation",
          "All park fees",
        ],
        excludes: [
          "International flights",
          "Visa fees",
          "Travel insurance",
          "Tips",
          "Personal purchases",
        ],
        featured: false,
        active: true,
      },
    ];

    // City Tours (3 tours)
    const cityTours = [
      {
        title: "Kampala City Discovery Tour",
        slug: "kampala-city-discovery-tour",
        description:
          "Discover the vibrant capital city of Uganda through this comprehensive city tour that showcases Kampala's rich history, culture, and modern development. Visit iconic landmarks and experience local life.",
        shortDescription:
          "Full-day comprehensive tour of Uganda's vibrant capital city",
        images: [
          "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1519302959554-a75be0afc82a?w=800&h=600&fit=crop",
        ],
        price: 50,
        duration: 1,
        maxGroupSize: 15,
        difficulty: "EASY",
        categoryId: categoryIds.city,
        location: "Kampala, Uganda",
        includes: [
          "Professional city guide",
          "Transportation in Kampala",
          "Museum entrance fees",
          "Traditional lunch",
          "Market visit",
          "Religious sites tour",
        ],
        excludes: [
          "Hotel pickup outside Kampala",
          "Personal shopping",
          "Tips",
          "Alcoholic beverages",
          "Travel insurance",
        ],
        featured: true,
        active: true,
      },
      {
        title: "Entebbe Historical & Botanical Tour",
        slug: "entebbe-historical-botanical-tour",
        description:
          "Explore the charming lakeside town of Entebbe, Uganda's former capital and current location of the international airport. Visit the beautiful Entebbe Botanical Gardens and learn about Uganda's aviation history.",
        shortDescription:
          "Half-day tour of Uganda's historic lakeside town and botanical gardens",
        images: [
          "https://images.unsplash.com/photo-1519302959554-a75be0afc82a?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop",
        ],
        price: 40,
        duration: 1,
        maxGroupSize: 20,
        difficulty: "EASY",
        categoryId: categoryIds.city,
        location: "Entebbe, Uganda",
        includes: [
          "Professional guide",
          "Botanical gardens entrance",
          "Wildlife centre visit",
          "Lake Victoria boat ride",
          "Light refreshments",
          "Transportation in Entebbe",
        ],
        excludes: [
          "Transportation from Kampala",
          "Lunch",
          "Personal expenses",
          "Tips",
          "Souvenirs",
        ],
        featured: false,
        active: true,
      },
      {
        title: "Jinja Adventure Town Tour",
        slug: "jinja-adventure-town-tour",
        description:
          "Explore Jinja, the adventure capital of East Africa and the source of the River Nile. This cultural and historical tour takes you to the exact spot where the Nile begins its 6,650-kilometer journey to the Mediterranean Sea.",
        shortDescription:
          "Cultural and historical tour of the source of the River Nile",
        images: [
          "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop",
        ],
        price: 45,
        duration: 1,
        maxGroupSize: 18,
        difficulty: "EASY",
        categoryId: categoryIds.city,
        location: "Jinja, Uganda",
        includes: [
          "Professional guide",
          "Boat ride to Nile source",
          "Market visit",
          "Colonial architecture tour",
          "Craft workshop visits",
          "Light lunch",
        ],
        excludes: [
          "Transportation from Kampala",
          "Accommodation",
          "Personal purchases",
          "Tips",
          "Evening activities",
        ],
        featured: false,
        active: true,
      },
    ];

    // Beach & Island Tours (3 tours)
    const beachTours = [
      {
        title: "Ssese Islands Tropical Getaway",
        slug: "ssese-islands-tropical-getaway",
        description:
          "Escape to the tropical paradise of the Ssese Islands on Lake Victoria, Uganda's premier beach destination. This 3-day getaway takes you to Bugala Island, the largest of the 84 islands in the archipelago.",
        shortDescription:
          "3-day tropical island escape on Lake Victoria's pristine beaches",
        images: [
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
        ],
        price: 300,
        discountPrice: 250,
        duration: 3,
        maxGroupSize: 12,
        difficulty: "EASY",
        categoryId: categoryIds.beach,
        location: "Ssese Islands, Lake Victoria, Uganda",
        includes: [
          "Ferry transportation",
          "Beach lodge accommodation",
          "All meals",
          "Island guide",
          "Forest walks",
          "Boat excursions",
        ],
        excludes: [
          "Transportation to Nakiwogo",
          "Alcoholic beverages",
          "Water sports equipment",
          "Travel insurance",
          "Personal expenses",
        ],
        featured: true,
        active: true,
      },
      {
        title: "Lake Victoria Beach Day Trip",
        slug: "lake-victoria-beach-day-trip",
        description:
          "Enjoy a relaxing day trip to the beautiful beaches of Lake Victoria, Africa's largest lake. This full-day excursion takes you to some of the best beach spots around Entebbe and Kampala.",
        shortDescription:
          "Full-day beach relaxation and boat cruise on Africa's largest lake",
        images: [
          "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
        ],
        price: 80,
        duration: 1,
        maxGroupSize: 15,
        difficulty: "EASY",
        categoryId: categoryIds.beach,
        location: "Lake Victoria, Uganda",
        includes: [
          "Professional guide",
          "Boat cruise",
          "Beach access",
          "Barbecue lunch",
          "Swimming time",
          "Fishing village visit",
        ],
        excludes: [
          "Transportation to departure point",
          "Alcoholic beverages",
          "Personal items",
          "Tips",
          "Travel insurance",
        ],
        featured: false,
        active: true,
      },
      {
        title: "Ngamba Island Chimpanzee Sanctuary",
        slug: "ngamba-island-chimpanzee-sanctuary",
        description:
          "Visit Ngamba Island Chimpanzee Sanctuary, home to over 50 rescued chimpanzees. This half-day trip combines wildlife conservation education with beautiful lake scenery and the chance to observe our closest relatives in a natural setting.",
        shortDescription:
          "Half-day chimpanzee sanctuary visit on Lake Victoria island",
        images: [
          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
        ],
        price: 120,
        duration: 1,
        maxGroupSize: 10,
        difficulty: "EASY",
        categoryId: categoryIds.beach,
        location: "Ngamba Island, Lake Victoria, Uganda",
        includes: [
          "Boat transfer to island",
          "Sanctuary entrance fee",
          "Guided chimpanzee viewing",
          "Conservation presentation",
          "Light refreshments",
          "Return boat transfer",
        ],
        excludes: [
          "Transportation to Entebbe",
          "Lunch",
          "Personal expenses",
          "Tips",
          "Travel insurance",
        ],
        featured: false,
        active: true,
      },
    ];

    // Combine all tours
    const allTours = [
      ...adventureTours,
      ...culturalTours,
      ...natureTours,
      ...cityTours,
      ...beachTours,
    ];

    // Create tours and their itineraries
    console.log("Creating tours with itineraries...");

    for (const tourData of allTours) {
      console.log(`Creating tour: ${tourData.title}`);

      const tour = await retryOperation(async () => {
        return await db.tour.create({
          data: {
            title: tourData.title,
            slug: tourData.slug,
            description: tourData.description,
            shortDescription: tourData.shortDescription,
            images: tourData.images,
            price: tourData.price,
            // discountPrice: tourData.discountPrice,
            duration: tourData.duration,
            maxGroupSize: tourData.maxGroupSize,
            difficulty: tourData.difficulty,
            categoryId: tourData.categoryId,
            location: tourData.location,
            includes: tourData.includes,
            excludes: tourData.excludes,
            featured: tourData.featured,
            active: tourData.active,
          },
        });
      });

      // Create itineraries for each tour (2 per tour as requested)
      const itineraries = getItinerariesForTour(
        tourData.slug,
        tourData.duration
      );

      for (const itinerary of itineraries) {
        await retryOperation(async () => {
          return await db.tourItinerary.create({
            data: {
              tourId: tour.id,
              day: itinerary.day,
              title: itinerary.title,
              description: itinerary.description,
              activities: itinerary.activities,
            },
          });
        });
      }

      console.log(
        `✅ Created tour: ${tour.title} with ${itineraries.length} itinerary items`
      );
    }

    console.log(
      `✅ Successfully created ${allTours.length} tours with itineraries`
    );
  } catch (error) {
    console.error("❌ Error during tours seeding:", error);
    throw error;
  }
}

// Function to generate itineraries for each tour
function getItinerariesForTour(tourSlug: any, duration: any): Itinerary[] {
  const itineraries = {
    // Adventure Tours Itineraries
    "mount-elgon-hiking-adventure": [
      {
        day: 1,
        title: "Arrival and Forest Gate Trek",
        description:
          "Begin your Mount Elgon adventure with registration at the park headquarters and start the trek through the montane forest zone. Experience the rich biodiversity as you hike through dense vegetation and spot various bird species.",
        activities: [
          "Park registration and briefing",
          "Trek to Forest Exploration Centre",
          "Wildlife spotting",
          "Set up camp",
          "Evening campfire and dinner",
        ],
      },
      {
        day: 2,
        title: "Bamboo Zone and Cave Exploration",
        description:
          "Continue ascending through the bamboo zone and explore the famous Tutum Cave. Learn about the cultural significance of these caves to local communities and enjoy spectacular views of the surrounding landscape.",
        activities: [
          "Early morning trek through bamboo forest",
          "Tutum Cave exploration",
          "Cultural storytelling session",
          "Photography opportunities",
          "Overnight camping",
        ],
      },
    ],
    "white-water-rafting-river-nile": [
      {
        day: 1,
        title: "Safety Briefing and Rapids Adventure",
        description:
          "Start with a comprehensive safety briefing before tackling the exciting Grade 5 rapids of the River Nile. Experience the thrill of navigating through famous rapids while enjoying the beautiful scenery.",
        activities: [
          "Safety briefing and equipment fitting",
          "Navigate Grade 5 rapids",
          "Swimming breaks in calm sections",
          "Riverside lunch",
          "Action photography session",
        ],
      },
      {
        day: 1,
        title: "Nile Source Visit and Relaxation",
        description:
          "After the rafting adventure, visit the source of the River Nile and learn about its historical significance. Relax by the riverbank and enjoy refreshments while sharing experiences with fellow adventurers.",
        activities: [
          "Visit to Nile source monument",
          "Historical presentation",
          "Relaxation by the river",
          "Group photos and certificates",
          "Return transfer to Jinja",
        ],
      },
    ],
    "bungee-jumping-zip-lining-combo": [
      {
        day: 1,
        title: "Bungee Jump Experience",
        description:
          "Take the ultimate leap of faith with a 44-meter bungee jump over the River Nile. Experience the adrenaline rush and spectacular views as you free-fall towards the water below.",
        activities: [
          "Safety briefing and harness fitting",
          "44-meter bungee jump",
          "Recovery and celebration",
          "Professional photo session",
          "Certificate presentation",
        ],
      },
      {
        day: 1,
        title: "Zip-line Adventure",
        description:
          "Soar across the River Nile on an exhilarating zip-line adventure. Enjoy bird's eye views of the river and surrounding landscape as you glide at high speed from one side to the other.",
        activities: [
          "Zip-line safety briefing",
          "High-speed river crossing",
          "Multiple zip-line runs",
          "Scenic photography",
          "Adventure completion celebration",
        ],
      },
    ],

    // Cultural Tours Itineraries
    "batwa-cultural-heritage-experience": [
      {
        day: 1,
        title: "Traditional Forest Life Experience",
        description:
          "Immerse yourself in the traditional lifestyle of the Batwa people. Learn about their hunting techniques, medicinal plant knowledge, and how they lived in harmony with the forest for centuries.",
        activities: [
          "Welcome ceremony with Batwa elders",
          "Traditional hunting demonstration",
          "Medicinal plant walk",
          "Fire-making techniques",
          "Traditional meal preparation",
        ],
      },
      {
        day: 1,
        title: "Cultural Performances and Crafts",
        description:
          "Experience vibrant Batwa cultural performances and learn traditional crafts. Participate in storytelling sessions and understand how the community has adapted to modern life while preserving their heritage.",
        activities: [
          "Traditional dance performances",
          "Storytelling around the fire",
          "Craft-making workshop",
          "Community development visit",
          "Farewell ceremony",
        ],
      },
    ],
    "buganda-kingdom-cultural-tour": [
      {
        day: 1,
        title: "Royal Heritage and Tombs",
        description:
          "Explore the magnificent Kasubi Tombs, a UNESCO World Heritage Site, and learn about the burial traditions of Buganda kings. Understand the complex political and social structures of this ancient kingdom.",
        activities: [
          "Kasubi Tombs guided tour",
          "Royal burial traditions explanation",
          "Traditional architecture study",
          "Historical timeline presentation",
          "Cultural significance discussion",
        ],
      },
      {
        day: 1,
        title: "Palace Visit and Traditional Crafts",
        description:
          "Visit the Kabaka's Palace and explore traditional craft centers. Learn about bark cloth making, traditional pottery, and taste authentic Buganda cuisine while understanding the kingdom's role in modern Uganda.",
        activities: [
          "Kabaka's Palace tour",
          "Bark cloth making demonstration",
          "Traditional pottery workshop",
          "Buganda cuisine tasting",
          "Modern kingdom role discussion",
        ],
      },
    ],
    "traditional-music-dance-workshop": [
      {
        day: 1,
        title: "Musical Instruments and Rhythms",
        description:
          "Learn to play traditional Ugandan instruments including the adungu (bow harp), amadinda (xylophone), and engoma (drums). Understand the cultural significance and stories behind each instrument.",
        activities: [
          "Instrument introduction and history",
          "Hands-on adungu lessons",
          "Amadinda playing techniques",
          "Engoma drumming session",
          "Cultural significance discussion",
        ],
      },
      {
        day: 1,
        title: "Traditional Dances and Performance",
        description:
          "Master traditional dances from different Ugandan cultures and participate in a group performance. Learn the stories and meanings behind each dance while celebrating Uganda's diverse cultural heritage.",
        activities: [
          "Kiganda dance lessons",
          "Acholi dance practice",
          "Karamojong warrior dance",
          "Group choreography session",
          "Final performance showcase",
        ],
      },
    ],

    // Nature Tours Itineraries
    "gorilla-trekking-bwindi-forest": [
      {
        day: 1,
        title: "Forest Trek and Gorilla Encounter",
        description:
          "Begin your gorilla trekking adventure with an early morning briefing before entering the dense Bwindi forest. Trek through challenging terrain with expert guides to locate a habituated gorilla family.",
        activities: [
          "Pre-trek briefing and permits check",
          "Forest entry and tracking begins",
          "Gorilla family location",
          "One hour gorilla observation",
          "Trek back to starting point",
        ],
      },
      {
        day: 1,
        title: "Conservation Education and Celebration",
        description:
          "Learn about gorilla conservation efforts and the importance of protecting these endangered species. Celebrate your successful encounter and receive your gorilla trekking certificate.",
        activities: [
          "Conservation presentation",
          "Community project visit",
          "Certificate ceremony",
          "Photo sharing session",
          "Conservation contribution discussion",
        ],
      },
    ],
    "queen-elizabeth-safari-adventure": [
      {
        day: 1,
        title: "Savanna Game Drive and Kazinga Channel",
        description:
          "Explore the diverse ecosystems of Queen Elizabeth National Park with morning and afternoon game drives. Take a boat cruise on the Kazinga Channel to see hippos, crocodiles, and numerous bird species.",
        activities: [
          "Early morning game drive",
          "Wildlife photography",
          "Kazinga Channel boat cruise",
          "Hippo and crocodile viewing",
          "Bird watching session",
        ],
      },
      {
        day: 2,
        title: "Ishasha Tree-Climbing Lions",
        description:
          "Visit the famous Ishasha sector to search for the rare tree-climbing lions. Explore different habitats and enjoy spectacular views of the Rwenzori Mountains in the background.",
        activities: [
          "Ishasha sector game drive",
          "Tree-climbing lion search",
          "Rwenzori Mountains viewing",
          "Different ecosystem exploration",
          "Wildlife behavior observation",
        ],
      },
    ],
    "murchison-falls-wildlife-safari": [
      {
        day: 1,
        title: "Game Drive and Falls Boat Cruise",
        description:
          "Experience the power of Murchison Falls with a boat cruise to the base of the falls and enjoy game drives in Uganda's largest national park. Spot elephants, lions, and other Big Five animals.",
        activities: [
          "Morning game drive",
          "Big Five animal spotting",
          "Boat cruise to Murchison Falls",
          "Falls base viewing",
          "Wildlife photography",
        ],
      },
      {
        day: 2,
        title: "Rhino Tracking and Top of Falls",
        description:
          "Visit Ziwa Rhino Sanctuary for rhino tracking on foot and hike to the top of Murchison Falls for breathtaking views of the Nile River exploding through the narrow gorge.",
        activities: [
          "Ziwa Rhino Sanctuary visit",
          "On-foot rhino tracking",
          "Top of falls hike",
          "Nile River gorge viewing",
          "Conservation education",
        ],
      },
    ],

    // City Tours Itineraries
    "kampala-city-discovery-tour": [
      {
        day: 1,
        title: "Historical Sites and Cultural Centers",
        description:
          "Explore Kampala's rich history by visiting the Uganda Museum, Kasubi Tombs, and climbing Namirembe Cathedral for panoramic city views. Learn about Uganda's independence and cultural heritage.",
        activities: [
          "Uganda Museum visit",
          "Independence history lesson",
          "Kasubi Tombs exploration",
          "Namirembe Cathedral climb",
          "City panoramic views",
        ],
      },
      {
        day: 1,
        title: "Markets and Modern Kampala",
        description:
          "Experience local life in downtown Kampala by visiting bustling Nakasero Market, exploring craft markets, and visiting the beautiful Bahai Temple. Enjoy traditional lunch at a local restaurant.",
        activities: [
          "Nakasero Market exploration",
          "Local life experience",
          "Craft market shopping",
          "Bahai Temple visit",
          "Traditional lunch experience",
        ],
      },
    ],
    "entebbe-historical-botanical-tour": [
      {
        day: 1,
        title: "Botanical Gardens and Wildlife Center",
        description:
          "Explore the beautiful Entebbe Botanical Gardens established in 1898 and visit the Uganda Wildlife Education Centre. See diverse plant species, primates, and learn about Uganda's aviation history.",
        activities: [
          "Botanical gardens guided tour",
          "Plant species identification",
          "Primate spotting",
          "Wildlife Education Centre visit",
          "Aviation history presentation",
        ],
      },
      {
        day: 1,
        title: "Lake Victoria and Fishing Villages",
        description:
          "Take a scenic walk along Lake Victoria's shores and visit local fishing villages to understand traditional livelihood around Africa's largest lake. Enjoy the historic Entebbe Golf Club.",
        activities: [
          "Lake Victoria shoreline walk",
          "Fishing village visit",
          "Traditional fishing methods",
          "Entebbe Golf Club tour",
          "Lake culture discussion",
        ],
      },
    ],
    "jinja-adventure-town-tour": [
      {
        day: 1,
        title: "Source of the Nile Discovery",
        description:
          "Visit the exact spot where the River Nile begins its 6,650-kilometer journey to the Mediterranean Sea. Take a boat ride to the source and explore Jinja's colonial architecture.",
        activities: [
          "Nile source monument visit",
          "Boat ride to exact source point",
          "Colonial architecture tour",
          "Historical significance presentation",
          "River journey explanation",
        ],
      },
      {
        day: 1,
        title: "Markets and Craft Workshops",
        description:
          "Explore colorful local markets and visit craft workshops to see traditional Ugandan crafts being made. Learn about Jinja's history as a major trading center in East Africa.",
        activities: [
          "Local market exploration",
          "Craft workshop visits",
          "Traditional craft demonstrations",
          "Trading center history",
          "Local artisan interactions",
        ],
      },
    ],

    // Beach Tours Itineraries
    "ssese-islands-tropical-getaway": [
      {
        day: 1,
        title: "Island Arrival and Beach Relaxation",
        description:
          "Arrive at Bugala Island via ferry and settle into your beach lodge. Enjoy pristine sandy beaches, crystal-clear waters, and take your first forest walk to spot primates and birds.",
        activities: [
          "Ferry transfer to Bugala Island",
          "Beach lodge check-in",
          "Beach relaxation and swimming",
          "Forest walk for primate spotting",
          "Sunset viewing",
        ],
      },
      {
        day: 2,
        title: "Fishing and Island Exploration",
        description:
          "Experience traditional fishing with local fishermen and explore more of the island's natural beauty. Enjoy boat excursions around the archipelago and learn about island life.",
        activities: [
          "Traditional fishing experience",
          "Local fishermen interaction",
          "Island exploration",
          "Boat excursions",
          "Island life cultural exchange",
        ],
      },
    ],
    "lake-victoria-beach-day-trip": [
      {
        day: 1,
        title: "Beach Activities and Boat Cruise",
        description:
          "Enjoy a full day of beach activities on Lake Victoria including swimming, beach games, and a scenic boat cruise. Spot various bird species and learn about the lake's importance to local communities.",
        activities: [
          "Beach arrival and setup",
          "Swimming and beach games",
          "Scenic boat cruise",
          "Bird watching",
          "Lake ecosystem education",
        ],
      },
      {
        day: 1,
        title: "Fishing Village and Barbecue",
        description:
          "Visit local fishing villages to understand traditional fishing methods and lake culture. Enjoy a barbecue lunch with fresh fish from the lake while relaxing on the sandy beaches.",
        activities: [
          "Fishing village visit",
          "Traditional fishing methods demo",
          "Fresh fish barbecue lunch",
          "Beach relaxation",
          "Cultural exchange with locals",
        ],
      },
    ],
    "ngamba-island-chimpanzee-sanctuary": [
      {
        day: 1,
        title: "Chimpanzee Sanctuary Experience",
        description:
          "Take a boat transfer to Ngamba Island and enjoy guided chimpanzee viewing sessions. Learn about conservation efforts and the stories of the rescued chimpanzees living on the island.",
        activities: [
          "Boat transfer to Ngamba Island",
          "Sanctuary orientation",
          "Guided chimpanzee viewing",
          "Individual chimp stories",
          "Conservation education presentation",
        ],
      },
      {
        day: 1,
        title: "Conservation Learning and Return",
        description:
          "Participate in conservation activities and learn about the sanctuary's role in chimpanzee rehabilitation. Enjoy the beautiful lake scenery before returning to the mainland.",
        activities: [
          "Conservation activity participation",
          "Rehabilitation process learning",
          "Lake scenery appreciation",
          "Final chimpanzee viewing",
          "Return boat transfer",
        ],
      },
    ],
  };

  return (
    itineraries[tourSlug as keyof typeof itineraries] || [
      {
        day: 1,
        title: "Tour Experience",
        description:
          "Enjoy your tour experience with professional guides and comprehensive activities.",
        activities: [
          "Professional guide service",
          "Main tour activities",
          "Cultural interactions",
          "Photo opportunities",
          "Memorable experiences",
        ],
      },
      {
        day: duration > 1 ? 2 : 1,
        title: "Tour Conclusion",
        description:
          "Conclude your tour with final activities and return transfers.",
        activities: [
          "Final tour activities",
          "Group discussions",
          "Certificate presentation",
          "Return transfers",
          "Tour completion",
        ],
      },
    ]
  );
}

async function main() {
  console.log("🚀 Starting Uganda tours database seed process...");

  try {
    // Test connection first
    const isConnected = await testConnection();
    if (!isConnected) {
      console.error(
        "❌ Cannot proceed with seeding - database connection failed"
      );
      return;
    }

    // await cleanToursData();
    await seedUgandaTours();
    console.log("🎉 Uganda tours seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error in main seed process:", error);
    throw error;
  }
}

// Run the seeding process
main()
  .catch((e) => {
    console.error("💥 Failed to seed database:", e);
  })
  .finally(async () => {
    await db.$disconnect();
    console.log("👋 Database connection closed");
  });
