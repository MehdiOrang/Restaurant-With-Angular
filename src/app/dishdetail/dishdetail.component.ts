import { Component, OnInit ,ViewChild,Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Dish} from  '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import {Comment} from '../shared/comment';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {



  commentForm: FormGroup;
  comment: Comment;
  formErrors = {
    'author': '',
    'comment': '',
  };
  
  validationMessages = {
    'author': {
      'required':      'Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'Comment is required.',
      'minlength':     'Comment must be at least 10 characters long.',
    },
  };
  @ViewChild('commentform') commentFormDirective;

  dishcopy: Dish;
  errMess:string;
  dish:Dish;
  dishIds: string[];
  prev: string;
  next: string;
  
// Slider varaibles: 
  autoTicks = false;
  disabled = false;
  max = 5;
  min = 0;
  showTicks = true;
  step = 1;
  thumbLabel = true;
  value = 5;
  dateISO ='';


  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('baseURl') private baseURL) { 
      this.createForm();
    }

    ngOnInit() {
      this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds,errmess => this.errMess = <any>errmess);
      this.route.params
      .pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); },
        errmess => this.errMess = <any>errmess );
    }
  
    setPrevNext(dishId: string) {
      const index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }

  goBack(): void {
    this.location.back();
  }


  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      rating: [5],
      comment: ['', [Validators.required, Validators.minLength(2)] ],
    });

    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

  this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }


  onSubmit() {
    this.value = 5;
    var now = new Date();
    this.dateISO = now.toISOString();

    this.comment ={      
      rating: this.commentForm.value.rating,
      comment: this.commentForm.value.comment,
      author: this.commentForm.value.author,
      date: this.dateISO}

    this.dishcopy.comments.push(this.comment);
    this.dishservice.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
      errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });
    this.commentForm.reset({
      author: '',
      comment: '',
      rating:this.value,

    });
    this.commentFormDirective.resetForm({
      author: '',
      comment: '',
      rating:this.value,

    });
    this.dateISO='';
  }

}
