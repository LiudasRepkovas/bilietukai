import { Injectable }     from '@angular/core';
import { CanActivate, Router,  ActivatedRouteSnapshot,  RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor( private router: Router ) {}
    
    canActivate() {
        console.log('AuthGuard#canActivate called');
        if(Meteor.userId()){
            return true;
        } else {
            this.router.navigate(['/login']);
        }
    }
}
