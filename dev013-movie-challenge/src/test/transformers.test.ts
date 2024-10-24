import {
    formatGenresToMap,
    formatGenresToOptions,
    formatMovie,
  } from "../utils/transformers";
  import { expectedMovieEmpty, movieDataEmpty } from "./MockData";
  const genres = [
    { id: 28, name: "Action" },
    { id: 35, name: "Comedy" },
  ];
  const genresMap = new Map<number, string>([
    [28, "Action"],
    [35, "Comedy"],
  ]);
  const expectedOptions = [
    { value: "28", label: "Action" },
    { value: "35", label: "Comedy" },
  ];
  describe("Transformers", () => {
    test("Transforms object into a type Movie object", () => {
      const movie = {
        id: 1,
        title: 'The Killer',
        overview: 'Zee es una temida asesina a sueldo conocida como “la Reina de los Muertos”, pero cuando se niega a asesinar a una joven ciega, se encuentra perseguida tanto por sus colegas criminales como por un decidido detective de policía.',
        poster_path: '/killer.jpg',
        backdrop_path: '/killer2.jpg',
        release_date: '2024-08-22',
        genres: ['Acción', 'Suspense', 'Crimen'],
        popularity: 1496.634,
      };
      const expectedMovie = {
        id: 1,
        title: 'The Killer',
        overview: 'Zee es una temida asesina a sueldo conocida como “la Reina de los Muertos”, pero cuando se niega a asesinar a una joven ciega, se encuentra perseguida tanto por sus colegas criminales como por un decidido detective de policía.',
        poster_path: 'https://image.tmdb.org/t/p/w500/killer.jpg',
        backdrop_path: 'https://image.tmdb.org/t/p/w1280/killer2.jpg',
        release_year: 2024,
        genres: [],
        popularity: 1496.634,
      };
  
      expect(formatMovie(movie, genresMap)).toEqual(expectedMovie);
    });
  
    test("Handles empty string values correctly", () => {
      expect(formatMovie(movieDataEmpty, genresMap)).toEqual(expectedMovieEmpty);
    });
    test("Convert an array of genres into a map ", () => {
      expect(formatGenresToMap(genres)).toEqual(genresMap);
    });
    test("return an empty map if the array of genres is empty", () => {
      const genres: { id: number; name: string }[] = [];
      const expectedMap = new Map<number, string>();
      expect(formatGenresToMap(genres)).toEqual(expectedMap);
    });
    test("Convert an array of genres into an array of options", () => {
      const genresOption = [
        { id: 28, name: "Action" },
        { id: 35, name: "Comedy" },
      ];
      expect(formatGenresToOptions(genresOption)).toEqual(expectedOptions);
    });
  });