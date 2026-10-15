import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { intZodiaco } from './intzodiaco';

@Component({
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  selector: 'app-zodiaco',
  styleUrl: './zodiaco.css',
  templateUrl: './zodiaco.html',
})
export class Zodiaco implements OnInit {
  formulario!: FormGroup;

  signos: intZodiaco = {
    nombre: '',
    Apaterno: '',
    Amaterno: '',
    dia: 0,
    mes: 0,
    ano: 0,
    sexo: '',
    edad: 0,
    signo: '',
  };

  zodiacos: intZodiaco[] = [];

  indiceEdicion: number = -1;

  signo: string = '';
  edad: number = 0;
  imagen: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      Apaterno: new FormControl(''),
      Amaterno: new FormControl(''),
      dia: new FormControl(0),
      mes: new FormControl(0),
      ano: new FormControl(0),
      sexo: new FormControl(''),
    });

    this.cargarZodiacos();
  }

  agregarZodiaco(): void {
    if (
      this.signos.nombre === '' ||
      this.signos.Apaterno === '' ||
      this.signos.Amaterno === '' ||
      this.signos.sexo === ''
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }

    this.signos = {
      ...this.signos,
      edad: this.edad,
      signo: this.signo,
    };

    if (this.indiceEdicion !== -1) {
      this.zodiacos[this.indiceEdicion] = {
        ...this.signos,
      };
    } else {
      this.zodiacos.push({ ...this.signos });
    }

    localStorage.setItem('zodiacos', JSON.stringify(this.zodiacos));

    this.limpiarCampos();
  }

  cargarZodiacos(): void {
    const datos = localStorage.getItem('zodiacos');

    if (datos) {
      this.zodiacos = JSON.parse(datos);
    }
  }

  editarZodiaco(index: number): void {
    this.signos = {
      ...this.zodiacos[index],
    };

    const zodiaco = this.zodiacos[index];

    this.formulario.patchValue({
      nombre: zodiaco.nombre,
      Apaterno: zodiaco.Apaterno,
      Amaterno: zodiaco.Amaterno,
      dia: zodiaco.dia,
      mes: zodiaco.mes,
      ano: zodiaco.ano,
      sexo: zodiaco.sexo,
    });

    this.indiceEdicion = index;
  }

  eliminarZodiaco(index: number): void {
    this.zodiacos.splice(index, 1);

    localStorage.setItem('zodiacos', JSON.stringify(this.zodiacos));
  }

  limpiarCampos(): void {
    this.formulario.reset();
    this.indiceEdicion = -1;
  }

  muestraZodiaco(): void {
    this.signos.nombre = this.formulario.value.nombre;
    this.signos.Apaterno = this.formulario.value.Apaterno;
    this.signos.Amaterno = this.formulario.value.Amaterno;
    this.signos.dia = Number(this.formulario.value.dia);
    this.signos.mes = Number(this.formulario.value.mes);
    this.signos.ano = Number(this.formulario.value.ano);
    this.signos.sexo = this.formulario.value.sexo;

    if (
      this.signos.nombre === '' ||
      this.signos.Apaterno === '' ||
      this.signos.Amaterno === '' ||
      this.signos.sexo === ''
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (this.formulario.value.dia < 1 || this.formulario.value.dia > 31) {
      alert('El dia ingresado no es valido');
      return;
    } else if (this.formulario.value.mes < 1 || this.formulario.value.mes > 12) {
      alert('El mes ingresado no es válido');
      return;
    } else if (this.formulario.value.ano < 1900 || this.formulario.value.ano > 2026) {
      alert('El año ingresado no es válido');
      return;
    }

    this.edad = 2026 - this.formulario.value.ano;

    if (
      this.formulario.value.mes > 10 ||
      (this.formulario.value.mes === 9 && this.formulario.value.dia > 10)
    ) {
      this.edad = this.edad - 1;
    }

   switch ((this.signos.ano - 1900) % 12) {
  case 0:
    this.signo = 'Caballo';
    this.imagen = 'https://media.gettyimages.com/id/2236008255/es/vector/caballo-de-corte-de-papel-a%C3%B1o-del-caballo-2026-ilustraci%C3%B3n-vectorial.jpg?s=612x612&w=0&k=20&c=0L7Cbv8ctoLVhmEMET8q954yRqEp4e0Bm5ktH2I8gC4=';
    break;
  case 1:
    this.signo = 'Cabra';
    this.imagen = 'https://media.gettyimages.com/id/522058067/es/vector/papercut-de-cabra.jpg?s=612x612&w=0&k=20&c=zfy5brra6qamdih86vpilpp9kqciam8cxryoabzwxda=';
    break;
  case 2:
    this.signo = 'Mono';
    this.imagen = 'https://media.gettyimages.com/id/497578552/es/vector/a%C3%B1o-de-los-monos-papercut-arte.jpg?s=612x612&w=0&k=20&c=qyoZXpQy_6YzaQcIwAtdoDc_vJN2oedEr0D1t3i2ulw=';
    break;
  case 3:
    this.signo = 'Gallo';
    this.imagen = 'https://media.gettyimages.com/id/600056740/es/vector/a%C3%B1o-del-gallo-papercut.jpg?s=612x612&w=0&k=20&c=RLcBWq9ZVO6v21I9hVd80uumUY6yECd-GdX-2VB39JE=';
    break;
  case 4:
    this.signo = 'Perro';
    this.imagen = 'https://media.gettyimages.com/id/874871202/es/vector/a%C3%B1o-nuevo-perro-paperart.jpg?s=612x612&w=0&k=20&c=y7-mfGmKxH16vWggFbQx064Q9lTGhR_E5wZXau1i86A=';
    break;
  case 5:
    this.signo = 'Cerdo';
    this.imagen = 'https://media.gettyimages.com/id/1002010700/es/vector/a%C3%B1o-del-cerdo-papercut.jpg?s=612x612&w=0&k=20&c=TgxomeVIa9NGDny3EkjvUf9ZOIkmEpEMR5G9QIwZx3s=';
    break;
  case 6:
    this.signo = 'Rata';
    this.imagen = 'https://media.gettyimages.com/id/1002010700/es/vector/a%C3%B1o-del-cerdo-papercut.jpg?s=612x612&w=0&k=20&c=TgxomeVIa9NGDny3EkjvUf9ZOIkmEpEMR5G9QIwZx3s=';
    break;
  case 7:
    this.signo = 'Buey';
    this.imagen = 'https://media.gettyimages.com/id/1294374128/es/vector/a%C3%B1o-del-corte-de-papel-de-buey.jpg?s=612x612&w=0&k=20&c=glLRoREpS-yVwUOWCAdOuozGfIK-vO1vVXsl5EbKyZY=';
    break;
  case 8:
    this.signo = 'Tigre';
    this.imagen = 'https://media.gettyimages.com/id/1345603683/es/vector/a%C3%B1o-del-tiger-papercut.jpg?s=612x612&w=0&k=20&c=lJAIb2OhOwx9aNdqk7Wt-50164WazBNxxA0GX1ykTCU=';
    break;
  case 9:
    this.signo = 'Conejo';
    this.imagen = 'https://media.gettyimages.com/id/483533645/es/vector/a%C3%B1o-de-los-conejos.jpg?s=612x612&w=0&k=20&c=Nf74yZFTRVsHyc08SKQhZ902fRhQTo9teUgWzLYg7Eo=';
    break;
  case 10:
    this.signo = 'Dragon';
    this.imagen = 'https://media.gettyimages.com/id/165793472/es/vector/drag%C3%B3n-chino-corte-de-papel-arte.jpg?s=612x612&w=0&k=20&c=bCKfEeU7gBV_2no_JGm7Q5TFISAdzojXyxeeWWV5Ghk=';
    break;
  case 11:
    this.signo = 'Serpiente';
    this.imagen = 'https://media.gettyimages.com/id/165930223/es/vector/a%C3%B1o-de-la-serpiente.jpg?s=612x612&w=0&k=20&c=KPbx-vCkDwNB1JCMkGDze2VG_TGLXit4M_u8JAQqOok=';
    break;
  default:
    this.signo = 'No se pudo determinar tu horoscopo';
    this.imagen = '';
    break;
}

    this.agregarZodiaco();
  }
}