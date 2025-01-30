import "./button.css";

export default function Button({ children, onClick, style }) {

  return (
    <button className={style} onClick={onClick}>
      {children}
    </button>
  );
}
