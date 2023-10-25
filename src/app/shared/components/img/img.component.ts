import { Component, EventEmitter, Input, OnInit, Output, OnChanges,AfterViewInit , OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges , AfterViewInit, OnDestroy {

  url_img: string = '';
  //set input para validar el cambio de un input en especifico
  @Input('url_img')
    set changeImg(newImg: string){
     this.url_img = newImg;
     //console.log('change just img => ' , this.url_img);

     //code
    }

  @Input() alt: string = '';
  @Output() loaded = new EventEmitter<string>();
  counter: number = 0;
  counterFn: number | undefined;

  imageDefault: string= './assets/images/default.png';

  constructor() {
    //before render
    // No async, once time
    console.log('Constructor', 'imgValue =>', this.url_img);
   }

  ngOnInit(): void {
    //before render
    //async - fetch--- petition api -- once time
    //console.log('ngOnInit','imgValue =>', this.url_img);
   /*
   this.counterFn =  window.setInterval( ()=> {
     this.counter += 1;
     console.log(this.counter);
    },1000);
    */
  }

   //SimpleChanges nos permite escuchar todos los Input, todos los cambios
  ngOnChanges(changes: SimpleChanges): void{
   //before render - durinn render
   //changes imputs - times
  // console.log('ngOnChanges', 'imgValue =>', this.url_img);
   //console.log("Changes",changes);
  }


 ngAfterViewInit(): void {
     //after render
     //handlet children
     //console.log('ngAfterViewInit');
 }


ngOnDestroy(): void {
  //delete component
  console.log('ngOnDestroy');
  window.clearInterval(this.counterFn);
}

  public imgError(){
    this.url_img = this.imageDefault;
  }

  public imgLoaded(){
   console.log("Cargo correctamente log Hijo");
   this.loaded.emit(this.url_img);
  }
}
