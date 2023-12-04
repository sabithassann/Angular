import { Component, OnInit } from '@angular/core';
import { StudentModel } from './student.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit {
  studentModel: StudentModel = new StudentModel();
  formValue!: FormGroup;
  studentData: any;

  constructor(private api: StudentService, private formBuilder: FormBuilder) {}



ngOnInit(): void {
  this.formValue=this.formBuilder.group({
    roll: [''],
    name: [''],
    department: [''],
    marks: [''],


  })
  this.getAll();
}


save(): void {

  //his.setStudentModelFromForm();
  this.studentModel.roll = this.formValue.value.roll;
  this.studentModel.name = this.formValue.value.name;
  this.studentModel.department = this.formValue.value.department;
  this.studentModel.marks = this.formValue.value.marks;
  
  

  this.api.studentPost(this.studentModel)
    .subscribe(
      res => {
        console.log(res);
        alert("Student Added Successfully");
        this.formValue.reset();
        this.getAll();
      },
      err => {
        alert("Data Not Saved");
      }
    );
}


  // saveStudent(): void {
  //   this.setStudentModelFromForm();

  //   this.api.studentPost(this.studentModel)
  //     .subscribe(
  //       res => {
  //         console.log('Response:', res);
  //         alert("Student Added");
  //         this.formValue.reset();
  //         this.getAll();
  //       },
  //       err => {
  //         console.error('Error:', err);
  //         alert("Data Not saved");
  //       }
  //     );
  // }

  setStudentModelFromForm(): void {
    this.studentModel.roll = this.formValue.value.roll;
  this.studentModel.name = this.formValue.value.name;
  this.studentModel.department = this.formValue.value.department;
  this.studentModel.marks = this.formValue.value.marks;

  }

  getAll(): void {
    this.api.getAllStudent()
      .subscribe(res => {
        this.studentData = res;     
      });
  }

  deleteStudent(row: any): void {
    this.api.deleteStudent(row.id)
      .subscribe(res => {
        console.log(res);
        alert("Employee Deleted")
        this.formValue.reset();
        this.getAll();
      },
      err => {
        alert("Data Not Saved")
      });
  }

  onEdit(row: any): void {
    this.studentModel.roll = row.roll;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['department'].setValue(row.department);
    this.formValue.controls['marks'].setValue(row.marks);

    
  }

  studentEdit(): void {
    this.studentModel.roll = this.formValue.value.roll;
    this.studentModel.name = this.formValue.value.name;
    this.studentModel.department = this.formValue.value.department;
    this.studentModel.marks = this.formValue.value.marks;




    this.api.editStudent(this.studentModel.roll, this.studentModel)
      .subscribe(res => {
        console.log(res);
        alert("Student Updated Successfully")
        this.formValue.reset();
        this.getAll();
      },
      err => {
        alert("Data Not Updated")
      });
  }
}
