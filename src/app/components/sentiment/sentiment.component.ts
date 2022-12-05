import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.scss'],
})
export class SentimentComponent implements OnInit {
  symbol!: string | null;

  constructor(private route: ActivatedRoute, private router: Router) {} //private villagersService: VillagersService,

  ngOnInit(): void {
    this.symbol = this.route.snapshot.paramMap.get('symbol');
    if (this.symbol != null) {
    }
  }
}
