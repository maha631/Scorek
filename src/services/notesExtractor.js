export function extractNotes(text) {

  const notes = {};

  const regex =
    /([A-Z]{2,10})\s*[=\-]\s*(\d+(?:\.\d+)?)/g;

  let match;

  while ((match = regex.exec(text)) !== null) {

    const matiere = match[1];

    const note = parseFloat(match[2]);

    notes[matiere] = note;
  }

  return notes;
}