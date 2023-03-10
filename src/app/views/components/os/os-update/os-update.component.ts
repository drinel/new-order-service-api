import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { OS } from 'src/app/models/os';
import { Tecnico } from 'src/app/models/tecnico';
import { ClienteService } from 'src/app/services/cliente.service';
import { OsService } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-update',
  templateUrl: './os-update.component.html',
  styleUrls: ['./os-update.component.css']
})
export class OsUpdateComponent {

  os: OS = {
    tecnico:'',
    cliente:'',
    observacoes:'',
    status:'',
    prioridade:''
  }

  tecnicos: Tecnico[]=[]
  clientes: Cliente[]=[]

   constructor(private tecnicoService: TecnicoService, 
    private clienteService: ClienteService,
    private service: OsService,
    private router: Router,
    private route: ActivatedRoute){}

   ngOnInit(): void {
    this.os.id= this.route.snapshot.paramMap.get('id');
    this.findById();
    this.listarTecnico();
    this.listarCliente();
   }

   findById():void{
    this.service.findById(this.os.id).subscribe(resposta =>{
      this.os = resposta;
      this.coverteDados();
    })
   }

   update(): void {
    this.service.update(this.os).subscribe(resposta =>{
      this.service.message("Ordem de Serviço atualizada com sucesso!")
      this.router.navigate(['os'])
    }, err =>{
      this.service.message("Informar todos os campos!")
    })
   }

   listarTecnico():void{
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
 
    })
   }

   listarCliente():void{
    this.clienteService.findAll().subscribe(resposta =>{
      this.clientes = resposta;
    })
   }

    
  cancel():void {
    if(this.os.status == 2){
      this.router.navigate(['os/closed'])
      }else{
        this.router.navigate(['os'])
      }
  }


    coverteDados(): void{
      if(this.os.status == 'ABERTO'){
        this.os.status = 0;
      }else if(this.os.status == 'ANDAMENTO'){
        this.os.status = 1;
      }else {
        this.os.status = 2;
      }


      if(this.os.prioridade == 'BAIXA'){
        this.os.prioridade = 0;
      }else if(this.os.prioridade == 'MEDIA'){
        this.os.prioridade = 1;
      }else {
        this.os.prioridade = 2;
      }
    }
}
