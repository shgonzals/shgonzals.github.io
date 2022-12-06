import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Quote } from '../../interfaces/quote';
import { SymbolData } from '../../interfaces/symbol';
import { LocalStorageService } from '../../services/local-storage.service';
import { StockService } from '../../services/stock.service';
import { DOCUMENT } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit, OnDestroy {
  saveInProgress: boolean = false;
  stockInput!: string;
  quotes: Quote[] = [];
  symbolData!: SymbolData;
  private document: Document;

  constructor(
    public stockService: StockService,
    public localStorageService: LocalStorageService,
    @Inject(DOCUMENT) document: Document,
    private snackBar: MatSnackBar
  ) {
    this.document = document;
  }
  ngOnDestroy(): void {}

  subQuote!: Subscription;
  subSymbol!: Subscription;

  ngOnInit(): void {
    this.reloadData();
  }

  onClick(stockInput: string): any {
    if (this.localStorageService.keyExists(stockInput)) {
      //Si existe la key, mostramos mensaje de error
      this.openSnackBar('The input symbol ' + stockInput + ' is already on the list');
      console.log('La key: ' + stockInput + ' ya se ha consultado');
    } else {
      this.loading(true);
      this.subQuote = this.stockService.getQuote(stockInput).subscribe({
        next: (quote) => {
          this.subSymbol = this.stockService
            .getSymbolDetail(stockInput)
            .subscribe({
              next: (symbols) => {
                this.stockInput;
                var list = symbols.result;
                if(list.length > 0){
                  for (let index = 0; index < list.length; index++) {
                    if (list[index].displaySymbol == stockInput) {
                      this.symbolData = list[index];
                      quote.description = list[index].description;
                      quote.displaySymbol = list[index].description;
                      quote.symbol = list[index].symbol;
                      quote.type = list[index].type;
  
                      this.localStorageService.addQuote(
                        stockInput,
                        JSON.stringify(quote)
                      );
                      this.reloadData();
                      this.loading(false); 
                      this.stockInput = '';
                    }
                  }
                }
                //No se ha encontrado ningun simbolo
                this.openSnackBar('Not found any data for the input symbol '+ stockInput);
                console.log('No se han encontrado datos para ' + stockInput);
                this.loading(false); 
              },
            });
        },
      });
    }
  }

  onClickDelete(symbol: string): any {
    this.localStorageService.removeQuote(symbol);
    this.reloadData();
  }

  onRemove(symbol: string) {
    this.localStorageService.removeQuote(symbol);
    this.reloadData();
  }

  reloadData() {
    this.quotes = this.localStorageService.getAll();
  }

  loading(isLoading: boolean) {
    this.saveInProgress = isLoading;
    if(isLoading){
      this.document.getElementById("overlay")!.style.display = "block";
    }else{
      this.document.getElementById("overlay")!.style.display = "none";
    }
  }

  openSnackBar(msg: string){
    this.snackBar.open(msg, 'OK');
  }

}
