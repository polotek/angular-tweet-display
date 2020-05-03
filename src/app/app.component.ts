import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { map } from "rxjs/operators";

declare global {
  interface Window {
    twttr: {
      widgets: {
        load: (embedEl: HTMLElement) => void;
      };
    };
  }
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  embeds$: Observable<SafeHtml[]>

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.embeds$ = this.http
      .post<SafeHtml[]>("https://polotek.builtwithdark.com/twitter/oembed", {
        payload: ["https://twitter.com/polotek/status/1236417848177618946"]
      })
      .pipe(
        map((embeds: [string, { html: string }][]) => {
          return embeds.map(([url, embed]) =>
            this.sanitizer.bypassSecurityTrustHtml(embed.html)
          )
        })
      )
  }
}
