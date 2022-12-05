import { Injectable } from '@angular/core';
import { Quote } from '../interfaces/quote';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  addQuote(key: string, quote: string) {
    localStorage.setItem(key, quote);
  }

  getQuote(key: string): Quote {
    return JSON.parse(localStorage.getItem(key)!);
  }

  removeQuote(key: string) {
    localStorage.removeItem(key);
  }

  removeAll() {
    localStorage.clear();
  }

  getAll(): Quote[] {
    var allItems: Quote[] = [];
    for (let index = 0; index < localStorage.length; index++) {
      var quote: Quote;
      var key = localStorage.key(index)!; //evitamos que sea null
      quote = JSON.parse(localStorage.getItem(key)!);
      if (typeof quote === 'object') {
        allItems.push(quote);
      }
    }
    return allItems;
  }

  keyExists(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}
