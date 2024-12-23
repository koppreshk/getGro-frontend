/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/naming-convention */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { translate } from '@vitalets/google-translate-api';

// Define the paths to your translation files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const translationsDir = path.join(__dirname, 'src', 'locales');
const enFilePath = path.join(translationsDir, 'en', 'translation.json');

// Function to sort JSON keys alphabetically
const sortObjectKeys = (obj) => {
  return Object.keys(obj)
    .sort()
    .reduce((result, key) => {
      result[key] = obj[key];
      return result;
    }, {});
};

// Read and sort the English translations
const enTranslations = JSON.parse(fs.readFileSync(enFilePath, 'utf-8'));
const sortedEnTranslations = sortObjectKeys(enTranslations);

// Save the sorted English translations back to the file
fs.writeFileSync(
  enFilePath,
  JSON.stringify(sortedEnTranslations, null, 2),
  'utf-8'
);
console.log(`Sorted ${path.basename(enFilePath)} alphabetically.`);

// Function to translate text using Google Translate API
const translateText = async (text, targetLang) => {
  try {
    const res = await translate(text, { to: targetLang });
    return res.text;
  } catch (error) {
    console.error(`Error translating text: ${text} to ${targetLang}`, error);
    return text; // Fallback to the original text if translation fails
  }
};

// Function to add missing translations
const addMissingTranslations = async (langFilePath, targetLang) => {
  const langTranslations = JSON.parse(fs.readFileSync(langFilePath, 'utf-8'));
  let updated = false;

  // Add missing keys from English translations
  for (const key in sortedEnTranslations) {
    if (!langTranslations.hasOwnProperty(key)) {
      const translatedValue = await translateText(
        sortedEnTranslations[key],
        targetLang
      );
      langTranslations[key] = translatedValue;
      updated = true;
    }
  }

  // Sort the keys alphabetically
  const sortedTranslations = sortObjectKeys(langTranslations);

  // Save the updated translations back to the file
  if (updated) {
    fs.writeFileSync(
      langFilePath,
      JSON.stringify(sortedTranslations, null, 2),
      'utf-8'
    );
    console.log(
      `Updated ${path.basename(langFilePath)} with missing translations and sorted keys.`
    );
  } else {
    console.log(`${path.basename(langFilePath)} is already up to date.`);
  }
};

// Get all language directories except the English one
const languageDirs = fs
  .readdirSync(translationsDir)
  .filter((dir) => dir !== 'en');

// Add missing translations to each language file
(async () => {
  for (const dir of languageDirs) {
    const langFilePath = path.join(translationsDir, dir, 'translation.json');
    if (fs.existsSync(langFilePath)) {
      await addMissingTranslations(langFilePath, dir);
    } else {
      console.log(`Translation file not found for language: ${dir}`);
    }
  }
  console.log('Translation update complete.');
})();
