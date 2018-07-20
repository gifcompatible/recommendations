import { Component, OnInit, Input } from "@angular/core";
import { AppComponent } from "./app.component";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router, ParamMap } from "../../node_modules/@angular/router";
import { switchMap } from "../../node_modules/rxjs/operators";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"]
})
export class CategoryComponent implements OnInit {
  @Input() categoryId: number;

  category: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    app: AppComponent
  ) {}

  getCategory(categoryId) {
    const categoryUrl = `https://kitsu.io/api/edge/categories/${categoryId}`;
    const categoryRequest$ = this.http.get(categoryUrl);

    return categoryRequest$.map(someResult => {
      this.category = someResult;

      this.category.data.map(category => {
        return { id: category.id };
      });
    });
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(switchMap((params: ParamMap) => this.getCategory(params.get("categoryId"))))
      .subscribe();
  }
}
