export function detectOption(section, notes) {

    const sectionSubjects = {
        "Téchnique": [
            "TECH",
            "MATH",
            "SCPH",
            "ANGL",
            "FRAN",
            "ARAB",
            "PHIL",
            "INFO",
            "TECP",
            "EDPH"
        ],

        "Économie": [
            "ECO",
            "GEST",
            "MATH",
            "HGEO",
            "ANGL",
            "FRAN",
            "ARAB",
            "PHIL",
            "INFO",
            "EDPH"
        ],

        "Lettres": [
            "PHIL",
            "ARAB",
            "HGEO",
            "ANGL",
            "FRAN",
            "PISL",
            "INFO",
            "EDPH"
        ],

        "Informatique": [
            "ALGO",
            "MATH",
            "STI",
            "SCPH",
            "ANGL",
            "FRAN",
            "ARAB",
            "PHIL",
            "TECP",
            "EDPH"
        ],

        "Sciences": [
            "SCPH",
            "SCVT",
            "MATH",
            "ANGL",
            "FRAN",
            "ARAB",
            "PHIL",
            "INFO",
            "EDPH"
        ],

        "Math": [
            "MATH",
            "SCPH",
            "SCVT",
            "ANGL",
            "FRAN",
            "ARAB",
            "PHIL",
            "INFO",
            "EDPH"
        ]
    };

    const mainSubjects = sectionSubjects[section];

    if (!mainSubjects) {
        return null;
    }

    for (const [subject, score] of Object.entries(notes)) {

        const normalized = subject.toUpperCase();

        // ignorer les moyennes
        if (normalized === "MOYE" || normalized === "MOYF") {
            continue;
        }

        // matière optionnelle trouvée
        if (!mainSubjects.includes(normalized)) {
            return {
                subject,
                score
            };
        }
    }

    return null;
}