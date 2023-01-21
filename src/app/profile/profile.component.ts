import { Component, ElementRef, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['profile.component.css']
})
export class ProfileComponent implements OnInit {
  courseHTML: any
  resArray!: String[][];
  clicked = false;
  name!:String;
  file!:string;
  @ViewChild("sel") sel!: ElementRef;
  @ViewChild("msg")msg!:ElementRef;
  @ViewChild("sel1") sel1!: ElementRef;
  isLoggedOut!:boolean;
  constructor(private authService:AuthService,
    private router :Router,
    private sanitized: DomSanitizer) { this.isLoggedOut =false }

  ngOnInit(){
    this.authService.getProfile().subscribe({
      next: (profile) =>{console.log(profile),this.name=profile.user.name},
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
  })
  // this.authService.getCourses().subscribe(data=>{
  //   let resultArray: any[][]=[]
  //   console.log("In here")
  //   console.log(data);
  //  data.forEach((docs: any,err: any) =>{
  //        console.log(docs);
  //        let temp=[];
  //            temp.push(docs.name);
  //            temp.push(docs.materials);
  //            console.log(temp);
  //            resultArray.push(temp);
  //            this.resArray=resultArray
  //   })
  //   console.log(this.resArray);
  // })
  }
  ngAfterViewInit(){
    console.log(this.sel);
    console.log(this.msg);
  }
  onLogoutClick()
   {
    this.authService.logout();
    this.isLoggedOut=true;
    this.router.navigate(['login']);

   }
  //  course = [
  //   {  "ID": "001",
  //     "Course_Name": "Operating Systems",
  //     "Materials" : ["https://drive.google.com/drive/folders/1vY6yZz6zWeYK-kK-_AiVHY0klYmb6B0h?usp=share_link"]
  //   },
  //   { "ID": "002",
  //     "Course_Name": "Data Structures",
  //     "Materials" : ["https://drive.google.com/drive/folders/1iW_HkdsVUXu_yoN8da_AHAfltnKQPCIh?usp=share_link","https://drive.google.com/drive/folders/1Q-MAklN215e2pCOy_NgdmSkPxKQOfqyU?usp=share_link"]
  //   },
  //   { "ID": "003",
  //     "Course_Name": "Angular",
  //     "Materials" : ["https://docs.google.com/document/d/1f_dFbn6t1UJM2dLunYgERoZw-WF0HEnuwuzAkCfsJJM/edit?usp=share_link"]
  //   },
  // ];
    load(){
      this.authService.getCourses().subscribe(data=>{
        let resultArray: any[][]=[]
        console.log("In here")
        console.log(data);
       data.forEach((docs: any,err: any) =>{
             console.log(docs);
             let temp=[];
                 temp.push(docs.name);
                 temp.push(docs.materials);
                 console.log(temp);
                 resultArray.push(temp);
                 this.resArray=resultArray
        })
        console.log(this.resArray);
      })
    }
   populateSelect() {
    this.load();
    console.log(this.resArray[1][1]);
    this.clicked=true;
    console.log("into the function");
    // the json.

    for (let i = 0; i < this.resArray.length; i++) {
        let opt =(this.resArray[i][0]).toString();
       console.log(opt);
       let st=1
      // populate select element with json.
      let id =<HTMLSelectElement>document.getElementById('sele');
       id.options.add(new Option(opt,opt))
       let id1 =<HTMLSelectElement>document.getElementById('sele1');
       id1.options.add(new Option(opt,opt))
      // this.courseHTML= this.sanitized.bypassSecurityTrustHtml( this.sel.nativeElement.innerHTML+
      //      `<p>` + opt + `</p>`);
      // this.sel.nativeElement.innerHTML =  this.sanitized.bypassSecurityTrustHtml( this.sel.nativeElement.innerHTML+
      //   '<p>hey</p>');
        // this.sel1.nativeElement.innerHTML =  this.sanitized.bypassSecurityTrustHtml( this.sel1.nativeElement.innerHTML+
        //   `<option value="` + opt + `">` + `</option>`);
    }
  }
  show(){
    let c= this.sel.nativeElement.options[this.sel.nativeElement.selectedIndex].text;
    console.log("Inside show function");
    console.log(c);
    for(let i=0;i<this.resArray.length;i++)
    {
      if(this.resArray[i][0]===c)
      {
        let mat= (this.resArray[i][1]);
        console.log(mat+" helon"+ mat.length)
        this.msg.nativeElement.innerHTML='<p></p>'
        let count=1;
        for(let j=0;j<mat.length;j++)
        {
          console.log(mat+" "+"hey");
        let url=mat[j];
        console.log(mat[0]+" ha "+mat[1]);
        this.msg.nativeElement.innerHTML=this.msg.nativeElement.innerHTML+`<a href="`+url+`" style="font-size : 20px">`+c+`&nbsp Material `+count+`&nbsp;&nbsp;&nbsp`+`</a>`+`<br>`;
        count++;
        }
    }
     
  }
}
onUpload(){
  let fileLink=this.file;
  let c= this.sel1.nativeElement.options[this.sel1.nativeElement.selectedIndex].text;
    console.log("Inside show function");
    for(let i=0;i<this.resArray.length;i++)
    {
      let co=this.resArray[i];
      if(this.resArray[i][0]===c)
      {
        //let mat=(this.resArray[i][1]);
        let mat : string[]=[]
        for(let j=0;j<this.resArray[i][1].length;j++)
        {
          mat.push(this.resArray[i][1][j]);
        }
        console.log(mat.includes(fileLink)+" say "+mat.length)
        if(!mat.includes(fileLink))
        {
          mat.push(fileLink)
          console.log(mat+" not contains "+mat.includes(fileLink)+" "+mat.length);
        }
        console.log(mat.length+" "+mat[0]);
        const course={
          name : this.resArray[i][0],
          materials : mat
        }
        console.log("In here");
       
              this.authService.uploadCourse(course).subscribe(data=>{
                if(data.success) console.log("success ");
                else console.log("failed");
              })  
        // this.course[i]=co;
      
    }
    this.load(); 
}

}
}
