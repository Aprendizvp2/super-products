import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: false,
})
export class ForgotPasswordPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  firebaseSvc = inject(FirebaseService);
  utilsScv = inject(UtilsService);

  ngOnInit() {}

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsScv.loading();
      await loading.present();

      this.firebaseSvc
        .resetPassword(this.form.value.email)
        .then((_res) => {
          this.utilsScv.toast({
            message:
              'Te hemos enviado un correo para restablecer tu contraseña',
            duration: 3000,
            color: 'primary',
            position: 'top',
            icon: 'mail-outline',
          });

          this.utilsScv.routerLink('/auth');
          this.form.reset();
        })
        .catch((err) => {
          console.log(err);
          this.utilsScv.toast({
            message: err.message,
            duration: 3000,
            color: 'danger',
            position: 'top',
            icon: 'alert-circle-outline',
          });
        })
        .finally(() => {
          loading.dismiss();
        });
    }
  }
}
