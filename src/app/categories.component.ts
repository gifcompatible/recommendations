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

  ngOnInit() {
    this.listCategories();
  }

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

  goToRecommendation(categoryId) {
    this.router.navigateByUrl(`/category/${categoryId}/anime/`);
  }
}
