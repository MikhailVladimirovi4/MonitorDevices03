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
  SetOpenModal,
  SetAction,
  SetIpAddress,
}) {
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
            <Button
              style={"infoBtn"}
              onClick={() => (
                SetOpenModal(true), SetAction("info"), SetIpAddress(ipAddress)
              )}
            >
              Info
            </Button>
          </td>
          <td>
            <Button
              style={"editBtn"}
              onClick={() => (
                SetOpenModal(true), SetAction("edit"), SetIpAddress(ipAddress)
              )}
            >
              Edit
            </Button>
          </td>
          <td>
            <Button
              style={"deleteBtn"}
              onClick={() => (
                SetOpenModal(true), SetAction("delete"), SetIpAddress(ipAddress)
              )}
            >
              X
            </Button>
          </td>
        </tr>
      ) : null}
    </Fragment>
  );
}
