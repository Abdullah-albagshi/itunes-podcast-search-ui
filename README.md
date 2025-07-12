# 🎨 Frontend - iTunes Podcast Search UI

## 🧪 التقنيات المستخدمة

- **Next.js 15** - App Router (مع دعم Server & Client Components)
- **React 19**
- **Tailwind CSS 4**
- **TypeScript**
- `fetch` API + `Suspense` + `loading.tsx`
- **Custom debounce input**
- **Custom scrollbar**
- **error component**
- **not found component**
- مكونات جاهزة من:
  - `@shadcn/react-dropdown-menu`
  - `@shadcn/Skeleton`
  - `lucide-react` (أيقونات)
  - `clsx`, `tailwind-merge`, `class-variance-authority` (لإدارة التنسيقات)

---

## 🛠️ خطوات التنفيذ

- أنشأت صفحة `/search` كواجهة رئيسية
- استخدمت `searchParams` للحصول على قيمة البحث من الرابط
- أنشأت مكون `SearchHeader` (Client Component) يحتوي على:
  - `useState` + `useEffect` + `debounce`
  - مزامنة ديناميكية مع URL عبر `router.replace()`
- أنشأت مكون `List` عام، يدعم 4 تخطيطات:
  - `scroll` (تمرير أفقي)
  - `grid` (شبكة)
  - `list` (صفوف)
  - `compact`
- أضفت مكونات `PodcastCard` و `EpisodeCard` تدعم الحجم الموحد عبر التخطيطات المختلفة
- دعمت التصميم الكامل بتجاوب عالي باستخدام Tailwind فقط

---

## 📁 ملفات مهمة

- `app/search/page.tsx` → الصفحة الأساسية لعرض البحث
- `components/SearchHeader.tsx` → إدخال البحث مع debounce + router
- `components/List.tsx` → قائمة مرنة تدعم أنواع متعددة من العرض
- `components/PodcastCard.tsx` → كرت البودكاست مع دعم responsiveness و layout ثابت
- `components/EpisodeCard.tsx` → كرت الحلقات بنفس الأسلوب
- `components/Loading.tsx` → عرض أثناء تحميل البيانات باستخدام Suspense

---

## 📜 التعامل مع API

- يقوم العميل (Frontend) بجلب البيانات مباشرة من API الخاص بالـ Backend.
- يتم تمرير المعامل `q` في الرابط مثل: `/search?q=ثمانية`

---

## 💡 اقتراحات

- عدم وجود تصميم مثلا من Figma يساعد في التطوير بشكل افضل

---

## 🚀 بدء المشروع

```bash
npm install
npm run dev
```

يفترض أن يكون الـ backend شغال على http://localhost:3000 (أو حسب بيئتك)


📂 ملف البيئة (.env)

```env
API_URL=http://localhost:3000/api/v1/itunes
```

---

## 📸 لقطات شاشة


<img width="2533" height="1292" alt="image" src="https://github.com/user-attachments/assets/aceef40b-af8c-4ad9-bc52-3d91a4d3acb7" />

---


<img width="2555" height="1291" alt="image" src="https://github.com/user-attachments/assets/5b5803db-2392-463e-a635-3390ddc8fbc2" />

--- 

<img width="2537" height="1295" alt="image" src="https://github.com/user-attachments/assets/05b6cee7-ec90-46b0-acef-48fd50603eaf" />

