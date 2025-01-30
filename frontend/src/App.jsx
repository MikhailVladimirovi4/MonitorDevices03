import { useEffect, useState } from "react";
import { fetchDevices } from "./services/device";
import Notes from "./components/notes/Notes.jsx";
//import Button from "./components/buttons/Button.jsx";

export default function App() {
  const [devices, setDevices] = useState([]);
  const [updateData, setUpdateData] = useState(false);
  const [showLog, setShowLog] = useState("Логирование:");
  const [sortParam, setSortParam] = useState(4);
  const [sortDirection, setSortDirection] = useState(1);

  const fechData = async () => {
    try {
      const data = await fetchDevices();
      {
        sortParam == 1
          ? data.sort((a, b) =>
              a.contractName > b.contractName ? sortDirection : -sortDirection
            )
          : null;
      }
      {
        sortParam == 2
          ? data.sort((a, b) =>
              a.contractId > b.contractId ? sortDirection : -sortDirection
            )
          : null;
      }
      {
        sortParam == 3
          ? data.sort((a, b) =>
              a.address > b.address ? sortDirection : -sortDirection
            )
          : null;
      }
      {
        sortParam == 4
          ? data.sort((a, b) =>
              a.ipAddress - b.ipAddress ? sortDirection : -sortDirection
            )
          : null;
      }
      {
        sortParam == 5
          ? data.sort((a, b) =>
              a.macAddress > b.macAddress ? sortDirection : -sortDirection
            )
          : null;
      }
      {
        sortParam == 6
          ? data.sort((a, b) =>
              a.note > b.note ? sortDirection : -sortDirection
            )
          : null;
      }
      {
        sortParam == 7
          ? data.sort((a, b) =>
              a.isConnected > b.isConnected ? sortDirection : -sortDirection
            )
          : null;
      }
      {
        sortParam == 8
          ? data.sort((a, b) =>
              a.timeOffline - b.timeOffline ? sortDirection : -sortDirection
            )
          : null;
      }
      console.log(data);
      setDevices(data);
    } catch (e) {
      console.log(e);
    }
  };

  function doSort(number) {
    sortParam == number
      ? setSortDirection((sortDirection) => -sortDirection)
      : null;

    setSortParam(number);
  }

  function actionComplete(text) {
    setUpdateData((prev) => !prev);
    setShowLog(text);
    setInterval(
      () => setShowLog("Отображение результата действия на 10 секунд."),
      10000
    );
  }

  useEffect(() => {
    fechData();
  }, [updateData, sortParam, sortDirection]);

  return (
    <div>
      <table className="table" cellSpacing="0">
        <thead>
          <tr>
            <th onClick={() => doSort(1)}>Проект</th>
            <th onClick={() => doSort(2)}>ID ГК</th>
            <th onClick={() => doSort(3)}>Место размещения</th>
            <th onClick={() => doSort(4)}>IP адрес</th>
            <th onClick={() => doSort(5)}>MAC адрес</th>
            <th onClick={() => doSort(6)}>Дополнительная информация</th>
            <th onClick={() => doSort(7)}>Сеть</th>
            <th onClick={() => doSort(8)}>Offline мин.</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {devices.map(({ id, ...props }) => {
            return <Notes key={id} {...props} />;
          })}
        </tbody>
      </table>
      <footer className="footer">{showLog}</footer>
    </div>
  );
}
