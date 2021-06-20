import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';


const queries = {
  query : (page: number, perPage: number) => `query{Page(page:${page},perPage: ${perPage}){media(type: MANGA){id type title { romaji english native } description startDate { year month day } status format source coverImage { extraLarge large medium } bannerImage synonyms genres averageScore isAdult chapters volumes } } }`,
  queryDetail : (id: number) => `query{  Page(page:1,perPage:1){media(type: MANGA, id: ${id} ) { id type title {romaji english native } description status startDate { year month day } endDate { year month day } format source coverImage { extraLarge large medium} bannerImage synonyms genres averageScore isAdult chapters volumes meanScore favourites}}}`,
// eslint-disable-next-line max-len
  queryGenreYear : (page: number, perPage: number, genre: string, year: number) => `query{Page(page:${page},perPage: ${perPage}){media(type: MANGA, genre:"${genre}", startDate:${year}00, isAdult:${false}){id type title { romaji english native } description startDate { year month day } status format source coverImage { extraLarge large medium } bannerImage synonyms genres averageScore isAdult chapters volumes } } }`

};

@Injectable({
  providedIn: 'root'
})
export class MangaService {

  constructor(private http: HttpClient) { }

  getMangas(page: number, perPage: number): Observable<any> {
    const body = JSON.stringify({ query : queries.query(page, perPage), variables: null});
    console.log(body);

    const header = {'Content-Type' : 'application/json', 'Accept' : 'application/json' };

    return this.http.post<any>(environment.aniListUri, body, {headers: header});
  }

  getManga(id: number): Observable<any> {
    const body = JSON.stringify({ query : queries.queryDetail(id), variables: null});
    console.log(body);
    const header = {'Content-Type' : 'application/json', 'Accept' : 'application/json' };
    return this.http.post<any>(environment.aniListUri, body, {headers: header});
  }

  getMangasByGenreYear(page: number, perPage: number, genre: string, year: number): Observable<any> {
    console.log(page);
    const body = JSON.stringify({query: queries.queryGenreYear(page, perPage, genre, year), variables: null});
    console.log(body);

    return this.http.post<any>(environment.aniListUri, body, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }
}
