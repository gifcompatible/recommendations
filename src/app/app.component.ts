import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  category: any;
  categories = [];

  title = "ani recommends";
  categoriesURL = "https://kitsu.io/api/edge/categories?fields[categories]=title&page%5Blimit%5D=1000";

  constructor(private http: HttpClient) {}

  getCategory() {
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

  ngOnInit() {
    this.getCategory();
  }
}
