import { Component, OnInit, Input } from '@angular/core';

const TWITTER_HOST = 'https://twitter.com'

@Component({
  selector: 'tweet-view',
  templateUrl: './tweet-view.component.html',
  styleUrls: ['./tweet-view.component.css']
})
export class TweetViewComponent implements OnInit {

  @Input() tweet: Record<string, any>
  constructor() { }

  ngOnInit(): void {
    if(!this.tweet.status_url) {
      this.tweet.status_url = this.statusUrl(this.tweet);
    }
  }

  profileUrl(screenName: string) {
    return `${TWITTER_HOST}/${screenName}`
  }

  statusUrl(tweet: Record<string, any>) {
    return `${TWITTER_HOST}/${tweet.user.screen_name}/status/${tweet.id_str}`
  }
}
