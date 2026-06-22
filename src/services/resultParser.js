
import { extractNotes } from "./notesExtractor";

export function parseResult(text) {
  const normalized = text.toUpperCase();

  const controleIndex = normalized.indexOf("CONTROLE");

  // Détection robuste du mot ADMIS malgré erreurs OCR
  const admisRegex =
    /(ADMIS|AOMIS|ADMI5|AOMI5|ADM1S|A0MIS)/;

  const admisMatch =
    normalized.match(admisRegex);

  const isAdmisByText = !!admisMatch;

  const admisIndex =
    admisMatch
      ? normalized.indexOf(admisMatch[0])
      : -1;

  // Recherche de la moyenne
  const moyMatch =
    normalized.match(
      /MOY[A-Z]*\s*=?\s*(\d+(?:\.\d+)?)/
    );

  const moyenne =
    moyMatch
      ? parseFloat(moyMatch[1])
      : null;

  const isAdmisByMoy =
    moyenne !== null && moyenne >= 10;

  // Non admis
  if (!isAdmisByText && !isAdmisByMoy) {
    return {
      valid: false,
      message: "Résultat non admis détecté",
      moyenne,
    };
  }

  if (controleIndex === -1) {
    const admisText =
      admisIndex !== -1
        ? normalized.substring(admisIndex)
        : normalized;

    return {
      valid: true,
      mode: isAdmisByText
        ? "ADMIS_DIRECT"
        : "ADMIS_PAR_MOYENNE",
      moyenne,
      admisText,
      admisNotes: extractNotes(admisText),
    };
  }

  const controleText =
    normalized.substring(
      controleIndex,
      admisIndex !== -1
        ? admisIndex
        : normalized.length
    );

  const admisText =
    admisIndex !== -1
      ? normalized.substring(admisIndex)
      : normalized;

  return {
    valid: true,
    mode: "CONTROLE_PLUS_ADMIS",
    moyenne,

    controleText,
    admisText,

    controleNotes:
      extractNotes(controleText),

    admisNotes:
      extractNotes(admisText),
  };
}