import { Component } from "@angular/core";

interface Anime {
  id: number;
  attributes: {
    posterImage: string;
    canonicalTitle: string;
    synopsis: string;
  };
}

interface Response {
  data: Anime[];
}
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {}
