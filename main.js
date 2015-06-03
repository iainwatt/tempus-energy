// CCGT Open Cycle Gas Tubine (Gas)
// OCGT Closed Cycle Gas Tubine (Gas)
// OIL Oil
// COAL Coal
// NUCLEAR Nuclear
// WIND Wind
// PS Pumped Storage (Other)
// NPSHYD Hydroelectric
// OTHER Other

// IC fuels 
// INTFR Interconnect to and from France
// INTIRL Interconnect to and from Ireland
// INTNED Interconnect to and from The Netherlands
// INTEW East-West Interconnect (To and from Ireland)
// IC This fuel type is an interconnect

var fuel =  [ { "_TYPE": "CCGT",
                "_IC": "N",
                "_VAL": "8145" },
              { "_TYPE": "OCGT",
                "_IC": "N",
                "_VAL": "600" },
              { "_TYPE": "INTFR",
                "_IC": "Y",
                "_VAL": "1996"},
              { "_TYPE": "CCGT",
                "_IC": "N",
                "_VAL": "8357"},
              { "_TYPE": "COAL",
                "_IC": "N",
                "_VAL": "7899"}, 
              { "_TYPE": "WIND",
                "_IC": "N",
                "_VAL": "4899"}];
                


                
function count (objArr) {
    var ic = [], nonIC = [], nonClass, CCGT = [], OCGT = [], OIL = [], COAL = [], NUCLEAR = [], WIND = [], PS = [], NPSHYD = [], OTHER = [], INTFR = [], INTIRL = [], INTNED = [], INTEW = [], totalNonIC = [];
    
    var sumNum = function(a,b) {
        return a + b;
    }; 
    
    // split up the data types 
    for (i = 0, x = objArr.length; i < x; i++) {
        if (objArr[i]._IC == "N") { nonIC.push(objArr[i]) }
        else if (objArr[i]._IC == "Y") { ic.push(objArr[i]) }
        else { nonClass.push(objArr[i]) }
    }
 
    // sorting all nonIC energy types into there own variable
    for (i = 0, y = nonIC.length; i < y; i++) {
        totalNonIC.push(nonIC[i]._VAL);
        // console.log(totalNonIC);
        switch (nonIC[i]._TYPE) {
         case "CCGT":
            CCGT.push(nonIC[i]._VAL);
            break;
         case "OCGT":
             OCGT.push(nonIC[i]._VAL);
             break;
        case "OIL":
            OIL.push(nonIC[i]._VAL);
            break;
        case "COAL":
            COAL.push(nonIC[i]._VAL);
            break;
        case "NUCLEAR":
            NUCLEAR.push(nonIC[i]._VAL);
            break;
        case "WIND":
            WIND.push(nonIC[i]._VAL);
            break;
        case "PS":
            PS.push(nonIC[i]._VAL);
            break;
        case "NPSHYD":
            NPSHYD.push(nonIC[i]._VAL);
            break;
        case "OTHER":
            OTHER.push(nonIC[i]._VAL);
            break;
        case "INTFR":
            INTFR.push(nonIC[i]._VAL);
            break;
        case "INTIRL":
            INTIRL.push(nonIC[i]._VAL);
            break;    
        case "INTNED":
            INTNED.push(nonIC[i]._VAL);
            break;    
        case "INTEW":
            INTEW.push(nonIC[i]._VAL);
            break;    
        } 
 
    }
    
    // Finding total Power generated domestically 
    totalNonIC = totalNonIC.map(Number).reduce(sumNum);
     console.log(totalNonIC);
    
    // summing all values 
    CCGT = CCGT.map(Number).reduce(sumNum);
    OCGT = OCGT.map(Number).reduce(sumNum);
    OIL = OIL.map(Number).reduce(sumNum);
    COAL = COAL.map(Number).reduce(sumNum);
    NUCLEAR = NUCLEAR.map(Number).reduce(sumNum);
    WIND = WIND.map(Number).reduce(sumNum);
    PS = PS.map(Number).reduce(sumNum);
    NPSHYD = NPSHYD.map(Number).reduce(sumNum);
    OTHER = OTHER.map(Number).reduce(sumNum);
    INTFR = INTFR.map(Number).reduce(sumNum);
    INTIRL = INTIRL.map(Number).reduce(sumNum);
    INTNED = INTNED.map(Number).reduce(sumNum);
    INTEW = INTEW.map(Number).reduce(sumNum);
    
    // console.log("COAL = " + (COAL/totalNonIC)*100);
    console.log("CCGT = " + CCGT + "\nOCGT = " + OCGT + "\nCOAL = " + COAL + "\nWIND = " + WIND);
}

count(fuel);

