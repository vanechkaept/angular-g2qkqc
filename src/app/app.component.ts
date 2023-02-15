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
  otherControl = new FormControl<string>('qqqqq');
  dynamicComponet: Type<CustomInputComponent> = CustomInputComponent;
}
