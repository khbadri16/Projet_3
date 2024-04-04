"use client";
import { useState } from "react";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
  getAuth,
} from "firebase/auth";
import { CgDanger } from "react-icons/cg";

export default function Deletacount() {
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const auth = getAuth();
  const handleDeleteAccount = async () => {
    if (!auth.currentUser) {
      alert("Aucun utilisateur connecté.");
      return;
    }

    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );

    try {
      await reauthenticateWithCredential(auth.currentUser, credential);
      await deleteUser(auth.currentUser);
      alert("Compte supprimé avec succès.");
    } catch (error) {
      alert("Erreur lors de la suppression du compte : " + error.message);
    }
  };

  return (
    <>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setModalVisible(true);
        }}
        className="block px-4 py-2 hover:bg-gray-200 whitespace-nowrap text-red-600 "
        style={{ whiteSpace: "nowrap" }}
      >
        Supprimer mon compte
      </a>

      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalVisible(false)}>
              &times;
            </span>
            <label>
              Entrez votre mot de passe pour confirmer:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div className="button-container">
              <button onClick={handleDeleteAccount} className="confirm-button">
                Confirmer la suppression{" "}
                <CgDanger style={{ marginLeft: "5px", color: "black" }} />
              </button>
              <button
                onClick={() => setModalVisible(false)}
                className="cancel-button"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
