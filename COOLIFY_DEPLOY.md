# نشر مشروع app-car على Coolify (Next.js + Prisma + MySQL)

هذا الدليل مخصص للمشروع الموجود في هذا الريبو:
- Next.js 16 (App Router) + API Routes
- Prisma 7 + MySQL/MariaDB
- JWT Auth (Cookie للويب + Bearer للموبايل)
- حفظ صور البروفايل على القرص داخل `public/uploads/profiles`

> مهم: هذا المشروع **ليس Static Export**. لا تفعّل `NEXT_OUTPUT_EXPORT=1` لأن عندك API Routes + Prisma.

---

## 1) مراجعة سريعة لبنية المشروع (عشان تبقى فاهم هتعمل إيه)

- **Build/Start** من `package.json`:
  - `npm run build` -> `next build`
  - `npm run start` -> `next start`
- **مخرجات Next**: `next.config.ts` يحدد `distDir: 'dist'` (يعني ملفات البيلد هتطلع تحت `dist/` بدل `.next/`).
- **اتصال قاعدة البيانات في runtime** (داخل التطبيق نفسه):
  - `src/lib/prisma.ts` يستخدم `@prisma/adapter-mariadb`
  - ويقرأ المتغيرات:
    - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT`
- **Prisma CLI / migrations** (أوامر prisma):
  - `prisma.config.ts` يستخدم `DATABASE_URL`.
  - بالتالي في الإنتاج الأفضل تضبط **DB_*** و **DATABASE_URL** معًا.
- **رفع صورة البروفايل**:
  - API: `POST /api/auth/profile/image`
  - يكتب ملفات على: `public/uploads/profiles` باستخدام `fs/promises`.
  - على Coolify لازم تعمل **Persistent Volume** لهذا المسار وإلا الملفات هتضيع مع أي redeploy.

---

## 2) قبل النقل إلى Coolify: تجهيزات مطلوبة من جهازك (Pre-flight)

- **[Git Repo]** لازم يكون المشروع مرفوع على GitHub/GitLab (Coolify بيسحب من Git).
- **[Node Version]** تأكد محليًا إن المشروع بيبني على Node 18 أو 20 (مناسب لـ Next 16 و Prisma).
- **[تأكد إنك مش عامل export]**:
  - لا تضع `NEXT_OUTPUT_EXPORT=1` في بيئة الإنتاج.
- **[تأكد من الـENV]** جهز القيم التالية (هتحتاجها في Coolify):
  - `JWT_SECRET` (قيمة طويلة وعشوائية)
  - بيانات DB (Host/User/Pass/Name/Port) أو هتستخدم DB Service داخل Coolify.

> ملاحظة: لو عندك بيانات/Users على قاعدة قديمة وعايز تنقلها، جهّز Dump من MySQL (mysqldump) قبل ما تبدأ.

---

## 3) إعداد الخدمات على Coolify

### 3.1) إنشاء مشروع (Application) للويب

1. افتح Coolify Dashboard
2. اعمل **New Resource** -> **Application**
3. اختار Git Provider واربط الريبو
4. اختار Branch (مثل `main`)

### 3.2) إنشاء قاعدة بيانات MySQL/MariaDB (Service)

1. **New Resource** -> **Database**
2. اختار:
   - MySQL أو MariaDB (الاتنين مناسبين)
3. سجّل القيم اللي Coolify هيولدها:
   - Host (غالبًا اسم السيرفيس داخل الشبكة)
   - Port
   - Username
   - Password
   - Database name

> الأفضل تخلي الـDB في نفس الـProject/Network عشان الاتصال يكون داخلي وسريع.

---

## 4) إعداد Environment Variables (مهم جدًا)

في Application -> **Environment Variables** ضيف التالي:

### 4.1) متغيرات قاعدة البيانات (runtime)

- `DB_HOST`
- `DB_PORT` (عادة 3306)
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`

### 4.2) DATABASE_URL (لـPrisma CLI)

استخدم صيغة MySQL:

```env
DATABASE_URL="mysql://DB_USER:DB_PASSWORD@DB_HOST:DB_PORT/DB_NAME"
```

> لو الباسورد فيها رموز خاصة، لازم تكون URL-encoded.

### 4.3) JWT

- `JWT_SECRET`
  - لازم قيمة قوية (64 حرف أو أكثر)

### 4.4) Next / تشغيل

- `NODE_ENV=production`
- `PORT`:
  - في Coolify غالبًا بيتحدد تلقائيًا. لو Coolify طلب منك قيمة، خليها نفس Port اللي Coolify مديه للتطبيق.

### 4.5) تحذير بخصوص CORS

- عندك `next.config.ts` بيرجع Header:
  - `Access-Control-Allow-Origin: *`
- وعندك `src/middleware.ts` بيحاول يقيد origins في بعض الحالات.

لو هتستخدم الموبايل أو دومين مختلف للـAPI:
- تأكد إن الطلبات للـAPI بتوصل بدون CORS errors.

---

## 5) إعداد Storage / Volumes (عشان رفع الصور مايضيعش)

لازم تعمل volume للمسار التالي داخل الـcontainer:

- `public/uploads`

**اقتراح عملي على Coolify**:
- Mount Volume إلى:
  - `/app/public/uploads`

> المسار `/app` هو المسار الشائع لتطبيقات Node داخل container (قد يختلف حسب إعداد Coolify). المهم: يكون **نفس المسار** اللي Next شغال منه بحيث `process.cwd()` + `public/uploads` يطابقه.

لو Coolify بتعرض لك Path داخل container، استخدم:
- `/<working_dir>/public/uploads`

---

## 6) إعداد Build & Start على Coolify

في إعدادات الـApplication:

### 6.1) Build Command

استخدم (ترتيب آمن):

```bash
npm ci
npm run db:generate
npm run build
```

### 6.2) Start Command

```bash
npm run start
```

> `next start` بيقرأ `PORT` من environment.

### 6.3) ملاحظة عن Prisma generate

- Prisma Client عندك بيطلع في: `src/generated/prisma`
- لازم `npm run db:generate` يحصل أثناء البيلد (أو قبل التشغيل) عشان مايحصلش runtime errors.

---

## 7) إنشاء الجداول (Prisma) في الإنتاج

أمامك 3 طرق، اختار واحدة:

### 7.1) الأفضل (مستحسن): Migrations

لو عندك `prisma/migrations` جاهزة:

```bash
npx prisma migrate deploy
```

### 7.2) الأسرع (لكن أقل انضباطًا): db push

```bash
npm run db:push
```

### 7.3) أول مرة فقط (اختياري): Seed

لو عايز بيانات ابتدائية:

```bash
npm run db:seed
```

**على Coolify**: نفّذ الأوامر دي من:
- Terminal/Exec داخل الـApplication container

> لا تشغّل seed على إنتاج فيه بيانات حقيقية إلا وانت متأكد.

---

## 8) Domains + SSL

1. من إعدادات الـApplication اربط Domain (مثال: `app.example.com`)
2. فعّل SSL/Let’s Encrypt من Coolify
3. تأكد أن:
   - الموقع بيفتح HTTPS
   - تسجيل الدخول شغال (Cookie `secure` بيكون true في production)

---

## 9) خطوات تحقق بعد النشر (Post-deploy checklist)

- **الصفحات الأساسية**:
  - `/` يفتح
  - `/admin` يفتح للأدمن فقط
- **Auth**:
  - Login/Register بدون أخطاء 500
  - Cookie `token` بيتحط
- **DB**:
  - إضافة income/expense بتشتغل
- **Uploads**:
  - رفع صورة بروفايل من `/profile` ينشئ ملف في `public/uploads/profiles` ويظهر في الصفحة
  - بعد redeploy، الصور القديمة ما تختفيش (ده تأكيد إن الـVolume صح)
- **Mobile** (لو بتستخدمه):
  - تأكد إن الموبايل بيضرب الدومين الصحيح للـAPI
  - Authorization Bearer شغال (موجود في `getSession()`)

---

## 10) مشاكل شائعة على Coolify وحلول سريعة

### 10.1) Prisma/DB connection fails
- راجع:
  - `DB_HOST` (لو DB service داخل Coolify غالبًا اسمها هو الـhostname)
  - `DB_PORT`
  - Firewall/Network (لازم نفس network)

### 10.2) الصور بتختفي بعد redeploy
- معناه إنك ماعملتش Volume لـ `public/uploads` أو مسار الـmount غلط.

### 10.3) Build بيقع بسبب Prisma generate
- تأكد إن `npm run db:generate` بيشتغل أثناء build.

---

## 11) أسئلة لازم تجاوبني عليها لو عايز الدليل يتخصص 100% لبيئتك

- هل هتستخدم **MySQL Service داخل Coolify** ولا DB خارجية؟
- هل عندك **migrations** موجودة في `prisma/migrations` ولا معتمد على `db push`؟
- هل مسار العمل داخل container عندك بيكون `/app` ولا Coolify مديه مسار مختلف؟

