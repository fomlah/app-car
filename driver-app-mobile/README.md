# Driver App Mobile (React Native)

تطبيق موبايل لإدارة دخل السائقين - نسخة React Native (Expo) من مشروع app-car

## المتطلبات

- **Node.js** 18+
- **Android Studio** (لتشغيل على Android Emulator أو جهاز حقيقي)
- **Expo CLI** (يتم تثبيته تلقائياً)
- **Backend (app-car)** يجب أن يكون شغال (محلياً أو أونلاين)

## التثبيت

```bash
cd driver-app-mobile
npm install
```

## إعداد الاتصال بالـ Backend

افتح الملف `src/services/api.ts` وعدّل `BASE_URL`:

```typescript
// للتطوير المحلي مع Android Emulator:
const BASE_URL = 'http://10.0.2.2:3000';

// للتطوير المحلي مع جهاز حقيقي (استبدل بـ IP جهازك):
// const BASE_URL = 'http://192.168.1.XXX:3000';

// للإنتاج (بعد رفع الـ backend أونلاين):
// const BASE_URL = 'https://your-deployed-app.vercel.app';
```

## التشغيل

### 1. شغّل الـ Backend أولاً
```bash
cd ../app-car
npm run dev
```

### 2. شغّل التطبيق
```bash
cd ../driver-app-mobile
npx expo start
```

### 3. اختر طريقة التشغيل
- اضغط `a` لفتح Android Emulator
- أو امسح QR Code بتطبيق **Expo Go** على موبايلك

## بناء APK للأندرويد

### باستخدام EAS Build (مُوصى به):
```bash
npm install -g eas-cli
eas login
eas build --platform android --profile preview
```

### باستخدام Android Studio:
```bash
npx expo prebuild --platform android
```
ثم افتح مجلد `android` في Android Studio واعمل Build.

## هيكل المشروع

```
driver-app-mobile/
├── App.tsx                    # نقطة الدخول الرئيسية
├── src/
│   ├── constants/
│   │   └── theme.ts          # الألوان والثوابت
│   ├── contexts/
│   │   ├── AuthContext.tsx    # إدارة تسجيل الدخول
│   │   └── ThemeContext.tsx   # الوضع الداكن/الفاتح
│   ├── hooks/
│   │   └── useData.ts        # hooks للدخل والمصروفات
│   ├── navigation/
│   │   └── AppNavigator.tsx  # التنقل (Bottom Tabs + Stack)
│   ├── screens/
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── ForgotPasswordScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── AddIncomeScreen.tsx
│   │   ├── AddExpenseScreen.tsx
│   │   ├── ReportsScreen.tsx
│   │   ├── GoalsScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── NotificationsScreen.tsx
│   └── services/
│       └── api.ts            # كل API calls
```

## الشاشات المبنية

| الشاشة | الوصف |
|--------|-------|
| تسجيل الدخول | بريد إلكتروني + كلمة مرور |
| إنشاء حساب | تسجيل مستخدم جديد |
| استعادة كلمة المرور | إرسال كلمة مرور جديدة |
| الرئيسية | ملخص الدخل/المصروفات، هدف الشهر، نشاط اليوم |
| إضافة دخل | اختيار الشركة + المبلغ |
| إضافة مصروف | اختيار الفئة + المبلغ |
| التقارير | رسوم بيانية، مقارنة الشركات |
| الأهداف | هدف شهري، progress دائري، إنجازات |
| حسابي | بروفايل، إحصائيات، إنجازات، روابط سريعة |
| الإشعارات | عرض وتحديد كمقروء |

## ملاحظات مهمة

- التطبيق يدعم **RTL** (من اليمين لليسار) للعربية
- الـ **Dark Mode** هو الافتراضي مع إمكانية التبديل
- Auth تعمل بـ **Bearer Token** (يُخزن في SecureStore)
- الـ Backend يدعم الآن Cookie + Bearer Token معاً
