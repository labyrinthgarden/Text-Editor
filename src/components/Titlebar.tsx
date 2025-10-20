import { getCurrentWindow } from "@tauri-apps/api/window";

interface TitlebarProps {
  title?: string;
}

function Titlebar({ title = "Basic Text Editor" }: TitlebarProps) {
  const minimizeWindow = async () => {
    await getCurrentWindow().minimize();
  };
  const maximizeWindow = async () => {
    await getCurrentWindow().toggleMaximize();
  };
  const closeWindow = async () => {
    await getCurrentWindow().close();
  };
  return (
    <div data-tauri-drag-region className="titlebar">
      <div className="titlebar-left">
        <button
          className="titlebar-button close-btn"
          onClick={closeWindow}
          type="button"
        >×</button>
        <button
          className="titlebar-button maximize-btn"
          onClick={maximizeWindow}
          type="button"
        >□</button>
        <button
          className="titlebar-button minimize-btn"
          onClick={minimizeWindow}
          type="button"
        >−</button>
      </div>
      <div className="titlebar-right">
        <span className="title">{title}</span>
      </div>
    </div>
  );
}

export default Titlebar;
