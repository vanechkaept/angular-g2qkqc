import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
  Component,
  ComponentFactoryResolver,
  forwardRef,
  Host,
  Injector,
  Input,
  OnInit,
  SkipSelf,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ControlContainer, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { CustomInputComponent } from './custom-input.component';

@Component({
  selector: 'form-control-outlet',
  template: `
      <ng-container #container></ng-container>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormControlOutletComponent),
      multi: true,
    },
  ],
})
export class FormControlOutletComponent implements OnInit, AfterContentInit {
  @Input() dynamicComponent: Type<CustomInputComponent>;

  @ViewChild('container', { read: ViewContainerRef, static: true })
  componentContainer!: ViewContainerRef;

  constructor(
    public injector: Injector,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this._createComponent();
  }

  ngAfterContentInit(){
   
  }


  private _createComponent(): void{
    const ngControl = this.injector.get(NgControl);
    const componentRef = this.componentContainer.createComponent(
      this.dynamicComponent
      // {
      //   projectableNodes,
      //   // projectableNodes: [[this.contentProjection?.firstChild]]
      //   // projectableNodes: [[text]]
      // }
    );

    ngControl.valueAccessor = componentRef.instance;
  }
}
