import { Component, OnInit } from '@angular/core';
import { ApiService } from './sevices/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit {
  instagramUrl: string = '';
  loading: boolean = false;
  data: any = null;
  error: string | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  onSubmit() {

    this.loading = true;
    this.error = null;
    this.data = null;
  
    this.apiService.analyzeInstagramProfile('https://www.instagram.com/jebaliaziz/').subscribe(
      (res) => {
        console.log(res);
        this.data = res;
        this.loading = false;
      },
      (err) => {
        this.error = 'An error occurred while analyzing the profile. Please try again.';
        this.loading = false;
        console.error(err);
      }
    );
  }
  getTraits(): { name: string; value: number }[] {
    if (!this.data || !this.data.personality_traits) {
      return [];
    }

    return Object.entries(this.data.personality_traits).map(([name, value]) => ({
      name,
      value: value as number
    }));
  }
  formatNumber(num: number): string {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  extractLinkFromBio(bio: string): string {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const match = bio.match(urlRegex);
    return match ? match[0] : '#';
  }
    getProfileImage(url: string): string {
    return this.apiService.getProfileImage(url);
  }
}
