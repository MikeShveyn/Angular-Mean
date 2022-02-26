import {Component, Output, EventEmitter, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Post} from "../post.model";
import {PostService} from "../post.service";


@Component({
  selector: 'post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit{
  createFrom : FormGroup;

  get title() {
    return this.createFrom.get('title') as FormControl;
  }

  get content() {
    return this.createFrom.get('content') as FormControl;
  }

  constructor(private fb : FormBuilder, private postService : PostService) {
    this.createFrom =  this.fb.group({
      title : ["", Validators.required],
      content: ["", Validators.required]
    })
  }

  ngOnInit() {

  }

  onAddPost = () => {
    if(this.createFrom.invalid) {
      return;
    }
    const post : Post = {
      id : null,
      title : this.title.value,
      content : this.content.value
    }
   this.postService.setPosts(post);
    this.createFrom.reset();
    this.createFrom.markAsPristine();
  }

}
