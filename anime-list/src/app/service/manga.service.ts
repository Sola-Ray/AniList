import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';


const queries = {
  query : (page: number, perPage: number) => `query{Page(page:${page},perPage: ${perPage}){media(type: MANGA){id type title { romaji english native } description startDate { year month day } status format source coverImage { extraLarge large medium } bannerImage synonyms genres averageScore isAdult chapters volumes } } }`,
  queryDetail : (id: number) => `query{  Page(page:1,perPage:1){media(type: MANGA, id: ${id} ) { id type title {romaji english native } description status startDate { year month day } endDate { year month day } format source coverImage { extraLarge large medium} bannerImage synonyms genres averageScore isAdult chapters volumes meanScore favourites}}}`,
};

@Injectable({
  providedIn: 'root'
})
export class MangaService {

  constructor(private http: HttpClient) { }

  getMangas(page: number, perPage: number): Observable<any> {
    const body = JSON.stringify({ query : queries.query(page, perPage), variables: null});

    const header = {'Content-Type' : 'application/json', 'Accept' : 'application/json' };

    return this.http.post<any>(environment.aniListUri, body, {headers: header});
  }

  getManga(id: number): Observable<any> {
    const body = JSON.stringify({ query : queries.queryDetail(id), variables: null});
    const header = {'Content-Type' : 'application/json', 'Accept' : 'application/json' };
    return this.http.post<any>(environment.aniListUri, body, {headers: header});
  }
}
