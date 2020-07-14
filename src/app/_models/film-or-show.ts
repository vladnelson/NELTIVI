import { DemoVisual } from './demoVisual';
import { ImagesShow } from './imagesShow';
import { Seasons } from './season';
import { Creator } from './creator';
import { Platform } from './platform';
import { Genre } from './genre';

export class FilmOrShow {
    id: number;
    title: string;
    name: string;
    overview: string;
    imdb_id: string;
    original_title: string;
    VisualDemos: DemoVisual[];
    TYPE_VISUEL: number;

    created_by: Creator[];
    origin_country: string[];

    status: string;
    seasons: string;
    networks: Platform[];
    network: string;
    creation: string;
    description: string;
    episodes: string;
    images: ImagesShow;
    seasons_details: Seasons[];

    synopsis: string;
    genres: Genre[];
    poster: string;
    poster_path: string;
    backdrop: string;
    backdrop_path: string;
    production_year: string;

    platforms : Platform;
    haveFollow: boolean;
}
