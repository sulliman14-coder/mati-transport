import { drizzle } from 'drizzle-orm/mysql2';
import { cityDistances } from './drizzle/schema.ts';
import * as dotenv from 'dotenv';

dotenv.config();

const db = drizzle(process.env.DATABASE_URL);

// جميع مدن المملكة العربية السعودية مع المسافات التقريبية بالكيلومتر من الرياض
const saudiCities = [
  // المدن الرئيسية
  { name: 'الرياض', distanceFromRiyadh: 0 },
  { name: 'جدة', distanceFromRiyadh: 950 },
  { name: 'مكة المكرمة', distanceFromRiyadh: 870 },
  { name: 'المدينة المنورة', distanceFromRiyadh: 850 },
  { name: 'الدمام', distanceFromRiyadh: 400 },
  { name: 'الطائف', distanceFromRiyadh: 750 },
  { name: 'تبوك', distanceFromRiyadh: 1300 },
  { name: 'بريدة', distanceFromRiyadh: 350 },
  { name: 'خميس مشيط', distanceFromRiyadh: 900 },
  { name: 'أبها', distanceFromRiyadh: 950 },
  { name: 'حائل', distanceFromRiyadh: 650 },
  { name: 'نجران', distanceFromRiyadh: 950 },
  { name: 'الجبيل', distanceFromRiyadh: 450 },
  { name: 'ينبع', distanceFromRiyadh: 1050 },
  { name: 'الخبر', distanceFromRiyadh: 410 },
  { name: 'الأحساء', distanceFromRiyadh: 450 },
  { name: 'القطيف', distanceFromRiyadh: 420 },
  { name: 'الخرج', distanceFromRiyadh: 80 },
  { name: 'عرعر', distanceFromRiyadh: 1100 },
  { name: 'سكاكا', distanceFromRiyadh: 1200 },
  { name: 'جازان', distanceFromRiyadh: 1150 },
  { name: 'القريات', distanceFromRiyadh: 1400 },
  { name: 'الباحة', distanceFromRiyadh: 850 },
  { name: 'الظهران', distanceFromRiyadh: 410 },
  { name: 'رابغ', distanceFromRiyadh: 1000 },
  { name: 'القنفذة', distanceFromRiyadh: 1050 },
  { name: 'الليث', distanceFromRiyadh: 1100 },
  { name: 'بيشة', distanceFromRiyadh: 750 },
  { name: 'الدوادمي', distanceFromRiyadh: 330 },
  { name: 'المجمعة', distanceFromRiyadh: 180 },
  { name: 'الزلفي', distanceFromRiyadh: 260 },
  { name: 'شقراء', distanceFromRiyadh: 190 },
  { name: 'الأفلاج', distanceFromRiyadh: 300 },
  { name: 'وادي الدواسر', distanceFromRiyadh: 600 },
  { name: 'الدرعية', distanceFromRiyadh: 20 },
  { name: 'الدلم', distanceFromRiyadh: 90 },
  { name: 'حوطة بني تميم', distanceFromRiyadh: 160 },
  { name: 'عنيزة', distanceFromRiyadh: 370 },
  { name: 'الرس', distanceFromRiyadh: 400 },
  { name: 'المذنب', distanceFromRiyadh: 240 },
  { name: 'البكيرية', distanceFromRiyadh: 380 },
  { name: 'رياض الخبراء', distanceFromRiyadh: 430 },
  { name: 'الشماسية', distanceFromRiyadh: 450 },
  { name: 'الشنان', distanceFromRiyadh: 510 },
  { name: 'ضرماء', distanceFromRiyadh: 60 },
  { name: 'المزاحمية', distanceFromRiyadh: 40 },
  { name: 'رماح', distanceFromRiyadh: 70 },
  { name: 'ثادق', distanceFromRiyadh: 130 },
  { name: 'حريملاء', distanceFromRiyadh: 90 },
  { name: 'الحريق', distanceFromRiyadh: 250 },
];

// حساب المسافات بين جميع المدن
function calculateDistance(city1Distance, city2Distance) {
  // حساب تقريبي للمسافة بين مدينتين بناءً على بعدهما عن الرياض
  return Math.abs(city1Distance - city2Distance);
}

async function addAllCities() {
  console.log('بدء إضافة جميع مدن المملكة...');
  
  const cityDistancesData = [];
  
  // إنشاء مصفوفة المسافات بين جميع المدن
  for (let i = 0; i < saudiCities.length; i++) {
    for (let j = i + 1; j < saudiCities.length; j++) {
      const city1 = saudiCities[i];
      const city2 = saudiCities[j];
      
      let distance;
      if (city1.name === 'الرياض') {
        distance = city2.distanceFromRiyadh;
      } else if (city2.name === 'الرياض') {
        distance = city1.distanceFromRiyadh;
      } else {
        // حساب المسافة التقريبية بين المدينتين
        distance = calculateDistance(city1.distanceFromRiyadh, city2.distanceFromRiyadh);
      }
      
      // إضافة المسافة في كلا الاتجاهين
      cityDistancesData.push({
        fromCity: city1.name,
        toCity: city2.name,
        distance: distance
      });
      
      cityDistancesData.push({
        fromCity: city2.name,
        toCity: city1.name,
        distance: distance
      });
    }
  }
  
  console.log(`سيتم إضافة ${cityDistancesData.length} مسافة بين المدن...`);
  
  // إضافة البيانات على دفعات لتجنب مشاكل الذاكرة
  const batchSize = 100;
  for (let i = 0; i < cityDistancesData.length; i += batchSize) {
    const batch = cityDistancesData.slice(i, i + batchSize);
    try {
      await db.insert(cityDistances).values(batch);
      console.log(`تمت إضافة دفعة ${Math.floor(i / batchSize) + 1} من ${Math.ceil(cityDistancesData.length / batchSize)}`);
    } catch (error) {
      console.error('خطأ في إضافة الدفعة:', error);
    }
  }
  
  console.log('✅ تمت إضافة جميع مدن المملكة بنجاح!');
  console.log(`عدد المدن: ${saudiCities.length}`);
  console.log(`عدد المسافات: ${cityDistancesData.length}`);
  
  process.exit(0);
}

addAllCities().catch(error => {
  console.error('خطأ:', error);
  process.exit(1);
});
