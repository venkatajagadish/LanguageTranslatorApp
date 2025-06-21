import classes from "./Card.module.css";
import Languages from "./Languages";
import Utterence from "./../ui/Utterence";
import CopyText from "../ui/CopyText";
import { useContext } from "react";
import { LanguageContext } from "../store/languageContext";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import SwipeImage from "./../assets/Horizontal_top_left_main.svg";

let supportedLang = [
  ...SUPPORTED_LANGUAGES.map((lang) => {
    return { ...lang };
  }),
];
export default function TranslatedCard() {
  const langCtx = useContext(LanguageContext);
  function onMoreLanguageSelect(short, language) {
    supportedLang = supportedLang.filter((lang) => lang.short != short);
    supportedLang.unshift({ language, short });
  }
  function SwipeLanguages() {
    langCtx.swipeLanguages();
  }
  return (
    <div className={`${classes["card-container"]} ${classes.readonly}`}>
      <Languages
        onLanguageSelect={langCtx.updateToLanguage}
        selectedLang={langCtx.toLanguage}
        supportedLang={supportedLang}
        onMoreLanguageSelect={onMoreLanguageSelect}
      />
      <div className={classes.swipeLang}>
        <img
          src={SwipeImage}
          alt="Swipe Languages"
          onClick={() => {
            SwipeLanguages();
          }}
        />
      </div>
      <textarea
        readOnly
        className={classes.textContainer}
        defaultValue={langCtx.toText}
      />
      <div className={classes.footer}>
        <Utterence language={langCtx.toLanguage} text={langCtx.toText} />
        <CopyText text={langCtx.toText} />
      </div>
    </div>
  );
}
