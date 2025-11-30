import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/modules/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: false,
})
export class AuthPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  firebaseSvc = inject(FirebaseService);
  utilsScv = inject(UtilsService);

  ngOnInit() {}

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsScv.loading();
      await loading.present();

      this.firebaseSvc
        .signIn(this.form.value as User)
        .then((res) => {
          this.getUserInfo(res.user.uid);
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

  async getUserInfo(uid: string) {
    if (this.form.valid) {
      const loading = await this.utilsScv.loading();
      await loading.present();

      let path = `users/${uid}`;

      this.firebaseSvc.getDocument(path);

      await this.firebaseSvc
        .getDocument(path)

        .then((user: User) => {
          this.utilsScv.saveInLocalStorage('user', user);
          this.utilsScv.routerLink('/main/home');
          this.form.reset();

          this.utilsScv.toast({
            message: `Te damos la bienvenida ${user.name}`,
            duration: 2000,
            color: 'primary',
            position: 'top',
            icon: 'person-circle-outline',
          });
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
