import { HttpClient } from '@angular/common/http';
import { Currency } from './../models/currency';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class CurrencyService {
    ratesUrl = 'https://api.fixer.io/latest?base=USD';

    constructor(private http: HttpClient) {}

    getRates(): Observable<Currency[]> {
        return this.http.get<any>(this.ratesUrl).map(result => {
            return Object.keys(result.rates).map((key, index) => {
                return { code: key, value: result.rates[key] };
            });
        });
    }
}
