class studentClass {
    constructor(id, fName, lName, marks,avg, year) {
        this.id = id;
        this.fName = fName;
        this.lName = lName;
        this.avg = avg;
        this.year = year;
        this.minMark = 70;
        this.marks = marks;
    }
    isOver() {
        if (this.avg < this.minMark)
            return false;
        return true;
    }
}
