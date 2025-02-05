import "./table.css";
import Notes from "../notes/notes";

export default function Table({
  doSort,
  devices,
  searchFilter,
  makeActionNote,
}) {
  return (
    <table className="table" cellSpacing="0">
      <thead>
        <tr>
          <th onClick={() => doSort(1)}>Проект</th>
          <th onClick={() => doSort(2)}>ID ГК</th>
          <th onClick={() => doSort(3)}>Место размещения</th>
          <th onClick={() => doSort(4)}>IP адрес</th>
          <th onClick={() => doSort(5)}>MAC адрес</th>
          <th onClick={() => doSort(6)}>Дополнительная информация</th>
          <th onClick={() => doSort(7)}>Сеть</th>
          <th onClick={() => doSort(8)}>Offline мин.</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {devices.map(({ id, ...props }) => {
          return (
            <Notes
              key={id}
              {...props}
              searchFilter={searchFilter}
              makeActionNote={makeActionNote}
            />
          );
        })}
      </tbody>
    </table>
  );
}
