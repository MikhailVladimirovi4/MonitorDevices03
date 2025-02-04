import { useEffect, useState } from "react";
import {
  fetchDevices,
  deleteDevice,
  editDevice,
  fetchLog,
} from "./services/device";
import Notes from "./components/notes/Notes.jsx";
import useInput from "./services/useInput.js";
import Modal from "./components/modals/modal.jsx";

export default function App() {
  const [devices, setDevices] = useState([]);
  const [updateData, setUpdateData] = useState(false);
  const updateInterval = 60000;
  const [showLog, setShowLog] = useState("Логирование:");
  const [sortParam, setSortParam] = useState(4);
  const [sortDirection, setSortDirection] = useState(1);
  const searchFilter = useInput();
  const [numberNotes, setNumberNotes] = useState(0);
  const [totalOffline, setTotalOffline] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [action, setAction] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [contractName, setContractName] = useState("");
  const [contractId, setContractId] = useState("");
  const [address, setAddress] = useState("");
  const [macAddress, setMacAddress] = useState("");
  const [note, setNote] = useState("");
  const [noteLog, setNoteLog] = useState([]);

  const fetchData = async () => {
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
              a.timeOffline > b.timeOffline ? sortDirection : -sortDirection
            )
          : null;
      }
      console.log("update");
      setNumberNotes(data.length);
      changeTotalOffline(data);
      setDevices(data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchLogNote = async (ipAddress) => {
    try {
      const log = await fetchLog(ipAddress);
      setNoteLog(log);
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

  function changeTotalOffline(data) {
    let total = 0;

    data.forEach((device) => {
      device.isConnected == "offline" ? total++ : null;
    });

    setTotalOffline(total);
  }

  function actionComplete(text) {
    setUpdateData((prev) => !prev);
    setShowLog("Логирование: " + text);
    setInterval(() => setShowLog("Логирование:"), 10000);
  }
  function deleteNote() {
    const response = deleteDevice(ipAddress);
    response.then((value) => actionComplete(value));
  }
  function OpenModalFromNote(
    action,
    createdAt,
    ipAddress,
    contractName,
    contractId,
    address,
    note
  ) {
    setAction(action);
    setIpAddress(ipAddress);

    {
      action == "edit"
        ? (setContractName(contractName),
          setContractId(contractId),
          setAddress(address),
          setMacAddress(macAddress),
          setNote(note))
        : null;
    }
    {
      action == "info"
        ? (setCreatedAt(createdAt), fetchLogNote(ipAddress))
        : null;
    }

    setOpenModal(true);
  }
  function editNote(
    ipAddress,
    newContractName,
    newContractId,
    newAddress,
    newMacAddress,
    newNote
  ) {
    const response = editDevice(
      ipAddress,
      newContractName,
      newContractId,
      newAddress,
      newMacAddress,
      newNote
    );
    response.then((value) => actionComplete(value));
  }

  useEffect(() => {
    fetchData();
  }, [updateData, sortParam, sortDirection]);

  useEffect(() => {
    const timeInterval = setInterval(
      () => setUpdateData((prev) => !prev),
      updateInterval
    );

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <div>
      <Modal
        open={openModal}
        action={action}
        SetOpenModal={setOpenModal}
        deleteNote={deleteNote}
        editNote={editNote}
        ipAddress={ipAddress}
        contractName={contractName}
        contractId={contractId}
        address={address}
        macAddress={macAddress}
        note={note}
        createdAt={createdAt}
        noteLog={noteLog}
      />
      <header className="header">
        <label className="fixed" htmlFor="search">
          Поиск...
        </label>
        <input type="text" id="search" className="filter" {...searchFilter} />
        <h1 className="fixedNotes">
          {"Всего: " + numberNotes + ". Offline: " + totalOffline}
        </h1>
      </header>
      <main>
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
              return (
                <Notes
                  key={id}
                  {...props}
                  searchFilter={searchFilter}
                  OpenModalFromNote={OpenModalFromNote}
                />
              );
            })}
          </tbody>
        </table>
      </main>
      <footer className="footer">{showLog}</footer>
    </div>
  );
}
