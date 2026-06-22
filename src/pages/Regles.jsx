// import "./Regles.css";

// function Regles() {
//   return (
//     <div className="regles-page">
//       <div className="container">

//         <h1>📚 Comment est calculé votre score ?</h1>

//         <section>
//           <h2>Session principale</h2>
//           <p>
//             Pour les candidats admis à la session principale,
//             les notes du SMS sont utilisées directement.
//           </p>
//         </section>

//         <section>
//           <h2>Session de contrôle</h2>

//           <p>
//             Pour chaque matière :
//           </p>

//           <div className="formula">
//             Note finale = (2 × Note Contrôle + Note Admis) / 3
//           </div>

//           <p>
//             Pour la moyenne :
//           </p>

//           <div className="formula">
//             MG = (2 × MOYE + MOYF) / 3
//           </div>
//         </section>

//         <section>
//           <h2>Formule Générale (FG)</h2>

//           <h3>Section Math</h3>

//           <div className="formula">
//             FG = 4×MG + 2×Math + 1.5×Sc.Ph + 0.5×SVT + Français + Anglais
//           </div>

//           <h3>Section Sciences</h3>

//           <div className="formula">
//             FG = 4×MG + Math + 1.5×Sc.Ph + 1.5×SVT + Français + Anglais
//           </div>

//           <h3>Section Économie</h3>

//           <div className="formula">
//             FG = 4×MG + 1.5×Eco + 1.5×Gestion + 0.5×Math + 0.5×HG + Français + Anglais
//           </div>
//         </section>

//         <section>
//           <h2>Cas particuliers</h2>

//           <ul>
//             <li>88.88 → Absence → note = 0</li>
//             <li>99.99 en EPS → note = 10</li>
//             <li>Correction automatique de certaines erreurs OCR</li>
//           </ul>
//         </section>

//         <section>
//           <h2>Avertissement</h2>

//           <p>
//             Scorek.tn est un outil non officiel destiné à aider les
//             candidats à calculer leur score universitaire.
//           </p>
//         </section>

//       </div>
//     </div>
//   );
// }

// export default Regles;
import { useNavigate } from "react-router-dom";
import "./Regles.css";

function Regles() {
  const navigate = useNavigate();

  return (
    <div className="regles-page">

      {/* HERO */}
      <div className="regles-hero">
        {/* <h1>📚 Comment est calculé votre score ?</h1> */}
<h1>
  <i className="fa-solid fa-book-open"></i>
  {" "}Comment est calculé votre score ?
</h1>
        <p>
          Découvrez les règles utilisées par Scorek.tn
          pour calculer automatiquement votre score universitaire
          et votre score avec bonus de 7%.
        </p>
      </div>

      {/* CONTENU */}
      <div className="regles-content">

        <div className="rule-card">
<h2>
  <i className="fa-solid fa-graduation-cap"></i>
  {" "}Session principale
</h2>
          <p>
            Pour les candidats admis à la session principale,
            les notes du SMS sont utilisées directement pour
            calculer le score.
          </p>
        </div>

        <div className="rule-card">
<h2>
  <i className="fa-solid fa-graduation-cap"></i>
  {" "}Session de contrôle
</h2>
          <p>
            Pour chaque matière :
          </p>

          <div className="formula-box">
            Note finale = (2 × Note Contrôle + Note Admis) / 3
          </div>

          <p style={{ marginTop: "20px" }}>
            Pour la moyenne :
          </p>

          <div className="formula-box">
            MG = (2 × MOYE + MOYF) / 3
          </div>
        </div>

        <div className="rule-card">
<h2>
  <i className="fa-solid fa-calculator"></i>
  {" "}Formule Générale (FG)
</h2>
          <h3>Section Mathématiques</h3>

          <div className="formula-box">
            FG = 4×MG + 2×Math + 1.5×Sc.Ph + 0.5×SVT + Français + Anglais
          </div>

          <h3 style={{ marginTop: "20px" }}>
            Section Sciences
          </h3>

          <div className="formula-box">
            FG = 4×MG + Math + 1.5×Sc.Ph + 1.5×SVT + Français + Anglais
          </div>

          <h3 style={{ marginTop: "20px" }}>
            Section Économie
          </h3>

          <div className="formula-box">
            FG = 4×MG + 1.5×Eco + 1.5×Gestion + 0.5×Math + 0.5×HG + Français + Anglais
          </div>
        </div>

        <div className="rule-card">
<h2>
  <i className="fa-solid fa-circle-info"></i>
  {" "}Cas particuliers
</h2>
          <ul className="rule-list">
            <li>88.88 → Absence → note = 0</li>
            <li>99.99 en EPS → note = 10</li>
            <li>Correction automatique de certaines erreurs OCR</li>
          </ul>
        </div>

        <div className="rule-card">
<h2>
  <i className="fa-solid fa-triangle-exclamation"></i>
  {" "}Avertissement
</h2>
          <p>
            Scorek.tn est un outil non officiel destiné à aider les
            candidats à calculer leur score universitaire.
            Les résultats affichés sont fournis à titre indicatif.
          </p>
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            className="back-btn"
            onClick={() => navigate("/")}
          >
            <i className="fa-solid fa-arrow-left"></i> 
  {" "} Retour à l'accueil
          </button>
        </div>

      </div>
    </div>
  );
}

export default Regles;