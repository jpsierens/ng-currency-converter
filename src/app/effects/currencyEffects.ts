import { CurrenciesUpdatedAction } from './../actions/currency';
import { CurrencyService } from './../services/currency.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';

import * as currency from '../actions/currency';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

// dealing with side effects in ngrx with effects (think of thunks and sagas in react redux)
@Injectable()
export class CurrencyEffects {
    @Effect()
    update$: Observable<Action> = this.actions$
        // listening on the observable of all actions, until an action of the
        // type CURRENCIESUPDATE comes along.
        .ofType(currency.CURRENCIESUPDATE)
        // For each of these actions of the type CURRENCIESUPDATE we call
        // currencyService and ask it for the current rates.
        .switchMap(() =>
            this.currencyService
                .getRates()
                .map(data => new CurrenciesUpdatedAction(data))
        );

    constructor(
        private currencyService: CurrencyService,
        private actions$: Actions
    ) {}
}
