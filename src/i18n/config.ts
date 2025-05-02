import { Language } from '@/domain/enums/language';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Cookies from 'js-cookie';
import { initReactI18next } from 'react-i18next';

type Context = Record<
  string,
  {
    default: Record<string, string>;
  }
>;

type Resources = Record<string, Record<string, Record<string, string>>>;

function loadTranslationFiles() {
  const resources: Resources = {};

  Object.values(Language).forEach((lang) => {
    resources[lang] = {};
  });

  const enContext: Context = import.meta.glob<{ default: Record<string, string> }>(
    './locales/en/**/*.json',
    { eager: true }
  );

  const ptBrContext: Context = import.meta.glob<{ default: Record<string, string> }>(
    './locales/pt-br/**/*.json',
    { eager: true }
  );

  const processContext = (context: Context, lang: Language) => {
    Object.keys(context).forEach((path) => {
      const filename = path.match(/\/([^/]+)\.json$/)?.[1];
      const module = context[path];

      resources[lang][filename] = 'default' in module ? module.default : module;
    });
  };

  processContext(enContext, Language.EN);
  processContext(ptBrContext, Language.PT_BR);

  return resources;
}

const resources = loadTranslationFiles();
const cookieOptions = { expires: 365 };

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: Language.EN,
    detection: {
      order: ['cookie', 'navigator'],
      lookupCookie: 'i18next',
    },
    interpolation: { escapeValue: false },
    ns: Object.keys(resources.en),
  });

export const changeLanguage = (lang: Language) => {
  i18n.changeLanguage(lang);
  Cookies.set('i18next', lang, cookieOptions);
};

export default i18n;
