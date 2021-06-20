import {Title} from './Title';
import {CoverImage} from './CoverImage';
import {Status} from './Status';
import {Source} from './Source';
import {Format} from './Format';

export class Media {
  id: number;
  description: string;
  bannerImage: string;
  genres: string[] = [];
  averageScore: number;
  meanScore: number;
  favourites: number
  isAdult: boolean;
  title: Title;
  coverImage: CoverImage;
  status: Status;
  format: Format;
  source: Source;
  isFavorite: boolean;

  constructor(id: number, description: string, bannerImage: string, genres: string[],
              averageScore: number, isAdult: boolean, title: Title, coverImage: CoverImage, status: Status,
              format: Format, source: Source, meanScore: number, favourites: number, isFavorite: boolean) {
    this.id = id;
    this.description = description;
    this.bannerImage = bannerImage;
    this.genres = genres;
    this.averageScore = averageScore;
    this.isAdult = isAdult;
    this.title = title;
    this.coverImage = coverImage;
    this.status = status;
    this.format = format;
    this.source = source;
    this.meanScore = meanScore;
    this.favourites = favourites;
    this.isFavorite = isFavorite;
  }
}
