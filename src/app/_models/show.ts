import { ImagesShow } from './imagesShow';
import { Seasons } from './season';
import { DemoVisual } from './demoVisual';

export class Show {
    id: number;
    title: string;
    status: string;
    seasons: string;
    original_title: string;
    imdb_id: string;
    network: string;
    creation: string;
    description: string;
    episodes: string;
    images: ImagesShow;
    seasons_details: Seasons[];
    VisualDemos: DemoVisual[];
}
