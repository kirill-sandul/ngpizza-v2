import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent implements OnInit {

  @Input() on_click: Function = () => {};
  @Input() class_name: string = '';

  class_default: string = 'button ';

  constructor() {}

  ngOnInit(): void {}

}
