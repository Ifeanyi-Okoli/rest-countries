import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingleCountry from './components/SingleCountry';
import Countries from './components/Countries';

function App() {
  return (
    <BrowserRouter className="App"> {/* parent of the entire application*/}
      <Routes> {/* rendering parent of the routes */}
        <Route path="/" element={<Countries />} />  {/* Home page route*/}
        <Route path="/:name" element={<SingleCountry />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

