// Your code here
function createEmployeeRecord(empArr) {
    return {
      firstName: empArr[0],
      familyName: empArr[1],
      title: empArr[2],
      payPerHour: empArr[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(empArrs) {
    return empArrs.map(empArr => createEmployeeRecord(empArr));
  }
  
  function createTimeInEvent(empRec, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    empRec.timeInEvents.push({ type: "TimeIn", date, hour: parseInt(hour, 10) });
    return empRec;
  }
  
  function createTimeOutEvent(empRec, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    empRec.timeOutEvents.push({ type: "TimeOut", date, hour: parseInt(hour, 10) });
    return empRec;
  }
  
  function hoursWorkedOnDate(empRec, date) {
    const timeIn = empRec.timeInEvents.find(event => event.date === date).hour;
    const timeOut = empRec.timeOutEvents.find(event => event.date === date).hour;
    return (timeOut - timeIn) / 100;
  }
  
  function wagesEarnedOnDate(empRec, date) {
    const hours = hoursWorkedOnDate(empRec, date);
    return hours * empRec.payPerHour;
  }
  
  function allWagesFor(empRec) {
    const datesWorked = empRec.timeInEvents.map(event => event.date);
    const wages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(empRec, date), 0);
    return wages;
  }
  
  function calculatePayroll(empRecs) {
    const totalWages = empRecs.reduce((total, empRec) => total + allWagesFor(empRec), 0);
    return totalWages;
  }