function linkToggleStyle(_parentNode, _normalStyle, _activeStyle){
    _parentNode.addEventListener("click", toggleStyleHandler, false);
    function toggleStyleHandler(e){
        let targetElement = e.target;
        if(targetElement.nodeName === "A"){ 
            console.log(targetElement.nodeName)               
            let linkArr = _parentNode.getElementsByTagName("a");
            console.log(linkArr.length) 
            for(let i = 0; i < linkArr.length; i++){
                linkArr[i].style.cssText = _normalStyle;
            }
            targetElement.style.cssText = _activeStyle;              
        }
    }
}
let navList = document.getElementById("nav_list");
let navActiveStyle = "font-weight: bold; border-bottom: 2.5px solid #4baf50;";  
let navNormalStyle = "color:#404040; border-bottom: 0; font-weight:normal";
linkToggleStyle(navList, navNormalStyle, navActiveStyle) 

let gradeList = document.getElementById("grade_list");
let gradeNormalStyle = "color:#404040;; background-color: inherit; border-radius: 0;";
let gradeActiveStyle = "color: #fff; background-color: #4baf50; border-radius: 1rem;";
gradeList.getElementsByTagName("a")[0].style = gradeActiveStyle;
linkToggleStyle(gradeList, gradeNormalStyle, gradeActiveStyle)

let subjectList = document.getElementById("subject_list");
let subjectNormalStyle = "color:#404040;; background-color: inherit; border-radius: 0;";
let subjectActiveStyle = "color: #fff; background-color: #4baf50; border-radius: 1rem;";
subjectList.getElementsByTagName("a")[0].style = subjectActiveStyle;
linkToggleStyle( subjectList, subjectNormalStyle, subjectActiveStyle)