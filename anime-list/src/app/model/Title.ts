class Anime extends Media {
  episodes: number;
  duration: number;

  constructor(id: number, description: string, seasonYear: number, bannerImage: string, genres: string[],
              averageScore: number, isAdult: boolean, episodes: number, duration: number) {
    super(id, description, seasonYear, bannerImage, genres, averageScore, isAdult);
    this.episodes = episodes;
    this.duration = duration;
  }
}
