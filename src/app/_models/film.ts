import { DemoVisual } from './demoVisual';
import { FilmOrShow } from './film-or-show';

export class Film {

    id: number;
    title: string;
    imdb_id: string;
    original_title: string;
    VisualDemos: DemoVisual[];
    TYPE_VISUEL: number;

    synopsis: string;
    genres: Array<string>;
    poster: string;
    backdrop: string;
    production_year: string;
}
