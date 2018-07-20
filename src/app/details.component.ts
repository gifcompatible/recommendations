import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap, map } from "rxjs/operators";
import "rxjs/add/operator/map";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.css"]
})
export class DetailsComponent implements OnInit {
  @Input() categoryId: number;

  recommendation: any;
  anime = [];

  title = "ani recommends";

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    app: AppComponent
  ) {}

  getRecommendation(categoryId) {
    // tslint:disable-next-line:max-line-length
    const animeDetailsUrl = `https://kitsu.io/api/edge/categories/${categoryId}/anime?fields[anime]=canonicalTitle,posterImage,synopsis&page%5Blimit%5D=1`;
    const detailsRequest$ = this.http.get(animeDetailsUrl);

    return detailsRequest$.map(someResult => {
      this.recommendation = someResult;

      this.recommendation.data.map(recommendation => {
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
  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.getRecommendation(params.get("id"))
        )
      )
      .subscribe();
  }
}
