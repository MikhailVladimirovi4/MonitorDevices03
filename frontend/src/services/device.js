import axios from "axios";

export const fetchDevices = async () => {
  try {
    return (await axios.get("http://localhost:5233/device")).data.devices;
  } catch (e) {
    console.log(e);
    return null;
  }
};
