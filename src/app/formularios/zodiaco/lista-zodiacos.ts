import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { intZodiaco } from './intzodiaco';

@Component({
  selector: 'app-lista-zodiacos',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './zodiacos.html',
  styleUrl: './zodiaco.css',
})
export class ListaZodiacos implements OnInit {

  formulario!: FormGroup;

  zodiacos: intZodiaco[] = [];

  indiceEdicion: number = -1;

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      Apaterno: new FormControl(''),
      Amaterno: new FormControl(''),
      dia: new FormControl(0),
      mes: new FormControl(0),
      ano: new FormControl(0),
      sexo: new FormControl(''),
      edad: new FormControl(0),
      horoscopo: new FormControl(''),
    });

    this.cargarZodiacos();
  }

  cargarZodiacos(): void {
    const datos = localStorage.getItem('zodiacos');

    if (datos) {
      this.zodiacos = JSON.parse(datos);
    }
  }

  editarZodiaco(index: number): void {
    const zodiaco = this.zodiacos[index];

    this.formulario.patchValue({
      nombre: zodiaco.nombre,
      Apaterno: zodiaco.Apaterno,
      Amaterno: zodiaco.Amaterno,
      dia: zodiaco.dia,
      mes: zodiaco.mes,
      ano: zodiaco.ano,
      sexo: zodiaco.sexo,
      edad: zodiaco.edad,
      horoscopo: zodiaco.signo,
    });

    this.indiceEdicion = index;
  }

  guardarCambios(): void {
    if (this.indiceEdicion === -1) {
      return;
    }

    const datos = this.formulario.value;

    if (
      datos.nombre === '' ||
      datos.Apaterno === '' ||
      datos.Amaterno === '' ||
      datos.sexo === '' ||
      datos.signo === ''
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }

    this.zodiacos[this.indiceEdicion] = {
      nombre: datos.nombre,
      Apaterno: datos.Apaterno,
      Amaterno: datos.Amaterno,
      dia: Number(datos.dia),
      mes: Number(datos.mes),
      ano: Number(datos.ano),
      sexo: datos.sexo,
      edad: Number(datos.edad),
      signo: datos.horoscopo,
    };

    localStorage.setItem(
      'zodiacos',
      JSON.stringify(this.zodiacos)
    );

    this.cancelarEdicion();
  }

  cancelarEdicion(): void {
    this.indiceEdicion = -1;
    this.formulario.reset();
  }

  eliminarZodiaco(index: number): void {
    this.zodiacos.splice(index, 1);

    localStorage.setItem(
      'zodiacos',
      JSON.stringify(this.zodiacos)
    );

    if (this.indiceEdicion === index) {
      this.cancelarEdicion();
    } else if (this.indiceEdicion > index) {
      this.indiceEdicion--;
    }
  }
}