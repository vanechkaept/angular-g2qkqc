import { Component, TemplateRef, Type, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomInputComponent } from './custom-input.component';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  formControl = new FormControl<string>('data');
  dynamicComponet: Type<CustomInputComponent> = CustomInputComponent;

  // @ViewChild('content')
  // defaultTabButtonsTpl: TemplateRef<any>;

  ngAfterViewInit() {
    // console.log('defaultTabButtonsTpl ', this.defaultTabButtonsTpl);
  }
}
