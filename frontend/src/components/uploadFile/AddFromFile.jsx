import Button from "../buttons/Button";
import path from "C:/newDevices/newDevices.txt";
import { getString } from "../../services/getString";

export default function AddFromFile({ addNote }) {
  const handleChange = async () => {
    const dataNewDevices = await getString(path, "\r\n");

    if (dataNewDevices.length < 1) {
      alert("Пожалуйста подготовьте файл");
      return;
    }

    dataNewDevices.forEach((device) => {
      const dataNewDevice = device.split(";");

      if (dataNewDevice.length != 5) {
        actionComplete("Некорректно внесены данные в файл");
      } else {
        addNote(
          dataNewDevice[0],
          dataNewDevice[1],
          dataNewDevice[2],
          dataNewDevice[3],
          dataNewDevice[4]
        );
      }
    });
  };

  return (
    <>
      <li>Путь C:\newDevices\ поместите файл: "newDevices.txt".</li>
      <li>Содержание файла: строки данных устройств с разделителем ";"</li>
      <li>Данные: Проект;IDГК;Адрес;ip-адрес;mac-адрес</li>
      <li>
        Пример: БД21;11-1111;Искровский пр-кт дом 13;127.0.0.1;ABCDABCDABCD
      </li>

      <Button style={"modalBtn"} onClick={handleChange}>
        Добавить
      </Button>
    </>
  );
}
