import "./modal.css";
import useInput from "../../services/useInput";
import Button from "../buttons/Button";

export default function Modal({
  open,
  action,
  SetOpenModal,
  deleteNote,
  editNote,
  addNote,
  ipAddress,
  contractName,
  contractId,
  address,
  macAddress,
  note,
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
              onClick={() => (SetOpenModal(false), deleteNote(ipAddress))}
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
                    editNote(
                      ipAddress,
                      inputContractName.value,
                      inputContractId.value,
                      inputAddress.value,
                      inputMacAddress.value,
                      inputNote.value
                    ),
                    SetOpenModal(false)
                  )}
                >
                  Изменить
                </Button>
              </>
            ) : (
              <Button
                style="modalBtn"
                onClick={() => (
                  addNote(
                    inputContractName.value,
                    inputContractId.value,
                    inputAddress.value,
                    inputIpAddress.value,
                    inputMacAddress.value
                  ),
                  SetOpenModal(false)
                )}
              >
                Добавить
              </Button>
            )}
          </>
        ) : null}
        <Button style="modalBtn" onClick={() => SetOpenModal(false)}>
          Отмена
        </Button>
      </div>
    </div>
  ) : null;
}
