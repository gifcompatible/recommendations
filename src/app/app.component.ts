import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  recommendation: any;
  category: any;
  anime = [];
  categories = [];

  title = "ani recommends";
  categoriesURL = "https://kitsu.io/api/edge/categories?fields[categories]=title&page%5Blimit%5D=1000";
  animeDetailsURL = "https://kitsu.io/api/edge/anime?fields[anime]=canonicalTitle,posterImage,synopsis&page%5Blimit%5D=10&page%5Boffset%5D=13426";

  constructor(private http: HttpClient) {}

  getKitsu() {
    const categoriesRequest$ = this.http.get(this.categoriesURL);
    const detailsRequest$ = this.http.get(this.animeDetailsURL);

    categoriesRequest$.subscribe(someResult => {
      this.category = someResult;

      this.categories = this.category.data.map(category => {
        return {
          id: category.id,
          title: category.attributes.title
        };
      });
    });

    detailsRequest$.subscribe(someResult => {
      this.recommendation = someResult;

      this.anime = this.recommendation.data.map(recommendation => {
        return {
          poster: recommendation.attributes.posterImage,
          title: recommendation.attributes.canonicalTitle,
          synopsis: recommendation.attributes.synopsis
        };
      });
    });
  }

  ngOnInit() {
    this.getKitsu();
  }
}
