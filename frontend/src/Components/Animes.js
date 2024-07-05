import { useState } from "react";
import Anime from "./Anime";

function Animes() {
  //fetch all animes from the backend and render them as a list using the Anime component. Make sure to style the animes to look like the screenshot from the README. Feel free to use axios to fetch

  const [animes, setAnimes] = useState([]);
  // empty view
  return (
    <section className="index" id="anime-list">
      <p>No animes to display</p>
    </section>
  );
}

export default Animes;
