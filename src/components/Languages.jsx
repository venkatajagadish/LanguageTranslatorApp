import { useState } from "react";
import classes from "./Languages.module.css";
import arrowImg from "./../assets/Expand_down.svg";

export default function Languages({
  isShowDetect,
  onLanguageSelect,
  detectLang,
  selectedLang,
  supportedLang,
  onMoreLanguageSelect,
}) {
  const [displayMoreLanguages, setDisplayMoreLanguages] = useState(false);
  const indexOfSelecteLang = supportedLang
    .map((item) => item.short)
    .indexOf(selectedLang);
  if (indexOfSelecteLang > 1) {
    const selectedLangObj = supportedLang[indexOfSelecteLang];
    supportedLang = supportedLang.filter((lang) => lang.short != selectedLang);
    supportedLang.unshift(selectedLangObj);
  }
  return (
    <div className={classes.languageButtons}>
      {isShowDetect && (
        <button
          className={detectLang.isdetectLanguage ? classes.selected : undefined}
          onClick={() => {
            onLanguageSelect("Detect");
          }}
        >
          {detectLang.isdetectLanguage && detectLang.detectedLanguage != null
            ? detectLang.detectedLanguage != "none"
              ? `Detected - ${detectLang.detectedLanguage || ""}`
              : "Unsupported"
            : "Detect Language"}
        </button>
      )}
      {supportedLang
        .filter((item, index) => index <= 1)
        .map((item) => {
          return (
            <button
              key={item.language}
              className={
                selectedLang == item.short ? classes.selected : undefined
              }
              onClick={() => {
                onLanguageSelect(item.short);
              }}
            >
              {item.language}
            </button>
          );
        })}
      <div onClick={() => setDisplayMoreLanguages((prev) => !prev)}>
        <img
          className={displayMoreLanguages ? classes.translate : undefined}
          src={arrowImg}
          alt="Expand/Collapse"
        />

        <div
          className={`${classes.moreLanguages} ${
            displayMoreLanguages ? classes.showMoreLanguages : ""
          }`}
        >
          {supportedLang
            .filter((item, index) => index > 1)
            .map((item) => {
              return (
                <button
                  key={item.language}
                  onClick={() => {
                    onMoreLanguageSelect(item.short, item.language);
                    onLanguageSelect(item.short);
                    setDisplayMoreLanguages((prev) => !prev);
                  }}
                >
                  {item.language}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
}
