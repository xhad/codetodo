import { Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';

@Directive({ selector: 'textarea[autosize]' })


export class Autosize {
 @HostListener('input',['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }
    constructor(public element: ElementRef, renderer: Renderer) {
    	// console.log(el.nativeElement)
     //   renderer.setElementStyle(
     //   	el.nativeElement, 'height', '400px'
     //   );
    }

  ngOnInit(): void{
    this.adjust();
  }
  adjust(): void{
    this.element.nativeElement.style.overflow = 'hidden';
    this.element.nativeElement.style.height = 'auto';
    this.element.nativeElement.style.height = this.element.nativeElement.scrollHeight + "px";
  }
}

