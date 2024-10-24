import { render, screen, waitFor,fireEvent } from "@testing-library/react";
import Home from "../Home.tsx";
import { getMovie } from "../service/APIService";
import { MemoryRouter,useSearchParams } from "react-router-dom";
import { getMovieGenres } from "../service/movieService";
import { formatGenresToMap } from "../utils/transformers";

jest.mock("../service/APIService");
jest.mock("../service/movieService");
jest.mock("../utils/transformers");

describe("Home Component", () => {
  test("carga inicial de películas", async () => {
    // Mockear la respuesta de getMovie
    (getMovie as jest.Mock).mockResolvedValue({
      metaData: { pagination: { currentPage: 1, totalPages: 5 } },
      movies: [
        {
          id: 1,
          title: "Inception",
          posterPath: "/path/to/poster.jpg",
          genres: ["Accion"],
          releaseYear: 2021,
        },
      ],
    });

    // Renderizar el componente Home
    render(<Home />, { wrapper: MemoryRouter });

    // Verificar que las películas se muestran después de que se resuelve el fetch
    await waitFor(() => {
      expect(screen.getByText("Inception")).toBeInTheDocument();
    });
  });

  test("carga de géneros", async () => {
    const mockGenres = [{ id: 28, name: "Acción" }];

    // Mockear la respuesta de getMovieGenres
    (getMovieGenres as jest.Mock).mockResolvedValue(mockGenres);

    // Mockear formatGenresToMap
    const mockGenreMap = new Map([[28, "Acción"]]);
    (formatGenresToMap as jest.Mock).mockReturnValue(mockGenreMap);

    render(<Home />, { wrapper: MemoryRouter });

    await waitFor(() => {
      expect(formatGenresToMap).toHaveBeenCalledWith(mockGenres);
    });
  });

  test("actualización de parámetros URL", () => {
    const setSearchParams = jest.fn();
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams(), setSearchParams]);

    // Renderizar el componente Home
    render(<Home />, { wrapper: MemoryRouter });

    // Simular el cambio de filtros
    const genreFilterButton = screen.getByText("Accion"); // Cambia esto para que coincida con tu UI
    fireEvent.click(genreFilterButton);

    // Verificar que setSearchParams fue llamado correctamente
    expect(setSearchParams).toHaveBeenCalledWith(new URLSearchParams({ genre: "28", sort: "popularity.desc", page: "1" }));
  });
});
