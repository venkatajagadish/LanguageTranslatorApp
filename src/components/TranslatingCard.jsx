import classes from "./Card.module.css";
import Languages from "./Languages";
import Utterence from "./../ui/Utterence";
import CopyText from "../ui/CopyText";
import { useState, useContext, useRef } from "react";
import { LanguageContext } from "../store/languageContext";
import { SUPPORTED_LANGUAGES } from "../utils/constants";

let supportedLang = [
  ...SUPPORTED_LANGUAGES.map((lang) => {
    return { ...lang };
  }),
];
export default function TranslatingCard() {
  const langCtx = useContext(LanguageContext);
  const timerRef = useRef();
  const [noOfChars, setNoOfChars] = useState(0);
  function onMoreLanguageSelect(short, language) {
    supportedLang = supportedLang.filter((lang) => lang.short != short);
    supportedLang.unshift({ language, short });
  }
  function contentChanged(event) {
    setNoOfChars(event.target.value.length);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(function () {
      langCtx.updateFromText(event.target.value);
    }, 1000);
  }
  const language =
    langCtx.detectLanguage.isLanguageDetect &&
    langCtx.detectLanguage.detectedLanguage &&
    langCtx.detectLanguage.detectedLanguage != "none"
      ? langCtx.detectLanguage.detectedLanguage
      : langCtx.fromLanguage
      ? langCtx.fromLanguage
      : "en";
  return (
    <div className={classes["card-container"]}>
      <Languages
        isShowDetect
        onLanguageSelect={langCtx.updateFromLanguage}
        detectLang={langCtx.detectLanguage}
        selectedLang={langCtx.fromLanguage}
        supportedLang={supportedLang}
        onMoreLanguageSelect={onMoreLanguageSelect}
      />
      <textarea
        className={classes.textContainer}
        onChange={contentChanged}
        defaultValue={langCtx.fromText}
      />
      <div className={classes.footer}>
        <Utterence language={language} text={langCtx.fromText} />
        <CopyText text={langCtx.fromText} />
      </div>
      <div className={classes.charCount}>{noOfChars}/500</div>
    </div>
  );
}
