import { Component, forwardRef, HostBinding, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  template: `
    <input
      [ngModel]="value"
      (ngModelChange)="onValueChange($event)"
      (blur)="onInputBlurred()"
    />
    <br/>
    old:  
    <div *ngIf='!checkbox'>
    <ng-container [ngTemplateOutlet]="buttonContent"></ng-container>
    </div>
    <br/>
    new:  
    <div *ngIf='checkbox'>
    <ng-container [ngTemplateOutlet]="buttonContent"></ng-container>
    </div>
    <br/>
    <button (click)='checkbox = !checkbox'>click</button>
    {{checkbox}}

    <ng-template #buttonContent>
      <ng-content></ng-content>
    </ng-template>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
})
export class CustomInputComponent implements ControlValueAccessor {
  public value: string;
  public onChange: (value: string) => void;
  public onTouched: () => void;

  public checkbox = true;

  public writeValue(value: string): void {
    this.value = value;
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public onValueChange(value: string): void {
    this.writeValue(value);
    this.onChange(value);
  }

  public onInputBlurred(): void {
    this.onTouched();
  }
}
