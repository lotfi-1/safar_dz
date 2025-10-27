import React, { createContext, useContext, useState, useEffect } from 'react';
import { I18nManager } from 'react-native';
import i18n from '../i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';

type Language = 'en' | 'ar';

interface LanguageContextProps {
  language: Language;
  fontFamily: string;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: 'en',
  fontFamily: 'NunitoSans',
  toggleLanguage: () => { },
});

const LANGUAGE_KEY = '@app_language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [fontFamily, setFontFamily] = useState('NunitoSans');

  useEffect(() => {
    (async () => {
      const savedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
      let lang: Language = savedLang as Language;

      if (!lang) {
        const deviceLang = RNLocalize.getLocales()[0]?.languageCode;
        lang = deviceLang === 'ar' ? 'ar' : 'en';
      }

      applyLanguage(lang);
    })();
  }, []);

  const applyLanguage = async (lang: Language) => {
    setLanguage(lang);
    await AsyncStorage.setItem(LANGUAGE_KEY, lang);
    i18n.changeLanguage(lang);

    if (lang === 'ar') {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
      setFontFamily('NotoSansArabic');
    } else {
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);
      setFontFamily('NunitoSans');
    }
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    applyLanguage(newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, fontFamily, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
