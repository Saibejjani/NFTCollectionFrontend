import { useContext } from "react";
import "./App.css";
import { TransactionContext } from "./context/TransactionContext";

const App = () => {
  const { fetchColletions, connectWallet, fetchThisCollection } =
    useContext(TransactionContext);
  return (
    <div>
      <h1>hello</h1>
    </div>
  );
};

export default App;
