import {
  Component,
  OnInit,
  Input,
} from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import "rxjs/add/operator/map";
import { RecommendationsService } from "./recommendations.service";
import { AppComponent } from "./app.component";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit {
  @Input() categoryId: number;

  recommendation: any;

  title = "ani recommends";

  constructor(
    private route: ActivatedRoute,
    private recommendationsService: RecommendationsService,
    private app: AppComponent,
    ) {}

  ngOnInit() {
    this.recommendationsService.currentRecommendation.subscribe((recommendation) => {
      this.recommendation = recommendation;
    });
    this.route.paramMap.map((params: ParamMap) => {
        this.recommendationsService.loadRecommendations(params.get("categoryId")).subscribe();
      }
    )
    .subscribe();
  }

  previous() {
    this.recommendationsService.previousRecommendation();
  }

  next() {
    this.recommendationsService.nextRecommendation();
  }
}
