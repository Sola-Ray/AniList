class Media {
  id: number;
  description: string;
  seasonYear: number;
  bannerImage: string;
  genres: string[] = [];
  averageScore: number;
  isAdult: boolean;
  title: Title;
  coverImage: CoverImage;
  status: Status;
  format: Format;
  season: Season;
  source: Source;

  constructor(id: number, description: string, seasonYear: number, bannerImage: string, genres: string[],
              averageScore: number, isAdult: boolean, title: Title, coverImage: CoverImage, status: Status,
              format: Format, season: Season, source: Source) {
    this.id = id;
    this.description = description;
    this.seasonYear = seasonYear;
    this.bannerImage = bannerImage;
    this.genres = genres;
    this.averageScore = averageScore;
    this.isAdult = isAdult;
    this.title = title;
    this.coverImage = coverImage;
    this.status = status;
    this.format = format;
    this.season = season;
    this.source = source;
  }
}
