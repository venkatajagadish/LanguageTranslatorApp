import copyLogo from "./../assets/Copy.svg";
export default function CopyText({ text }) {
  function copyToClipBoard() {
    if (!text) {
      return;
    }
    navigator.clipboard.writeText(text);
  }
  return (
    <>
      <img src={copyLogo} alt="Copy to clipboard" onClick={copyToClipBoard} />
    </>
  );
}
