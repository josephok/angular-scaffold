import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  regForm: FormGroup;  // 注册新用户

  constructor(private fb: FormBuilder) { // <--- inject FormBuilder
    this.createForm();
  }

  createForm() {
    this.regForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      confirmPass: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

}
