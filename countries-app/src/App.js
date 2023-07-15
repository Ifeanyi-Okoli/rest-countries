import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingleCountry from './components/SingleCountry';
import Countries from './components/Countries';
import Error from './components/Error';

function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/" element={<Countries />} />
        <Route path="/:name" element={<SingleCountry />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

