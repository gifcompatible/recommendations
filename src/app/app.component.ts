import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  recommendation: any;
  anime = [];

  title = "recommendations";
  url = "https://kitsu.io/api/edge/anime?fields[anime]=canonicalTitle,posterImage,synopsis&page%5Blimit%5D=10&page%5Boffset%5D=13426";

  constructor(private http: HttpClient) {}

  getKitsu() {
    const request$ = this.http.get(this.url);

    request$.subscribe(someResult => {
      console.log(someResult);
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
