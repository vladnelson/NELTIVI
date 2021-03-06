import { ImagesShow } from './imagesShow';
import { Seasons } from './season';
import { DemoVisual } from './demoVisual';
import { FilmOrShow } from './film-or-show';

export class Show {
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
}
