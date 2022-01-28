import MovieCard from './components/MovieCard';

function createMovieCards(movieList, removeRating = false) {
  const array = [];
  for (let i = 0; i < movieList.length; i++) {
    const movie = movieList[i];
    const { id, poster_path, vote_average, title, release_date } = movie;

    const image = `https://image.tmdb.org/t/p/w500/${poster_path}`;
    const newDate = trimDate(release_date);
    const price = getPrice(id);

    array.push(
      <MovieCard
        key={`${i}`}
        background={image}
        rating={vote_average}
        title={title}
        date={newDate}
        price={price}
        id={id}
        removeRating={removeRating}
      />
    );
  }

  return array;
}

function getPrice(id) {
  const prices = ['19.99', '4.99', '15.99', '7.99'];
  const num =
    id
      .toString()
      .split('')
      .reduce((num, acc) => {
        return Number(num) + acc;
      }, 0) % 4;

  return prices[num];
}

function trimDate(date) {
  let trimedDate = '';
  for (let i = 0; i < 4; i++) {
    trimedDate += date[i];
  }

  return trimedDate;
}

function changePage(target, prev) {
  const btn = target;
  let newPage = btn === 'prev' ? prev - 1 : prev + 1;
  newPage = newPage <= 1 ? 1 : newPage;
  return newPage;
}

export { createMovieCards, changePage, trimDate };
//API Key f4b964a7e615c3824313f9121ff9270d
//Imge URL format https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg
//GET Top Movies https://api.themoviedb.org/3/movie/top_rated?api_key=f4b964a7e615c3824313f9121ff9270d&language=en-US&page=1
//GET More Top Movies https://api.themoviedb.org/3/movie/popular?api_key=f4b964a7e615c3824313f9121ff9270d&language=en-US&page=1
