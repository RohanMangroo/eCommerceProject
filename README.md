# Features
  - Search Movies
  - Search TV Shows
  - Log In/Log Out
  - 'Purchase' products
  - Add/Remove from favorites list
  - See order History
  - See releated items

# API
This project is consuming *The Movie Database* API
- Requesting a list of the most popular current movies. The returned data is an array of JSON objects with the following signature

``` javascript 
{
"page": 1,
"results": [
        {
        "adult": false,
        "backdrop_path": "/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg",
        "genre_ids": [28, 12, 878],
        "id": 634649,
        "original_language": "en",
        "original_title": "Spider-Man: No Way Home",
        "overview": "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
        "popularity": 4995.766,
        "poster_path": "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
        "release_date": "2021-12-15",
        "title": "Spider-Man: No Way Home",
        "video": false,
        "vote_average": 8.3,
        "vote_count": 9007
        },
      ]
}
```
