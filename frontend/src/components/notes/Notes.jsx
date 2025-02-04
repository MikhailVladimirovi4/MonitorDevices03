import { Fragment } from "react";
import Button from "../buttons/Button";

export default function Notes({
  address,
  contractId,
  contractName,
  createdAt,
  ipAddress,
  isConnected,
  macAddress,
  note,
  timeOffline,
  searchFilter,
  OpenModalFromNote,
}) {
  function makeAction(action) {
    OpenModalFromNote(
      action,
      createdAt,
      ipAddress,
      contractName,
      contractId,
      address,
      note
    );
  }

  return (
    <Fragment>
      {contractName.toLowerCase().includes(searchFilter.value.toLowerCase()) ||
      contractId.toLowerCase().includes(searchFilter.value.toLowerCase()) ||
      address.toLowerCase().includes(searchFilter.value.toLowerCase()) ||
      ipAddress.toLowerCase().includes(searchFilter.value.toLowerCase()) ||
      macAddress.toLowerCase().includes(searchFilter.value.toLowerCase()) ||
      note.toLowerCase().includes(searchFilter.value.toLowerCase()) ? (
        <tr>
          <td className="textName">{contractName}</td>
          <td className="textId">{contractId}</td>
          <td className="textAddress">{address}</td>
          <td className="textIp">{ipAddress}</td>
          <td className="textMac">{macAddress}</td>
          <td className="textNote">{note}</td>
          <td className={isConnected}>*</td>
          <td className="textOffline">{timeOffline}</td>
          <td>
            <Button style={"infoBtn"} onClick={() => makeAction("info")}>
              Info
            </Button>
          </td>
          <td>
            <Button style={"editBtn"} onClick={() => makeAction("edit")}>
              Edit
            </Button>
          </td>
          <td>
            <Button style={"deleteBtn"} onClick={() => makeAction("delete")}>
              X
            </Button>
          </td>
        </tr>
      ) : null}
    </Fragment>
  );
}
