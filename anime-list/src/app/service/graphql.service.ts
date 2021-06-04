import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

const queries = {
  // eslint-disable-next-line max-len
  query : (page: number, perPage: number) => `query{Page(page:${page},perPage: ${perPage}){media(type: MANGA){id type title { romaji english native } description season seasonYear status format source coverImage { extraLarge large medium } bannerImage synonyms genres averageScore isAdult chapters volumes episodes duration } } }`,
};

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(private http: HttpClient) { }

  getMedias(page: number, perPage: number): Observable<any> {

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');


    const body = JSON.stringify({ query : queries.query(page, perPage), variables: null});
    console.log(body);

    return this.http.post<JSON>(environment.aniListUri, body, {headers});
  }
}
