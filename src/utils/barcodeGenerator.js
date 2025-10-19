/**
 * نظام توليد الباركود
 * يدعم أنواع مختلفة من الباركود مثل EAN13, Code128, UPC
 */

// توليد باركود EAN13
export const generateEAN13 = (prefix = '123', companyCode = '456789') => {
  // إنشاء رقم عشوائي للمنتج
  const productCode = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
  // دمج الأرقام
  const barcode = prefix + companyCode + productCode;
  
  // حساب رقم التحقق
  const checkDigit = calculateEAN13CheckDigit(barcode);
  
  return barcode + checkDigit;
};

// حساب رقم التحقق لـ EAN13
const calculateEAN13CheckDigit = (barcode) => {
  let sum = 0;
  
  // جمع الأرقام في المواضع الفردية
  for (let i = 0; i < 12; i += 2) {
    sum += parseInt(barcode[i]);
  }
  
  // جمع الأرقام في المواضع الزوجية وضربها في 3
  for (let i = 1; i < 12; i += 2) {
    sum += parseInt(barcode[i]) * 3;
  }
  
  // حساب رقم التحقق
  const remainder = sum % 10;
  return remainder === 0 ? 0 : 10 - remainder;
};

// توليد باركود Code128
export const generateCode128 = (text) => {
  // تحويل النص إلى أرقام
  const numericText = text.replace(/[^0-9]/g, '');
  
  if (numericText.length === 0) {
    throw new Error('النص يجب أن يحتوي على أرقام');
  }
  
  // إضافة رمز البداية والنهاية
  return `START-${numericText}-END`;
};

// توليد باركود UPC
export const generateUPC = () => {
  // إنشاء رقم عشوائي من 11 رقم
  const randomNumber = Math.floor(Math.random() * 100000000000).toString().padStart(11, '0');
  
  // حساب رقم التحقق
  const checkDigit = calculateUPCCheckDigit(randomNumber);
  
  return randomNumber + checkDigit;
};

// حساب رقم التحقق لـ UPC
const calculateUPCCheckDigit = (number) => {
  let sum = 0;
  
  // جمع الأرقام في المواضع الفردية
  for (let i = 0; i < 11; i += 2) {
    sum += parseInt(number[i]);
  }
  
  // جمع الأرقام في المواضع الزوجية وضربها في 3
  for (let i = 1; i < 11; i += 2) {
    sum += parseInt(number[i]) * 3;
  }
  
  // حساب رقم التحقق
  const remainder = sum % 10;
  return remainder === 0 ? 0 : 10 - remainder;
};

// توليد باركود عشوائي
export const generateRandomBarcode = (type = 'EAN13') => {
  switch (type) {
    case 'EAN13':
      return generateEAN13();
    case 'Code128':
      return generateCode128(Math.random().toString(36).substring(2, 8));
    case 'UPC':
      return generateUPC();
    default:
      return generateEAN13();
  }
};

// التحقق من صحة الباركود
export const validateBarcode = (barcode, type = 'EAN13') => {
  if (!barcode || barcode.length === 0) {
    return { valid: false, message: 'الباركود فارغ' };
  }
  
  switch (type) {
    case 'EAN13':
      if (barcode.length !== 13) {
        return { valid: false, message: 'طول الباركود يجب أن يكون 13 رقم' };
      }
      if (!/^\d{13}$/.test(barcode)) {
        return { valid: false, message: 'الباركود يجب أن يحتوي على أرقام فقط' };
      }
      // التحقق من رقم التحقق
      const checkDigit = calculateEAN13CheckDigit(barcode.substring(0, 12));
      if (parseInt(barcode[12]) !== checkDigit) {
        return { valid: false, message: 'رقم التحقق غير صحيح' };
      }
      return { valid: true, message: 'الباركود صحيح' };
      
    case 'UPC':
      if (barcode.length !== 12) {
        return { valid: false, message: 'طول الباركود يجب أن يكون 12 رقم' };
      }
      if (!/^\d{12}$/.test(barcode)) {
        return { valid: false, message: 'الباركود يجب أن يحتوي على أرقام فقط' };
      }
      // التحقق من رقم التحقق
      const upcCheckDigit = calculateUPCCheckDigit(barcode.substring(0, 11));
      if (parseInt(barcode[11]) !== upcCheckDigit) {
        return { valid: false, message: 'رقم التحقق غير صحيح' };
      }
      return { valid: true, message: 'الباركود صحيح' };
      
    default:
      return { valid: true, message: 'الباركود صحيح' };
  }
};

// توليد باركود مرتبط بـ SKU
export const generateBarcodeFromSKU = (sku, type = 'EAN13') => {
  // تحويل SKU إلى رقم
  const numericSKU = sku.replace(/[^0-9]/g, '');
  
  if (numericSKU.length === 0) {
    throw new Error('SKU يجب أن يحتوي على أرقام');
  }
  
  switch (type) {
    case 'EAN13':
      // استخدام أول 3 أرقام من SKU كبادئة
      const prefix = numericSKU.substring(0, 3).padStart(3, '0');
      const companyCode = numericSKU.substring(3, 9).padStart(6, '0');
      return generateEAN13(prefix, companyCode);
      
    case 'Code128':
      return generateCode128(sku);
      
    case 'UPC':
      // استخدام SKU كأساس للـ UPC
      const upcBase = numericSKU.substring(0, 11).padStart(11, '0');
      const upcCheckDigit = calculateUPCCheckDigit(upcBase);
      return upcBase + upcCheckDigit;
      
    default:
      return generateEAN13();
  }
};

// توليد باركود فريد
export const generateUniqueBarcode = (existingBarcodes = [], type = 'EAN13') => {
  let barcode;
  let attempts = 0;
  const maxAttempts = 100;
  
  do {
    barcode = generateRandomBarcode(type);
    attempts++;
  } while (existingBarcodes.includes(barcode) && attempts < maxAttempts);
  
  if (attempts >= maxAttempts) {
    throw new Error('لا يمكن توليد باركود فريد');
  }
  
  return barcode;
};

// تنسيق الباركود للعرض
export const formatBarcode = (barcode, type = 'EAN13') => {
  if (!barcode) return '';
  
  switch (type) {
    case 'EAN13':
      // تنسيق EAN13: 123-456-789-012-3
      return barcode.replace(/(\d{3})(\d{3})(\d{3})(\d{3})(\d{1})/, '$1-$2-$3-$4-$5');
      
    case 'UPC':
      // تنسيق UPC: 123-456-789-012
      return barcode.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, '$1-$2-$3-$4');
      
    case 'Code128':
      // تنسيق Code128: START-123456-END
      return barcode;
      
    default:
      return barcode;
  }
};

// إزالة التنسيق من الباركود
export const unformatBarcode = (formattedBarcode) => {
  return formattedBarcode.replace(/[^0-9]/g, '');
};

// توليد QR Code (محاكاة)
export const generateQRCode = (data) => {
  // في التطبيق الحقيقي، سيتم استخدام مكتبة QR Code
  return `QR-${data}-${Date.now()}`;
};

// تصدير الباركود كصورة (محاكاة)
export const exportBarcodeAsImage = (barcode, type = 'EAN13') => {
  // في التطبيق الحقيقي، سيتم استخدام مكتبة لرسم الباركود
  return {
    barcode,
    type,
    imageUrl: `/api/barcode/image/${barcode}/${type}`,
    width: type === 'EAN13' ? 200 : 150,
    height: 100
  };
};

// API endpoints للباركود
export const barcodeAPI = {
  // توليد باركود جديد
  generate: async (type = 'EAN13', sku = null) => {
    try {
      if (sku) {
        return generateBarcodeFromSKU(sku, type);
      }
      return generateRandomBarcode(type);
    } catch (error) {
      throw new Error(`خطأ في توليد الباركود: ${error.message}`);
    }
  },
  
  // التحقق من صحة الباركود
  validate: async (barcode, type = 'EAN13') => {
    return validateBarcode(barcode, type);
  },
  
  // توليد باركود فريد
  generateUnique: async (type = 'EAN13', existingBarcodes = []) => {
    return generateUniqueBarcode(existingBarcodes, type);
  },
  
  // تصدير كصورة
  exportImage: async (barcode, type = 'EAN13') => {
    return exportBarcodeAsImage(barcode, type);
  }
};

export default {
  generateEAN13,
  generateCode128,
  generateUPC,
  generateRandomBarcode,
  validateBarcode,
  generateBarcodeFromSKU,
  generateUniqueBarcode,
  formatBarcode,
  unformatBarcode,
  generateQRCode,
  exportBarcodeAsImage,
  barcodeAPI
};
