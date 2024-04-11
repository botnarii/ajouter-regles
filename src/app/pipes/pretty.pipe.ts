import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'pretty',
    standalone: true,
})

export class PrettyJsonPipe implements PipeTransform {

    transform(val: any) {
        if (!val) {
            return '';
        }
        const jsonText: string = JSON.stringify(val, undefined, 4);
        return jsonText.replace(' ', '&nbsp;').replace('\n', '<br/>');
    }
}
