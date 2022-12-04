import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Quote } from 'src/app/interfaces/quote';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.scss']
})
export class StockDetailComponent implements OnInit {

  @Input() quote!: Quote ;
  @Output() remove = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onClickDelete(symbol: string){
    this.remove.emit(this.quote.symbol);
  }

}
