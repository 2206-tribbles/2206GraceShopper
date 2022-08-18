function reqUser(req, res, next) {
    try {
        if (!req.user) {
            res.status(401);
            next({
                name: "UserNotLoggedIn",
                message: "You must be logged in to do this."
            });
        }
    } catch (error){
        console.error(error)
    }
}

// function convertDate(date, format) {
//     //parse date
//     const modDate = new Date(date);

//     const newDay = modDate.getDate();
//     const newMonth = modDate.getMonth() + 1;
//     const newYear = modDate.getFullYear;

//     format = format.replace("MM",
//     newMonth.toString().padStart(2,"0"));

//     if (format.indexOf("yyyy") > -1) {
//         format = format.replace("yyyy", newYear.toString());
//     } else if (format.indexOf("yy") > -1) {
//         format = format.replace("yy",newYear.toString().substr(2,2));
//     }

//     format = format.replace("dd", newDay.toString().padStart(2,"0"));

//     return format;
// }

// console.log('Converted date: '+ convertDate('2021-12-10', 'MM-dd-yyyy'));

module.exports = {reqUser, convertDate}
