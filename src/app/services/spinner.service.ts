import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private isLoading: boolean = false;

  constructor() {}

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  getIsLoading(): boolean {
    return this.isLoading;
  }
}
