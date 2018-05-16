import {OptionsModel} from './options.model';
import {TableData} from './tabledata.model';

export class JsonPDF {
  constructor(private type: string,
              private options: OptionsModel,
              private data: TableData){}
}
