import { Directive, Input, ElementRef, Renderer } from '@angular/core';
import { DomController } from 'ionic-angular';

@Directive({
  selector: '[drag]',
  host: {
    '(pan)': 'handlePan($event)'
  }
})
export class Drag {

  @Input() startLeft: any;
  @Input() startTop: any;

  constructor(public element: ElementRef, public renderer: Renderer, public domController: DomController) {
    console.log('Hello Drag Directive');
  }

  ngAfterViewInit() {
    console.log(this.startLeft, this.startTop);

    this.renderer.setElementStyle(this.element.nativeElement, 'position', 'absolute');
    this.renderer.setElementStyle(this.element.nativeElement, 'left', this.startLeft + 'px');
    this.renderer.setElementStyle(this.element.nativeElement, 'top', this.startTop + 'px');
  }

  handlePan(e) {
    console.log(e);
    console.log('x', e.center.x, 'y', e.center.y);

    let width = this.element.nativeElement.clientWidth;
    let height = this.element.nativeElement.clientHeight;

    console.log('width', width, 'height',height);

    let newLeft = e.center.x - width / 2;
    let newTop = e.center.y - height / 2;

    console.log(newLeft);

    this.domController.write(() => {
      this.renderer.setElementStyle(this.element.nativeElement, 'left', newLeft + 'px');
      this.renderer.setElementStyle(this.element.nativeElement, 'top', newTop + 'px');
    });

  }

}
