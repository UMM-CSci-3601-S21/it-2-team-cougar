import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ContextPack, Wordlist } from './contextpack';
import { map } from 'rxjs/operators';



@Injectable()
export class ContextPackService {
  readonly contextpackUrl: string = environment.apiUrl + 'contextpacks';

  constructor(private httpClient: HttpClient) {
  }

  getContextPacks(): Observable<ContextPack[]> {
    const httpParams: HttpParams = new HttpParams();
    return this.httpClient.get<ContextPack[]>(this.contextpackUrl, {
      params: httpParams,
    });
  }

  getContextPackById(id: string): Observable<ContextPack> {
    return this.httpClient.get<ContextPack>(this.contextpackUrl + '/' + id);
  }

  filterContextPacks(contextpacks: ContextPack[], filters: { name?: string }): ContextPack[] {

    let filteredContextPacks = contextpacks;

    // Filter by topic
    if (filters.name) {
      filters.name = filters.name.toLowerCase();

      filteredContextPacks = filteredContextPacks.filter(contextpack => contextpack.name.toLowerCase().indexOf(filters.name) !== -1);
    }

    return filteredContextPacks;
  }

  addContextPack(newPack: ContextPack): Observable<string> {
    // Send post request to add a new user with the user data as the body.
    return this.httpClient.post<{id: string}>(this.contextpackUrl, newPack).pipe(map(res => res.id));
  }

  editContextPackName(name: string, id: string): Observable<ContextPack> {
    return this.httpClient.put<ContextPack>(this.contextpackUrl + '/' + id, name).pipe(map(res => res));
  }

  editWordList(name: string, wordList: Wordlist, id: string): Observable<Wordlist> {
    return this.httpClient.put<Wordlist>(this.contextpackUrl + '/' + id, wordList).pipe(map(res => res));
  }

  getWordListByName(word: string, id: string): Observable<Wordlist> {
    return this.httpClient.get<Wordlist>(this.contextpackUrl + '/' + id + word);
  }

  addWordList(newWordList: Wordlist, id: string) {
    return this.httpClient.post<Wordlist>(this.contextpackUrl + '/' + id + '/' + 'addwordlist', newWordList).pipe(map(res => res));
  }


}


