import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { CategoriesComponent } from "./categories.component";
import { DetailsComponent } from "./details.component";
import { HttpClientModule } from "@angular/common/http";
import { RecommendationsService } from "./recommendations.service";
const appRoutes: Routes = [
  {
    path: 'category/:categoryId/anime/:animeId',
    component: DetailsComponent
  },
  {
    path: '',
    component: CategoriesComponent,
  }
];

@NgModule({
  declarations: [AppComponent, DetailsComponent, CategoriesComponent],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    BrowserModule,
    HttpClientModule,
  ],
  providers: [RecommendationsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
