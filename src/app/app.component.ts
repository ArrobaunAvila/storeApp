import { Component , OnInit} from '@angular/core';
import { Team } from './models/nbaModels/TeamModels';
import { Product  } from './models/Product.models';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';
import { TokenService } from './services/token.service';


@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
   title = 'NBA-APP';
   developer = 'Daniel Avila...'
   age = 18;
   image_parent: string = '';
   widthImage= 10;
   img="https://phantom-marca.unidadeditorial.es/ee46d7a1c09b447117f8e83c6e131f31/resize/1320/f/jpg/assets/multimedia/imagenes/2022/02/02/16437899001758.jpg";
   btnDisabled = true;
   cursos: string[] | number[] = ['Angular', 'Spring', 'Sequelize', 'PostgreSQl', 'Devops'];
   any_information: any[]=[30189732132, 'Barranquilla', 'calle34#45A', 3945676, this.cursos];
   team_nba: string = "";
   message_valid: string = "";

  token: string = "";
  imgRta: string = "";

   showImage: boolean = true;

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private fileService: FilesService,
    private tokenService: TokenService ){}

  ngOnInit(): void {
    const token = this.tokenService.getToken();
   if(token){
     this.authService.getProfile()
     .subscribe();
   }
  }

  public person = {
   name: 'Daniel Avila Cardenas...',
   age: 27,
   avatar: 'https://image.shutterstock.com/image-vector/bright-people-portrait-hand-drawn-260nw-1496689637.jpg',
   information_extra: this.any_information
  }



  public register = {
    name: 'Daniel',
    email: '',
    password: ''
  }

  public nba_object: Team[] = [
    {
      name:"lakers",
      coach: "Darvi Ham",
      conference: "Oeste",
      players: ["Lebrom james","Russell Westbrook"],
      nba_champions: 17,
      titles_conference : 32,
      logo: "https://i.pinimg.com/originals/d8/4e/bf/d84ebf32bdbfe4b2afe9f65571a08e32.jpg"
      },
      {
      name:"Bulls",
      coach: "Billy Donovan",
      conference: "Este",
      players: ["Lonzo Ball","Marcus DeRozan"],
      nba_champions: 6,
      titles_conference : 13,
      logo: "https://i.pinimg.com/564x/03/15/62/03156265e37c4518dfcd8dbe8e6c269f.jpg"
      },
      {
      name:"Dallas",
      coach: "Billy Donovan",
      conference: "Este",
      players: ["Lonzo Ball","Marcus DeRozan"],
      nba_champions: 6,
      titles_conference : 13,
      logo: "https://i.pinimg.com/736x/1d/e8/e9/1de8e9e6270c3210aeafb3b39ed0bce3.jpg"
      },
      {
      name:"Warriors",
      coach: "Billy Donovan",
      conference: "Este",
      players: ["Lonzo Ball","Marcus DeRozan"],
      nba_champions: 6,
      titles_conference : 13,
      logo: "https://i.pinimg.com/564x/bb/00/48/bb004842f422d73dc23369e60e84aa99.jpg"
      },
      {
      name:"Oklahoma City",
      coach: "Billy Donovan",
      conference: "Este",
      players: ["Lonzo Ball","Marcus DeRozan"],
      nba_champions: 6,
      titles_conference : 13,
      logo: "https://i.pinimg.com/564x/50/e6/11/50e61108f2ed4ec0b2983290ee3f88a3.jpg"
      },
      {
      name:"Nets",
      coach: "Billy Donovan",
      conference: "Este",
      players: ["Lonzo Ball","Marcus DeRozan"],
      nba_champions: 6,
      titles_conference : 13,
      logo: "https://i.pinimg.com/564x/2e/60/05/2e60052492835ae460a382334fa33075.jpg"
      },
      {
      name:"Bucks",
      coach: "Billy Donovan",
      conference: "Este",
      players: ["Lonzo Ball","Marcus DeRozan"],
      nba_champions: 6,
      titles_conference : 13,
      logo: "https://i.pinimg.com/564x/f3/12/0b/f3120b71a7bae498e9b852ccd627fe70.jpg"
      },


  ]

  information_person: string = '';

  public toggleButton() {
    this.btnDisabled = this.btnDisabled  == true ? false : true;
  }

  public increaseAge(){
   this.person.age += 1;
  }

  onScroll(event: Event){
      const element = event.target as HTMLElement;
      console.log(element.scrollTop);
  }

  onMouse(event: Event) {
    const element = event.target as HTMLElement;
    console.log(element.className);
  }

  public changeName(event: Event) {
   const element = event.target as HTMLInputElement;
   this.person.name = element.value;
   console.log(element.value);
  }

  public addInformation(){
   this.any_information.push(this.information_person);
   this.information_person = '';
  }

  deleteInformation(index: number){
     this.any_information.splice(index,1);
  }

  onLoaded(img: string){
  console.log('Log Padre', img);
  }

  toggleImg(){
    this.showImage = !this.showImage;
  }

  downloadPdf() {
    this.fileService.getFile("my.Pdf", 'https://www.itau.co/documents/10282/1323137/74ModeloPoderPersonaNatural.pdf','application/pdf')
      .subscribe(response => {
        console.log(response);
      })
  }

  onUpload(event: Event) {
    //Formas de tratar archivos desde el HTML con angular
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);

    if (file) {
      this.fileService.uploadFile(file)
      .subscribe(rta => {
        this.imgRta = rta.location;
      })
    }

  }
}

