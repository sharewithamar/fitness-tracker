import { AuthService } from '../../auth/auth.service';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth: boolean;
  authSubscription: Subscription;
  @Output() sidenavToggle = new EventEmitter<void>();
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(
      authStatus => {
        this.isAuth = authStatus;
      }
    );
  }
  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
