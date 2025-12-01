const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMjA3YmNjMWFhMmM1NjNhZTI0YzIwZjMwMDE0NjhlYiIsIm5iZiI6MTc2MzU1MDAyMC41NzEsInN1YiI6IjY5MWRhMzQ0ZjFmYjM3NmIxZDJlMTllZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qk4mFId7DtIDrHa26ABAPkU7Vk5Rfs6Aml_76DhYpxE'
  }
};

fetch('https://api.themoviedb.org/3/movie/438631/credits', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));


fetch('https://api.themoviedb.org/3/person/1190668?language=en-US', options) //Biographie Timothee Chalamet
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));