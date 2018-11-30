import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators/tap';

@Injectable()
export class RecommendationsService {
  currentRecommendation = new Subject();
  currentRecommendationIndex = 0;
  anime = [];
  cache = {};
  @Input() categoryId: number;

  constructor(private http: HttpClient) { }

  fetchRecommendation(categoryId): Observable<any> {
    const detailsResponse = this.cache[categoryId];
    if (detailsResponse) {
      return of(detailsResponse);
    } else {
      // tslint:disable-next-line:max-line-length
     const animeDetailsUrl = `https://kitsu.io/api/edge/categories/${categoryId}/anime?fields[anime]=canonicalTitle,posterImage,synopsis&page%5Blimit%5D`;
     return this.http.get<any>(animeDetailsUrl).pipe(
       tap(response => this.cache[categoryId] = response)
     );
    }
  }

  loadRecommendations(categoryId) {
    return this.fetchRecommendation(categoryId).map(result => {
      this.anime = result.data.map(recommendation => {
        return {
          id: recommendation.id,
          poster: recommendation.attributes.posterImage,
          title: recommendation.attributes.canonicalTitle,
          synopsis: recommendation.attributes.synopsis
        };
      });

      this.getCurrentRecommendation();
    });
  }

  nextRecommendation() {
    if (this.anime.length === 0) { return; }

    if (this.currentRecommendationIndex + 1 === this.anime.length ) {
      this.currentRecommendationIndex = 0;
    } else {
      this.currentRecommendationIndex++;
    }

    this.getCurrentRecommendation();
  }

  previousRecommendation() {
    if (this.anime.length === 0) {return;}

    if (this.currentRecommendationIndex - 1 === -1) {
      this.currentRecommendationIndex = this.anime.length - 1;
    } else {
      this.currentRecommendationIndex--;
    }

    this.getCurrentRecommendation();
  }

  getCurrentRecommendation() {
    return this.currentRecommendation.next(this.anime[this.currentRecommendationIndex]);
  }
}

