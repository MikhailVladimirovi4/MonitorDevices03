import Button from "../buttons/Button";
import path from "C:/newDevices/newDevices.txt";
import { getString } from "../../services/getString";
import { addDevices } from "../../services/device";

export default function AddFromFile({ actionComplete, SetOpenModal }) {
  const handleChange = async () => {
    const newDevices = await getString(path, "\r\n");

    if (newDevices.length < 1) {
      alert("Пожалуйста подготовьте файл");
      return;
    }

    const result = await addDevices(newDevices);

    actionComplete(result);
    SetOpenModal(false);
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
