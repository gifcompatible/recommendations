import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"]
})
export class CategoriesComponent implements OnInit {
  categories = [];
  category: any;

  categoriesURL = "https://kitsu.io/api/edge/categories?fields[categories]=title&page%5Blimit%5D=1000";

  constructor(private http: HttpClient, private router: Router) {}

  listCategories() {
    const categoriesRequest$ = this.http.get(this.categoriesURL);

    categoriesRequest$.subscribe(someResult => {
      this.category = someResult;

      this.categories = this.category.data.map(category => {
        return {
          id: category.id,
          title: category.attributes.title
        };
      });
    });
  }

  getFirstRecommendationId(categoryId) {
    // tslint:disable-next-line:max-line-length
    const animeDetailsUrl = `https://kitsu.io/api/edge/categories/${categoryId}/anime?fields[anime]=canonicalTitle,posterImage,synopsis&page%5Blimit%5D=1`;
    const detailsRequest$ = this.http.get<any>(animeDetailsUrl);

    return detailsRequest$.map(someResult => {
      return someResult.data.map(recommendation => recommendation.id)[0];
    });
  }

  goToRecommendation(categoryId) {
    this.getFirstRecommendationId(categoryId).subscribe(animeId =>
      this.router.navigateByUrl(`/category/${categoryId}/anime/${animeId}`)
    );
  }

  ngOnInit() {
    this.listCategories();
  }
}
