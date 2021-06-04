class Anime extends Media {
  episodes: number;
  duration: number;

  constructor(id: number, description: string, seasonYear: number, bannerImage: string, genres: string[],
              averageScore: number, isAdult: boolean, title: Title, coverImage: CoverImage, status: Status,
              format: Format, season: Season, source: Source, episodes: number, duration: number) {
    super(id, description, seasonYear, bannerImage, genres, averageScore, isAdult, title, coverImage, status, format, season, source);
    this.episodes = episodes;
    this.duration = duration;
  }
}