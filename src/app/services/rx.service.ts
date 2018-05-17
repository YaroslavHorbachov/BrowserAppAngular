import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {forkJoin} from 'rxjs/observable/forkJoin';

@Injectable()
export class RxService {

  public _forkJoin(arr: Array<Observable>) {
    return forkJoin(arr);
  }

}
