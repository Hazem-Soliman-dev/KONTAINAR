# مواصفات منصة System (ERP + CRM) - النسخة العربية

## نظرة عامة
منصة شاملة لإدارة الأعمال باللغة العربية تدعم جميع العمليات التجارية من المنتجات والمخزون إلى المبيعات والمحاسبة.

## هيكل القوائم العربية

### 1. الرئيسية
- **لوحة التحكم** (`/system`) - نظرة عامة على النظام والإحصائيات

### 2. المنتجات والمخزون
- **المنتجات**
  - قائمة المنتجات (`/system/products/list`)
  - إضافة منتج (`/system/products/add`)
  - المنتجات المحذوفة (`/system/products/deleted`)
- **المخازن والمخزون**
  - قائمة المستودعات (`/system/inventory/warehouses`)
  - تحركات المخزون (`/system/inventory/movements`)
  - تعديل الجرد (`/system/inventory/adjustments`)
  - نقل المخزون (`/system/inventory/transfers`)

### 3. المشتريات والموردين
- **الموردين**
  - قائمة الموردين (`/system/suppliers/list`)
  - إضافة مورد (`/system/suppliers/add`)
- **أوامر الشراء**
  - قائمة أوامر الشراء (`/system/purchasing/orders`)
  - إنشاء أمر شراء (`/system/purchasing/create`)
  - استقبال البضاعة (`/system/purchasing/receipts`)

### 4. المبيعات والطلبات
- **الطلبات**
  - قائمة الطلبات (`/system/sales/orders`)
  - إنشاء طلب (`/system/sales/create`)
  - الطلبات المحفوظة (`/system/sales/saved`)
  - المرتجعات (`/system/sales/returns`)

### 5. الفواتير والمحاسبة
- **الفواتير**
  - قائمة الفواتير (`/system/invoices/list`)
  - إنشاء فاتورة (`/system/invoices/create`)
  - طباعة الفواتير (`/system/invoices/print`)
- **المحاسبة**
  - القيود اليومية (`/system/accounting/entries`)
  - دفتر الأستاذ (`/system/accounting/ledger`)
  - دفاتر العملاء (`/system/accounting/customers`)
  - دفاتر الموردين (`/system/accounting/suppliers`)

### 6. العملاء و CRM
- **العملاء**
  - قائمة العملاء (`/system/customers/list`)
  - إضافة عميل (`/system/customers/add`)
  - العملاء المحتملين (`/system/customers/leads`)
- **إدارة العلاقات**
  - الفرص التجارية (`/system/crm/opportunities`)
  - المهام والمتابعة (`/system/crm/tasks`)
  - سجل النشاط (`/system/crm/activity`)

### 7. الموارد البشرية
- **الموظفين**
  - قائمة الموظفين (`/system/hr/employees`)
  - إضافة موظف (`/system/hr/add-employee`)
  - الحضور والغياب (`/system/hr/attendance`)
  - طلبات الإجازة (`/system/hr/leaves`)
  - الرواتب (`/system/hr/payroll`)

### 8. التقارير والتحليلات
- **التقارير**
  - تقارير المبيعات (`/system/reports/sales`)
  - تقارير المخزون (`/system/reports/inventory`)
  - تقارير الموردين (`/system/reports/suppliers`)
  - تقارير العملاء (`/system/reports/customers`)
  - التقارير المالية (`/system/reports/financial`)
- **التحليلات**
  - تحليل المبيعات (`/system/analytics/sales`)
  - تحليل المخزون (`/system/analytics/inventory`)
  - تحليل العملاء (`/system/analytics/customers`)

### 9. التسويق
- **الحملات التسويقية**
  - قائمة الحملات (`/system/marketing/campaigns`)
  - إنشاء حملة (`/system/marketing/create`)
  - القسائم والعروض (`/system/marketing/coupons`)

### 10. خدمات ما بعد البيع
- **خدمات العملاء**
  - طلبات الخدمة (`/system/service/orders`)
  - إدارة الضمان (`/system/service/warranty`)
  - معالجة المرتجعات (`/system/service/returns`)

### 11. الجودة والإنتاج
- **مراقبة الجودة**
  - فحوصات الجودة (`/system/quality/inspections`)
  - قائمة المواد (`/system/quality/bom`)
  - أوامر الإنتاج (`/system/quality/production`)

### 12. إدارة الأصول
- **الأصول الثابتة**
  - سجل الأصول (`/system/assets/register`)
  - جداول الاستهلاك (`/system/assets/depreciation`)
  - الصيانة المجدولة (`/system/assets/maintenance`)

### 13. إدارة البيانات
- **استيراد البيانات**
  - معالج الاستيراد (`/system/data/import`)
  - قوالب التصدير (`/system/data/export`)
- **سجل النشاط** (`/system/activity-log`)

### 14. الإعدادات
- **إعدادات النظام**
  - إعدادات الشركة (`/system/settings/company`)
  - إعدادات الفواتير (`/system/settings/invoices`)
  - إعدادات الضرائب (`/system/settings/taxes`)
  - العملات والمناطق (`/system/settings/currencies`)
  - إدارة الصلاحيات (`/system/settings/permissions`)
  - إعدادات التكامل (`/system/settings/integrations`)
  - النسخ الاحتياطي (`/system/settings/backup`)

### 15. الواجهة العامة
- **الصفحات العامة**
  - اتصل بنا (`/system/frontend/contact`)
  - من نحن (`/system/frontend/about`)
  - المدونة (`/system/frontend/blog`)
  - السياسات (`/system/frontend/policies`)
  - انضم كبائع (`/system/frontend/become-seller`)
  - انضم كمورد (`/system/frontend/become-supplier`)
  - العروض القادمة (`/system/frontend/upcoming-offers`)

## الحقول الأساسية للمنتجات

### المعلومات الأساسية
- **اسم المنتج (عربي)** - مطلوب
- **اسم المنتج (إنجليزي)** - اختياري
- **فئة المنتج** - مطلوب
- **SKU** - يتم توليده تلقائياً
- **الباركود** - يتم توليده تلقائياً
- **وصف المنتج** - مطلوب
- **الوصف الكامل** - اختياري (WYSIWYG)

### التسعير والمخزون
- **سعر البيع** - مطلوب
- **سعر التكلفة** - مطلوب
- **سعر المورد** - اختياري
- **المخزون الحالي** - مطلوب
- **نقطة إعادة الطلب** - اختياري
- **وحدة القياس** - مطلوب
- **نسبة الضريبة** - اختياري
- **نقاط المكافآت** - اختياري

### المواصفات المتقدمة
- **المواصفات الديناميكية** - اختياري
- **صور المنتج** - متعددة
- **رابط الفيديو** - اختياري
- **تفعيل المنتج** - افتراضي: مفعل
- **تتبع المخزون** - افتراضي: مفعل
- **السماح بالطلب المسبق** - افتراضي: معطل
- **يتطلب شحن** - افتراضي: مفعل

## أمثلة REST Endpoints

### المنتجات
```javascript
// قائمة المنتجات
GET /api/products
Query: ?page=1&limit=20&search=لابتوب&category=أجهزة كمبيوتر&status=متوفر

// منتج واحد
GET /api/products/:id

// إنشاء منتج
POST /api/products
Body: {
  "name": "لابتوب ديل إكس بي إس 13",
  "nameEn": "Dell XPS 13 Laptop",
  "category": "أجهزة كمبيوتر",
  "description": "لابتوب عالي الأداء مناسب للأعمال",
  "price": 4500,
  "cost": 3200,
  "stock": 15,
  "unit": "قطعة",
  "taxRate": 15,
  "attributes": [
    {"name": "المعالج", "value": "Intel Core i7", "type": "text"},
    {"name": "الذاكرة", "value": "16 GB", "type": "text"}
  ]
}

// تحديث منتج
PUT /api/products/:id
Body: { /* نفس هيكل الإنشاء */ }

// حذف منتج (soft delete)
DELETE /api/products/:id

// استعادة منتج
POST /api/products/:id/restore

// توليد باركود
POST /api/products/generate-barcode
Body: {
  "sku": "DL-XPS13-001",
  "type": "EAN13"
}
```

### العملاء
```javascript
// قائمة العملاء
GET /api/customers
Query: ?page=1&limit=20&search=أحمد&type=فرد&status=نشط

// عميل واحد
GET /api/customers/:id

// إنشاء عميل
POST /api/customers
Body: {
  "name": "أحمد محمد العلي",
  "email": "ahmed.ali@email.com",
  "phone": "+966501234567",
  "city": "الرياض",
  "country": "السعودية",
  "type": "فرد",
  "notes": "عميل مميز، يطلب بانتظام"
}

// تحديث عميل
PUT /api/customers/:id

// حذف عميل
DELETE /api/customers/:id
```

### المستودعات
```javascript
// قائمة المستودعات
GET /api/warehouses

// مستودع واحد
GET /api/warehouses/:id

// إنشاء مستودع
POST /api/warehouses
Body: {
  "name": "المستودع الرئيسي",
  "code": "WH-001",
  "type": "رئيسي",
  "address": "الرياض، حي النخيل، شارع الملك فهد",
  "city": "الرياض",
  "country": "السعودية",
  "phone": "+966501234567",
  "email": "main@company.com",
  "manager": "أحمد محمد",
  "capacity": 10000,
  "isDefault": true
}
```

### التقارير
```javascript
// تقرير المبيعات
GET /api/reports/sales
Query: ?from=2024-01-01&to=2024-01-31&period=شهري&format=json

// تقرير المخزون
GET /api/reports/inventory
Query: ?warehouse=1&category=أجهزة كمبيوتر&format=pdf

// تصدير التقرير
POST /api/reports/export
Body: {
  "reportType": "sales",
  "format": "pdf",
  "filters": {
    "from": "2024-01-01",
    "to": "2024-01-31"
  }
}
```

## نظام توليد الباركود

### أنواع الباركود المدعومة
- **EAN13** - 13 رقم (الأكثر شيوعاً)
- **UPC** - 12 رقم
- **Code128** - نص وأرقام

### API توليد الباركود
```javascript
// توليد باركود جديد
POST /api/barcode/generate
Body: {
  "type": "EAN13",
  "sku": "DL-XPS13-001"
}

// التحقق من صحة الباركود
POST /api/barcode/validate
Body: {
  "barcode": "1234567890123",
  "type": "EAN13"
}

// تصدير الباركود كصورة
GET /api/barcode/image/:barcode/:type
```

### مثال على توليد الباركود
```javascript
import { generateEAN13, validateBarcode } from './utils/barcodeGenerator';

// توليد باركود EAN13
const barcode = generateEAN13('123', '456789');
console.log(barcode); // "1234567890123"

// التحقق من صحة الباركود
const validation = validateBarcode(barcode, 'EAN13');
console.log(validation); // { valid: true, message: 'الباركود صحيح' }
```

## بيانات تجريبية (Seed Data)

### المنتجات
```json
[
  {
    "id": 1,
    "name": "لابتوب ديل إكس بي إس 13",
    "nameEn": "Dell XPS 13 Laptop",
    "sku": "DL-XPS13-001",
    "barcode": "1234567890123",
    "category": "أجهزة كمبيوتر",
    "price": 4500,
    "cost": 3200,
    "stock": 15,
    "unit": "قطعة",
    "taxRate": 15,
    "status": "متوفر"
  },
  {
    "id": 2,
    "name": "هاتف آيفون 15 برو",
    "nameEn": "iPhone 15 Pro",
    "sku": "AP-IP15P-001",
    "barcode": "1234567890124",
    "category": "هواتف ذكية",
    "price": 5500,
    "cost": 4200,
    "stock": 8,
    "unit": "قطعة",
    "taxRate": 15,
    "status": "متوفر"
  },
  {
    "id": 3,
    "name": "سماعات سوني WH-1000XM5",
    "nameEn": "Sony WH-1000XM5 Headphones",
    "sku": "SN-WH1000XM5-001",
    "barcode": "1234567890125",
    "category": "سماعات",
    "price": 1200,
    "cost": 800,
    "stock": 0,
    "unit": "قطعة",
    "taxRate": 15,
    "status": "نفد المخزون"
  }
]
```

### المستودعات
```json
[
  {
    "id": 1,
    "name": "المستودع الرئيسي",
    "code": "WH-001",
    "type": "رئيسي",
    "address": "الرياض، حي النخيل، شارع الملك فهد",
    "city": "الرياض",
    "country": "السعودية",
    "phone": "+966501234567",
    "email": "main@company.com",
    "manager": "أحمد محمد",
    "capacity": 10000,
    "currentStock": 7500,
    "status": "نشط",
    "isDefault": true
  },
  {
    "id": 2,
    "name": "مستودع الشرقية",
    "code": "WH-002",
    "type": "فرعي",
    "address": "الدمام، حي الفيصلية، شارع الملك عبدالعزيز",
    "city": "الدمام",
    "country": "السعودية",
    "phone": "+966501234568",
    "email": "east@company.com",
    "manager": "سارة أحمد",
    "capacity": 5000,
    "currentStock": 3200,
    "status": "نشط",
    "isDefault": false
  }
]
```

### الموردين
```json
[
  {
    "id": 1,
    "name": "شركة التقنية المتقدمة",
    "email": "info@tech-advanced.com",
    "phone": "+966501234567",
    "address": "الرياض، حي النخيل",
    "city": "الرياض",
    "country": "السعودية",
    "contactPerson": "أحمد محمد",
    "paymentTerms": "30 يوم",
    "rating": 4.5,
    "status": "نشط"
  },
  {
    "id": 2,
    "name": "مورد الإلكترونيات",
    "email": "info@electronics-supplier.com",
    "phone": "+966501234568",
    "address": "جدة، حي الزهراء",
    "city": "جدة",
    "country": "السعودية",
    "contactPerson": "سارة أحمد",
    "paymentTerms": "15 يوم",
    "rating": 4.2,
    "status": "نشط"
  }
]
```

### العملاء
```json
[
  {
    "id": 1,
    "name": "أحمد محمد العلي",
    "email": "ahmed.ali@email.com",
    "phone": "+966501234567",
    "city": "الرياض",
    "country": "السعودية",
    "type": "فرد",
    "status": "نشط",
    "totalOrders": 15,
    "totalSpent": 45000,
    "loyaltyPoints": 1250,
    "rating": 4.5
  },
  {
    "id": 2,
    "name": "شركة التقنية المتقدمة",
    "email": "info@tech-advanced.com",
    "phone": "+966501234568",
    "city": "جدة",
    "country": "السعودية",
    "type": "شركة",
    "status": "نشط",
    "totalOrders": 8,
    "totalSpent": 120000,
    "loyaltyPoints": 0,
    "rating": 4.8
  }
]
```

## الميزات التقنية

### الأداء
- **Lazy Loading** - تحميل الصفحات عند الحاجة
- **Server-side Pagination** - ترقيم الصفحات من الخادم
- **Caching** - تخزين مؤقت للبيانات المتكررة
- **Chunked Exports** - تصدير البيانات على دفعات

### الأمان
- **Role-based Access Control** - تحكم في الصلاحيات
- **Input Sanitization** - تنظيف البيانات المدخلة
- **Standardized Error Messages** - رسائل خطأ موحدة بالعربية

### التكامل
- **REST API** - واجهة برمجية موحدة
- **Webhooks** - إشعارات فورية
- **Export/Import** - تصدير واستيراد البيانات
- **Barcode Generation** - توليد الباركود تلقائياً

## التطوير المستقبلي

### المرحلة الأولى
- [x] هيكل القوائم العربية
- [x] صفحات المنتجات الأساسية
- [x] صفحات المستودعات
- [x] صفحات العملاء
- [x] نظام توليد الباركود
- [x] التقارير الأساسية

### المرحلة الثانية
- [ ] نظام المحاسبة المتقدم
- [ ] نظام الموارد البشرية
- [ ] نظام التسويق
- [ ] نظام الجودة
- [ ] نظام الأصول

### المرحلة الثالثة
- [ ] التكامل مع أنظمة خارجية
- [ ] تطبيق الهاتف المحمول
- [ ] الذكاء الاصطناعي
- [ ] التحليلات المتقدمة

## الخلاصة

هذا النظام يوفر منصة شاملة لإدارة الأعمال باللغة العربية مع دعم كامل لجميع العمليات التجارية. النظام مصمم ليكون سهل الاستخدام وقابل للتوسع مع مرور الوقت.

### المميزات الرئيسية
- **واجهة عربية كاملة** - جميع النصوص والواجهات باللغة العربية
- **نظام باركود متقدم** - توليد وتحقق من الباركود تلقائياً
- **تقارير شاملة** - تقارير مفصلة لجميع العمليات
- **أمان عالي** - نظام صلاحيات متقدم
- **أداء محسن** - تحميل سريع واستجابة عالية
- **قابلية التوسع** - إضافة ميزات جديدة بسهولة

النظام جاهز للاستخدام الفوري ويمكن تخصيصه حسب احتياجات كل شركة.
