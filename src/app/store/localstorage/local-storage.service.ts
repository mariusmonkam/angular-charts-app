import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private static readonly STORAGE_KEY = 'appState';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  saveState(state: any): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(LocalStorageService.STORAGE_KEY, serializedState);
      } catch (err) {
        console.error('Could not save state', err);
      }
    }
  }

  loadState(): any {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const serializedState = localStorage.getItem(
          LocalStorageService.STORAGE_KEY
        );
        if (serializedState === null) {
          return undefined;
        }
        return JSON.parse(serializedState);
      } catch (err) {
        console.error('Could not load state', err);
        return undefined;
      }
    }
    return undefined;
  }

  clearState(): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.removeItem(LocalStorageService.STORAGE_KEY);
      } catch (err) {
        console.error('Could not clear state', err);
      }
    }
  }
}
