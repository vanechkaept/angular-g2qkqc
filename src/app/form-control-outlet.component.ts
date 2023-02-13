import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  forwardRef,
  Host,
  Injector,
  Input,
  OnInit,
  SkipSelf,
  TemplateRef,
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
      <button (click)='createComponent()'> regenerate component</button>
      <ng-container #container></ng-container>
      
      <ng-template #templateRef>
         <ng-content></ng-content>
      </ng-template>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormControlOutletComponent),
      multi: true,
    },
  ],
})
export class FormControlOutletComponent implements OnInit {
  @Input() dynamicComponent: Type<CustomInputComponent>;
  @Input() contentRef: TemplateRef<Element>;

  componentRef: ComponentRef<CustomInputComponent>;

  @ViewChild('container', { read: ViewContainerRef, static: true })
  componentContainer!: ViewContainerRef;

  projectableNodes: any[][];

  @ViewChild('templateRef', {
    static: true,
    read: TemplateRef,
  })
  templateRef: TemplateRef<any>;

  // set templateRef(t: ViewContainerRef) {
  //   console.log('asdasd', this.projectableNodes);
  //   // this.projectableNodes = [t.createEmbeddedView().rootNodes];
  // }

  constructor(
    public injector: Injector,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.createComponent();
    console.dir(this.contentRef);

   
  }

  ngAfterViewInit() {
    console.dir(this.contentRef);
  }

  ngOnDestroy() {
    this.componentRef.destroy();
  }

  createComponent(): void {
    this.componentContainer.clear();

    // const projectableNodes = this.contentRef.createEmbeddedView();
    // console.dir('asd', projectableNodes);
    // .createEmbeddedView(this.componentRef).rootNodes;

    console.log('1111', this.templateRef);
    const d = this.templateRef.createEmbeddedView({});
    console.log(d.rootNodes);

    const ngControl = this.injector.get(NgControl);
    this.componentRef = this.componentContainer.createComponent(
      this.dynamicComponent,
      {
        projectableNodes: [
          d.rootNodes
          // [this.contentRef.elementRef.nativeElement.firstChild],
          // [this.contentRef.elementRef.nativeElement.rootNodes],
        ],
        // projectableNodes: [[this.contentProjection?.firstChild]]
        // projectableNodes: [[text]]
      }
    );
    

    ngControl.valueAccessor = this.componentRef.instance;
  }
}
