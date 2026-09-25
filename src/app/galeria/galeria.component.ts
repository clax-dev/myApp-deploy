import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, RouterLink],
})
export class GaleriaComponent implements OnInit {
  public tituloSeccion: string = 'Galería de Imágenes Dinámica';
  public descripcion: string = 'Esta imagen se carga desde el directorio de assets mediante Property Binding.';
  public rutaImagenLocal: string = 'assets/foto1.jpg';

  constructor() {}

  ngOnInit() {}
}