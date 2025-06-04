import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Ga4Service {
  private loaded = false;
    //8Z3X1V9F5E
  loadGa4(measurementId: string = 'G-726X1R2X45') {
    if (this.loaded) return;
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.async = true;
    document.head.appendChild(script);

    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    (window as any).gtag = gtag;
    gtag('js', new Date());
    gtag('config', measurementId);
    this.loaded = true;
  }

  event(name: string, params: any) {
    if ((window as any).gtag) {
      (window as any).gtag('event', name, params);
    }
  }
}