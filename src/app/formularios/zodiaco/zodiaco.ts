  import { Component } from '@angular/core';
  import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
  import { intZodiaco } from './intzodiaco';

  @Component({
    imports: [FormsModule, ReactiveFormsModule],
    selector: 'app-zodiaco',
    styleUrl: './zodiaco.css',
    templateUrl: './zodiaco.html',
  })
  export class Zodiaco{
    formulario!: FormGroup;
    signo: intZodiaco = {
      nombre: '',
      Amaterno: '',
      Apaterno: '',
      dia: 0,
      mes: 0,
      ano: 0,
      animal: '',
      imagen: '',
      edad: 0
    };

    ngOnInit(): void {
      this.formulario = new FormGroup({
        nombre: new FormControl(''),
        Amaterno: new FormControl(''),
        Apaterno: new FormControl(''),
        dia: new FormControl(''),
        mes: new FormControl(''),
        ano: new FormControl(''),
      });
    }

    muestraSigno(): void {
      this.signo.nombre = this.formulario.value.nombre?.trim() || '';
      this.signo.Amaterno = this.formulario.value.Amaterno?.trim() || '';
      this.signo.Apaterno = this.formulario.value.Apaterno?.trim() || '';
      this.signo.dia = Number(this.formulario.value.dia);
      this.signo.mes = Number(this.formulario.value.mes);
      this.signo.ano = Number(this.formulario.value.ano);
    

      let fecha: Date = new Date()
    const fechaNacimiento = new Date(this.signo.ano, this.signo.mes - 1, this.signo.dia)
    this.signo.edad = fecha.getFullYear() - fechaNacimiento.getFullYear()

    if (fecha.getMonth() < fechaNacimiento.getMonth() || (fecha.getMonth() === fechaNacimiento.getMonth() && fecha.getMonth() < fechaNacimiento.getDate())) {
      this.signo.edad--
    }

    this.calcularAnimalChino(this.signo.ano);
  }

  calcularAnimalChino(ano: number): void {

    switch (ano % 12) {

      case 0:
        this.signo.animal = 'Mono';
        this.signo.imagen =
          'https://media.gettyimages.com/id/497578552/es/vector/a%C3%B1o-de-los-monos-papercut-arte.jpg?s=612x612&w=0&k=20&c=qyoZXpQy_6YzaQcIwAtdoDc_vJN2oedEr0D1t3i2ulw=';
        break;

      case 1:
        this.signo.animal = 'Gallo';
        this.signo.imagen =
          'https://media.gettyimages.com/id/600056740/es/vector/a%C3%B1o-del-gallo-papercut.jpg?s=612x612&w=0&k=20&c=RLcBWq9ZVO6v21I9hVd80uumUY6yECd-GdX-2VB39JE=';
        break;

      case 2:
        this.signo.animal = 'Perro';
        this.signo.imagen =
          'https://media.gettyimages.com/id/896080352/es/vector/perro-de-papel-cortado.jpg?s=612x612&w=0&k=20&c=7iSiNvyoGZnw_SjVZXbLMiSH7t2xcDYpQ0e7IDF3v6c=';
        break;

      case 3:
        this.signo.animal = 'Cerdo';
        this.signo.imagen =
          'https://media.gettyimages.com/id/1002010700/es/vector/a%C3%B1o-del-cerdo-papercut.jpg?s=612x612&w=0&k=20&c=TgxomeVIa9NGDny3EkjvUf9ZOIkmEpEMR5G9QIwZx3s=';
        break;

      case 4:
        this.signo.animal = 'Rata';
        this.signo.imagen =
          'https://media.gettyimages.com/id/1165068831/es/vector/year-of-the-rat-papercut.jpg?s=612x612&w=0&k=20&c=_hG8ejliI1fWNpfN3wcfmw7xx5FGQVGTAlz4TEIIznM=';
        break;

      case 5:
        this.signo.animal = 'Buey';
        this.signo.imagen =
          'https://media.gettyimages.com/id/1294374128/es/vector/a%C3%B1o-del-corte-de-papel-de-buey.jpg?s=612x612&w=0&k=20&c=glLRoREpS-yVwUOWCAdOuozGfIK-vO1vVXsl5EbKyZY=';
        break;

      case 6:
        this.signo.animal = 'Tigre';
        this.signo.imagen =
          'https://media.gettyimages.com/id/1345603683/es/vector/a%C3%B1o-del-tiger-papercut.jpg?s=612x612&w=0&k=20&c=lJAIb2OhOwx9aNdqk7Wt-50164WazBNxxA0GX1ykTCU=';
        break;

      case 7:
        this.signo.animal = 'Conejo';
        this.signo.imagen =
          'https://media.gettyimages.com/id/483533645/es/vector/a%C3%B1o-de-los-conejos.jpg?s=612x612&w=0&k=20&c=Nf74yZFTRVsHyc08SKQhZ902fRhQTo9teUgWzLYg7Eo=';
        break;

      case 8:
        this.signo.animal = 'Dragón';
        this.signo.imagen =
          'https://media.gettyimages.com/id/165793472/es/vector/drag%C3%B3n-chino-corte-de-papel-arte.jpg?s=612x612&w=0&k=20&c=bCKfEeU7gBV_2no_JGm7Q5TFISAdzojXyxeeWWV5Ghk=';
        break;

      case 9:
        this.signo.animal = 'Serpiente';
        this.signo.imagen =
          'https://media.gettyimages.com/id/165931574/es/vector/a%C3%B1o-de-la-serpiente.jpg?s=612x612&w=0&k=20&c=NPxvOT9ThtaF0QJvJQolRsWcHy9yoY-wOH96UitqBVw=';
        break;

      case 10:
        this.signo.animal = 'Caballo';
        this.signo.imagen =
          'https://media.gettyimages.com/id/932747220/es/vector/caballo-signo-del-zodiaco.jpg?s=612x612&w=0&k=20&c=_R0KUS5anoJE0BlDJRAR_GWF2dccVZttJWGosg8Y55M=';
        break;

      case 11:
        this.signo.animal = 'Cabra';
        this.signo.imagen =
          'https://media.gettyimages.com/id/600056740/es/vector/a%C3%B1o-del-gallo-papercut.jpg?s=612x612&w=0&k=20&c=RLcBWq9ZVO6v21I9hVd80uumUY6yECd-GdX-2VB39JE=';
        break;

      default:
        this.signo.animal = '';
        this.signo.imagen = '';
        break;
    }
  }
}

    

