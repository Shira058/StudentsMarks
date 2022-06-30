var allStudents = [];
window.onpageshow = loadStudents();

function loadStudents() {
    fetch('Students.json')
        .then(data => {
            return data.json();
        }).then(data => {
            data.forEach(student => {
                createStudent(student);
            })
        }).then(data => {
            createStudentTable(allStudents)
        });
}

function createStudent(student) {
    let name = student.fullname.split(' ');
    let fName = name[0];
    let lName = name[1];
    let year = student.startYear.split('-')[0];
    let sum = 0;
    student.marks.forEach((mark) => {
        sum += mark;
    })
    let avg = sum / student.marks.length;
    newStudent = new studentClass(student.id, fName, lName, student.marks, avg, year)
    allStudents.push(newStudent);
}

function createStudentTable(studentArry) {
    var table = document.getElementsByTagName('table')[0];
    studentArry.forEach(student => {
        var row = document.createElement('tr')
        var id = document.createElement('td')
        var nodeId = document.createTextNode(student.id)
        var fName = document.createElement('td')
        var nodeFName = document.createTextNode(student.fName)
        var lName = document.createElement('td')
        var nodeLName = document.createTextNode(student.lName)
        var year = document.createElement('td')
        var nodeYear = document.createTextNode(student.year)
        var avg = document.createElement('td')
        var nodeAvg = document.createTextNode(student.avg)
        id.appendChild(nodeId)
        fName.appendChild(nodeFName)
        lName.appendChild(nodeLName)
        year.appendChild(nodeYear)
        avg.appendChild(nodeAvg)
        row.appendChild(id);
        row.appendChild(fName);
        row.appendChild(lName);
        row.appendChild(year);
        row.appendChild(avg);
        avg.addEventListener('click', function () {
            var anser = `student ${student.id} achived the marks:`
            Swal.fire({
                title: anser.toString(),
                text: student.marks,
                showConfirmButton: false

            })
        })
        row.addEventListener("dblclick", function () {
            let anser = "the student " + student.fName + " " + student.lName + " is"
            if (!student.isOver()) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: anser += " not over",
                    showConfirmButton: false
                })
            }
            else {
                Swal.fire({
                    icon: 'success',
                    title: 'Well Done!!',
                    text: anser += " over",
                    showConfirmButton: false

                })
            }
        })

        table.appendChild(row);
    })
}

function cleanTable() {
    var table = document.querySelector('table');
    var trs = document.querySelectorAll('tr');
    trs.forEach((tr, i) => {
        if (i != 0) {
            table.removeChild(tr);
        }
    })

}

function search() {
    var searchStudent = [];
    var input = document.querySelector('input');
    var searchData = input.value.toLowerCase();
    cleanTable();
    allStudents.filter(student => {
        if (student.fName.toLowerCase().includes(searchData) || student.lName.toLowerCase().includes(searchData))
            searchStudent.push(student);
    });
    createStudentTable(searchStudent);
}

function sortByYear() {
    cleanTable();
    allStudents.sort(function (a, b) {
        return (parseInt(b.year) - parseInt(a.year))
    });
    createStudentTable(allStudents);
}