import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './componets/header/header.component';
import { CustominputComponent } from './componets/custominput/custominput.component';
import { LogoComponent } from './componets/logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent, CustominputComponent, LogoComponent],
  exports: [HeaderComponent, CustominputComponent, LogoComponent, ReactiveFormsModule],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule],
})
export class SharedModule {}
