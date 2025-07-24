import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private apiUrl = 'http://localhost:5075/items';
  private httpClient = inject(HttpClient);

  getItems(page: number,  pageSize: number): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`);
  }

}
