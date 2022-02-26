import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Post} from "../post.model";
import {PostService} from "../post.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts : Post[] = [];
  private postSub$ : Subject<Post[]> = new Subject<Post[]>();

  constructor(private postService : PostService) {

  }

  ngOnInit(): void {
    this.postService.getPosts();
    this.postService.getPostUpdateListener()
      .pipe(takeUntil(this.postSub$))
      .subscribe((p)=> {
        this.posts = p;
    });
  }

  ngOnDestroy() {
    this.postSub$.next();
    this.postSub$.unsubscribe();
  }

}
