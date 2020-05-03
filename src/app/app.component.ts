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
  tweets$: Observable<{}>

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.tweets$ = this.http
      .get<{data:{}}>("https://polotek.builtwithdark.com/twitter/full_thread", {
        params: {
          url: "https://twitter.com/polotek/status/1255585566248235008"
        }
      })
      .pipe(
        map((body) => [body.data])
      )
  }
}
