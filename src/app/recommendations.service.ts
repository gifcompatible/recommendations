import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecommendationsService {
  currentRecommendation = new Subject();
  currentRecommendationIndex = 0;
  anime = [];

  @Input() categoryId: number;

  constructor(private http: HttpClient) { }

  loadRecommendations(categoryId) {
    // tslint:disable-next-line:max-line-length
    const animeDetailsUrl = `https://kitsu.io/api/edge/categories/${categoryId}/anime?fields[anime]=canonicalTitle,posterImage,synopsis&page%5Blimit%5D`;
    const detailsRequest$ = this.http.get<any>(animeDetailsUrl);

    return detailsRequest$.map(someResult => {
      this.anime = someResult.data.map(recommendation => {
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

