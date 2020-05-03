import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tweet-view',
  templateUrl: './tweet-view.component.html',
  styleUrls: ['./tweet-view.component.css']
})
export class TweetViewComponent implements OnInit {

  @Input() tweet: {}
  constructor() { }

  ngOnInit(): void {
  }

}
