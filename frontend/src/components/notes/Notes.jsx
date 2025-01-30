import { Fragment } from "react";

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
}) {
  return (
    <Fragment>
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
          <button>Info</button>
        </td>
        <td>
          <button>Edit</button>
        </td>
        <td>
          <button>X</button>
        </td>
      </tr>
    </Fragment>
  );
}
