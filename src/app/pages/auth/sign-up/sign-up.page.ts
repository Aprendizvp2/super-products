import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/modules/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: false,
})
export class SignUpPage implements OnInit {
  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  firebaseSvc = inject(FirebaseService);
  utilsScv = inject(UtilsService);

  ngOnInit() {}

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsScv.loading();
      await loading.present();

      this.firebaseSvc
        .signUp(this.form.value as User)
        .then(async (res) => {
          await this.firebaseSvc.updateUser(this.form.value.name);

          let uid = res.user.uid;
          this.form.controls.uid.setValue(uid);

          this.setUserInfo(uid);

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

  async setUserInfo(uid: string) {
    if (this.form.valid) {
      const loading = await this.utilsScv.loading();
      await loading.present();

      let path = `users/${uid}`;
      delete this.form.value.password;

      this.firebaseSvc
        .setDocument(path, this.form.value)

        .then(async (res) => {
          await this.firebaseSvc.updateUser(this.form.value.name);

          this.utilsScv.saveInLocalStorage('user', this.form.value);
          this.utilsScv.routerLink('/main/home');
          this.form.reset();

          console.log(res);
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
