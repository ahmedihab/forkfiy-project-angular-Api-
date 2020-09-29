import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _HttpClient: HttpClient) { }

    recpies = ['potato','kebab', 'chili','pizza','pasta' ]
  GetData()
   {

    let found = [] ;

    for (let i of this.recpies)
    {
      found.push( this._HttpClient.get(`https://forkify-api.herokuapp.com/api/search?q=${i}`))
    }

    return found
  }
}
