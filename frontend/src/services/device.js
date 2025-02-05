import axios from "axios";

export const fetchDevices = async () => {
  try {
    return (await axios.get("http://localhost:5233/device")).data.devices;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const deleteDevice = async (ipAddress) => {
  try {
    const str = await axios.delete(
      "http://localhost:5233/device?ipAddress=" + ipAddress
    );
    return str.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const editDevice = async (
  ipAddress,
  newContractName,
  newContractId,
  newAddress,
  newMacAddress,
  newNote
) => {
  newContractName == "" ? (newContractName = "-") : null;
  newContractId == "" ? (newContractId = "-") : null;
  newAddress == "" ? (newAddress = "-") : null;
  newMacAddress == "" ? (newMacAddress = "-") : null;
  newNote == "" ? (newNote = "-") : null;
  try {
    const str = await axios.put(
      "http://localhost:5233/Device?ipAddress=" +
        ipAddress +
        "&contractName=" +
        newContractName +
        "&contractId=" +
        newContractId +
        "&address=" +
        newAddress +
        "&macAddress=" +
        newMacAddress +
        "&note=" +
        newNote
    );
    return str.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const fetchLog = async (ipAddress) => {
  try {
    return (
      await axios.get(
        "http://localhost:5233/Device/device_log?ipAddress=" + ipAddress
      )
    ).data.log.log;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const deleteLog = async (ipAddress) => {
  try {
    const str = await axios.put(
      "http://localhost:5233/Device/device_log?ipAddress=" + ipAddress
    );
    return str.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const addDevice = async (
  contractName,
  contractId,
  address,
  ipAddress,
  macAddress
) => {
  contractName == "" ? (contractName = "-") : null;
  contractId == "" ? (contractId = "-") : null;
  address == "" ? (address = "-") : null;
  ipAddress == "" ? (ipAddress = "-") : null;
  macAddress == "" ? (macAddress = "-") : null;
  try {
    const str = await axios.post("http://localhost:5233/Device", {
      contractName,
      contractId,
      address,
      ipAddress,
      macAddress,
    });
    return str.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
