import "./deviceLog.css";
import Button from "../buttons/button";
import moment from "moment";

export default function DeviceLog({
  setShowLog,
  ipAddress,
  createdAt,
  noteLog,
  contractId,
  resetLog,
}) {
  return (
    <div className="info">
      <section className="heading">
        {" "}
        Создано {moment(createdAt).format("DD/MM/YYYY")}
        <p>ID ГК: {contractId}</p>
        <p>IP: {ipAddress}</p>
        {noteLog.length > 0 ? (
          <p>
            <Button
              onClick={() => (resetLog(ipAddress), setShowLog(false))}
              style={"logBtn"}
            >
              Очистить историю
            </Button>
          </p>
        ) : null}
        <p>
          <Button onClick={() => setShowLog(false)} style={"logBtn"}>
            Вернуться к списку
          </Button>
        </p>
      </section>
      {noteLog.length == 0 ? (
        <p>Записи отсутствуют.</p>
      ) : (
        <ol>
          {noteLog.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ol>
      )}
    </div>
  );
}
