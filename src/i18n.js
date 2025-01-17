import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { DateTime } from "luxon";

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          headText: "Track Your Order",
          emptyInput: "Please enter a tracking number",
          error_message: "Invalid tracking number",
          network_error: "It seems there is a network error. Please try again",
          TrackingNumber: "Tracking Number",
          Order: "Order",
          DeliveredStatus: "Delivered on ",
          ReturnedStatus: "Returned on ",
          ArrivingStatus: "Arriving on ",
          timeDiff:
            "Your order is expected to arrive within {{timeDifference}} working days",
          pickedUp: "Picked Up",
          processing: "Processing",
          outForDelivery: "Out for Delivery",
          returned: "Returned",
          delivered: "Delivered",
          date: "{{date, DATE_HUGE}}",
          time: "{{value, TIME_HM}}",
        },
      },
      ar: {
        translation: {
          headText: "تتبع طلبك",
          emptyInput: "رجاء أدخل رقم تتبع",
          error_message: "رقم تتبع غير صالح",
          network_error: "يبدو أن هناك خطأ في الشبكة. يرجى المحاولة مرة أخرى",
          TrackingNumber: "رقم التتبع",
          Order: "طلب",
          DeliveredStatus: "تم التسليم في ",
          ReturnedStatus: "تم الإرجاع في ",
          ArrivingStatus: "من المتوقع الوصول في ",
          timeDiff: "من المتوقع وصول طلبك خلال {{timeDifference}} أيام عمل",
          pickedUp: "إستلام الطلب",
          processing: "قيد المعالجة",
          outForDelivery: "خارج للتوصيل",
          returned: "تم الإرجاع",
          delivered: "تم التسليم",
          date: "{{date, DATE_HUGE_ar}}",
          time: "{{value, TIME_HM}}",
        },
      },
    },
  });

i18n.services.formatter.add("DATE_HUGE", (value, lng, options) => {
  return DateTime.fromJSDate(value).setLocale(lng).toFormat("EEE MMM. dd");
});
i18n.services.formatter.add("DATE_HUGE_ar", (value, lng, options) => {
  return DateTime.fromJSDate(value).setLocale(lng).toFormat("EEE, dd MMM");
});

i18n.services.formatter.add("TIME_HM", (value, lng, options) => {
  return DateTime.fromJSDate(value).setLocale(lng).toFormat("hh:mm a");
});

i18n.services.formatter.add("NUMBER", (value, lng, options) => {
  return new Intl.NumberFormat(lng, options).format(value);
});

export default i18n;
