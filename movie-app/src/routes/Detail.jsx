import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css"; // CSS import 추가

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      const json = await (
        await fetch(`https://yts.lt/api/v2/movie_details.json?movie_id=${id}`)
      ).json();

      setMovie(json.data.movie);
      setLoading(false);
    };
    getMovie();
  }, [id]);

  return (
    <div className={styles.container}>
      {loading ? (
        <h1 className={styles.loader}>Loading...</h1>
      ) : (
        <>
          <img
            src={movie.large_cover_image}
            className={styles.poster}
            alt={movie.title}
          />
          <h1 className={styles.title}>
            {movie.title} ({movie.year})
          </h1>
          <div className={styles.info}>
            <span>Rating: {movie.rating} / 10 </span> |
            <span> {movie.runtime} min</span>
          </div>
          <ul className={styles.genres}>
            {movie.genres.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
          <p className={styles.description}>{movie.description_full}</p>
          <button
            className={styles.back_btn}
            onClick={() => window.history.back()}>
            Go Back
          </button>
        </>
      )}
    </div>
  );
}

export default Detail;
