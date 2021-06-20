import {Media} from './Media';
import {Title} from './Title';
import {CoverImage} from './CoverImage';
import {Status} from './Status';
import {Source} from './Source';
import {Format} from './Format';

export class Manga extends Media {
  chapters: number;
  volumes: number;
  startDate: object;
  endDate: object;


  constructor(id: number, description: string, bannerImage: string, genres: string[], averageScore: number, isAdult: boolean,
              title: Title, coverImage: CoverImage, status: Status, format: Format, source: Source, meanScore: number,
              favourites: number, isFavorite: boolean, chapters: number, volumes: number, startDate: object, endDate: object) {
    super(id, description, bannerImage, genres, averageScore, isAdult, title, coverImage, status, format, source, meanScore, favourites, isFavorite);
    this.chapters = chapters;
    this.volumes = volumes;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
