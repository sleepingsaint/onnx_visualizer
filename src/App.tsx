import "reactflow/dist/style.css";
import 'react-toastify/dist/ReactToastify.css';

import { QueryClient, QueryClientProvider } from "react-query";
import Container from "./Container";
import { ReactFlowProvider } from "reactflow";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from "react";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    toast.dismiss();
    toast.info("Loading Model...", { autoClose: false, theme: "dark" });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactFlowProvider>
        <div className="App" style={{ width: "100vw", height: "100vh" }}>
          <Container />
          <ToastContainer />
        </div>
      </ReactFlowProvider>
    </QueryClientProvider>
  );
}

export default App;
