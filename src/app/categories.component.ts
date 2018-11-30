import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { CategoriesService, Category } from "./categories.service";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"]
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  constructor(private router: Router, private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.categoriesService.listCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  goToRecommendation(categoryId) {
    this.router.navigateByUrl(`/category/${categoryId}/anime/`);
  }
}
