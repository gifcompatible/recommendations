import { Component, OnInit, OnChanges, Input, SimpleChanges } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppComponent } from "./app.component";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.css"]
})
export class DetailsComponent implements OnChanges {
  @Input() category: any;

  recommendation: any;
  anime = [];

  title = "ani recommends";

  constructor(private http: HttpClient, app: AppComponent) {}

  getRecommendation(categoryId) {
    const animeDetailsURL = `https://kitsu.io/api/edge/categories/${categoryId}/anime?fields[anime]=canonicalTitle,posterImage,synopsis&page%5Blimit%5D=1`;
    const detailsRequest$ = this.http.get(animeDetailsURL);

    detailsRequest$.subscribe(someResult => {
      this.recommendation = someResult;

      this.anime = this.recommendation.data.map(recommendation => {
        return {
          id: recommendation.id,
          poster: recommendation.attributes.posterImage,
          title: recommendation.attributes.canonicalTitle,
          synopsis: recommendation.attributes.synopsis
        };
      });
    });
  }

  // we only have one input (the category) and when it changes we need to re-fetch
  // the anime
  ngOnChanges() {
    this.getRecommendation(this.category.id);
  }
}
