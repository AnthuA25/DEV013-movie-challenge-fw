import { Movie } from '../model/Movie';
import { apiKey } from "../modules/Api";
import { formatGenresToMap, formatMovie } from "../utils/transformers";


export interface Genre {
    id: number;
    name: string;
}
export interface Actor {
    id: number;
    name: string;
    profile_path: string | null;
}