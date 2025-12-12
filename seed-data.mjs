import { drizzle } from "drizzle-orm/mysql2";
import { vehicles, cityDistances, pricingSettings } from "./drizzle/schema.js";
import dotenv from "dotenv";

dotenv.config();

const db = drizzle(process.env.DATABASE_URL);

// بيانات السيارات (30 سيارة متنوعة)
const vehiclesData = [
  // شاحنات ثقيلة (8 سيارات)
  { name: "شاحنة مرسيدس أكتروس 2545", type: "شاحنة ثقيلة", capacity: 25, description: "شاحنة ثقيلة للنقل بين المدن", imageUrl: "/vehicles/heavy-truck-1.jpg", status: "متاحة", pricePerKm: 800, dailyRentalPrice: 1200 },
  { name: "شاحنة فولفو FH16", type: "شاحنة ثقيلة", capacity: 30, description: "شاحنة ثقيلة للأحمال الكبيرة", imageUrl: "/vehicles/heavy-truck-2.jpg", status: "متاحة", pricePerKm: 850, dailyRentalPrice: 1300 },
  { name: "شاحنة سكانيا R500", type: "شاحنة ثقيلة", capacity: 28, description: "شاحنة ثقيلة عالية الأداء", imageUrl: "/vehicles/heavy-truck-3.jpg", status: "متعاقد عليها", pricePerKm: 820, dailyRentalPrice: 1250 },
  { name: "شاحنة مان TGX", type: "شاحنة ثقيلة", capacity: 26, description: "شاحنة ثقيلة للمسافات الطويلة", imageUrl: "/vehicles/heavy-truck-4.jpg", status: "متاحة", pricePerKm: 800, dailyRentalPrice: 1200 },
  { name: "شاحنة ايفيكو ستراليس", type: "شاحنة ثقيلة", capacity: 24, description: "شاحنة ثقيلة اقتصادية", imageUrl: "/vehicles/heavy-truck-5.jpg", status: "محجوزة", pricePerKm: 750, dailyRentalPrice: 1100 },
  { name: "شاحنة داف XF", type: "شاحنة ثقيلة", capacity: 27, description: "شاحنة ثقيلة موثوقة", imageUrl: "/vehicles/heavy-truck-6.jpg", status: "متاحة", pricePerKm: 800, dailyRentalPrice: 1200 },
  { name: "شاحنة رينو T-High", type: "شاحنة ثقيلة", capacity: 25, description: "شاحنة ثقيلة حديثة", imageUrl: "/vehicles/heavy-truck-7.jpg", status: "متعاقد عليها", pricePerKm: 800, dailyRentalPrice: 1200 },
  { name: "شاحنة هينو 700", type: "شاحنة ثقيلة", capacity: 22, description: "شاحنة ثقيلة يابانية", imageUrl: "/vehicles/heavy-truck-8.jpg", status: "متاحة", pricePerKm: 750, dailyRentalPrice: 1100 },
  
  // شاحنات خفيفة (8 سيارات)
  { name: "شاحنة ايسوزو NPR", type: "شاحنة خفيفة", capacity: 5, description: "شاحنة خفيفة للشحنات المتوسطة", imageUrl: "/vehicles/light-truck-1.jpg", status: "متاحة", pricePerKm: 400, dailyRentalPrice: 600 },
  { name: "شاحنة ميتسوبيشي كانتر", type: "شاحنة خفيفة", capacity: 4, description: "شاحنة خفيفة اقتصادية", imageUrl: "/vehicles/light-truck-2.jpg", status: "متاحة", pricePerKm: 380, dailyRentalPrice: 550 },
  { name: "شاحنة هينو 300", type: "شاحنة خفيفة", capacity: 5, description: "شاحنة خفيفة موثوقة", imageUrl: "/vehicles/light-truck-3.jpg", status: "محجوزة", pricePerKm: 400, dailyRentalPrice: 600 },
  { name: "شاحنة فورد F-450", type: "شاحنة خفيفة", capacity: 6, description: "شاحنة خفيفة قوية", imageUrl: "/vehicles/light-truck-4.jpg", status: "متاحة", pricePerKm: 420, dailyRentalPrice: 650 },
  { name: "شاحنة شيفروليه LCF", type: "شاحنة خفيفة", capacity: 5, description: "شاحنة خفيفة أمريكية", imageUrl: "/vehicles/light-truck-5.jpg", status: "متعاقد عليها", pricePerKm: 400, dailyRentalPrice: 600 },
  { name: "شاحنة فاو تايجر", type: "شاحنة خفيفة", capacity: 4, description: "شاحنة خفيفة اقتصادية", imageUrl: "/vehicles/light-truck-6.jpg", status: "متاحة", pricePerKm: 350, dailyRentalPrice: 500 },
  { name: "شاحنة جاك N-Series", type: "شاحنة خفيفة", capacity: 5, description: "شاحنة خفيفة حديثة", imageUrl: "/vehicles/light-truck-7.jpg", status: "متاحة", pricePerKm: 380, dailyRentalPrice: 550 },
  { name: "شاحنة دونج فينج", type: "شاحنة خفيفة", capacity: 4, description: "شاحنة خفيفة للمدن", imageUrl: "/vehicles/light-truck-8.jpg", status: "متاحة", pricePerKm: 350, dailyRentalPrice: 500 },
  
  // فانات (5 سيارات)
  { name: "فان تويوتا هايس", type: "فان", capacity: 2, description: "فان للشحنات الخفيفة", imageUrl: "/vehicles/van-1.jpg", status: "متاحة", pricePerKm: 250, dailyRentalPrice: 400 },
  { name: "فان نيسان أورفان", type: "فان", capacity: 2, description: "فان واسع للشحنات", imageUrl: "/vehicles/van-2.jpg", status: "متاحة", pricePerKm: 250, dailyRentalPrice: 400 },
  { name: "فان هيونداي H350", type: "فان", capacity: 2, description: "فان حديث ومريح", imageUrl: "/vehicles/van-3.jpg", status: "محجوزة", pricePerKm: 270, dailyRentalPrice: 420 },
  { name: "فان فورد ترانزيت", type: "فان", capacity: 2, description: "فان أمريكي قوي", imageUrl: "/vehicles/van-4.jpg", status: "متاحة", pricePerKm: 280, dailyRentalPrice: 450 },
  { name: "فان مرسيدس سبرنتر", type: "فان", capacity: 2, description: "فان فاخر للشحنات", imageUrl: "/vehicles/van-5.jpg", status: "متعاقد عليها", pricePerKm: 300, dailyRentalPrice: 500 },
  
  // رافعات (3 سيارات)
  { name: "رافعة كاتو 25 طن", type: "رافعة", capacity: 25, description: "رافعة متوسطة للمشاريع", imageUrl: "/vehicles/crane-1.jpg", status: "متاحة", pricePerKm: 1000, dailyRentalPrice: 2000 },
  { name: "رافعة ليبهر 50 طن", type: "رافعة", capacity: 50, description: "رافعة ثقيلة للمشاريع الكبرى", imageUrl: "/vehicles/crane-2.jpg", status: "متعاقد عليها", pricePerKm: 1500, dailyRentalPrice: 3000 },
  { name: "رافعة تادانو 30 طن", type: "رافعة", capacity: 30, description: "رافعة يابانية موثوقة", imageUrl: "/vehicles/crane-3.jpg", status: "متاحة", pricePerKm: 1100, dailyRentalPrice: 2200 },
  
  // تريلات (3 سيارات)
  { name: "تريلة 3 محاور", type: "تريلة", capacity: 35, description: "تريلة للأحمال الثقيلة", imageUrl: "/vehicles/trailer-1.jpg", status: "متاحة", pricePerKm: 900, dailyRentalPrice: 1400 },
  { name: "تريلة منخفضة", type: "تريلة", capacity: 40, description: "تريلة لنقل المعدات", imageUrl: "/vehicles/trailer-2.jpg", status: "محجوزة", pricePerKm: 950, dailyRentalPrice: 1500 },
  { name: "تريلة مبردة", type: "تريلة", capacity: 30, description: "تريلة للمواد المبردة", imageUrl: "/vehicles/trailer-3.jpg", status: "متاحة", pricePerKm: 1000, dailyRentalPrice: 1600 },
  
  // سحب سيارات (3 سيارات)
  { name: "سطحة مرسيدس", type: "سحب سيارات", capacity: 3, description: "سطحة لنقل السيارات", imageUrl: "/vehicles/tow-1.jpg", status: "متاحة", pricePerKm: 500, dailyRentalPrice: 800 },
  { name: "سطحة ايفيكو", type: "سحب سيارات", capacity: 2, description: "سطحة للسيارات الصغيرة", imageUrl: "/vehicles/tow-2.jpg", status: "متاحة", pricePerKm: 450, dailyRentalPrice: 700 },
  { name: "ونش سحب ثقيل", type: "سحب سيارات", capacity: 5, description: "ونش لسحب الشاحنات", imageUrl: "/vehicles/tow-3.jpg", status: "متعاقد عليها", pricePerKm: 600, dailyRentalPrice: 1000 },
];

// المسافات بين المدن السعودية (50 مدينة)
const cityDistancesData = [
  // من الرياض إلى جميع المدن
  { fromCity: "الرياض", toCity: "جدة", distance: 950 },
  { fromCity: "الرياض", toCity: "مكة المكرمة", distance: 870 },
  { fromCity: "الرياض", toCity: "المدينة المنورة", distance: 850 },
  { fromCity: "الرياض", toCity: "الدمام", distance: 400 },
  { fromCity: "الرياض", toCity: "الطائف", distance: 750 },
  { fromCity: "الرياض", toCity: "تبوك", distance: 1300 },
  { fromCity: "الرياض", toCity: "بريدة", distance: 350 },
  { fromCity: "الرياض", toCity: "خميس مشيط", distance: 900 },
  { fromCity: "الرياض", toCity: "أبها", distance: 950 },
  { fromCity: "الرياض", toCity: "حائل", distance: 650 },
  { fromCity: "الرياض", toCity: "نجران", distance: 950 },
  { fromCity: "الرياض", toCity: "الجبيل", distance: 450 },
  { fromCity: "الرياض", toCity: "ينبع", distance: 1050 },
  { fromCity: "الرياض", toCity: "الخبر", distance: 410 },
  { fromCity: "الرياض", toCity: "الأحساء", distance: 450 },
  { fromCity: "الرياض", toCity: "القطيف", distance: 420 },
  { fromCity: "الرياض", toCity: "الخرج", distance: 80 },
  { fromCity: "الرياض", toCity: "عرعر", distance: 1100 },
  { fromCity: "الرياض", toCity: "سكاكا", distance: 1200 },
  { fromCity: "الرياض", toCity: "جازان", distance: 1150 },
  { fromCity: "الرياض", toCity: "القريات", distance: 1400 },
  { fromCity: "الرياض", toCity: "الباحة", distance: 850 },
  { fromCity: "الرياض", toCity: "الظهران", distance: 410 },
  { fromCity: "الرياض", toCity: "رابغ", distance: 1000 },
  { fromCity: "الرياض", toCity: "القنفذة", distance: 1050 },
  { fromCity: "الرياض", toCity: "بيشة", distance: 750 },
  { fromCity: "الرياض", toCity: "الدوادمي", distance: 330 },
  { fromCity: "الرياض", toCity: "المجمعة", distance: 180 },
  { fromCity: "الرياض", toCity: "الزلفي", distance: 260 },
  { fromCity: "الرياض", toCity: "شقراء", distance: 190 },
  { fromCity: "الرياض", toCity: "الأفلاج", distance: 300 },
  { fromCity: "الرياض", toCity: "وادي الدواسر", distance: 600 },
  { fromCity: "الرياض", toCity: "الدرعية", distance: 20 },
  { fromCity: "الرياض", toCity: "عنيزة", distance: 370 },
  { fromCity: "الرياض", toCity: "الرس", distance: 400 },
  { fromCity: "الرياض", toCity: "المذنب", distance: 240 },
  { fromCity: "الرياض", toCity: "ضرماء", distance: 60 },
  { fromCity: "الرياض", toCity: "المزاحمية", distance: 40 },
  { fromCity: "الرياض", toCity: "حريملاء", distance: 90 },
  { fromCity: "الرياض", toCity: "طريف", distance: 1450 },
  { fromCity: "الرياض", toCity: "رفحاء", distance: 1250 },
  { fromCity: "الرياض", toCity: "حفر الباطن", distance: 500 },
  { fromCity: "الرياض", toCity: "القويعية", distance: 480 },
  { fromCity: "الرياض", toCity: "صبيا", distance: 1200 },
  { fromCity: "الرياض", toCity: "الليث", distance: 1100 },
  { fromCity: "الرياض", toCity: "البكيرية", distance: 380 },
  { fromCity: "الرياض", toCity: "رياض الخبراء", distance: 430 },
  { fromCity: "الرياض", toCity: "الحريق", distance: 250 },
  
  
  // من جدة إلى المدن الرئيسية
  { fromCity: "جدة", toCity: "الرياض", distance: 950 },
  { fromCity: "جدة", toCity: "مكة المكرمة", distance: 80 },
  { fromCity: "جدة", toCity: "المدينة المنورة", distance: 420 },
  { fromCity: "جدة", toCity: "الطائف", distance: 170 },
  { fromCity: "جدة", toCity: "أبها", distance: 630 },
  { fromCity: "جدة", toCity: "الدمام", distance: 1350 },
  { fromCity: "جدة", toCity: "تبوك", distance: 1030 },
  { fromCity: "جدة", toCity: "ينبع", distance: 330 },
  { fromCity: "جدة", toCity: "جازان", distance: 750 },
  { fromCity: "جدة", toCity: "الباحة", distance: 250 },
  { fromCity: "جدة", toCity: "رابغ", distance: 150 },
  { fromCity: "جدة", toCity: "القنفذة", distance: 320 },
  
  // من الدمام إلى المدن الرئيسية
  { fromCity: "الدمام", toCity: "الرياض", distance: 400 },
  { fromCity: "الدمام", toCity: "جدة", distance: 1350 },
  { fromCity: "الدمام", toCity: "الخبر", distance: 20 },
  { fromCity: "الدمام", toCity: "الجبيل", distance: 95 },
  { fromCity: "الدمام", toCity: "الأحساء", distance: 150 },
  { fromCity: "الدمام", toCity: "حفر الباطن", distance: 320 },
  { fromCity: "الدمام", toCity: "القطيف", distance: 25 },
  { fromCity: "الدمام", toCity: "الظهران", distance: 15 },
  { fromCity: "الدمام", toCity: "القويعية", distance: 100 },
  
  // من مكة إلى المدن الرئيسية
  { fromCity: "مكة المكرمة", toCity: "جدة", distance: 80 },
  { fromCity: "مكة المكرمة", toCity: "الرياض", distance: 870 },
  { fromCity: "مكة المكرمة", toCity: "المدينة المنورة", distance: 390 },
  { fromCity: "مكة المكرمة", toCity: "الطائف", distance: 90 },
  { fromCity: "مكة المكرمة", toCity: "أبها", distance: 630 },
  { fromCity: "مكة المكرمة", toCity: "الطائف", distance: 88 },
  
  { fromCity: "المدينة المنورة", toCity: "الرياض", distance: 848 },
  { fromCity: "المدينة المنورة", toCity: "جدة", distance: 420 },
  { fromCity: "المدينة المنورة", toCity: "مكة المكرمة", distance: 385 },
  { fromCity: "المدينة المنورة", toCity: "ينبع", distance: 220 },
  { fromCity: "المدينة المنورة", toCity: "تبوك", distance: 679 },
];

// إعدادات التسعير
const pricingSettingsData = [
  { settingKey: "base_price_per_km", settingValue: 300, description: "السعر الأساسي لكل كيلومتر (بالهللات)" },
  { settingKey: "weight_multiplier_per_ton", settingValue: 50, description: "معامل الضرب لكل طن وزن (بالهللات)" },
  { settingKey: "driver_monthly_cost", settingValue: 5000, description: "تكلفة السائق الشهرية (بالريالات)" },
  { settingKey: "rental_discount_6months", settingValue: 5, description: "خصم الإيجار لمدة 6 أشهر (نسبة مئوية)" },
  { settingKey: "rental_discount_12months", settingValue: 10, description: "خصم الإيجار لمدة 12 شهر (نسبة مئوية)" },
];

async function seedDatabase() {
  try {
    console.log("🌱 بدء إضافة البيانات الأولية...");
    
    // إضافة السيارات
    console.log("📦 إضافة السيارات...");
    await db.insert(vehicles).values(vehiclesData);
    console.log(`✅ تم إضافة ${vehiclesData.length} سيارة`);
    
    // إضافة المسافات بين المدن
    console.log("🗺️ إضافة المسافات بين المدن...");
    await db.insert(cityDistances).values(cityDistancesData);
    console.log(`✅ تم إضافة ${cityDistancesData.length} مسافة`);
    
    // إضافة إعدادات التسعير
    console.log("💰 إضافة إعدادات التسعير...");
    await db.insert(pricingSettings).values(pricingSettingsData);
    console.log(`✅ تم إضافة ${pricingSettingsData.length} إعداد`);
    
    console.log("🎉 تم إضافة جميع البيانات الأولية بنجاح!");
  } catch (error) {
    console.error("❌ خطأ في إضافة البيانات:", error);
    process.exit(1);
  }
  process.exit(0);
}

seedDatabase();
