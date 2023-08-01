import path from 'path';
import fs from 'fs';
import {Student} from '../types/student';

export interface GetMany {
    status: boolean,
    message: string,
    data: Student[]
}

export default {
    getMany: (): GetMany => {
        try {
            let students:Student[] = JSON.parse(fs.readFileSync(path.join(__dirname,"student.json"), { encoding: 'utf8' }));
            return {
                status: true,
                message: "Get student ok!",
                data: students
            }
        }catch(err) {
            return {
                status: false,
                message: "Get student failed!",
                data: []
            }
        }
    },
    getById: (studentId: number): GetMany => {
        try {
            let students:Student[] = JSON.parse(fs.readFileSync(path.join(__dirname,"student.json"), { encoding: 'utf8' }));
            students = students.filter(value => value.id == studentId);
            return {
                status: true,
                message: "Get student by id ok!",
                data: students
            }
        }catch(err) {
            return {
                status: false,
                message: "Get student by id failed!",
                data: []
            }
        }
    },
    create: (newStudent: Student) => {
        try {
            let students:Student[] = JSON.parse(fs.readFileSync(path.join(__dirname,"student.json"), { encoding: 'utf8' }));
            students.push(newStudent);
            fs.writeFileSync(path.join(__dirname,"student.json"), JSON.stringify(students));
            return {
                status: true,
                message: "Create ok!",
                data: students
            }
        }catch(err) {
            return {
                status: false,
                message: "Create failed!",
                data: []
            }
        }
    },
    delete: (studentId:number) => {
        try {
            let students:Student[] = JSON.parse(fs.readFileSync(path.join(__dirname,"student.json"), { encoding: 'utf8' }));
            students = students.filter((value, index) => value.id != studentId);
            fs.writeFileSync(path.join(__dirname,"student.json"), JSON.stringify(students));
            return {
                status: true,
                message: "Delete ok!",
                data: students
            }
        }catch(err) {
            return {
                status: false,
                message: "Delete failed!",
                data: []
            }
        }
    },
    update: (studentId:number, patchData:any) => {
        try {
            let students:Student[] = JSON.parse(fs.readFileSync(path.join(__dirname,"student.json"), { encoding: 'utf8' }));
            students = students.map((value, index) => {
                if (value.id == studentId) {
                    return {
                        ...value,
                        ...patchData
                    }
                }
                return value
            });
            fs.writeFileSync(path.join(__dirname,"student.json"), JSON.stringify(students));
            return {
                status: true,
                message: "Update ok!",
                data: students
            }
        }catch(err) {
            return {
                status: false,
                message: "Update failed!",
                data: []
            }
        }
    }
}