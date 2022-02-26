import {Post} from "./post.model";
import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Injectable({providedIn : 'root'})
export class PostService {
  private _posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http : HttpClient) {

  }

  getPosts = () => {
    this.http.get<{message: string, posts : Post[]}>('http://localhost:3000/api/posts')
      .subscribe((postData) => {
            this._posts = postData.posts;
            this.postUpdated.next([...this._posts]);
        });
  }

  getPostUpdateListener() {
    return this.postUpdated as Observable<Post[]>;
  }

  setPosts(value: Post) {
    this.http.post<{message: string}>('http://localhost:3000/api/posts', value).
    subscribe((responseData)=>{
      console.log(responseData);
      this._posts.push(value);
      this.postUpdated.next([...this._posts]);
    });
  }



}
