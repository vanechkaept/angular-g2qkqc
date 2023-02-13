import { CommonModule } from '@angular/common';
import {
  Component,
  ComponentFactoryResolver,
  forwardRef,
  Host,
  Injector,
  Input,
  SkipSelf,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ControlContainer, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { CustomInputComponent } from './custom.input';

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
export class FormControlOutletComponent {
  @Input() dynamicComponet: Type<CustomInputComponent>;

  @ViewChild('container', { read: ViewContainerRef })
  componentContainer!: ViewContainerRef;

  constructor(
    public injector: Injector,
    private viewContainerRef: ViewContainerRef
  ) {}

  public ngOnInit(): void {
    const ngControl = this.injector.get(NgControl);
    // const componentFactory =
    //   this.componentFactoryResolver.resolveComponentFactory(
    //     CustomInputComponent
    //   );
    const componentRef = this.componentContainer.createComponent(
      this.dynamicComponet
      // {
      //   projectableNodes,
      //   // projectableNodes: [[this.contentProjection?.firstChild]]
      //   // projectableNodes: [[text]]
      // }
    );

    ngControl.valueAccessor = componentRef.instance;
  }
}
