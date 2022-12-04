import { Component, Input, OnInit } from '@angular/core';
import { Quote } from 'src/app/interfaces/quote';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-stock-detail-list',
  templateUrl: './stock-detail-list.component.html',
  styleUrls: ['./stock-detail-list.component.scss']
})
export class StockDetailListComponent implements OnInit {

  private localStorageService : LocalStorageService;
  quotes: Quote[] = [];
  @Input() quote!: Quote ;


  constructor(localStorageService: LocalStorageService) {
    this.localStorageService = localStorageService;
    this.quotes = this.localStorageService.getAll();
   }

  ngOnInit(): void {
    
  }

  onClickDelete(symbol: string){

  }

}
