function normalizeNote(note, matiere) {
  // Absence
  if (note === 88.88) {
    return 0;
  }

  // Dispense EPS
  if (
    note === 99.99 &&
    matiere === "EDPH"
  ) {
    return 10;
  }

  return note;
}
export function buildFinalNotes(
  mode,
  controleNotes,
  admisNotes
) {
  if (mode === "ADMIS_DIRECT" || mode === "ADMIS_PAR_MOYENNE") {
    const finalNotes = {};

    Object.keys(admisNotes).forEach(
      (matiere) => {
        finalNotes[matiere] =
          normalizeNote(
            admisNotes[matiere],
            matiere
          );
      }
    );

    return finalNotes;
  }

  const finalNotes = {};

  const matieres = new Set(
    [
      ...Object.keys(controleNotes),
      ...Object.keys(admisNotes),
    ].filter(
      (m) => m !== "MOYE" && m !== "MOYF"
    )
  );

  matieres.forEach((matiere) => {
    const noteControle = normalizeNote(
    controleNotes[matiere],
    matiere
    );

    const noteAdmis = normalizeNote(
      admisNotes[matiere],
      matiere
    );if (admisNotes[matiere] === 88.88) {
      finalNotes[matiere] = 0;
      return;
    }

    if (
      admisNotes[matiere] === undefined ||
      admisNotes[matiere] === 99.99
    ) {
      finalNotes[matiere] = noteControle;
      return;
    }

    finalNotes[matiere] = Number(
      (
        (2 * noteControle + noteAdmis) / 3
      ).toFixed(2)
    );


    finalNotes[matiere] = Number(
      (
        (2 * noteControle +
          noteAdmis) /
        3
      ).toFixed(2)
    );
  });

  return finalNotes;
}

export function calculateMG(
  mode,
  controleNotes,
  admisNotes
) {
  if (mode === "ADMIS_DIRECT" || mode === "ADMIS_PAR_MOYENNE") {
    return (
      admisNotes.MOYE ||
      admisNotes.MOYF ||
      0
    );
  }

  const moye =
    controleNotes.MOYE || 0;

  const moyf =
    admisNotes.MOYF || 0;

  return (
    (2 * moye + moyf) /
    3
  );
}
export function calculateFGMath(
  finalNotes,
  mg
) {
  return (
    4 * mg +
    2 * (finalNotes.MATH || 0) +
    1.5 * (finalNotes.SCPH || 0) +
    0.5 * (finalNotes.SCVT || 0) +
    (finalNotes.FRAN || 0) +
    (finalNotes.ANGL || 0)
  );
}
export function calculateFGScience(
  finalNotes,
  mg
) {
  return (
    4 * mg +
    (finalNotes.MATH || 0) +
    1.5 * (finalNotes.SCPH || 0) +
    1.5 * (finalNotes.SCVT || 0) +
    (finalNotes.FRAN || 0) +
    (finalNotes.ANGL || 0)
  );
}

export function calculateFGEconomie(
  finalNotes,
  mg
) {
  return (
    4 * mg +
    1.5 * (finalNotes.ECO || 0) +
    1.5 * (finalNotes.GEST || 0) +
    0.5 * (finalNotes.MATH || 0) +
    0.5 * (finalNotes.HGEO || 0) +
    (finalNotes.FRAN || 0) +
    (finalNotes.ANGL || 0)
  );
}

export function calculateFGInfo(
  finalNotes,
  mg
) {
  return (
    4 * mg +
    1.5 * (finalNotes.MATH || 0) +
    1.5 * (finalNotes.ALGO || 0) +
    0.5 * (finalNotes.SCPH || 0) +
    0.5 * (finalNotes.STI || 0) +
    (finalNotes.FRAN || 0) +
    (finalNotes.ANGL || 0)
  );
}
export function calculateFGLettres(
  finalNotes,
  mg
) {
  return (
    4 * mg +
    1.5 * (finalNotes.ARAB || 0) +
    1.5 * (finalNotes.PHIL || 0) +
    (finalNotes.HGEO || 0) +
    (finalNotes.FRAN || 0) +
    (finalNotes.ANGL || 0)
  );
}
export function calculateFGTechnique(
  finalNotes,
  mg
) {
  const tech =
    finalNotes.TECH ||
    finalNotes.TECHN ||
    0;

  return (
    4 * mg +
    1.5 * tech +
    1.5 * (finalNotes.MATH || 0) +
    (finalNotes.SCPH || 0) +
    (finalNotes.FRAN || 0) +
    (finalNotes.ANGL || 0)
  );
}

export function calculateFGSport(
  finalNotes,
  mg
) {
  return (
    4 * mg +
    1.5 * (finalNotes.SCBI || 0) +
    finalNotes.SPOR || 0 +
    0.5 * (finalNotes.EDPH || 0) +
    0.5 * (finalNotes.SCPH || 0) +
    0.5 * (finalNotes.PHIL || 0) +
    (finalNotes.FRAN || 0) +
    (finalNotes.ANGL || 0)
  );
}