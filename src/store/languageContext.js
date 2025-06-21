import { createContext, useState } from "react";
import { detect } from "tinyld";
import { useQuery } from "@tanstack/react-query";
import fetchTranslation from "../utils/translationutil";
import { SUPPORTED_LANGUAGES_SHORT } from "../utils/constants";
function DetectLanguage(text) {
  const detectedLang = detect(text);
  console.log(detectedLang);
  if (SUPPORTED_LANGUAGES_SHORT.indexOf(detectedLang) > -1) {
    return detectedLang;
  }
  return "none";
}
export const LanguageContext = createContext({
  fromLanguage: "",
  toLanguage: "",
  fromText: "",
  toText: "",
  detectLanguage: {},
  updateFromLanguage: () => {},
  updateToLanguage: () => {},
  updateFromText: () => {},
  swapLanguages: () => {},
});

export default function TranslationProvider({ children }) {
  const [fromLanguage, setFromLanguage] = useState("en");
  const [toLanguage, setToLanguage] = useState("fr");
  const [fromText, setFromText] = useState("Hello, how are you");
  const [detectLanguage, setDetectLanguage] = useState({
    isdetectLanguage: false,
    detectedLanguage: null,
  });
  const { data } = useQuery({
    queryFn: ({ signal }) =>
      fetchTranslation({
        signal,
        fromLanguage,
        toLanguage,
        detectLanguage,
        fromText,
      }),
    queryKey: ["language", { fromLanguage, toLanguage, fromText }], // this will makes the events tigger once the state is changes as it will retrigger the component
  });
  function updateFromLanguage(language) {
    if (language == "Detect") {
      if (fromText.trim() != "") {
        let fromLang = DetectLanguage(fromText);
        setDetectLanguage({
          isdetectLanguage: true,
          detectedLanguage: fromLang,
        });
      } else {
        setDetectLanguage({
          isdetectLanguage: true,
          detectedLanguage: null,
        });
      }
      setFromLanguage("");
    } else {
      setFromLanguage(language);
      setDetectLanguage({
        isdetectLanguage: false,
        detectedLanguage: null,
      });
    }
  }
  function updateToLanguage(language) {
    setToLanguage(language);
  }
  function updateFromText(text) {
    if (detectLanguage.isdetectLanguage) {
      if (text != "") {
        let fromLang = DetectLanguage(text);
        setDetectLanguage({
          isdetectLanguage: true,
          detectedLanguage: fromLang,
        });
      } else {
        setDetectLanguage({
          isdetectLanguage: true,
          detectedLanguage: null,
        });
      }
    }
    setFromText(text);
  }
  function swapLanguages() {
    const from = fromLanguage;
    const to = toLanguage;
    if (from) {
      setToLanguage(from);
      setFromLanguage(to);
    } else if (
      detectLanguage.detectedLanguage &&
      detectLanguage.detectedLanguage != "none"
    ) {
      setToLanguage(detectLanguage.detectedLanguage);
      setFromLanguage(to);
    } else {
      setToLanguage("en");
      setFromLanguage(to);
    }
    setDetectLanguage({
      isdetectLanguage: false,
      detectedLanguage: null,
    });
  }
  const langCtxValue = {
    fromLanguage,
    toLanguage,
    fromText,
    toText: data?.translatedText,
    detectLanguage,
    updateFromLanguage,
    updateToLanguage,
    updateFromText,
    swapLanguages,
  };
  return (
    <LanguageContext.Provider value={langCtxValue}>
      {children}
    </LanguageContext.Provider>
  );
}
