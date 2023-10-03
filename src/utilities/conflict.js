export const overlapDetected = (courses, c) => {
    //console.log("checking overlap with ", courses, c)
    /*!Array.isArray(courses)
    ? console.error("Invalid courses passed to overlapDetected:", courses)
    : courses.some(course => checkOverlap(course, c))*/
    if (!Array.isArray(courses)) {
        console.error("Invalid courses passed to overlapDetected:", courses);
        return false;
    }
    //console.log("got here");
    const overlapped = courses.some(course => checkOverlap(course, c));
    //console.log("overlapDetected returning ", overlapped);
    return overlapped;
};

export const conflicts = (selectedList, courses) => {
    const overlaps = selectedList.map(item => 
        Object.entries(courses).filter(([id, otherCourse]) => checkOverlap(item, otherCourse))
      )
      .flat();

    console.log(overlaps);

    console.log(filteredConflicts(selectedList, overlaps));

    return filteredConflicts(selectedList, overlaps);
}
    

export const filteredConflicts = (selectedList, overlaps) => 
    overlaps.filter(([id, course1]) => {
        //console.log("ughhhh ", course1);
        
        const isMatch = selectedList.some(course2 => {
            //console.log(course1.term, course2.term, course1.title, course2.title, course1.number, course2.number,  
            //    course1.meets, course2.meets);
            return (course1.term === course2.term && 
            course1.title === course2.title && 
            course1.number === course2.number && 
            course1.meets === course2.meets);
        });
        
        if (isMatch) {
            console.log("Match found for:", course1);
        }
        
        return !isMatch;
    });

export const checkOverlap = (course1, course2) => {

    const c1Times = getTimes(course1);
    const c2Times = getTimes(course2);
    const c2Days = getDays(course2);
    const c1Days = getDays(course1);

    if (course1.term === course2.term){
        return compareDays(c1Days, c2Days) && compareTimes(c1Times, c2Times);
    }
    return false;
};

const compareTimes = (c1Times, c2Times) => {
    const c1Start = convertTimeToNumber(c1Times[0]);
    const c1End = convertTimeToNumber(c1Times[1]);
    const c2Start = convertTimeToNumber(c2Times[0]);
    const c2End = convertTimeToNumber(c2Times[1]);

    const c = c1Start < c2End && c1End > c2Start; /*true means overlap*/
    //console.log("compareTimes returning ", c);
    return c;
};

const compareDays = (c1Days, c2Days) => {
    //console.log("checking day overlap with ", c1Days, c2Days);
    if (!Array.isArray(c1Days)) {
        console.error("Invalid days passed to compareDays:", c1Days);
        return false;
    }
    const c = c1Days.some(day => c2Days.includes(day));
    //console.log("compareDays returning ", c);
    return c;
};

const convertTimeToNumber = (time) => {
    const hours = Number(time.split(':')[0]);
    const minutes = Number(time.split(':')[1]) / 60;
    return hours + minutes;
}

const getTimes = (course) => {
    //console.log("getting time of ",course);
    
    if (!course.meets || typeof course.meets !== "string") {
        console.error("Invalid meets data in course for time extraction:", course);
        return [];
    }
    const timePart = course.meets.split(" ")[1];
    return timePart ? timePart.split("-") : [];
}

const getDays = (course) => {
    if (!course.meets || typeof course.meets !== "string") {
        console.error("Invalid meets data in course:", course);
        return [];
    }
    return course.meets === ""
    ? ""
    : course.meets.match(/M|Tu|Th|W|F|Sa|Su/g) || [];
}

export const conf = (conflicted, i_course) => conflicted.some(([id, course]) => course === i_course);