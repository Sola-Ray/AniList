class Media {
  id: number;
  description: string;
  seasonYear: number;
  bannerImage: string;
  genres: string[] = [];
  averageScore: number;
  isAdult: boolean;

  constructor(id: number, description: string, seasonYear: number, bannerImage: string, genres: string[],
              averageScore: number, isAdult: boolean) {
    this.id = id;
    this.description = description;
    this.seasonYear = seasonYear;
    this.bannerImage = bannerImage;
    this.genres = genres;
    this.averageScore = averageScore;
    this.isAdult = isAdult;
  }
}
