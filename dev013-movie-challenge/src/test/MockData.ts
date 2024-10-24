
import { Movie } from '../model/Movie';
import { MovieData } from '../utils/transformers';


export const mockMovies: Movie[] = [
    {
        id: 1,
        title: 'The Killer',
        overview: 'Zee es una temida asesina a sueldo conocida como “la Reina de los Muertos”, pero cuando se niega a asesinar a una joven ciega, se encuentra perseguida tanto por sus colegas criminales como por un decidido detective de policía.',
        poster_path: '/killer.jpg',
        backdrop_path: '/killer2.jpg',
        release_year: 2024,
        genres: ['Acción', 'Suspenso', 'Crimen'],
        popularity: 1496.634,
    },
    {
        id: 2,
        title: 'Interstellar',
        overview: 'Un grupo de exploradores hacen uso de un agujero de gusano recientemente descubierto para superar las limitaciones de los viajes espaciales tripulados y vencer las inmensas distancias que tiene un viaje interestelar.',
        poster_path: '/interstellar.jpg',
        backdrop_path: '/interstellar2.jpg',
        release_year: 2014,
        genres: ['Aventura', 'Drama', 'Ciencia ficción'],
        popularity: 217.639,
    },
];

export const movieDataEmpty: MovieData = {
    id: 0,
    title: '',
    overview: '',
    poster_path: '',
    backdrop_path: '',
    release_date: '',
    genre_ids: [],
    popularity: 0,

}

export const expectedMovieEmpty: Movie = {
    id: 0,
    title: "",
    poster_path: "https://image.tmdb.org/t/p/w500",
    backdrop_path: 'https://image.tmdb.org/t/p/w1280',
    release_year: NaN,
    overview: "",
    genres: [],
    popularity: 0,
}
export const mockMovieData = {

    id: 12345,
    original_title: "Sample Movie",
    title: "Sample Movie",
    genres: [
        { id: 28, name: "Acción" },
        { id: 35, name: "Comedia" },
    ],
    overview: "This is a sample movie overview.",
    popularity: 10.0,
    poster_path: "/path/to/poster.jpg",
    release_date: "2024-01-01",
};
export const responseMovieDetail = {
    "id": 12345,
    "title": "Sample Movie",
    "releaseYear": 2023,
    "posterPath": "https://image.tmdb.org/t/p/w500/path/to/poster.jpg",
    "genres": [
        "Acción",
        "Comedia"
    ],
    "overview": "This is a sample movie overview.",
    "voteAverage": 7.5,
    "voteCount": 100
}

