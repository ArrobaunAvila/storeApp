import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  defaultColor = '#6B2995'; //color default to directive
  @Input() appHighlight:string = '';

  @HostListener('mouseenter') onMouseEnter(){
   this.element.nativeElement.style.backgroundColor = this.defaultColor;
  }


  @HostListener('mouseleave') onMouseLeave(){
   this.element.nativeElement.style.backgroundColor = '';
  }


  constructor(
    private element: ElementRef
  ) {

    this.element.nativeElement.style.backgroundColor = this.defaultColor;
   }


}
