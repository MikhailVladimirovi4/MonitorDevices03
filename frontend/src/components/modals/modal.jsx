import "./modal.css";
import useInput from "../../services/useInput";
import Button from "../buttons/Button";
import moment from "moment"

export default function Modal({
  open,
  action,
  SetOpenModal,
  deleteNote,
  editNote,
  ipAddress,
  contractName,
  contractId,
  address,
  macAddress,
  note,
  createdAt,
  noteLog,
}) {
  const inputIpAddress = useInput();
  const inputContractName = useInput();
  const inputContractId = useInput();
  const inputAddress = useInput();
  const inputMacAddress = useInput();
  const inputNote = useInput();

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
        {action == "add" || action == "edit" ? (
          <>
            <p>
              IP-Адрес:{" "}
              {action == "edit" ? (
                <span>{ipAddress}</span>
              ) : (
                <input
                  type="text"
                  id="ipAddress"
                  className="inputmodal"
                  {...inputIpAddress}
                />
              )}
              <label htmlFor="ipAddress" />
            </p>
            <p>
              Контракт:<span>{" " + contractName}</span>
              <input
                type="text"
                id="contractName"
                className="inputmodal"
                {...inputContractName}
              />
              <label htmlFor="contractName" />
            </p>
            <p>
              ID ГК:<span>{" " + contractId}</span>
              <input
                type="text"
                id="contractId"
                className="inputmodal"
                {...inputContractId}
              />
              <label htmlFor="contractId" />
            </p>
            <p>
              Адрес:<span>{" " + address}</span>
              <input
                type="text"
                id="address"
                className="inputmodal"
                {...inputAddress}
              />
              <label htmlFor="address" />
            </p>
            <p>
              Mac-адрес:<span>{" " + macAddress}</span>
              <input
                type="text"
                id="macAddress"
                className="inputmodal"
                {...inputMacAddress}
              />
              <label htmlFor="macAddress" />
            </p>
            {action == "edit" ? (
              <>
                <p>
                  Заметка:<span>{" " + note}</span>
                  <input
                    type="text"
                    id="note"
                    className="inputmodal"
                    {...inputNote}
                  />
                  <label htmlFor="note" />
                </p>
                <Button
                  style="modalBtn"
                  onClick={() => (
                    SetOpenModal(false),
                    editNote(
                      ipAddress,
                      inputContractName.value,
                      inputContractId.value,
                      inputAddress.value,
                      inputMacAddress.value,
                      inputNote.value
                    )
                  )}
                >
                  Изменить
                </Button>
              </>
            ) : null}
          </>
        ) : null}
        {action == "info" ? console.log(moment(createdAt).format("DD/MM/YYYY") + " " + noteLog) : null}

        <Button style="modalBtn" onClick={() => SetOpenModal(false)}>
          Назад
        </Button>
      </div>
    </div>
  ) : null;
}
