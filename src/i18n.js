import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import common_ru from "./locales/ru/common.json";
import common_en from "./locales/en/common.json";
import blog_ru from "./locales/ru/blog.json";
import blog_en from "./locales/en/blog.json";
import about_ru from "./locales/ru/about.json";
import about_en from "./locales/en/about.json";

const resources = {
  ru: {
    common: common_ru,
    about: about_ru,
    blog: blog_ru,
  },
  en: {
    common: common_en,
    about: about_en,
    blog: blog_en,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "ru",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
