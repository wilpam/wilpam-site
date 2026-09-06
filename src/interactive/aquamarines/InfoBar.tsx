import "./InfoBar.css";

interface Props {
  children: React.ReactNode; 
}

export function InfoBar({ children }: Props) {
  return (
      <div id="aq-infobar">
        {children}
      </div>
  );
}
