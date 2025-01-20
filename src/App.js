import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Overview from './pages/Overview';
import Layout from './components/Layout';
import DigitalICAccount from './pages/DigitalI&CAccount';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Overview />}/>
        </Route>
        <Route path="/digitalI&CAccount" element={<Layout />}>
          <Route index element={<DigitalICAccount />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
