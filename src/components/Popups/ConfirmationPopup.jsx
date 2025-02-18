import "./PopupStyling.css";
import checkIcon from "../../assets/check-icon.svg";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PopupContext } from "../../context/popups.context";

function ConfirmationPopup({ isSignedUp, setIsSignedUp }) {
  const { setShowConfirmation, confirmationMessage } = useContext(PopupContext);

  const navigate = useNavigate();

  return (
    <div className="pop-up-blocker">
      <article className="pop-up-container confirmation">
        <img src={checkIcon} alt="confirmation icon" />
        <h3 className="confirm-h3">GREAT!</h3>
        <p>{confirmationMessage}</p>
        {isSignedUp && (
          <button
            onClick={() => {
              setShowConfirmation(false);
              setIsSignedUp(false);
              navigate("/auth/login");
            }}
            className="primary-button"
          >
            Let's log in!
          </button>
        )}
      </article>
    </div>
  );
}

export default ConfirmationPopup;
