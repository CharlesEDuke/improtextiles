import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Empleado { nombre: string; apellidos: string; fechaNacimiento: Date; dpi: number; sexo: string; EstadoCivil: string; Telefono: number; email: string;  FechaIngreso: Date;  emailLaboral: string;  cargo: string; jefeinmediato: string; departamento: string;}
export interface EmpleadoId extends Empleado { id: string; }

@Component({
  selector: 'app-rrhh',
  templateUrl: './rrhh.component.html',
  styles: []
})
export class RrhhComponent implements OnInit {
  ModuloUserRRHHEliminar = JSON.parse(localStorage.getItem('ModuloUserRRHHEliminar'));
  ModuloUserRRHHEditar = JSON.parse(localStorage.getItem('ModuloUserRRHHEditar',));
  private empleadoCollection: AngularFirestoreCollection<Empleado>;
  empleados: Observable<EmpleadoId[]>;
  
  nuevoEmpleado: Empleado = {
    nombre: '',
    apellidos: '',
    fechaNacimiento: null,
    dpi: null,
    sexo: '',
    EstadoCivil: '',
    Telefono: null,
    email: '',
    FechaIngreso: null,
    emailLaboral: '',
    cargo: '',
    jefeinmediato: '',
    departamento:''
  };
  editar = true;
  query: string;

  docEmpleado: AngularFirestoreDocument<Empleado>;
  editEmpleado: Observable<Empleado>;
  
  constructor(private readonly afs: AngularFirestore) {

    this.empleadoCollection = afs.collection<Empleado>('empleados');
    this.empleados = this.empleadoCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Empleado;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

    
  }

  ngOnInit() {
    // window.location.reload();
    console.log(localStorage.getItem('ModuloUserRRHHVer'),"rrhhver");
    console.log(localStorage.getItem('ModuloUserRRHHEliminar'),"eliminar");


  }

  verEmpleado(empleado) {
    this.docEmpleado = this.afs.doc(`empleados/${empleado.id}`);
    this.editEmpleado = this.docEmpleado.valueChanges();
    console.log(this.editEmpleado);

  }

  addEmpleado(empleado: Empleado) {
    this.empleadoCollection.add(empleado);
    this.nuevoEmpleado = {
      nombre: '',
      apellidos: '',
      fechaNacimiento: null,
      dpi: null,
      sexo: '',
      EstadoCivil: '',
      Telefono: null,
      email: '',
      FechaIngreso: null,
      emailLaboral: '',
      cargo: '',
      jefeinmediato: '',
      departamento:''
    };
  }

  setEmpleado(empleado) {
    this.docEmpleado.update(empleado);
    this.editar = true;
  }

  daleteEmpleado() {
    this.docEmpleado.delete();
  }
  ButtonEditar(){
    this.editar = false;
}
ButtonEditarCancelar(){
  this.editar = true;
}

}
