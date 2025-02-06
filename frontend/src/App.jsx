import { useEffect, useState } from "react";
import {
  fetchDevices,
  deleteDevice,
  editDevice,
  fetchLog,
  deleteLog,
  addDevice,
} from "./services/device";
import useInput from "./services/useInput.js";
import Modal from "./components/modals/Modal.jsx";
import Table from "./components/table/Table.jsx";
import Header from "./components/header/Header.jsx";
import DeviceLog from "./components/noteLog/deviceLog.jsx";
import Button from "./components/buttons/Button.jsx";
import UploadFile from "./components/uploadFile/LoadFile.jsx";

export default function App() {
  const [devices, setDevices] = useState([]);
  const [updateData, setUpdateData] = useState(false);
  const updateInterval = 60000;
  const [actionResult, setActionResult] = useState("Логирование:");
  const [sortParam, setSortParam] = useState(4);
  const [sortDirection, setSortDirection] = useState(1);
  const searchFilter = useInput();
  const [numberNotes, setNumberNotes] = useState(0);
  const [totalOffline, setTotalOffline] = useState(0);
  const [showLog, setShowLog] = useState(false);
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
    setActionResult("Логирование: " + text);
    setInterval(() => setActionResult("Логирование:"), updateInterval);
  }

  function deleteNote(ipAddress) {
    const response = deleteDevice(ipAddress);
    response.then((value) => actionComplete(value));
  }

  function addNote(contractName, contractId, address, ipAddress, macAddress) {
    const response = addDevice(
      contractName,
      contractId,
      address,
      ipAddress,
      macAddress
    );
    response.then((value) => actionComplete(value));
  }

  function makeActionNote(
    action,
    createdAt,
    ipAddress,
    contractName,
    contractId,
    address,
    note
  ) {
    setAction(action);
    setContractId(contractId);
    setIpAddress(ipAddress);

    {
      action == "edit"
        ? (setContractName(contractName),
          setAddress(address),
          setMacAddress(macAddress),
          setNote(note),
          setOpenModal(true))
        : null;
    }
    {
      action == "info"
        ? (setCreatedAt(createdAt), fetchLogNote(ipAddress), setShowLog(true))
        : null;
    }
    {
      action == "delete" ? setOpenModal(true) : null;
    }
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

  function resetLog(ipAddress) {
    const response = deleteLog(ipAddress);
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
        addNote={addNote}
        ipAddress={ipAddress}
        contractName={contractName}
        contractId={contractId}
        address={address}
        macAddress={macAddress}
        note={note}
      />
      <Header
        searchFilter={searchFilter}
        numberNotes={numberNotes}
        totalOffline={totalOffline}
      />
      <main>
        {showLog ? (
          <DeviceLog
            setShowLog={setShowLog}
            ipAddress={ipAddress}
            createdAt={createdAt}
            noteLog={noteLog}
            contractId={contractId}
            resetLog={resetLog}
          />
        ) : (
          <Table
            doSort={doSort}
            devices={devices}
            searchFilter={searchFilter}
            makeActionNote={makeActionNote}
          />
        )}
      </main>
      <footer className="footer">
        {actionResult}
        <UploadFile />
        <Button
          style={"addBtn"}
          onClick={() => (setAction("add"), setOpenModal(true))}
        >
          Добавить устройство
        </Button>
      </footer>
    </div>
  );
}
