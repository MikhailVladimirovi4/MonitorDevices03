import "./loadFile.css";
import Button from "../buttons/Button";
import { useState, useRef } from "react";

export default function UploadFile( ) {
  const filePicker = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newDevices, setNewDevices] = useState([]);

  const handleChange = (event) => {
  console.log("ddd")
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Пожалуйста выберите файл");
      return;
    }

     const formData = new FormData();
     formData.append("file", selectedFile);


     const result = await sendFile(newDevices);
     actionComplete(result);
  };

  const handlePick = () => {
    filePicker.current.click();
  };

  return (
    <>
      <input
        className="hidden"
        type="file"
        ref={filePicker}
        onChange={handleChange}
        accept="text/*,.txt"
      />

      <Button style={"modalBtn"} onClick={handleUpload}>
        Добавить
      </Button>
    </>
  );
}
