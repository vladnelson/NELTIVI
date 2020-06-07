import { DemoVisual } from './demoVisual';
import { ImagesShow } from './imagesShow';
import { Seasons } from './season';

export class FilmOrShow {
    id: number;
    title: string;
    imdb_id: string;
    original_title: string;
    VisualDemos: DemoVisual[];
    TYPE_VISUEL: number;

    status: string;
    seasons: string;
    network: string;
    creation: string;
    description: string;
    episodes: string;
    images: ImagesShow;
    seasons_details: Seasons[];

    synopsis: string;
    genres: Array<string>;
    poster: string;
    poster_path: string;
    backdrop: string;
    production_year: string;
}
