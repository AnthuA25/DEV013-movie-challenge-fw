import { getMovie } from "../service/APIService";

const Filters = {
    page: 1,
    genreId: 28,
    sortBy: "popularity.desc"
}

const genresMap = new Map<number, string>([
    [28, "Accion"],
    [35, "Comedia"],
]);

jest.mock("../modules/Api", () => ({
    apiKey: process.env.VITE_API_KEY,
}));

describe("getMovies", () => {
    beforeEach(() => {
        (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
                ok: true,
                json: async() =>
                    Promise.resolve({
                        page: 1,
                        total_pages: 10,
                        results: [
                            {
                                id: 0,
                                title: "Deadpool",
                                poster_path: "/path/to/deadpool.jpg",
                                release_date: "2024",
                                overview: "this is a example",
                                genre_ids: [28, 35],
                                popularity: 1456.67
                            }
                        ],

                    })
        })
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should fetch and return movies', async () => {
        const movies = await getMovie(Filters, genresMap);
        expect(movies).toEqual({
            metaData: {
                pagination: {
                    currentPage: 1,
                    totalPages: 10,
                },
            },
            movies: [
                {
                  id: 0,
                  title: "Deadpool",
                  poster_path: "https://image.tmdb.org/t/p/w500/path/to/deadpool.jpg",
                  release_year: 2023,
                  backdrop_path: "https://image.tmdb.org/t/p/w1280undefined",
                  overview: "this is a example",
                  genres: ["Accion","Comedia"],
                  popularity: 1456.67
                },
              ],
        })
    });
    test("should handle API errors", async () => {
        // Configura el mock para simular un error de red
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
          Promise.resolve({
            ok: false,
            status: 500,
            json: async () => Promise.resolve({}),
          })
        );
    
        await expect(getMovie(Filters, genresMap)).rejects.toThrow(
          "HTTP error! status: 500"
        );
      });
})
