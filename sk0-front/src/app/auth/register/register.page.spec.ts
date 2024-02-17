import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { provideStore } from '@ngrx/store';
import { authStore } from '../store/auth.reducer';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      providers: [
        provideStore({ auth: authStore })
      ],
    })
      .createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});