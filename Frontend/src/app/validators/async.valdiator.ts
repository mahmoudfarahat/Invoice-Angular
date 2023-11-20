import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { delay, map, Observable, pipe, retry } from "rxjs";
import { ajax } from "rxjs/ajax";

export function invoiceNumberValidator(): AsyncValidatorFn
{
return(control:AbstractControl):Observable<ValidationErrors|null>=>{

  // return checkname().pipe(
  //   map(res =>{
  //     // console.log("res is", res)
  //     for (const iterator of res) {
  // console.log(iterator.Name)
  //         if( iterator.Name === control.value){
  //       return   {productExits : true}
  //         }


  //     }
  //     return  null
  //   })

 return checkname().pipe(
    map(res =>{
   return refresh(res,control)
    })



  )
}

function refresh(res:any , control:any){
  let isExits = res.data.some((a:any)=> a.InvoiceNumber ==  control.value)
   return (isExits == true )?    {productExits : true} : null
}


function checkname():Observable<any>{
  return ajax.getJSON('http://localhost:1081/api/Inovices')

}
}
