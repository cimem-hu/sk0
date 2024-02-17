import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { provideStore } from '@ngrx/store';
import { authStore } from '../store/auth.reducer';
import { RouterModule } from '@angular/router';


describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        LoginPage,
        RouterModule.forRoot([]),
      ],
      providers: [
        provideStore({ auth: authStore }),
      ],
    });

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});