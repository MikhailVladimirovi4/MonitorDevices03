import "./modal.css";
import useInput from "../../services/useInput";
import Button from "../buttons/Button";

export default function Modal({ open, action, SetOpenModal, deleteNote }) {
  return open ? (
    <div className="modal">
      <div className={action}>
        {action == "delete" ? (
          <>
            <p>Подтвердите удаление:</p>
            <Button
              style="modalBtn"
              onClick={() => (SetOpenModal(false), deleteNote())}
            >
              Удалить
            </Button>
          </>
        ) : null}
        <Button style="modalBtn" onClick={() => SetOpenModal(false)}>
          Отмена
        </Button>
      </div>
    </div>
  ) : null;
}
