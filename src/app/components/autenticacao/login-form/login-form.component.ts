import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.form = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      senha: [null, Validators.required]
    });
  }

  login(){
    this.usuarioService.login(this.form.value);
  }

  get canSave() : boolean{
    return this.form.valid;
  }

}
