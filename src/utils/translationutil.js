import { TRANSLATIONS_URL } from "./constants";
export default async function fetchTranslation({
  signal,
  fromLanguage,
  toLanguage,
  detectLanguage,
  fromText,
}) {
  if (fromText == "") {
    return { translatedText: "" };
  }
  let fromLang = fromLanguage;
  if (
    detectLanguage.isdetectLanguage &&
    (detectLanguage.detectedLanguage == "none" ||
      !detectLanguage.detectedLanguage)
  ) {
    return { translatedText: "" };
  }
  if (detectLanguage.isdetectLanguage && detectLanguage.detectedLanguage) {
    fromLang = detectLanguage.detectedLanguage;
  }
  let response = await fetch(
    `${TRANSLATIONS_URL}?q=${fromText}&langpair=${fromLang}|${toLanguage}`
  );

  var res = await response.json();
  return res.responseData;
}
