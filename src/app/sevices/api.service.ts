import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  analyzeInstagramProfile(instagram_url: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/analyze`, { instagram_url});
  }
  encodeUrl(url: string): string {
    return encodeURIComponent(url);
  }

  // Récupérer l'image via proxy
  getProfileImage(imageUrl: string): string {
    
    // Utiliser le proxy backend
    const encodedUrl = this.encodeUrl(imageUrl);
    return `${this.apiUrl}/proxy/instagram-image?url=${encodedUrl}`;
  }
}