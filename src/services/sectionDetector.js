export function detectSection(text) {

  if (text.includes("STI")) {
    return "Informatique";
  }
 if (text.includes("TECH")) {
    return "Technique";
  }
  if (text.includes("ECO")) {
    return "Économie";
  }

  if (text.includes("PIS")) {
    return "Lettres";
  }

  if (text.includes("SPOR")) {
    return "Sport";
  }

  const mathIndex = text.indexOf("MATH");
  const scphIndex = text.indexOf("SCPH");

  if (
    mathIndex !== -1 &&
    scphIndex !== -1
  ) {
    if (mathIndex < scphIndex) {
      return "Math";
    }

    return "Sciences";
  }

  return "Section inconnue";
}