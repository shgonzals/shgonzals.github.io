import { Injectable } from "@angular/core";

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quote } from "../interfaces/quote";
import { SymbolDetail } from "../interfaces/symbol-detail";
import { Sentiment } from "../interfaces/sentiment";
import { SentimentList } from "../interfaces/sentiment-list";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class StockService{

    private token = '&token=bu4f8kn48v6uehqi3cqg';

    constructor(private http: HttpClient, private router: Router) {}

    getQuote(symbol: string): Observable<Quote> {
        return this.http.get<Quote>('https://finnhub.io/api/v1/quote?symbol=' + symbol + this.token);
    }

    getSymbolDetail(symbol: string): Observable<SymbolDetail>{
        return this.http.get<SymbolDetail>('https://finnhub.io/api/v1/search?q=' + symbol + this.token);
    }

    getSentiment(symbol: string, from: string, to: string){
        return this.http.get<SentimentList>('https://finnhub.io/api/v1/stock/insider-sentiment?symbol=' + symbol + '&from=' + from + '&to=' + to + this.token);
    }

}