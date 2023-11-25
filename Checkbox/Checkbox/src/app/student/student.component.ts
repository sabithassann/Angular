import { Component, OnInit } from '@angular/core';
import { StudentModel } from './student.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from '../services/student.service';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit{

  studentModel: StudentModel = new StudentModel();
  formValue!: FormGroup;
  studentData: any;

  constructor(private api: StudentService, private formBuilder: FormBuilder) {}



ngOnInit(): void {
  this.formValue=this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    gender: [''],
    hobby_reading: [false],
    hobby_gaming:[false],
    hobby_fishing:[false],
    hobby_sleeping:[false],

  })
  this.getAll();
}


save(): void {

  //his.setStudentModelFromForm();
  this.studentModel.firstName = this.formValue.value.firstName;
  this.studentModel.lastName = this.formValue.value.lastName;
  this.studentModel.gender = this.formValue.value.gender;
  
  let hobbies: string[] = [];
  if (this.formValue.value.hobby_reading) {
    hobbies.push('Reading');
  }
  if (this.formValue.value.hobby_gaming) {
    hobbies.push('Gaming');
  }
  if (this.formValue.value.hobby_fishing){
    hobbies.push('Fishing')
  }
  if (this.formValue.value.hobby_sleeping){
    hobbies.push('Sleeping')
  }
  this.studentModel.hobby = hobbies;

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
  this.studentModel.firstName = this.formValue.value.firstName;
  this.studentModel.lastName = this.formValue.value.lastName;
  this.studentModel.gender = this.formValue.value.gender;
  
  let hobbies: string[] = [];
  if (this.formValue.value.hobby_reading) {
    hobbies.push('Reading');
  }
  if (this.formValue.value.hobby_gaming) {
    hobbies.push('Gaming');
  }
  if (this.formValue.value.hobby_fishing){
    hobbies.push('Fishing')
  }
  if (this.formValue.value.hobby_sleeping){
    hobbies.push('Sleeping')
  }
  this.studentModel.hobby = hobbies;

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
    this.studentModel.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['gender'].setValue(row.gender);

    this.formValue.controls['hobby_reading'].setValue(row.hobby.includes('Reading'));
    this.formValue.controls['hobby_gaming'].setValue(row.hobby.includes('Gaming'));
  }

  studentEdit(): void {
     this.setStudentModelFromForm();

  //   this.studentModel.firstName = this.formValue.value.firstName;
  // this.studentModel.lastName = this.formValue.value.lastName;
  // this.studentModel.gender = this.formValue.value.gender;
  
  // let hobbies: string[] = [];
  // if (this.formValue.value.hobby_reading) {
  //   hobbies.push('Reading');
  // }
  // if (this.formValue.value.hobby_gaming) {
  //   hobbies.push('Gaming');
  // }
  // if (this.formValue.value.hobby_fishing){
  //   hobbies.push('Fishing')
  // }
  // if (this.formValue.value.hobby_sleeping){
  //   hobbies.push('Sleeping')
  // }
  // this.studentModel.hobby = hobbies;




    this.api.editStudent(this.studentModel.id, this.studentModel)
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

 



 

