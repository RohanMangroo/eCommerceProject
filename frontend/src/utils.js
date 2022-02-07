import MovieCard from './components/movies/MovieCard';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

function createMovieCards(movieList, removeRating = false, mediaType) {
  const array = [];
  for (let i = 0; i < movieList.length; i++) {
    const passThrough = sanitizeData(movieList[i]);

    if (!passThrough) {
      continue;
    }

    const movie = movieList[i];
    const {
      id,
      poster_path,
      vote_average,
      title,
      name,
      release_date,
      first_air_date,
      media_type,
    } = movie;

    const currentTitle = title ? title : name;
    const image = `https://image.tmdb.org/t/p/w500/${poster_path}`;
    const currentMediaType = media_type ? media_type : mediaType;

    const newDate = release_date
      ? trimDate(release_date)
      : trimDate(first_air_date);
    const price = getPrice(id);

    const movieData = {
      background: image,
      rating: vote_average,
      title: currentTitle,
      date: newDate,
      price: price,
      id: id,
      removeRating: removeRating,
      media_type: currentMediaType,
    };

    array.push(<MovieCard key={`${i}`} movieData={movieData} />);
  }
  return array;
}

function sanitizeData(data) {
  const array = ['id', 'poster_path', 'backdrop_path'];

  const name = data.name;
  const title = data.title;
  const first_air_date = data.first_air_date;
  const release_date = data.release_date;

  if (!name && !title) return false;
  if (!release_date && !first_air_date) return false;

  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    if (
      data[value] === null ||
      data[value] === '' ||
      data[value] === undefined
    ) {
      return false;
    }
  }

  return true;
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

function createItemRows(items, clickHandler) {
  const array = [];
  for (let i = 0; i < items.length; i++) {
    let row;

    if (i % 2 === 0) row = 'even';
    else row = 'odd';

    const splitArray = items[i].title.split('/');

    const title = splitArray[0];
    const price = splitArray[1];

    const quantity = items[i].quantity;
    const total = Number(price) * Number(quantity);

    array.push(
      <div key={uuidv4()} className={`cart-row ${row}`}>
        <span className="cart-movie-title">{title}</span>
        <span>{`$${price}`}</span>
        <span className="movie-quant flex-row">
          <span
            onClick={(event) => clickHandler(event, `${title}/${price}`)}
            id="minus"
          >
            <AiOutlineMinusCircle id="minus" className="button" />
          </span>
          <span> {quantity}</span>
          <span
            onClick={(event) => clickHandler(event, `${title}/${price}`)}
            id="plus"
          >
            <AiOutlinePlusCircle id="plus" className="button" />
          </span>
        </span>
        <span>{`$${total.toFixed(2)}`}</span>
        <span
          onClick={(event) => clickHandler(event, `${title}/${price}`)}
          id="delete"
          className="delete-item"
        >
          <MdDeleteForever className="button" />
        </span>
      </div>
    );
  }

  return array;
}

function createOrderHistoryRow(items) {
  const array = [];
  for (let i = 0; i < items.length; i++) {
    const currentItem = items[i];
    let row;

    if (i % 2 === 0) row = 'even';
    else row = 'odd';

    const title = currentItem.title;
    const price = currentItem.price;

    const quantity = currentItem.quantity;
    const total = Number(price) * Number(quantity);

    const date = Date.parse(currentItem.date);
    const myDate = new Date(date).toString();

    const slicedDate = myDate.slice(3, 15).trim();

    let finalDate = '';
    for (let i = 0; i < slicedDate.length; i++) {
      const currentChar = slicedDate[i];
      if (currentChar === ' ') finalDate += '/';
      else finalDate += currentChar;
    }

    array.push(
      <div key={uuidv4()} className={`cart-row ${row}`}>
        <span className="cart-movie-title history-movie-title">
          {title}
          <button value={JSON.stringify(currentItem)} className="buy-again">
            B
          </button>
        </span>
        <span>{`$${price}`}</span>
        <span className="movie-quant flex-row">
          <span> {quantity}</span>
        </span>
        <span>{`$${total.toFixed(2)}`}</span>
        <span className="history-date">{finalDate}</span>
      </div>
    );
  }

  return array;
}

function createFavoritesRow(movies) {
  const array = [];
  let count = 0;
  let row = '';

  for (let item in movies) {
    if (count % 2 === 0) row = 'even';
    else row = 'odd';

    array.push(
      <Link
        className="nav-link"
        key={uuidv4()}
        to={`/movie/${undefined}/${movies[item]}}`}
      >
        <div className={`cart-row ${row}`}>
          <span className="cart-movie-title history-movie-title fav-title">
            {item}
          </span>
        </div>
      </Link>
    );
    count++;
  }

  return array;
}

function editCart(title, cart, action) {
  if (action === 'delete') {
    return cart.filter((item) => {
      if (item.title !== title) {
        return item;
      }
    });
  }

  return cart.filter((item) => {
    const currentTitle = item.title;
    const currentQuantity = item.quantity;

    if (title === currentTitle) {
      if (action === 'plus') item.quantity = Number(currentQuantity) + 1;
      else if (action === 'minus') item.quantity = Number(currentQuantity) - 1;
    }

    if (item.quantity !== 0) return item;
  });
}

function updateLocalStorage(token, id, username) {
  localStorage.setItem('token', token);
  localStorage.setItem('id', id);
  localStorage.setItem('username', username);
}

function changeHandler(event, setPassword, setUsername) {
  const input = event.target.name;
  const value = event.target.value;
  if (input === 'username') setUsername(value);
  else setPassword(value);
}

function changeHandlerSignUp(event, setUsername, setEmail, setPassword) {
  const input = event.target.name;

  const value = event.target.value;

  if (input === 'username') setUsername(value);
  else if (input === 'email') setEmail(value);
  else if (input === 'password') setPassword(value);
}

function resetInput(stateArray) {
  for (let i = 0; i < stateArray.length; i++) {
    const func = stateArray[i];
    func('');
  }
}

function processResponse(data) {
  const array = [];

  for (let item in data) {
    array.push({ title: item, quantity: data[item] });
  }

  return array;
}

function calculateSubtotal(cart) {
  let subtotal = 0;

  cart.items.forEach((item) => {
    const quantity = item.quantity;
    const price = Number(item.title.split('/')[1]);
    subtotal += price * quantity;
  });

  return subtotal;
}

function addItemToLocalCart(localCart, movieTitle) {
  let itemAlreadyInCart = false;

  localCart.forEach((item) => {
    if (item.title === movieTitle) {
      itemAlreadyInCart = true;
      let quantity = Number(item.quantity);
      item.quantity = ++quantity;
    }
  });

  if (!itemAlreadyInCart) {
    localCart.push({ title: movieTitle, quantity: 1 });
  }
}

const exports = {
  createMovieCards,
  changePage,
  trimDate,
  createItemRows,
  updateLocalStorage,
  changeHandler,
  changeHandlerSignUp,
  resetInput,
  processResponse,
  calculateSubtotal,
  addItemToLocalCart,
  editCart,
  createOrderHistoryRow,
  createFavoritesRow,
};

export default exports;
//API Key f4b964a7e615c3824313f9121ff9270d
//Imge URL format https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg
//GET Top Movies https://api.themoviedb.org/3/movie/top_rated?api_key=f4b964a7e615c3824313f9121ff9270d&language=en-US&page=1
//GET More Top Movies https://api.themoviedb.org/3/movie/popular?api_key=f4b964a7e615c3824313f9121ff9270d&language=en-US&page=1
// GET TV SHOWS https://api.themoviedb.org/3/tv/popular?api_key=f4b964a7e615c3824313f9121ff9270d&language=en-US&page=1
