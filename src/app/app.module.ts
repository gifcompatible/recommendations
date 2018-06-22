import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { CategoryComponent } from "./category.component";
import { DetailsComponent } from "./details.component";
import { HttpClientModule } from "@angular/common/http";

const appRoutes: Routes = [
  {
    path: 'category/:id',
    component: CategoryComponent,
  },
  {
    path: 'anime/:id',
    component: DetailsComponent
  },
  {
    path '',
    component: AppComponent
  }
];

@NgModule({
  declarations: [AppComponent, CategoryComponent, DetailsComponent],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
