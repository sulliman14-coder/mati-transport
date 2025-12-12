# البدء السريع - موقع مؤسسة محمد الحسني للنقليات

## خطوات النشر السريع على Vercel (5 دقائق)

### 1. تحميل الملفات
قم بفك ضغط الملف `mati_transport_vercel.tar.gz`

### 2. تثبيت المكتبات
```bash
cd mati_transport
pnpm install
# أو
npm install
```

### 3. إعداد قاعدة البيانات

**الخيار السريع: PlanetScale (مجاني)**
1. اذهب إلى https://planetscale.com
2. أنشئ حساب وقاعدة بيانات جديدة
3. احصل على Connection String
4. نفذ الأمر:
```bash
DATABASE_URL="your_connection_string" pnpm db:push
```

### 4. إضافة البيانات الأولية
```bash
DATABASE_URL="your_connection_string" node seed-data.mjs
```

### 5. النشر على Vercel

**الطريقة الأسهل:**
1. ارفع المشروع على GitHub
2. اذهب إلى https://vercel.com/new
3. اختر Repository الخاص بك
4. أضف المتغيرات البيئية:
   - `DATABASE_URL`: رابط قاعدة البيانات
   - `JWT_SECRET`: أي نص عشوائي (32 حرف على الأقل)
   - `NODE_ENV`: production
5. اضغط Deploy

**أو باستخدام CLI:**
```bash
npm i -g vercel
vercel login
vercel
```

---

## التشغيل المحلي للتطوير

```bash
# إنشاء ملف .env
echo "DATABASE_URL=your_connection_string" > .env
echo "JWT_SECRET=your-secret-key" >> .env

# تشغيل المشروع
pnpm dev

# افتح المتصفح على
# http://localhost:3000
```

---

## الوصول للوحة التحكم

بعد النشر:
1. افتح الموقع
2. اذهب إلى `/admin`
3. سجل دخول باستخدام حساب Manus (أو قم بتعطيل المصادقة مؤقتاً)

---

## معلومات مهمة

- **رقم الواتساب المدمج:** 0596466303
- **عدد السيارات:** 30 سيارة متنوعة
- **المدن المدعومة:** الرياض، جدة، الدمام، مكة، المدينة، الطائف، تبوك، أبها، جازان، نجران

---

## المشاكل الشائعة

**المشكلة:** Database connection error
**الحل:** تأكد من صحة DATABASE_URL وأن قاعدة البيانات تقبل الاتصالات الخارجية

**المشكلة:** Build failed
**الحل:** تأكد من تثبيت جميع المكتبات بـ `pnpm install`

**المشكلة:** Pages not loading
**الحل:** تأكد من وجود ملف `vercel.json` في الجذر

---

## للمزيد من التفاصيل

راجع ملف `VERCEL_DEPLOYMENT_GUIDE.md` للدليل الشامل.
