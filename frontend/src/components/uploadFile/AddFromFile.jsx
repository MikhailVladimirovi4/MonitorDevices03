import { useState } from "react";
import { addDevices } from "../../services/device";
import Button from "../buttons/Button";
import path from "C:/newDevices/newDevices.txt";

export default function AddFromFile() {
  const [newDevices, setNewDevices] = useState([]);
  const [data, setData] = useState([]);

  const handleChange = async () => {
    console.log("читаем файл");
  };

  console.log(data);

  //data[0].split(";")

  async function getData() {
    try {
      const data = await (await fetch(path)).text();
      setData(data.split("\r\n"))
    } catch (error) {
      console.error(error.message);
    }
  }


  // var data = fetch(path)
  //   .then((r) => r.text())
  //   .then((text) => {
  //     console.log(typeof text);
  //   })

  //Sync

  // var fs = require('fs');
  // var array = fs.readFileSync('file.txt').toString().split("\n");
  // for(i in array) {
  //     console.log(array[i]);
  // }

  //Async

  // const fs = require("fs");
  // fs.readFile(path, function (err, data) {
  //   if (err) throw err;

  //   var array = data.toString().split("\r\n");

  //   setNewDevices(array);

  //   for (i in newDevices) {
  //     console.log(newDevices[i]);
  //   }
  // });

  // if (newDevices.length < 1) {
  //   alert("Пожалуйста подготовьте файл");
  //   return;
  // }

  //await addDevices("добавляем устройства");

  return (
    <>
      <li>Путь C:\newDevices\ поместите файл: "newDevices.txt".</li>
      <li>Содержание файла: строки данных устройств с разделителем ";"</li>
      <li>Данные: Проект;IDГК;Адрес;ip-адрес;mac-адрес</li>
      <li>
        Пример: БД21;11-1111;Искровский пр-кт дом 13;127.0.0.1;ABCDABCDABCD
      </li>

      <Button style={"modalBtn"} onClick={() => getData()}>
        Добавить
      </Button>
    </>
  );
}
