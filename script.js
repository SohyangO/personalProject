const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmI2ZGJkM2YxNTIwYzU0Mzk4OGMxZWQ3ZTIwNTUyZCIsInN1YiI6IjY1OTYxYjkxNTkwN2RlNjYyNTYzYzAwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p8IC4h9MKHXEqeoBrSxdS0xHXBWkwoCiNYdn9Xf1HZ4'
    }
};
fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => {
        function displayMovies(movies) { // 기본 로딩 화면
            response.results.forEach((movie) => {
                const movieDiv = document.getElementById("movie");
                movieDiv.innerHTML += `
                <div class="movieCard" movieId="${movie.id}">
                <h2>${movie.title}</h2>
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="">
                <p>${movie.overview}</p>
                <p>Ratings ${movie.vote_average}/10</p>
        </div>`})
            /*-------------카드 클릭 시 alert창 띄우기-----------------*/
            document.querySelectorAll(".movieCard").addEventListener('click', clickBox);
            function clickBox(event) {
                alert(`Movie ID: ${event.currentTarget.getAttribute('movieId')}`);
            }
        }
        displayMovies(response.results);

        console.log(response.results);



        /*-----검색 시 이벤트 발생-----*/

        document.getElementById("btn").addEventListener("click", surf); //검색 버튼 클릭 시, 데이터 찾기 실행
        function surf() { //실행할 함수
            fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
                .then(response => response.json())
                .then(response => {
                    const searchMovie = response.results.map(movie => ({ //불러올 데이터들
                        id: movie.id,
                        title: movie.title,
                        overview: movie.overview,
                        poster_path: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                        voteRate: movie.vote_average,
                    }));

                    const surfTerm = document.getElementById("surf-input").value.trim().toUpperCase(); //검색창 입력값 받아옴
                    const movieDiv2 = document.getElementById("movie"); //받아온 데이터 출력할 div
                    const filtered = response.results.filter(movie =>
                        movie.title.toUpperCase().includes(surfTerm)); //필터기능
                    movieDiv2.innerHTML = "";

                    filtered.forEach(movie => {
                        movieDiv2.innerHTML += `
                            <div class="movieCard" movieId="${movie.id}">
                             <h2>${movie.title}</h2>
                             <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="">
                             <p>${movie.overview}</p>
                             <p>Ratings ${movie.vote_average}/10</p>
                             </div>`
                    })

                    if (!surfTerm) { //input창에 아무것도 없는 경우, 경고창 띄우기
                        alert("Please enter a movie title.");
                        document.getElementById("surf-input").focus();
                        return false;
                    }
                });
        }

        //  function enterkey() {
        //     if (e.key == "Enter" || e.keyCode == 13){
        //         surf();
        //     }          
        // }
    })
    .catch(err => console.error(err));