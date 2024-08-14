import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Animes from "./Components/Animes";
import Anime from "./Components/Anime";
import Navbar from "./Components/Navbar";
import NewAnime from "./Components/NewAnime";
import Edit from "./Components/Edit";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Animes />} />
            <Route path="/animes/:id" element={<Anime />} />
            <Route path="/animes/new" element={<NewAnime />} />{" "}
            <Route path="/animes/:id/edit" element={<Edit />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
