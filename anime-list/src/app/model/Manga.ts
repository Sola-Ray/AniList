class Manga extends Media {
  chapters: number;
  volumes: number;

  constructor(id: number, description: string, seasonYear: number, bannerImage: string, genres: string[],
              averageScore: number, isAdult: boolean, title: Title, coverImage: CoverImage, status: Status,
              format: Format, season: Season, source: Source, chapters: number, volumes: number) {
    super(id, description, seasonYear, bannerImage, genres, averageScore, isAdult, title, coverImage, status, format, season, source);
    this.chapters = chapters;
    this.volumes = volumes;
  }
}
