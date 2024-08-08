import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  NgModule,
} from "@angular/core"
import autoAnimate, { AutoAnimateOptions } from '@formkit/auto-animate';

@Directive({
  selector: '[autoAnimate]',
})
export class AutoAnimateDirective implements AfterViewInit {
  @Input() options?: Partial<AutoAnimateOptions>

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    autoAnimate(this.el.nativeElement, this.options || {})
  }
}

@NgModule({
  declarations: [AutoAnimateDirective],
  exports: [AutoAnimateDirective],
})
export class AutoAnimateModule { }