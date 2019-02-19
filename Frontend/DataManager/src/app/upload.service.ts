import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest, HttpEventType, HttpResponse} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class UploadService {

  url:string = 'https://localhost:5001/api/files';

  constructor(private httpClient:HttpClient) {

   }
   public upload(files:Set<File>):{[ key:string]: {progress:Observable<number>}}{
        const status: {[key:string]:  {progress:Observable<number>}} = {};
        files.forEach( file => {

          const formData: FormData = new FormData();
          formData.append('file',file, file.name);

          const req = new HttpRequest('POST', this.url,formData, {
            reportProgress: true
          });

          const progress = new Subject<number>();

          this.httpClient.request(req).subscribe(event => {
            if(event.type === HttpEventType.UploadProgress){
              const percentDone = Math.round(100*event.loaded / event.total);
              progress.next(percentDone);
            }else if (event instanceof HttpResponse){
              progress.complete();
            }
          });

          status[file.name] = {
            progress: progress.asObservable()
          };

        });
        return status;
      }
   }
   

  

}
