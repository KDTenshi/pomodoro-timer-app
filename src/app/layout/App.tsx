import { FC } from "react";
import "../style/App.css";
import { Timer } from "../../components/Timer";

const App: FC = () => {
  return (
    <div className="App">
      <Timer />
    </div>
  );
};

export default App;
