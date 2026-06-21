
import { useState } from "react";
import Tesseract from "tesseract.js";
import { parseResult } from "./services/resultParser";
import { detectSection } from "./services/sectionDetector";
import {
  buildFinalNotes,
  calculateMG,
  calculateFGMath,
  calculateFGScience,
  calculateFGEconomie,
  calculateFGInfo,
  calculateFGTechnique,
  calculateFGLettres,
  calculateFGSport,
} from "./services/scoreCalculator";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [inputText, setInputText] = useState("");
  const [ocrText, setOcrText] = useState("");
  const [section, setSection] = useState("");
  const [mode, setMode] = useState("");
  const [moyenne, setMoyenne] = useState("");
  const [admisNotes, setAdmisNotes] = useState({});
  const [controleNotes, setControleNotes] = useState({});
  const [finalNotes, setFinalNotes] = useState({});
  const [mgFinal, setMgFinal] = useState(null);
  const [fg, setFg] = useState(null);
  const [fg7, setFg7] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [fileName, setFileName] = useState("Aucun fichier");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [extractedDataText, setExtractedDataText] = useState("");
  const [inputMethod, setInputMethod] = useState(""); 
  const FG_RULES = {
  Math: {
    MG: 4,
    MATH: 2,
    SCPH: 1.5,
    SCVT: 0.5,
    FRAN: 1,
    ANGL: 1,
  },

  Sciences: {
    MG: 4,
    MATH: 1,
    SCPH: 1.5,
    SCVT: 1.5,
    FRAN: 1,
    ANGL: 1,
  },

  Économie: {
    MG: 4,
    ECO: 1.5,
    GEST: 1.5,
    MATH: 0.5,
    HGEO: 0.5,
    FRAN: 1,
    ANGL: 1,
  },

  Informatique: {
    MG: 4,
    MATH: 1.5,
    ALGO: 1.5,
    SCPH: 0.5,
    STI: 0.5,
    FRAN: 1,
    ANGL: 1,
  },

  Lettres: {
    MG: 4,
    ARAB: 1.5,
    PHIL: 1.5,
    HGEO: 1,
    FRAN: 1,
    ANGL: 1,
  },

  Technique: {
    MG: 4,
    TECH: 1.5,
    MATH: 1.5,
    SCPH: 1,
    FRAN: 1,
    ANGL: 1,
  },

  Sport: {
    MG: 4,
    SCBI: 1.5,
    SPOR: 1,
    EDPH: 0.5,
    SCPH: 0.5,
    PHIL: 0.5,
    FRAN: 1,
    ANGL: 1,
  }
};
  const processResult = (text) => {
    const result = parseResult(text);

    if (!result.valid) {
      alert(result.message);
      return;
    }

    setMode(result.mode);
    setMoyenne(result.moyenne || "");
    setAdmisNotes(result.admisNotes || {});
    setControleNotes(result.controleNotes || {});

    const sectionDetected = detectSection(result.admisText || text);
    setSection(sectionDetected);

    const notesFinales = buildFinalNotes(
      result.mode,
      result.controleNotes || {},
      result.admisNotes || {}
    );
    setFinalNotes(notesFinales);

    const mg = calculateMG(
      result.mode,
      result.controleNotes || {},
      result.admisNotes || {}
    );
    setMgFinal(Number(mg).toFixed(2));

    let fgResult = 0;
    switch (sectionDetected) {
      case "Math":
        fgResult = calculateFGMath(notesFinales, mg);
        break;
      case "Sciences":
        fgResult = calculateFGScience(notesFinales, mg);
        break;
      case "Économie":
        fgResult = calculateFGEconomie(notesFinales, mg);
        break;
      case "Informatique":
        fgResult = calculateFGInfo(notesFinales, mg);
        break;
      case "Technique":
        fgResult = calculateFGTechnique(notesFinales, mg);
        break;
      case "Lettres":
        fgResult = calculateFGLettres(notesFinales, mg);
        break;
      case "Sport":
        fgResult = calculateFGSport(notesFinales, mg);
        break;
      default:
        fgResult = 0;
    }

    const fgNormal = Number(fgResult);
    const fgAvec7 = fgNormal * 1.07;
    setFg(fgNormal.toFixed(2));
    setFg7(fgAvec7.toFixed(2));

    // Extraire les données pour l'aperçu
    let previewText = `Moy=${Number(mg).toFixed(2)} • `;
    const subjects = Object.keys(notesFinales).slice(0, 3);
    subjects.forEach((subj, index) => {
      if (index > 0) previewText += " • ";
      previewText += `${subj}=${notesFinales[subj].toFixed(2)}`;
    });
    setExtractedDataText(previewText);

    setShowResults(true);
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setImage(URL.createObjectURL(file));
    setPreviewVisible(true);
    setLoading(true);
    setInputMethod("image");

    try {
      const {
        data: { text },
      } = await Tesseract.recognize(file, "eng");
      setOcrText(text);
      processResult(text);
    } catch (error) {
      console.error(error);
      alert("Erreur OCR");
    }
    setLoading(false);
  };

  const handleText = () => {
    if (!inputText.trim()) {
      alert("Veuillez coller votre résultat");
      return;
    }
    setOcrText(inputText);
    processResult(inputText);
    setPreviewVisible(true);
    setInputMethod("sms");
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const getNotesList = () => {
    const subjects = {
      MATH: "Mathématiques",
      SCPH: "Sciences Physiques",
      SCVT: "Sciences de la Vie et de la Terre",
      FRAN: "Français",
      ANGL: "Anglais",
      ARAB: "Arabe",
      PHIL: "Philosophie",
      ECO: "Économie",
      GEST: "Gestion",
      HGEO: "Histoire-Géographie",
      ALGO: "Algorithmique",
      STI: "STI",
      TECH: "Technique",
      SCBI: "Sciences Biologiques",
      SPOR: "Sport",
      EDPH: "Éducation Physique",
    };

    const list = [];
    Object.keys(finalNotes).forEach((key) => {
      if (key !== "MOYE" && key !== "MOYF") {
        list.push({
          matiere: subjects[key] || key,
          code: key,
          note: finalNotes[key].toFixed(2),
        });
      }
    });
    return list;
  };

  // Fonction pour générer les lignes de détails
  // const getDetailLines = () => {
  //   const lines = [];
  //   if (mgFinal) {
  //     lines.push({ label: "MG", value: mgFinal });
  //     lines.push({ label: "4 × MG", value: (4 * parseFloat(mgFinal)).toFixed(2) });
  //   }

  //   const coeffs = {
  //     MATH: 2,
  //     SCPH: 1.5,
  //     SCVT: 0.5,
  //     FRAN: 1,
  //     ANGL: 1,
  //     ECO: 1.5,
  //     GEST: 1.5,
  //     HGEO: 0.5,
  //     ALGO: 1.5,
  //     STI: 0.5,
  //     TECH: 1.5,
  //     SCBI: 1.5,
  //     SPOR: 1,
  //     EDPH: 0.5,
  //     PHIL: 1.5,
  //     ARAB: 1.5,
  //   };

  //   Object.keys(finalNotes).forEach((key) => {
  //     if (key !== "MOYE" && key !== "MOYF" && coeffs[key]) {
  //       const note = finalNotes[key];
  //       const coeff = coeffs[key];
  //       lines.push({
  //         label: `${coeff} × ${key}`,
  //         value: (coeff * note).toFixed(2),
  //       });
  //     }
  //   });

  //   if (fg) {
  //     lines.push({ label: "FG =", value: fg, total: true });
  //   }

  //   return lines;
  // };
const getDetailLines = () => {
  const lines = [];

  const rules = FG_RULES[section] || {};

  if (mgFinal) {
    lines.push({ label: "MG", value: mgFinal });
    lines.push({
      label: "4 × MG",
      value: (4 * parseFloat(mgFinal)).toFixed(2),
    });
  }

  Object.entries(rules).forEach(([key, coeff]) => {
    if (key === "MG") return;

    const note = finalNotes[key];

    if (note !== undefined) {
      lines.push({
        label: `${coeff} × ${key}`,
        value: (coeff * note).toFixed(2),
      });
    }
  });

  if (fg) {
    lines.push({ label: "FG =", value: fg, total: true });
  }

  return lines;
};
  return (
    <div className="App">
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>Votre score universitaire en 3 secondes seulement !</h1>
          <p>
            Collez votre SMS Bac ou importez une capture d'écran
            et découvrez votre score FG instantanément.
          </p>
          <button className="btn" onClick={() => document.getElementById("calculator").scrollIntoView({ behavior: "smooth" })}>
            Calculez-le maintenant
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
        {/* <div className="hero-image">
          <img src="images/phone.png" alt="Téléphone" />
        </div> */}
      </section>

      {/* CALCULATOR */}
      <section className="calculator-section" id="calculator">
        <div className="container">
          <div className={`calc-grid ${showResults ? "show-results" : ""}`} id="calcGrid">
            {/* LEFT - INPUT CARD */}
            <div className="card">
              <div className="card-label">
                <i className="fa-solid fa-inbox"></i> Saisie du résultat
              </div>

              {/* Upload */}
              <div className="input-method upload-method">
                <h3>Importer une capture d'écran</h3>
                <p>Importez directement une image contenant votre SMS Bac.</p>
                <div className="upload-row">
                  <label htmlFor="capture"><i class="fa-solid fa-cloud-upload-alt"></i> Choisir une image</label>
                  <input type="file" id="capture" accept="image/*" onChange={handleImage} />
                  <span>{fileName !== "Aucun fichier" ? `📎 ${fileName}` : "PNG, JPG ou JPEG"}</span>
                </div>

                {/* APERÇU IMAGE */}
                {inputMethod === "image" && (
  <div className={`upload-preview show`} id="uploadPreview">
    <div className="preview-image">
      <img id="previewImg" src={image || ""} alt="Capture Bac" />
    </div>

    <div className="preview-content">
      <div className="file-name" id="fileName">{fileName}</div>
<span className={`status-badge ${loading ? "loading" : "success"}`}>
  {loading ? (
    <>
      <span className="spinner"></span>
      Traitement en cours...
    </>
  ) : (
    <>
      <i className="fa-solid fa-circle-check"></i>
      Image chargée
    </>
  )}
</span>
      {/* <span className="status-badge">
        <i className="fa-solid fa-circle-check"></i>
        {loading ? "Traitement en cours..." : "Image chargée"}
      </span> */}

      <div className="extracted-data">
        <i className="fa-solid fa-wand-magic-sparkles"></i>
        <div>
          <strong>Données détectées</strong>
          <p id="ocrPreview">
            {ocrText || "En attente de données..."}
          </p>
        </div>
      </div>
    </div>
  </div>
)}
                {/* <div className={`upload-preview ${previewVisible ? "show" : ""}`} id="uploadPreview">
                  <div className="preview-image">
                    <img id="previewImg" src={image || ""} alt="Capture Bac" />
                  </div>
                  <div className="preview-content">
                    <div className="file-name" id="fileName">{fileName}</div>
                    <span className="status-badge">
                      <i className="fa-solid fa-circle-check"></i>
                      {loading ? "Traitement en cours..." : "Image chargée"}
                    </span>
                    <div className="extracted-data">
                      <i className="fa-solid fa-wand-magic-sparkles"></i>
                      <div>
                        <strong>Données détectées</strong>
                        <p id="ocrPreview">
                          {ocrText || "En attente de données..."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>

              <div className="separator">
                <span>OU</span>
              </div>

              {/* SMS */}
              <div className="input-method sms-method">
                <h3>Coller le SMS Bac</h3>
                <p>Copiez puis collez le contenu de votre SMS Bac.</p>
                <textarea
                  className="textarea-sms"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="ADMIS
Moye=13.62
Math=14.75
ScPh=11.5
ScVT=10.25
Français=12
Anglais=13"
                />
                <div className="example-hint">
                  <i className="fa-solid fa-bolt"></i> Exemple :
                  <code>ADMIS · Moye=13.62 · Math=14.75</code>
                </div>
              </div>

              <button className="btn-calculate" onClick={handleText}>
                <i className="fa-solid fa-calculator"></i> Calculer mon FG
              </button>
            </div>

            {/* RIGHT - RESULTS */}
            <div id="resultSection" className={showResults ? "show" : ""}>
              {/* RESULT CARD */}
              <div className="card result-card">
                <div className="card-label">
                  <i className="fa-solid fa-file-lines"></i> Résultat Bac
                </div>
                <div className="result-items">
                  <div className="result-item">
                    <span className="label">Section</span>
                    <span className="value">{section || "Non détectée"}</span>
                  </div>
                  <div className="result-item">
                    <span className="label">Session</span>
                    <span className="value">
                      {mode === "CONTROLE_PLUS_ADMIS"
                        ? " CONTROLE"
                        : " PRINCIPALE"}
                    </span>
                  </div>
                  {/* <div className="result-item">
                    <span className="label">Type</span>
                    <span className="value">{mode || "Non détecté"}</span>
                  </div> */}
                  <div className="result-item">
                    <span className="label">Moyenne Finale</span>
                    <span className="value blue">{mgFinal || "N/A"}</span>
                  </div>
                </div>
              </div>

              {/* FG SCORE */}
              <div className="fg-score">
                <div className="label">🏆 SCORE FG</div>
                <div className="number">{fg || "0.00"}</div>
                <div className="sub">Formule Générale · Bac Tunisie</div>
              </div>

              {/* FG SCORE WITH 7% */}
              <div className="fg-score">
                <div className="label">🏆 SCORE FG avec 7%</div>
                <div className="number">{fg7 || "0.00"}</div>
                <div className="sub">Formule Générale avec 7% · Bac Tunisie</div>
              </div>

              {/* DETAILS */}
              <div className="card">
                <button className="details-toggle" onClick={toggleDetails}>
                  <i className={`fa-solid ${showDetails ? "fa-chart-line-down" : "fa-chart-column"}`}></i>
                  {showDetails ? "Masquer les détails" : "Afficher les détails du calcul"}
                </button>
                <div className={`details-content ${showDetails ? "show" : ""}`} id="detailsPanel">
                  {getDetailLines().map((line, index) => (
                    <div key={index} className={`line ${line.total ? "total-line" : ""}`}>
                      <span>{line.label}</span>
                      <span className={line.total ? "fg-final" : ""}>{line.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* NOTES TABLE */}
              <div className="card notes-card">
                <div className="card-label">
                  <i className="fa-solid fa-magnifying-glass"></i> Notes détectées
                </div>
                <table className="notes-table">
                  <thead>
                    <tr>
                      <th>Matière</th>
                      <th>Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getNotesList().map((item, index) => (
                      <tr key={index}>
                        <td>{item.matiere}</td>
                        <td>{item.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section">
        <h3>Contactez-nous</h3>
        <p>Une question ou une suggestion ? Retrouvez-nous ici.</p>
        <div className="contact-icons">
          <a href="https://www.facebook.com/profile.php?id=61590711960609" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a href="https://www.tiktok.com/@memo46220?_r=1&_t=ZS-97OqyYKtEAL" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-tiktok"></i>
          </a>
          <a href="mailto:benourmaha00@gmail.com">
            <i className="fa-solid fa-envelope"></i>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <strong>Scorek fi 3 second</strong>  © 2026 · Calculateur non officiel du score Bac Tunisie · Créé par Maha Nouri · v1.0.0        </div>
      </footer>
    </div>
  );
}

export default App;