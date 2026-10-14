import { create } from 'zustand';

const translations = {
  en: {
    dashboard: 'Dashboard',
    logSession: 'Log Session',
    logFeedback: 'Log Feedback',
    technicalLog: 'Technical Log',
    generatorLog: 'Generator Log',
    reports: 'Reports & Export',
    myEntries: 'My Offline Entries',
    settings: 'Settings',
    logout: 'Logout',
    online: 'Online',
    offline: 'Offline',
    spckiPlatform: 'Digital Monitoring Platform',
    appSettings: 'App Settings',
    managePreferences: 'Manage your application preferences.',
    displayLanguage: 'Display Language',
    saveChanges: 'Save Changes',
    languageHint: 'The application interface will update to your selected language.',
    english: 'English',
    bengali: 'বাংলা (Bengali)',
    overviewDashboard: 'Overview Dashboard',
    monitorKitchen: 'Monitor your kitchen operations, solar generation, and community impact.',
    activeTotalHouseholds: 'Active / Total Households',
    participation: 'Participation',
    totalSessionsCompletion: 'Total Sessions (Completion)',
    completion: 'Completion',
    peopleServed: 'People Served',
    avgSessionTime: 'Avg. Session Time',
    totalWastedEnergy: 'Total Wasted Energy',
    faultsSafetyIncidents: 'Faults / Safety Incidents',
    operationalMetrics: 'Operational Metrics',
    enrollHousehold: 'Enroll Household'
  },
  bn: {
    dashboard: 'ড্যাশবোর্ড',
    logSession: 'সেশন লগ করুন',
    logFeedback: 'মতামত লগ করুন',
    technicalLog: 'কারিগরি লগ',
    generatorLog: 'জেনারেটর লগ',
    reports: 'রিপোর্ট এবং এক্সপোর্ট',
    myEntries: 'আমার অফলাইন এন্ট্রি',
    settings: 'সেটিংস',
    logout: 'লগআউট',
    online: 'অনলাইন',
    offline: 'অফলাইন',
    spckiPlatform: 'ডিজিটাল মনিটরিং প্ল্যাটফর্ম',
    appSettings: 'অ্যাপ সেটিংস',
    managePreferences: 'আপনার অ্যাপ্লিকেশন পছন্দসমূহ পরিচালনা করুন।',
    displayLanguage: 'প্রদর্শিত ভাষা',
    saveChanges: 'পরিবর্তন সংরক্ষণ করুন',
    languageHint: 'আপনার নির্বাচিত ভাষায় অ্যাপ্লিকেশন ইন্টারফেস আপডেট হবে।',
    english: 'English',
    bengali: 'বাংলা (Bengali)',
    overviewDashboard: 'ওভারভিউ ড্যাশবোর্ড',
    monitorKitchen: 'আপনার রান্নাঘরের কার্যক্রম, সৌর শক্তি উৎপাদন এবং সম্প্রদায়ের প্রভাব মনিটর করুন।',
    activeTotalHouseholds: 'সক্রিয় / মোট পরিবার',
    participation: 'অংশগ্রহণ',
    totalSessionsCompletion: 'মোট সেশন (সম্পূর্ণ)',
    completion: 'সম্পূর্ণ',
    peopleServed: 'মানুষ পরিবেশিত',
    avgSessionTime: 'গড় সেশন সময়',
    totalWastedEnergy: 'মোট অপচয় শক্তি',
    faultsSafetyIncidents: 'ত্রুটি / নিরাপত্তা ঘটনা',
    operationalMetrics: 'অপারেশনাল মেট্রিক্স',
    enrollHousehold: 'পরিবার নিবন্ধন করুন'
  }
};

export const useTranslationStore = create((set, get) => ({
  language: localStorage.getItem('language') || 'en',
  setLanguage: (lang) => {
    localStorage.setItem('language', lang);
    set({ language: lang });
  },
  t: (key) => {
    const { language } = get();
    return translations[language]?.[key] || translations['en'][key] || key;
  }
}));
