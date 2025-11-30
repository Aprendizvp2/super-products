import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  LoadingController,
  ToastController,
  ToastOptions,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  loadingControl = inject(LoadingController);
  toastControl = inject(ToastController);
  router = inject(Router);

  // Loading

  loading() {
    return this.loadingControl.create({
      spinner: 'bubbles',
    });
  }

  // Toast
  async toast(opts?: ToastOptions) {
    const toast = await this.toastControl.create(opts);
    await toast.present();
  }

  // Routing
  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  // Save element in local storage
  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  // Get element in local storage
  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
}
