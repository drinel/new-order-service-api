import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OS } from 'src/app/models/os';
import { OsService } from 'src/app/services/os.service';

@Component({
  selector: 'app-os-view',
  templateUrl: './os-view.component.html',
  styleUrls: ['./os-view.component.css']
})
export class OsViewComponent {

  os: OS = {
    tecnico:'',
    cliente:'',
    observacoes:'',
    status:'',
    prioridade:''
  }


  constructor(private service: OsService, private route: ActivatedRoute, private router: Router){}

  ngOnInit():void{
    this.os.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById():void{
    this.service.findById(this.os.id).subscribe(resposta =>{
      this.os = resposta;
    })
  }


  voltar(): void { 
    if(this.os.status == "ENCERRADO"){
    this.router.navigate(['os/closed'])
    }else{
      this.router.navigate(['os'])
    }
  }
}
