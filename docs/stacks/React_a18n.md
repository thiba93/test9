
# Internationalization (i18n) with React

This document outlines the setup and usage of internationalization (i18n) in our React application, utilizing the `react-i18next` library. The goal is to facilitate the development of multilingual UIs, making our app accessible to a global audience.

## Getting Started

### Installation

First, you need to install `i18next` and `react-i18next` by running:

```bash
npm install i18next react-i18next
```

### Configuration

Create an `i18n.js` file in your project's `src` directory. This file will configure `i18next` and load the translations:

```javascript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  fr: {
    translation: translationFR
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // default language
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
```

### Translation Files

Create a `locales` directory within the `src` directory. Inside `locales`, create a directory for each language you support (e.g., `en`, `fr`), and within those, a `translation.json` file:

```
src/
  locales/
    en/
      translation.json
    fr/
      translation.json
```

Example of `translation.json` for English (`en/translation.json`):

```json
{
  "welcome": "Welcome to React",
  "description": "This is a paragraph."
}
```

And French (`fr/translation.json`):

```json
{
  "welcome": "Bienvenue à React",
  "description": "Ceci est un paragraphe."
}
```

### Using Translations in Components

To use translations in your React components, use the `useTranslation` hook:

```jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();

  return <h1>{t('welcome')}</h1>;
}

export default App;
```

## Changing Languages

You can change the language dynamically in your application by using the `i18n.changeLanguage` function:

```javascript
import i18n from './i18n'; // assuming i18n.js is in the src directory

i18n.changeLanguage('fr');
```

## Conclusion

Internationalization in React applications is straightforward with the `react-i18next` library, enhancing the app's accessibility and reach. By following the above steps, you can easily add multiple languages to your app, improving the user experience for a global audience.
```

