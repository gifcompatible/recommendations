import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppComponent } from "./app.component";

@Component({
  selector: "app-root",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.css"]
})
export class DetailsComponent implements OnInit {
  recommendation: any;
  anime = [];

  title = "ani recommends";

  // TODO: I think the below url should point to the first anime for the chosen category
  // ...so somehow it needs to link up with categories.
  //  Or maybe that should happen in the template???
  animeDetailsURL = "https://kitsu.io/api/edge/categories/10/anime?fields[anime]=canonicalTitle,posterImage,synopsis&page%5Blimit%5D=1";

  constructor(private http: HttpClient, app: AppComponent) {}

  getAnime() {
    const detailsRequest$ = this.http.get(this.animeDetailsURL);

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

  ngOnInit() {
    this.getAnime();
  }
}
