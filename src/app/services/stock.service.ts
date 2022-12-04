import { Injectable } from "@angular/core";

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quote } from "../interfaces/quote";
import { SymbolDetail } from "../interfaces/symbol-detail";

@Injectable({
    providedIn: 'root'
})
export class StockService{

    private token = 'bu4f8kn48v6uehqi3cqg';
    private GET_QUOTE = 'https://finnhub.io/api/v1/quote?symbol=:symbol&token='+ this.token;
    private GET_SYMBOL_DETAIL = ' https://finnhub.io/api/v1/search?q=:symbol&token='+ this.token;

    constructor(private http: HttpClient) {}

    getQuote(symbol: string): Observable<Quote> {
        this.GET_QUOTE = this.GET_QUOTE.replace(':symbol', symbol);
        return this.http.get<Quote>(this.GET_QUOTE);
    }

    getSymbolDetail(symbol: string): Observable<SymbolDetail>{
        this.GET_SYMBOL_DETAIL = this.GET_SYMBOL_DETAIL.replace(':symbol', symbol);
        return this.http.get<SymbolDetail>(this.GET_SYMBOL_DETAIL);
    }
}