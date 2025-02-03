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
  newContractName == ""? newContractName = "-": null
  newContractId == ""? newContractId = "-": null
  newAddress == ""? newAddress = "-": null
  newMacAddress == ""? newMacAddress = "-": null
  newNote == ""? newNote = "-": null
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
