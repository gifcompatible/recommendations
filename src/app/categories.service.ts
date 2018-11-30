import { Injectable } from '@angular/core';
import {  } from './categories.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators';
interface KitsuCategoryResponse {
  data: {
    id: any;
    attributes: {
      title: string;
    }
  }[];
}

export interface Category {
  id: any;
  title: any;
}

@Injectable()
export class CategoriesService {
  cache: KitsuCategoryResponse | null;
  categoriesURL = "https://kitsu.io/api/edge/categories?fields[categories]=title&page%5Blimit%5D=1000";

  constructor(private http: HttpClient) { }

  fetchFromKitsu(url: string): Observable<KitsuCategoryResponse> {
    const categoriesData = this.cache;
    if (categoriesData) {
      return of(categoriesData);
    } else {
      return this.http.get<KitsuCategoryResponse>(this.categoriesURL).pipe(
        tap(response => this.cache = response)
      );
    }
  }

  listCategories(): Observable<Category[]> {
    const categoriesRequest$ = this.fetchFromKitsu(this.categoriesURL);

    return categoriesRequest$.map(someResult => {
     return someResult.data.map(category => {
        return {
          id: category.id,
          title: category.attributes.title
        };
      });
    });
  }

}
