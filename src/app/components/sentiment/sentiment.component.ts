import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quote } from '../../interfaces/quote';
import { Sentiment } from '../../interfaces/sentiment';
import { SymbolData } from '../../interfaces/symbol';
import { StockService } from '../../services/stock.service';
import moment from 'moment';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.scss'],
})
export class SentimentComponent implements OnInit {
  math = Math;
  title!: string;
  isLoading: boolean = false;
  symbol!: string | null;
  quote: Quote = {
    c: 0,
    d: 0,
    dp: 0,
    h: 0,
    l: 0,
    o: 0,
    pc: 0,
    description: '',
    displaySymbol: '',
    symbol: '',
    type: '',
  };
  symbolData: SymbolData | undefined;
  sentimentList: Sentiment[] = [];
  currentDate: Date = new Date();
  date_format: string = 'YYYY-MM-DD';

  constructor(
    public stockService: StockService,
    private route: ActivatedRoute
  ) {
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.symbol = this.route.snapshot.paramMap.get('symbol');
    debugger;
    if (this.symbol != null) {
      this.stockService.getSymbolDetail(this.symbol).subscribe((quote) => {
        this.symbolData = quote.result.find(
          (symbolData) => symbolData.displaySymbol == this.symbol
        );

        if (this.symbolData) {
          this.quote.description = this.symbolData!.description;
          this.quote.displaySymbol = this.symbolData!.displaySymbol;
          this.quote.symbol = this.symbolData!.symbol;
          this.quote.type = this.symbolData!.type;
          this.title =
            this.quote.description + ' - (' + this.quote.symbol + ')';

          this.stockService
            .getSentiment(
              this.quote.symbol,
              this.getFromDate(),
              moment().format(this.date_format)
            )
            .subscribe((sentiments) => {
              let index = 0;
              let maxIndex = 3;
              if (sentiments.data.length > 3) {
                index = 1;
                maxIndex = 4;
              }
              for (index; index < maxIndex; index++) {
                const sentiment = sentiments.data[index];
                sentiment.monthName = moment(sentiment.month, 'M').format(
                  'MMMM'
                );
                this.sentimentList.push(sentiment);
              }
            });
        }
      });
    }
  }

  getFromDate(): string {
    return moment().subtract(4, 'months').format(this.date_format);
  }
}
