import { Directive, Input, ElementRef, HostListener, Renderer2, SimpleChanges, OnChanges } from '@angular/core';

@Directive({
  selector: '[assessmentMatElevationHover]'
})
export class MatElevationHoverDirective implements OnChanges {

  @Input() defaultElevation = 2;

  constructor(private el: ElementRef,
              private renderer: Renderer2) {
    this.setElevation(this.defaultElevation);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setElevation(this.defaultElevation);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setElevation(8);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setElevation(this.defaultElevation);
  }

  private setElevation(amount: number) {
    // remove all elevation classes
    const classesToRemove = Array.from((this.el.nativeElement as HTMLElement).classList).filter(c => c.startsWith('mat-elevation-z'));
    classesToRemove.forEach((c) => {
      this.renderer.removeClass(this.el.nativeElement, c);
    });

    // add the given elevation class
    const newClass = `mat-elevation-z${amount}`;
    this.renderer.addClass(this.el.nativeElement, newClass);
  }

}
