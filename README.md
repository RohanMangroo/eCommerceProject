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

### API Segments
    URL Example: `https://api.themoviedb.org/3/<requestType>?api_key=<KEY>&language=en-US&page=1`
    Base: `https://api.themoviedb.org/3/`
    requestType: `/movie/{movie_id}`, `/movie/popular`, `/movie/{movie_id}/similar`, `/tv/popular`
    KEY: A key needed to make the request

# Cart
### Logged In User

The logged in user's cart is stored in Redis as a HASH(essentially an object/hashTable) and retrived when the user logs back in. Every user has a *key-shape* that identifys the HASH and is unique, *key-shape* is *username:userID*. 

When a user signs up nothing is logged into Redis, only after they have chosen to add an item to their cart is their Redis HASH created.

Redis allows for commands to add items, remove items, increment items and get all items in a Cart(HASH).

We process a CHECKOUT by grabbing all the items from a users Redis Cart and adding them to our ORDERS table in the database. 

In Javascript terms, the Redis cart has this shape...
``` javascript
   const 'username:userID' = {'The Godfather/19.99' : 2}

```


- Notable Redis Command: HGETALL
  - Gets all the keys in a Redis HASH
  - Signature: `HGETALL(key)`
  ``` javascript
  async function getCart(key) {
    const cart = client.HGETALL(key);
    return cart;
  }  
  ```
  
- Notable Redis Command: HSET
  - Sets field in the hash stored at key to value. If key does not exist, a new key holding a hash is created. If field already exists in the       hash, it is overwritten.
  - Signature: `HSET(key, item, quantity)`
  ``` javascript
  async function setItem(key, item, quantity) {
    client.HSET(key, item, quantity);
  }
  ```

- Notable Redis Command: HINCRBY
  - Increments the number stored at field in the hash stored at key by increment. The cart uses this to increment the quantity of an item. 
  - Signature: `HINCRBY(key, item, increment)`
  ``` javascript
  async function incrementBy(key, item, increment) {
     client.HINCRBY(key, item, increment);
    }
  ```
  
- Notable Redis Command: HDEL
  - Allows for deletion of item in HASH
  - Signature: `HDEL(key, item)`
  ``` javascript
  async function deleteItem(key, item) {
   client.HDEL(key, item);
  } 
```
