import {Media} from './Media';
import {Season} from './Season';
import {Format} from './Format';
import {Source} from './Source';
import {Title} from './Title';
import {CoverImage} from './CoverImage';
import {Status} from './Status';

export class Anime extends Media {
  episodes: number;
  duration: number;
  season: Season;
  seasonYear: number;

  constructor(id: number, description: string, seasonYear: number, bannerImage: string, genres: string[],
              averageScore: number, isAdult: boolean, title: Title, coverImage: CoverImage, status: Status,
              format: Format, season: Season, source: Source, episodes: number, duration: number, meanScore: number, favourites: number) {
    super(id, description, bannerImage, genres, averageScore, isAdult, title, coverImage, status, format, source, meanScore, favourites);
    this.episodes = episodes;
    this.duration = duration;
    this.season = season;
    this.seasonYear = seasonYear;
  }
}
