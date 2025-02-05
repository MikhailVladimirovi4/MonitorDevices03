import "./header.css";

export default function Header({ searchFilter, numberNotes, totalOffline }) {
  return (
    <header className="header">
      <label htmlFor="search">Поиск...</label>
      <input type="text" id="search" className="filter" {...searchFilter} />
      <h1 className="fixedNotes">
        {"Всего: " + numberNotes + ". Offline: " + totalOffline}
      </h1>
    </header>
  );
}
