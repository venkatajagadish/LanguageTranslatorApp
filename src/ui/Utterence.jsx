import speakerLogo from "./../assets/sound_max_fill.svg";
export default function Utterence({ language, text }) {
  function utterText() {
    if (!text) {
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    window.speechSynthesis.speak(utterance);
  }
  return (
    <>
      <img src={speakerLogo} onClick={utterText} alt="Utter text" />
    </>
  );
}
