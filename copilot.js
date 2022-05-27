function betweenTwoDates(startDate, endDate){
    var start = new Date(startDate.replace(/-/g, "/"));
    var end = new Date(endDate.replace(/-/g, "/"));
    if(start > end){
        return 0;
    }
    var days = (end - start) / (1000 * 60 * 60 * 24);
    return days;
}
    



console.log(betweenTwoDates('2019-01-01', '2019-04-27'));
