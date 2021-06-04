import {Media} from './Media';
import {Title} from './Title';
import {CoverImage} from './CoverImage';
import {Status} from './Status';
import {Source} from './Source';
import {Season} from './Season';
import {Format} from './Format';

export class Manga extends Media {
  chapters: number;
  volumes: number;
  startDate: object;
  endDate: object;

  constructor(id: number, description: string, seasonYear: number, bannerImage: string, genres: string[],
              averageScore: number, isAdult: boolean, title: Title, coverImage: CoverImage, status: Status,
              format: Format, season: Season, source: Source, chapters: number, volumes: number,
              startDate: object, endDate: object, meanScore: number, favourites: number) {
    super(id, description, bannerImage, genres, averageScore, isAdult, title, coverImage, status, format, source, meanScore, favourites);
    this.chapters = chapters;
    this.volumes = volumes;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
