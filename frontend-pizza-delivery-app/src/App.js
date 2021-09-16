import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "./components/Navbar";
import Homescreen from "./screens/Homescreen";


function App() {
  return (
    <div className="App">
       <Navbar />
       <Homescreen />
    </div>
  );
}

export default App;
