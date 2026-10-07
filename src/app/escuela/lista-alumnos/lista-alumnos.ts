import { Component } from '@angular/core';

import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IAlumno } from './alumnos';

@Component({
  imports: [FormsModule, ReactiveFormsModule],
  selector: 'app-lista-alumnos',
  styleUrl: './lista-alumnos.css',
  templateUrl: './lista-alumnos.html',
})
export class ListaAlumnos {
  formulario!: FormGroup;
  alumnos: IAlumno = {
    matricula: '',
    nombre: '',
    correo: '',
    materia: '',
  };

  ngOnInit(): void {
    this.formulario = new FormGroup({
      matricula: new FormControl(''),
      nombre: new FormControl(''),
      correo: new FormControl(''),
      materia: new FormControl(''),
    });
  }

  muestraAlumnos(): void {
    this.alumnos.matricula = this.formulario.value.matricula;
    this.alumnos.nombre = this.formulario.value.nombre;
    this.alumnos.correo = this.formulario.value.correo;
    this.alumnos.materia = this.formulario.value.materia;
  }
}
