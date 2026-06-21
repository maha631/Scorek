// export function detectSection(text) {
//   const normalized = text.toUpperCase();

//   // Chercher le dernier ADMIS
//   const admisIndex = normalized.lastIndexOf("ADMIS");

//   if (admisIndex === -1) {
//     return null;
//   }

//   const usefulText = normalized.substring(admisIndex);

//   // ===== Niveau 1 =====

//   if (usefulText.includes("STI")) {
//     return "Informatique";
//   }
//  if (usefulText.includes("TECH")) {
//     return "Téchnique";
//   }
//   if (usefulText.includes("ECO")) {
//     return "Économie";
//   }

//   if (usefulText.includes("PISL")) {
//     return "Lettres";
//   }

//   if (usefulText.includes("SPOR")) {
//     return "Sport";
//   }

//   // ===== Niveau 2 =====

//   const mathIndex = usefulText.indexOf("MATH");
//   const scphIndex = usefulText.indexOf("SCPH");

//   if (mathIndex !== -1 && scphIndex !== -1) {
//     if (mathIndex < scphIndex) {
//       return "Math";
//     }

//     return "Sciences";
//   }

//   return "Section inconnue";
// }

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